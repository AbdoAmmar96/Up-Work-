<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageSectionResource;
use App\Models\PageSection;
use Illuminate\Http\Request;

class PageSectionController extends Controller
{
    public function index(Request $request)
    {
        $query = PageSection::orderBy('page')->orderBy('sort_order');
        if ($request->filled('page')) {
            $query->where('page', $request->string('page'));
        }

        return PageSectionResource::collection($query->get());
    }

    public function show(PageSection $page_section)
    {
        return new PageSectionResource($page_section);
    }

    public function update(Request $request, PageSection $page_section)
    {
        $data = $request->validate([
            'payload' => ['required', 'array'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $page_section->update($data);

        return new PageSectionResource($page_section->fresh());
    }
}
