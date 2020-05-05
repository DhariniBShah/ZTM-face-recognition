import React from 'react';

const Rank = () => {
    return(
        <div>
            <div className = 'white f3 fw6' style = {{textShadow: '2px 4px 3px rgba(0,0,0,0.1)'}}>
                {'Dharini, your current rank is..'}
            </div>
            <div className = 'white f1 fw8' style = {{textShadow: '2px 4px 3px rgba(0,0,0,0.3)'}}>
                {'#5'}
            </div>
        </div>
    );
}

export default Rank;