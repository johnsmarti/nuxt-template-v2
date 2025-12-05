## Objetivo
- Finalizar o procedimento de autenticação, cadastro de eleitor e recuperação de senha.
- Melhorar páginas e esquemas existentes, integrando com a camada de API já configurada.

## Arquitetura atual (referências)
- Login via API: `app/api/auth/mutations.ts:12-31` (`useLogin()`) salva cookies `access_token`/`refresh_token`.
- Identity login do eleitor: `app/api/auth/mutations.ts:94-109` (`useLoginIdentity()`), armazena `temp_token`.
- Reset password atual: `app/api/auth/mutations.ts:83-92` (`useResetPassword()` posta em `'/auth/reset-password'`).
- Página de login: `app/pages/(auth)/login.vue` ainda sem integração (`onSubmit` apenas `console.log`).
- Página atual com fluxo de login: `app/pages/(auth)/signup.vue` chama `useLogin()` no submit (incoerente com o título "Cadastro de Eleitor").
- Esquemas: `app/schemas/auth.ts` tem `AuthSchema` e esboço de `RegisterVoter` sem `election_id` nem resolvers exportados.

## Mudanças por arquivo
### `app/schemas/auth.ts`
- Criar e exportar:
  - `RegisterVoterSchema` com campos: `name`, `document`, `email`, `phone`, `election_id` (UUID). Refinar `document` (mín. 5 ou 11 dígitos) e `phone` (DDD + número, flexível), validar `email`.
  - `PasswordRequestSchema` com `email` obrigatório.
  - `PasswordResetSchema` com `token`, `new_password` (mesmas regras de força do `AuthSchema`) e `new_password_confirm` igual ao `new_password`.
- Exportar `registerVoterResolver`, `passwordRequestResolver`, `passwordResetResolver` via `zodResolver`.

### `app/api/auth/interfaces.ts`
- Adicionar tipos:
  - `RegisterVoterPayload` com `{ name, document, email, phone, election_id }`.
  - `PasswordRequestPayload` com `{ email }`.
  - `PasswordResetPayload` com `{ token, new_password, new_password_confirm }`.
- Manter tipos existentes sem quebra.

### `app/api/auth/mutations.ts`
- Conectar novas rotas pedidas:
  - `useRegisterVoter()` faz `POST '/voters'` com `RegisterVoterPayload`; em sucesso, toast e navega para `'/login-voter'`.
  - `useRequestPasswordReset()` faz `POST '/request-password-reset'` com `PasswordRequestPayload`.
  - Ajustar `useResetPassword()` para usar `POST '/reset-password'` com `PasswordResetPayload` (ou criar `useResetPasswordV2()` para não quebrar fluxo existente).
- Manter `useLogin()` e cookies como estão; remover `console.log` em identity se necessário.

### `app/pages/(auth)/login.vue`
- Integrar o submit ao `useLogin()`:
  - Usar `authResolver` atual para validar.
  - No submit, chamar `mutate(payload)`; em sucesso, redirecionar para `'/'` (já feito em `useLogin()`).
  - Definir `definePageMeta({ layout: 'auth' })` se necessário.

### `app/pages/(auth)/signup.vue`
- Transformar em "Cadastro de Eleitor":
  - Substituir o resolver por `registerVoterResolver`.
  - Renderizar campos do `RegisterVoterPayload` (`name`, `document`, `email`, `phone`, `election_id`).
  - No submit, chamar `useRegisterVoter()`; feedback e navegação para `'/login-voter'`.
  - Corrigir labels e botões ("Cadastrar" ao invés de "Acessar").

### `app/pages/(auth)/login-voter.vue`
- Manter fluxo de identificador, mas melhorar:
  - Validar entrada (`document`/matrícula) e remover `alert`.
  - Usar estado de `useLoginIdentity()` (loading/erro) e, em sucesso, direcionar para página adequada (ex.: `'/otp'` se houver segunda etapa ou diretamente área do eleitor se backend retornar tokens definitivos via `useAccessIdentity()`).

### Novas páginas (necessárias)
- `app/pages/(auth)/request-password-reset.vue`:
  - Formulário com `email`; resolver `passwordRequestResolver`; chama `useRequestPasswordReset()` e mostra confirmação.
- `app/pages/(auth)/reset-password.vue`:
  - Formulário com `token`, `new_password`, `new_password_confirm`; resolver `passwordResetResolver`; chama `useResetPassword()` e redireciona ao `'/login'` em sucesso.

## UX/Validação
- Manter as regras de senha fortes iguais ao `AuthSchema`.
- Máscaras opcionais para `document` (CPF/matrícula) e `phone` se componentes existentes suportarem.
- Utilizar toasts globais do interceptor Axios (já existentes) e estados de carregamento dos mutations.

## Segurança
- Cookies `access_token`/`refresh_token` já são `path: '/'` e `sameSite: 'lax'` (`app/api/auth/mutations.ts:16-25`). Manter configuração.
- Não logar tokens; garantir limpeza em `401` (já feito no plugin Axios).

## Verificação
- Cenários:
  - Login: após submit, `access_token` presente, middleware libera páginas privadas.
  - Cadastro de eleitor: `POST /voters` retorna 201; navegar para `login-voter`.
  - Solicitar reset: `POST /request-password-reset` retorna 200; mostrar confirmação.
  - Reset: `POST /reset-password` retorna 200; redirecionar para `login`.
- Executar e validar navegação de páginas privadas protegidas por `middleware 'auth'`.

## Entregáveis
- Schemas e resolvers novos em `app/schemas/auth.ts`.
- Tipos e mutations atualizados/criados em `app/api/auth/*`.
- Páginas ajustadas (`login.vue`, `signup.vue`, `login-voter.vue`) e novas (`request-password-reset.vue`, `reset-password.vue`).

Confirma prosseguir com essas alterações?