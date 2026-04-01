# 🌱 Rawdha — PWA Jardin d'Enfant

Application web progressive (PWA) pour la communication entre directrice, enseignants et parents d'un jardin d'enfant.

---

## 🚀 Démarrage rapide

### Prérequis
- Un compte Firebase (déjà configuré : `rawdha-a946c`)
- Un serveur web local (ex: Live Server, http-server, ou NGINX)

### Installation locale

```bash
# Option 1 : npx serve (Node.js requis)
npx serve .

# Option 2 : Python
python -m http.server 8080

# Option 3 : VS Code Live Server
# Ouvrir index.html → clic droit → "Open with Live Server"
```

L'app sera accessible sur `http://localhost:8080`

---

## 📁 Structure du projet

```
rawdha-pwa/
├── index.html          # Application complète (SPA)
├── manifest.json       # Configuration PWA (installable)
├── sw.js               # Service Worker (offline + cache)
├── firestore.rules     # Règles de sécurité Firestore
├── README.md
└── icons/              # Icônes PWA (à générer)
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

---

## 🔥 Configuration Firebase

La configuration Firebase est déjà intégrée dans `index.html`.

### Services utilisés
| Service | Usage |
|---|---|
| **Firebase Auth** | Authentification email/mot de passe |
| **Firestore** | Base de données temps réel |

### Collections Firestore
| Collection | Description |
|---|---|
| `users` | Profils utilisateurs (rôle, nom, email) |
| `classes` | Classes de l'école |
| `children` | Enfants inscrits |
| `events` | Événements et activités |
| `announcements` | Annonces générales |
| `conversations` | Conversations directes |
| `conversations/{id}/messages` | Messages de chaque conversation |

### Déployer les règles Firestore

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Déployer les règles
firebase deploy --only firestore:rules
```

---

## 👥 Rôles utilisateurs

| Rôle | Couleur | Permissions |
|---|---|---|
| 👩‍💼 **Directrice** | Jaune (amber) | Tout créer, voir toutes les classes |
| 👩‍🏫 **Enseignant(e)** | Vert | Gérer sa classe, créer événements |
| 👨‍👩‍👧 **Parent** | Bleu | Consulter, envoyer messages |

---

## 📱 Installation comme app mobile

### Android (Chrome)
1. Ouvrir l'URL dans Chrome
2. Menu (⋮) → "Ajouter à l'écran d'accueil"

### iOS (Safari)
1. Ouvrir l'URL dans Safari
2. Bouton Partager → "Sur l'écran d'accueil"

---

## 🏗️ Déploiement production

### Firebase Hosting (recommandé — gratuit)

```bash
# Installer CLI
npm install -g firebase-tools

# Initialiser
firebase init hosting

# Déployer
firebase deploy --only hosting
```

### Netlify
```bash
# Drag & drop du dossier sur netlify.com/drop
```

### Vercel
```bash
npx vercel
```

---

## 🗺️ Roadmap

### MVP ✅
- [x] Authentification (login, inscription, reset)
- [x] 3 rôles : directrice, enseignant, parent
- [x] Dashboard personnalisé par rôle
- [x] Messagerie temps réel (Firestore)
- [x] Agenda & calendrier interactif
- [x] Gestion des classes
- [x] Profil utilisateur
- [x] Annonces générales
- [x] PWA installable (manifest + SW)
- [x] Design system complet (couleurs, animations)
- [x] Données démo auto-générées

### Phase 2 🔜
- [ ] Notifications push (FCM)
- [ ] Support offline avancé (IndexedDB)
- [ ] Upload photo de profil
- [ ] Gestion complète des enfants
- [ ] Micro-animations avancées

### Phase 3 📋
- [ ] Statistiques & rapports
- [ ] Export PDF
- [ ] Mode sombre

---

## 🛠️ Stack technique

- **Frontend** : HTML5, CSS3, JavaScript Vanilla (ES Modules)
- **Base de données** : Firebase Firestore (temps réel)
- **Auth** : Firebase Authentication
- **PWA** : Web App Manifest + Service Worker
- **Fonts** : Inter (Google Fonts)
- **Hébergement** : Firebase Hosting / Netlify / Vercel

---

## 📞 Support

Pour toute question technique, contacter l'équipe de développement.
