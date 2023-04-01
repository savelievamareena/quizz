import React from 'react'
import './index.css';
import arrayShuffle from '../../helpers/arrayShuffle'
import Question from "../Question";
import decodeString from "../../helpers/decodeString";

export default function QuizPage() {
    const [quizData, setQuizData] = React.useState({});
    const [isCompleted, setIsCompleted] = React.useState(false);
    // const [score, setScore] = React.useState(0);

    function getSiblings(element) {
        let siblings = [];
        let sibling = element.target.parentNode.firstElementChild;

        while(sibling) {
            if (sibling.nodeType === 1 && sibling !== element) {
                siblings.push(sibling);
                sibling = sibling.nextElementSibling;
            }
        }
        return siblings;
    }

    function selectAnswer(e) {
        let siblings = getSiblings(e);
        // eslint-disable-next-line array-callback-return
        siblings.map(sibling => {
            if(sibling.classList.contains("selected")) {
                sibling.classList.remove('selected');
            }
        })

        e.currentTarget.classList.toggle('selected');
    }

    async function fetchQuizData() {
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=medium');
        return await response.json();
    }

    function startNewGame() {
        fetchQuizData().then(data => setQuizData({...data}));
    }

    React.useEffect(() => {
        startNewGame();
    }, [])

    let questionsToShow;
    if(quizData.results) {
        questionsToShow = quizData.results.map((question, i) => {
            let allAnswers = question.incorrect_answers.concat(question.correct_answer);
            let answersRandom = arrayShuffle(allAnswers)

            return (
                <Question answersRandom={answersRandom} question={question.question} selectAnswer={(e) => selectAnswer(e)} key={i}/>
            )
        })
    }else {
        return (
            <div>Loading...</div>
        )
    }

    function checkAnswers() {
        let answers = [];
        quizData.results.map(result => {
            answers.push(decodeString(result.correct_answer));
        })

        let answersSelected = [];
        let answersSelectedEls = Array.from(document.getElementsByClassName("selected"));
        answersSelectedEls.map(el => {
            answersSelected.push(el.innerText);
        })

        console.log(answers)
        console.log(answersSelected)

        if(answers.length !== answersSelected.length) {
            alert("Please answer all the questions");
        }

        // setIsCompleted(true);
    }

    return(
        <div className="quiz-page">
            <div className="questionsContainer">
                {questionsToShow}
            </div>
            <div>
                {isCompleted ?
                    <button className="startNewGameButton" onClick={startNewGame}>Play again</button> :
                    <button className="checkAnswersButton" onClick={checkAnswers}>Check answers</button>
                }

            </div>
        </div>
    )
}