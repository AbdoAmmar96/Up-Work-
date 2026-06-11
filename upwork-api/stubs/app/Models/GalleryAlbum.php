<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class GalleryAlbum extends Model implements HasMedia
{
    use HasTranslations, HasSlug, InteractsWithMedia;

    public array $translatable = ['title', 'description'];

    protected $fillable = ['title', 'slug', 'description', 'is_published', 'sort_order'];

    protected $casts = ['is_published' => 'boolean'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(fn ($m) => $m->getTranslation('title', 'en') ?: $m->getTranslation('title', 'ar'))
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(600)->height(600)->nonQueued();
    }

    public function scopePublished($q)
    {
        return $q->where('is_published', true);
    }
}
