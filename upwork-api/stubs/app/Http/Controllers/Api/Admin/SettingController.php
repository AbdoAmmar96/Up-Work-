<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Setting::all_keyed()]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => ['required', 'array'],
        ]);

        foreach ($data['settings'] as $key => $value) {
            Setting::put($key, $value);
        }

        return response()->json(['data' => Setting::all_keyed()]);
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => ['required', 'image', 'max:4096'],
        ]);

        $path = $request->file('logo')->store('branding', 'public');
        $url = Storage::disk('public')->url($path);
        Setting::put('logo', $url);

        return response()->json(['logo' => $url]);
    }
}
