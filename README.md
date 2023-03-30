# belly-button-challenge
This exercise use HTML, JavaScript, D3, and Plotly to create a website dashboard consisting of a few visualizations to summarize each individual's data. 

### Background 
In this assignment, you will build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Instructions 
1. Use the D3 library to read in `samples.json` from the URL `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

3. Create a bubble chart that displays each sample 

4. Display the sample metadata, i.e., an individual's demographic information

5. Display each key-value pair from the metadata JSON object somewhere on the page

6. Update all the plots when a new sample is selected. 

7. Deploy the app to a free static page hosting service, such as GitHub pages

### References 
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/