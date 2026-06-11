<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryAlbumResource;
use App\Models\GalleryAlbum;
use Illuminate\Http\Request;

class GalleryAlbumController extends Controller
{
    public function index()
    {
        return GalleryAlbumResource::collection(GalleryAlbum::orderBy('sort_order')->latest('id')->get());
    }

    public function show(GalleryAlbum $album)
    {
        return new GalleryAlbumResource($album);
    }

    public function store(Request $request)
    {
        $album = GalleryAlbum::create($this->validated($request));
        $this->handleImages($request, $album);

        return (new GalleryAlbumResource($album->fresh()))->response()->setStatusCode(201);
    }

    public function update(Request $request, GalleryAlbum $album)
    {
        $album->update($this->validated($request));
        $this->handleImages($request, $album);

        return new GalleryAlbumResource($album->fresh());
    }

    public function destroy(GalleryAlbum $album)
    {
        $album->delete();

        return response()->json(['message' => 'تم الحذف. / Deleted.']);
    }

    public function destroyImage(GalleryAlbum $album, int $media)
    {
        $album->deleteMedia($media);

        return response()->json(['message' => 'تم حذف الصورة. / Image removed.']);
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:160'],
            'title.en' => ['required', 'string', 'max:160'],
            'description' => ['nullable', 'array'],
            'is_published' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }

    protected function handleImages(Request $request, GalleryAlbum $album): void
    {
        foreach ((array) ($request->file('images') ?? []) as $file) {
            $album->addMedia($file)->toMediaCollection('images');
        }
    }
}
