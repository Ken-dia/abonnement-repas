<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends BaseController
{
     /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            // Create a personal access token
            $tokenResult = $user->createToken('Personal Access Token');
            $success['token'] = $tokenResult->accessToken;
            $success['name'] = $user->name;
            $success['role'] = $user->role;

            return $this->sendResponse($success, 'Connexion reussie.');
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Email ou mot de passe incorrect']);
        }
    }
}
