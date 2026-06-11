<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->getTranslations('title'),
            'slug' => $this->slug,
            'excerpt' => $this->getTranslations('excerpt'),
            'body' => $this->getTranslations('body'),
            'icon' => $this->icon,
            'image' => $this->getFirstMediaUrl('image') ?: null,
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
        ];
    }
}
