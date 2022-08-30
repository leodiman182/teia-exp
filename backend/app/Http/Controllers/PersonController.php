<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorepersonRequest;
use App\Http\Requests\UpdatepersonRequest;
use App\Models\person;
use Illuminate\Support\Facades\Mail;
use App\Mail\users;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $person = person::select()
            ->join('companies', 'people.company_id', '=', 'companies.id')
            ->select('companies.name AS company_name', 'companies.cnpj', 'people.*')
            ->where('companies.active', 'true')
            ->get();
        return response()->json($person,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorepersonRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorepersonRequest $request)
    {
        $request->validate([
            // 'user_id' => 'required|exists:users,id',
            'level_id' => 'required|exists:levels,id',
            'company_id' => 'required|exists:companies,id',
            'cpf' => 'nullable|cpf',
            'name' => 'required|min:3|max:128',
            'email' => 'required|email',
            'address' => 'max:128',
            'district' => 'max:256',
            'city' => 'max:128',
            'state' => 'nullable|min:2|max:2',
        ]);
        $person = person::create([
            // 'user_id' =>  (int)$request->user_id,
            'level_id' => (int)$request->level_id,
            'company_id' => (int)$request->company_id,
            'rg' => $request->rg,
            'cpf' => $request->cpf,
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'zip_code' => $request->zip_code,
            'address_number' => $request->address_number,
            'district' => $request->district,
            'city' => $request->city,
            'active' => $request->active,
            'state' => $request->state,
        ]);

        return response()->json($person,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\person  $person
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $person = person::find($id);
        return response()->json($person,200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatepersonRequest  $request
     * @param  \App\Models\person  $person
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatepersonRequest $request, $id)
    {
        $person = person::find($id);
        if($person === null) return response()->json(['msg'=>'Essa pessoa não foi encontrada.'],404);

        $request->validate([
            // 'user_id' => 'required|exists:users,id',
            'level_id' => 'required|exists:levels,id',
            'company_id' => 'required|exists:companies,id',
            'cpf' => 'nullable|cpf',
            'name' => 'required|min:3|max:128',
            'email' => 'required|email',
            'address' => 'max:128',
            'district' => 'max:256',
            'city' => 'max:128',
            'state' => 'nullable|min:2|max:2',
        ]);

        $person->update([
            // 'user_id' =>  (int)$request->user_id,
            'level_id' => (int)$request->level_id,
            'company_id' => (int)$request->company_id,
            'rg' => $request->rg,
            'cpf' => $request->cpf,
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'zip_code' => $request->zip_code,
            'address_number' => $request->address_number,
            'district' => $request->district,
            'city' => $request->city,
            'active' => $request->active,
            'state' => $request->state,
        ]);

        return response()->json($person,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\person  $person
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $person = person::find($id);
        if($person === null) return response()->json(['msg'=>'Essa pessoa não foi encontrada.'],404);

        $person->delete();

        return response()->json(['msg' => 'Essa pessoa foi excluída com sucesso'],200);   
    }
    
    public function SenderPassword($email, $password)
    {
        Mail::to($email)->send(new users($password));
        return 'Success' . ' - ' . $password;
    }

    public function GetByCompany($idCompany)
    {
        $person = person::select()
            ->join('companies', 'people.company_id', '=', 'companies.id')
            ->select('companies.name AS company_name', 'companies.cnpj', 'people.*')
            ->where('companies.active', 'true')
            ->where('companies.id', $idCompany)
            ->get();
        return response()->json($person,200);
    }


}
