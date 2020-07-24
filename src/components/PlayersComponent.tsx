import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonIcon from "@material-ui/icons/Person";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import { PlayerInfo, PlayerType } from "../domain/GameInfo";
import { SpaceType } from "../domain/SpaceType";
import GameBoardComponent from "./GameBoardComponent";
import GameTegomaComponent from "./GameTegomaComponent";
import SelectedSpaceComponent from "./SelectedSpaceComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: "center",
    width: "auto",
    display: "inline-block",
  },
}));

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

type Props = {
  tabIndex: number;
  players: PlayerInfo[];
  nowPlayer: number;
  onSelectPlayerTab: (index: number) => void;
  onSelectKouho: (spaceType: SpaceType) => void;
  onDecide: (x: number, y: number) => void;
  onRotate: () => void;
  onFlip: () => void;
};

const PlayersComponent: React.FC<Props> = ({
  tabIndex,
  players,
  nowPlayer,
  onSelectPlayerTab,
  onSelectKouho,
  onDecide,
  onRotate,
  onFlip,
}) => {
  const classes = useStyles();

  const getIcon = (index: number) => {
    if (index === nowPlayer) {
      return <CircularProgress size="1.3em" color="inherit" />;
    }
    return <PersonIcon />;
  };

  return (
    <Paper square className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs
          value={tabIndex}
          onChange={(event, newValue) => {
            onSelectPlayerTab(newValue);
          }}
          variant="fullWidth"
          indicatorColor="primary"
          aria-label="icon label tabs example"
        >
          {players.map((player: PlayerInfo, index: number) => (
            <Tab
              icon={getIcon(index)}
              label={player.name}
              style={{ color: `#${player.color}` }}
            />
          ))}
        </Tabs>
      </AppBar>

      {players.map((player: PlayerInfo, index: number) => (
        <TabPanel value={tabIndex} index={index}>
          <GameTegomaComponent
            board={player.tegoma}
            onSelect={onSelectKouho}
            width={300}
          />
          {/* 選択したスペース  */}
          {player.selectInfo && (
            <div>
              <Paper className={classes.paper} elevation={3}>
                <SelectedSpaceComponent
                  select={player.selectInfo}
                  onRotate={onRotate}
                  onFlip={onFlip}
                />
              </Paper>
            </div>
          )}

          {/* 候補 */}
          <div>
            {player.selectInfo &&
              player.selectInfo?.kouhoList.map((kouhoItem, index2) => (
                <Paper
                  className={classes.paper}
                  key={`x=${kouhoItem.x},y=${kouhoItem.y}`}
                  elevation={3}
                >
                  <p>候補{index2 + 1}</p>
                  <GameBoardComponent board={kouhoItem.cells} width={180} />
                  {player.playerType === PlayerType.HUMAN &&
                    nowPlayer === index && (
                      <Box m={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            onDecide(kouhoItem.x, kouhoItem.y);
                          }}
                        >
                          この候補に決定
                        </Button>
                      </Box>
                    )}
                </Paper>
              ))}
          </div>
        </TabPanel>
      ))}
    </Paper>
  );
};

export default PlayersComponent;
