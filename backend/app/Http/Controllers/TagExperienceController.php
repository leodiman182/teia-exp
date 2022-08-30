<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storetag_experienceRequest;
use App\Http\Requests\Updatetag_experienceRequest;
use App\Models\tag_experience;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class TagExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tag_experience = tag_experience::all();
        return response()->json($tag_experience,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storetag_experienceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storetag_experienceRequest $request)
    {

        $request->validate([
            'experience_tag_id' => 'required|exists:experience_tags,id',
            'experience_id' => 'required|exists:experiences,id',
        ]);
        $tag_experience = tag_experience::create($request->all());

        return response()->json($tag_experience,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tag_experience  $tag_experience
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tag_experience = DB::select('SELECT 
		jsonb_agg(tag.description) as tags
		FROM experience_tags as tag
			INNER JOIN tag_experiences as te ON tag.id = te.experience_tag_id 
			WHERE te.deleted_at is null AND tag.active = true
            AND te.experience_id = ?', [$id]);
		
        return response()->json($tag_experience,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatetag_experienceRequest  $request
     * @param  \App\Models\tag_experience  $tag_experience
     * @return \Illuminate\Http\Response
     */
    public function update(Updatetag_experienceRequest $request, $id)
    {
        $tag_experience = tag_experience::find($id);
        if($tag_experience === null) return response()->json(['msg'=>'Esse relacionamento entre TAG e experiência não foi encontrada.'],404);

        $request->validate([
            'experience_tag_id' => 'required|exists:experience_tags,id',
            'experience_id' => 'required|exists:experiences,id',
        ]);

        $tag_experience->update($request->all());

        return response()->json($tag_experience,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tag_experience  $tag_experience
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tag_experience = tag_experience::find($id);
        if($tag_experience === null) return response()->json(['msg'=>'Esse relacionamento entre TAG e experiência não foi encontrada.'],404);

        $tag_experience->delete();

        return response()->json(['msg' => 'relacionamento entre TAG e experiência excluída com sucesso'],200);
    }

    public function DeletePerExperience($idExp){
        $tag_experience = tag_experience::where('experience_id', $idExp);
        if($tag_experience === null) return response()->json(['msg'=>'Esse relacionamento entre TAG e experiência não foi encontrada.'],404);

        $tag_experience->delete();

        return response()->json(['msg' => 'relacionamento entre TAG e experiência excluída com sucesso'],200);
    }

    public function InsertAll(Request $request,$idExp)
    {
        $tags = explode(',',$request->tags);
        // $tags = json_decode(json_encode($request->tags));
        foreach ($tags  as $key => $value) {
            
            $myRequest = new \Illuminate\Http\Request();
            $myRequest->setMethod('POST');
            $myRequest->request->add([
                'experience_tag_id' => $value,
                'experience_id' => $idExp
            ]);

            $myRequest->validate([
                'experience_tag_id' => 'required|exists:experience_tags,id',
                'experience_id' => 'required|exists:experiences,id',
            ]);

            
        }

        $this->DeletePerExperience($idExp);
        foreach ($tags  as $key => $value) {
            tag_experience::create([
                'experience_tag_id' => $value,
                'experience_id' => $idExp
            ]); 
        }

        $tag_experience = tag_experience::where('experience_id', $idExp)->get();
        return response()->json($tag_experience,200);
    }

}
