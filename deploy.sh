#!/usr/bin/env bash
# ============================================================
#  UP Work — نشر شامل بأمر واحد
#  بيبني الواجهتين، يرفع الموقع + الدّاشبورد + الـ API + الصور،
#  ويشغّل migrate + cache على السيرفر.
#
#  الاستخدام:
#    bash deploy.sh            # نشر كل حاجة
#    bash deploy.sh --web      # الموقع العام بس
#    bash deploy.sh --dash     # الدّاشبورد بس
#    bash deploy.sh --api      # الـ API بس (+ migrate/cache)
#    bash deploy.sh --fresh    # API مع migrate:fresh --seed (⚠️ بيمسح البيانات)
# ============================================================
set -e

# ---------- إعدادات السيرفر ----------
SSH_HOST="u393186285@62.72.37.41"
SSH_PORT="65002"
SSH_KEY="$HOME/.ssh/upwork_deploy"
REMOTE="domains/upworkeg.com"
PHP="/opt/alt/php83/usr/bin/php"

HERE="$(cd "$(dirname "$0")" && pwd)"
SSH_OPTS="-p $SSH_PORT -i $SSH_KEY -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=15"

# دوال آمنة مع المسافات في المسارات
ssh_run() { ssh $SSH_OPTS "$SSH_HOST" "$@"; }
rsync_up() { rsync -az -e "ssh $SSH_OPTS" "$@"; }

# أي أجزاء ننشر؟
DO_WEB=1; DO_DASH=1; DO_API=1; FRESH=0
if [ $# -gt 0 ]; then
  DO_WEB=0; DO_DASH=0; DO_API=0
  for arg in "$@"; do
    case "$arg" in
      --web)  DO_WEB=1 ;;
      --dash) DO_DASH=1 ;;
      --api)  DO_API=1 ;;
      --fresh) DO_API=1; FRESH=1 ;;
      *) echo "خيار غير معروف: $arg"; exit 1 ;;
    esac
  done
fi

echo "================================================="
echo "  UP Work — Deploy"
echo "  web=$DO_WEB dashboard=$DO_DASH api=$DO_API fresh=$FRESH"
echo "================================================="

# تأكد إن المفتاح موجود
if [ ! -f "$SSH_KEY" ]; then
  echo "✗ مفتاح SSH مش موجود: $SSH_KEY"
  echo "  شغّل أوامر تركيب المفتاح الأول (شوف التعليمات)."
  exit 1
fi

# ---------- 1) بناء الواجهات ----------
if [ "$DO_WEB" = 1 ] || [ "$DO_DASH" = 1 ]; then
  echo "→ بناء الواجهات..."
  bash "$HERE/build-deploy.sh" >/dev/null
  echo "  ✓ تم البناء"
fi

# ---------- 2) رفع الموقع العام ----------
if [ "$DO_WEB" = 1 ]; then
  echo "→ رفع الموقع العام + الصور..."
  rsync_up \
    --exclude='api/' --exclude='dashboard/' --exclude='clients/' --exclude='services/' --exclude='default.php' \
    "$HERE/dist-deploy/web/" "$SSH_HOST:$REMOTE/public_html/"
  # الصور الثابتة (لوجوهات العملاء + صور الخدمات)
  rsync_up "$HERE/upwork-web/public/clients/" "$SSH_HOST:$REMOTE/public_html/clients/"
  rsync_up "$HERE/upwork-web/public/services/" "$SSH_HOST:$REMOTE/public_html/services/"
  echo "  ✓ الموقع العام"
fi

# ---------- 3) رفع الدّاشبورد ----------
if [ "$DO_DASH" = 1 ]; then
  echo "→ رفع الدّاشبورد..."
  rsync_up --delete "$HERE/dist-deploy/dashboard/" "$SSH_HOST:$REMOTE/public_html/dashboard/"
  echo "  ✓ الدّاشبورد"
fi

# ---------- 4) رفع الـ API + migrate/cache ----------
if [ "$DO_API" = 1 ]; then
  APP="$HERE/upwork-api/upwork-api-app"
  if [ ! -d "$APP" ]; then
    echo "✗ مجلد الـ API مش موجود: $APP"
    echo "  ابنِه الأول:  cd upwork-api && bash setup.sh upwork-api-app"
    exit 1
  fi
  echo "→ رفع ملفات الـ API (من غير .env والصور المرفوعة)..."
  rsync_up \
    --exclude='.env' --exclude='storage/app' --exclude='.git' --exclude='public' \
    "$APP/" "$SSH_HOST:$REMOTE/laravel-api/"
  echo "  ✓ ملفات الـ API"

  echo "→ تشغيل أوامر Laravel على السيرفر..."
  if [ "$FRESH" = 1 ]; then
    MIGRATE="$PHP artisan migrate:fresh --seed --force"
  else
    MIGRATE="$PHP artisan migrate --force"
  fi
  ssh_run "cd $REMOTE/laravel-api && \
    $PHP artisan config:clear >/dev/null 2>&1; \
    $MIGRATE 2>&1 | tail -4; \
    $PHP artisan config:cache >/dev/null && \
    $PHP artisan route:cache >/dev/null && \
    echo '  ✓ migrate + cache تمّت'"
fi

# ---------- 5) اختبار سريع ----------
echo "→ اختبار..."
code() { curl -s -o /dev/null -w "%{http_code}" -L "$1"; }
echo "  الموقع العام : $(code https://upworkeg.com/)"
echo "  الـ API      : $(code https://upworkeg.com/api/api/settings)"
echo "  الدّاشبورد   : $(code https://upworkeg.com/dashboard/)"

echo ""
echo "================================================="
echo "  ✅ تم النشر"
echo "================================================="
