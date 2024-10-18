<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./css/styles.css"/>
        @yield('styles')
    @yield('script')
     </head>
    <body>
        <div class="navbar">navbar</div>
        @yield('content')
        <div class="footer">footer</div>
    </body>
</html>