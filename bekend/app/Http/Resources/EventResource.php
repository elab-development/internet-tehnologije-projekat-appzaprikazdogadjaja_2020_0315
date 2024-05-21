<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Models\Source;
use App\Models\Venue;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'venue' => new VenueResource(Venue::find($this->venue_id)),
            'category' => new CategoryResource( Category::find($this->category_id) ),
            'source' => new SourceResource(Source::find($this->source_id)),
            'url' => $this->url,
            'image' => $this->image,
        ];
    }
}
