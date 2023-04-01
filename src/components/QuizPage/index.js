import React from 'react'
import './index.css';
import arrayShuffle from '../../helpers/arrayShuffle'
import Question from "../Question";
import decodeString from "../../helpers/decodeString";
import getSiblings from "../../helpers/getSiblings"

export default function QuizPage() {
    const [quizData, setQuizData] = React.useState({});
    const [questionsWithAnswers, setQuestionsWithAnswers] = React.useState([]);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [score, setScore] = React.useState(0);

    console.log(quizData)

    async function fetchQuizData() {
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=medium');
        return await response.json();
    }

    function startNewGame() {
        setScore(0);
        setQuizData({});
        fetchQuizData().then(data => setQuizData({...data}));
        let rightAnswers = Array.from(document.getElementsByClassName("right"));
        if(rightAnswers) {
            rightAnswers.map(el => {
                return el.classList.remove("right");
            })
        }
        let wrongAnswers = Array.from(document.getElementsByClassName("error"));
        if(wrongAnswers) {
            wrongAnswers.map(el => {
                return el.classList.remove("error");
            })
        }
        setIsCompleted(false);
    }

    React.useEffect(() => {
        startNewGame();
    }, [])

    React.useEffect(() => {
        if(quizData.results) {
            let questionObjArray = []

            // eslint-disable-next-line array-callback-return
            quizData.results.map((questionElement) => {
                let questionObj = {
                    question: "",
                    answers: []
                }

                questionObj.question = questionElement.question;

                let allAnswers = questionElement.incorrect_answers.concat(questionElement.correct_answer);
                let answersRandom = arrayShuffle(allAnswers)
                questionObj.answers = [...answersRandom];
                questionObjArray.push(questionObj);
            })

            setQuestionsWithAnswers([...questionObjArray])
        }
    }, [quizData])

    let questionsToShow;
    if(quizData.results) {
        questionsToShow = questionsWithAnswers.map((question, i) => {
            return (
                <Question answersRandom={question.answers} question={question.question} selectAnswer={(e) => selectAnswer(e)} isCompleted={isCompleted} key={i}/>
            )
        })
    }else {
        return (
            <div>Loading...</div>
        )
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

    function checkAnswers() {
        let answers = [];
        // eslint-disable-next-line array-callback-return
        quizData.results.map(result => {
            answers.push(decodeString(result.correct_answer));
        })
        // setCorrectAnswers([...answers]);

        let answersSelected = [];
        let answersSelectedEls = Array.from(document.getElementsByClassName("selected"));
        // eslint-disable-next-line array-callback-return
        answersSelectedEls.map(el => {
            answersSelected.push(el.innerText);
        })

        if(answers.length !== answersSelected.length) {
            alert("Please answer all the questions");
        }

        let qRow = Array.from(document.getElementsByClassName("questionElement"));
        for(let i = 0; i < 5; i++) {
            let selectedAnswerElement = qRow[i].lastChild.querySelector(".selected");
            if(answers[i] === answersSelected[i]) {
                setScore(prevSetScore => ++prevSetScore)
                selectedAnswerElement.classList.add("right");
                selectedAnswerElement.classList.remove("selected");
            }else {
                selectedAnswerElement.classList.add("error");
                selectedAnswerElement.classList.remove("selected");
            }
        }

        setIsCompleted(true);
    }

    return(
        <div className="quiz-page">
            <div className="questionsContainer">
                {questionsToShow}
            </div>
            <div>
                {isCompleted ?
                    <div><span>You scored {score}/5 correct answers</span> <button className="startNewGameButton" onClick={startNewGame}>Play again</button></div> :
                    <button className="checkAnswersButton" onClick={checkAnswers}>Check answers</button>
                }
            </div>
        </div>
    )
}