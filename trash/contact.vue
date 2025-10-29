<template>
    <section class="py-12">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-2xl mx-auto mb-12">
                <h1 class="text-3xl font-bold mb-4">Entre em Contato</h1>
                <p class="text-gray-600">Estamos aqui para ajudar. Entre em contato com nossa equipe para saber mais
                    sobre nossos planos ou tirar suas dúvidas.</p>
            </div>
            <div class="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 lg:col-span-2">
                    <h2 class="text-xl font-semibold mb-4">Envie uma mensagem</h2>
                    <form class="space-y-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="name">Nome</label><input id="name"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    placeholder="Seu nome">
                            </div>
                            <div class="space-y-2">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="email">Email</label><input id="email" type="email"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    placeholder="seu@email.com">
                            </div>
                        </div>
                        <div class="space-y-2"><label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="subject">Assunto</label><input id="subject"
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                placeholder="Assunto da mensagem"></div>
                        <div class="space-y-2"><label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="message">Mensagem</label><textarea id="message"
                                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Digite sua mensagem aqui..." rows="6"></textarea>
                        </div><button
                            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-election-primary hover:bg-election-primary/90"
                            type="submit">Enviar Mensagem</button>
                    </form>
                </div>
                <div class="rounded-lg border shadow-sm p-6 bg-election-primary text-white">
                    <h2 class="text-xl font-semibold mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-shield mr-2">
                            <path
                                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                            </path>
                        </svg>VoteSecure
                    </h2>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-mail mr-3 mt-1">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                            <div>
                                <h3 class="font-medium">Email</h3>
                                <p class="text-white/80">contato@votesecure.com.br</p>
                                <p class="text-white/80">suporte@votesecure.com.br</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-phone mr-3 mt-1">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                                </path>
                            </svg>
                            <div>
                                <h3 class="font-medium">Telefone</h3>
                                <p class="text-white/80">+55 (11) 3456-7890</p>
                                <p class="text-white/80">+55 (11) 98765-4321</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-map-pin mr-3 mt-1">
                                <path
                                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
                                </path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <div>
                                <h3 class="font-medium">Endereço</h3>
                                <p class="text-white/80">Av. Paulista, 1000, Sala 301
                                    <br>Bela Vista, São Paulo - SP
                                    <br>CEP 01310-100
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
// definePageMeta({
//     layout: 'auth'
// })
</script>
<style scoped lang="css">
.text-election-primary {
    --tw-text-opacity: 1;
    color: rgb(10 36 99 / var(--tw-text-opacity, 1));
}
</style>