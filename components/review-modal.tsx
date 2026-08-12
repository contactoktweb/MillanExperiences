"use client"

import { useState, useRef, useEffect } from "react"
import { X, Upload, Loader2, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      // Retraso mínimo para permitir que el DOM se pinte antes de animar
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    } else {
      setVisible(false)
      const timer = setTimeout(() => {
        setMounted(false)
        // Reset form state after exit animation
        setRating(5)
        setImages([])
        setImagePreviews([])
        setSuccess(false)
        setError("")
        if (formRef.current) formRef.current.reset()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setImages(prev => [...prev, ...newFiles])
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => {
      const newPreviews = [...prev]
      URL.revokeObjectURL(newPreviews[index])
      newPreviews.splice(index, 1)
      return newPreviews
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    formData.append("rating", rating.toString())
    
    formData.delete("images")
    images.forEach(img => formData.append("images", img))

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Algo salió mal")
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div 
        className={cn(
          "relative w-full max-w-lg bg-[var(--color-warm-white)] rounded-sm shadow-xl flex flex-col max-h-[95dvh] sm:max-h-[90dvh] overflow-hidden transition-all duration-300 ease-out",
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        )}
      >
        {/* Cabecera Fija */}
        <div className="flex-shrink-0 px-6 pt-6 md:px-8 md:pt-8 pb-4 relative border-b border-[var(--color-deep-sea)]/5">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-[var(--color-deep-sea)]/50 hover:text-[var(--color-deep-sea)] transition-colors p-2"
            aria-label="Cerrar modal"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <h2 className="font-serif text-3xl text-[var(--color-deep-sea)] mb-2 pr-6">
            Comparte tu experiencia
          </h2>
          <p className="font-sans text-sm font-light text-[var(--color-deep-sea)]/70">
            Tu opinión es muy importante para nosotros. Escribe una reseña y adjunta fotos de tu viaje.
          </p>
        </div>

        {/* Cuerpo Scrolleable */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6 md:px-8 md:pb-8">
          {success ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FBBC05]/20 flex items-center justify-center text-[#FBBC05] mb-4">
                <Star size={32} fill="currentColor" />
              </div>
              <h3 className="font-serif text-2xl text-[var(--color-deep-sea)] mb-2">¡Gracias por tu reseña!</h3>
              <p className="font-sans text-sm font-light text-[var(--color-deep-sea)]/80">
                Tu reseña ha sido enviada y está pendiente de aprobación.
              </p>
              <button 
                onClick={onClose}
                className="mt-8 px-8 py-4 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] font-sans text-xs uppercase tracking-widest hover:bg-[var(--color-deep-sea)]/90 transition-colors"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-[var(--color-deep-sea)]/80 mb-3">
                  Calificación
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="text-[#FBBC05] transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        size={32} 
                        fill={star <= (hoveredRating || rating) ? "currentColor" : "transparent"} 
                        strokeWidth={star <= (hoveredRating || rating) ? 0 : 1.5}
                        className={star > (hoveredRating || rating) ? "text-[var(--color-deep-sea)]/30" : ""}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block font-sans text-xs uppercase tracking-widest text-[var(--color-deep-sea)]/80 mb-2">
                  Tu Nombre
                </label>
                <input 
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ej. María Pérez"
                  className="w-full border-b border-[var(--color-deep-sea)]/20 bg-transparent py-3 font-sans text-base text-[var(--color-deep-sea)] outline-none focus:border-[var(--color-sand)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="quote" className="block font-sans text-xs uppercase tracking-widest text-[var(--color-deep-sea)]/80 mb-2">
                  Tu Reseña
                </label>
                <textarea 
                  required
                  id="quote"
                  name="quote"
                  rows={4}
                  placeholder="Cuéntanos cómo fue tu experiencia..."
                  className="w-full border border-[var(--color-deep-sea)]/20 bg-transparent p-3 font-sans text-base text-[var(--color-deep-sea)] outline-none focus:border-[var(--color-sand)] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-[var(--color-deep-sea)]/80 mb-2">
                  Imágenes (Opcional)
                </label>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-2">
                  {imagePreviews.map((preview, i) => (
                    <div key={i} className="relative aspect-square group">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-sm" />
                      <button 
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  
                  {imagePreviews.length < 5 && (
                    <label className="aspect-square border-2 border-dashed border-[var(--color-deep-sea)]/20 flex flex-col items-center justify-center gap-2 text-[var(--color-deep-sea)]/50 hover:text-[var(--color-deep-sea)] hover:border-[var(--color-deep-sea)]/40 hover:bg-[var(--color-deep-sea)]/5 transition-all cursor-pointer rounded-sm">
                      <Upload size={20} strokeWidth={1.5} />
                      <span className="font-sans text-[0.6rem] uppercase tracking-wider text-center px-2">Subir foto</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {error && (
                <p className="font-sans text-sm text-red-600 bg-red-50 p-3 rounded-sm border border-red-100">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 bg-[var(--color-sand)] py-4 font-sans text-xs font-semibold uppercase tracking-widest text-[var(--color-warm-white)] transition-colors hover:bg-[var(--color-dark-sand)] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Reseña"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
