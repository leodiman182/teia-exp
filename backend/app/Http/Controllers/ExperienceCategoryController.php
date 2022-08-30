<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storeexperience_categoryRequest;
use App\Http\Requests\Updateexperience_categoryRequest;
use App\Models\experience_category;
use Illuminate\Support\Facades\Storage;

class ExperienceCategoryController extends Controller
{
    private $storageURL = 'img/experience/category';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $experience_category = experience_category::all();
        return response()->json($experience_category,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storeexperience_categoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storeexperience_categoryRequest $request)
    {
        //
        $request->validate([
            'title' => 'required|max:128|min:3|unique:experience_categories,title',
            'description' => 'required|max:256|min:3',
            'image' => 'required|file|mimes:png,jpg'
        ]);

        $imageURN = $request->file('image')->store($this->storageURL,'public');

        $experience_category = experience_category::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imageURN,
            'active' => $request->active,
        ]);

        return response()->json($experience_category,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\experience_category  $experience_category
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $experience_category = experience_category::find($id);
        return response()->json($experience_category,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updateexperience_categoryRequest  $request
     * @param  \App\Models\experience_category  $experience_category
     * @return \Illuminate\Http\Response
     */
    public function update(Updateexperience_categoryRequest $request, $id)
    {
        $experience_category = experience_category::find($id);
        if($experience_category === null) return response()->json(['msg'=>'Essa categoria não foi encontrada.'],404);

        $request->validate([
            'title' => 'required|max:128|min:3',
            'description' => 'required|max:256|min:3',
            'image' => 'required|file|mimes:png,jpg',
        ]);

        $imageURN = $request->file('image')->store($this->storageURL,'public');
        Storage::disk('public')->delete($experience_category->image);

        $experience_category->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imageURN,
            'active' => $request->active,
        ]);

        return response()->json($experience_category,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\experience_category  $experience_category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $experience_category = experience_category::find($id);
        if($experience_category === null) return response()->json(['msg'=>'Essa categoria não foi encontrada.'],404);

        Storage::disk('public')->delete($experience_category->image);
        $experience_category->delete();

        return response()->json(['msg' => 'Categoria excluída com sucesso'],200);
    }
}
