<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_queue_votes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_queue_id');
            $table->string('ip_address');
            $table->tinyInteger('vote')->default(0);
            $table->timestamps();

            $table->unique(['user_queue_id', 'ip_address']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_queue_votes');
    }
};
