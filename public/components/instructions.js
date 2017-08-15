import React from 'react';
import ReactDOM from 'react-dom';



export default class Instructions extends React.Component {
    render() {
        return (
            <div className='instructions'>
                <h3>Instructions:</h3>
                <div className='column first'>
                    <h6><img src='assets/img/plus.png' className='iconDisplay'/></h6>
                    <p>Add to <br />Bucket list</p>
                </div>
                <div className='column'>
                    <h6>
                    <div className='checkboxForShow'></div>
                    </h6>
                    <p>Move to <br />Been There</p>
                </div>
                <div className='column last'>
                    <h6><img src='assets/img/remove.png' className='removeExplanation'/></h6>
                    <p>Delete from <br />any list</p>
                </div>
            </div>
        );
    }
}
