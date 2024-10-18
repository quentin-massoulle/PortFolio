FROM php:8.3-fpm

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier composer.json et composer.lock
COPY ./composer.json ./composer.lock ./

# Installer les dépendances requises
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    libgd-dev 
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
#Mine

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-external-gd
RUN docker-php-ext-install gd
# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copier le reste des fichiers du projet
COPY . .

# Installer les dépendances PHP
RUN composer install --no-interaction --prefer-dist --no-cache

# Ajouter un utilisateur pour l'application Laravel
RUN groupadd -g 1000 www \
    && useradd -u 1000 -ms /bin/bash -g www www

# Changer l'utilisateur courant
USER www

# Exposer le port 9000 pour php-fpm
EXPOSE 9000

# Démarrer le serveur php-fpm
CMD ["php-fpm"]