### Server

## Route for incident rates in France :

- /incidentRates

## Filters :

- age : represent the age class (00,09,19,29,39,49,59,69,89,90)
- month : (01,02....,12)
- gender : Male or female ("h" for male or "f" for female)

## Examples :

Get incident rates for female at May

- /incidentRates?gender=f&month=05

Get incident rates for male with age class "29" and month June

- /incidentRates?gender=h&month=06&age=29
