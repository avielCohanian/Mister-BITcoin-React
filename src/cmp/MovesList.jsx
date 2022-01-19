import React from 'react';

export function MovesList({ moves, title, to }) {
  return (
    <div className="moves-list">
      <h2>{title}</h2>
      {moves.map((move, idx) => {
        return (
          <div className="card" key={move + idx}>
            {to && (
              <>
                <b>To:</b> <span>{move.to}</span>{' '}
              </>
            )}
            <br />
            <b>At:</b> <span>{new Date(move.at).toDateString()}</span>
            <br />
            <b>Amount:</b> <span>{move.amount}</span>
          </div>
        );
      })}
    </div>
  );
}
