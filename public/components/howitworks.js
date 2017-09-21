import React from 'react';
import ReactDOM from 'react-dom';



export default class HowItWorks extends React.Component {
    render() {
        return (
            <section className='choose'>
                <h2>What to expect</h2>
                <div className='column first'>
                    <h4>Search</h4>
                    <h5><i className='fa fa-search' aria-hidden='true'></i></h5>
                    <h4>Results</h4>
                </div>
                <div className='column'>
                    <h4>Visit</h4>
                    <h5><i className='fa fa-suitcase' aria-hidden='true'></i></h5>
                    <h4>Bucket List</h4>
                </div>
                <div className='column last'>
                    <h4>Display</h4>
                    <h5><i className='fa fa-camera' aria-hidden='true'></i></h5>
                    <h4>Been There List</h4>
                </div>
            </section>
        );
    }
}
