// Optional analytics: only activates when env IDs are provided.
// VITE_GA_ID  -> Google Analytics 4 (e.g. G-XXXXXXXXXX)
// VITE_FB_PIXEL -> Meta (Facebook) Pixel ID
const GA_ID = import.meta.env.VITE_GA_ID
const FB_PIXEL = import.meta.env.VITE_FB_PIXEL
let started = false

export function initAnalytics() {
  if (started || typeof window === 'undefined') return
  started = true

  if (GA_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    // Page views are sent manually on route change (SPA).
    window.gtag('config', GA_ID, { send_page_view: false })
  }

  if (FB_PIXEL) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }
      if (!f._fbq) f._fbq = n
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []
      t = b.createElement(e); t.async = !0; t.src = v
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
    window.fbq('init', FB_PIXEL)
  }
}

export function trackPageView(path) {
  if (typeof window === 'undefined') return
  if (GA_ID && window.gtag) window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href })
  if (FB_PIXEL && window.fbq) window.fbq('track', 'PageView')
}
