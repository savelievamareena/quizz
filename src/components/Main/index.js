import React from 'react'
import './index.css';
import StartPage from "../StartPage/index";
import QuizPage from "../QuizPage";

export default function Main() {
    const [isStart, setIsStart] = React.useState(false);
    const [questions, setQuestions] = React.useState({});

    function startQuiz() {
        fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=medium')
            .then((response) => response.json())
            .then((data) => setQuestions({...data}))
        setIsStart(true);
    }

    return(
        <div className="main-container">
            {
                isStart ? <QuizPage apiResponce={questions} /> : <StartPage startQuiz={function() {startQuiz()}} />
            }
        </div>
    )
}