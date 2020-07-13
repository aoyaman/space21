import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import titleImage from "../image/space21_image.jpg";

type Props = {
  onStart: () => void;
};

const StartComponent: React.FC<Props> = ({ onStart }) => (
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
        <Button variant="contained" color="primary" onClick={onStart}>
          Start
        </Button>
      </Box>
    </Grid>
  </Grid>
);

export default StartComponent;
