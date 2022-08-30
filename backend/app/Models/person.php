<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class person extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable =[
        'level_id',
        'user_id',
        'company_id',
        'name',
        'rg',
        'cpf',
        'address',
        'zip_code',
        'address_number',
        'district',
        'city',
        'email',
        'active',
        'state',
    ];
}
