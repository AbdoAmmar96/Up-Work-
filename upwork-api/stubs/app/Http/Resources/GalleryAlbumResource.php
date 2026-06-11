<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryAlbumResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $images = $this->getMedia('images');

        return [
            'id' => $this->id,
            'title' => $this->getTranslations('title'),
            'slug' => $this->slug,
            'description' => $this->getTranslations('description'),
            'is_published' => $this->is_published,
            'cover' => optional($images->first())?->getUrl(),
            'images_count' => $images->count(),
            'images' => $this->when(
                $request->routeIs('*gallery.show') || $request->routeIs('*albums.show') || $request->boolean('with_images'),
                fn () => $images->map(fn ($m) => [
                    'id' => $m->id,
                    'url' => $m->getUrl(),
                    'thumb' => $m->hasGeneratedConversion('thumb') ? $m->getUrl('thumb') : $m->getUrl(),
                ])->values()
            ),
        ];
    }
}
