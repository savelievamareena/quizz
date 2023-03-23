import React from 'react'
import './index.css';
import arrayShuffle from '../../helpers/arrayShuffle'
import decodeString from "../../helpers/decodeString";

export default function QuizPage(props) {
    let questionsToShow;
    let answersRandom;

    if(props.apiResponce.results) {
        questionsToShow = props.apiResponce.results.map((question, i) => {
            let answers = question.incorrect_answers.concat(question.correct_answer);
            answersRandom = arrayShuffle(answers)

            return (
                <div key={i} className="questionElement">
                    <div className="questionRow">
                        {decodeString(question.question)}
                    </div>
                    <div className="answersRow">
                        {answersRandom.map(answer => <span className="oneOfAnswers">{decodeString(answer)}</span>)}
                    </div>
                </div>
            )
        })
    }

    return(
        <div className="quiz-page">
            <div className="questionsContainer">
                {questionsToShow}
            </div>
            <div>
                <button>Check answers</button>
            </div>
        </div>
    )
}