# 🚀 دليل النشر اليدوي على Hostinger — UP Work

نشر التلات أجزاء على استضافة Hostinger Shared:

| الجزء | الدومين | مكان الرفع على السيرفر |
|------|---------|----------------------|
| الموقع العام (web) | `upworkeg.com` | `public_html/` |
| الـ API (Laravel) | `api.upworkeg.com` | `domains/api.upworkeg.com/` |
| لوحة التحكم (dashboard) | `dashboard.upworkeg.com` | `domains/dashboard.upworkeg.com/` |

> **بيانات SSH:** `ssh -p 65002 u393186285@62.72.37.41`

---

## 🧭 نظرة عامة على الخطوات

1. تجهيز الساب دومينز من hPanel
2. إنشاء قاعدة بيانات MySQL
3. رفع ونشر الـ API (Laravel)
4. بناء ورفع الموقع العام + الدّاشبورد
5. تركيب شهادات SSL
6. اختبار نهائي

---

## 1️⃣ إنشاء الساب دومينز (hPanel)

في **hPanel → Domains → Subdomains**، أنشئ:
- `api` (يبقى `api.upworkeg.com`)
- `dashboard` (يبقى `dashboard.upworkeg.com`)

لاحظ مسار كل واحد — Hostinger بيعمل عادةً:
- `domains/api.upworkeg.com/public_html`
- `domains/dashboard.upworkeg.com/public_html`

> ملاحظة مهمة عن الـ API: عشان أمان Laravel، نقطة الدخول لازم تكون مجلد `public/` فقط. هنتعامل مع ده في الخطوة 3.

---

## 2️⃣ قاعدة البيانات (hPanel)

**hPanel → Databases → MySQL Databases**:
1. اعمل database جديدة — مثلاً `u393186285_upwork`
2. اعمل user وادّيله **كل الصلاحيات** على الـ database
3. سجّل: اسم القاعدة، اليوزر، الباسورد، والـ host (غالبًا `localhost`)

هتحطهم في `.env` بتاع الـ API.

---

## 3️⃣ نشر الـ API (Laravel)

### أ) ابنِ مشروع Laravel محليًا
الـ API مش جاهز كملفات — لازم تبنيه أول مرة من السورس:

```bash
cd upwork-api
bash setup.sh upwork-api-app
```

ده بيعمل مجلد `upwork-api/upwork-api-app/` كامل بالـ vendor.

### ب) جهّز ملف `.env` للإنتاج
انسخ القالب وعدّله:

```bash
cp deploy/env.production.example upwork-api-app/.env
```

افتح `upwork-api-app/.env` وحط:
- بيانات الداتابيز (من خطوة 2)
- `APP_URL=https://api.upworkeg.com`
- بيانات الإيميل (لو هتستخدم نموذج التواصل)

ثم ولّد المفتاح:
```bash
cd upwork-api-app
php artisan key:generate
```

### ج) جهّز Laravel للإنتاج (محليًا)
```bash
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan storage:link
```

### د) ارفع الملفات للسيرفر
ارفع **كل محتويات** `upwork-api-app/` إلى مجلد الـ API على السيرفر.
أسهل طريقة عبر SSH (rsync أسرع وآمن — ينقل الجديد فقط):

```bash
cd upwork-api/upwork-api-app
rsync -avz -e "ssh -p 65002" --exclude='.git' \
  ./ u393186285@62.72.37.41:domains/api.upworkeg.com/
```

> بديل: لو مفيش rsync، استخدم SFTP (FileZilla) وارفع كل المحتويات يدويًا. الرفع هياخد وقت بسبب مجلد `vendor/`.

### هـ) وجّه الساب دومين لمجلد `public/`
عندك طريقتان — اختر واحدة:

**الطريقة الأنضف (لو hPanel بيسمح بتغيير document root):**
- من hPanel، غيّر document root للساب دومين `api` ليكون `domains/api.upworkeg.com/public`

**الطريقة البديلة (.htaccess):**
- ارفع ملف `deploy/htaccess-api-root.txt` للسيرفر باسم `.htaccess` في جذر `domains/api.upworkeg.com/`
  (الملف بيحوّل كل الطلبات لمجلد `public/` تلقائيًا)

### و) شغّل المايجريشن والـ seed على السيرفر
عبر SSH:
```bash
ssh -p 65002 u393186285@62.72.37.41
cd domains/api.upworkeg.com
php artisan migrate --force --seed
```

> ⚠️ استخدم `migrate --force` (مش `migrate:fresh`) عشان متمسحش بيانات لو فيه. أول مرة بس تقدر تستخدم `migrate:fresh --seed --force`.

### ز) صلاحيات المجلدات
```bash
chmod -R 775 storage bootstrap/cache
```

