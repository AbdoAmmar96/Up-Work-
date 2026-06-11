<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;

class ProjectCategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(ProjectCategory::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $cat = ProjectCategory::create($this->validated($request));

        return (new CategoryResource($cat))->response()->setStatusCode(201);
    }

    public function update(Request $request, ProjectCategory $project_category)
    {
        $project_category->update($this->validated($request));

        return new CategoryResource($project_category->fresh());
    }

    public function destroy(ProjectCategory $project_category)
    {
        $project_category->delete();

        return response()->json(['message' => 'تم الحذف. / Deleted.']);
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:120'],
            'title.en' => ['required', 'string', 'max:120'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}
