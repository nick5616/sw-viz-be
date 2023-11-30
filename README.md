<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

A backend utilizing httpClient to consume the [Star Wars API](https://swapi.dev/). Currently, there is only one externally callable API endpoint this backend exposes, `http://localhost/cost/`

### **Note**

This endpoint is expensive due to the numerous underlying API calls it makes. I've implemented a crude form of caching using a JS Map to store the cost of starships, removing the need to make the same API call twice. However, this only helps if the starship cost has already been queried. Caching helps with performance all around, but it helps the most beyond the first API call.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
