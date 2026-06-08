import { contactDetails, createPhoneHref } from '../booking'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <strong>Terminal Repair && Assembly</strong>
          <span>Computer repair, assembly, and data services in Ottawa.</span>
          <span> Site designed by: <b>William Tran-Viet 300241608 :)</b></span>
        </div>

        <div className="site-footer-details" aria-label="Shop contact details">
          <div className="site-footer-block">
            <span className="site-footer-label">Contact</span>
            <a href={createPhoneHref(contactDetails.phone)}>
              {contactDetails.phone}
            </a>
          </div>

          <div className="site-footer-block">
            <span className="site-footer-label">Location</span>
            <address>{contactDetails.address}</address>
          </div>
        </div>
      </div>
    </footer>
  )
}
