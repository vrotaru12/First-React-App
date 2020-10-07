import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
    // we want the Square component to “remember” that it got clicked, 
    //and fill it with an “X” mark.
    //  To “remember” things, components use state.

    // React components can have state by setting this.state in their constructors. 
    // this.state should be considered as private to a React component that it’s defined in. Let’s store the current value of the Square in this.state, 
    // and change it when the Square is clicked.
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         value: null,
    //     };
    // }
    render(){
        return(
        <button className="square" onClick={() => this.props.onClick}> {this.props.value}</button> 
        );
    }
}
// To collect data from multiple children, or to have two child components communicate 
// with each other, you need to declare the shared state in their parent component instead.
//  The parent component can pass the state back down to the children by using props;
//  this keeps the child components in sync with each other and with the parent component.
class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        };
    }
    handleClick(i){
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares})
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
      }
    

    render(){
        const status = 'Next player: X';
        return(
            <div>
                <div className="status">{status}</div>
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
    render() {
        return(
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status*/}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />, document.getElementById('root')
);