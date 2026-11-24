# TODO : Application mobile d'envoi de colis

## Idée du projet

Une application mobile où un utilisateur enregistre ses colis **directement dans l'application** (formulaire, sans Excel), les dépose auprès d'un agent, puis reçoit une **notification avec la référence du colis**.

## Les 4 grandes étapes (piliers) de l'application

| # | Pilier | Rôle dans le projet | Phase concernée |
|---|---|---|---|
| 1 | **Authentification** | Inscription, connexion, rôles (client, agent, admin) | Phase 1 |
| 2 | **Liste** | Liste des colis avec leur statut, filtres, recherche | Phase 2 et Phase 6 |
| 3 | **Upload** | Photo de preuve de livraison par l'agent (ou pièce d'identité à l'inscription) | Phase 7 |
| 4 | **Notification** | Référence envoyée après le dépôt, puis à chaque changement de statut | Phase 5 et Phase 6 |

> Les phases 3 et 4 (saisie du colis et dépôt) font le lien entre les piliers : elles créent les colis que la liste affiche et qui déclenchent les notifications.

---

## Phase 0 : Préparation

- [ ] Définir les statuts d'un colis : `Enregistré` → `Déposé` → `En transit` → `Arrivé` → `Livré`
- [ ] Définir le format de la référence (ex. `CLS-20261124-00042`)
- [ ] Choisir la technologie : mobile (Flutter ou React Native), serveur (Node.js ou Python), base de données (PostgreSQL)
- [ ] Choisir l'upload retenu : photo de preuve de livraison ou pièce d'identité
- [ ] Dessiner les écrans sur papier ou sur un outil de maquette
- [ ] Créer la base de données avec 3 tables : Utilisateurs, Colis, Notifications

---

## Phase 1 : AUTHENTIFICATION (pilier 1)

- [ ] Écran **Inscription** (nom, téléphone, mot de passe)
- [ ] Écran **Connexion**
- [ ] Vérification des champs (téléphone valide, mot de passe suffisant)
- [ ] Sécurisation du mot de passe (chiffrement) et gestion de la session (token)
- [ ] Gestion des **rôles** : client, agent de dépôt, admin
- [ ] Déconnexion
- [ ] (Optionnel) Mot de passe oublié

**Résultat attendu** : l'utilisateur se connecte et arrive sur son accueil selon son rôle.

---

## Phase 2 : LISTE DES COLIS (pilier 2)

- [ ] Écran **Accueil** avec la liste de mes colis
- [ ] Affichage du statut de chaque colis (couleur ou badge)
- [ ] Message clair quand la liste est vide
- [ ] Filtre par statut
- [ ] Recherche (par destinataire ou référence)
- [ ] Pagination ou chargement progressif
- [ ] Un utilisateur ne voit que **ses** colis

**Résultat attendu** : une vue claire de tous les colis envoyés.

---

## Phase 3 : Nouveau colis (saisie directe)

- [ ] Bouton **Nouveau colis**
- [ ] Formulaire avec les champs :
  - [ ] Nom du destinataire
  - [ ] Téléphone du destinataire
  - [ ] Ville de destination
  - [ ] Description du contenu
  - [ ] Poids (kg)
  - [ ] Valeur déclarée
- [ ] Contrôles : champs obligatoires, téléphone valide, poids supérieur à 0
- [ ] Messages d'erreur clairs sous chaque champ
- [ ] Enregistrement du colis au statut **Enregistré**
- [ ] Génération d'un identifiant provisoire et d'un **QR code**
- [ ] Bouton **Ajouter un autre colis** pour enchaîner
- [ ] Le colis apparaît immédiatement dans la liste (Phase 2)

**Résultat attendu** : un colis créé au statut Enregistré.

---

## Phase 4 : Dépôt par l'agent

