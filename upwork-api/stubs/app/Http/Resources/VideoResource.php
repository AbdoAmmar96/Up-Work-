<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->getTranslations('title'),
            'description' => $this->getTranslations('description'),
            'vimeo_id' => $this->vimeo_id,
            'embed_url' => $this->embedUrl(),
            'thumbnail_url' => $this->thumbnail_url,
            'duration' => $this->duration,
            'is_published' => $this->is_published,
            'category' => $this->whenLoaded('category', fn () => new CategoryResource($this->category)),
        ];
    }
}
