@component('mail::message', ['exp' => $exp, 'person' => $person])
# TeiaExp

Olá!!!<br>
O usuário <b>{{$person[0]->name}}</b> de e-mail <b>{{$person[0]->email}}</b> acabou de comprar uma experiência <b> {{$exp[0]->title}} </b>

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
