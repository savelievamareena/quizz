import React from 'react'
import './index.css';
import decodeString from "../../helpers/decodeString";
import Answer from "../Answer";

export default function Question(props) {

    const answersToShow = props.answersRandom.map((answer, i) => {
        return(
            <Answer key={i} answer={decodeString(answer)} />
        )
    })

    return (
        <div className="questionElement">
            <div className="questionRow">
                {decodeString(props.question)}
            </div>
            <div className="answersRow">
                {answersToShow}
            </div>
        </div>
    )
}