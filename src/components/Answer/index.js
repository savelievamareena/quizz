import React from 'react'
import './index.css';

export default function Answer(props) {

    return (
        <div className="oneOfAnswers" >
            {props.answer}
        </div>
    )
}