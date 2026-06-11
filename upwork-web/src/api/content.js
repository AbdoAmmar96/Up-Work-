import client from './client'
import { fallback } from '../data/fallback'

// Each loader tries the live API first and gracefully falls back to bundled
// seed content, so the site renders fully even before the backend is wired up.
async function tryGet(path, params, fb) {
  try {
    const res = await client.get(path, { params })
    const data = res.data?.data ?? res.data
    if (data == null || (Array.isArray(data) && data.length === 0)) return fb
    return data
  } catch (e) {
    return fb
  }
}

export const getSettings = () => tryGet('/settings', {}, fallback.settings)
export const getPages = (page) => tryGet('/pages', page ? { page } : {}, fallback.pages)
export const getServices = () => tryGet('/services', {}, fallback.services)
export const getProjectCategories = () => tryGet('/project-categories', {}, fallback.projectCategories)
export const getProjects = (params = {}) => tryGet('/projects', params, fallback.projects)
export const getProject = (slug) =>
  tryGet(`/projects/${slug}`, {}, fallback.projects.find((p) => p.slug === slug) || null)
export const getVideoCategories = () => tryGet('/video-categories', {}, fallback.videoCategories)
export const getVideos = (params = {}) => tryGet('/videos', params, fallback.videos)
export const getAlbums = () => tryGet('/albums', {}, fallback.albums)
export const getAlbum = (slug) =>
  tryGet(`/albums/${slug}`, { with_images: 1 }, fallback.albums.find((a) => a.slug === slug) || null)

export async function sendContact(payload) {
  const res = await client.post('/contact', payload)
  return res.data
}

// Helper: turn the flat pages array into a { key: payload } map.
export function sectionsToMap(sections) {
  const map = {}
  ;(sections || []).forEach((s) => {
    map[s.key] = s.payload
  })
  return map
}
