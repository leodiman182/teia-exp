<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoretransactionsRequest;
use App\Http\Requests\UpdatetransactionsRequest;
use App\Models\transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
         
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoretransactionsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'person_id' => 'required|exists:users,id',
            'experience_id' => 'exists:experiences,id',
            'value' => 'required|integer',
            'credit' => 'required|boolean',
            'expire' => 'date'
        ]);

        $transactions = transactions::create($request->all());
        return response()->json($transactions,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\transactions  $transactions
     * @return \Illuminate\Http\Response
     */
    public function show(transactions $transactions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\transactions  $transactions
     * @return \Illuminate\Http\Response
     */
    public function edit(transactions $transactions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatetransactionsRequest  $request
     * @param  \App\Models\transactions  $transactions
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatetransactionsRequest $request, transactions $transactions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\transactions  $transactions
     * @return \Illuminate\Http\Response
     */
    public function destroy(transactions $transactions)
    {
        //
    }

    public function getBalance($id){
        $Balance = DB::select("SELECT SUM(value) as balance
            FROM vw_transaction_flow 
                WHERE person_id IN (
                    SELECT p.id  FROM users as u
                        INNER JOIN people p ON p.email = u.email AND p.deleted_at is null
                        WHERE u.deleted_at is null AND u.id = ?    
                )",
        [$id]);

        return response()->json($Balance,200);
    }

    public function getByUserId($id){

        $transactions = DB::select("SELECT * 
            FROM vw_transaction_flow 
                WHERE person_id IN (
                    SELECT p.id  FROM users as u
                        INNER JOIN people p ON p.email = u.email AND p.deleted_at is null
                        WHERE u.deleted_at is null AND u.id = ?    
                )",
        [$id]);

        $balance = DB::select("SELECT sum(credit_value) as value 
            FROM vw_balance_month_old 
                WHERE person_id = ?",
        [$id]);

        $callback = array(
            'transactions' =>$transactions, 
            'balance' =>$balance[0]->value, 
        );
      
        return response()->json($callback,200);
    }

    public function getByUser($id){

        $transactions = DB::select("SELECT * 
            FROM vw_transaction_flow 
                WHERE person_id = ? 
                    AND EXTRACT( MONTH FROM created_at ) >=  EXTRACT(MONTH FROM now())
                    AND EXTRACT( YEAR FROM created_at ) =  EXTRACT(YEAR FROM now())",
        [$id]);

        $balance = DB::select("SELECT sum(credit_value) as value 
            FROM vw_balance_month_old 
                WHERE person_id = ?",
        [$id]);

        $callback = array(
            'transactions' =>$transactions, 
            'balance' =>$balance[0]->value, 
        );
      
        return response()->json($callback,200);
    }

    public function setByCompany(Request $request, $idCompany)
    {
        if(!$request->user()->admin) return response()->json(['error' => 'Unauthenticated.'], 401);

        $post = $request->all();
        $return = array(
            'id' => $idCompany,
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
                'credit' => true,
                'expire' => $Datefinal
            ));

            $myRequest = new Request();
            $myRequest->replace(
                $ListTransactions[count($ListTransactions) - 1]
            );

            $myRequest->validate([
                'person_id' => 'required|unique:users,id',
                'experience_id' => 'unique:experiences,id',
                'value' => 'required|numeric|gt:0',
                'credit' => 'required|boolean',
                'expire' => 'date'
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

            transactions::create($myRequest->all());
        }

        return response()->json($ListTransactions,200);
    }
}
