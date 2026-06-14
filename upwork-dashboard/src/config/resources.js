// Config-driven CRUD. Each resource declares its endpoint, table columns, and form fields.
// Field types: ml_text, ml_textarea, text, number, bool, select, relation, image, gallery.

const ICON_OPTIONS = [
  'building-skyscraper',
  'clipboard-check',
  'road',
  'building',
  'trending',
  'target',
  'layers',
  'spark',
]

export const resources = {
  services: {
    path: '/admin/services',
    title: { ar: 'الخدمات', en: 'Services' },
    singular: { ar: 'خدمة', en: 'Service' },
    icon: 'Tools',
    multipart: true,
    columns: [
      { key: 'image', type: 'thumb' },
      { key: 'title', type: 'ml', label: 'العنوان' },
      { key: 'sort_order', label: 'الترتيب' },
      { key: 'is_active', type: 'bool', label: 'الحالة' },
    ],
    fields: [
      { name: 'title', type: 'ml_text', label: { ar: 'العنوان', en: 'Title' }, required: true },
      { name: 'excerpt', type: 'ml_textarea', label: { ar: 'وصف مختصر', en: 'Excerpt' } },
      { name: 'body', type: 'ml_textarea', label: { ar: 'الوصف الكامل', en: 'Full description' } },
      { name: 'icon', type: 'select', label: { ar: 'الأيقونة', en: 'Icon' }, options: ICON_OPTIONS, default: 'building-skyscraper' },
      { name: 'image', type: 'image', label: { ar: 'صورة الخدمة', en: 'Service image' } },
      { name: 'sort_order', type: 'number', label: { ar: 'الترتيب', en: 'Sort order' }, default: 0 },
      { name: 'is_active', type: 'bool', label: { ar: 'مفعّلة', en: 'Active' }, default: true },
    ],
  },

  'project-categories': {
    path: '/admin/project-categories',
    title: { ar: 'تصنيفات المشاريع', en: 'Project categories' },
    singular: { ar: 'تصنيف', en: 'Category' },
    icon: 'Layers',
    columns: [
      { key: 'title', type: 'ml', label: 'الاسم' },
      { key: 'sort_order', label: 'الترتيب' },
    ],
    fields: [
      { name: 'title', type: 'ml_text', label: { ar: 'الاسم', en: 'Name' }, required: true },
      { name: 'sort_order', type: 'number', label: { ar: 'الترتيب', en: 'Sort order' }, default: 0 },
    ],
  },

  projects: {
    path: '/admin/projects',
    title: { ar: 'المشاريع', en: 'Projects' },
    singular: { ar: 'مشروع', en: 'Project' },
    icon: 'Building',
    multipart: true,
    galleryDelete: true,
    columns: [
      { key: 'cover', type: 'thumb' },
      { key: 'title', type: 'ml', label: 'العنوان' },
      { key: 'category', type: 'rel', label: 'التصنيف' },
      { key: 'year', label: 'السنة' },
      { key: 'is_published', type: 'bool', label: 'النشر' },
    ],
    fields: [
      { name: 'title', type: 'ml_text', label: { ar: 'العنوان', en: 'Title' }, required: true },
      { name: 'category_id', type: 'relation', source: 'project-categories', label: { ar: 'التصنيف', en: 'Category' } },
      { name: 'summary', type: 'ml_textarea', label: { ar: 'ملخص', en: 'Summary' } },
      { name: 'body', type: 'ml_textarea', label: { ar: 'التفاصيل', en: 'Body' } },
      { name: 'location', type: 'ml_text', label: { ar: 'الموقع', en: 'Location' } },
      { name: 'client', type: 'ml_text', label: { ar: 'العميل', en: 'Client' } },
      { name: 'year', type: 'number', label: { ar: 'السنة', en: 'Year' } },
      { name: 'cover', type: 'image', label: { ar: 'صورة الغلاف', en: 'Cover image' } },
      { name: 'gallery', type: 'gallery', label: { ar: 'معرض الصور', en: 'Gallery' } },
      { name: 'is_featured', type: 'bool', label: { ar: 'مميّز (يظهر بالصفحة الرئيسية)', en: 'Featured' }, default: false },
      { name: 'is_published', type: 'bool', label: { ar: 'منشور', en: 'Published' }, default: true },
    ],
  },

  'video-categories': {
    path: '/admin/video-categories',
    title: { ar: 'تصنيفات الفيديو', en: 'Video categories' },
    singular: { ar: 'تصنيف', en: 'Category' },
    icon: 'Layers',
    columns: [
      { key: 'title', type: 'ml', label: 'الاسم' },
      { key: 'sort_order', label: 'الترتيب' },
    ],
    fields: [
      { name: 'title', type: 'ml_text', label: { ar: 'الاسم', en: 'Name' }, required: true },
      { name: 'sort_order', type: 'number', label: { ar: 'الترتيب', en: 'Sort order' }, default: 0 },
    ],
  },

  videos: {
    path: '/admin/videos',
    title: { ar: 'الفيديوهات', en: 'Videos' },
    singular: { ar: 'فيديو', en: 'Video' },
    icon: 'Film',
    multipart: true,
    columns: [
      { key: 'title', type: 'ml', label: 'العنوان' },
      { key: 'category', type: 'rel', label: 'التصنيف' },
      { key: 'is_published', type: 'bool', label: 'النشر' },
    ],
    fields: [
      { name: 'title', type: 'ml_text', label: { ar: 'العنوان', en: 'Title' }, required: true },
      {
        name: 'source',
        type: 'select',
        label: { ar: 'مصدر الفيديو', en: 'Video source' },
        options: ['youtube', 'upload'],
        optionLabels: { youtube: 'رابط YouTube', upload: 'رفع ملف على الموقع' },
        default: 'youtube',
      },
      {
        name: 'youtube_id',
        type: 'text',
        label: { ar: 'رابط أو ID فيديو YouTube', en: 'YouTube URL or ID' },
        showIf: { source: 'youtube' },
        hint: { ar: 'مثال: https://youtu.be/dQw4w9WgXcQ أو dQw4w9WgXcQ', en: 'e.g. https://youtu.be/dQw4w9WgXcQ or dQw4w9WgXcQ' },
      },
      {
        name: 'video',
        type: 'videofile',
        label: { ar: 'ملف الفيديو (mp4)', en: 'Video file (mp4)' },
        showIf: { source: 'upload' },
        hint: { ar: 'الحد الأقصى 150 ميجابايت. صيغ: mp4 / mov / webm', en: 'Max 150MB. Formats: mp4 / mov / webm' },
      },
      { name: 'category_id', type: 'relation', source: 'video-categories', label: { ar: 'التصنيف', en: 'Category' } },
      { name: 'description', type: 'ml_textarea', label: { ar: 'الوصف', en: 'Description' } },
      { name: 'is_published', type: 'bool', label: { ar: 'منشور', en: 'Published' }, default: true },
    ],
  },

  albums: {
    path: '/admin/albums',
    title: { ar: 'ألبومات الصور', en: 'Albums' },
    singular: { ar: 'ألبوم', en: 'Album' },
    icon: 'Photo',
    multipart: true,
    galleryDelete: true,
    columns: [
      { key: 'cover', type: 'thumb' },
      { key: 'title', type: 'ml', label: 'الاسم' },
      { key: 'images_count', label: 'عدد الصور' },
    ],
    fields: [
      { name: 'title', type: 'ml_text', label: { ar: 'الاسم', en: 'Name' }, required: true },
      { name: 'description', type: 'ml_textarea', label: { ar: 'الوصف', en: 'Description' } },
      { name: 'images', type: 'gallery', label: { ar: 'الصور', en: 'Images' } },
    ],
  },
}

// Sidebar grouping
export const navGroups = [
  { label: 'عام', items: [{ to: '/', icon: 'Grid', label: 'لوحة المعلومات' }] },
  {
    label: 'المحتوى',
    items: [
      { to: '/services', icon: 'Tools', label: 'الخدمات' },
      { to: '/project-categories', icon: 'Layers', label: 'تصنيفات المشاريع' },
      { to: '/projects', icon: 'Building', label: 'المشاريع' },
    ],
  },
  {
    label: 'الوسائط',
    items: [
      { to: '/video-categories', icon: 'Layers', label: 'تصنيفات الفيديو' },
      { to: '/videos', icon: 'Film', label: 'الفيديوهات' },
      { to: '/albums', icon: 'Photo', label: 'ألبومات الصور' },
    ],
  },
  {
    label: 'الموقع',
    items: [
      { to: '/page-sections', icon: 'FileText', label: 'أقسام الصفحات' },
      { to: '/settings', icon: 'Cog', label: 'الإعدادات' },
      { to: '/messages', icon: 'Mail', label: 'الرسائل', badge: 'unread' },
    ],
  },
]
