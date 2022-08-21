[![test](https://github.com/justekoro/essence/actions/workflows/test.yml/badge.svg)](https://github.com/justekoro/essence/actions/workflows/test.yml)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjustekoro%2Fessence&env=NEXT_PUBLIC_WEATHER_API_URL&envDescription=weather%20api%20url%20is%20required%20for%20geolocation%20user%2Capi%20key%20is%20free&envLink=https%3A%2F%2Fhome.openweathermap.org%2Fapi_keys&project-name=essence-tracker&repo-name=essence&redirect-url=https%3A%2F%2Fessence.vercel.com&demo-title=essence%20tracker%20offial%20instance&demo-description=official%20instance%20for%20host%20essence%20tracker&demo-url=http%3A%2F%2Fess.krbk.dev&demo-image=https%3A%2F%2Fi.imgur.com%2FP4rEDAK.png&skippable-integrations=1)
# [ess.krbk.dev](https://ess.krbk.dev)
Un outil permettant de connaître le prix de l'essence le plus bas dans une ville.

---

## Instance
Plusieurs instance sont disponible pour garantir la disponibilité du service.

- [ess.krbk.dev](https://ess.krbk.dev) (instance officielle)
- [essence.page.dev](https://essence.page.dev) (instance officielle)

## Installation
### Pré-requis
Pour pouvoir installer le projet, vous devez avoir téléchargé [nodejs](https://nodejs.org/en/) & [pnpm](https://pnpm.io/fr/).

### Cloner le projet
Vous pouvez cloner le projet sur votre machine en le téléchargeant depuis le bouton télécharger, ou simplement avec [git](https://git-scm.com/).

```git
git clone git@github.com:justekoro/essence.git
```

### Installation des dépendances

1.Rendez-vous dans le dossier créé lors du clonage du projet, et tapez la commande `pnpm install` pour de meilleurs performance. Cela installera les modules nécessaires pour que le projet fonctionne.

### Api


L'api est bundler avec le client,l'api est rendu en "server-side" et le client en "client-side".\
Si vous ne voulez pas que l'api soit bundler avec le client,vous pouvez modifier la variable d'environnement `NEXT_PUBLIC_API_URL` dans le fichier `.env` et mettre l'url de l'api.
Vous pouvez trouver le code source de l'api directement dans la branche `api` du projet.	

Dans le dosssier crée lors du clonage,veuillez crée un fichier `.env` et y ajouter les variables d'environnement suivantes:

```env
NEXT_PUBLIC_WEATHER_API_KEY=YOUR_WEATHER_API_KEY
NEXT_PUBLIC_API_URL=API URL (OPTIONAL)
```

Pour crée une clé d'api pour la météo,veuillez vous rendre sur [openweathermap](https://openweathermap.org/).


## Lancement du projet
Pour déployer le projet,plusieurs méthode s'offre à vous:

- **vercel**:
Crée une compte sur [vercel](https://vercel.com/signup).\
Cliquer [ici](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjustekoro%2Fessence&env=NEXT_PUBLIC_WEATHER_API_URL&envDescription=weather%20api%20url%20is%20required%20for%20geolocation%20user%2Capi%20key%20is%20free&envLink=https%3A%2F%2Fhome.openweathermap.org%2Fapi_keys&project-name=essence-tracker&repo-name=essence&redirect-url=https%3A%2F%2Fessence.vercel.com&demo-title=essence%20tracker%20offial%20instance&demo-description=official%20instance%20for%20host%20essence%20tracker&demo-url=http%3A%2F%2Fess.krbk.dev&demo-image=https%3A%2F%2Fi.imgur.com%2FP4rEDAK.png&skippable-integrations=1).\
Le site en contenus statiques sera disponible sur l'url fourni par vercel.\
L'api sera displonible via les "serverless functions" de vercel.\

- **railway**:
crée un compte sur [railway](https://railway.app/).\
Le site et l'api seront deux service séparé.\
Pour déployer l'api cliquer sur [ici](https://railway.app/new/template/Ui4ohH?referralCode=xCrT0F).\
Quand l'api seras déployer, pour déployer le client cliquer [ici](https://railway.app/new/template/4QmZNa?referralCode=xCrT0F).\
Dans la variable d'environnement `NEXT_PUBLIC_API_URL` mettre l'url de l'api.\
Le site en contenus statiques sera disponible sur l'url fourni par railway.

- **autre**:
vous pouvez aussi deployer le projet sur votre propre serveur,ou sur un autre service de déploiement.\
Cela fonctionne à peut prêt pareil que pour deployer sur railway, vous devez aussi deployer le client et l'api séparément.
Pour déployer l'api,veuillez vous rendre dans la branche `api` et suivre les instructions du fichier `README.md`.\
Pour déployer le client,veuillez vous rendre dans la branche `main` et suivre les instructions du fichier `README.md`.\
**important**: vous devez modifier la variable d'environnement `NEXT_PUBLIC_API_URL` dans le fichier `.env` et mettre l'url de l'api que vous venez de déployer sans cela le client vas essayer de chercher l'api bundler avec le client(serverless functions).

## Données
Le projet ne recueille pas de données de la part de l'utilisateur.

## Dons
<details>
<summary>Le projet est public et son utilisation est gratuite. Néanmoins, si vous souhaitez financer le projet, plusieurs possibilités sont disponibles:</summary>
<ul>
<li>
<details>
<summary>Koro:</summary>
<ul>
<li><a href="https://buymeacoffee.com/justekoro">buymeacoffee</a></li>
<li>Solana: koroAXzMAq6mkgRyjdUhWZiFHJ9SjsjtqTdybGbtPRN</li>
<li>Ethereum: 0x3173F2bE428F53E03cFDC5A9FBaA02d89b0cBdc8</li>
</ul>
</details>
</li>

<li>
<details>
<summary>jokay03J</summary>
<ul>
<li><a href="https://www.buymeacoffee.com/jokay03J">buymeacoffee</a></li>
</ul>
</details>
</li>
</ul>
</details>

## Contribuer
Une fonctionnalité à ajouter, un bug à corriger, ou une suggestion pour améliorer le projet ? Vous pouvez [faire une issue](https://github.com/justekoro/essence/issues) ou [une pull request](https://github.com/justekoro/essence/pulls), en fonction de ce dont vous avez besoin.

## Licence
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

### Twemoji

Copyright 2020 Twitter, Inc and other contributors\
Code licensed under the MIT License: http://opensource.org/licenses/MIT\
Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/\

## Credits
<a href="https://github.com/jokay03J">jokay03J: passage du site en react</a>
<a href="https://github.com/justekoro">justekoro: idée & concept original</a>
