import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import fullData from '../fullData.js'
import PatientInfo from './PatientInfo.js';

function Patient(props) {
  const yAxisRest = fullData.heartbeat[props.id].rest;
  const yAxisExercise = fullData.heartbeat[props.id].exercise;
  let xAxisRest = [];
  let xAxisExercise = [];
  let sumRest = 0;
  let sumExercise = 0;
  let averageRestHb = 0;
  let averageExerciseHb = 0;
  const numOfRestHb = fullData.heartbeat[props.id].rest.length;
  const numOfExerciseHb = fullData.heartbeat[props.id].exercise.length;
  yAxisRest.forEach((item) => {
    xAxisRest.push(sumRest);
    sumRest += 2;
    averageRestHb += item / numOfRestHb;
  });
  yAxisExercise.forEach((item) => {
    xAxisExercise.push(sumExercise);
    sumExercise += 2;
    averageExerciseHb += (item / numOfExerciseHb);
  });
  averageRestHb = averageRestHb.toFixed(1);
  averageExerciseHb = averageExerciseHb.toFixed(1);


  const [name, setname] = useState(fullData.name[props.id])
  const [SpO2, setSpO2] = useState(fullData.SpO2[props.id])
  const [temperature, setTemperature] = useState(fullData.temperature[props.id])
  const [hbRest, setHbRest] = useState(averageRestHb);
  const [hbExercise, setHbExercise] = useState(averageExerciseHb)
  const [condition, setCondition] = useState("Normal")
  const [isInfo, setIsInfo] = useState(false)

  const handleSpO2 = (event) => {
    const SpO2Value = Number(event.target.value);
    setSpO2(SpO2Value);
  }
  const handleTemperature = (event) => {
    let temperatureValue = Number(event.target.value);
    setTemperature(temperatureValue);
  }
  const handleHbRest = (event) => {
    const hbValue = Number(event.target.value);
    if(hbValue == NaN){hbValue = 0}
    setHbRest(hbValue);
  }
  const handleHbExercise=(event) => {
    let hbValue = Number(event.target.value);
    if(hbValue == NaN){hbValue = 0}
    setHbExercise(hbValue);
  }
  const toggleInfo = ()=>{
    if(isInfo){setIsInfo(false)}
    else{setIsInfo(true)}
  }

  useEffect(() => {
    let effectColor = "rgb(134 239 172)"
    setCondition("Normal")
    if (hbRest < 60) {
      setCondition('heartbeat-below normal');
      effectColor = "rgb(29 78 216)"
    }
    else if (hbRest > 120) {
      setCondition('heartbeat-above normal')
      effectColor = "rgb(185 28 28)"
    }
    if (SpO2 < 88) {
      setCondition('low SpO2');
      effectColor = "rgb(29 78 216)"
    }
    if (temperature < 95) {
      setCondition('Low temperature');
      effectColor = "rgb(29 78 216)"
    }
    else if (temperature > 100.4) {
      setCondition('High temperature');
      effectColor = "rgb(185 28 28)"
    }
    if(isInfo){
    document.getElementById(`extraInfo${props.id}`).style.display = 'block';
    }
    else{
    document.getElementById(`extraInfo${props.id}`).style.display = 'none';
    }
    document.getElementById(`condition${props.id}`).style.backgroundColor = effectColor;
  }, [hbRest, hbExercise, SpO2, temperature, isInfo])


  return (
    <>
      <div className="grid grid-cols-5 grid-rows-1 bg-gray-700 m-0.5 p-0.5 rounded-md font-bold">
        <div className="flex">
          <button className="bg-blue-400 m-0.5 px-1 rounded-lg text " onClick={toggleInfo}>i</button>
          <input type="text" id="name" value={name} className="m-0.5  px-1 w-full" />
        </div>
        <input type="text" id={`SpO2${props.id}`} onChange={handleSpO2} value={SpO2} className="m-0.5  px-1" />
        <input type="text" id={`temperature${props.id}`} onChange={handleTemperature} value={temperature} className="m-0.5  px-1" />
        <div className="flex">
        <input type="text" id={`hb${props.id}`} onChange={handleHbRest} value={`${Number(hbRest)}`} className="m-0.5  px-1 w-1/2" />
        <input type="text" id={`hb${props.id}`} onChange={handleHbExercise} value={`${Number(hbExercise)}`} className="m-0.5  px-1 w-1/2" />
        </div>
        <div id={`condition${props.id}`} className=" m-0.5  px-1">{condition}</div>
      </div>
        <div className="flex flex-col" id={`extraInfo${props.id}`} >
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <tbody>
                  <PatientInfo heading='Name' info={`${fullData.name[props.id]}`}/> 
                  <PatientInfo heading='Contact' info={`${fullData.Contact[props.id]}`}/> 
                  <PatientInfo heading='Residence Address' info={`${fullData.ResidenceAddress[props.id]}`}/> 
                  <PatientInfo heading='e-mail' info={`${fullData.eMail[props.id]}`}/> 
                  <PatientInfo heading='Sex' info={`${fullData.Sex[props.id]}`}/> 
                  <PatientInfo heading='Guardian Contact' info={`${fullData.GuardianContact[props.id]}`}/> 
                  <PatientInfo heading='Health Insurance' info={`${fullData.HealthInsurance[props.id]}`}/> 
                  <PatientInfo heading='Age' info={`${fullData.Age[props.id]}`}/> 

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="chart bg-white">
        <Line
          data={{
            labels: xAxisRest,
            datasets: [{
              label: 'Resting Heartbeat',
              data: yAxisRest,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',

              ],
              borderWidth: 1,
            },
            {
              label: 'Exercise Heartbeat',
              data: yAxisExercise,
              backgroundColor: [

                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [

                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            }
            ]
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: 'true',
                  text: 'Beats per minute',
                  color: 'black',
                  font: { size: 20 }
                }
              },
              x: {
                beginAtZero: true,
                title: {
                  display: 'true',
                  text: 'Time (Seconds)',
                  color: 'black',
                  font: { size: 20 },
                }
              }
            }
          }}
        />
      </div>
      <br />
      <div class="py-4"><div class="w-full border-t border-gray-900"></div></div>
    </>
  )
}

export default Patient