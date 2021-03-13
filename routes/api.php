<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/me', [ AuthController::class, 'me' ]);

    Route::get('/users', [ UserController::class, 'index']);
    Route::get('/users/{user}', [ UserController::class, 'show' ]);
    Route::post('/users', [ UserController::class, 'store']);
    Route::put('/users/{user}', [ UserController::class, 'update' ]);
    Route::delete('/users/{user}', [ UserController::class, 'destroy']);

    Route::get('/roles', [ RoleController::class, 'index']);
});
