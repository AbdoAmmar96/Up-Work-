<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class VideoController extends Controller
{
    public function index()
    {
        return VideoResource::collection(Video::with('category')->orderBy('sort_order')->latest('id')->get());
    }

    public function show(Video $video)
    {
        return new VideoResource($video->load('category'));
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['vimeo_id'] = $this->normalizeVimeoId($data['vimeo_id']);
        $data['thumbnail_url'] = $data['thumbnail_url'] ?? $this->fetchThumbnail($data['vimeo_id']);

        $video = Video::create($data);

        return (new VideoResource($video->fresh('category')))->response()->setStatusCode(201);
    }

    public function update(Request $request, Video $video)
    {
        $data = $this->validated($request);
        $data['vimeo_id'] = $this->normalizeVimeoId($data['vimeo_id']);
        if (empty($data['thumbnail_url']) && $data['vimeo_id'] !== $video->vimeo_id) {
            $data['thumbnail_url'] = $this->fetchThumbnail($data['vimeo_id']);
        }
        $video->update($data);

        return new VideoResource($video->fresh('category'));
    }

    public function destroy(Video $video)
    {
        $video->delete();

        return response()->json(['message' => 'تم الحذف. / Deleted.']);
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:200'],
            'title.en' => ['required', 'string', 'max:200'],
            'description' => ['nullable', 'array'],
            'vimeo_id' => ['required', 'string', 'max:255'],
            'thumbnail_url' => ['nullable', 'url'],
            'duration' => ['nullable', 'integer'],
            'video_category_id' => ['nullable', 'exists:video_categories,id'],
            'is_published' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }

    // Accepts a raw id (76979871) or any Vimeo URL and returns the numeric id.
    protected function normalizeVimeoId(string $value): string
    {
        if (preg_match('/(\d{6,})/', $value, $m)) {
            return $m[1];
        }

        return $value;
    }

    protected function fetchThumbnail(string $vimeoId): ?string
    {
        try {
            $res = Http::timeout(5)->get('https://vimeo.com/api/oembed.json', [
                'url' => "https://vimeo.com/{$vimeoId}",
            ]);
            if ($res->ok()) {
                return $res->json('thumbnail_url');
            }
        } catch (\Throwable $e) {
            // best-effort; ignore failures
        }

        return null;
    }
}
