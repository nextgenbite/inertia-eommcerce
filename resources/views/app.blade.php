<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Nextgenbite') }}</title>

        <!-- Favicon -->
         <link rel="icon" href="{{ asset(settingHelper('favicon', '/favicon.ico')) }}" type="image/x-icon">
        <!-- Fonts -->

        {{-- <link href="https://fonts.cdnfonts.com/css/lato" rel="stylesheet"> --}}

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
