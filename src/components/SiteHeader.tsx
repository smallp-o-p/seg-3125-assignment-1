import { RouteLink } from './RouteLink'
import { contactDetails, createPhoneHref } from '../booking'

type SiteHeaderProps = {
  onNavigate: (path: string) => void
}

export function SiteHeader({ onNavigate }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <RouteLink className="brand-button" href="/" onNavigate={onNavigate}>
          Terminal Repair && Assembly
        </RouteLink>
        <div className="header-contact" aria-label="Shop contact details">
          <span className="phone-header">
            <span className="phone-icon-header" aria-hidden="true" />
            <a href={createPhoneHref(contactDetails.phone)}>
              {contactDetails.phone}
            </a>
          </span>
          <details
            className="location-tooltip"
            aria-label={`Ottawa shop, ${contactDetails.address}`}
          >
            <summary>
              <span className="location-icon-header" aria-hidden="true" />
              Visit Us
            </summary>
            <address>{contactDetails.address}</address>
          </details>
        </div>
      </div>
    </header>
  )
}