- [ ] Interface **Agent** (accès réservé au rôle agent)
- [ ] Recherche d'un colis par QR code ou par identifiant
- [ ] Écran de vérification du colis (infos affichées à l'agent)
- [ ] Bouton **Confirmer le dépôt**
- [ ] Passage du statut à **Déposé**
- [ ] Enregistrement de la date et de l'agent qui a confirmé
- [ ] (Optionnel) Mode hors-ligne si la connexion est instable

**Résultat attendu** : le colis est officiellement pris en charge.

---

## Phase 5 : Référence et NOTIFICATION (pilier 4)

- [ ] Génération automatique de la **référence unique** au moment du dépôt
- [ ] Vérification que la référence n'est jamais réutilisée
- [ ] Configuration des notifications push (Firebase Cloud Messaging)
- [ ] Envoi de la notification à l'expéditeur : « Votre colis a bien été déposé. Référence : CLS-... »
- [ ] Enregistrement de chaque notification dans la table Notifications
- [ ] Écran **Centre de notifications** (liste, lu / non lu)
- [ ] (Optionnel) SMS en complément du push

**Résultat attendu** : l'expéditeur reçoit sa référence juste après le dépôt.

---

## Phase 6 : Suivi du colis (liste + notification)

- [ ] Écran **Détail du colis** (statut, référence, historique)
- [ ] Mise à jour du statut par l'agent ou l'admin : `En transit` → `Arrivé` → `Livré`
- [ ] Historique des changements de statut avec date et heure
- [ ] Notification à chaque changement de statut
- [ ] Mise à jour de la liste (Phase 2) en conséquence

**Résultat attendu** : l'expéditeur suit son colis jusqu'à la livraison.

---

## Phase 7 : UPLOAD (pilier 3)

> À adapter selon l'option choisie en Phase 0.

**Option recommandée : photo de preuve de livraison (agent)**
- [ ] Bouton **Ajouter une photo** à l'étape Livré
- [ ] Prise de photo ou choix depuis la galerie
- [ ] Vérification du type de fichier (JPG, PNG) et de la taille maximale
- [ ] Envoi vers le serveur et stockage
- [ ] Rattachement de la photo au colis
- [ ] Affichage de la photo dans le détail du colis
- [ ] Notification de livraison envoyée avec la preuve

**Option alternative : pièce d'identité à l'inscription**
- [ ] Champ d'upload dans l'écran Inscription
- [ ] Vérification du type et de la taille
- [ ] Stockage sécurisé du fichier

**Résultat attendu** : un fichier est envoyé, stocké et rattaché au bon élément.

---

## Phase 8 : Administration

- [ ] Tableau de bord admin (web simple)
- [ ] Liste de tous les colis, tous statuts confondus
- [ ] Gestion des utilisateurs et des agents
- [ ] Statistiques (colis par jour, par statut, par ville)
- [ ] Export des données

---

## Phase 9 : Tests et lancement

- [ ] Tester chaque phase avec de vrais cas (colis valide, champs vides, mauvais mot de passe)
- [ ] Tester les notifications sur de vrais téléphones
- [ ] Tester avec plusieurs utilisateurs en même temps
- [ ] Corriger les bugs
- [ ] Essai réel avec quelques expéditeurs et un agent
- [ ] Publication de l'application

---

## Ordre de développement conseillé (MVP)

1. Phase 1 : Authentification
2. Phase 2 : Liste des colis
3. Phase 3 : Nouveau colis
4. Phase 4 : Dépôt par l'agent
5. Phase 5 : Référence et notification
6. Phase 6 : Suivi du colis
7. Phase 7 : Upload
8. Phase 8 et 9 : Administration, tests, lancement

## Parcours complet de l'application

```
Connexion → Liste → Nouveau colis (formulaire) → Enregistré
   → Dépôt par l'agent → Référence générée → Notification
   → Suivi → Livraison + photo de preuve (upload)
```

## Tables de la base de données

- **Utilisateurs** : id, nom, téléphone, mot de passe, rôle
- **Colis** : id, référence, expéditeur, nom / téléphone / ville du destinataire, description, poids, valeur, statut, photo de livraison, dates
- **Notifications** : id, utilisateur, message, lu, date
