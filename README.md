# Desafio Backend

## Endpoints

POST - /planets/ - Adiciona um novo planeta
GET - /planets/?page=1 - Lista todos os planetas (obs: o page é opcional)
GET - /planets/?name=1$page=1 - Busca um plenata pelo nome (obs: o page é opcional)
GET - /planets/?id=:id - Busca um plenata pelo id 
DELETE - /planets/?id=:id - Remove um planeta pelo id

## Produção

url: http://18.117.220.193:3000/api/planets

## Banco de Dados

Nesse projeto foi utilizado o MongoDB.