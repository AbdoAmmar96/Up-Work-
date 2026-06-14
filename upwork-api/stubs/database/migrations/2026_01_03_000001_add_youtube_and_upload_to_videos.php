<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            // مصدر الفيديو: youtube (رابط/ID) أو upload (ملف مرفوع على السيرفر)
            $table->string('source')->default('youtube')->after('description');
            $table->string('youtube_id')->nullable()->after('source');
            $table->string('video_file')->nullable()->after('youtube_id');
            // vimeo_id يبقى موجود لكن اختياري للتوافق مع البيانات القديمة
            $table->string('vimeo_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->dropColumn(['source', 'youtube_id', 'video_file']);
        });
    }
};
