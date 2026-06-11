<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class ProjectCategory extends Model
{
    use HasTranslations, HasSlug;

    public array $translatable = ['title'];

    protected $fillable = ['title', 'slug', 'sort_order'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(fn ($m) => $m->getTranslation('title', 'en') ?: $m->getTranslation('title', 'ar'))
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
