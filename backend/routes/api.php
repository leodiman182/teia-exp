<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ExperienceCategoryController;
use App\Http\Controllers\ExperienceTagController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\PresentationController;
use App\Http\Controllers\TagExperienceController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\DebtController;
use App\Mail\users;
use Illuminate\Support\Facades\Mail;

use App\Mail\emailTeste;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/Presentation',[PresentationController::class,'index']);
    Route::post('/Presentation/changeStatus/{id}',[PresentationController::class,'changeStatus']);
    Route::get('/Person/SenderPassword/{email}/{password}',[PersonController::class,'SenderPassword']);
    Route::delete('/RelationshipExperienceToTag/DeletePerExperience/{idExp}',[TagExperienceController::class,'DeletePerExperience']);
    Route::post('/RelationshipExperienceToTag/InsertAll/{idExp}',[TagExperienceController::class,'InsertAll']);
    Route::post('/Credit/setByCompany',[CreditController::class,'setByCompany']);
    Route::post('/Debt/setExperience',[DebtController::class,'setExperience']);
    Route::get('/Transaction/getByUser/{idUser}',[TransactionsController::class,'getByUser']);
    Route::get('/Transaction/getByUserId/{idUser}',[TransactionsController::class,'getByUserId']);
    Route::get('/Transaction/getBalance/{idUser}',[TransactionsController::class,'getBalance']);

    
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login-collaborator', [AuthController::class, 'loginCollaborator']);
Route::post('/forgot-password', [PasswordController::class, 'forgotPassword']);
Route::post('/reset', [PasswordController::class, 'reset'])->name('password.reset');


Route::apiResources([
    '/ExperienceCategory' => ExperienceCategoryController::class,
    '/ExperienceTag' => ExperienceTagController::class,
    '/Experience' => ExperienceController::class,
    '/RelationshipExperienceToTag' => TagExperienceController::class,
    '/Company' => CompanyController::class,
    '/Level' => LevelController::class,
    '/Person' => PersonController::class,
]);

Route::post('/Presentation',[PresentationController::class,'store']);



//GET BY FRONT END
Route::get('/Experience/GetByCategory/{idExp}',[ExperienceController::class,'GetByCategory']);
Route::get('/Experience/GetByTag/{idExp}',[ExperienceController::class,'GetByTag']);
Route::get('/Experience/GetById/{idExp}',[ExperienceController::class,'GetById']);
Route::get('/Person/GetByCompany/{idCompany}',[PersonController::class,'GetByCompany']);

Route::get('/teste_email',  function (Request $request) {
    Mail::to('fernando.stefanutto@agatecnologia.com.br')->send(new emailTeste());
});



