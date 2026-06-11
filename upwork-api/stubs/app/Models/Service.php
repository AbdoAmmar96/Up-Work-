<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Service extends Model implements HasMedia
{
    use HasTranslations, HasSlug, InteractsWithMedia;

    public array $translatable = ['title', 'excerpt', 'body'];

    protected $fillable = ['title', 'slug', 'excerpt', 'body', 'icon', 'items', 'sort_order', 'is_active'];

    protected $casts = ['is_active' => 'boolean', 'items' => 'array'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(fn ($m) => $m->getTranslation('title', 'en') ?: $m->getTranslation('title', 'ar'))
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }

    public function scopeActive($q)
    {
        return $q->where('is_active', true);
    }
}
