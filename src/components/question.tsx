import { useState } from "react";
import Swal from "sweetalert2";
import { questionsData, abjad } from "../data-dummy";
import Pagination from "./pagination";

interface Question {
  question: string;
  isCorrect: boolean;
  correctAnswer: string;
  userAnswer: string;
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0); // Indeks soal saat ini
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // Jawaban yang dipilih pengguna
  const [showScore, setShowScore] = useState<boolean>(false); // Apakah hasil ditampilkan
  const [score, setScore] = useState<number>(0); // Nilai total
  const [results, setResults] = useState<Question[]>([]); // Hasil jawaban

  // Fungsi untuk menangani jawaban yang dipilih
  const handleAnswerOptionClick = (selectedAnswer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = selectedAnswer;
    console.log(updatedAnswers, "update");
    setSelectedAnswers(updatedAnswers);
  };

  // Fungsi untuk menghitung nilai dan menampilkan hasil
  const handleSubmitQuiz = () => {
    // cek question jika ada question yang belum dijawab
    if (
      selectedAnswers.filter((answer) => answer).length < questionsData.length
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please answer all questions",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    let totalScore = 0;
    const quizResults = questionsData.map((question, index) => {
      const userAnswer = selectedAnswers[index];
      const isCorrect = userAnswer === question.answer;
      if (isCorrect) totalScore += 1;
      return {
        question: question.question,
        isCorrect,
        correctAnswer: question.answer,
        userAnswer,
      };
    });
    setScore(totalScore);
    setResults(quizResults);
    setShowScore(true);
    // alert nilai total
    Swal.fire({
      icon: "success",
      title: `Done, your score is ${totalScore * 10}`,
    });
  };

  // Fungsi untuk pindah ke soal berikutnya
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  // Fungsi untuk pindah ke soal sebelumnya
  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>

      {showScore ? (
        <div className="score-section">
          <h2>
            You scored {score} out of {questionsData.length}{" "}
            <span>
              <button onClick={() => window.location.reload()}>
                Try Again
              </button>
            </span>
          </h2>

          {/* Tampilkan rincian hasil jawaban */}
          <ul>
            {results.map((result, index) => (
              <li key={index} className="result">
                <strong>{index + 1}. Question: </strong>
                {result.question}
                <br />
                <strong>Your Answer: </strong>
                <span
                  className={`result-${result.isCorrect ? "correct" : "wrong"}`}
                >
                  {result.userAnswer} {result.isCorrect ? "✅" : "❌"}
                </span>
                <br />
                {result.isCorrect ? (
                  <div></div>
                ) : (
                  <div>
                    <strong>Correct Answer: </strong>
                    {result.correctAnswer}
                  </div>
                )}
                <br />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div className="question-section">
            <div className="question-wrapper">
              <h3>
                {currentQuestion + 1}. {questionsData[currentQuestion].question}
              </h3>
              <ul>
                {questionsData[currentQuestion].options.map((option, index) => (
                  <li
                    key={index}
                    className={
                      selectedAnswers[currentQuestion] === option
                        ? "question active"
                        : "question"
                    }
                  >
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      value={option}
                      checked={selectedAnswers[currentQuestion] === option}
                      onChange={() => handleAnswerOptionClick(option)}
                      className="input-answer"
                    />
                    <label htmlFor={`option-${index}`} className="label-answer">
                      {abjad[index]}. {option}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="navigation-buttons">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                {currentQuestion === questionsData.length - 1 ? (
                  <button onClick={handleSubmitQuiz} className="btn-submit">
                    Submit
                  </button>
                ) : (
                  <button onClick={handleNextQuestion}>Next</button>
                )}
              </div>
            </div>
          </div>
          <Pagination
            questionsData={questionsData.length}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      )}
    </div>
  );
}
