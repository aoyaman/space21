import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import * as info from "../domain/GameInfo";

const useStyles = makeStyles(() => ({
  celltable: {
    display: "inline-block",
    verticalAlign: "top",
  },
  buttonGroup: {
    display: "inline-block",
    verticalAlign: "top",
  },
  rotateButton: {
    marginLeft: "5px",
    marginBottom: "5px",
  },
}));

type Props = {
  select: info.SelectInfo | null;
  onRotate: () => void;
  onFlip: () => void;
};

const SelectedSpaceComponent: React.FC<Props> = ({
  select,
  onRotate,
  onFlip,
}) => {
  const classes = useStyles();

  const makeKeyY = (y: number): string => {
    return `selct_cells_y${y}`;
  };

  const makeKeyX = (x: number, y: number): string => {
    return `selct_cells_x${x}y${y}`;
  };

  // 念のためのチェック
  if (!select) {
    return (
      <>
        <span>あり得ないエラー</span>
      </>
    );
  }

  return (
    <>
      <p>選択したスペース</p>

      <Box m={1}>
        <table className={classes.celltable}>
          <tbody>
            {select.board &&
              select.board.map((row, y) => {
                return (
                  <tr key={makeKeyY(y)}>
                    {row.map((cell, x) => {
                      return (
                        <td
                          style={{
                            backgroundColor: `#${cell.color}`,
                            width: "15px",
                            height: "15px",
                            border: "1px solid black",
                          }}
                          key={makeKeyX(x, y)}
                        />
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className={classes.buttonGroup}>
          <Box className={classes.rotateButton}>
            <Button variant="contained" color="primary" onClick={onRotate}>
              右に回転
            </Button>
          </Box>

          <Button variant="contained" color="primary" onClick={onFlip}>
            左右反転
          </Button>
        </div>
      </Box>
    </>
  );
};

export default SelectedSpaceComponent;
