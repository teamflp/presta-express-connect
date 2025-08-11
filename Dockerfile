# ===================================================================================
# ÉTAPE 1: L'environnement de build (The Builder)
#
# Cette étape utilise une image Node.js pour installer les dépendances et
# construire l'application React.
# ===================================================================================
FROM node:22-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de gestion des dépendances pour optimiser le cache
COPY package.json package-lock.json ./

# Installer les dépendances en utilisant 'npm ci'
RUN npm ci

# Copier le reste du code source de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build


# ===================================================================================
# ÉTAPE 2: L'environnement de production (The Production Stage)
#
# Cette étape utilise une image Nginx pour servir les fichiers statiques
# et exposer les métriques de monitoring.
# ===================================================================================
FROM nginx:stable-alpine

# Métadonnées du projet
LABEL project="Presta-Express"
LABEL maintainer="Presta-Express"

# Supprimer la configuration Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre configuration Nginx principale
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# --- AJOUT POUR LE MONITORING ---
# Copier la configuration du vhost qui expose le endpoint /stub_status
# pour que Prometheus puisse collecter les métriques de Nginx.
COPY nginx/vhost.conf /etc/nginx/conf.d/vhost.conf

# Copier les fichiers statiques construits depuis l'étape 'builder'
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80 pour l'application web
EXPOSE 80
# Exposer le port 8081 pour le endpoint de métriques /stub_status
EXPOSE 8081

# La commande par défaut de l'image Nginx est de démarrer le serveur.
# CMD ["nginx", "-g", "daemon off;"]