### اختبار سريع للـ API:
افتح في المتصفح: `https://api.upworkeg.com/api/settings`
لازم يرجّع JSON. ✅

> 🔐 **بيانات الأدمن الافتراضية:** `admin@upwork-eg.com` / `Password123!` — **غيّر الباسورد فورًا** بعد أول دخول من الدّاشبورد.

---

## 4️⃣ بناء ورفع الواجهتين (web + dashboard)

### أ) ابنِ الاتنين محليًا
```bash
# من جذر المشروع
bash build-deploy.sh
```
بيطلّع:
- `dist-deploy/web/` → الموقع العام
- `dist-deploy/dashboard/` → الدّاشبورد

(الـ builds بتقرأ `.env.production` فبيشاوروا على `https://api.upworkeg.com/api` تلقائيًا، وفيهم `.htaccess` جاهز)

### ب) ارفع الموقع العام
ارفع **محتويات** `dist-deploy/web/` (مش الفولدر نفسه) إلى `public_html/`:

```bash
rsync -avz -e "ssh -p 65002" --delete \
  dist-deploy/web/ u393186285@62.72.37.41:public_html/
```
> `--delete` بيمسح الملفات القديمة في `public_html`. تأكد إن `public_html` مخصص للموقع ده بس قبل ما تستخدمه.

### ج) ارفع الدّاشبورد
```bash
rsync -avz -e "ssh -p 65002" --delete \
  dist-deploy/dashboard/ u393186285@62.72.37.41:domains/dashboard.upworkeg.com/public_html/
```

> بديل SFTP لكل الرفعات: افتح FileZilla → Host `sftp://62.72.37.41` Port `65002` → اسحب محتويات كل فولدر لمكانه.

---

## 5️⃣ شهادات SSL

في **hPanel → Security → SSL**:
- فعّل SSL مجاني (Let's Encrypt) للدومين الرئيسي وكل الساب دومينز
- استنى لحد ما يتفعّل (دقائق)

الـ `.htaccess` بتاعتنا بتفرض HTTPS تلقائيًا.

---

## 6️⃣ الاختبار النهائي ✅

| الرابط | المتوقع |
|--------|---------|
| `https://api.upworkeg.com/api/settings` | JSON بإعدادات الموقع |
| `https://upworkeg.com` | الموقع العام يفتح، يجيب بيانات من الـ API |
| `https://dashboard.upworkeg.com` | صفحة تسجيل دخول الدّاشبورد |
| تسجيل دخول الدّاشبورد | يدخل بـ admin@upwork-eg.com |
| تبديل اللغة في الموقع (ع/EN) | يشتغل |
| إرسال رسالة من صفحة "تواصل معنا" | تظهر في الدّاشبورد → Messages |

لو الموقع بيفتح بس مفيش بيانات → غالبًا مشكلة **CORS**: راجع `FRONTEND_URLS` في `.env` بتاع الـ API (لازم يحتوي `https://upworkeg.com`)، وبعد أي تعديل في `.env`:
```bash
php artisan config:cache
```

---

## 🔄 تحديثات لاحقة (بعد أول نشر)

**تعديل في الواجهات:**
```bash
bash build-deploy.sh
rsync -avz -e "ssh -p 65002" --delete dist-deploy/web/ u393186285@62.72.37.41:public_html/
rsync -avz -e "ssh -p 65002" --delete dist-deploy/dashboard/ u393186285@62.72.37.41:domains/dashboard.upworkeg.com/public_html/
```

**تعديل في الـ API:**
```bash
cd upwork-api/upwork-api-app
rsync -avz -e "ssh -p 65002" --exclude='.env' --exclude='storage/app' --exclude='.git' \
  ./ u393186285@62.72.37.41:domains/api.upworkeg.com/
# على السيرفر:
ssh -p 65002 u393186285@62.72.37.41 "cd domains/api.upworkeg.com && php artisan migrate --force && php artisan config:cache"
```
> لاحظ `--exclude='.env'` عشان متبوّظش إعدادات السيرفر، و`--exclude='storage/app'` عشان متمسحش الصور المرفوعة.

---

## ⚠️ ملاحظات مهمة

- **إصدار PHP:** تأكد من hPanel → PHP Configuration إنه **8.3+** (الـ API محتاجه).
- **مجلد `storage/app/public`:** الصور المرفوعة بتتخزن هنا — لا تمسحه في التحديثات.
- **`.env` السيرفر:** موجود على السيرفر فقط، مش في git، وفيه أسرار — متشاركوش.
- لو الساب دومين `api` مبيشاورش على `public/`، الـ API مش هيشتغل أو هيكشف ملفات حساسة — أهم خطوة.
