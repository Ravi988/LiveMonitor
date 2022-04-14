import React,{useEffect} from 'react'
import {Line } from 'react-chartjs-2'
import fullData from '../fullData.js'
function BarChart() {
  const yAxis = fullData.Heartbeat.Mohit.rest;
  let xAxis = [];
  let sum = 0;
  yAxis.forEach(()=>{
    xAxis.push(sum);
    sum += 2;
  }
  )
  return (
    <div>
        <Line
            data= {{
              labels: xAxis,
              datasets: [{
                  label: '# of Votes',
                  data: yAxis,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
              },
              ]
            }}
            height = {400}
            width={600}
            options={{
              maintainAspectRatio: false,
              scales:{
                yAxes:{
                  beginAtZero: true,
                }
              }
            }}
        /> 
    </div>
  )
}

export default BarChart