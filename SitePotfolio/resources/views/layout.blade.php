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
        <footer>
            <div class="footer-section">
                <h4>Mes Réseaux sociaux</h4>
                <ul class="social-icons">
                    <li><a href="#"><img src="linkedin-icon.png" alt="LinkedIn"></a></li>
                    <li><a href="#"><img src="facebook-icon.png" alt="Facebook"></a></li>
                    <li><a href="#"><img src="instagram-icon.png" alt="Instagram"></a></li>
                </ul>
            </div>
        </footer>
    </body>
</html>