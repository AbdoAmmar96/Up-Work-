#!/usr/bin/env bash
set -e

PROJECT="${1:-upwork-api-app}"
HERE="$(cd "$(dirname "$0")" && pwd)"

echo "==============================================="
echo "  UP Work — Laravel 11 API setup"
echo "==============================================="

echo "→ Creating Laravel 11 project: $PROJECT"
composer create-project laravel/laravel "$PROJECT"
cd "$PROJECT"

echo "→ Installing Sanctum (php artisan install:api)"
php artisan install:api --no-interaction

echo "→ Installing Spatie packages (media library, permission, sluggable, translatable)"
composer require spatie/laravel-medialibrary spatie/laravel-permission spatie/laravel-sluggable spatie/laravel-translatable

echo "→ Publishing package migrations"
php artisan vendor:publish --provider="Spatie\\Permission\\PermissionServiceProvider" --no-interaction
php artisan vendor:publish --provider="Spatie\\MediaLibrary\\MediaLibraryServiceProvider" --tag="medialibrary-migrations" --no-interaction

echo "→ Copying UP Work custom files into the project"
cp -R "$HERE/stubs/." .

echo "→ Preparing environment"
cp -f .env.example .env
php artisan key:generate
php artisan storage:link || true

echo ""
echo "==============================================="
echo "  ✅ Scaffold ready in:  $PROJECT"
echo "==============================================="
echo ""
echo "Before migrating, open .env and set your MySQL credentials:"
echo "    DB_DATABASE=upwork   DB_USERNAME=...   DB_PASSWORD=..."
echo ""
echo "Then run:"
echo "    cd $PROJECT"
echo "    php artisan migrate:fresh --seed"
echo "    php artisan serve            # or:  herd link  (recommended)"
echo ""
echo "Admin login →  email: admin@upwork-eg.com   password: Password123!"
echo "(change the password after first login)"
echo ""
