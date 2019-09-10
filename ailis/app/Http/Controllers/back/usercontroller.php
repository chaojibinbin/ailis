<?php

namespace App\Http\Controllers\back;

use App\Http\Requests\usermatch;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
class usercontroller extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(usermatch $request)
    {
        $user = new User([
            'name' => $request->name,
            'user' => $request->user,
            'password' => bcrypt($request->password),
            'region' => $request->region,
            'other' => $request->other,
        ]);

        $user->save();

        return response()->json([
       'data'=>[
           'msg' => '注册成功',


           ],




        ], 200);
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $credentials = request(['user', 'password']);

        if(!Auth::attempt($credentials))
            return response()->json([
               'data'=>[
                   'msg'=> '用户名密码错误',
                   'user' => $request->user,
                   'password' => $request->password,

               ],

            ],409);

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;


        $token->save();
$name=user::where('user',$request->user)->select('name','uuid')->first();
        return response()->json([
            'data'=>[
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString(),
                'name' =>$name->name,
                'uuid' =>$name->uuid,
                'msg'=>'登陆成功',

            ],


        ],200);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'data'=>[  'msg' => '退出成功'],

        ],200);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function getuserlist(Request $request)
    {
        $list=user::select('user','name','password','other','region','created_at')->get();
        return response()->json(
            [
             'data'=> $list ,
                 'msg'=>'获取列表成功'


            ]

        );
    }
    public function edituser(Request $request)
    {
        $user=$request->user;
        $name=$request->name;
        $password=bcrypt($request->password);
        $other=$request->other;
        $region=$request->region;
         user::where('uuid',$request->uuid)
            ->update([
                'name'=>$name,
                'user'=>$user,
                'password'=>$password,
                'other'=>$other,
                'region'=>$region
            ]);

        return response()->json([
            'data'=>[
                'msg'=>'更新完成'
            ],
            ],200);
    }
    public function deleteuser(Request $request)
    {
        $deleteuser=$request->uuid;
        $delete=user::where('uuid',$deleteuser);
        $delete->delete();
        return response()->json([
            'data'=>[
                'msg'=>'删除成功'
            ],
           ],200);
    }
}
