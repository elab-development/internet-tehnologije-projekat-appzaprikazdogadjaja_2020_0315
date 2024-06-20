<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function statistike()
    {
        $totalUsers = User::count();
        $totalAdmins = User::where('role', 'admin')->count();
 

        return response()->json([
            'total_users' => $totalUsers,
            'total_admins' => $totalAdmins,
            'total_users' => $totalUsers-  $totalAdmins,
        ]);
    }
}
