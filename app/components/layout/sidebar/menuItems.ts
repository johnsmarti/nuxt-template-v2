export type MenuItem = {
  label: string
  icon: string
  to: string
  badge?: number
  children?: MenuItem[]
  lucide?: string
}

export const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-home', lucide: 'lucide:home', to: '/' },
  {
    label: 'Painel Admin',
    icon: 'pi pi-sliders-h',
    lucide: 'lucide:sliders',
    to: '/management',
    children: [
      { label: 'Dashboard', icon: 'pi pi-chart-line', lucide: 'lucide:gauge', to: '/management' },
      { label: 'Eleições', icon: 'pi pi-calendar', lucide: 'lucide:calendar', to: '/management/elections' },
      { label: 'Cargos', icon: 'pi pi-briefcase', lucide: 'lucide:briefcase', to: '/management/positions' },
      { label: 'Delegados', icon: 'pi pi-users', lucide: 'lucide:users', to: '/management/delegates' },
      { label: 'Eleitores', icon: 'pi pi-id-card', lucide: 'lucide:users', to: '/management/voters' },
      { label: 'Candidatos', icon: 'pi pi-user', lucide: 'lucide:user', to: '/management/candidates' },
    ],
  },
  { label: 'Votação', icon: 'pi pi-check-square', lucide: 'lucide:check-square', to: '/vote' },
  // { label: 'Resultados', icon: 'pi pi-chart-bar', lucide: 'lucide:bar-chart-3', to: '/results', badge: 50 },
  { label: 'Contato', icon: 'pi pi-envelope', lucide: 'lucide:mail', to: '/contact' },
]