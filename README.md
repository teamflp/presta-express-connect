# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Gestion de la qualité avant chaque commit

Pour configurer Husky avec la nouvelle méthode (en supposant que vous utilisez Husky v7 ou ultérieur), suivez ces étapes dans votre terminal :

1. **Initialiser Husky** : Si ce n'est pas déjà fait, initialisez Husky dans votre projet. Husky utilise désormais un script d'installation pour configurer les hooks Git.

   `npx husky-init && npm install`
2. **Ajouter un Hook Pre-commit** : Au lieu d'utiliser `husky add`, vous devez maintenant créer manuellement le fichier de hook dans le dossier `.husky` et y ajouter votre commande.
   a. Créez un fichier nommé `pre-commit` dans le dossier `.husky` de votre projet.
   b. Ouvrez le fichier `.husky/pre-commit` dans un éditeur de texte et ajoutez le contenu suivant :

   ```
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"
   npx lint-staged
   ```
3. **Rendre le Script Exécutable** : Assurez-vous que le script de hook est exécutable en exécutant la commande suivante :

   `chmod +x .husky/pre-commit`

Ces étapes remplacent l'ancienne commande `npx husky add` par la création manuelle d'un fichier de hook et l'ajout de votre commande spécifique, dans ce cas, `npx lint-staged` pour s'exécuter avant chaque commit.

Ce code est un script de hook [`pre-commit`](vscode-file://vscode-app/c:/Users/totip/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "c:\Users\totip\Dropbox\dev_web\PrestaExpress.husky\pre-commit") utilisé par Husky, un outil qui permet d'attacher des scripts à différents moments du cycle de vie des commits Git dans un projet. Voici à quoi sert chaque partie de ce script :

1. `#!/bin/sh`: Cette ligne indique au système d'exploitation qu'il doit exécuter ce script avec `/bin/sh`, un interpréteur de commandes Unix. C'est ce qu'on appelle un shebang, et il spécifie l'interpréteur de script.
2. `. "$(dirname "$0")/_/husky.sh"`: Cette ligne charge le script `husky.sh` qui est nécessaire pour que Husky fonctionne correctement. `$(dirname "$0")` calcule le répertoire où se trouve le script actuel ([`pre-commit`](vscode-file://vscode-app/c:/Users/totip/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "c:\Users\totip\Dropbox\dev_web\PrestaExpress.husky\pre-commit")), et `_/husky.sh` est le chemin relatif au script `husky.sh` à partir de ce répertoire. Le point au début signifie que le script `husky.sh` est exécuté dans le contexte du shell actuel, permettant à `husky.sh` de définir des variables ou des fonctions qui affectent l'exécution du script [`pre-commit`](vscode-file://vscode-app/c:/Users/totip/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "c:\Users\totip\Dropbox\dev_web\PrestaExpress.husky\pre-commit").
3. `npx lint-staged`: Cette commande exécute `lint-staged`, un outil qui permet de lancer des linters sur des fichiers en staging (c'est-à-dire, prêts à être commités) dans Git. Cela permet de s'assurer que tous les fichiers qui vont être commités respectent les règles de style et les bonnes pratiques définies dans le projet avant que le commit soit effectué.

**L'objectif de ce script [`pre-commit`](vscode-file://vscode-app/c:/Users/totip/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "c:\Users\totip\Dropbox\dev_web\PrestaExpress.husky\pre-commit")** est donc de s'assurer que chaque commit respecte certaines règles ou passe certains tests avant d'être effectivement réalisé. Si `lint-staged` trouve des erreurs dans les fichiers, il arrêtera le commit en retournant un statut de sortie non nul. Cela permet d'éviter de commettre du code qui ne respecte pas les standards du projet.

<!-- README NAELLEHOME -->

<!-- SRC/STYLE -->

Supprission du App.css
Création src/Style.ccs

<!-- SRC/ASSETS -->

Création dossiers: "icons" , "images" , "styles" , "tableaux"

<!-- SRC/COMPOSANTS -->

J'ai travaillé sur les composants: Artisant, Arguments, Header, Lorem, SectionProf

<!-- A FAIRE -->

- Rajouter les configurations qui permettront de faire fonctionner les tests
- Modifier le responsive du bouton "Rechercher" (composant Header/partials/SearchButton.tsx)
- Mettre des spaces entre les différentes sections du site
- Retirer les barres de scroll et mettre les indicateurs de scroll
- Adapter la taille des noms de métiers pour éviter le bug qui se produit lorsqu'on pose le curseur sur les noms très qui sont longs
- Modifier ledernier composant sur le site, il doit ressembler à la maquette. L'image doit être un background.
  J'ai créé un tableau cityData.tsx qui doit me permettre de boucler le background.

# Test

Pour configurer les tests unitaires et les tests d'intégration dans un projet React utilisant TypeScript, vous pouvez utiliser Jest et React Testing Library. Voici les étapes pour configurer ces outils :

### 1. Installer les dépendances nécessaires

Ouvrez votre terminal et exécutez les commandes suivantes pour installer Jest, React Testing Library et leurs dépendances :

`npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest`

### 2. Configurer Jest

Créez un fichier `jest.config.js` à la racine de votre projet et ajoutez la configuration suivante :

```
module.exports = {
  // Utilise le preset 'ts-jest' pour transformer les fichiers TypeScript en JavaScript
  preset: 'ts-jest',

  roots: ["./src"],

  // Définit l'environnement de test à 'jest-environment-jsdom'
  // 'jsdom' simule un navigateur web dans Node.js, utile pour tester des composants React
  testEnvironment: 'jest-environment-jsdom',

  // Spécifie les transformations à appliquer aux fichiers avant de les tester
  transform: {
    // Utilise 'ts-jest' pour transformer les fichiers avec les extensions .ts et .tsx
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Indique à Jest quelles extensions de fichiers il doit reconnaître et traiter
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Spécifie un fichier à exécuter après que l'environnement de test a été configuré
  // mais avant que les tests ne soient exécutés
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  setupFilesAfterEnv: [
    "@testing-library/jest-dom"
  ]
};
```

**Installer `jest-environment-jsdom` et `@types/jest`**

`npm install --save-dev jest-environment-jsdom`

```
npm install --save-dev @types/jest
```

**Ajouts de fichiers pour Tests d'intégration**

- testing__/Routes.tsx et testing__/AppWithoutRoutes.tsx à utiliser pour les tests d'intégration au lieu de App.tsx
