<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreexperienceRequest;
use App\Http\Requests\UpdateexperienceRequest;
use App\Models\experience;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\DB;

class ExperienceController extends Controller
{

    private $storageURL = 'img/experience';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
            $experience = DB::select('SELECT 
                    exp.id, exp.title, exp.description, exp.price, exp.image, exp.duration,
                    exp.localization, exp.when, exp.active, exp.whatsapp, exp.email,
                    cat.title as category_title, cat.description as  category_description, 
                    jsonb_agg(tag.description) as tags
                    FROM experiences as exp
                        INNER JOIN experience_categories as cat ON cat.id = exp.experience_categories_id 
                        LEFT JOIN tag_experiences as te ON te.experience_id = exp.id
                        LEFT JOIN experience_tags as tag ON tag.id = te.experience_tag_id
                        WHERE exp.deleted_at is null AND cat.active = true AND tag.active = true
                        GROUP BY cat.description, cat.title,exp.id, exp.title, exp.description, 
                        exp.price, exp.image, exp.duration, exp.localization, exp.when');
            
        // $experience = experience::select()
        //     ->join('experience_categories', 'experiences.experience_categories_id', '=', 'experience_categories.id')
        //     ->select(
        //         'experience_categories.title AS category_title', 
        //         'experience_categories.description AS category_description', 
        //         'experiences.*')
        //     ->get();
        return response()->json($experience,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreexperienceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreexperienceRequest $request)
    {
        $request->validate([
            'experience_categories_id' => 'required|exists:experience_categories,id',
            'title' => 'required|max:64|min:3|unique:experiences,title',
            'description' => 'required|max:255|min:3',
            'price' => 'required',
            'image' => 'required|file|mimes:png,jpg',
            'duration' => 'required|max:128|min:3',
            'localization' => 'required|max:128|min:3',
            'when' => 'required|max:128|min:3',
            'whatsapp' => 'required|max:32|min:3',
            'email' => 'required|email',
        ]);

        $imageURN = $request->file('image')->store($this->storageURL ,'public');

        $experience = experience::create([
            'experience_categories_id' => $request->experience_categories_id,
            'title' => $request->title,
            'description' => $request->description,
            'whatsapp' => $request->whatsapp,
            'email' => $request->email,
            'price' => $request->price,
            'image' => $imageURN,
            'duration' => $request->duration,
            'localization' => $request->localization,
            'when' => $request->when,
            'active' => $request->active,
        ]);

        return response()->json($experience,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\experience  $experience
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         $experience = DB::select('SELECT 
                    exp.id, exp.title, exp.description, exp.price, exp.image, exp.duration,
                    exp.localization, exp.when, exp.active, exp.whatsapp, exp.email,
                    cat.title as category_title, cat.description as  category_description, 
                    jsonb_agg(tag) as tags
                    FROM experiences as exp
                        INNER JOIN experience_categories as cat ON cat.id = exp.experience_categories_id 
                        LEFT JOIN tag_experiences as te ON te.experience_id = exp.id
                        LEFT JOIN experience_tags as tag ON tag.id = te.experience_tag_id
                        WHERE exp.deleted_at is null AND cat.active = true AND tag.active = true AND exp.id = ?
                        GROUP BY cat.description, cat.title,exp.id, exp.title, exp.description, 
                        exp.price, exp.image, exp.duration, exp.localization, exp.when', [$id]);
            
        // $experience = experience::select()
        //     ->join('experience_categories', 'experiences.experience_categories_id', '=', 'experience_categories.id')
        //     ->select(
        //         'experience_categories.title AS category_title', 
        //         'experience_categories.description AS category_description', 
        //         'experiences.*')
        //     ->get();
        return response()->json($experience,200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateexperienceRequest  $request
     * @param  \App\Models\experience  $experience
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateexperienceRequest $request, $id)
    {
        $experience = experience::find($id);
        if($experience === null) return response()->json(['msg'=>'Essa experiência não foi encontrada.'],404);

        $request->validate([
            'experience_categories_id' => 'required|exists:experience_categories,id',
            'title' => 'required|max:64|min:3',
            'description' => 'required|max:255|min:3',
            'price' => 'required',
            'image' => 'required|file|mimes:png,jpg',
            'duration' => 'required|max:128|min:3',
            'localization' => 'required|max:128|min:3',
            'when' => 'required|max:128|min:3',
            'whatsapp' => 'required|max:32|min:3',
            'email' => 'required|email',
        ]);

        $imageURN = $request->file('image')->store($this->storageURL,'public');
        Storage::disk('public')->delete($experience->image);

        $experience->update([
            'experience_categories_id' => $request->experience_categories_id,
            'title' => $request->title,
            'description' => $request->description,
            'whatsapp' => $request->whatsapp,
            'email' => $request->email,
            'price' => $request->price,
            'image' => $imageURN,
            'duration' => $request->duration,
            'localization' => $request->localization,
            'when' => $request->when,
            'active' => $request->active,
        ]);

        return response()->json($experience,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\experience  $experience
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $experience = experience::find($id);
        if($experience === null) return response()->json(['msg'=>'Essa experiência não foi encontrada.'],404);

        Storage::disk('public')->delete($experience->image);
        $experience->delete();

        return response()->json(['msg' => 'Experiência excluída com sucesso'],200);
    }

    public function GetByCategory($id)
    {
        $experience = DB::select('SELECT 
                    exp.id, exp.title, exp.description, exp.price, exp.image, exp.duration,
                    exp.localization, exp.when, exp.active, exp.whatsapp, exp.email,
                    cat.title as category_title, cat.description as  category_description, 
                    jsonb_agg(tag) as tags
                    FROM experiences as exp
                        INNER JOIN experience_categories as cat ON cat.id = exp.experience_categories_id 
                        LEFT JOIN tag_experiences as te ON te.experience_id = exp.id
                        LEFT JOIN experience_tags as tag ON tag.id = te.experience_tag_id
                        WHERE exp.deleted_at is null AND cat.active = true 
                        AND tag.active = true AND cat.id = ?
                        GROUP BY cat.description, cat.title,exp.id, exp.title, exp.description, 
                        exp.price, exp.image, exp.duration, exp.localization, exp.when', [$id]);
            
        return response()->json($experience,200);
    }

    public function GetByTag($id)
    {
        $experience = DB::select('SELECT 
                    exp.id, exp.title, exp.description, exp.price, exp.image, exp.duration,
                    exp.localization, exp.when, exp.active, exp.whatsapp, exp.email,
                    cat.title as category_title, cat.description as  category_description, 
                    jsonb_agg(tag) as tags
                    FROM experiences as exp
                        INNER JOIN experience_categories as cat ON cat.id = exp.experience_categories_id 
                        LEFT JOIN tag_experiences as te ON te.experience_id = exp.id
                        LEFT JOIN experience_tags as tag ON tag.id = te.experience_tag_id
                        WHERE exp.deleted_at is null AND cat.active = true 
                        AND tag.active = true AND te.experience_tag_id = ?
                        GROUP BY cat.description, cat.title,exp.id, exp.title, exp.description, 
                        exp.price, exp.image, exp.duration, exp.localization, exp.when', [$id]);
            
        return response()->json($experience,200);
    }

    public function GetById($id)
    {
         $experience = experience::find($id);
        return response()->json($experience,200);
    }


}
