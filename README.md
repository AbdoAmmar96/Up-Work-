# UP Work — Engineering & Construction (Monorepo)

موقع **UP Work** للهندسة والمقاولات. المشروع مقسوم لتلات أجزاء مستقلة:

| الفولدر | الوصف | التقنية | المنفذ (dev) |
|--------|-------|---------|-------------|
| [`upwork-api`](upwork-api) | الـ Backend / API | Laravel 11 + Sanctum | 8000 |
| [`upwork-dashboard`](upwork-dashboard) | لوحة التحكم الإدارية | React + Vite | 5174 |
| [`upwork-web`](upwork-web) | الموقع العام (عربي/إنجليزي + RTL) | React + Vite | 5173 |

كل المحتوى **ثنائي اللغة** (`{ "ar": "...", "en": "..." }`)، والواجهتان بتتكلما مع الـ API عن طريق proxy على `/api` → `localhost:8000`.

---

## التشغيل المحلي (Quick start)

### 1) الـ Backend (API)
```bash
cd upwork-api
bash setup.sh upwork-api-app        # ينشئ مشروع Laravel جاهز في upwork-api-app/
cd upwork-api-app
# عدّل .env وحط بيانات قاعدة البيانات (DB_DATABASE/DB_USERNAME/DB_PASSWORD)
php artisan migrate:fresh --seed
php artisan serve --port=8000
```
بيانات دخول الأدمن: `admin@upwork-eg.com` / `Password123!`

> **ملاحظة:** فولدر `upwork-api/upwork-api-app/` بيتولّد محليًا ومش متضمّن في الريبو (هو build artifact). المصدر الحقيقي هو `upwork-api/stubs/` + `setup.sh`.

### 2) الموقع العام
```bash
cd upwork-web
cp .env.example .env
npm install
npm run dev          # http://localhost:5173
```

### 3) لوحة التحكم
```bash
cd upwork-dashboard
cp .env.example .env
npm install
npm run dev          # http://localhost:5174
```

---

تفاصيل أكتر لكل جزء موجودة في الـ README بتاعه جوّه الفولدر.
