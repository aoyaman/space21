import React from "react";
import PropTypes from "prop-types";

const GameKouhoComponent = ({ nexts, list, onSelectKouho, onDecide, onRotate, onFlip, onBack }) => (
  <div className="container">
    <div className="row">
      {/* 手持ちのブロック  */}
      <div style={{ display: "inline-block", verticalAlign: "top" }}>
        <table>
          {nexts.map((row) => {
            return (
              <tr>
                {row.map((cell) => {
                  return (
                    <td
                      style={{
                        backgroundColor: "#" + cell.color,
                        width: "20px",
                        height: "20px",
                        border: "1px solid black",
                      }}
                      onClick={() => {
                        onSelectKouho(cell.blockType);
                      }}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>

      {/* ボタンたち  */}
      <div style={{ display: "inline-block", verticalAlign: "top" }}>
        <button onClick={onRotate} className={"btn btn-primary"}>
          90度回転
        </button>
        <button onClick={onFlip} className={"btn btn-success"}>
          左右反転
        </button>
      </div>
    </div>

    <hr />

    {list.map((kouho) => (
      <div>
        <table
          onClick={() => {
            alert("候補を選択した");
          }}
        >
          {kouho.cells.map((row) => {
            return (
              <tr>
                {row.map((cell) => {
                  return (
                    <td
                      style={{
                        backgroundColor: "#" + cell.color,
                        width: "20px",
                        height: "20px",
                        border: "1px solid black",
                      }}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </table>
        <hr />
      </div>
    ))}

    <hr />

    <button className={"btn btn-primary"} onClick={onBack}>
      戻る
    </button>
  </div>
);

GameKouhoComponent.propTypes = {
  nexts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelectKouho: PropTypes.func.isRequired,
  onDecide: PropTypes.func.isRequired,
  onRotate: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default GameKouhoComponent;
