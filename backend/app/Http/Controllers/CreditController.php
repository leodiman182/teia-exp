<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorecreditRequest;
use App\Http\Requests\UpdatecreditRequest;
use App\Models\credit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreditController extends Controller
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
     * @param  \App\Http\Requests\StorecreditRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorecreditRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\credit  $credit
     * @return \Illuminate\Http\Response
     */
    public function show(credit $credit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\credit  $credit
     * @return \Illuminate\Http\Response
     */
    public function edit(credit $credit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatecreditRequest  $request
     * @param  \App\Models\credit  $credit
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatecreditRequest $request, credit $credit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\credit  $credit
     * @return \Illuminate\Http\Response
     */
    public function destroy(credit $credit)
    {
        //
    }

    public function setByCompany(Request $request)
    {
        if(!$request->user()->admin) return response()->json(['error' => 'Unauthenticated.'], 401);

        $post = $request->all();
        $return = array(
            'list' => json_decode($post['list']),
            'price' => $post['price'],
            'validation' => $post['validation']
        );

        if( !isset($post['validation']) || intval($post['validation']) <= 0 ){
            return response()->json(
                array(
                    'errors' => array ( 
                        'value' => ["Informe uma quantidade de messes maior que zero."] 
                    ),
                    'message' => "Informe uma quantidade de messes maior que zero." 
                ),
            422);
        }

        $time = strtotime(date("Y-m-d H:i:s"));
        $Datefinal = date("Y-m-d H:i:s", strtotime("+" . $post['validation'] . " month", $time));

        $ListTransactions = array();
        foreach ($return['list'] as $key => $value) {
            if(!$value->checkbox) continue;

            array_push($ListTransactions, array(
                'person_id' => $value->id,
                'value' => floatval($return['price']),
                'expire' => $Datefinal
            ));

            $myRequest = new Request();
            $myRequest->replace(
                $ListTransactions[count($ListTransactions) - 1]
            );

            $myRequest->validate([
                'person_id' => 'required|unique:users,id',
                'value' => 'required|numeric|gt:0',
                'expire' => 'required|date'
            ]);

        }

        if(count($ListTransactions) == 0){
            return response()->json(
                array(
                    'errors' => array ( 
                        'value' => ["Selecione um colaborador antes de lançar os créditos"] 
                    ),
                    'message' => "Selecione um colaborador antes de lançar os créditos"  
                ),
            422);
        }
       
        foreach ($ListTransactions as $key => $value) {
            $myRequest = new Request();
            $myRequest->replace($value);

            credit::create($myRequest->all());
        }

        return response()->json($ListTransactions,200);
    }
}
