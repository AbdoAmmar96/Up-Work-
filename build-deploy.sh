#!/usr/bin/env bash
# يبني الموقع العام + الدّاشبورد ويجمّع كل حاجة جاهزة للرفع في dist-deploy/
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$HERE/dist-deploy"

echo "======================================"
echo "  UP Work — build for production"
echo "======================================"

rm -rf "$OUT"
mkdir -p "$OUT"

# ---- 1) الموقع العام ----
echo "→ building upwork-web ..."
cd "$HERE/upwork-web"
npm install
npm run build            # يقرأ .env.production تلقائيًا في وضع production
cp -R dist "$OUT/web"
echo "  ✓ web → dist-deploy/web"

# ---- 2) الدّاشبورد ----
echo "→ building upwork-dashboard ..."
cd "$HERE/upwork-dashboard"
npm install
npm run build
cp -R dist "$OUT/dashboard"
echo "  ✓ dashboard → dist-deploy/dashboard"

echo ""
echo "======================================"
echo "  ✅ جاهز في:  dist-deploy/"
echo "======================================"
echo "  dist-deploy/web        → ارفعه لـ public_html (upworkeg.com)"
echo "  dist-deploy/dashboard  → ارفعه لمجلد dashboard.upworkeg.com"
echo ""
echo "الـ API يُبنى ويُرفع يدويًا — اتبع DEPLOY.md"
