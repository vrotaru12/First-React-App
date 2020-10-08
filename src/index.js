import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



// When a Square is clicked, the onClick function provided by the Board is called. Here’s a review of how this is achieved:

// 1. The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
// 2. When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
// 3. This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
// 4. Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
// 5. We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like “this.handleClick is not a function”.
function Square(props) {
    return(
        <button className="square" onClick={props.onClick}> 
            {props.value}
        </button> 
    );
}
// To collect data from multiple children, or to have two child components communicate 
// with each other, you need to declare the shared state in their parent component instead.
//  The parent component can pass the state back down to the children by using props;
//  this keeps the child components in sync with each other and with the parent component.
class Board extends React.Component{
    // Square components are now controlled components. The Board has full control over them.
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
      }
    

    render(){
        return(
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick(i){
        //history's value ensures that if we “go back in time” and then make a new move from that point, we throw away all the “future” history that would now become incorrect.
        const history = this.state.history.slice(0, this.state.stepNumber + 1); 
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext? 'X':'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length, //This ensures we don’t get stuck showing the same move after a new one has been made.
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step){
        this.setState ({
            xIsNext: (step % 2) === 0,
            stepNumber: step 
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]; //rendering the currently selected move according to stepNumber
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 'Move to Step '+ move : 'Restart ';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if(winner){
            status = 'Winner: '+winner;
        }else{
            status = 'Next player: '+ (this.state.xIsNext? 'X':'O');
        }
        return(
            <div className="game">
                <div className="game-board">
                    <Board 
                    squares={current.squares}
                     onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    for (let i = 0; i< lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Game />, document.getElementById('root')
);