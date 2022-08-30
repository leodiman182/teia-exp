@component('mail::message', ['password' => $password])
Seja bem-vindo à TeiaExp!

Venha ter as melhores experiências conosco.
<br>
Sua senha para acessar a plataforma é: <b> {{$password}} </b>

@component('mail::button', ['url' => 'https://teiaexp.agasoftware.com.br/'])
Acessar plataforma
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
