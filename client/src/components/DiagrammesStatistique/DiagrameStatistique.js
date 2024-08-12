import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, PolarArea, Bubble, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';
import './diagrameStatistique.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

// pour Le nombre des client par mois :
const DiagrameStatistique = () => {
  const barData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    datasets: [
      {
        label: 'Ventes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    datasets: [
      {
        label: 'Revenus',
        data: [3, 10, 5, 2, 20],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [20, 10, 4, 2],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const polarData = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: 'First Dataset',
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
          { x: 10, y: 20, r: 10 },
          { x: 30, y: 40, r: 25 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
          { x: 0.5, y: 5.5 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const areaData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    datasets: [
      {
        label: 'Revenus',
        data: [3, 10, 5, 2, 20],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div className='diagrameStatistique'>

<div className="chart-container animated"><h2 className="chart-title">Bar Chart</h2>
<div className="chart"><Bar data={barData} /></div></div>

      

<div className="chart-container animated">
<h2 className="chart-title">Line Chart</h2>
<div className="chart"><Line data={lineData} /></div>
</div>
      
      

      
      
<div className="chart-container animated"><h2 className="chart-title">Doughnut Chart</h2>
<div className="chart"><Doughnut data={doughnutData} /></div></div>
      
      
<div className="chart-container animated"><h2 className="chart-title">Radar Chart</h2>
<div className="chart"><Radar data={radarData} /></div></div>
      
      
<div className="chart-container animated"><h2 className="chart-title">Polar Area Chart</h2>
<div className="chart"><PolarArea data={polarData} /></div></div>
      
      
<div className="chart-container animated"><h2 className="chart-title">Bubble Chart</h2>
<div className="chart"><Bubble data={bubbleData} /></div></div>
      
      
<div className="chart-container animated"><h2 className="chart-title">Scatter Chart</h2>
<div className="chart"><Scatter data={scatterData} /></div></div>
      
      
<div className="chart-container animated"><h2 className="chart-title">Area Chart</h2>
<div className="chart"><Line data={areaData} options={{ elements: { line: { tension: 0.4 } } }} /></div></div>
      
      
    </div>
  );
};

export default DiagrameStatistique;
