<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // Kreiraj dva admin korisnika
       User::factory()->state([
            'role' => 'admin',
        ])->count(2)->create();

        // Kreiraj deset običnih korisnika
        User::factory()->state([
            'role' => 'user',
        ])->count(10)->create();
    }
}
