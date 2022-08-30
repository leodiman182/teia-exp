<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storeanswer_questionRequest;
use App\Http\Requests\Updateanswer_questionRequest;
use App\Models\answer_question;

class AnswerQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storeanswer_questionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storeanswer_questionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\answer_question  $answer_question
     * @return \Illuminate\Http\Response
     */
    public function show(answer_question $answer_question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\answer_question  $answer_question
     * @return \Illuminate\Http\Response
     */
    public function edit(answer_question $answer_question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updateanswer_questionRequest  $request
     * @param  \App\Models\answer_question  $answer_question
     * @return \Illuminate\Http\Response
     */
    public function update(Updateanswer_questionRequest $request, answer_question $answer_question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\answer_question  $answer_question
     * @return \Illuminate\Http\Response
     */
    public function destroy(answer_question $answer_question)
    {
        //
    }
}
