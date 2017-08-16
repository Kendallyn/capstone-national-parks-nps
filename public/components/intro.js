import React from 'react';
import ReactDOM from 'react-dom';



export default class Intro extends React.Component {
    render() {
        return (
            <div className='wrapper hero-image'>
                <h3>
                    A place to find out information about National Parks <br />
                    to help you get out and explore!
                </h3>
                <a id='searchButtonHome' href='park-search.html'>Explore!</a>
            </div>
            );
    }
}
