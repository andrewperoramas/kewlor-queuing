<?php

namespace Database\Seeders;

use App\Actions\AddUserQueue;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Olaf',
            'email' => 'admin@kewlor.com',
            'password' => 'A123jkl$*9p$)',
        ]);

        $addUserQueue = app()->make(AddUserQueue::class);
        for ($i = 0; $i < 10; $i++) {

            $addUserQueue->handle([
                'name' => fake()->userName(),
                'email' => fake()->safeEmail(),
                'message' => fake()->words(5, true),
            ]);
        }
    }
}
