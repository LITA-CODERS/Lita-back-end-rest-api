<h1 align="center">🔺 LITA-API-REST 🔺</h1>

## 📕 Índice

- [📋 Sobre](#Sobre)
- [🕹 Tecnologias](#Tecnologias)
- [🧑🏽‍💻 Iniciando o projeto](#Iniciando)
- [👨🏽‍🔧 Contribuições](#Contribuições)
- [📝 Licença](#Licença)
- [🦸 Contatos](#Contatos)

<hr>

<!-- About -->

# Sobre

<p align="left"> 📡 API Rest da loja lita, desenvolvida com as melhores práticas do mercado, pensando em ser uma aplicação totalmente escálavel e desacacoplada, tornando fácil sua manutenção e adição de features novas. </p>

<!-- TECHNOLOGIES -->

# Tecnologias

- 🧩 **Tecnologias**
  - [Node JS](https://nodejs.org/en/)
    - [TypeScript](https://www.typescriptlang.org/)
  - [Express](https://expressjs.com/pt-br/)
  - [TypeORM](https://typeorm.io/#/)
    - [PostgresSQL](https://www.postgresql.org/)
- 🧲 **Dependências**
  - [Babel](https://babeljs.io/)
  - [Eslint](https://eslint.org/)
  - [Jest](https://jestjs.io/pt-BR/)
  - [Reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
  - [Tsyringe](https://www.npmjs.com/package/tsyringe)

<hr>

<!-- TECHNOLOGIES -->

# Iniciando

##### Pré-requisitos

- Node JS

  ```sh
  https://nodejs.org/en/
  ```

- Yarn ou Npm

  ```sh
  https://yarnpkg.com/
  ```

- PostgresSQL

  ```sh
  https://www.postgresql.org/
  ```

<hr>

### Instalação e uso

```bash
# Execute este comando para clonar o projeto
$ git clonegit@github.com:LITA-CODERS/Lita-back-end-rest-api.git
# ou use a opção de download.

# Entre na pasta com
$ cd Lita-back-end-rest-api

# Instale as dependências
$ yarn ou npm install

# Crie o banco de dados e as tabelas utilizando o comando
$ yarn typeorm migration:run ou npm typeorm migration:run

# Rode a aplicação usando o comando
$ yarn dev ou npm run dev

# Para rodar os testes execute este comando
$ yarn test ou npm test
```

## 👷🏿 Testes automatizados 👷🏿
Por fim de garantir o funcionamento correto de todas as funcionalidades da aplicação, foi realizado testes unitários e de integrações utilizando o Jest, todos os testes se encontram dentro da pasta tests presentes em seu respectivo useCase, resultados obtidos foram quase **100%** de cobertura nos testes faltando bem pouco para isto.

<img src="https://i.imgur.com/PjR63QO.png">

## 👨🏽‍🚀 Deploy 
**__Heroku__**: https://github.com/LITA-CODERS/Lita-back-end-rest-api/deployments/activity_log?environment=lita12


##  💁🏿‍♂️ Notas do desenvolvedor
- Foi pensando em um sistema de autenticação, que inclusive esta todo em funcionamento, só não foi implementado no front pelo tempo curto
- Todo o projeto foi desenhado para ser o mais limpo possível utilizando conceitos de __**SOLID**__ e __CLEAN CODE__, visando qualidade do código, também esta sendo utilizando o repository pattern.
- Plataforma escolhida para o deplou foi o **heroku**, pela praticidade que ela nós entrega.
<!-- LICENSE -->

# Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

<!-- CONTACT -->

# Contatos

 | [<img src="https://avatars.githubusercontent.com/u/62263143?v=4" width="115"><br><sub>@WelissonLuca</sub>](https://github.com/WelissonLuca) | [<img src="https://avatars.githubusercontent.com/u/81655437?v=4" width="115"><br><sub>@mimaganin</sub>](https://github.com/mimaganin)
| - |  - 