<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Video extends Model
{
    use HasTranslations;

    public array $translatable = ['title', 'description'];

    protected $fillable = [
        'title', 'description', 'source', 'youtube_id', 'video_file',
        'vimeo_id', 'thumbnail_url',
        'duration', 'video_category_id', 'is_published', 'sort_order',
    ];

    protected $casts = ['is_published' => 'boolean'];

    public function category()
    {
        return $this->belongsTo(VideoCategory::class, 'video_category_id');
    }

    public function scopePublished($q)
    {
        return $q->where('is_published', true);
    }

    // رابط التضمين (للـ iframe) — للـ YouTube أو Vimeo. فاضي لو الفيديو مرفوع.
    public function embedUrl(): ?string
    {
        if ($this->source === 'youtube' && $this->youtube_id) {
            return "https://www.youtube.com/embed/{$this->youtube_id}";
        }
        if ($this->source === 'vimeo' && $this->vimeo_id) {
            return "https://player.vimeo.com/video/{$this->vimeo_id}";
        }

        return null;
    }

    // الرابط المباشر للملف المرفوع (mp4) — فاضي لو الفيديو من YouTube/Vimeo.
    public function fileUrl(): ?string
    {
        return $this->video_file ? asset('storage/'.$this->video_file) : null;
    }
}
