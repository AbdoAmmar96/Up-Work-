# UP Work — الموقع العام (React + Vite)

الموقع العام لـ **UP Work** (هندسة ومقاولات). مبني بـ **React 18 + Vite**، ثنائي اللغة **عربي/إنجليزي مع دعم RTL** كامل، وبيستهلك الـ **Laravel API** (Phase 1). الموقع مصمّم بحيث **يشتغل ويتعرض كامل حتى من غير ما الـ backend يكون شغّال** — لأنه بيقع تلقائياً على محتوى احتياطي مدمج (نفس محتوى الـ seeder).

## الصفحات
الرئيسية · من نحن · الخدمات · المشاريع (+ صفحة تفاصيل لكل مشروع) · المركز الإعلامي (فيديوهات Vimeo) · معرض الصور · تواصل معنا.

## المميزات
- **عربي/إنجليزي + RTL** عن طريق `react-i18next` مع تبديل لحظي للاتجاه واللغة (وتخزينها).
- **حركات احترافية** بـ `framer-motion` (ظهور تدريجي عند التمرير، دخول الهيرو، تأثيرات hover).
- **خط Alexandria** (خط الهوية الرسمي) من Google Fonts.
- **هوية بصرية هندسية**: خلفيات داكنة، شبكة blueprint، خطوط مائلة مستوحاة من اللوجو، أرقام كبيرة للأقسام.
- **اللوجو الحقيقي** مستخرج من البراند بوك (نسخة ملوّنة + بيضا + علامة مصغّرة).
- **طبقة API ذكية**: تحاول الجلب من الـ backend وتقع على المحتوى الاحتياطي عند أي فشل.

## المتطلبات
- Node.js **18+** (الأفضل 20+)
- npm

## التشغيل محلياً
```bash
npm install
npm run dev
```
الموقع هيفتح على `http://localhost:5173`.

> أثناء التطوير، أي طلب على `/api` بيتحوّل تلقائياً (proxy) للـ Laravel على `http://localhost:8000` (متظبوط في `vite.config.js`). شغّل الـ backend بالتوازي عشان تجيب بيانات حقيقية، أو سيبه قافل والموقع هيشتغل بالمحتوى الاحتياطي.

## الربط بالـ Backend
انسخ `.env.example` لـ `.env` وظبط الـ API:
```env
# تطوير (الافتراضي) — proxy لـ localhost:8000
VITE_API_URL=/api

# إنتاج — وجّهه على الـ API المنشور
# VITE_API_URL=https://api.upwork-eg.com/api
```

## البناء للإنتاج
```bash
npm run build      # يطلّع مجلد dist/
npm run preview    # معاينة محلية للبناء
```

### مهم عند الاستضافة (SPA routing)
الموقع Single-Page App بـ client-side routing، فلازم السيرفر يرجّع `index.html` لأي مسار غير موجود:
- **Nginx**: `try_files $uri $uri/ /index.html;`
- **Netlify**: ملف `public/_redirects` فيه `/*  /index.html  200`
- **Vercel**: rewrite كل المسارات لـ `/index.html`
- **Apache**: `.htaccess` بـ `FallbackResource /index.html`

## الهيكل
```
src/
├── api/          # axios client + طبقة المحتوى (API + fallback)
├── components/   # Header, Footer, Hero, ProjectCard, Lightbox, icons ...
├── context/      # SiteProvider (الإعدادات العامة)
├── data/         # fallback.js (المحتوى الاحتياطي = نفس الـ seeder)
├── hooks/        # useContent
├── lib/          # i18nText (اختيار العربي/الإنجليزي)
├── pages/        # الصفحات السبعة + تفاصيل المشروع
├── styles/       # tokens.css + app.css
├── i18n.js       # نصوص الواجهة + إدارة الاتجاه RTL/LTR
├── App.jsx       # الراوتنج
└── main.jsx
public/           # logo-color / logo-white / logo-mark (+white)
```

## ملاحظات
- **المركز الإعلامي**: الفيديوهات Vimeo، بتتفتح في نافذة (lightbox). في فيديو نموذجي واحد في المحتوى الاحتياطي — استبدله بفيديوهات UP Work الحقيقية من لوحة التحكم.
- **معرض الصور / المشاريع**: لمّا ترفع صور حقيقية من اللوحة، هتظهر مكان الـ placeholders المصمّمة (اللي عليها علامة اللوجو).
- **حقوق التصميم**: فوتر الموقع فيه حقوق **"شريك الأعمال — Business Partner"** مع رابط `https://bp-eg.com` (مطلوب).
- كل النصوص اللي بتيجي من الـ API بصيغة `{ ar, en }` والواجهة بتختار حسب اللغة الحالية.

---

## إضافات (SEO · Analytics · واتساب)

### زر واتساب عائم
زر عائم تحت يمين الموقع بيفتح محادثة واتساب على الرقم من **الإعدادات** (`settings.whatsapp`). بيظهر تلقائياً طول ما الرقم موجود، مع رسالة جاهزة بالعربي/الإنجليزي.

### SEO لكل صفحة
- مكوّن `Seo` بيحدّث `title` و`description` و**Open Graph / Twitter** ديناميكياً لكل صفحة (صفحة المشروع بتاخد عنوان وصورة المشروع نفسه).
- ميتا OG افتراضية مدمجة في `index.html`، والدومين بيتحقن وقت البناء من `VITE_SITE_URL`.
- صورة المشاركة: `public/og-image.png` (1200×630، شعار UP Work على خلفية الهوية).
- **مهم:** سكريبتات السوشيال (فيسبوك/لينكدإن) بتقرأ الـ OG الافتراضي من الـ HTML الثابت. لو محتاج preview مختلف **لكل صفحة** على السوشيال، ده محتاج **prerender/SSR** (الـ OG الديناميكي شغّال مع Google والمتصفح).

### sitemap.xml و robots.txt
موجودين في `public/`. **استبدل الدومين** `upwork-eg.com` بدومينك الحقيقي قبل النشر.

### Analytics / Meta Pixel
حُط الـ IDs في `.env` (فاضية = متعطّلة):
```env
VITE_SITE_URL=https://upwork-eg.com
VITE_GA_ID=G-XXXXXXXXXX
VITE_FB_PIXEL=000000000000000
```
بيتفعّلوا تلقائياً، والـ **page views بتتسجّل عند كل تنقّل** بين الصفحات (SPA).
