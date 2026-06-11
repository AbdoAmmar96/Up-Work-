<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'phone' => ['nullable', 'string', 'max:40'],
            'subject' => ['nullable', 'string', 'max:160'],
            'message' => ['required', 'string', 'max:5000'],
            'locale' => ['nullable', 'string', 'in:ar,en'],
        ]);

        $message = ContactMessage::create([
            ...$data,
            'locale' => $data['locale'] ?? 'ar',
            'ip' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'تم استلام رسالتك، هنتواصل معاك قريب. / Thanks — we will get back to you shortly.',
            'id' => $message->id,
        ], 201);
    }
}
