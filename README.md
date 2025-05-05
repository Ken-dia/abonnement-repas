# Application d'Abonnement Repas

## À propos

Cette application web permet aux utilisateurs de gérer leurs abonnements à des services de repas. Elle est construite avec Laravel et Vue.js, offrant une expérience utilisateur moderne et réactive.

## Technologies Utilisées

- **Backend:** Laravel 10
- **Frontend:** Vue.js 3
- **CSS:** Tailwind CSS
- **Base de données:** MySQL

## Fonctionnalités Principales

- Gestion des abonnements repas
- Interface utilisateur intuitive
- Système de commande de repas
- Gestion des profils utilisateurs

## Prérequis

- PHP 8.1 ou supérieur
- Composer
- Node.js & NPM
- MySQL

## Installation

1. Cloner le repository
```bash
git clone [url-du-repo]
cd abonnement-repas
```

2. Installer les dépendances PHP
```bash
composer install
```

3. Installer les dépendances JavaScript
```bash
npm install
```

4. Configurer l'environnement
```bash
cp .env.example .env
php artisan key:generate
```

5. Configurer la base de données dans le fichier .env

6. Migrer la base de données
```bash
php artisan migrate
```

7. Compiler les assets
```bash
npm run dev
```

8. Lancer le serveur
```bash
php artisan serve
```

## Utilisation

Visitez `http://localhost:8000` dans votre navigateur pour accéder à l'application.

## Licence

Ce projet est sous licence MIT.
