# 🔴 Pokédex Portfolio 4G (Sinnoh) - Vue.js 3 & Tailwind CSS

Portfolio interactif pour développeur inspiré du **Pokédex de la 4ème Génération (Sinnoh / Nintendo DS)**, développé en **Vue.js 3 pur** (Composition API) et **Tailwind CSS**.

---

## ⚡ Caractéristiques du Pokédex 4G

1. **Écran de gauche : Liste avec défilement vertical**
   - Tous vos projets sont listés en lignes numérotées (`#001`, `#002`, `#003`, etc.).
   - Défilement vertical fluide avec scrollbar intégrée.
   - Sélection au clic, à la croix directionnelle (D-Pad) ou aux flèches du clavier.

2. **Élément central : La Molette / Capteur 4G**
   - Charnière centrale avec le grand cadran rotatif métallique et le cœur Pokéball tactile.
   - Boutons `▲` / `▼` sur la molette pour faire défiler les projets.
   - Bouton central tactile pour lancer l'analyse / ouvrir la fiche du projet sélectionné.
   - Indicateur de position en temps réel (ex: `01/06`).

3. **Écran de droite : Uniquement le descriptif du projet**
   - Aucune surcharge : 100% dédié au descriptif du projet sélectionné.
   - Apparaît au clic avec animation de balayage Pokédex.
   - Présentation claire : Résumé, réalisations clés, stack technique.
   - Boutons d'action pour le recruteur : **LANCER LA DÉMO**, **CODE GITHUB**, **TÉLÉCHARGER LE CV** et **CONTACTER**.

4. **Sons rétro 8-bit & Navigation clavier**
   - Bruitages 8-bit générés via Web Audio API (activable/désactivable avec le bouton MUTE).
   - Touches `Haut` / `Bas` : Défiler les projets.
   - Touche `Entrée` : Ouvrir la fiche / lancer la démo.
   - Touche `Échap` : Fermer le descriptif.

---

## 🚀 Lancer le projet

```bash
npm run dev
```

Rendez-vous sur **http://localhost:5173** dans votre navigateur.

---

## ✏️ Modifier vos projets et informations

Éditez simplement le fichier :  
👉 **`src/data/pokedexData.js`**
