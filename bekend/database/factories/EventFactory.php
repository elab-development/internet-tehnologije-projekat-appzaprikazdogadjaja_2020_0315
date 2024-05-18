<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Venue;
use App\Models\Category;
use App\Models\Source;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'start_date' => $this->faker->dateTimeBetween('-1 months', '+1 months'),
            'end_date' => $this->faker->dateTimeBetween('now', '+2 months'),
            'venue_id' => Venue::factory(),
            'category_id' => Category::factory(),
            'source_id' => Source::factory(),
            'url' => $this->faker->url,
            'image' => $this->faker->imageUrl,
        ];
    }
}

