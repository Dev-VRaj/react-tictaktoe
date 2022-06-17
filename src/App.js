import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Container, Button, Col, Row } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'; // TIP: you need to load your css file after bootstrap

import BoxBody from './components/BoxBody';


const itemArray = new Array(9).fill("empty")


const App = () => {

  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9)

    // Reload button becomes reset button
    document.querySelector('.resetButton').classList.remove('bg-success')
    document.querySelector('.resetButton').classList.add('bg-primary')
    document.querySelector('.resetButton').textContent = 'Reset the game'
  }

  // function to check for a winner
  const checkIsWinner = () => {

    let isGameOver = false

    // array of all possible positions positions for winning
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    // function made to iterate over the winConditions to check for a win or a tie in the current board
    const checkWinnerThroughArray = (p1, p2, p3) => {
      if (
        itemArray[p1] !== "empty" &&
        itemArray[p1] === itemArray[p2] &&
        itemArray[p2] === itemArray[p3]
        ) {
          document.querySelector('.resetButton').textContent = 'Reload the game'
          document.querySelector('.resetButton').classList.remove('bg-primary')
          document.querySelector('.resetButton').classList.add('bg-success')
          setWinMessage(`${itemArray[p1]} won !`);
          isGameOver = true;
        } else if (!(itemArray.includes("empty") && winMessage === "")) {
          document.querySelector('.resetButton').textContent = 'Reload the game'
          document.querySelector('.resetButton').classList.remove('bg-primary')
          document.querySelector('.resetButton').classList.add('bg-success')
          setWinMessage(`Its a tie !`);
      }
    }

    winConditions.forEach(i => {
      if (!isGameOver) {
        checkWinnerThroughArray(i[0], i[1], i[2])
      }
    });
  }


  const changeItem = itemNumber => {

    // if the game is already over then show the valid message as toast notification 
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }

    // if the clicked item is empty then set it as cross or circle accordingly but if it is not empty then show the error
    if (itemArray[itemNumber] == "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle"
      setIsCross(!isCross)
    } else {
      return toast("already filled", { type: "error" })
    }

    checkIsWinner();
  }


  return (
    <Container className='p-5'>
      <ToastContainer position='bottom-center' />
      <Row>
        <Col md={6} className='offset-md-3'>
          {winMessage ? (
            <div className='mb-2 mt-2'>
              <h1 className='text-success text-uppercase text-center'>
                {winMessage}
              </h1>
            </div>
          ) : (
            <h1 className='text-center text-warning'>
              {isCross ? "Cross'" : "Circle's"} turn
            </h1>
          )}
          <div className='grid'>
            {itemArray.map((item, index) => (
              <div onClick={() => changeItem(index)}>
                <BoxBody item={item} />
              </div>
            ))}
          </div>
            <Button className='resetButton bg-primary'  onClick={reloadGame}>Reset the game</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
