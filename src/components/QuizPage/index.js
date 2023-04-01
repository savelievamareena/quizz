import React from 'react'
import './index.css';
import arrayShuffle from '../../helpers/arrayShuffle'
import Question from "../Question";

export default function QuizPage() {
    const [quizData, setQuizData] = React.useState({});

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

    React.useEffect(() => {
        fetchQuizData().then(data => setQuizData({...data}));
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