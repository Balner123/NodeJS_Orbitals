# Použijte oficiální Node.js image jako základ
FROM node:alpine3.21

# Nastavte pracovní adresář v kontejneru
WORKDIR /usr/src/app

# Zkopírujte package.json a package-lock.json do pracovního adresáře
COPY package*.json ./

# Nainstalujte závislosti
RUN npm install

# Zkopírujte zbytek zdrojového kódu do pracovního adresáře
COPY . .

# Exponujte port, na kterém aplikace běží
EXPOSE 3000

# Spusťte aplikaci
CMD ["node", "index.js"]