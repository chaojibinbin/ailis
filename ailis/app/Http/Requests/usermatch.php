<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class usermatch extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user' => 'required|unique:users|max:255',
            'name' => 'required',
            'password' => 'required',
            'other' => 'required',
            'region' => 'required',
            //
        ];
    }
    public function messages()
    {
        return [
            'user.required' => '账户必须填写',
            'user.unique' => '账户重复',
            'name.required' => '名称必须填写',
            'password.required' => '密码必须填写',
            'other.required' => '备注必须填写',
            'region.required' => '状态必须填写',
        ];
    }
}
