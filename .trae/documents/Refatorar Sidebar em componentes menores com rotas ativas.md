## Objetivo
- Separar `app/components/layout/Sidebar.vue` em componentes menores e aplicar estado ativo com base na rota atual.

## Estado Atual
- Sidebar monolítica com arrays de `menuItems` sem `path` (apenas `label`/`icon`).
- Ativação visual depende de `activeItem` interno e não das rotas.

## Estrutura Proposta
- `app/components/layout/sidebar/SidebarRoot.vue`: container que gerencia `open` (mobile), overlay e compõe os subcomponentes.
- `app/components/layout/sidebar/SidebarToggle.vue`: botão hambúrguer (mobile).
- `app/components/layout/sidebar/SidebarOverlay.vue`: overlay para fechar no mobile.
- `app/components/layout/sidebar/SidebarMenu.vue`: lista de menus; recebe `items` e delega renderização.
- `app/components/layout/sidebar/SidebarItem.vue`: item individual com suporte a `NuxtLink` e estado ativo por rota.
- `app/components/layout/sidebar/SidebarBottom.vue`: botões inferiores (Configurações/Sair).
- `app/components/layout/sidebar/menuItems.ts`: configuração central dos itens com `label`, `icon`, `to`, `badge` e `children` (opcional).

## Configuração de Menu (exemplos)
- Dashboard → `/`
- Painel Admin → `/(private)/management/index` (pode abrir submenus)
- Votação → `/vote`
- Resultados → `/results` (placeholder)
- Contato → `/contact`

## Comportamento de Rota Ativa
- Usar `useRoute()` para computar `activePath`.
- Um item é ativo se `route.path === item.to` ou `route.path.startsWith(item.to)` quando houver filhos.
- Itens renderizados via `<NuxtLink :to="item.to">` para herdar classes `router-link-active`, mas aplicar classe `active` customizada via `:class="isActive(item) ? 'active' : 'hover:bg-white/20'"`.

## Passos de Implementação
1. Criar `menuItems.ts` com objetos de menu incluindo `to`.
2. Criar `SidebarItem.vue` com API:
   - Props: `{ item, activePath }`
   - Render: wrapper `<NuxtLink>` com ícone, label, badge; classe `active` quando `isActive`.
3. Criar `SidebarMenu.vue`:
   - Props: `{ items, activePath }`
   - Renderiza lista de `SidebarItem` e suporte a `children` (dropdown opcional).
4. Criar `SidebarToggle.vue` e `SidebarOverlay.vue` para mobile.
5. Criar `SidebarBottom.vue` com os dois botões.
6. Criar `SidebarRoot.vue`:
   - Gerencia `open` (mobile), overlay e compõe os subcomponentes.
   - Usa `useRoute()` para passar `route.path` como `activePath`.
7. Atualizar `Sidebar.vue` para ser um thin-wrapper que importa `SidebarRoot.vue` ou substituir diretamente mantendo mesmo estilo/tema.

## Estilo e Classes
- Reaproveitar classes existentes de `Sidebar.vue` (`active` pill, animações `iconBounce`, etc.).
- Extrair styles necessários para `SidebarItem.vue`.

## Verificação
- Navegar entre rotas (`/`, `/(private)/management/index`, `/vote`, `/contact`) e validar `active`.
- Testar mobile: toggle abre/fecha e overlay.
- Confirmar badges e dropdowns (se houver filhos) funcionam.

## Entregáveis
- Novos componentes dentro de `app/components/layout/sidebar/*`.
- Configuração de menu centralizada.
- Sidebar com ativação por rota e comportamento consistente mobile/desktop.

Deseja que eu aplique esta refatoração agora?