<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="base-url" content="{{ url('/') }}" />
    <meta name="api-base-url" content="{{ url('api/') }}" />
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <noscript>
        <strong>{{"We're sorry but Waaye doesn't work properly without JavaScript enabled. Please enable it to continue."}}</strong>
    </noscript>

    <div id="app" class="">
        <app-component></app-component>
    </div>
</body>
</html>
