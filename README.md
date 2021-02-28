# si5-project-web-back-front-nodejs

# Summary

- [Member of teams](#Member-of-teams)
- [Langages and tools required ](#Langages-and-tools-required)
- [How to run the project in local](#How-to-run-the-project-in-local)
- [How to test our REST API](#How-to-test-our-REST-API)

## Member of teams :

- JRAD Yassine
- FALL Thierno
- VASSEUR Adrien

## Langages and tools required

- [Node.js](https://nodejs.org/en/download/)
- [Npm](https://www.npmjs.com/get-npm)
- [Mongodb](https://www.mongodb.com/try/download/community)

## How to run the project in local

### 1 - Run the back-end server

**$PROJECT_PATH** correspond to your directory

```sh
$ git clone https://github.com/JYassine/si5-project-web-nodejs.git
$ cd $PROJECT_PATH/server
$ npm install
$ npm start
```

### 2 - Run our react app

```sh
$ cd $PROJECT_PATH/client
$ npm install
$ npm start
```

## How to test our REST API

_Be sure to run the back-end server before !_

### Route for incident rates in France :

- GET /incidentRates

### Query parameters :

- age : represent the age class (0,09,19,29,39,49,59,69,89,90)
- month : (01,02....,12)
- gender : Male or female ("h" for male or "f" for female)
- region : (01, 02...)
- year : (2020,2021)
  To know the number for each region see [this link](https://fr.wikipedia.org/wiki/R%C3%A9gion_fran%C3%A7aise#Liste_et_caract%C3%A9ristiques_des_r%C3%A9gions_actuelles)

### Examples :

Get all incident rates for female at the month May in 2020

- GET /incidentRates?gender=f&month=05&year=2020

Get incident rates for male with age class 29 (between 20 and 29) and month January in 2021

- GET /incidentRates?gender=h&month=01&age=29&year=2021
