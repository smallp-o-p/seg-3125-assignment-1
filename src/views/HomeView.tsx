import { useState } from 'react'
import {
  getServicePath,
  services,
  type Service,
} from '../booking'
import { RouteLink } from '../components/RouteLink'
import { ServiceCardVisual } from '../components/ServiceCardVisual'
import computerRepairPhoto from '../assets/computer-repair.jpg'
import hardDrivePhoto from '../assets/hard-drive.jpg'
import pcBuildPhoto from '../assets/pc-build.jpg'
import shieldIcon from '../assets/shield.svg'
import starIcon from '../assets/star.svg'
import wrenchIcon from '../assets/wrench.svg'

type HomeViewProps = {
  onNavigate: (path: string) => void
}

const whyServiceCards = [
  {
    title: 'Authorized Service Provider',
    summary: 'Genuine parts, and manufacture-certified repairs that you can trust.',
    icon: shieldIcon,
  },
  {
    title: 'Speed of Service',
    summary: 'Fast, reliable service that gets you up and running in no time.',
    icon: wrenchIcon,
  },
  {
    title: 'Proven Customer Satisfaction',
    summary:
      'We stand by our work, and countless customers have placed their trust in us.',
    icon: starIcon,
  },
] as const

const servicePhotos = {
  'computer-repair': computerRepairPhoto,
  'pc-build': pcBuildPhoto,
  'hard-drive': hardDrivePhoto,
} as const satisfies Record<Service['photo'], string>

export function HomeView({ onNavigate }: HomeViewProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <section className="home-view" aria-labelledby="home-title">
      <div className="intro-copy">
        <h1 id="home-title">
          Your tech and computer needs serviced without the hassle.
        </h1>
      </div>
      <div className="service-grid" aria-label="Primary services">
        {services.map((service) => (
          <article className="service-card" key={service.key}>
            <ServiceCardVisual visual={service.visual} />
            <span>{service.title}</span>
            <div className="service-actions">
              <RouteLink
                className="service-book-link"
                href={getServicePath(service)}
                onNavigate={onNavigate}
              >
                Book now
              </RouteLink>
              <button
                className="learn-more-link"
                type="button"
                aria-expanded={selectedService?.key === service.key}
                aria-controls="service-details"
                onClick={() => setSelectedService(service)}
              >
                Learn more
              </button>
            </div>
          </article>
        ))}
      </div>
      {selectedService && (
        <section
          className="service-details-panel"
          id="service-details"
          aria-labelledby="service-details-title"
        >
          <div className="service-details-copy">
            <h2 id="service-details-title">{selectedService.title}</h2>
            <p>{selectedService.summary}</p>
            <ul>
              {selectedService.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <img
            className="service-details-photo"
            src={servicePhotos[selectedService.photo]}
            alt={`${selectedService.title} service`}
          />
        </section>
      )}
      <div className="section-divider" role="presentation" />
      <section
        className="why-service-section"
        aria-labelledby="why-service-title"
      >
        <h2 id="why-service-title">Why Service Your Device With Us</h2>
        <div className="why-service-card-grid">
          {whyServiceCards.map((card) => (
            <article className="why-service-card" key={card.title}>
              <img
                className="why-service-icon"
                src={card.icon}
                alt=""
                aria-hidden="true"
              />
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
