<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./css/styles.css"/>
        @yield('styles')
    @yield('script')
    <title>Quentin-Massoulle</title>
     </head>
    <body>
        <div class="navbar">
            <div class ="element">
                <a href="/"><img src="" alt="Photo moi"></a>
                <a href="">A-Propos</a>
                <a href="">Mon Parcours</a>
                <a href="">Mes Passion</a>
                <a href="">Mes Projet</a>
                <a href="">Me Contacter</a>
            </div>
        </div>
        @yield('content')
        <div class="footer">footer</div>
    </body>
</html>