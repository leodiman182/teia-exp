<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as RulesPassword;

use App\Mail\users;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $date = $request->validate([
            'name' => 'required|string|min:3',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed', 
                RulesPassword::defaults()
                // Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        $user = User::create([
            'name' => $date['name'],
            'email' => $date['email'],
            'password' => bcrypt($date['password']),
        ]);
        Mail::to($date['email'])->send(new users($date['password']));
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $resquest)
    {
        $credential = $resquest->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [ 'required' ],
            'remember' => 'boolean'
        ]);

        $remember = $credential['remember'] ?? false;
        unset($credential['remember']);

        if(!Auth::attempt($credential, $remember)){
            return response([
                'errors' => 'Usuário e/ou senha inválido(s)'
            ],422);
        }

        $user = Auth::user();

        if(!$user->admin) {
            return response([
                'errors' => 'Usuário e/ou senha inválido(s)'
            ],422);
        }

        $token = $user->createToken('main')->plainTextToken;
        
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }


    public function loginCollaborator(Request $resquest)
    {
        $credential = $resquest->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [ 'required' ],
            'remember' => 'boolean'
        ]);

        $remember = $credential['remember'] ?? false;
        unset($credential['remember']);

        if(!Auth::attempt($credential, $remember)){
            return response([
                'message' => 'Usuário e/ou senha inválido(s)',
            ],422);
        }

        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;
        
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }


    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([ 'success' => true]);
    }

}
