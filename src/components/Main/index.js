import React from 'react'
import './index.css';
import StartPage from "../StartPage/index";
import QuizPage from "../QuizPage";

export default function Main() {

    const [isStart, setIsStart] = React.useState(false);
    const [questions, setQuestions] = React.useState({});

    // function startQuiz() {
    //     debugger
    //
    //     fetch('http://example.com/movies.json')
    //         .then((response) => response.json())
    //         .then((data) => setQuestions(data))
    //         .then((data) => console.log(data))
    //     // console.log(result)
    //
    //     // setQuestions(prevQuestions => {...questions, result});
    //     // setIsStart(true);
    // }

    return(
        <div className="main-container">
            {
                isStart ? <QuizPage/> : <StartPage startQuiz={function() {console.log("started")}}/>
            }
        </div>
    )
}