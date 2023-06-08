import * as React from "react";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import useMediaQuery from "@mui/material/useMediaQuery";

function Scatter(props) {
  const v = props.v;
  const h = props.h;
  const data = props.data;

  const width = 400;
  const height = 400;
  const margin = 60;
  const scheme = d3.scaleOrdinal(d3.schemeCategory10);
  const categories = data.map((item) => item.id);
  categories.map((item) => scheme(item));
  const [visibleData, setVisible] = useState([]);

  const [infoCol, setColor] = useState(scheme);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    setColor(prefersDarkMode ? "rgba(255, 255, 255, 0.87)" : "#212121");
  }, [prefersDarkMode]);

  useEffect(() => {
    setVisible(data.map((item) => item.id));
  }, [data]);

  const allData = data.map((item) => item.data).flat();

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(allData, (item) => item[h]))
    .range([0, width])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(allData, (item) => item[v]))
    .range([height, 0])
    .nice();

  const hor = () => {
    return (
      <g transform={`translate(0, ${height})`}>
        <line x1="0" y1="0" x2={width} y2="0" stroke={infoCol} />
        {xScale.ticks().map((d, i) => {
          return (
            <g key={i} transform={`translate(${xScale(d)}, 0)`}>
              <line x1="0" y1="0" x2="0" y2="10" stroke={infoCol} />
              <text
                x={0}
                y={20}
                textAnchor="middle"
                dominantBaseline="central"
                fill={infoCol}
              >
                {d}
              </text>
            </g>
          );
        })}
        <text
          x={width / 2}
          y={40}
          textAnchor="middle"
          dominantBaseline="central"
          fill={infoCol}
        >
          {h}
        </text>
      </g>
    );
  };

  const vert = () => {
    return (
      <g>
        <line x1="0" y1="0" x2="0" y2={height} stroke={infoCol} />
        {yScale.ticks().map((d, i) => {
          return (
            <g transform={`translate(0, ${yScale(d)})`} key={d}>
              <line x1="0" y1="0" x2="-10" y2="0" stroke={infoCol} />
              <text
                x={-15}
                y={0}
                textAnchor="end"
                dominantBaseline="central"
                fill={infoCol}
              >
                {d}
              </text>
            </g>
          );
        })}
        <text
          transform={`translate(-50, ${height / 2})rotate(-90)`}
          textAnchor="middle"
          dominantBaseline="central"
          fill={infoCol}
        >
          {v}
        </text>
      </g>
    );
  };

  const plotPoint = (spd, color) => {
    return spd.data.map((d, i) => {
      return (
        <circle
          r={5}
          cx={xScale(d[h])}
          cy={yScale(d[v])}
          fill={color}
          key={`${spd.id}-${i}`}
          style={{
            animationTimingFunction: "ease-in-out",
            transitionDuration: "777ms",
          }}
        />
      );
    });
  };

  const plotData = (data) => {
    return data.map((d, i) => {
      if (visibleData.includes(d.id)) {
        return <g key={i}> {plotPoint(d, scheme(d.id))}</g>;
      } else {
        return <g key={i}></g>;
      }
    });
  };

  const createLegend = (data) => {
    return data.map((d, i) => {
      const clickLegend = () => {
        const newVisible = new Set(visibleData);
        if (newVisible.has(d)) {
          newVisible.delete(d);
        } else {
          newVisible.add(d);
        }
        setVisible([...newVisible]);
      };
      return (
        <g
          transform={`translate(0, ${i * 30})`}
          key={d}
          style={{ cursor: "pointer" }}
          onClick={clickLegend}
        >
          <rect width={10} height={10} fill={scheme(d)} />
          <text
            x={15}
            y={10}
            textAnchor="start"
            dominantBaseline="auto"
            fill={infoCol}
          >
            {d}
          </text>
        </g>
      );
    });
  };

  return (
    <>
      <svg width={700} height={550}>
        <g transform={`translate(${margin}, ${margin})`}>
          {hor()}
          {vert()}
          {plotData(data)}
          <g transform={`translate(${width + 20}, 0)`}>
            {createLegend(categories)}
          </g>
        </g>
      </svg>
    </>
  );
}

export default Scatter;
