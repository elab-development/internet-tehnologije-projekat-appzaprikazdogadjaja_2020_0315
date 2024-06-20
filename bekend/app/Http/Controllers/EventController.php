<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Resources\EventResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $events = Event::all();
        return response()->json(EventResource::collection($events));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'venue_id' => 'required|integer|exists:venues,id',
            'category_id' => 'required|integer|exists:categories,id',
            'source_id' => 'required|integer|exists:sources,id',
            'url' => 'required|string',
            'image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $event = Event::create($validator->validated());
        return response()->json(new EventResource($event), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $event = Event::findOrFail($id);
        return response()->json(new EventResource($event));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'venue_id' => 'required|integer|exists:venues,id',
            'category_id' => 'required|integer|exists:categories,id',
            'source_id' => 'required|integer|exists:sources,id',
            'url' => 'required|string',
            'image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $event = Event::findOrFail($id);
        $event->update($validator->validated());
        return response()->json(new EventResource($event));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }


    public function statistike()
    {
        // Get the count of events for each category
        $eventsByCategory = Event::select('category_id', DB::raw('count(*) as total'))
                                  ->groupBy('category_id')
                                  ->with('category')
                                  ->get()
                                  ->map(function($event) {
                                      return [
                                          'category' => $event->category->name,
                                          'total' => $event->total
                                      ];
                                  });

        // Get the count of events for each month
        $eventsByMonth = Event::select(DB::raw('DATE_FORMAT(start_date, "%Y-%m") as month'), DB::raw('count(*) as total'))
                              ->groupBy('month')
                              ->get();

        return response()->json([
            'events_by_category' => $eventsByCategory,
            'events_by_month' => $eventsByMonth
        ]);
    }
}
