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
            $table->string('email')->nullable();
            $table->unsignedInteger('queue_number')->default(1);
            $table->index('queue_number');
            $table->unsignedInteger('initial_queue_number')->default(1);
            $table->index('initial_queue_number');
            $table->unsignedInteger('boost_count')->default(0);
            $table->text('message');
            $table->text('admin_notes')->nullable();
            $table->string('status');
            $table->timestamps();
            $table->unsignedInteger('is_working')->default(0);
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
