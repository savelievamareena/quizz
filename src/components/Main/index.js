import React from 'react'
import './index.css';
import StartPage from "../StartPage/index";
import QuizPage from "../QuizPage";

export default function Main() {
    const [isStart, setIsStart] = React.useState(false);

    function startQuiz() {
        setIsStart(true);
    }

    return(
        <div className="main-container">
            {
                isStart ? <QuizPage /> : <StartPage startQuiz={()=> {startQuiz()}} />
            }
        </div>
    )
}