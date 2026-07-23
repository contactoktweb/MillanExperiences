"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Check, MessageCircle } from "lucide-react"
import { contact } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const services = [
  "Boats",
  "Villas & Islands",
  "Groups & Events",
  "Concierge",
  "Private Chef",
  "Bachelor / Bachelorette",
  "Private Aviation",
  "Other",
]

const inputBase =
  "w-full border-0 border-b border-[color:var(--color-border-dark)] bg-transparent py-3 font-sans text-sm text-[var(--color-warm-white)] placeholder:text-[var(--color-warm-white)]/40 focus:border-[var(--color-sand)] focus:outline-none focus:ring-0 transition-colors"
const labelBase =
  "block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-crystal-water)]"
const fieldGap = "flex flex-col gap-2"

export function ContactSection() {
  const [step, setStep] = useState<1 | 2>(1)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    service: "",
    startDate: "",
    endDate: "",
    guests: "",
    occasion: "",
    location: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    contactMethod: "Email",
    message: "",
    consent: false,
  })

  const set = (key: keyof typeof form, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: "" }))
  }

  const validateStep1 = () => {
    const next: Record<string, string> = {}
    if (!form.service) next.service = "Please choose a service."
    if (!form.startDate) next.startDate = "Add an approximate start date."
    if (!form.guests) next.guests = "How many guests?"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateStep2 = () => {
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = "Please add your first name."
    if (!form.lastName.trim()) next.lastName = "Please add your last name."
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email."
    if (!form.phone.trim()) next.phone = "Add a phone number."
    if (!form.consent) next.consent = "Please accept the privacy terms."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    // Placeholder submit — wire to a server action / CRM with UTM + source page.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-[var(--color-blue-gray)] py-24 md:py-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-0 px-0 lg:grid-cols-2">
        {/* Editorial imagery */}
        <div className="relative hidden min-h-[520px] overflow-hidden lg:block">
          <Image
            src="/millan/yacht-mangrove.jpg"
            alt="A guest relaxing on a Millan Experiences yacht by the mangroves."
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-deep-sea)]/25" />
          <div className="absolute bottom-10 left-10 right-10 text-[var(--color-warm-white)]">
            <p className="font-serif text-3xl italic leading-snug">
              Tailored to your pace.
            </p>
          </div>
        </div>

        {/* Form panel */}
        <div className="bg-[var(--color-deep-sea)] px-6 py-16 text-[var(--color-warm-white)] sm:px-10 md:px-14 md:py-20">
          <p className="eyebrow text-[var(--color-sand)]">Contact</p>
          <h2 className="mt-5 font-serif text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05]">
            Tell us about your vision
          </h2>
          <p className="mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-[var(--color-warm-white)]/80">
            Tell us how you envision your next escape. We will take care of the rest,
            ensuring the flawless execution of your itinerary so you can simply enjoy the
            experience at your own pace.
          </p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-12 border border-[color:var(--color-border-dark)] p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-deep-sea)]">
                <Check className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-serif text-2xl">Thank you.</h3>
              <p className="mt-3 max-w-sm font-sans text-sm font-light leading-relaxed text-[var(--color-warm-white)]/80">
                Your request has reached our concierge. We will be in touch shortly with a
                tailored proposal. Everything is handled from here.
              </p>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="mt-10 flex items-center gap-4 font-sans text-[0.66rem] uppercase tracking-[0.2em]">
                <span className={cn(step === 1 ? "text-[var(--color-sand)]" : "text-[var(--color-warm-white)]/50")}>
                  Step 01 — The Journey
                </span>
                <span className="h-px flex-1 bg-[color:var(--color-border-dark)]" />
                <span className={cn(step === 2 ? "text-[var(--color-sand)]" : "text-[var(--color-warm-white)]/50")}>
                  Step 02 — Your Details
                </span>
              </div>

              <form onSubmit={onSubmit} className="mt-10" noValidate>
                {step === 1 ? (
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div className={cn(fieldGap, "sm:col-span-2")}>
                      <label htmlFor="service" className={labelBase}>
                        Service of interest
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) => set("service", e.target.value)}
                        className={cn(inputBase, "appearance-none")}
                        aria-invalid={!!errors.service}
                      >
                        <option value="" disabled className="text-[var(--color-deep-sea)]">
                          Select a service
                        </option>
                        {services.map((s) => (
                          <option key={s} value={s} className="text-[var(--color-deep-sea)]">
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.service && <FieldError id="service" message={errors.service} />}
                    </div>

                    <div className={fieldGap}>
                      <label htmlFor="startDate" className={labelBase}>Travel start date</label>
                      <input
                        id="startDate"
                        type="date"
                        value={form.startDate}
                        onChange={(e) => set("startDate", e.target.value)}
                        className={cn(inputBase, "[color-scheme:dark]")}
                        aria-invalid={!!errors.startDate}
                      />
                      {errors.startDate && <FieldError id="startDate" message={errors.startDate} />}
                    </div>

                    <div className={fieldGap}>
                      <label htmlFor="endDate" className={labelBase}>Travel end date</label>
                      <input
                        id="endDate"
                        type="date"
                        value={form.endDate}
                        onChange={(e) => set("endDate", e.target.value)}
                        className={cn(inputBase, "[color-scheme:dark]")}
                      />
                    </div>

                    <div className={fieldGap}>
                      <label htmlFor="guests" className={labelBase}>Number of guests</label>
                      <input
                        id="guests"
                        type="number"
                        min={1}
                        value={form.guests}
                        onChange={(e) => set("guests", e.target.value)}
                        placeholder="e.g. 6"
                        className={inputBase}
                        aria-invalid={!!errors.guests}
                      />
                      {errors.guests && <FieldError id="guests" message={errors.guests} />}
                    </div>

                    <div className={fieldGap}>
                      <label htmlFor="occasion" className={labelBase}>Occasion</label>
                      <input
                        id="occasion"
                        type="text"
                        value={form.occasion}
                        onChange={(e) => set("occasion", e.target.value)}
                        placeholder="Anniversary, retreat…"
                        className={inputBase}
                      />
                    </div>

                    <div className={cn(fieldGap, "sm:col-span-2")}>
                      <label htmlFor="location" className={labelBase}>Preferred destination or location</label>
                      <input
                        id="location"
                        type="text"
                        value={form.location}
                        onChange={(e) => set("location", e.target.value)}
                        placeholder="Cartagena, Islas del Rosario…"
                        className={inputBase}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="button"
                        onClick={() => validateStep1() && setStep(2)}
                        className="group/next inline-flex items-center gap-2.5 bg-[var(--color-sand)] px-7 py-3.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--color-deep-sea)] transition-colors hover:bg-[var(--color-warm-white)]"
                      >
                        Continue
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/next:translate-x-1" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div className={fieldGap}>
                      <label htmlFor="firstName" className={labelBase}>First name</label>
                      <input
                        id="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={(e) => set("firstName", e.target.value)}
                        className={inputBase}
                        aria-invalid={!!errors.firstName}
                      />
                      {errors.firstName && <FieldError id="firstName" message={errors.firstName} />}
                    </div>

                    <div className={fieldGap}>
                      <label htmlFor="lastName" className={labelBase}>Last name</label>
                      <input
                        id="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={(e) => set("lastName", e.target.value)}
                        className={inputBase}
                        aria-invalid={!!errors.lastName}
                      />
                      {errors.lastName && <FieldError id="lastName" message={errors.lastName} />}
                    </div>

                    <div className={fieldGap}>
                      <label htmlFor="phone" className={labelBase}>Phone (with prefix)</label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+1 555 000 0000"
                        className={inputBase}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <FieldError id="phone" message={errors.phone} />}
                    </div>

                    <div className={fieldGap}>
                      <label htmlFor="email" className={labelBase}>Email</label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={inputBase}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <FieldError id="email" message={errors.email} />}
                    </div>

                    <div className={cn(fieldGap, "sm:col-span-2")}>
                      <label htmlFor="contactMethod" className={labelBase}>Preferred contact method</label>
                      <select
                        id="contactMethod"
                        value={form.contactMethod}
                        onChange={(e) => set("contactMethod", e.target.value)}
                        className={cn(inputBase, "appearance-none")}
                      >
                        {["Email", "Phone", "WhatsApp"].map((m) => (
                          <option key={m} value={m} className="text-[var(--color-deep-sea)]">
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={cn(fieldGap, "sm:col-span-2")}>
                      <label htmlFor="message" className={labelBase}>Message</label>
                      <textarea
                        id="message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Tell us how you imagine it…"
                        className={cn(inputBase, "resize-none")}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex items-start gap-3 font-sans text-xs font-light leading-relaxed text-[var(--color-warm-white)]/80">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => set("consent", e.target.checked)}
                          className="mt-0.5 h-4 w-4 accent-[var(--color-sand)]"
                          aria-invalid={!!errors.consent}
                        />
                        <span>
                          I agree to the processing of my data in accordance with the{" "}
                          <a href="/privacy-policy" className="link-underline text-[var(--color-sand)]">
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                      {errors.consent && <FieldError id="consent" message={errors.consent} />}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-warm-white)]/70 underline-offset-4 hover:underline"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="group/submit inline-flex items-center gap-2.5 bg-[var(--color-sand)] px-7 py-3.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--color-deep-sea)] transition-colors hover:bg-[var(--color-warm-white)]"
                      >
                        Request a Tailored Proposal
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/submit:translate-x-1" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}

          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 font-sans text-xs font-light tracking-[0.06em] text-[var(--color-crystal-water)] hover:text-[var(--color-sand)]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Prefer WhatsApp? Speak with our concierge.
          </a>
        </div>
      </div>
    </section>
  )
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={`${id}-error`} role="alert" className="font-sans text-xs text-[var(--color-sand)]">
      {message}
    </p>
  )
}
