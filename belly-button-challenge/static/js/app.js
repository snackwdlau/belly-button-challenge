//Read URL link 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
d3.json(url).then((data) => {
    console.log(data);

    //Create variable for "#selDataset" from index.html 
    var dropdownMenu = d3.select("#selDataset")
    //Create variable for Object "names"
    var names = data.names; 
    console.log(names); 

    //Add "names" data to "dropdownMenu"
    names.forEach((sample) => {
        dropdownMenu
        .append("option")
        .text(sample)
        .property("value", sample)
        console.log(sample); 
    }); 

    //Create functions for charts and metadata 
    Charts(names[0]); 
    Metadata(names[0]); 
}); 

//Create function optionChanged
function optionChanged(selectedID) {
    Charts(selectedID); 
    Metadata(selectedID); 
}

//Create Charts 
function Charts(sample) {
    d3.json(url).then((data) => {
        //Filter data 
        var samplesID = data.samples.filter(data => data.id == sample)[0]; 
        console.log(samplesID); 
        
        //Create individual example: "sample_values", "otu_ids", "otu_labels" 
        var sampleValues = samplesID.sample_values; 
        var otuIds = samplesID.otu_ids; 
        var otuLabels = samplesID.otu_labels; 

        //BAR CHART: Top 10 OTUs per Subject ID
        var trace1 = [{
            x: sampleValues.slice(0,10).reverse(), 
            y: otuIds.map(id => `OTU ID ${id}`).slice(0,10).reverse(), 
            text: otuLabels.slice(0,10).reverse(), 
            type: "bar", 
            orientation: "h",
            marker: {color: "#8A2BE2"}
        }]; 
        //BAR LAYOUT
        var barLayout = {
            title: (`Top 10 OTUs for Subject ID: ${samplesID.id}`), 
            xaxis: {title: "SAMPLE VALUES", titlefont: {color: "#8A2BE2"}, weight: "bold", automargin: true},
            yaxis: {title: "OTU ID", titlefont: {color: "#8A2BE2"}, weight: "bold", automargin: true}, 
            titlefont: {size: 24, weight: "bold"},
        }; 
        //BAR PLOT
        Plotly.newPlot("bar", trace1, barLayout); 

        //BUBBLE CHART
        var trace2 = [{
          x: otuIds, 
          y: sampleValues, 
          text: otuLabels, 
          mode: "markers", 
          marker: {
            size: sampleValues, 
            color: otuIds, 
            colorscale: "Picnic"
          }
        }];
        //BUBBLE LAYOUT
        var bubbleLayout = { 
            title: "Bacteria", 
            showlegend: false, 
            xaxis: {title: "OTU ID", titlefont: {color: "#8A2BE2"}, weight: "bold", automargin: true}, 
            yaxis: {title: "SAMPLE VALUES", titlefont: {color: "#8A2BE2"}, weight: "bold", automargin: true},
            titlefont: {size: 24, weight: "bold"},
            hovermode: "closest"
          };
        //BUBBLE PLOT
        Plotly.newPlot("bubble", trace2, bubbleLayout);
    }); 
}; 

//Create Demogrpahic Info
function Metadata(sample) {
    d3.json(url).then((data) => {
    var metadata = data.metadata.filter(data => data.id == sample)[0];   
      var demographic = d3.select("#sample-metadata");
      demographic.html("");
      Object.entries(metadata).forEach(([key, value]) => {
        demographic
        .append("h5")
        .html(`<span style="color: #8A2BE2; font-weight:bold">${key.toUpperCase()}:</span> ${value}`)
      });

      //GAUGE CHART
      var washingFreq = metadata.wfreq; 
        console.log(washingFreq);
        //
        var trace3 = [{
            domain: {x: [0,1], y: [0,1]},
            value: washingFreq, 
            title: {text: "Belly Button Washing Frequency <br> Scrubs per Week"},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: {range: [null,9]},
                steps: [
                    {range: [0,1], color: "#ffccff"}, //1
                    {range: [1,2], color: "#f2c7ff"}, //2
                    {range: [2,3], color: "#e6c2ff"}, //3
                    {range: [3,4], color: "#d9bdff"}, //4
                    {range: [4,5], color: "#ccb8ff"}, //5
                    {range: [5,6], color: "#bfb2ff"}, //6
                    {range: [6,7], color: "#b2adff"}, //7
                    {range: [7,8], color: "#99a3ff"}, //8
                    {range: [8,9], color: "#8099ff"}, //9
                ],
                bar: {color: "#8A2BE2", thicknes: 0.5}
            },
            titlefont: {size: 24, weight: "bold"}
        }];
        //GAUGE LAYOUT
        var gaugeLayout = {
            width: 600, 
            height: 450, 
            margin: {t:0, b:0}
        };
        //GAUGE PLOT
        Plotly.newPlot("gauge", trace3, gaugeLayout, {responsive: true});
    });
}