import React from 'react'
import './index.css';

export default function Answer(props) {

    return (
        <div className="oneOfAnswers" onClick={props.isCompleted ? null : props.selectAnswer}>
            {props.answer}
        </div>
    )
}