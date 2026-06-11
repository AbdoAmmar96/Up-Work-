<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->getTranslations('title'),
            'slug' => $this->slug,
            'summary' => $this->getTranslations('summary'),
            'body' => $this->getTranslations('body'),
            'client' => $this->getTranslations('client'),
            'location' => $this->getTranslations('location'),
            'year' => $this->year,
            'is_featured' => $this->is_featured,
            'is_published' => $this->is_published,
            'cover' => $this->getFirstMediaUrl('cover') ?: null,
            'cover_thumb' => $this->getFirstMediaUrl('cover', 'thumb') ?: ($this->getFirstMediaUrl('cover') ?: null),
            'category' => $this->whenLoaded('category', fn () => new CategoryResource($this->category)),
            'gallery' => $this->when(
                $request->routeIs('*projects.show') || $request->boolean('with_gallery'),
                fn () => $this->getMedia('gallery')->map(fn ($m) => [
                    'id' => $m->id,
                    'url' => $m->getUrl(),
                    'thumb' => $m->hasGeneratedConversion('thumb') ? $m->getUrl('thumb') : $m->getUrl(),
                ])->values()
            ),
        ];
    }
}
