import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ar: {
    translation: {
      brand: 'UP Work',
      tagline: 'نهندس · نبني · نرتقي',
      nav: { home: 'الرئيسية', about: 'من نحن', services: 'الخدمات', projects: 'المشاريع', media: 'المركز الإعلامي', gallery: 'معرض الصور', contact: 'تواصل معنا' },
      cta: { start: 'ابدأ مشروعك', see_work: 'شاهد أعمالنا', contact: 'تواصل معنا', send: 'إرسال الرسالة', view_project: 'تفاصيل المشروع', view_all: 'كل المشاريع', back: 'رجوع', watch: 'مشاهدة', explore: 'استكشف' },
      filter: { all: 'الكل' },
      stats_title: 'أرقام بتتكلم',
      capabilities_title: 'إمكانياتنا',
      services_eyebrow: 'خدماتنا',
      services_title: 'ماذا نقدمه',
      featured_eyebrow: 'مختارات من أعمالنا',
      featured_title: 'مشاريع نفخر بيها',
      pillars_eyebrow: 'ليه UP Work',
      contact_eyebrow: 'تواصل',
      contact_title: 'عندك مشروع؟ يلا نبدأ',
      form: { name: 'الاسم', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', subject: 'الموضوع', message: 'رسالتك', sending: 'جاري الإرسال...', success: 'تم استلام رسالتك، هنتواصل معاك قريب.', error: 'حصل خطأ، حاول تاني.', required: 'مطلوب' },
      contact_info: { phone: 'الهاتف', email: 'البريد', address: 'العنوان', hours: 'مواعيد العمل', follow: 'تابعنا' },
      media_eyebrow: 'المركز الإعلامي',
      media_title: 'فيديوهات وأعمال',
      gallery_eyebrow: 'معرض الصور',
      gallery_title: 'لقطات من الميدان',
      no_videos: 'لسه مفيش فيديوهات.',
      no_images: 'لسه مفيش صور في الألبوم ده.',
      no_projects: 'لسه مفيش مشاريع في التصنيف ده.',
      photos_count: 'صورة',
      footer: { rights: 'كل الحقوق محفوظة', designed: 'تصميم وتطوير', quick: 'روابط سريعة', tagline_en: 'Building Beyond Today. Elevating Tomorrow.' },
      loading: 'جاري التحميل...',
      lang_switch: 'EN',
    },
  },
  en: {
    translation: {
      brand: 'UP Work',
      tagline: 'Engineer · Build · Elevate',
      nav: { home: 'Home', about: 'About', services: 'Services', projects: 'Projects', media: 'Media Center', gallery: 'Gallery', contact: 'Contact' },
      cta: { start: 'Start your project', see_work: 'See our work', contact: 'Contact us', send: 'Send message', view_project: 'View project', view_all: 'All projects', back: 'Back', watch: 'Watch', explore: 'Explore' },
      filter: { all: 'All' },
      stats_title: 'Numbers that speak',
      capabilities_title: 'Our capabilities',
      services_eyebrow: 'Our services',
      services_title: 'What we do',
      featured_eyebrow: 'Selected work',
      featured_title: 'Projects we are proud of',
      pillars_eyebrow: 'Why UP Work',
      contact_eyebrow: 'Get in touch',
      contact_title: 'Have a project? Let’s start',
      form: { name: 'Name', email: 'Email', phone: 'Phone', subject: 'Subject', message: 'Your message', sending: 'Sending...', success: 'Thanks — we’ll get back to you shortly.', error: 'Something went wrong, please try again.', required: 'required' },
      contact_info: { phone: 'Phone', email: 'Email', address: 'Address', hours: 'Working hours', follow: 'Follow us' },
      media_eyebrow: 'Media center',
      media_title: 'Videos & work',
      gallery_eyebrow: 'Photo gallery',
      gallery_title: 'Shots from the field',
      no_videos: 'No videos yet.',
      no_images: 'No images in this album yet.',
      no_projects: 'No projects in this category yet.',
      photos_count: 'photos',
      footer: { rights: 'All rights reserved', designed: 'Designed & developed by', quick: 'Quick links', tagline_en: 'Building Beyond Today. Elevating Tomorrow.' },
      loading: 'Loading...',
      lang_switch: 'ع',
    },
  },
}

const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('upwork_lang')) || 'ar'

i18n.use(initReactI18next).init({
  resources,
  lng: saved,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

function applyDir(lng) {
  const dir = lng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lng)
}
applyDir(i18n.language)
i18n.on('languageChanged', (lng) => {
  applyDir(lng)
  if (typeof localStorage !== 'undefined') localStorage.setItem('upwork_lang', lng)
})

export default i18n
