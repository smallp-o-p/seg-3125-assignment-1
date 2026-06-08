import { createBookingPath, getBookingOptionsByGroup } from '../booking'
import { RouteLink } from '../components/RouteLink'
import cpuIcon from '../assets/cpu.svg'
import gpuIcon from '../assets/gpu.svg'
import pcCaseIcon from '../assets/pc-case.svg'

const assemblyServices = getBookingOptionsByGroup('assembly')
const assemblyIcons: Record<string, string[]> = {
  'Basic Assembly': [pcCaseIcon],
  'Plan build + assembly': [cpuIcon, gpuIcon],
}

type AssemblyViewProps = {
  onNavigate: (path: string) => void
}

export function AssemblyView({ onNavigate }: AssemblyViewProps) {
  return (
    <section className="choice-view" aria-labelledby="assembly-title">
      <RouteLink className="text-button" href="/" onNavigate={onNavigate}>
        Back
      </RouteLink>
      <div>
        <h1 id="assembly-title">Choose the service you need.</h1>
      </div>
      <div className="service-grid compact">
        {assemblyServices.map((service) => (
          <RouteLink
            className="service-card assembly-service-card"
            key={service.reason}
            href={createBookingPath(service.reason)}
            onNavigate={onNavigate}
          >
            <span className="assembly-option-icons" aria-hidden="true">
              {assemblyIcons[service.reason].map((icon) => (
                <img className="assembly-option-icon" src={icon} alt="" key={icon} />
              ))}
            </span>
            <span>{service.serviceName}</span>
            <small>{service.teaser}</small>
          </RouteLink>
        ))}
      </div>
    </section>
  )
}
