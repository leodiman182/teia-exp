<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoredebtRequest;
use App\Http\Requests\UpdatedebtRequest;
use App\Models\debt;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Mail;
use App\Mail\BuyExp;
use App\Mail\BuyExpBySeller;
use App\Mail\emailExptoAdmin;

use App\Models\experience;
use Illuminate\Http\Request;

class DebtController extends Controller
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
     * @param  \App\Http\Requests\StoredebtRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoredebtRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\debt  $debt
     * @return \Illuminate\Http\Response
     */
    public function show(debt $debt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\debt  $debt
     * @return \Illuminate\Http\Response
     */
    public function edit(debt $debt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatedebtRequest  $request
     * @param  \App\Models\debt  $debt
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatedebtRequest $request, debt $debt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\debt  $debt
     * @return \Illuminate\Http\Response
     */
    public function destroy(debt $debt)
    {
        //
    }

    public function setExperience(Request $request){
        $req = $request->all();

        if(isset($req['user_id'])){
            $person_id = DB::select("SELECT p.id  FROM users as u
                INNER JOIN people p ON p.email = u.email AND p.deleted_at is null
                WHERE u.deleted_at is null AND u.id = ? ",
                [$req['user_id']]
            );
            $req['person_id'] = $person_id[0]->id;
        }

        $creditSum = DB::select('SELECT SUM(credit_value) as credit_value FROM vw_credit_left WHERE person_id = ?', [$req['person_id']]);
        $credits = DB::select('SELECT id, credit_value FROM vw_credit_left WHERE person_id = ?', [$req['person_id']]);

        if( floatval($creditSum[0]->credit_value) < floatval($req['value']) ){
            return response()->json(
                array(
                    'errors' => array ( 
                        'value' => ["Você não tem créditos para essa operação."] 
                    ),
                    'message' => "Você não tem créditos para essa operação." 
                ),
            422);
        }

        $experience = experience::find($req['experience_id']);

        if($experience === null || $experience->active == false){
            return response()->json(
                array(
                    'errors' => array ( 
                        'value' => ["Essa experiência não existe"] 
                    ),
                    'message' => "Essa experiência não existe" 
                ),
            422);
        }

        if(floatval($experience->price) != floatval($req['value'])){
            return response()->json(
                array(
                    'errors' => array ( 
                        'value' => ["O valor da experiência " . $experience->title . " não está certo, por favor tente novamente."] 
                    ),
                    'message' => "O valor da experiência " . $experience->title . " não está certo, por favor tente novamente."
                ),
            422);
        }


        $ListCredits = array();
        $transaction_id = strtotime(date("Y-m-d H:i:s")) . $req['person_id'];
        foreach ($credits as $key => $value) {
            if(floatval($value->credit_value) <= 0 || floatval($req['value']) <= 0) continue;
            $debtValue = floatval($req['value']);
            if( floatval($req['value']) >= floatval($value->credit_value) ){
                $debtValue = floatval($value->credit_value);
                $req['value'] = $req['value'] - floatval($value->credit_value);
            }else{
                 $req['value'] = 0;
            }

            array_push($ListCredits, array(
                'transaction_id' => $transaction_id,
                'credit_id' => $value->id,
                'value' => floatval($debtValue),
                'experience_id' => $req['experience_id']
            ));

            $myRequest = new Request();
            $myRequest->replace($ListCredits[count($ListCredits) - 1]);

            $myRequest->validate([
                'transaction_id' => 'required|unique:debts,transaction_id',
                'credit_id' => 'required|exists:credits,id',
                'experience_id' => 'required|exists:experiences,id',
                'value' => 'required|numeric|gt:0',
            ]);
        }

        foreach ($ListCredits as $key => $value) {
            $myRequest = new Request();
            $myRequest->replace($value);

            debt::create($myRequest->all());
        }

        

        $this->SendEmailByBuyExp($req['person_id'],$req['experience_id']);
        return response()->json($ListCredits,200);


        
        // debt::create($request->all());
    }

    public function SendEmailByBuyExp($idUser,$idExp)
    {
        $person = DB::select("SELECT * FROM people WHERE id = ? ",[$idUser]);
        $exp = DB::select("SELECT * FROM experiences WHERE id = ? ",[$idExp]);
        $TeiaEmail = "contato@teiaexp.com";
       
        Mail::to($person[0]->email)->send(new BuyExp($exp,$person));
        Mail::to($exp[0]->email)->send(new BuyExpBySeller($exp,$person));
        Mail::to($TeiaEmail)->send(new emailExptoAdmin($exp,$person));
        return 'Success';
    }


}
