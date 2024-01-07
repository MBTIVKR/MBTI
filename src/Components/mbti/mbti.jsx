import React, { useState, useEffect } from 'react';
import { questions } from './questions';

const MBTITest = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    console.log('Answers:', answers);
    console.log('Current Question:', currentQuestion);
    console.log('Show Result:', showResult);

    // Количество вопросов
    const totalQuestions = questions.length;

    const checkResult = () => {
      // Инициализация счетчиков для каждой характеристики, включая "Не знаю"
      let extraversionCount = 0;
      let sensingCount = 0;
      let thinkingCount = 0;
      let judgingCount = 0;
      let doNotKnowCount = 0;

      // Перебираем все ответы и увеличиваем соответствующие счетчики
      Object.values(answers).forEach((answer) => {
        switch (answer) {
          case 'Согласен':
            extraversionCount++;
            sensingCount++;
            thinkingCount++;
            judgingCount++;
            break;
          case 'Не согласен':
            break;
          case 'Не знаю':
            doNotKnowCount += 0;
            break;
          default:
            break;
        }
      });

      // Логика для определения каждой из четырех бинарных характеристик, включая "Не знаю"
      const extraversion =
        extraversionCount + doNotKnowCount >= totalQuestions / 2 ? 'E' : 'I';
      const sensing =
        sensingCount + doNotKnowCount >= totalQuestions / 2 ? 'S' : 'N';
      const thinking =
        thinkingCount + doNotKnowCount >= totalQuestions / 2 ? 'T' : 'F';
      const judging =
        judgingCount + doNotKnowCount >= totalQuestions / 2 ? 'J' : 'P';

      // Собираем все четыре характеристики вместе, чтобы получить полный тип личности
      const personalityType = extraversion + sensing + thinking + judging;

      {localStorage.setItem('type', personalityType)}
      // Устанавливаем результат в состояние
      setResult(`Ваш тип личности: ${personalityType}`);
    };

    if (showResult && Object.keys(answers).length === totalQuestions) {
      checkResult();

      localStorage.setItem('answers', JSON.stringify(answers));
    }
  }, [answers, currentQuestion, showResult, questions]);

  return (
    <div>
      <h1>Тест MBTI</h1>
      {currentQuestion < questions.length && (
        <div>
          <p>{questions[currentQuestion].text}</p>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                handleAnswer(questions[currentQuestion].id, option)
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {showResult && (
        <div>
          <h2>Результаты теста</h2>
          {result ? (
          <p>{result}</p>
          )
           : <p>Вычисление результата...</p>}
        </div>


      )}
      {/* {localStorage.setItem('type', result)} */}      
    </div>
  );
};

export default MBTITest;
