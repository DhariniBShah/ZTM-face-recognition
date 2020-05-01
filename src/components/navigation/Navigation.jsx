import React from 'react';
import './Navigation.css';
import Logo from '../logo/Logo';

const Navgation = () => {
    return (
        <nav>
            <ul className = 'main-nav'>
                <li className='pointer'><Logo/></li>
                <li className=' push f4 link dim black pa4 pointer underline'>Sign Out</li>
            </ul>
        </nav>
    )
}

export default Navgation;