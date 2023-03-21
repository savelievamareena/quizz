import React from 'react'
import './index.css';

export default function StartPage(props) {
    return(
        <div className="start-page">
            <h1>Quizzical</h1>
            <div>Some description if needed</div>
            <div>
                <button className="start-button" onClick={props.startQuiz}>Start quiz</button>
            </div>
        </div>
    )
}