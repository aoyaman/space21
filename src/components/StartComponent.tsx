import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";

import { Select, MenuItem } from "@material-ui/core";
import titleImage from "../image/space21_image.jpg";
import * as info from "../domain/GameInfo";
import { StartState } from "../entity/store";

type Props = {
  start: StartState;
  onStart: () => void;
  onChangePlayerType: (index: number, type: info.PlayerType) => void;
};

const StartComponent: React.FC<Props> = ({
  start,
  onStart,
  onChangePlayerType,
}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={4} style={{ textAlign: "center" }}>
        <Typography variant="h2">Space21</Typography>

        <Box m={1}>
          <img src={titleImage} alt="タイトル" width="100%" />
        </Box>
        <Box m={1}>
          <FormControl style={{ textAlign: "left" }}>
            {start.players.map((p, index) => (
              <span key={p.name}>
                {p.name} : &nbsp;
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={p.playerType}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    onChangePlayerType(
                      index,
                      event.target.value as info.PlayerType
                    );
                  }}
                >
                  <MenuItem value={info.PlayerType.CPU}>CPU</MenuItem>
                  <MenuItem value={info.PlayerType.HUMAN}>HUMAN</MenuItem>
                </Select>
              </span>
            ))}
          </FormControl>
        </Box>

        <Box m={1}>
          <Button variant="contained" color="primary" onClick={onStart}>
            Start
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default StartComponent;
