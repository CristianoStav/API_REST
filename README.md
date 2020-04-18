# REST API

## Visão Geral
Api com SingIn, SingUp e busca de usuario criada a partir do desafio proposto.

## Tecnologia e Bibliotecas
- Nodejs;
- Babel;
- MongoDB;
- Mongoose;
- Express.js;
- Mocha;
- Chai;
- JsonWebToken;

## Iniciando a Aplicação

Para iniciar a aplicação, execute os seguintes comandos

```bash
    $ npm install
```

```bash
    $ npm start
```

## Rotas 
Rotas da aplicação

SingUp - `POST` (http://localhost:3000/sing-up);
 ```json
    body: 
    {
        "nome": "string",
        "email": "string",
        "senha": "senha",
        "telefones":
         [
            {
             "numero": "123456789",
               "ddd": "11"
            }
        ]
    }
```
SingIn - `POST` (http://localhost:3000/sing-in);
 ```json
    body: 
    {
        "email": "string",
        "senha": "senha",
    }
```

User - `GET` (http://localhost:3000/user/{_id});
 ```json
    _id: "_id retornado no SingUp e SingIn",
    header: 
    {
        "authorization": "token retornado no SingUp e SingIn",
    }
```
## Testes
para executar os testes da aplicação, execute o seguinte comando:

```bash
    $ npm test
```

Será gerado uma pasta coverage, dentro dela o arquivo "index.html" mostrará o coverage dos testes da aplicação.