<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\GalleryAlbumResource;
use App\Http\Resources\PageSectionResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\VideoResource;
use App\Models\GalleryAlbum;
use App\Models\PageSection;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Video;
use App\Models\VideoCategory;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    protected array $publicSettingKeys = [
        'site_title', 'tagline', 'slogan', 'phone', 'whatsapp', 'email',
        'address', 'working_hours', 'social', 'colors', 'capabilities',
        'logo', 'seo_title', 'seo_description',
    ];

    public function settings()
    {
        $all = Setting::all_keyed();
        $public = collect($this->publicSettingKeys)
            ->mapWithKeys(fn ($k) => [$k => $all[$k] ?? null]);

        return response()->json(['data' => $public]);
    }

    public function pages(Request $request)
    {
        $query = PageSection::active()->orderBy('sort_order');
        if ($request->filled('page')) {
            $query->where('page', $request->string('page'));
        }

        return PageSectionResource::collection($query->get());
    }

    public function page(string $key)
    {
        $section = PageSection::active()->where('key', $key)->firstOrFail();

        return new PageSectionResource($section);
    }

    public function services()
    {
        return ServiceResource::collection(
            Service::active()->orderBy('sort_order')->get()
        );
    }

    public function service(string $slug)
    {
        return new ServiceResource(
            Service::active()->where('slug', $slug)->firstOrFail()
        );
    }

    public function projectCategories()
    {
        return CategoryResource::collection(
            ProjectCategory::orderBy('sort_order')->get()
        );
    }

    public function projects(Request $request)
    {
        $query = Project::published()->with('category')
            ->orderBy('sort_order')->latest('year');

        if ($request->filled('category')) {
            $cat = $request->string('category');
            $query->whereHas('category', fn ($q) => $q->where('slug', $cat));
        }
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        return ProjectResource::collection(
            $query->paginate($request->integer('per_page', 9))->withQueryString()
        );
    }

    public function project(string $slug)
    {
        return new ProjectResource(
            Project::published()->with('category')->where('slug', $slug)->firstOrFail()
        );
    }

    public function videoCategories()
    {
        return CategoryResource::collection(
            VideoCategory::orderBy('sort_order')->get()
        );
    }

    public function videos(Request $request)
    {
        $query = Video::published()->with('category')->orderBy('sort_order')->latest();

        if ($request->filled('category')) {
            $cat = $request->string('category');
            $query->whereHas('category', fn ($q) => $q->where('slug', $cat));
        }

        return VideoResource::collection($query->get());
    }

    public function albums()
    {
        return GalleryAlbumResource::collection(
            GalleryAlbum::published()->orderBy('sort_order')->get()
        );
    }

    public function album(string $slug)
    {
        return new GalleryAlbumResource(
            GalleryAlbum::published()->where('slug', $slug)->firstOrFail()
        );
    }
}
