import React, { useState } from 'react';

import './tic-tac-toe.css'

const TicTacToe = () => {
	const [turn, setTurn] = useState('x');
	const [cells, setCells] = useState(Array(9).fill(''));
	const [winner, setWinner] = useState("");

	const checkForWinner = (squares) => {
		let combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagnol: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

		for (let combo in combos) {
			combos[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === '' ||
					squares[pattern[1]] === '' ||
					squares[pattern[2]] === ''
				) {
					// do nothing
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(`Ta da ! ${squares[pattern[0]]} is winner`);
				}
				else if (winner === "" && squares[0] !== "" &&
					squares[1] !== "" && squares[2] !== "" &&
					squares[3] !== "" && squares[4] !== "" &&
					squares[5] !== "" && squares[6] !== "" &&
					squares[7] !== "" && squares[8] !== "") {
					setWinner("Ooops ! Its a draw");
				}

			});
		}

	};

	const handleClick = (num) => {
		if (cells[num] !== '') {
			// alert('already clicked');
			return;
		}
		if (winner !== "") {
			return
		}


		let squares = [...cells];

		if (turn === 'x') {
			squares[num] = 'x';
			setTurn('o');
		} else {
			squares[num] = 'o';
			setTurn('x');
		}

		checkForWinner(squares);
		setCells(squares);
	};

	const handleRestart = () => {
		setWinner("");
		setCells(Array(9).fill(''));

	};

	const Cell = ({ num }) => {
		return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
	};

	return (<div className='container1'>
		<p className='para'>
			Turn: {turn}
		</p>
		<div className='container2'>
			<table className='table'>
				<tbody>
					<tr>
						<Cell num={0} />
						<Cell num={1} />
						<Cell num={2} />
					</tr>
					<tr>
						<Cell num={3} />
						<Cell num={4} />
						<Cell num={5} />
					</tr>
					<tr>
						<Cell num={6} />
						<Cell num={7} />
						<Cell num={8} />
					</tr>
				</tbody>
			</table>
			{winner && (
				<>
					<p className='para2'> {winner} </p>
					<button className='btn' onClick={() => handleRestart()}>Play Again</button>
				</>
			)}
		</div>
	</div>
	);
};
export default TicTacToe;
