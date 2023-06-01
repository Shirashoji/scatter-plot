import * as React from 'react';
import { useEffect, useState } from 'react'
import './App.css'
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Selections from './components/Selections';
import Scatter from './components/Scatter';

import { fetchIris } from './api/fetchIris';
import { convertData } from './api/convertData';

function App() {
  const options = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'];
  const [hvalue, hsetValue] = React.useState(options[0]);
  const [vvalue, vsetValue] = React.useState(options[1]);

  // useEffect(() => {
  //   console.log(hvalue);
  //   console.log(vvalue);
  // });

  const [iris, setIris] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchIris().then((iris) => {
      setIris(iris);
      console.log(iris);
    });
  }, []);

  useEffect(() => {
    if (iris) {
      setData(convertData(iris));
      // console.log(data);
    }
  }, [iris]);




  return (
    <div className="App">
      <Box>
        <Stack sx={{ flexGrow: 1 }} direction="row" spacing={2}>
          <Grid item xs="auto">
            <header className="App-header">
              <h1>Scatter Plot of Iris Flower Dataset</h1>
              <Selections options={options} value={hvalue} setValue={hsetValue} label="Horizontal Axis" />
              <Selections options={options} value={vvalue} setValue={vsetValue} label="Vertical Axis" />
            </header>
          </Grid>
          <Grid item xs="auto">
            <Scatter h={hvalue} v={vvalue} data={iris}/>
          </Grid>
        </Stack>
      </Box>
    </div>
  )
}


export default App
