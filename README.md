# Desafio Backend

## Endpoints

|  Método   |          Rota           |         Descrição          |
|:---------:|:-----------------------:|:--------------------------:|
| `POST`    | /planets/               | Adiciona um novo planeta   |
| `GET`     | /planets/?page=1        | Lista todos os planetas    |
| `GET`     | /planets/?name=1&page=1 | Busca um planeta pelo nome |
| `GET`     | /planets/?id=:id        | Busca um planeta pelo id   |
| `DELETE`  | /planets/?id=:id        | Remove um planeta pelo id  |

## Produção

http://18.117.220.193:3000/api/planets

## Banco de Dados

Neste projeto foi utilizado o MongoDB.