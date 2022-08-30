<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storeperson_experienceRequest;
use App\Http\Requests\Updateperson_experienceRequest;
use App\Models\person_experience;

class PersonExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $person_experience = person_experience::all();
        return response()->json($person_experience,200);
    }
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storeperson_experienceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storeperson_experienceRequest $request)
    {
        $request->validate([
            'person_id' => 'required|exists:users,id',
            'answer_id' => 'required|exists:answer_id,id',
        ]);
        $person = person_experience::create([
            'person_id' =>  (int)$request->person_id,
            'answer_id' => (int)$request->answer_id,
        ]);

        return response()->json($person,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\person_experience  $person_experience
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $person = person_experience::find($id);
        return response()->json($person,200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updateperson_experienceRequest  $request
     * @param  \App\Models\person_experience  $person_experience
     * @return \Illuminate\Http\Response
     */
    public function update(Updateperson_experienceRequest $request, $id)
    {
        $person_experience = person_experience::find($id);
        if($person_experience === null) return response()->json(['msg'=>'Essa relação não foi encontrada.'],404);

        $request->validate([
            'person_id' => 'required|exists:users,id',
            'answer_id' => 'required|exists:answer_id,id',
        ]);

        $person_experience->update($request->all());

        return response()->json($person_experience,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\person_experience  $person_experience
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $person_experience = person_experience::find($id);
        if($person_experience === null) return response()->json(['msg'=>'Essa relação não foi encontrada.'],404);

        $person_experience->delete();

        return response()->json(['msg' => 'Essa relação foi excluída com sucesso'],200);  
    }
}
