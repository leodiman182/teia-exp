<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class person_experience extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable =[
        'person_id',
        'answer_id',
        'experience_id',
    ];
}
