# UP Work — لوحة التحكم (React + Vite)

لوحة تحكم مخصّصة (مش Filament) لإدارة محتوى موقع **UP Work**. مبنية بـ **React 18 + Vite**، واجهة **عربية RTL**، وبتستهلك الـ **Laravel Admin API** (Phase 1) بمصادقة **Bearer token** (Sanctum).

## المميزات
- **تسجيل دخول** بالتوكن (يتخزّن في `localStorage`)، وحماية كل الصفحات، وخروج آمن.
- **لوحة معلومات**: عدّادات (مشاريع، خدمات، فيديوهات، ألبومات، رسائل) + أحدث الرسائل.
- **إدارة كاملة (CRUD)** مدفوعة بالـ config لكل قسم:
  - الخدمات · تصنيفات المشاريع · المشاريع · تصنيفات الفيديو · الفيديوهات · ألبومات الصور
- **تحرير ثنائي اللغة** (عربي/إنجليزي) لكل الحقول عبر تبويبات داخل الحقل.
- **رفع الصور**: صورة مفردة (غلاف/خدمة/شعار) ومعرض متعدد، مع حذف الصور الموجودة.
- **حقول العلاقات** (اختيار تصنيف للمشروع/الفيديو).
- **أقسام الصفحات**: محرّر مرن لنصوص الصفحة الرئيسية و«من نحن» (نصوص + عناصر متكرّرة كالركائز والإحصائيات والقيم).
- **الإعدادات**: بيانات الموقع، التواصل، السوشيال، ألوان الهوية، الإمكانيات، والشعار.
- **الرسائل**: عرض، فتح (تعليم كمقروء تلقائياً)، رد بالبريد، وحذف — مع شارة «غير مقروءة» في القائمة الجانبية.

## المتطلبات
- Node.js **18+** (الأفضل 20+)
- npm
- الـ Laravel Backend (Phase 1) شغّال للوصول للبيانات الحقيقية.

## التشغيل محلياً
```bash
npm install
npm run dev
```
اللوحة هتفتح على `http://localhost:5174` (بورت مختلف عن الموقع العام `5173`).

> أثناء التطوير، أي طلب على `/api` بيتحوّل (proxy) للـ Laravel على `http://localhost:8000` (متظبوط في `vite.config.js`).

### بيانات الدخول الافتراضية (من الـ seeder)
```
البريد: admin@upwork-eg.com
كلمة المرور: Password123!
```
> غيّرها فوراً في بيئة الإنتاج.

## الربط بالـ Backend
انسخ `.env.example` لـ `.env`:
```env
# تطوير: proxy لـ localhost:8000
VITE_API_URL=/api
# إنتاج: وجّهه على الـ API المنشور
# VITE_API_URL=https://api.upwork-eg.com/api
```

## البناء للإنتاج
```bash
npm run build      # يطلّع dist/
npm run preview
```
اللوحة Single-Page App، فلازم السيرفر يرجّع `index.html` لأي مسار (نفس ملاحظة SPA في الموقع العام: Nginx `try_files`, Netlify `_redirects`, Vercel rewrites). يُفضّل استضافتها على دومين/مسار محمي (مثلاً `admin.upwork-eg.com`).

## كيف تتوسّع
كل الأقسام معرّفة في `src/config/resources.js`. لإضافة قسم جديد أو حقل: عدّل الـ config فقط — القائمة والفورم بيتولّدوا تلقائياً.
أنواع الحقول المدعومة: `ml_text`, `ml_textarea`, `text`, `number`, `bool`, `select`, `relation`, `image`, `gallery`.

## الهيكل
```
src/
├── api/client.js        # axios + إضافة التوكن + معالجة 401
├── auth/AuthContext.jsx # حالة المصادقة (login/logout/me)
├── config/resources.js  # تعريف كل الأقسام والحقول والقائمة الجانبية
├── components/          # Layout, Sidebar, Field, DataTable, Modal, icons ...
├── lib/                 # ml (ثنائي اللغة), toast, badge (عدّاد الرسائل)
├── pages/               # Login, Dashboard, ResourceList/Form, PageSections, Settings, Messages
├── styles.css
├── App.jsx              # الراوتنج (محمي بـ ProtectedRoute داخل Layout)
└── main.jsx
```

## ملاحظات
- الحقول ثنائية اللغة تُرسل للـ API بصيغة `field[ar]` / `field[en]` (multipart) أو `{ ar, en }` (JSON).
- تعديلات الصور تُرسل عبر `POST` مع `_method=PUT` (method spoofing) لأن PHP لا يقرأ `multipart` على `PUT`.
- جزء **الفيديوهات**: تكتب رابط Vimeo أو الـ ID، والـ backend بيستخرج الـ thumbnail تلقائياً.

---

## تحديثات إضافية
- **Pagination**: قوائم الأقسام والرسائل بقت بـ pagination حقيقي (server-side، 15/صفحة) — القائمة بتطلب `?page=&per_page=` وبتقرأ `meta`. عدّادات الـ Dashboard وشارة الرسائل غير المقروءة بتعتمد على `meta.total` (دقيقة مهما كان عدد العناصر).
- **تغيير كلمة المرور**: صفحة `/account` (من القائمة الجانبية) بتستخدم `PUT /api/me/password` (`current_password`, `password`, `password_confirmation`). بعد التغيير بيتم إلغاء توكنات الأجهزة الأخرى مع إبقاء جلستك الحالية.

> ملاحظة: endpoint تغيير كلمة المرور مُضاف في الباك إند (Phase 1) — تأكد إنك بتستخدم آخر نسخة من `upwork-api-backend`.
