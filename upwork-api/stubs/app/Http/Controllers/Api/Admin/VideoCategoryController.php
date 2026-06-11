<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\VideoCategory;
use Illuminate\Http\Request;

class VideoCategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(VideoCategory::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $cat = VideoCategory::create($this->validated($request));

        return (new CategoryResource($cat))->response()->setStatusCode(201);
    }

    public function update(Request $request, VideoCategory $video_category)
    {
        $video_category->update($this->validated($request));

        return new CategoryResource($video_category->fresh());
    }

    public function destroy(VideoCategory $video_category)
    {
        $video_category->delete();

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
