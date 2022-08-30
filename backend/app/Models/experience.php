<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class experience extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable =[
        'experience_categories_id',
        'title',
        'description',
        'price',
        'image',
        'duration',
        'localization',
        'when',
        'active',
        'whatsapp' ,
    ];
}
