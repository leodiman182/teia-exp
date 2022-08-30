<?php

namespace App\Http\Controllers;

use App\Models\presentation;
use Illuminate\Http\Request;

class PresentationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(!$request->user()->admin){
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        $presentation = presentation::orderBy('updated_at', 'DESC')->get();
        return response()->json($presentation,200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:256',
            'name' => 'required|min:3|max:128',
            'role' => 'required|min:3|max:128',
        ]);
        $presentation = presentation::create([
            'email' =>  $request->email,
            'name' =>  $request->name,
            'role' =>  $request->role,
            'status' => false,
        ]);

        return response()->json($presentation,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Presentation  $presentation
     * @return \Illuminate\Http\Response
     */
    public function show(Presentation $presentation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Presentation  $presentation
     * @return \Illuminate\Http\Response
     */
    public function edit(Presentation $presentation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Presentation  $presentation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Presentation $presentation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Presentation  $presentation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Presentation $presentation)
    {
        //
    }

    public function changeStatus(Request $request, $id){
        if(!$request->user()->admin){
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        
        $presentation = presentation::find($id);
        if($presentation === null) return response()->json(['msg'=>'Essa apresentação não foi encontrada.'],404);
        $presentation->update($request->all());

        return response()->json($presentation,200);
        
    }
}
