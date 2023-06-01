import * as React from 'react';
import { useEffect, useState } from 'react'
import * as d3 from 'd3'


function Scatter(props) {
    const v = props.v;
    const h = props.h;
    const data = props.data;

    const width = 400;
    const height = 400;

    // console.log(data);

    const allData = data.map((item) => item.data).flat();

    const x = d3.scaleLinear()
        .domain(d3.extent(allData, (item) => item[h]))
        .range([0, width]).nice();

    // console.log(x.ticks());

    const y = d3.scaleLinear()
        .domain(d3.extent(allData, (item) => item[v]))
        .range([0, height]).nice();

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
                                    <text x={0} y={20} textAnchor="middle" dominantBaseline="central">{d}</text>
                                </g>
                            </>
                        );
                    })}
                    <text x={width / 2} y={40} textAnchor="middle" dominantBaseline="central">{h}</text>
                </g>
            </>
        );
    }

    const vert = () => {
        const line = d3.path();
        line.moveTo(0, 0);
        line.lineTo(0, height);
        return (
            <>
                <g transform={`translate(0, 0)`}>
                    <path d={line.toString()} stroke="black" fill="none" />
                    {y.ticks().map((d, i) => {
                        // console.log(height - y(d));
                        const mline = d3.path();
                        mline.moveTo(0, 0);
                        mline.lineTo(-10, 0);
                        return (
                            <>
                                <g transform={`translate(0, ${height - y(d)})`}>
                                    <path d={mline.toString()} stroke="black" fill="none" />
                                    <text x={-15} y={0} textAnchor="end" dominantBaseline="central">{d}</text>
                                </g>
                            </>
                        );
                    })}
                    <text transform={`translate(-50, ${height / 2})rotate(-90)`} textAnchor="middle" dominantBaseline="central">{v}</text>
                </g>
            </>
        );
    }

    const plotPoint = (data, color) => {
        data.map((d, i) => {
            console.log(d);
            return (
                <>
                    <g transform={`translate(${x(d[h])}, ${y(d[v])})`}>
                        <circle r={5} fill={color} />
                        <text x={10} y={5} textAnchor="start" dominantBaseline="central">{d.name}</text>
                    </g>
                </>
            );
        })
    }

    const plotData = (data) => {
        const scheme = d3.scaleOrdinal(d3.schemeSet1);
        data.map((d, i) => {
            return (
                <>
                    {plotPoint(d.data, "red")}
                </>
            );
        })
    }


    return (
        <>
            <h1></h1>
            <svg width={560} height={560}>
                <g transform={`translate(100, 100)`}>
                    {hor()}
                    {vert()}
                    <g transform={`translate(0, ${height})scale(1,-1)`}>
                        {plotData(data)}
                    </g>
                </g>
            </svg >
        </>
    )

}

export default Scatter;