<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with('category')->orderBy('sort_order')->latest('id');
        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->string('category')));
        }

        return ProjectResource::collection($query->paginate($request->integer('per_page', 20))->withQueryString());
    }

    public function show(Project $project)
    {
        return new ProjectResource($project->load('category'));
    }

    public function store(Request $request)
    {
        $project = Project::create($this->validated($request));
        $this->handleMedia($request, $project);

        return (new ProjectResource($project->fresh('category')))->response()->setStatusCode(201);
    }

    public function update(Request $request, Project $project)
    {
        $project->update($this->validated($request));
        $this->handleMedia($request, $project);

        return new ProjectResource($project->fresh('category'));
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'تم الحذف. / Deleted.']);
    }

    public function destroyImage(Project $project, int $media)
    {
        $project->deleteMedia($media);

        return response()->json(['message' => 'تم حذف الصورة. / Image removed.']);
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:200'],
            'title.en' => ['required', 'string', 'max:200'],
            'summary' => ['nullable', 'array'],
            'body' => ['nullable', 'array'],
            'client' => ['nullable', 'array'],
            'location' => ['nullable', 'array'],
            'year' => ['nullable', 'integer', 'min:1990', 'max:2100'],
            'project_category_id' => ['nullable', 'exists:project_categories,id'],
            'is_featured' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }

    protected function handleMedia(Request $request, Project $project): void
    {
        if ($request->hasFile('cover')) {
            $project->addMediaFromRequest('cover')->toMediaCollection('cover');
        }
        foreach ((array) ($request->file('gallery') ?? []) as $file) {
            $project->addMedia($file)->toMediaCollection('gallery');
        }
    }
}
