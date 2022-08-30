<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreoptionRequest;
use App\Http\Requests\UpdateoptionRequest;
use App\Models\option;

class OptionController extends Controller
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
     * @param  \App\Http\Requests\StoreoptionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreoptionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\option  $option
     * @return \Illuminate\Http\Response
     */
    public function show(option $option)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\option  $option
     * @return \Illuminate\Http\Response
     */
    public function edit(option $option)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateoptionRequest  $request
     * @param  \App\Models\option  $option
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateoptionRequest $request, option $option)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\option  $option
     * @return \Illuminate\Http\Response
     */
    public function destroy(option $option)
    {
        //
    }
}
