<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return ServiceResource::collection(Service::orderBy('sort_order')->get());
    }

    public function show(Service $service)
    {
        return new ServiceResource($service);
    }

    public function store(Request $request)
    {
        $service = Service::create($this->validated($request));
        $this->handleImage($request, $service);

        return (new ServiceResource($service->fresh()))->response()->setStatusCode(201);
    }

    public function update(Request $request, Service $service)
    {
        $service->update($this->validated($request, $service));
        $this->handleImage($request, $service);

        return new ServiceResource($service->fresh());
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json(['message' => 'تم الحذف. / Deleted.']);
    }

    protected function validated(Request $request, ?Service $service = null): array
    {
        return $request->validate([
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:160'],
            'title.en' => ['required', 'string', 'max:160'],
            'excerpt' => ['nullable', 'array'],
            'body' => ['nullable', 'array'],
            'icon' => ['nullable', 'string', 'max:60'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);
    }

    protected function handleImage(Request $request, Service $service): void
    {
        if ($request->hasFile('image')) {
            $service->addMediaFromRequest('image')->toMediaCollection('image');
        }
    }
}
