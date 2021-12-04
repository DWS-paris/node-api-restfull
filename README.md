# Node API RESTfuul

*Interface de programmation pour applications Javascript*

![](https://i.imgur.com/wFj6sGt.png)

> &copy; [Julien Noyer](https://www.linkedin.com/in/julien-n-21219b28/) - All rights reserved for educational purposes only

<br>

## Présentation du projet

Une interface de programmation, plus communément appelée API, est une application constituée d’un ensemble de fonctions et de méthodes qui on pour but de gérer le transfert d’informations entre applications. Elle prend la forme d’un service web, c’est à dire qu’elle est disponible en ligne via le protocole HTTP. Dans la mesure ou le traitement de l’information est au centre du Web L’API est devenue central dans la plupart des projets Web, nous parlons donc aujourd’hui du principe de API-First Approach dans le développement de projet Web.

Ce principe qui consiste à commencer par structurer une API comme point de départ du développement d’un projet induit de respecter des normes afin de rendre nos API accessibles et structurées. C’est pourquoi ce document va prendre le parti de présenter une méthode de développement qui correspond aux critères des API REST qui représentent aujourd’hui la norme la plus utilisée.

<br>

## Définition du répertoire

L'objectif de ce répertoire est de mettre en place une structure de base pour une API RESTfull en NoeJS, le code présent dans ce répertoire doit permettre l'élaboration de système complexes de gestion de l'information. Pour atteindre cette objectif, le système développé dispose des fonctionnalités suivantes :

- Configuration du framework ExpressJS
- Connexion à une base de données MongoDB
- Chiffrement et dé-chiffrement des informations stockées
- Configuration d'un CRUD complet

<br>

### Aller plus loin avec ce répertoire

Le code contenu dans ce répertoire représente certaines notions, aussi importantes soit-elles, présentent dans une API RESTfull, mais n'est pas un système qui peut être mis en production tel que. Si vous souhaitez utiliser ce répertoire pour l'un de vos projet, il vous faudra encore :

- Définir la politique de gestion des profils utilisateurs
- Sécuriser l'accès aux informations contenus dans la base de données
- Mettre en place un "router" dynamique
- Mettre en place un serveur S3 de stockage (https://dwsapp.io/tuto/SJjk_SDVO)
- Déployer l'API RESTfull sur un VPS (https://dwsapp.io/tuto/HkLpPSPVd)

<br><br>

## Utilisation de ce répertoire

![](https://i.imgur.com/eAySYs0.png)

Avant toutes choses, comme pour tous les projets NodeJS, vous devez l'avoir installer sur votre machine. Pour cela, vous devez vous rendre sur le site officielle de NodeJS (https://nodejs.org/en/) pour installer la version qui correspond à votre système d'exploitation.

> Vous pouvez vérifier votre installation avec la commande `node -v`.

<br>

Une fois que votre machine est configurée avec [Vue CLI](https://cli.vuejs.org), vous devez installer les dépendances avec la commande `npm i` qui se charge de construire le dossier `node_modules` contenant les modules de l'application.

Cette application utilise la plateforme [hackmd.io](https://hackmd.io) pour stocker les fichiers markdown dont l'URL est inscrite dans un fichier de configuration. Le fichier `.env.dist` présente le modèle à utiliser pour créer votre fichier d'environnement, vous devez donc le dupliquer pour créer un fichier `.env` dont le contenu sera : 

```bash
VUE_APP_MK_ORIGIN=<URL-HACKMD>
```

> Vous pouvez utiliser un autre système mais vous devrez adapter votre variable d'environnement.

<br>

Votre dossier local ainsi configuré, vous pouvez lancer l'application avec la commande :

```bash
npm run serve
```

<br>

### Support de cours 

- **Développer une API REST en NodeJS** https://dwsapp.io/tuto/HkLpPSPVd
- **Configurer un serveur NGINX** https://dwsapp.io/tuto/BJswWiONu
- **Minio Multi-Cloud Object Storage** https://dwsapp.io/tuto/SJjk_SDVO
- **Site officiel NodeJS** https://nodejs.org/en/