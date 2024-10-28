<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameDiscountTable extends Migration
{
    public function up()
    {
        Schema::rename('discount', 'discounts');
    }

    public function down()
    {
        Schema::rename('discounts', 'discount');
    }
}
