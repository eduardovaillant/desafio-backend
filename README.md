# Desafio Backend

## Produção

http://18.117.220.193:3000/api/planets

## Endpoints

|  Método   |          Rota           |         Descrição          |
|:---------:|:-----------------------:|:--------------------------:|
| `POST`    | /planets/               | Adiciona um novo planeta   |
| `GET`     | /planets/?page=1        | Lista todos os planetas    |
| `GET`     | /planets/?name=1&page=1 | Busca um planeta pelo nome |
| `GET`     | /planets/?id=:id        | Busca um planeta pelo id   |
| `DELETE`  | /planets/?id=:id        | Remove um planeta pelo id  |


## Adicionando um Planeta
```json
{
  "name"    : string,
  "climate" : string,
  "terrain" : string
}
```

## Responses

### Planeta já existe no Banco de Dados
```json
{
  "error": "PlanetAlreadyExistsError",
  "detail": "The planet already exists in the database!"
}
```

### O Nome do planeta é obrigatório
```json
{
  "error": "RequiredParamError",
  "detail": "The param name is required!"
}
```

### O Terreno do planeta é obrigatório
```json
{
  "error": "RequiredParamError",
  "detail": "The param terrain is required!"
}
```

### O Clima do planeta é obrigatório
```json
{
  "error": "RequiredParamError",
  "detail": "The param climate is required!"
}
```



## Banco de Dados

Neste projeto foi utilizado o MongoDB.