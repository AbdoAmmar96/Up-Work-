<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Models\GalleryAlbum;
use App\Models\Project;
use App\Models\Service;
use App\Models\Video;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return response()->json([
            'stats' => [
                'services' => Service::count(),
                'projects' => Project::count(),
                'videos' => Video::count(),
                'albums' => GalleryAlbum::count(),
                'messages' => ContactMessage::count(),
                'unread_messages' => ContactMessage::where('is_read', false)->count(),
            ],
            'latest_messages' => ContactMessageResource::collection(
                ContactMessage::latest()->limit(5)->get()
            ),
        ]);
    }
}
