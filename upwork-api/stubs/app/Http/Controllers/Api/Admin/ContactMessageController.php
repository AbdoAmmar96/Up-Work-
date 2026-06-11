<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::latest();
        if ($request->boolean('unread')) {
            $query->where('is_read', false);
        }

        return ContactMessageResource::collection($query->paginate($request->integer('per_page', 20)));
    }

    public function show(ContactMessage $contact_message)
    {
        if (! $contact_message->is_read) {
            $contact_message->update(['is_read' => true]);
        }

        return new ContactMessageResource($contact_message);
    }

    public function markRead(ContactMessage $contact_message)
    {
        $contact_message->update(['is_read' => true]);

        return new ContactMessageResource($contact_message->fresh());
    }

    public function destroy(ContactMessage $contact_message)
    {
        $contact_message->delete();

        return response()->json(['message' => 'تم الحذف. / Deleted.']);
    }
}
