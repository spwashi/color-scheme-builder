import D3Node, {d3} from "d3-node";
import path         from "path";
import {optimize}   from "svgo";
import {writeFile}  from "fs";

export function generateSvg({outDir, outName, colors}) {
  const d3n          = new D3Node();
  const colorEntries = Object.entries(colors);
  const colorCount   = colorEntries.length;

  const size    = 75;
  const columns = 4;
  const rows    = Math.ceil(colorCount / columns);
  const width   = size * columns;
  const height  = size * rows;

  const svg = d3n.createSVG(width, height).attr('viewBox', `0 0 ${width + size} ${height}`)


  function enterEachColor(container) {
    return container.selectAll(null).data(colorEntries).enter();
  }

  const svgSize  = (colorCount + 1) * size;
  const colorSvg =
          enterEachColor(svg)
            .append('svg')
            .attr('width', size)
            .attr('height', size)
            .attr('x', ([name, attributes], index) => (index % columns) * size)
            .attr('y', ([name, attributes], index) => Math.floor(index / columns) * size)
            .attr('viewBox', `-${size} -${size} ${svgSize} ${svgSize}`)
  ;
  colorSvg
    .append('g')
    .append('rect')
    .attr('width', svgSize).attr('height', svgSize)
    .style('fill', ([name, attributes]) => attributes.fill)
  ;

  const rectContainer      = colorSvg.append('g').classed('swatches', true);
  const horizontalSwatches = rectContainer.append('g').classed('horizontal', true);
  const verticalSwatches   = rectContainer.append('g').classed('vertical', true);

  const getColorOffset = ([name, attributes], index) => (index + 1) * size;

  function getShiftedSwatchFillColor(d, i) {
    const entry = d3.select(this.parentNode).datum();
    const index = colorEntries.indexOf(entry);
    return colorEntries[(colorCount + index + i) % colorCount][1].fill;
  }

  function getDefaultSwatchFillColor([name, attributes]) {
    return attributes.fill;
  }

  enterEachColor(verticalSwatches)
    .append('rect')
    .attr('y', getColorOffset)
    .attr('width', size)
    .attr('height', size)
    .attr('title', ([name]) => name)
    .style('fill', getShiftedSwatchFillColor)
  ;
  enterEachColor(horizontalSwatches)
    .append('rect')
    .attr('x', getColorOffset)
    .attr('width', size)
    .attr('height', size)
    .attr('title', ([name]) => name)
    .style('fill', getShiftedSwatchFillColor)
  ;


  const outputPath = path.join(outDir, outName);
  const newSvg     = optimize(d3n.svgString(), {
    multipass:              true,
    convertShapeToPath:     false,
    addClassesToSVGElement: true,
    reusePaths:             true
  }).data;
  writeFile(outputPath, newSvg, 'utf-8', (err) => {
    if (err) return console.error(err)
    console.log('done')
  });
}