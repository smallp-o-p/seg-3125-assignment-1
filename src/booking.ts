export const bookingOptions = [
  {
    reason: 'Repair',
    routeSlug: 'repair',
    serviceName: 'Computer Repair',
    teaser: 'Diagnostics, part swaps, and performance issues.',
    group: 'repair',
    showIssueBrief: true,
  },
  {
    reason: 'Basic Assembly',
    routeSlug: 'basic-assembly',
    serviceName: 'Basic Assembly',
    teaser: 'Bring the parts and we assemble the machine.',
    group: 'assembly',
    showIssueBrief: false,
  },
  {
    reason: 'Plan build + assembly',
    routeSlug: 'plan-build-assembly',
    serviceName: 'Plan build + assembly',
    teaser: 'Review parts, resolve compatibility, then assemble.',
    group: 'assembly',
    showIssueBrief: false,
  },
  {
    reason: 'Data Services',
    routeSlug: 'data-services',
    serviceName: 'Data Services',
    teaser: 'Data backups, transfers, recovery and more.',
    group: 'data',
    showIssueBrief: true,
  },
] as const

type BookingOption = (typeof bookingOptions)[number]
export type AppointmentReason = BookingOption['reason']
type BookingGroup = BookingOption['group']

export type BookingFormData = {
  name: string
  email: string
  dateTime: string
  reason: AppointmentReason
  issueBrief: string
}

export type AppRoute =
  | { view: 'home' }
  | { view: 'assembly' }
  | { view: 'booking'; reason: AppointmentReason }

export const getBookingOption = (reason: AppointmentReason) =>
  bookingOptions.find((option) => option.reason === reason)!

export const createBookingPath = (reason: AppointmentReason) =>
  `/book/${getBookingOption(reason).routeSlug}`

export const services = [
  {
    key: 'repair',
    title: 'Computer Repair',
    summary:
      `Computer facing slowdowns or misbehaving? Our experts are here to help.
      Comprehensive service will guarantee that your system will be up and running the best it can,
      so you can spend less time tinkering and more time on the important things.`,
    points: [
      'Computer diagnostics',
      'Part replacement, dust removal and cleaning',
      'Operating system reinstallation and setup',
      'Data backup',
      'Data Recovery',
    ],
    visual: { kind: 'single', icons: ['monitor-cog'] },
    photo: 'computer-repair',
    action: { reason: 'Repair' },
  },
  {
    key: 'assembly',
    title: 'Custom Build',
    summary:
      `Need a new system? We've got you covered. Whether it's the most basic or the most custom,
      we provide professional hardware assembly and testing to ensure that you get exactly what you want, and more.`,
    points: [
      'Build from parts you already have',
      'Plan your new build with us, and get exactly what you need',
      'Cable management, startup checks, and handoff notes',
    ],
    visual: { kind: 'composite', icons: ['monitor', 'pc-case'] },
    photo: 'pc-build',
    action: { path: '/assembly' },
  },
  {
    key: 'data',
    title: 'Data Services',
    summary:
      'Data woes begone! We can ensure that your precious data is safe, secure and accessible.',
    points: [
      'Data Transfer',
      'Drive Backup or Cloning',
      'Data Recovery',
    ],
    visual: { kind: 'single', icons: ['hard-drive'] },
    photo: 'hard-drive',
    action: { reason: 'Data Services' },
  },
] as const

export type Service = (typeof services)[number]

export const contactDetails = {
  phone: '(613) 555-0198',
  address: '42 Bay Street, Suite 120, Ottawa, ON K1R 6A4',
} as const

export const getBookingOptionsByGroup = (group: BookingGroup) =>
  bookingOptions.filter((option) => option.group === group)

export const getServicePath = ({ action }: Service) =>
  'reason' in action ? createBookingPath(action.reason) : action.path

export function getRouteFromPath(pathname: string): AppRoute {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'

  if (normalizedPath === '/') {
    return { view: 'home' }
  }

  if (normalizedPath === '/assembly') {
    return { view: 'assembly' }
  }

  const bookingSlug = normalizedPath.match(/^\/book\/([^/]+)$/)?.[1]
  const reason = bookingOptions.find(
    (option) => option.routeSlug === bookingSlug,
  )?.reason
  if (reason) {
    return { view: 'booking', reason }
  }

  return { view: 'home' }
}

export const createPhoneHref = (phone: string) =>
  `tel:${phone.replace(/[^0-9]/g, '')}`
