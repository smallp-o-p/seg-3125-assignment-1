import monitorCogIcon from '../assets/monitor-cog.svg'
import monitorIcon from '../assets/monitor.svg'
import pcCaseIcon from '../assets/pc-case.svg'
import hardDriveIcon from '../assets/hard-drive.svg'
import { type Service } from '../booking'

type ServiceIconName = Service['visual']['icons'][number]

const serviceIconSources = {
  'monitor-cog': monitorCogIcon,
  monitor: monitorIcon,
  'pc-case': pcCaseIcon,
  'hard-drive': hardDriveIcon,
} as const satisfies Record<ServiceIconName, string>

type ServiceCardVisualProps = {
  visual: Service['visual']
}

export function ServiceCardVisual({ visual }: ServiceCardVisualProps) {
  return (
    <span className={`service-card-visual ${visual.kind}`} aria-hidden="true">
      {visual.icons.map((icon) => (
        <img
          className={`service-icon ${icon}`}
          src={serviceIconSources[icon]}
          alt=""
          key={icon}
        />
      ))}
    </span>
  )
}
