# 🚀 Guide DevOps - Presta La Express

## 📅 **Période de stage : 03 Juin 2025 → 10 Septembre 2025**
### **Total : 400 heures (10 semaines)**

---

## 🎯 **Objectif général :**
Mettre en place l'infrastructure DevOps complète et automatisée pour le projet Presta Express, incluant :

- Sauvegarde, restauration, monitoring, alertes, sécurité des données.
- CI/CD, monitoring Kubernetes, archivage automatique, rotation de logs.

---

## 🛠️ **Pré-requis :**

### Docker
```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
```

### Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### Kubernetes (kubectl)
```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

### Helm (gestionnaire de packages Kubernetes)
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version
```

### Prometheus et Grafana
```bash
kubectl create namespace monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring
```

---

## 📚 **Documentation et mise à jour GitLab/GitHub**

### Création d'un dépôt Git
```bash
git init
```

### Ajout des fichiers
```bash
git add .
```

### Premier commit
```bash
git commit -m "Initial commit"
```

### Ajout du dépôt distant
```bash
git remote add origin <url-du-depot>
```

### Pousser les modifications
```bash
git push -u origin main
```

---

### 📌 **Documentation Markdown**

- Création d'un fichier `COMMANDS.md` pour regrouper toutes les commandes :

```markdown
# Commandes Utiles - Presta La Express

## Docker
- `docker ps` : Lister les conteneurs actifs
- `docker logs <container_id>` : Afficher les logs

## Kubernetes
- `kubectl get pods` : Lister les pods
- `kubectl logs <pod_name>` : Voir les logs d'un pod

## MySQL
- `mysqldump` : Sauvegarder la base de données
- `mysql` : Restaurer la base de données

## Prometheus
- `kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring` : Accéder à Grafana
```

### Mise à jour GitLab/GitHub
```bash
git pull origin main
git add .
git commit -m "Mise à jour de la documentation"
git push origin main
```

### Automatisation avec GitHub Actions
Créer un fichier `.github/workflows/deploy.yml`

```yaml
name: Deploy to Kubernetes

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Kubernetes
        run: |
          sudo apt-get update
          sudo apt-get install -y kubectl

      - name: Apply Kubernetes manifests
        run: |
          kubectl apply -f k8s/
          kubectl rollout restart deployment/symfony_backend
          kubectl rollout restart deployment/react_frontend
```

- À chaque `push` sur `main`, le workflow déploie automatiquement les modifications sur Kubernetes.

### Vérification du déploiement
```bash
kubectl get pods -n presta-express
kubectl get services -n presta-express
```
