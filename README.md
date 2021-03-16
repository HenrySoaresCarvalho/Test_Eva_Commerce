# Eva Commerce API

## api desenvolvida, tem a função de cadastro e listagem de usuarios e de produtos.

### Blibliotecas usadas:

Express.js (FrameWork Responsavel pela comunicação da API)

JsonWebToken (Biblioteca para authenticação por token)

Sequelize (ORM usado para fazer as querys)

bcrypt (Biblioteca usada para fazer hash das senhas)

mysql (Extensão para a comunicação do sequelize com o Mysql)


### Instalação:

#### Requisitos:
Necessario Node.js

#### Instalando yarn:
npm install --global yarn

### Instalando dependencias:
yarn install

### Instalando Sequelize-cli:
yarn add sequelize-cli -D

### Configurando para o banco de dados:
Para sincronizar o banco de dados é necessario ir em "src/config/database.js" e alterar os campos username e password para as do seu banco

### Executando as migrations:
yarn sequelize db:migrate


# Uso da API:

### startando a API:
yarn dev

se tudo der certo deve aparecer essa mensagem no terminal -> "Server Started!"

## Rotas:

### /user/register -> POST
Rota para cadastro de usuario. Necessario informar nome,email e senha.
#### Ex:
{
   "name":"henry soares",
   "email":"henrysoarescaravlho@gmail.com",
   "password":"senhatest"
}

se tudo der certo deve aparcer:

{
    "message": "Created",
    "user": {
        "name": "henry soares",
        "email": "henrysoarescarvalho@gmail.com",
        "password": "senhatest"
    }
}

### /user/login -> POST
Rota usada para login e geração do token de acesso. Necessario informar email e senha.
#### Ex:
{
    "email":"henrysoarescarvalho@gmail.com",
    "password":"senhatest"
}

Caso todos os parametros passados estejam corretos deve aparecer:

{
    "message": "Logged in",
    "accessToken": <Token>
}

O token é necessario para a autenticação, ele será usado para toda aplicação com produto. Ele deve ser informado no Header.

### /user -> GET
Rota para pegar todos usuarios cadastrado.

### /user/:id -> GET
Rota para pegar um usuario especifico, deve ser passado o id do usuario.

### /product/register -> POST
Rota para cadastro de produto. Token de acesso requerido, o usuario deve informar nome,descrição,preço,image1,imagem2,imagem3
#### Ex:
{
    "name":"Produto Test",
    "description":"Apenas um produto teste",
    "price":50,
    "image1":"<link>",
    "image2":"<link>",
    "image3":"<link>"
}

Se tudo der certo deve aparecer:

{
    "message": "Created",
    "product": {
        "id": 10,
        "name": "Produto Test",
        "description": "Apenas um produto teste",
        "price": 50,
        "image1": "<link>",
        "image2": "<link>",
        "image3": "<link>",
        "creator_id": ID do usuario que criou,
        "updatedAt": DATA DA CRIAÇÃO,
        "createdAt": DATA DA CRIAÇÃO
    }
}

### /product -> GET
Rota para o retorno de todos os produtos. Requer o token de acesso informado no Login.

### /product/:id -> GET
Rota para o retorno de um produto especifico. Requer o token de acesso informado no Login.

### /product/:id -> DELETE
Rota para a exclusão de um produto, o id do produto deve ser informado. Requer tken de acesso informado no Login.
