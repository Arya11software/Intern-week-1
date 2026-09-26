<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiKeyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $apiKey = $request->header('X-API-Key');

        if ($apiKey !== 'day8-demo-key') {
            return response()->json([
                'message' => 'Unauthorized. Missing or invalid X-API-Key header.',
            ], 401);
        }

        return $next($request);
    }
}
