import React from 'react';
import { FaTimes, FaPen, FaRegCircle } from 'react-icons/fa';

const Icon = ({ name }) => {

    // serve the respective icon according to the name of the card 
    switch (name) {
        case 'circle':
            return <FaRegCircle className='icon' />
        case 'cross':
            return <FaTimes className='icon' />

        default:
            return <FaPen className='icon'/>
    }
};

export default Icon;