<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|string[]  $roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // Preuzimamo trenutno ulogovanog korisnika
        $user = Auth::user();

        // Ako korisnik nije ulogovan, vraćamo odgovor sa statusom 401 Unauthorized
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Delimo korisničke role koje su zapisane u koloni 'role' i razdvojene zarezom
        $userRoles = explode(',', $user->role);

        // Proveravamo da li korisnik ima neku od traženih rola
        foreach ($roles as $role) {
            // Ako je neka od traženih rola pronađena u korisničkim rolama, propuštamo zahtev
            if (in_array($role, $userRoles)) {
                return $next($request);
            }
        }

        // Ako korisnik nema potrebne role, vraćamo odgovor sa statusom 403 Forbidden
        return response()->json(['message' => 'Forbidden'], 403);
    }
}
