import React from 'react'
import PropTypes from 'prop-types'


const GameShowComponent = ({ game, onBack, onSelectKouho }) => (
  <div className={"container"}>
    <h2>game id:{game.id}</h2>


    <div className="row">

      {/* ゲーム版　*/}
      <div style={{ display: 'inline-block', verticalAlign: 'top'}}>
        <table>
          {game.cells.map((row) => {
              return (
                <tr>
                  {row.map((cell) => {
                    return (
                      <td style={{
                        backgroundColor: '#' + cell.color,
                        width: '20px',
                        height: '20px',
                        border: '1px solid black',
                        }}>

                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </table>
      </div>

      {/* プレイヤー達の情報 */}
      <div style={{ display: 'inline-block', verticalAlign: 'top', margin: '5px'}}>
        <div className={"card"} >
          <div className={"card-body"}>
            <table className={"table players-table"}>
              <thead>
                <tr>
                  <th>色</th>
                  <th>名前</th>
                  <th>ポイント</th>
                  <th>残数</th>
                  <th>パス有無</th>
                </tr>
              </thead>
              <tbody>
                {game.playersInfo.map((playerInfo) => (
                  <tr>
                      <td>{playerInfo.color}</td>
                      <td>{playerInfo.name}</td>
                      <td>{playerInfo.point}</td>
                      <td>残り{playerInfo.blockZansu}個</td>
                      <td>{playerInfo.pass ? 'パス' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

    <hr />

    <div>
      {/* メッセージ */}
      {game.isLoginUserNow && <p>あなたの番です。置きたいブロックを選択してください。</p>}
      {game.isLoginUserNow === false && <p>「{game.nowPlayerName}」の番です。お待ちください。</p>}

      {/* 手持ちのブロック  */}
      <div style={{ display: 'inline-block', verticalAlign: 'top'}}>
        <table>
          {game.nexts.map((row) => {
              return (
                <tr>
                  {row.map((cell) => {
                    return (
                      <td style={{
                        backgroundColor: '#' + cell.color,
                        width: '20px',
                        height: '20px',
                        border: '1px solid black',
                        }}
                        onClick={() => {onSelectKouho(cell.blockType);}}>

                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </table>
      </div>
    </div>

    <hr />


    <button
      className={"btn btn-primary"}
      onClick={onBack}
      style={{
        marginLeft: '4px',
      }}
    >
      戻る
    </button>

  </div>
)

GameShowComponent.propTypes = {
  game: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
  onSelectKouho: PropTypes.func.isRequired,
}

export default GameShowComponent
