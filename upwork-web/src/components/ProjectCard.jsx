import React from 'react'
import { Link } from 'react-router-dom'
import { useLocalized } from '../lib/i18nText'
import { MapPin } from './icons'

export default function ProjectCard({ project }) {
  const { tt } = useLocalized()
  if (!project) return null
  const cover = project.cover || project.cover_thumb
  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <div className="project-card__media">
        {cover ? (
          <img src={cover} alt={tt(project.title)} loading="lazy" />
        ) : (
          <div className="project-card__placeholder">
            <img src="/logo-mark-white.png" alt="" aria-hidden="true" />
          </div>
        )}
        {project.category && <span className="project-card__tag">{tt(project.category.title)}</span>}
        {project.year && <span className="project-card__year">{project.year}</span>}
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{tt(project.title)}</h3>
        {tt(project.location) && (
          <div className="project-card__meta">
            <MapPin />
            {tt(project.location)}
          </div>
        )}
      </div>
    </Link>
  )
}
