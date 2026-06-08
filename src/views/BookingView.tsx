import { type FormEvent, useState } from 'react'
import {
  contactDetails,
  createPhoneHref,
  getBookingOption,
  type AppointmentReason,
  type BookingFormData,
} from '../booking'

import phone from '../assets/phone.svg'

type BookingDraftData = Omit<BookingFormData, 'reason'>
type BookingTextField = keyof BookingDraftData

const bookingTimes = Array.from(
  { length: 8 },
  (_, index) => `${String(index + 9).padStart(2, '0')}:00`,
)
const textFields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
] as const

function getTodayDateValue(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getTimeMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number)

  return hour * 60 + minute
}

function formatBookingTime(time: string): string {
  const [hour, minute] = time.split(':').map(Number)
  const displayHour = hour % 12 || 12
  const suffix = hour >= 12 ? 'PM' : 'AM'

  return `${displayHour}:${String(minute).padStart(2, '0')} ${suffix}`
}

const createDateTimeValue = (date: string, time: string) =>
  date || time ? `${date}T${time}` : ''

function BookingPhonePanel({ label }: { label: string }) {
  return (
    <div className="booking-phone-panel">
      <span>{label}</span>
      <span>
        <img src={phone} alt="" />
        <a href={createPhoneHref(contactDetails.phone)}>
          {contactDetails.phone}
        </a>
      </span>
    </div>
  )
}

type BookingViewProps = {
  reason: AppointmentReason
  onBack: () => void
}

export function BookingView({ reason, onBack }: BookingViewProps) {
  const [bookingDraft, setBookingDraft] = useState<BookingDraftData>({
    name: '',
    email: '',
    dateTime: '',
    issueBrief: '',
  })
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
  const bookingForm: BookingFormData = { ...bookingDraft, reason }
  const bookingOption = getBookingOption(reason)
  const serviceName = bookingOption.serviceName
  const [selectedDate = '', selectedTime = ''] = bookingForm.dateTime.split('T')
  const todayDate = getTodayDateValue()
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const availableBookingTimes = bookingTimes.filter(
    (time) => selectedDate !== todayDate || getTimeMinutes(time) > currentMinutes,
  )

  function handleDateChange(date: string) {
    const time =
      !selectedTime ||
      date !== todayDate ||
      getTimeMinutes(selectedTime) > currentMinutes
        ? selectedTime
        : ''
    updateTextField('dateTime', createDateTimeValue(date, time))
  }

  function handleTimeChange(time: string) {
    updateTextField('dateTime', createDateTimeValue(selectedDate, time))
  }

  function updateTextField(field: BookingTextField, value: string) {
    setBookingDraft((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedEmail(bookingForm.email)
  }

  return (
    <div className="booking-modal-backdrop" role="presentation">
      <section
        className="booking-modal"
        aria-labelledby="booking-title"
        aria-modal="true"
        role="dialog"
      >
        {submittedEmail ? (
          <div className="booking-success">
            <p className="eyebrow">Appointment booked</p>
            <h1 id="booking-title">{serviceName} appointment booked</h1>
            <p>
              We will follow up at {submittedEmail} to confirm the appointment
              details.
            </p>
            <BookingPhonePanel label="Need to change it?" />
            <button className="primary-button" type="button" onClick={onBack}>
              Back to home
            </button>
          </div>
        ) : (
          <>
            <button className="text-button" type="button" onClick={onBack}>
              Back
            </button>
            <header className="booking-modal-header">
              <h1 id="booking-title">Book {serviceName}</h1>
              <BookingPhonePanel label="Book by phone" />
            </header>
            <div className="booking-divider" aria-hidden="true">
              <span>or book online</span>
            </div>
            <form className="appointment-form" onSubmit={handleSubmit}>
              {textFields.map(({ name, label, type, autoComplete }) => (
                <label key={name}>
                  {label}
                  <input
                    required
                    type={type}
                    name={name}
                    autoComplete={autoComplete}
                    value={bookingForm[name]}
                    onChange={(event) =>
                      updateTextField(name, event.target.value)
                    }
                  />
                </label>
              ))}

              <div className="booking-date-time-fields">
                <label>
                  Date
                  <input
                    required
                    type="date"
                    name="date"
                    min={todayDate}
                    value={selectedDate}
                    onChange={(event) => handleDateChange(event.target.value)}
                  />
                </label>

                <label>
                  Time
                  <select
                    required
                    name="time"
                    value={selectedTime}
                    onChange={(event) => handleTimeChange(event.target.value)}
                  >
                    <option value="">Select a time</option>
                    {availableBookingTimes.map((time) => (
                      <option value={time} key={time}>
                        {formatBookingTime(time)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <input
                type="hidden"
                name="dateTime"
                value={bookingForm.dateTime}
              />

              <input type="hidden" name="reason" value={bookingForm.reason} />

              {bookingOption.showIssueBrief && (
                <label>
                  Brief on the issue
                  <textarea
                    name="issueBrief"
                    rows={4}
                    value={bookingForm.issueBrief}
                    onChange={(event) =>
                      updateTextField('issueBrief', event.target.value)
                    }
                  />
                </label>
              )}

              <button className="primary-button" type="submit">
                Book appointment
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
