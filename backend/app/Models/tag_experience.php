<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tag_experience extends Model
{
    use HasFactory;
    // use SoftDeletes;

    protected $fillable =[
        'experience_tag_id',
        'experience_id',
    ];
}
