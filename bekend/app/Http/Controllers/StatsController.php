<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use App\Models\Event;
use App\Models\Venue;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function statistike()
    {
        $totalUsers = User::count();
        $totalAdmins = User::where('role', 'admin')->count();
        $totalCategories = Category::count();
        $totalEvents = Event::count();
        $totalVenues = Venue::count();

        return response()->json([
            'total_users' => $totalUsers,
            'total_admins' => $totalAdmins,
            'total_categories' => $totalCategories,
            'total_events' => $totalEvents,
            'total_venues' => $totalVenues,
        ]);
    }
}
