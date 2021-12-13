import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import './App.css';
import { TennisCourt } from './components/TennisCourt';

function App() {
  const csvUrl = 'Felix_new.csv';

  const defaultCourtParams = [
    {
      name: 'Show Lines',
      value: false
    },
    {
      name: 'Show Circles',
      value: false
    },
    {
      name: 'Show Hexagons',
      value: false
    },
    {
      name: 'Show Density',
      value: false
    }
]

  const defaultHexParams = [
    {
      name: 'Radius',
      value: 5,
      type: ''
    },
    {
      name: 'Points Number',
      value: 60,
      type: ''
    },
    {
      name: 'Color',
      value: '#FFFF00',
      type: 'color'
    },
    {
      name: 'Stroke color',
      value: '#867979',
      type: 'color'
    }
]


  const defaultCourtColors = [
    {
      name: 'Background',
      value: '#5c5c5c',
      type: 'color'
    },
    {
      name: 'Lines',
      value: '#fff',
      type: 'color'
    },
    {
      name: 'Court',
      value: '#5c5c5c',
      type: 'color'
    },
    {
      name: 'Net',
      value: '#ff4f38',
      type: 'color'
    }
]

const defaultDensityParams = [
  {
    name: 'Band Width',
    value: 3,
    type: ''
  },
  {
    name: 'Weight',
    value: 4,
    type: ''
  },
  {
    name: 'Thresholds',
    value: 400,
    type: ''
  },
  {
    name: 'Points Number',
    value: 15,
    type: ''
  },
  {
    name: 'Color',
    value: '#FFFF00',
    type: 'color'
  }
]


  const [data, setData] = useState(null);
  const [courtParams, setCourtParams] = useState(defaultCourtParams);
  const [hexParams, setHexParams] = useState(defaultHexParams);
  const [courtColors, setCourtColors] = useState(defaultCourtColors);
  const [densityParams, setDensityParams] = useState(defaultDensityParams);


  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  const onChangeCourtParam = (input) => {
    let index = courtParams.findIndex(value => value.name === input.target.name);
    let newParams = [...courtParams];
    newParams[index].value = !newParams[index].value;
    setCourtParams(newParams);
  }

  const onChangeHexParam = (input) => {
    let index = hexParams.findIndex(value => value.name === input.target.name);
    let newParams = [...hexParams];
    newParams[index].value = input.target.value;
    setHexParams(newParams);
  }

  const onChangeColorParam = (input) => {
    let index = courtColors.findIndex(value => value.name === input.target.name);
    let newParams = [...courtColors];
    newParams[index].value = input.target.value;
    setCourtColors(newParams);
  }

  const onChangeDensityParam = (input) => {
    let index = densityParams.findIndex(value => value.name === input.target.name);
    let newParams = [...densityParams];
    newParams[index].value = input.target.value;
    setDensityParams(newParams);
  }

  return (
    <div className="App">
      <div className="court">
        <TennisCourt
          data = {data}
          params = {courtParams}
          hexParams = {hexParams}
          courtColors = {courtColors}
          densityParams ={densityParams}
        />
        </div>
        <div className="court-params-form">
          <form className='form'>
            <h2>Court Parameters</h2>
            {courtParams.map((param, i) => {
              return (
              <>
                <input type='checkbox' name={param.name} key = {`param${i}`}
                onClick={(e) => onChangeCourtParam(e)}/>
                <span>{param.name}</span>
                <br/>
              </>)
            })}
          </form>
          
          <form className='form'>
            <h2>Hexagon Parameters</h2>
            {hexParams.map((param, i) => {
              return (
            <div className='inputField'>
              <div>{param.name}</div>
              <input defaultValue={param.value} className="input" name={param.name} type={param.type}
                onChange={(e) => onChangeHexParam(e)} /> 
            </div>)
            })}
          </form>

          <form className='form'>
            <h2>Court Colors</h2>
            {courtColors.map((param, i) => {
              return (
            <div className='inputField'>
              <div>{param.name}</div>
              <input defaultValue={param.value} className="input" name={param.name} type={param.type}
                onChange={(e) => onChangeColorParam(e)} /> 
            </div>)
            })}
          </form>

          <form className='form'>
            <h2>Density Parameters</h2>
            {densityParams.map((param, i) => {
              return (
            <div className='inputField'>
              <div>{param.name}</div>
              <input defaultValue={param.value} className="input" name={param.name} type={param.type}
                onChange={(e) => onChangeDensityParam(e)} /> 
            </div>)
            })}
          </form>


        </div>
      
    </div>
  
  );
}

export default App;
