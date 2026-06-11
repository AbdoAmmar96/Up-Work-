<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Video extends Model
{
    use HasTranslations;

    public array $translatable = ['title', 'description'];

    protected $fillable = [
        'title', 'description', 'vimeo_id', 'thumbnail_url',
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

    public function embedUrl(): string
    {
        return "https://player.vimeo.com/video/{$this->vimeo_id}";
    }
}
