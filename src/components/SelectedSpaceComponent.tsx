import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { SelectState } from '../entity/store';

const useStyles = makeStyles((theme) => ({
  celltable: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  buttonGroup: {
    display: "inline-block",
    verticalAlign: 'top',
  },
  rotateButton: {
    marginLeft: '5px',
    marginBottom: '5px',
  }
}));


type Props = {
  select: SelectState
  onRotate: () => void
  onFlip: () => void
};

const SelectedSpaceComponent: React.FC<Props> = ({ select, onRotate, onFlip }) => {
  const classes = useStyles();

  return (
    <React.Fragment>

      <p>選択したスペース</p>

      <Box m={1}>
        <table className={classes.celltable} >
          <tbody>
            {select.cells && select.cells.map((row, y) => {
              return (
                <tr key={"selct_cells_y:" + y}>
                  {row.map((cell, x) => {
                    return (
                      <td
                        style={{
                          backgroundColor: "#" + cell.color,
                          width: "15px",
                          height: "15px",
                          border: "1px solid black",
                        }}
                        key={"selct_cells_x" + x + "y" + y}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className={classes.buttonGroup}>

          <Box className={classes.rotateButton}>
            <Button variant="contained" color="primary" onClick={onRotate} >
              右に回転
            </Button>
          </Box>


          <Button variant="contained" color="primary" onClick={onFlip} >
            左右反転
          </Button>
        </div>

      </Box>

    </React.Fragment>
  );
};


export default SelectedSpaceComponent;
