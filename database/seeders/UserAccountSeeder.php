<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

final class UserAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Olaf',
            'email' => 'admin@kewlor.com',
            'password' => 'A123jkl$*9p$)',
        ]);
    }
}
