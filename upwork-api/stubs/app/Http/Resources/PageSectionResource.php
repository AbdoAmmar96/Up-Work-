<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageSectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'key' => $this->key,
            'page' => $this->page,
            'payload' => $this->payload,
            'is_active' => $this->is_active,
            'sort_order' => $this->sort_order,
        ];
    }
}
