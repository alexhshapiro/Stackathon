import { json, select } from "d3";
import dataset2 from "./dataset2.json";

// const svg = select("svg");
// svg.style("background-color", "red");

const width = window.innerWidth
const height = window.innerHeight

// const height = +svg.attr("height");
// const width = +svg.attr("width");

// console.log(height, width);

// const circle = svg
//   .append("circle")
//   .attr("r", 50)
//   .attr("cx", width / 2)
//   .attr("cy", height / 2)
//   .attr("fill", "yellow");

var diameter = 600;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var bubble = d3.pack(dataset2).size([diameter, diameter]).padding(1.5);

var svg = d3
  .select("body")
  .append("svg")
  .attr("transform", `translate(${width/2 - diameter/2} ${height/2 - diameter/2})`)
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");

var nodes = d3.hierarchy(dataset2).sum(function (d) {
  return d.Count;
});

var node = svg
  .selectAll(".node")
  .data(bubble(nodes).descendants())
  .enter()
  .filter(function (d) {
    return !d.children;
  })
  .append("g")
  .attr("class", "node")
  .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

// Creates circles
node
  .append("circle")
  .attr("r", function (d) {
    return d.r;
  })
  .style("fill", function (d) {
    return color(d.data.Group);
  });

// Adds name to nodes
node
  .append("text")
  .attr("dy", ".2em")
  .style("text-anchor", "middle")
  .text(function (d) {
    return d.data.Name.substring(0, d.r / 3);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", function (d) {
    return d.r / 5;
  })
  .attr("fill", "white");

// Adds number to nodes
node
  .append("text")
  .attr("dy", "1.3em")
  .style("text-anchor", "middle")
  .text(function (d) {
    return d.data.Count;
  })
  .attr("font-family", "Gill Sans", "Gill Sans MT")
  .attr("font-size", function (d) {
    return d.r / 5;
  })
  .attr("fill", "white");

d3.select(self.frameElement).style("height", diameter + "px");
