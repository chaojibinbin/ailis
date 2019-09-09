<?php

use Illuminate\Http\Request;

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
Route::group([
    'prefix' => 'v1',
   'namespace'=>'back'
], function () {
    Route::post('login', 'usercontroller@login');
    Route::post('signup', 'usercontroller@signup');
//    Route::get('test', 'test@index');
    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::post('logout', 'usercontroller@logout');
        Route::post('getuserlist', 'usercontroller@getuserlist');
        Route::post('deleteuser', 'usercontroller@deleteuser');
        Route::post('edituser', 'usercontroller@edituser');
      //  Route::post('signup', 'usercontroller@signup');
    });
});
