[![test](https://github.com/justekoro/essence/actions/workflows/test.yml/badge.svg)](https://github.com/justekoro/essence/actions/workflows/test.yml)
# [ess.krbk.dev](https://ess.krbk.dev)
Un outil permettant de connaître le prix de l'essence le plus bas dans une ville.

---

## Installation
### Pré-requis
Pour pouvoir installer le projet, vous devez avoir téléchargé [nodejs](https://nodejs.org/en/) & [npm](https://www.npmjs.com/).

### Cloner le projet
Vous pouvez cloner le projet sur votre machine en le téléchargeant depuis le bouton télécharger, ou simplement avec [git](https://git-scm.com/).

```git
git clone git@github.com:justekoro/essence.git
```

### Installation des dépendances

#### Api
Dans le dossier 'api' taper `npm install` ou `pnpm install`.

#### Client

1.Rendez-vous dans le dossier créé lors du clonage du projet, et tapez la commande `npm install` ou `pnpm install` pour de meilleurs performance. Cela installera les modules nécessaires pour que le projet fonctionne.

2.Crée un fichier .env il devrais ressembler à ceci :

```env
REACT_APP_URL_API=(l'url de l'api qui vas récuperer les données(prix de l'essence,etc..))
REACR_APP_WEATHER_API_KEY=(clef de l'api qui vas récuperer le nom de la ville la plus proche de la position de l'utilisateur)
```

pour crée votre clef de l'api, allez sur [openweathermap](https://home.openweathermap.org/api_keys) crée vous un compte et crée une nouvelle clef.

### Lancement de l'api
Pour que le client fonctionne correctement, l'api doit être lancée. Pour cela, il suffit de changer de branche(api) et taper la commande `npm start` || `pnpm start` dans le dossier racine.

### Lancement du serveur
Dans le le dossier racine, vous pouvez lancer le serveur en tapant la commande `npm start` ou `pnpm start`.

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

## Credits
<a href="https://github.com/jokay03J">jokay03J: passage du site en react</a>
<a href="https://github.com/justekoro">justekoro: idée & concept original</a>
