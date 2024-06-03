import React, { useEffect, useState } from 'react';
import './LineChart.css';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", 'Prices']]);

    useEffect(() => {
        let dataCopy = [["Date", 'Prices']];
        if (historicalData && historicalData.prices) {
            historicalData.prices.forEach((item) => {
                dataCopy.push([new Date(item[0]).toLocaleDateString(), item[1]]);
            });
            setData(dataCopy);
            console.log("Formatted data for chart:", dataCopy); // Debugging: Log formatted data
        }
    }, [historicalData]);

    return (
        <Chart
            chartType='LineChart'
            data={data}
            height="400px"
            width="100%"
            options={{
                legend: { position: 'bottom' },
                hAxis: { title: 'Date' },
                vAxis: { title: 'Price' }
            }}
        />
    );
}

export default LineChart;
