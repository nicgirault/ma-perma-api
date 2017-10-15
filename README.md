# Ma Perma API

## Install

```
nvm install v8.7 && nvm use && npm install
cp git-hooks/* .git/hooks
cp src/config.js.tocomplete src/config.js # complete the variables
docker build --tag nicgirault/mapermadb devops/db-local
```

## Start

```
# start database
docker-compose --file devops/db-local/docker-compose.yml up

# start api
npm start
```

## Provisioning

```
cd devops
cp vars.yml.tocomplete vars.yml # complete the variables
ansible-galaxy install -r requirements.yml
ansible-playbook playbook.yml -i devops/inventories/production
```


