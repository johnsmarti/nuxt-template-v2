<template>
  <header
    class="flex w-full flex-wrap items-stretch justify-between gap-5 bg-white px-[70px] py-[26px] whitespace-nowrap shadow-[0px_4px_8px_-4px_rgba(22,34,51,0.08)] max-md:max-w-full max-md:px-5">
    <h1 class="my-auto text-[28px] leading-[1.1] font-extrabold tracking-[-0.84px] text-[rgba(47,47,47,1)]">
      Dashboard
    </h1>
    <div class="flex flex-wrap gap-5 font-normal max-md:max-w-full">
      <form class="w-[339px] min-w-60 rounded-[0px_0px_0px_0px] text-[15px] text-[rgba(139,163,203,1)]">
        <div
          class="flex items-stretch gap-[15px] rounded-[40px] bg-[rgba(245,247,250,1)] px-[25px] py-[15px] max-md:px-5">
          <img
            src="https://api.builder.io/api/v1/image/assets/b998656de9754e30826c475063e4a42b/656a0c1fcb345524b5840a6a6f8339ba13074f1c?placeholderIfAbsent=true"
            class="aspect-[1] w-5 shrink-0 object-contain" alt="Search icon" />
          <input type="text" placeholder="Pesquisar"
            class="w-[250px] shrink grow basis-auto bg-transparent outline-none" />
        </div>
      </form>

      <button class="transition-opacity hover:opacity-80">
        <img
          src="https://api.builder.io/api/v1/image/assets/b998656de9754e30826c475063e4a42b/d0e95f912ef3a2903d36d5a75a3edccd3ccd2eac?placeholderIfAbsent=true"
          class="aspect-[1] w-[50px] shrink-0 object-contain" alt="Notifications" />
      </button>

      <button class="transition-opacity hover:opacity-80">
        <img
          src="https://api.builder.io/api/v1/image/assets/b998656de9754e30826c475063e4a42b/cbbfa0755fe785fa84c18d2f8442cc1d6a6ab7c3?placeholderIfAbsent=true"
          class="aspect-[1] w-[50px] shrink-0 object-contain" alt="User menu" />
      </button>

      <div class="flex w-[51px] flex-col items-stretch justify-center text-base tracking-[0.08px]">
        <div class="flex items-center gap-5 text-[rgba(47,47,47,1)]">
          <div class="my-auto self-stretch">John</div>
        </div>
        <div class="w-[51px] rounded-[0px_0px_0px_0px] text-[#737791]">
          <div>Eleitor</div>
        </div>
      </div>
    </div>
  </header>
</template>
