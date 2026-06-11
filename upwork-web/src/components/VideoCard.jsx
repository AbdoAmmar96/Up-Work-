import React from 'react'
import { useLocalized } from '../lib/i18nText'
import { Play } from './icons'

export default function VideoCard({ video, onOpen }) {
  const { tt } = useLocalized()
  if (!video) return null
  return (
    <button className="video-card" onClick={() => onOpen(video)}>
      <div className="video-card__thumb">
        {video.thumbnail_url && <img src={video.thumbnail_url} alt={tt(video.title)} loading="lazy" />}
        <span className="video-card__play">
          <Play />
        </span>
      </div>
      <div className="video-card__body">
        {video.category && <span className="video-card__cat">{tt(video.category.title)}</span>}
        <h3 className="video-card__title">{tt(video.title)}</h3>
      </div>
    </button>
  )
}
