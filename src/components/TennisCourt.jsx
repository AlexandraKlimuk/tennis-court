import * as d3 from "d3";
import * as hexb from "d3-hexbin";
import {useRef} from 'react';
import '../App.css';

export const TennisCourt = (props) => {
    const ref = useRef();
    const data = props.data;
    const params = props.params;
    const height = 500;//props.height;
    const ratio = 260 / 142;
    const width = height / ratio;
    const centerX = width / 2;
    //const centerY = height / 2;
    const scale = width / 300;
    const lineWidth = 1 * scale;
    const pointRadius = 1.8 * scale; //2
    const padding = 5 * scale;
    const paddingX = 53 * scale; //35.5
    const paddingY = 99 * scale; //66
    const paddingTopY = 0.8*paddingY;
    const paddingBtmY = 1.2*paddingY;
    const centerY = height / 2.17; //2.17
    const alleyWidth = 22.8 * scale; //28.5 //27
    const sideZoneWidth = 56.5 * scale; //65.5 //53
    const centerZoneWidth = 35.5 * scale; //41 //34
    const centerCourtHeight = 85 * scale; //102 /87
    const sideLineLeftX = paddingX + alleyWidth;
    const sideLineRightX = width - sideLineLeftX;
    const serviceCourtZoneWidth = (width / 2 - sideLineLeftX) / 3;
    const courtRect = 
        [[sideLineLeftX, 0.8*paddingY], //x1y1
        [sideLineRightX, 0.8*paddingY], //x2y2
        [sideLineRightX, height - 1.2*paddingY], //x3y3
        [sideLineLeftX, height - 1.2*paddingY]]; //x4y4
    const courtRectZone3 = 
        [[sideLineLeftX, paddingTopY], 
        [sideLineLeftX + sideZoneWidth, paddingTopY], 
        [sideLineLeftX + sideZoneWidth, centerY], 
        [sideLineLeftX, centerY]];
    const courtRectZone2 = 
        [[sideLineLeftX + sideZoneWidth, paddingTopY], 
        [sideLineLeftX + sideZoneWidth + centerZoneWidth, paddingTopY], 
        [sideLineLeftX + sideZoneWidth + centerZoneWidth, centerY], 
        [sideLineLeftX + sideZoneWidth, centerY]];
    const courtRectZone1 = 
        [[sideLineLeftX + sideZoneWidth + centerZoneWidth, paddingTopY], 
        [sideLineRightX, paddingTopY], 
        [sideLineRightX, centerY], 
        [sideLineLeftX + sideZoneWidth + centerZoneWidth, centerY]];
    const seviceCourtZones = {
            //adZone1 rect
        ad: [[[sideLineLeftX, paddingTopY + centerCourtHeight],  //x1y1
            [sideLineLeftX + serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x2y2
            [sideLineLeftX + serviceCourtZoneWidth, centerY], //x3y3
            [sideLineLeftX, centerY]], //x4y4
            //adZone2 rect
            [[sideLineLeftX + serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x1y1
            [sideLineLeftX + 2 * serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x2y2
            [sideLineLeftX + 2 * serviceCourtZoneWidth, centerY], //x3y3
            [sideLineLeftX + serviceCourtZoneWidth, centerY]], //x4y4
            //adZone3 rect
            [[sideLineLeftX + 2 * serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x1y1
            [sideLineLeftX + 3 * serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x2y2
            [sideLineLeftX + 3 * serviceCourtZoneWidth, centerY], //x3y3
            [sideLineLeftX + 2 * serviceCourtZoneWidth, centerY]]], //x4y4
            //deuceZone1 rect
        deuce: [[[sideLineRightX, paddingTopY], //x1y1
            [sideLineRightX - serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x2y2
            [sideLineRightX - serviceCourtZoneWidth, centerY], //x3y3
            [sideLineRightX, centerY]], //x4y4
            //deuceZone2 rect
            [[sideLineRightX - serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x1y1
            [sideLineRightX - 2 * serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x2y2
            [sideLineRightX - 2 * serviceCourtZoneWidth, centerY], //x3y3
            [sideLineRightX - serviceCourtZoneWidth, centerY]], //x4y4
            //deuceZone3 rect
            [[sideLineRightX - 2 * serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x1y1
            [sideLineRightX - 3 * serviceCourtZoneWidth, paddingTopY + centerCourtHeight], //x2y2
            [sideLineRightX - 3 * serviceCourtZoneWidth, centerY], //x3y3
            [sideLineRightX - 2 * serviceCourtZoneWidth, centerY]]] //x4y4
    };
    const xScale = d3.scaleLinear().domain([963, -963]).range([width - padding, padding]);
    // //const yScale = d3.domain([1509, -1509]).range([height - 0.8*padding, 1.2*padding]), //1970
    // //yScale = Hr().domain([1940, -1655]).range([height - padding, padding]), //1970
    const yScale = d3.scaleLinear().domain([1984, -1668]).range([height - padding, padding]);
    //const vis = d3.select(ref.current).append("svg:svg").attr("width", width).attr("height", height).attr("stroke-width", lineWidth);


    //const fieldLayer = vis.append("g").attr("id", "fieldLayer");
  

    //const courtLines = vis.append("g").attr("id", "courtLines").selectAll("line").data(data).enter();
    //const courtTop = vis.append("g").attr("id", "courtTop").selectAll("circle").data(data).enter();
    //const courtBottom = vis.append("g").attr("id", "courtBottom").selectAll("circle").data(data).enter();
    //const textLayer = vis.append("g").attr("id", "textLayer");

    // const isPointInRectangle = (x:any,y:any,rect) => {
    //     return(x>=(rect[0][0] - 2 - 0.75) && x<=rect[1][0] && y>=rect[0][1] && y<=rect[2][1]);
    // }

    // const isBallInGame = () => {
    //     isPointInRectangle
    // }

const courtColor = props.courtColors.find(item=>item.name==="Court").value;
const bgColor = props.courtColors.find(item=>item.name==="Background").value;
const lineColor = props.courtColors.find(item=>item.name==="Lines").value;
const netColor = props.courtColors.find(item=>item.name==="Net").value;

const hexRadius = props.hexParams.find(item=>item.name==="Radius").value;
const hexPoints = props.hexParams.find(item=>item.name==="Points Number").value;
const hexColor = props.hexParams.find(item=>item.name==="Color").value;
const hexStroke = props.hexParams.find(item=>item.name==="Stroke color").value;

const bandWidth = props.densityParams.find(item=>item.name==="Band Width").value;
const weight = props.densityParams.find(item=>item.name==="Weight").value;
const thresholds = props.densityParams.find(item=>item.name==="Thresholds").value;
const points = props.densityParams.find(item=>item.name==="Points Number").value;
const densityColor = props.densityParams.find(item=>item.name==="Color").value;


const y = d3.scaleLinear().domain([1984, -1668]).range([height - padding, padding]);
// const y = d3.scaleLinear().domain([1741, 500]).range([450, 300]);
console.log('padding', padding)
let x = d3.scaleLinear().domain([963, -963]).range([width - padding, padding]);

const dataNew = [];
props.data &&
props.data.map(d => {
    dataNew.push( {x: d.positionX, y: d.positionY} )
})
console.log('dataNew',dataNew)

  // Color palette
  let colorHex = //d3.scaleSequential(d3.interpolateViridis)
    d3.scaleLinear()//.scaleSequential(d3.interpolateYlOrBr)
      .domain([0, hexPoints]) // Number of points in the bin?
      //.interpolator(d3.interpolateInferno)
      .range(["transparent",  hexColor])

  let colorDensity = //d3.scaleSequential(d3.interpolateViridis)
    d3.scaleLinear()
    //d3.scaleSequential(d3.interpolateYlOrBr)
        .domain([0, points]) // Number of points in the bin?
        //.interpolator(d3.interpolateInferno)
        .range(["transparent",  densityColor]);

    //console.log('densityData', densityData)

    // compute the density data
    let densityData = d3.contourDensity()
    .x(d => x(d.x))
    .y(d => y(d.y))
    //.cellSize(4)
    .weight(weight)
    .thresholds(thresholds)
    .size([width, height])
    .bandwidth(bandWidth)
    (dataNew);

    console.log('densityData', densityData)

  // Compute the hexbin data

  let svg = d3.select("#my_dataviz")
  .append("svg")

  let inputForHexbin = []
  dataNew.map(function(d) {
    inputForHexbin.push( {x:(d.x), y:(d.y)} )  // Note that we had the transform value of X and Y !
  })

  const hexbin = hexb.hexbin()
  .x(d => x(d.x))
    .y(d => y(d.y))
    .radius(hexRadius) // size of the bin in px
    .extent([ [0, 0], [width, height] ])

  const bins = hexbin(inputForHexbin);

    return (
        props.data !== null &&
        <svg id="my_dataviz" width={width} height={height} style={{backgroundColor:bgColor}} >
            <g id="fieldLayer">
            <rect className="line"
                    x={paddingX}
                    y={paddingTopY}
                    width={width - 2 * paddingX}
                    height={height - 2 * paddingY}
                    strokeWidth={3 * lineWidth}
                    fill = {courtColor}
                    stroke = {lineColor}
                />  
                <rect className="line"
                    x={paddingX + alleyWidth}
                    y={paddingTopY}
                    width={width - 2 * paddingX - 2 * alleyWidth}
                    height={centerCourtHeight}
                    strokeWidth={lineWidth}
                    stroke={lineColor}
                    fill = {courtColor}
                />
                <rect className="line"
                    x={paddingX + alleyWidth}
                    y={height - 1.2*paddingY - centerCourtHeight}
                    width={width - 2 * paddingX - 2 * alleyWidth}
                    height={centerCourtHeight}
                    strokeWidth={lineWidth}
                    stroke={lineColor}
                    fill = {courtColor}
                />
                <rect className="line"
                    x={paddingX + alleyWidth}
                    y={paddingTopY + centerCourtHeight}
                    width={width - 2 * paddingX - 2 * alleyWidth}
                    height={height - 2 * paddingY - 2 * centerCourtHeight}
                    strokeWidth={lineWidth}
                    stroke={lineColor}
                    fill = {courtColor}
                />
                <line className="line"
                    x1= {width / 2}
                    y1={paddingTopY + centerCourtHeight}
                    x2={width / 2}
                    y2={height - 1.2*paddingY - centerCourtHeight}
                    strokeWidth={lineWidth}
                    stroke={lineColor}
                />
                <line className="line line--net"
                    x1= {paddingX - 8 * scale}
                    y1={centerY}
                    x2={width - paddingX + 8 * scale}
                    y2={centerY}
                    strokeWidth={1.5 * lineWidth}
                    stroke={netColor}
                />
                <line className="line"
                    x1= {width / 2}
                    y1={paddingTopY}
                    x2={width / 2}
                    y2={paddingTopY + 4 * scale}
                    strokeWidth={lineWidth}
                    stroke={lineColor}
                />
                <line className="line"
                    x1= {width / 2}
                    y1={height - 1.2*paddingY}
                    x2={width / 2}
                    y2={height - 1.2*paddingY - 4 * scale}
                    strokeWidth={lineWidth}
                    stroke={lineColor}
                /> 
                <rect className="line"
                    x={paddingX}
                    y={paddingTopY}
                    width={width - 2 * paddingX}
                    height={height - 2 * paddingY}
                    strokeWidth={3 * lineWidth}
                    fill = 'transparent'
                    stroke = {lineColor}
                />            
          </g>
          <g id="courtLines">
              {props.data !== null &&  props.params.find(item=>item.name=="Show Lines").value ? 
                props.data.map(item => {
                    return (
                        <line className="shotLine"
                            x1= {xScale(item.positionX)}
                            y1= {yScale(item.positionY)}
                            x2= {xScale(item.shotToX)}
                            y2= {yScale(item.shotToY)}
                            strokeWidth= {lineWidth*1.5}
                            stroke = {item.shot_result !=="Error" && item.shot_result !== "ffe" ? "#00FF00" : "#ff4f38"}
                        /> 
                    )
              }): null}    
          </g>
          <g id="courtCircles" fill="none" fillRule="evenodd" transform="translate(2 2)">
              {props.data !== null && props.params.find(item=>item.name=="Show Circles").value ? 
                props.data.map(item => {
                    return (
                  <circle className="shotLine"
                    r={1.5}
                    cx= {xScale(item.positionX)}
                    cy= {yScale(item.positionY)}
                    fill = {item.shot_result !=="Error" && item.shot_result !== "ffe" ? "#00FF00" : "#ff4f38"}
                  /> 
                  )
              }): null}         
          </g>
          <g id="densityPlot">
              {densityData && props.params.find(item=>item.name=="Show Density").value && (
                densityData.map((item, i) => {
                    return (
                    <path
                        key={ `path-${ i }` }
                        d ={d3.geoPath()(item)}
                        fill ={colorDensity(item.value) }
                        //stroke="#000"
                        //fillOpacity = "0.2"
                    />)
                }))
              }
          </g>
          <g id="hexbinPlot" >
              {bins && props.params.find(item=>item.name=="Show Hexagons").value && (
                bins.map((bin, i) => {
                    return (
                    <path 
                        key={ `pathHex-${ i }` }
                        d ={hexbin.hexagon()}
                        transform ={`translate(${bin.x},${bin.y})`}
                        fill ={colorHex(bin.length) }
                        stroke = {hexStroke}
                        strokeOpacity = "0.1"
                    />)
                }))
              }
          </g>
        </svg>) 
}
