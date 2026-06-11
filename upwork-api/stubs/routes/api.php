<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Api\Public\ContactController;
use App\Http\Controllers\Api\Public\PublicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API (read-only, consumed by the public React site)
|--------------------------------------------------------------------------
*/
Route::get('settings', [PublicController::class, 'settings']);
Route::get('pages', [PublicController::class, 'pages']);
Route::get('pages/{key}', [PublicController::class, 'page']);

Route::get('services', [PublicController::class, 'services']);
Route::get('services/{slug}', [PublicController::class, 'service']);

Route::get('project-categories', [PublicController::class, 'projectCategories']);
Route::get('projects', [PublicController::class, 'projects']);
Route::get('projects/{slug}', [PublicController::class, 'project'])->name('projects.show');

Route::get('video-categories', [PublicController::class, 'videoCategories']);
Route::get('videos', [PublicController::class, 'videos']);

Route::get('albums', [PublicController::class, 'albums']);
Route::get('albums/{slug}', [PublicController::class, 'album'])->name('albums.show');

Route::post('contact', [ContactController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/
Route::post('login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Admin API (token-protected, consumed by the custom React dashboard)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::put('me/password', [AuthController::class, 'updatePassword']);

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', Admin\DashboardController::class);

        Route::apiResource('services', Admin\ServiceController::class);
        Route::apiResource('project-categories', Admin\ProjectCategoryController::class)->except('show');
        Route::apiResource('projects', Admin\ProjectController::class);
        Route::delete('projects/{project}/images/{media}', [Admin\ProjectController::class, 'destroyImage']);

        Route::apiResource('video-categories', Admin\VideoCategoryController::class)->except('show');
        Route::apiResource('videos', Admin\VideoController::class);

        Route::apiResource('albums', Admin\GalleryAlbumController::class);
        Route::delete('albums/{album}/images/{media}', [Admin\GalleryAlbumController::class, 'destroyImage']);

        Route::get('page-sections', [Admin\PageSectionController::class, 'index']);
        Route::get('page-sections/{page_section}', [Admin\PageSectionController::class, 'show']);
        Route::put('page-sections/{page_section}', [Admin\PageSectionController::class, 'update']);

        Route::get('settings', [Admin\SettingController::class, 'index']);
        Route::put('settings', [Admin\SettingController::class, 'update']);
        Route::post('settings/logo', [Admin\SettingController::class, 'uploadLogo']);

        Route::get('messages', [Admin\ContactMessageController::class, 'index']);
        Route::get('messages/{contact_message}', [Admin\ContactMessageController::class, 'show']);
        Route::put('messages/{contact_message}/read', [Admin\ContactMessageController::class, 'markRead']);
        Route::delete('messages/{contact_message}', [Admin\ContactMessageController::class, 'destroy']);
    });
});
