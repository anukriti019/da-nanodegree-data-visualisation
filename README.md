# Make Effective Data Visualization With D3.js
## Data Visualization Project
#### Data Analyst Nanodegree (Udacity)
Project submission by Edward Minnett (ed@methodic.io).

February 8th 2017. (Revision 2)

----------

## Project Overview

The purpose of this project is to produce an explanatory data visualisation that communicates a clear and compelling story. An initial visualisation is to be produced and then progressively improved as feedback is received from a selection of reviewers. A finals version of the visualisation is to be produced incorporating the reviewer feedback and clearly showing the progression from the initial to final versions. The project uses the DimpleJS visualisation library to produce an interactive graphic that can be rendered in a web browser.

## Setup

This project has the following dependencies:

- Python
- IPython Notebook
- D3.js
- Dimple.js

Use the Python `SimpleHTTPServer` to run a local web-server to bypass browser XSS errors when loading local files.
```
$ python -m SimpleHTTPServer 8888 &
```

Once this is complete, open the following links in your browser.
http://localhost:8888/index_1.html
http://localhost:8888/index_2.html
http://localhost:8888/index_3.html
http://localhost:8888/index_final.html

The IPython notebook can be accessed by running `ipython notebook` in the terminal from the project root and opening the notebook from the IPython Notebook browser.

## Data

This project explores the RITA flight data for 2001.
The original data was downloaded from here: http://stat-computing.org/dataexpo/2009/the-data.html
Detailed description of the data: http://www.transtats.bts.gov/Fields.asp?Table_ID=236

I used an IPython Notebook, `data_exploration_and_processing.ipynb`, to perform an initial
exploration of the data, process it and export the processed data to
`./data/2001_proportional_cancellations.csv`.

I chose to explore the reliability of each of the airlines who operated in 2001. In particular,
I wanted to see how the events of September 11th affected flight reliability. I chose to focus
on proportional cancellations for each of the carriers. I defined the `ProportionalCancellations`
column as the proportion of cancellations with respect to all of the flights operated by a given
carrier on a given day. I also added a `Date` column to provide a coherent high resolution axis
for the time-series chart. I tried using the `Month` column while exploring the data, but
found plotting only 12 points for each carrier to be inadequate.

`./data/2001_proportional_cancellations.csv` contains 4319 rows of data for each day of the year
for each of the 12 airlines. It is worth noting that not all 12 airlines have data for every
day of the year.

The processed data contains 3 columns:

- **CarrierName**: The name of the airline (retrieved from `./data/carriers.csv`).
- **Date**: The date as m/d/y.
- **ProportionalCancellations**: The proportion of cancelled flights to total flights for that carrier and day from 0.0 to 1.0

## Initial Design Decisions

My main consideration when creating the first iteration of the data visualisation was adequately communicating the story in the data. I knew that the visualisation wasn't going to be perfect and that making it perfect wasn't the point of that version of the visualisation. I spent quite a while exploring the data in the IPython Notebook and developing a processed version of the data that encapsulated the story I had found while slimming the data down from the 600 mb CSV to a much more manageable 4319 rows and 3 columns. Once I had created this smaller dataset, creating the initial visualisation was quite easy. I was keen to get it in front the first reviewer so I only made the following small adjustments to the default DimpleJS time-series chart.

- I added a title.
- I expanded the size of the CSV to effectively 'fill the page' allowing the user to see more detail in the chart.
- I positioned the legend so it didn't overlap  any of the axis or grid lines.
- I tidied up the labels on the x axis so the relationship between the fall out of the events of September the 11th 2001 could be easily parsed within the time-series.

## Feedback

I shared the initial visualisation with my partner and two colleagues. This is the feedback
I received (paraphrased and in my own words).

Feedback 1: Shown index_1.html
- The story is really compelling and the impact of the events of September 11th are really clear.
- Layering 12 plots with high degree of overlap makes each plot very hard to read.
- Try selecting some of the airlines instead of all of them to simplify the chart and make it easier to read.
- Try increasing the font size of the axis labels to make them more readable.

