import * as React from "react";
import { useEffect, useState } from "react";
import * as d3 from "d3";

function Scatter(props) {
  const v = props.v;
  const h = props.h;
  const data = props.data;

  const width = 400;
  const height = 400;
  const scheme = d3.scaleOrdinal(d3.schemeCategory10);
  const [visibleData, setVisible] = useState([]);

  useEffect(() => {
    setVisible(data.map((item) => item.id));
    console.log(visibleData);
  }, [data]);

  const allData = data.map((item) => item.data).flat();

  const x = d3
    .scaleLinear()
    .domain(d3.extent(allData, (item) => item[h]))
    .range([0, width])
    .nice();

  const y = d3
    .scaleLinear()
    .domain(d3.extent(allData, (item) => item[v]))
    .range([height, 0])
    .nice();

  const hor = () => {
    const line = d3.path();
    line.moveTo(0, 0);
    line.lineTo(width, 0);
    line.moveTo(0, 0);
    return (
      <>
        <g transform={`translate(0, ${height})`}>
          <path d={line.toString()} stroke="black" fill="none" />
          {x.ticks().map((d, i) => {
            // console.log(x(d));
            const mline = d3.path();
            mline.moveTo(0, 0);
            mline.lineTo(0, 10);
            return (
              <>
                <g transform={`translate(${x(d)}, 0)`}>
                  <path d={mline.toString()} stroke="black" fill="none" />
                  <text
                    x={0}
                    y={20}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {d}
                  </text>
                </g>
              </>
            );
          })}
          <text
            x={width / 2}
            y={40}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {h}
          </text>
        </g>
      </>
    );
  };

  const vert = () => {
    const line = d3.path();
    line.moveTo(0, 0);
    line.lineTo(0, height);
    return (
      <>
        <g transform={`translate(0, 0)`}>
          <path d={line.toString()} stroke="black" fill="none" />
          {y.ticks().map((d, i) => {
            const mline = d3.path();
            mline.moveTo(0, 0);
            mline.lineTo(-10, 0);
            return (
              <>
                <g transform={`translate(0, ${y(d)})`}>
                  <path d={mline.toString()} stroke="black" fill="none" />
                  <text
                    x={-15}
                    y={0}
                    textAnchor="end"
                    dominantBaseline="central"
                  >
                    {d}
                  </text>
                </g>
              </>
            );
          })}
          <text
            transform={`translate(-50, ${height / 2})rotate(-90)`}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {v}
          </text>
        </g>
      </>
    );
  };

  const plotPoint = (data, color) => {
    return data.map((d, i) => {
      // console.log(d);
      return (
        <>
          <g transform={`translate(${x(d[h])}, ${y(d[v])})`}>
            <circle r={5} fill={color} />
            <text x={10} y={5} textAnchor="start" dominantBaseline="central">
              {d.name}
            </text>
          </g>
        </>
      );
    });
  };

  const plotData = (data) => {
    return data.map((d, i) => {
      return <>{plotPoint(d.data, scheme(i))}</>;
    });
  };

  const createLegend = (data) => {
    return data.map((d, i) => {
      return (
        <>
          <g transform={`translate(0, ${i * 30})`}>
            <rect width={10} height={10} fill={scheme(i)} />
            <text x={15} y={10} textAnchor="start" dominantBaseline="auto">
              {d}
            </text>
          </g>
        </>
      );
    });
  };

  return (
    <>
      <h1></h1>
      <svg width={800} height={800}>
        <g transform={`translate(100, 100)`}>
          {hor()}
          {vert()}
          {plotData(data)}
          <g transform={`translate(${width + 20}, 0)`}>
            {createLegend(visibleData)}
          </g>
        </g>
      </svg>
    </>
  );
}

export default Scatter;
