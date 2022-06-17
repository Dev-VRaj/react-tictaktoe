import React, { useState } from 'react'
// import { useState } from 'react/cjs/react.development';

import { Card, CardBody } from 'reactstrap'

import ReactCardFlip from 'react-card-flip';

import Icon from "./Icon"


const BoxBody = ({ item }) => {

    const [isFlipped, setIsFlipped] = useState(false)
    
    // flip the card when it is clicked
    const handleClick = () => {
        setIsFlipped(true)
    }

    // wait for the page to load, then add a click event listener to the reset button which filips back this card to normal
    window.addEventListener('load', () => {
        document.querySelector('.resetButton').addEventListener('click', () => {
            setIsFlipped(false)
        })
    })
    

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div>
                <Card color='danger'>
                    <CardBody onClick={handleClick} className='box'>
                        <Icon name={"empty"} />
                    </CardBody>
                </Card>

            </div>

            <div>
                <Card color='warning'>
                    <CardBody className='box'>
                        <Icon name={item} />
                    </CardBody>
                </Card>

            </div>
        </ReactCardFlip>
    )
}

export default BoxBody;