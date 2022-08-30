<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class presentation extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'presentation';
    protected $fillable =[
        'email',
        'status',
        'name',
        'role'
    ];
}
