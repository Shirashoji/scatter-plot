import * as React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Selections from "./components/Selections";
import Scatter from "./components/Scatter";

import { fetchIris } from "./api/fetchIris";
import { convertData } from "./api/convertData";

function App() {
  const options = ["sepalLength", "sepalWidth", "petalLength", "petalWidth"];

  const [hor, setHor] = React.useState(options[0]);
  const [vert, setVert] = React.useState(options[1]);

  const [iris, setIris] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchIris().then((iris) => {
      setIris(iris);
    });
  }, []);

  useEffect(() => {
    if (iris) {
      setData(convertData(iris, "species"));
    }
  }, [iris]);

  return (
    <div className="App">
      <Box>
        <Stack sx={{ flexGrow: 1 }} direction="row" spacing={2}>
          <Grid item xs="auto">
            <header className="App-header">
              <h1>Scatter Plot of Iris Flower Dataset</h1>
              <Selections
                options={options}
                value={hor}
                setValue={setHor}
                label="Horizontal Axis"
              />
              <Selections
                options={options}
                value={vert}
                setValue={setVert}
                label="Vertical Axis"
              />
            </header>
          </Grid>
          <Grid item xs="auto">
            <Scatter h={hor} v={vert} data={data} />
          </Grid>
        </Stack>
      </Box>
    </div>
  );
}

export default App;
