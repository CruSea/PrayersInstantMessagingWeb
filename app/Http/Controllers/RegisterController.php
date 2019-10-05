<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'min:9', 'max:13'],
            'country' => ['required', 'string', 'max:255'],
            'language' => ['required', 'string', 'min:1'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'country' => $data['country'],
            'language' => $data['language'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    protected function signup(Request $request) {
        try {
            $rules = [
                'name' => 'required|string|max:255',
                'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:9|max:13|unique:users',
                'country' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users',
                'password' => 'required|string|min:6',
            ];
            $validator = Validator::make($request->all(), $rules);
            if($validator->fails()) {
                return response()->json(['error' => 'validation error', 'message' => $validator->messages()], 500);
            }
            $phone_number = $request->input('phone');
            $contact0 = Str::startsWith($request->input('phone'), '0');
            $contact9 = Str::startsWith($request->input('phone'), '9');
            $contact251 = Str::startsWith($request->input('phone'), '251');
            if($contact0) {
                $phone_number = Str::replaceArray("0", ["+251"], $request->input('phone'));
            }
            else if($contact9) {
                $phone_number = Str::replaceArray("9", ["+2519"], $request->input('phone'));
            }
            else if($contact251) {
                $phone_number = Str::replaceArray("251", ['+251'], $request->input('phone'));
            }
            if(strlen($phone_number) > 13 || strlen($phone_number) < 13) {
                return response()->json(['message' => 'validation error', 'error' => 'phone number length is not valid'], 400);
            }
            $check_phone_existance = User::where('phone', $phone_number)->exists();
            if($check_phone_existance) {
                return response()->json(['error' => 'The phone has already been taken'], 400);
            }

            $user = new User();
            $user->name = $request->input('name');
            $user->phone = $phone_number;
            $user->country = $request->input('country');
            $user->email = $request->input('email');
            $user->password = bcrypt($request->input('password'));
            if($user->save()) {
                return response()->json(['message' => 'registered successfully'], 200);
            } else {
                return response()->json(['error' => 'Whoops! something went wrong, registration was not successful'], 500);
            }
        } catch(Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 500);
        }
    }
}
