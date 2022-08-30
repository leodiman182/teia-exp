@component('mail::message', ['exp' => $exp, 'person' => $person])
# TeiaExp

Olá!!!<br>
Você acaba de realizar uma venda da experiência <b> {{$exp[0]->title}} </b> pela plataforma {{ config('app.name') }}.<br>
O usuário que realizou a compra foi {{$person[0]->name}} e o e-mail dele é {{$person[0]->email}}.<br>
Em breve ele entrar em contato pelo seu WhatsApp.<br>

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