Feedback 2: Shown index_1.html and index_2.html
- Agreed with reviewer 1 that they liked the clarity of the story in the data.
- Also agreed with the first reviewer comments about the first version including too many plots. Only showing 6 carriers doesn't detract from the story and makes it clearer.
- Seeing fewer plots allowed the reviewer to ask 'What happened on March 5th to cause all the airlines to be less reliable?'
- Reviewer 2 was aware of the sad news of Hans Rosling's passing yesterday and wondered whether this project could be done as an animated bubble chart in his memory.
- We spoke about it at length and decided this was a great idea. We are both familiar with his bubble chart and thought that extra depth could be added to the visualisation by showing additional data comparing x and y animated over time instead of just x vs time. We also discussed the idea of using the size of the bubbles to represent the volume of flights for each airline. This would help differentiate the big national companies against the smaller regional airlines.

Feedback 3: Shown index_2.html and index_3.html
- While creating the animated bubble chart, I found myself struggling to communicate story clearly so I sought feedback while the chart was still a sketch.
_ I explained my predicament to the reviewer who agreed that the story was so clear when the data was displayed as a time-series plot but lacked the same 'punch' when displayed as an animated bubble chart.
- We concluded that the problem was that even though the data told a very clear story for September 11th and the following week, the remainder of the data in August, September, and October were quite noisy and 'boring' by comparison.
- They also pointed out that part of the value of the animated bubble chart is to show change in multiple dimensions. For the data I was presenting, the proportional delays and number of flights for each carrier don't tell a coherent story the way the proportional cancellations do.
- The reviewer suggested returning to the time-series plot and working to improve it rather than the animated bubble chart.
- For the time-series plot, they suggested making the following changes:
    + First and foremost, change 'ProportionalCancellations' to a percentage as that is what you are communicating and is much clearer.
    + Tidy up the axis labels so they are easier to delineate (especially around 'January 1').
    + Try replacing the x axis labels with just the month name instead of with '1', but keep the day value in the tooltip.
    + Select colours for the plots that resemble something meaningful for the companies they represent (brand colours perhaps).
    + Annotate the chart to describe what happened on March 5th, April 11th, and June 9th as well as September 11th.
    + Increase the font-size of the legend labels to make them clearer.
    + Get rid of the 'Date' label for the x axis as it is redundant when seen next to the months.

Feedback 4: From the Udacity reviewer (in their words)
- It's very slow to render - I've suggested pre-processing your data in Python to only include the six airlines AND I've also suggested using less data points to stop it looking so crowded. This should sort this out.
- You've come up with a fabulous story - shout out about it, let the reader know what your message is with a snappier title.
- There are a few design choices which could be optimised. Mainly the fact that the graphic still appears crowded and it is also very big - I had to zoom out to view it properly which made the tooltips and labels very small.

## Final Design Decisions

I iterated over the time-series data visualisation for each version except for version 3 where I attempted to create an animated bubble chart. The iterative feedback allowed me to progressively refine the visualisation. Between the initial version and the final version, I made the following improvements.

- I filtered the data from including all 12 airlines to only including the 6 largest. This made a big difference in improving the clarity of the overlapping plots.
- I tidied up both the x and y axis labels removing redundant and unnecessary information allowing for greater readability.
- I changed to y axis units from a proportion between 0 and 1 to a percentage between 0 and 100. This went a long way to improve the clarity of what the chart is trying communicate.
- I updated the series colours to use more easily read colours. I decided not to colour the series based on the airline branding (as the second reviewer suggested) as all 6 airlines use red, white, and / or blue as their colours. I decided that variations of these colours wouldn't be sufficient to allow for clear differentiation between the plots in the chart. Instead, I chose 6 colours for qualitative data as recommended on colorbrewer2.com. I worked through all 8 sets of 6 colours and settled on the set that I felt was most readable.
- I increased font sizes across the visualisation to improve readability.
- I updated the information in the tooltips to make them more concise and clear.
- I added an annotation to the chart indicating September 11th.

I tried to find explanations for the peaks on March 5th, April 11th, and June 9th but wasn't able to find anything definitive and justifiable. Rather than detracting from the story of the affects of September 11th, I decided not to add additional annotations for those dates.

After receiving feedback from the Udacity reviewer (listed above in the feedback section), I made the following changes:

- I updated the IPython notebook to filter the data used in the visualisation to only include the 6 largest airlines and limit the data to only the last half of 2001.
- I added a much better title (though I can't take credit for it as it was written for Time Magazine) and added a quote from the same article the title came from.
- I made the visualisation smaller so it would fit within the browser without scrolling for users with smaller screens.

## Resources

- http://dimplejs.org/
- https://github.com/PMSI-AlignAlytics/dimple/wiki
- http://colorbrewer2.org/
- http://stackoverflow.com/
- http://content.time.com/time/nation/article/0,8599,174912,00.html
