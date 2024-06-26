<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\StatsController;

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

Route::get('/events/stats', [EventController::class, 'statistike']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
 
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/events', [EventController::class, 'index']);

Route::get('/venues', [VenueController::class, 'index']);
Route::get('/stats', [StatsController::class, 'statistike']);


Route::middleware(['auth:sanctum', 'role:admin,user'])->group(function () {

    Route::get('myProfile', [AuthController::class, 'myProfile']);
    Route::post('logout', [AuthController::class, 'logout']);

});
 
Route::middleware(['auth:sanctum','role:admin'])->group(function () {    
    

    Route::post('/events', [EventController::class, 'store']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);
    Route::put('/events/{id}', [EventController::class, 'update']);
   


    Route::apiResource('venues', VenueController::class)->except('index');

    Route::apiResource('sources', SourceController::class);
    Route::apiResource('categories', CategoryController::class)->except("index");
    Route::patch('/users/{id}/role', [AuthController::class, 'updateUserRole']);
    Route::get('/users', [AuthController::class, 'allUsers']);

 
}); 
Route::middleware(['auth:sanctum','role:user'])->group(function () {

});