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
        $images=[
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCdiH5HrMioeIe8Lr4Q9E6aUIVP_ztW0k8bSO2jazF2jTskZKYK9ZkUnpcGqG0B7bfRjw&usqp=CAU",
            "https://weezevent.com/wp-content/uploads/2023/04/13172419/heure-arrivee-concert.jpg",
            "https://t3.ftcdn.net/jpg/02/21/36/48/360_F_221364834_GsaULQoVVobdJBHCrGHq3SFeO4FMzO66.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6pS7Y2HG7ULE9p5bnGzwrL0106qMYxsYEMOzseLTfBs6zkONZ1MOOZjqyOHc_Df1TULk&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzPlXdqznbkp0iHz4dN9C_2AUmUhMVhgm3Qzpo-pz9UxPhDS-ofZV9CyWYIVTZ-rl-Ysg&usqp=CAU"
        ];
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'start_date' => $this->faker->dateTimeBetween('-1 months', '+1 months'),
            'end_date' => $this->faker->dateTimeBetween('now', '+2 months'),
            'venue_id' => Venue::factory(),
            'category_id' => Category::factory(),
            'source_id' => Source::factory(),
            'url' => $this->faker->url,
            'image' => $this->faker->randomElement($images),
        ];
    }
}

