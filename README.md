# 🔴 Pokédex Portfolio - Vue.js 3 & Tailwind CSS

Un portfolio de développeur original, interactif et mémorable conçu sous la forme d'un **Pokédex**, développé en **Vue.js 3 pur** (Composition API, `<script setup>`) et **Tailwind CSS**.

---

## ⚡ Caractéristiques du Pokédex

- **Châssis double écran Kanto** :
  - **Volet Gauche (Fiche Dresseur)** : Avatar interactif, Niveau, Types (`FRONTEND`, `VUE.JS`), Jauges d'énergie, Bio, D-Pad cliquable et boutons A / B.
  - **Volet Droit (Données Pokédex)** : Navigation par onglets (Projets, Statistiques, Badges d'Arène, Combat Recruteur).
- **Effets Sonores Rétro 8-bit** : Générés à la volée via l'API Web Audio (aucun fichier MP3 externe lourd). Un bouton **MUTE / 8-BIT** permet d'activer ou couper le son en un clic.
- **Contrôles au Clavier** :
  - Flèches `Haut` / `Bas` : Défiler entre les projets.
  - Flèches `Gauche` / `Droite` : Naviguer entre les onglets.
- **Arène de Recrutement** : *"Un RECRUTEUR sauvage apparaît !"* avec les commandes de combat `EMBAUCHER`, `FICHE CV`, `LINKEDIN` et `GITHUB`.
- **100% Responsive** : Disposition double volet sur grand écran, et bascule ergonomique sur mobile/tablette.

---

## 🚀 Lancer le projet

```bash
# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

L'application tourne sur **http://localhost:5173**.

---

## ✏️ Personnaliser vos informations

Toutes vos données sont regroupées dans un seul fichier facile à modifier : **`src/data/pokedexData.js`** :

1. **Vos informations dresseur** : Nom, titre, localisation, statut de disponibilité, lien vers votre CV.
2. **Vos projets** : Titre, numéro d'entrée, description, technologies et liens vers la démo et GitHub.
3. **Vos statistiques & compétences** : Jauges de niveau (Vue.js, JavaScript, Tailwind...) et capacités spéciales.
4. **Vos badges d'arène** : Vos diplômes, formations et compétences clés.
5. **Vos coordonnées** : Email, profil LinkedIn et compte GitHub.
