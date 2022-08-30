<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BuyExp extends Mailable
{
    use Queueable, SerializesModels;
    public $exp;
    public $person;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($exp,$person)
    {
        $this->exp = $exp;
        $this->person = $person;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.buy-exp',[$this->exp, $this->person]);
    }
}
