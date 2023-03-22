import React from 'react'
import './index.css';
import arrayShuffle from '../../helpers/arrayShuffle'

export default function QuizPage(props) {
    let questionsToShow;
    let answersRandom;

    console.log(props)

    if(props.apiResponce.results) {
        questionsToShow = props.apiResponce.results.map((question, i) => {
            let answers = question.incorrect_answers.concat(question.correct_answer);
            answersRandom = arrayShuffle(answers)

            return (
                <div key={i}>
                    <div className="questionRow">
                        {question.question}
                    </div>
                    <div className="answersRow">
                        {answersRandom.map(answer => <span className="oneOfAnswers">{answer}</span>)}
                    </div>
                </div>
            )
        })
    }

    return(
        <div className="quiz-page">
            {questionsToShow}
        </div>
    )
}