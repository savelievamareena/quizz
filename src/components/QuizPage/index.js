import React from 'react'
import './index.css';
import arrayShuffle from '../../helpers/arrayShuffle'
import Question from "../Question";

export default function QuizPage() {
    const [questions, setQuestions] = React.useState({});

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=medium')
            .then((response) => response.json())
            .then((data) => setQuestions({...data}))
    }, [])

    let questionsToShow;
    if(questions.results) {
        questionsToShow = questions.results.map((question, i) => {
            let allAnswers = question.incorrect_answers.concat(question.correct_answer);
            let answersRandom = arrayShuffle(allAnswers)

            return (
                <Question answersRandom={answersRandom} question={question.question} key={i}/>
            )
        })
    }else {
        return (
            <div>Loading...</div>
        )
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