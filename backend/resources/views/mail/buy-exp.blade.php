@component('mail::message', ['exp' => $exp, 'person' => $person])
# TeiaExp

Olá, {{$person[0]->name}}.<br>
Verificamos que você acabou de compra a experiência: <b> {{$exp[0]->title}} </b> e ela já consta em seu histórico de compras.<br>


@component('mail::button', ['url' => 'https://teiaexp.agasoftware.com.br/'])
Acessar plataforma
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
