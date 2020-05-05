import React from 'react';
import './Navigation.css';
import Logo from '../logo/Logo';

const Navgation = ({ onRouteChange, isSignedIn }) => {
        if(isSignedIn) {
        return (    
        <nav>
            <ul className = 'main-nav center'>
                <li className='push pointer'><Logo/></li>
                <li 
                    className='f4 link dim dark-gray pa4 pointer underline grow'
                    onClick = {() => onRouteChange('signout')}
                >Sign Out</li>
            </ul>
        </nav>
        );
        } else {
        return (    
        <nav>
            <ul className = 'main-nav center'>
                <li className='push pointer'><Logo/></li>
                <li 
                    className='f4 link dim dark-gray pa4 pointer underline grow'
                    onClick = {() => onRouteChange('signin')}
                >SignIn</li>
                <li 
                    className=' f4 link dim dark-gray pa4 pointer underline grow'
                    onClick = {() => onRouteChange('register')}
                >Register</li>
            </ul>
        </nav>
        );
        }
}

export default Navgation;