<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorecompanyRequest;
use App\Http\Requests\UpdatecompanyRequest;
use App\Models\company;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $company = company::all();
        return response()->json($company,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorecompanyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorecompanyRequest $request)
    {
        $request->validate([
            'cnpj' => 'required|cnpj|max:14|unique:companies,cnpj',
            'name' => 'required|min:3|max:128',
            'email' => 'required|email|max:256',
        ]);
        $company = company::create($request->all());

        return response()->json($company,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\company  $company
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $company = company::find($id);
        return response()->json($company,200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatecompanyRequest  $request
     * @param  \App\Models\company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatecompanyRequest $request, $id)
    {
        $company = company::find($id);
        if($company === null) return response()->json(['msg'=>'Essa empresa não foi encontrada.'],404);

        //Não é possivel editar o CNPJ
        $request->validate([
            'name' => 'required|min:3|max:128',
            'email' => 'required|email|max:256',
        ]);

        $company->update([
            'name' => $request->name,
            'email' => $request->email,
            'active' => $request->active,
        ]);

        return response()->json($company,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = company::find($id);
        if($company === null) return response()->json(['msg'=>'Essa empresa não foi encontrada.'],404);

        $company->delete();

        return response()->json(['msg' => 'Essa empresa foi excluída com sucesso'],200);
    }
}
