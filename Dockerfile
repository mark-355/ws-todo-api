# Utilise une image Node officielle
FROM node:20

# Crée le dossier de l'app dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie le reste du code de l'application
COPY . .

# Expose le port utilisé par l'app
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]