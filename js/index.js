/* 
Resources used:
- [D3 Tips and Tricks v4.x](https://leanpub.com/d3-t-and-t-v4/read)
- [Introduction to D3](https://www.youtube.com/watch?v=8jvoTV54nXw)
- [Tutorials d3](https://github.com/d3/d3/wiki/Tutorials)
- Data Visualization with D3 by Michael Menz - CS50 Seminar 2016 [Slides](http://cdn.cs50.net/2016/fall/seminars/data_visualization_with_d3/data_visualization_with_d3.pdf) and [video](https://www.youtube.com/watch?v=219xXJRh4Lw)
- Free Code Camp - [Data Visualization with D3](https://beta.freecodecamp.org/en/challenges/data-visualization-with-d3/introduction-to-the-data-visualization-with-d3-challenges)
- [D3 fetch](https://github.com/d3/d3-fetch), for parsing csv, json, etc. 
- [D3 for mere mortals](http://www.recursion.org/d3-for-mere-mortals/)
- [Let's make a bar chart](https://bost.ocks.org/mike/bar/3/)
- [d3 axis labeling](https://stackoverflow.com/questions/11189284/d3-axis-labeling)
- [Title and axis labels](https://stackoverflow.com/questions/14605348/title-and-axis-labels)
*/

var parseTime = d3.timeParse("%Y-%m-%d");

	  const margin = {top: 20, right: 20, bottom: 100, left: 100};
      
      let w = 960 - margin.left - margin.right;
      let h = 500 - margin.top - margin.bottom;

      let padding = 40;

      const chart = d3.select("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	const barWidth = 2; 
	
      var x = d3.scaleTime().range([0, w - barWidth]);
      var y = d3.scaleLinear().range([h, 0]);

	d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json").then((data) => {
		const dataset = data.data;

		dataset.forEach((d) => {
			d[0] = parseTime(d[0]);
			})

      const xMax = d3.max(dataset, (d) => d[0]);
      const xdMax = new Date(xMax.getFullYear() + 1, xMax.getMonth(), xMax.getDay());
      x.domain([d3.min(dataset, (d) => d[0]),  + xdMax ]);
      y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    
    chart.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
			.attr("width", (d) => barWidth +"px")
			.attr("height", (d) => h - y(d[1]) + "px")
			.attr("y", (d) => y(d[1]))
			.attr("x", (d) => x(d[0]))
			.attr("class", "bar")
			.append("title")
				.text((d) => {
					const date = d[0];
					const year = date.getFullYear();
					const month = date.getMonth();
					return "PBI: $" + d[1] + " Billion\n" + year + " - " + getMonthName(month);
				});

    // chart title
  chart.append("text")
  .attr("class", "chartTitle")
  .attr("x", 380)
  .attr("y", 20)
  .style("text-anchor", "middle")
  .text("PBI EEUU Billions por trimestre");
    
    // x - axis label
    chart.append("text")
    .attr("x", 200)
    .attr("y", 450)
    .attr("class", "label")
    .text("Trimestres desde 1947 a 2015")
    
    // y - axis label
    chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-250")
    .attr("y", "-65")
    .attr("class", "label")
    .text("Billions")
    
    // x axis
  chart.append("g")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x).ticks(10));
// y axis
  chart.append("g")
       .call(d3.axisLeft(y).ticks(10));
       
}).catch((error) => console.error(error));

  function getMonthName(n) {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return meses[n];
}