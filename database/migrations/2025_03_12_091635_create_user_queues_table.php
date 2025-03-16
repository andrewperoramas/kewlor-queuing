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
        Schema::create('user_queues', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->unsignedInteger('queue_number')->default(1);
            $table->index('queue_number');
            $table->unsignedInteger('initial_queue_number')->default(1);
            $table->index('initial_queue_number');
            $table->boolean('is_boosted')->default(false);
            $table->text('message');
            $table->text('admin_notes')->nullable();
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_queues');
    }
};
