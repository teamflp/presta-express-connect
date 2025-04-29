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
    // Utilise 'jest-transform-css' pour transformer les fichiers CSS
    '^.+\\.css$': 'jest-transform-css'
  },

  // Indique à Jest quelles extensions de fichiers il doit reconnaître et traiter
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Mapper les extensions de fichiers d'images (jpg, jpeg, png, svg) vers un mock de fichier
  // Cela permet de gérer les imports de fichiers d'images dans les tests Jest
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    // Mapper les fichiers CSS vers 'identity-obj-proxy'
    '\\.(css|less)$': 'identity-obj-proxy'
  },

  // Spécifie un fichier à exécuter après que l'environnement de test a été configuré
  // mais avant que les tests ne soient exécutés
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts', '@testing-library/jest-dom'],
};
