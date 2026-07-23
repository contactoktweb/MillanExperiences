"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const availableServices = [
  "Boats",
  "Houses",
  "Groups & events",
  "Concierge",
  "Private Chef",
  "Bachelor/Bachelorette",
]

const inputBase =
  "w-full rounded-md border border-[#E0E0E0] bg-[#FAFAFA] px-4 py-3 font-sans text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition-colors"
const labelBase = "block font-sans text-[15px] text-gray-800 pt-3"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "+57 ",
    email: "",
    services: [] as string[],
    startDate: "",
    endDate: "",
    message: "",
  })

  const set = (key: keyof typeof form, value: any) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: "" }))
  }

  const toggleService = (service: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }))
    setErrors((e) => ({ ...e, services: "" }))
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = "Required"
    if (!form.lastName.trim()) next.lastName = "Required"
    if (!form.phone.trim() || form.phone.trim() === "+57") next.phone = "Required"
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Required"
    if (form.services.length === 0) next.services = "Select at least one service"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-[#F6F6F6] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="text-center">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
            Contact
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none text-gray-900">
            Tell us about your vision
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-800">
            Tell us how you envision your next escape. We will take care of the rest, ensuring the flawless execution of your itinerary so you can simply enjoy the experience at your own pace.
          </p>
        </div>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="mx-auto mt-16 max-w-2xl rounded-lg border border-gray-200 bg-white p-12 text-center"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#5b7278] text-white">
              <Check className="h-8 w-8" strokeWidth={2} />
            </span>
            <h3 className="mt-8 font-serif text-3xl text-gray-900">Thank you.</h3>
            <p className="mt-4 font-sans text-base text-gray-600">
              Your request has reached our concierge. We will be in touch shortly with a tailored proposal.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-16 flex flex-col gap-8" noValidate>
            {/* Name */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_1fr] md:gap-8">
              <label htmlFor="firstName" className={labelBase}>
                Name *
              </label>
              <div>
                <input
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  className={inputBase}
                  aria-invalid={!!errors.firstName}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_1fr] md:gap-8">
              <label htmlFor="lastName" className={labelBase}>
                Last Name *
              </label>
              <div>
                <input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  className={inputBase}
                  aria-invalid={!!errors.lastName}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_1fr] md:gap-8">
              <label htmlFor="phone" className={labelBase}>
                Phone number *
              </label>
              <div>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputBase}
                  aria-invalid={!!errors.phone}
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_1fr] md:gap-8">
              <label htmlFor="email" className={labelBase}>
                E-mail *
              </label>
              <div>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputBase}
                  aria-invalid={!!errors.email}
                />
              </div>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_1fr] md:gap-8">
              <label className={labelBase}>
                Service of interest: *
              </label>
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 pt-3">
                {availableServices.map((service) => (
                  <label key={service} className="flex items-center gap-3 font-sans text-[15px] text-gray-800 cursor-pointer">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={form.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="peer h-5 w-5 appearance-none rounded border border-gray-300 bg-transparent checked:border-[#5b7278] checked:bg-[#5b7278] focus:outline-none focus:ring-1 focus:ring-[#5b7278] focus:ring-offset-1"
                      />
                      <Check className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                    </div>
                    {service}
                  </label>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_1fr] md:gap-8">
              <label htmlFor="startDate" className={labelBase}>
                Travel Start Date
              </label>
              <div>
                <input
                  id="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => set("startDate", e.target.value)}
                  className={cn(inputBase, "appearance-none")}
                />
              </div>
            </div>

            {/* End Date */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_1fr] md:gap-8">
              <label htmlFor="endDate" className={labelBase}>
                Travel End Date
              </label>
              <div>
                <input
                  id="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => set("endDate", e.target.value)}
                  className={cn(inputBase, "appearance-none")}
                />
              </div>
            </div>

            {/* Message */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_1fr] md:gap-8">
              <label htmlFor="message" className={labelBase}>
                Message
              </label>
              <div>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={cn(inputBase, "resize-none")}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-8">
              <div />
              <div>
                <button
                  type="submit"
                  className="rounded-full bg-[#5b7278] px-8 py-3.5 font-sans text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
