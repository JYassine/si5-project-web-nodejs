# si5-project-web-nodejs
project-web-nodejs

The project involves using data from a public database of disease data, see Santé public France. A couple of interesting databases on this page are:
Données hospitalières relatives à l'épidémie de COVID-19
Taux d'incidence de l'épidémie de COVID-19
Well, actually they're all interesting!
The data is given as .csv files. One of the first jobs will be to store this data into a Mongo database. This can be installed locally on your machine or, preferably, somewhere in a cloud.
Then you'll have to come up with something interesting to do with the data. Here's just a couple of quick ideas:
a graphical display with: abscissa is a timeline from the starting date to the present date and the ordinate is any one of hospitalizations, deaths, excess deaths, incidence level, etc.
the abscissa would also mark significant events, such as: beginning of lock-down, closing of schools, end of lock-down, beginning and end of curfew, holidays, etc. In fact, anything that might have an impact on the transmission of the disease.
there's also a behavioral survey database which could be used to graph mask-wearing against the progress of CV. Also other behavioral factors.
the data is per department, per region. This could be interesting to plot, eg, on a 3-D graph of France where the height of a dept corresponds to some CV measure. Or a colour, this would be easier.
a time-graph where the length of bar associated to a dept evolves over time, where the highest-something level dept keeps moving to the top.
can you determine the R-value from the data?
can you use past data to predict where we'll be in a week from now?
etc. Up to your imagination...
