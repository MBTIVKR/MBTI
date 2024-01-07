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
  
    // Получаем количество вопросов
    const totalQuestions = questions.length;
  
    const checkResult = () => {
      // Инициализация счетчиков для каждой характеристики
      let extraversionCount = 0;
      let sensingCount = 0;
      let thinkingCount = 0;
      let judgingCount = 0;
  
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
            // Можете решить, как учесть "Не знаю" в баллах (например, присвоить половину балла)
            break;
          default:
            break;
        }
      });
  
      // Логика для определения каждой из четырех бинарных характеристик
      const extraversion = extraversionCount >= totalQuestions / 2 ? 'E' : 'I';
      const sensing = sensingCount >= totalQuestions / 2 ? 'S' : 'N';
      const thinking = thinkingCount >= totalQuestions / 2 ? 'T' : 'F';
      const judging = judgingCount >= totalQuestions / 2 ? 'J' : 'P';
  
      // Собираем все четыре характеристики вместе, чтобы получить полный тип личности
      const personalityType = extraversion + sensing + thinking + judging;
  
      // Устанавливаем результат в состояние
      setResult(`Ваш тип личности: ${personalityType}`);
    };
  
    if (showResult && Object.keys(answers).length === totalQuestions) {
      checkResult();
    }
  }, [answers, currentQuestion, showResult, questions]);

  return (
    <div>
      <h1>Тест MBTI</h1>
      {currentQuestion < questions.length && (
        <div>
          <p>{questions[currentQuestion].text}</p>
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(questions[currentQuestion].id, option)}>
              {option}
            </button>
          ))}
        </div>
      )}
      {showResult && (
        <div>
          <h2>Результаты теста</h2>
          {result ? <p>{result}</p> : <p>Вычисление результата...</p>}
        </div>
      )}
    </div>
  );
};

export default MBTITest;