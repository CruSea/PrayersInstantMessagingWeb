<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use JWTAuth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    protected function signin(Request $request) {
        try {
            $rules = [
                'email' => 'required|email|max:255',
                'password' => 'required|string|min:6|max:255',
            ];
            $validator = Validator::make($request->all(), $rules);
            if($validator->fails()) {
                return response()->json(['message' => 'validation error', 'error' => $validator->messages()]);
            }
            $credential = $request->only('email', 'password');

            try {
                if(!$token = JWTAuth::attempt($credential)) {
                    return response()->json(['message' => 'Invalid Email or password'], 401);
                }
                $status = JWTAuth::toUser($token);
                if($status->status == false) {
                    return response()->json(['message' => 'Inactive account', 'error' => 'your account is not active yet'], 401);
                }
                return response()->json(['token' => $token, 'message' => 'successfully logged in'], 200);
            } catch(Exception $ex) {
                return response()->json(['message' => 'token is not created', 'error' => $ex->getMessage()], 500);
            }
        } catch(Exception $ex) {
            return response()->json(['message' => 'Whoops! something went wrong', 'error' => $ex->getMessage()], 500);
        }
    }
}
