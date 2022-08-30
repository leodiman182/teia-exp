<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storeexperience_tagRequest;
use App\Http\Requests\Updateexperience_tagRequest;
use App\Models\experience_tag;

class ExperienceTagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $experience_tag = experience_tag::all();
        return response()->json($experience_tag,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storeexperience_tagRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storeexperience_tagRequest $request)
    {
        $request->validate([
            'description' => 'required|max:32|min:3|unique:experience_tags,description',
        ]);
        $experience_tag = experience_tag::create($request->all());

        return response()->json($experience_tag,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\experience_tag  $experience_tag
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $experience_tag = experience_tag::find($id);
        return response()->json($experience_tag,200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updateexperience_tagRequest  $request
     * @param  \App\Models\experience_tag  $experience_tag
     * @return \Illuminate\Http\Response
     */
    public function update(Updateexperience_tagRequest $request, $id)
    {
        $experience_tag = experience_tag::find($id);
        if($experience_tag === null) return response()->json(['msg'=>'Essa TAG não foi encontrada.'],404);

        $request->validate([
            'description' => 'required|max:32|min:3',
        ]);

        $experience_tag->update($request->all());

        return response()->json($experience_tag,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\experience_tag  $experience_tag
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $experience_tag = experience_tag::find($id);
        if($experience_tag === null) return response()->json(['msg'=>'Essa TAG não foi encontrada.'],404);

        $experience_tag->delete();

        return response()->json(['msg' => 'TAG excluída com sucesso'],200);
    }
}
