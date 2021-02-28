### Server

Server runs at http://localhost:4000/

## Route for incident rates in France :

- /incidentRates

## Filters :

- age : represent the age class (0,09,19,29,39,49,59,69,89,90)
- month : (01,02....,12)
- gender : Male or female ("h" for male or "f" for female)
- region : (01, 02...). To know the number for each region see [this link](https://fr.wikipedia.org/wiki/R%C3%A9gion_fran%C3%A7aise#Liste_et_caract%C3%A9ristiques_des_r%C3%A9gions_actuelles)  
- year : (2020,2021)
  

## Examples :

Get positive tests for females in May

- /incidentRates?gender=f&month=05

Get positive tests for males with age class "19-29" and month June

- /incidentRates?gender=h&month=06&age=29
