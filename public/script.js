import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

// Márgenes y dimensiones
const marginTop = 70
const marginLeft = 100
const svgWidth = 900
const svgHeight = 600
const chartWidth = svgWidth - marginLeft - 50
const chartHeight = svgHeight - marginTop - 50

// Escalas
const xScale = d3.scaleLinear([2015, 2024], [0, chartWidth])
const yScale = d3.scaleLinear([0, 3000], [chartHeight, 0])
const populationScale = d3.scaleSqrt([15, 30], [10, 50]) // edad promedio


// Título
d3.select("svg")
  .append("text")
  .attr("x", svgWidth/2)
  .attr("y", 40)
  .attr("text-anchor", "middle")
  .attr("font-size", "22px")
  .attr("font-weight", "bold")
  .attr("fill", "#000000")
  .text("Lesiones y muertes en skate (2015-2024)")
  
//  Burbujaso
// s
const item = d3.select('.chart')
    .attr('transform', `translate(${marginLeft}, ${marginTop})`)
    .selectAll('circle')
    .data(data)
    .join('circle')
        .attr('r', (d) => {return populationScale(d.avg_age)})
        .attr('cx', (d) => {return xScale(d.year)})
        .attr('cy', (d) => {return yScale(d.cases)})
        .classed('dot', true)

const burbuja = d3.select('body').append('div')
    .attr('class', 'country-info')

item.on('mouseenter', function(e, d){
    burbuja.style('opacity', .8)
    burbuja.style('top', e.pageY + 'px')
    burbuja.style('left', e.pageX + 'px')
    burbuja.html(`<p>Año: ${d.year}<br>Casos: ${d.cases}<br>Edad promedio: ${d.avg_age}</p>`)
})
.on('mouseout', function(e, d){
    burbuja.style('opacity', 0)
})

// Ejes
const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))
d3.select('.x-axis')
    .attr('transform', `translate(${marginLeft}, ${chartHeight + marginTop})`)
    .call(xAxis)
    .append('text')
        .text('Año')
        .attr('text-anchor', 'middle')
        .attr('x', chartWidth/2)
        .attr('y', 35)
        .attr('font-size', '15px')
        .attr('fill', '#000000')

const yAxis = d3.axisLeft(yScale)
d3.select('.y-axis')
    .attr('transform', `translate(${marginLeft}, ${marginTop})`)
    .call(yAxis)
    .append('text')
        .text('Casos')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(-40, ${chartHeight/2}) rotate(270)`)
        .attr('font-size', '15px')
        .attr('fill', '#000000')

