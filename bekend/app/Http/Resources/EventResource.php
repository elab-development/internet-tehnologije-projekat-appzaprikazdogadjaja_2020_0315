<?php

namespace App\Http\Resources;

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
            'venue' => new VenueResource($this->whenLoaded('venue')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'source' => new SourceResource($this->whenLoaded('source')),
            'url' => $this->url,
            'image' => $this->image,
        ];
    }
}
