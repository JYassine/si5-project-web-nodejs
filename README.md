# si5-project-web-back-front-nodejs

# Summary

- [si5-project-web-back-front-nodejs](#si5-project-web-back-front-nodejs)
- [Summary](#summary)
  - [Members of the team :](#members-of-the-team-)
  - [Langages and tools required](#langages-and-tools-required)
  - [How to run the project in local](#how-to-run-the-project-in-local)
    - [1 - Run the back-end server](#1---run-the-back-end-server)
    - [2 - Run our react app](#2---run-our-react-app)
  - [Deployed version](#deployed-version)
  - [How to test our REST API](#how-to-test-our-rest-api)
    - [Route for incident rates in France :](#route-for-incident-rates-in-france-)
    - [Query parameters :](#query-parameters-)
    - [Examples :](#examples-)

## Members of the team :

- JRAD Yassine
- FALL Thierno
- VASSEUR Adrien

## Langages and tools required

- [Node.js](https://nodejs.org/en/download/) v14.0+
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
```  

Then create a file called _googleApi.json_ in the /client/src directory with the following content:  
```
{
  "apiKey": "AIzaSyDuLSAFR63flKRNNc9bpN5MQi2JwVRXytU"
}
```  
This is the Google API key used for the Google Maps and Geocoding APIs.  
Then run:  
```sh
$ npm start
```  

## Deployed version

Visit https://covidinfo-305912.ew.r.appspot.com to access our project (deployed on GCP)  
Backend service is hosted at https://backend-dot-covidinfo-305912.ew.r.appspot.com (to test API)

## How to test our REST API

_Be sure to run the back-end server before !_
Server runs at http://localhost:4000/

### Route for incident rates in France :

- GET /incidentRates

### Query parameters :

- age : represent the age class (0,09,19,29,39,49,59,69,89,90)
- month : (01,02....,12)
- gender : Male or female ("h" for male or "f" for female)
- region : (01, 02...). To know the number for each region see [this link](https://fr.wikipedia.org/wiki/R%C3%A9gion_fran%C3%A7aise#Liste_et_caract%C3%A9ristiques_des_r%C3%A9gions_actuelles)  
- year : (2020,2021)
  

### Examples :

Get all positive tests for females at the month May in 2020

- GET /incidentRates?gender=f&month=05&year=2020

Get positive tests for males with age class 29 (between 20 and 29) and month January in 2021

- GET /incidentRates?gender=h&month=01&age=29&year=2021
