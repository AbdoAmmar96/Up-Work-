<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $data = $this->prepare($request);

        $video = Video::create($data);

        return (new VideoResource($video->fresh('category')))->response()->setStatusCode(201);
    }

    public function update(Request $request, Video $video)
    {
        $data = $this->prepare($request, $video);

        $video->update($data);

        return new VideoResource($video->fresh('category'));
    }

    public function destroy(Video $video)
    {
        if ($video->video_file) {
            Storage::disk('public')->delete($video->video_file);
        }
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
            'source' => ['nullable', 'in:youtube,upload,vimeo'],
            'youtube_id' => ['nullable', 'string', 'max:255'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/webm', 'max:153600'], // 150MB
            'thumbnail_url' => ['nullable', 'url'],
            'duration' => ['nullable', 'integer'],
            'video_category_id' => ['nullable', 'exists:video_categories,id'],
            'is_published' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }

    // يجهّز البيانات حسب المصدر (youtube / upload) ويتعامل مع رفع الملف والصورة المصغّرة.
    protected function prepare(Request $request, ?Video $video = null): array
    {
        $data = $this->validated($request);
        $source = $data['source'] ?? 'youtube';
        $data['source'] = $source;

        if ($source === 'youtube') {
            $data['youtube_id'] = $this->normalizeYouTubeId($data['youtube_id'] ?? '');
            $data['thumbnail_url'] = $data['thumbnail_url']
                ?? ($data['youtube_id'] ? "https://img.youtube.com/vi/{$data['youtube_id']}/hqdefault.jpg" : null);
            $data['video_file'] = null;
        } elseif ($source === 'upload') {
            if ($request->hasFile('video')) {
                if ($video && $video->video_file) {
                    Storage::disk('public')->delete($video->video_file);
                }
                $data['video_file'] = $request->file('video')->store('videos', 'public');
            }
            $data['youtube_id'] = null;
        }

        unset($data['video']);

        return $data;
    }

    // يقبل ID خام أو أي رابط YouTube (watch / youtu.be / shorts / embed) ويرجّع الـ ID.
    protected function normalizeYouTubeId(string $value): ?string
    {
        $value = trim($value);
        if ($value === '') {
            return null;
        }
        $patterns = [
            '~youtu\.be/([A-Za-z0-9_-]{11})~',
            '~youtube\.com/watch\?[^ ]*v=([A-Za-z0-9_-]{11})~',
            '~youtube\.com/(?:embed|shorts|v)/([A-Za-z0-9_-]{11})~',
        ];
        foreach ($patterns as $p) {
            if (preg_match($p, $value, $m)) {
                return $m[1];
            }
        }
        if (preg_match('~^[A-Za-z0-9_-]{11}$~', $value)) {
            return $value;
        }

        return $value;
    }
}
