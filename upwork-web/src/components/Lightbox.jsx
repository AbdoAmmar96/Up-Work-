import React, { useEffect, useCallback } from 'react'
import { Close, ChevronLeft, ChevronRight } from './icons'

// Flexible modal: pass `video` (embed URL for iframe) OR `videoFile` (mp4 URL for HTML5 player)
// OR `images` (array) + index/setIndex.
export default function Lightbox({ video, videoFile, images, index = 0, setIndex, onClose }) {
  const hasGallery = Array.isArray(images) && images.length > 0

  const prev = useCallback(
    () => setIndex && setIndex((index - 1 + images.length) % images.length),
    [index, images, setIndex]
  )
  const next = useCallback(
    () => setIndex && setIndex((index + 1) % images.length),
    [index, images, setIndex]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (hasGallery && e.key === 'ArrowLeft') prev()
      if (hasGallery && e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [hasGallery, prev, next, onClose])

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Close">
          <Close />
        </button>

        {video && (
          <div className="lightbox__frame">
            <iframe
              src={`${video}?autoplay=1&title=0&byline=0&portrait=0&rel=0`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="video"
            />
          </div>
        )}

        {videoFile && (
          <div className="lightbox__frame">
            <video src={videoFile} controls autoPlay playsInline style={{ width: '100%', height: '100%' }} />
          </div>
        )}

        {hasGallery && (
          <>
            <img className="lightbox__img" src={images[index]} alt="" />
            {images.length > 1 && (
              <>
                <button className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous">
                  <ChevronLeft />
                </button>
                <button className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next">
                  <ChevronRight />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
