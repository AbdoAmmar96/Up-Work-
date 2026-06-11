# UP Work — Laravel 11 API (Backend)

الـ Backend بتاع موقع **UP Work** (هندسة ومقاولات). ده API مستقل (decoupled) بيشتغل بـ **Laravel 11 + Sanctum**، وبيخدم واجهتين منفصلتين بـ React/Vite:

1. **الموقع العام** (Phase 3) — بيقرأ من الـ public endpoints.
2. **لوحة تحكم مخصّصة** (Phase 2) — React dashboard بتتكلم مع الـ admin endpoints عن طريق توكن (Bearer).

كل المحتوى **ثنائي اللغة (عربي/إنجليزي)** — كل حقل نصّي بيرجع `{ "ar": "...", "en": "..." }` فالواجهة تبدّل اللغة من غير ما تطلب البيانات تاني.

---

## 1) المتطلبات (Prerequisites)

- PHP **8.3+** (8.4 مفضّل — أنت شغّال Herd)
- Composer
- MySQL 8 (أو MariaDB)
- Laravel Herd (أسهل طريقة للتشغيل المحلي)

## 2) التنصيب (Quick start)

من جوّه فولدر المشروع المضغوط:

```bash
bash setup.sh upwork-api-app
```

السكربت بيعمل التالي:
- ينشئ مشروع Laravel 11 جديد باسم `upwork-api-app`
- يركّب Sanctum (`php artisan install:api`)
- يركّب حزم Spatie (media-library, permission, sluggable, translatable)
- ينشر ميجريشن الحزم
- ينسخ ملفات UP Work المخصّصة جوّه المشروع
- يجهّز `.env` ويولّد `APP_KEY` ويعمل `storage:link`

بعدها افتح `.env` وحطّ بيانات قاعدة البيانات:

```env
DB_DATABASE=upwork
DB_USERNAME=root
DB_PASSWORD=secret
```

وبعدين:

```bash
cd upwork-api-app
php artisan migrate:fresh --seed
php artisan serve        # أو:  herd link   (مفضّل)
```

> **مهم:** الـ seeder متصمّم لقاعدة بيانات نظيفة، فاستخدم `migrate:fresh --seed`.

### بيانات الدخول للأدمن
```
email:    admin@upwork-eg.com
password: Password123!
```
(غيّر الباسورد بعد أول دخول)

---

## 3) المصادقة (Auth flow)

التوكن Bearer (مناسب لواجهة React منفصلة):

```http
POST /api/login
{ "email": "admin@upwork-eg.com", "password": "Password123!", "device_name": "dashboard" }

→ { "token": "xxx", "user": {...} }
```

بعد كده ابعت التوكن مع كل طلب إداري:

```
Authorization: Bearer <token>
Accept: application/json
```

- `GET /api/me` — بيانات المستخدم الحالي
- `POST /api/logout` — إلغاء التوكن الحالي
- `PUT /api/me/password` — تغيير كلمة المرور (`current_password`, `password`, `password_confirmation`)

CORS متضبوط من `.env` عن طريق `FRONTEND_URLS` (origins مفصولة بفاصلة، من غير `/` في الآخر).

---

## 4) خريطة الـ API

### Public (قراءة فقط — للموقع العام)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/settings` | إعدادات الموقع العامة (اسم، شعار، تواصل، ألوان، قدرات) |
| GET | `/api/pages?page=home` | بلوكات الصفحات القابلة للتعديل (home/about) |
| GET | `/api/pages/{key}` | بلوك واحد بالـ key (مثلاً `home_hero`) |
| GET | `/api/services` | الخدمات |
| GET | `/api/services/{slug}` | خدمة واحدة |
| GET | `/api/project-categories` | تصنيفات المشاريع |
| GET | `/api/projects?category={slug}&featured=1&per_page=9` | المشاريع (فلترة + pagination) |
| GET | `/api/projects/{slug}` | مشروع واحد (مع المعرض) |
| GET | `/api/video-categories` | تصنيفات الفيديو |
| GET | `/api/videos?category={slug}` | فيديوهات (Vimeo) |
| GET | `/api/albums` | ألبومات الصور |
| GET | `/api/albums/{slug}` | ألبوم واحد (مع الصور) |
| POST | `/api/contact` | إرسال رسالة تواصل |

### Admin (محميّة بـ `auth:sanctum` — للوحة التحكم)
كلها تحت البادئة `/api/admin`:

| Resource | Endpoints |
|----------|-----------|
| Dashboard | `GET /dashboard` (إحصائيات + آخر الرسائل) |
| Services | `GET/POST /services`, `GET/PUT/DELETE /services/{id}` (رفع صورة عبر `image`) |
| Project categories | `GET/POST /project-categories`, `PUT/DELETE /project-categories/{id}` |
| Projects | `GET/POST /projects`, `GET/PUT/DELETE /projects/{id}`, `DELETE /projects/{id}/images/{media}` (غلاف `cover` + معرض `gallery[]`) |
| Video categories | `GET/POST /video-categories`, `PUT/DELETE /video-categories/{id}` |
| Videos | `GET/POST /videos`, `GET/PUT/DELETE /videos/{id}` (الـ thumbnail بيتجاب أوتوماتيك من Vimeo) |
| Albums | `GET/POST /albums`, `GET/PUT/DELETE /albums/{id}`, `DELETE /albums/{id}/images/{media}` (صور `images[]`) |
| Page sections | `GET /page-sections`, `GET/PUT /page-sections/{id}` |
| Settings | `GET /settings`, `PUT /settings` (`{ settings: {key: value} }`), `POST /settings/logo` (`logo` ملف) |
| Messages | `GET /messages`, `GET /messages/{id}`, `PUT /messages/{id}/read`, `DELETE /messages/{id}` |

**شكل الحقول ثنائية اللغة في الإرسال (store/update):**
```json
{ "title": { "ar": "المقاولات والإنشاءات", "en": "Contracting & Construction" } }
```

---

## 5) ملاحظة عن الفيديو (Vimeo)

الفيديوهات بتتخزّن كـ **Vimeo ID** بس (مش رفع ملفات على السيرفر). تقدر تبعت الـ ID خام (`76979871`) أو أي رابط Vimeo والـ API هيستخرج الرقم. الـ embed بيرجع جاهز في `embed_url`. عند الإضافة بنحاول نجيب صورة الغلاف أوتوماتيك من Vimeo oEmbed.

> في الـ seeder فيه فيديو نموذجي واحد للتجربة — استبدله بفيديوهات UP Work الحقيقية من اللوحة.

---

## 6) اللي جاي (Next phases)

- ✅ **Phase 1 — Backend API** (الملف ده)
- ⬜ **Phase 2 — لوحة تحكم React/Vite مخصّصة**: تسجيل دخول + CRUD لكل قسم، رفع صور، تعديل نصوص الصفحات والإعدادات.
- ⬜ **Phase 3 — الموقع العام React/Vite**: 7 صفحات (الرئيسية، من نحن، الخدمات، المشاريع، المركز الإعلامي/Vimeo، معرض الصور، تواصل)، عربي/إنجليزي + RTL، خط Alexandria، استخراج اللوجو، وحقوق "شريك الأعمال" في الفوتر.

---

## 7) اللي مش متضمّن (Scope)
- الاستضافة والدومين والـ SSL (مسؤوليتك)
- إعداد SMTP للإيميل
- النسخ الاحتياطي (يُنصح بـ spatie/laravel-backup)

البنية اتعملت بعناية وجاهزة للتشغيل، بس راجعها واعمل smoke-test قبل ما تورّيها للعميل.
