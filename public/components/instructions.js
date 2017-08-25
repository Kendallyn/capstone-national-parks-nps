import React from 'react';
import ReactDOM from 'react-dom';



export default class Instructions extends React.Component {
    render() {
        return (
            <div className='instructions'>
                <h3>How to use:</h3>
                <p>Choose and search for a park from the drop down list and reference the below icons on how to save, update, and delete parks from your lists</p>
                <div className='column first'>
                <h6><i className="fa fa-plus-square-o" aria-hidden="true"></i></h6>
                    <p>Add to <br />Bucket list</p>
                </div>
                <div className='column'>
                    <h6>
                    <div className='checkboxForShow'></div>
                    </h6>
                    <p>Move to <br />Been There</p>
                </div>
                <div className='column last'>
                <h6><i className="fa fa-minus-square-o" aria-hidden="true"></i></h6>
                    <p>Delete from <br />any list</p>
                </div>
            </div>
        );
    }
}
