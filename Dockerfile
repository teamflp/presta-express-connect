# =============================================
# Étape 1: Build de l'application React
# =============================================
# Utilise l'image Node.js 22, la version Alpine est plus légère
FROM node:22-alpine AS builder

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie package.json et package-lock.json pour optimiser le cache Docker
# Si ces fichiers ne changent pas, Docker réutilisera le cache pour l'étape 'npm ci'
COPY package*.json ./

# Installe les dépendances de manière propre et reproductible
RUN npm ci

# Copie le reste du code source de l'application
COPY . .

# Construit l'application pour la production
RUN npm run build

# =============================================
# Étape 2: Service de l'application avec Nginx
# =============================================
# Utilise une image Nginx stable et légère avec une version spécifique pour la reproductibilité
FROM nginx:stable-alpine

# Copie les fichiers de build de l'étape précédente (générés dans /app/dist par Vite)
# vers le répertoire de service de Nginx (/usr/share/nginx/html)
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie le fichier de configuration Nginx personnalisé
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port 80 pour que le conteneur soit accessible
EXPOSE 80

# La commande par défaut de l'image Nginx est déjà de démarrer le serveur,
# donc pas besoin d'ajouter une commande CMD ici.