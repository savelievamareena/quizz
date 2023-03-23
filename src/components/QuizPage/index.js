import React from 'react'
import './index.css';
import arrayShuffle from '../../helpers/arrayShuffle'
import Question from "../Question";

export default function QuizPage(props) {
    let questionsToShow;

    if(props.apiResponce.results) {

        questionsToShow = props.apiResponce.results.map((question, i) => {
            let allAnswers = question.incorrect_answers.concat(question.correct_answer);
            let answersRandom = arrayShuffle(allAnswers)

            return (
                <Question answersRandom={answersRandom} question={question.question} key={i}/>
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