import React, { useState } from 'react'
import Home from './components/Home'
import Quiz from './components/Quiz';
import './App.css'

function App() {
  const [activeTest, setActiveTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [finalNature, setFinalNature] = useState(null);
  const [gender, setGender] = useState('m');

  const handleStartTest = async (testId) => {
    console.log("Iniciando test: ", testId)
    try {
      const response = await fetch(`http://localhost:8000/questions/${testId}`);
      const data = await response.json();
      setQuestions(data);
      setActiveTest(testId)
    } catch (error) {
      console.error("Error conectando con el back:", error);
    }

  }

  const handleFinish = async (totalScores, finalGender) => {
  try {
    const response = await fetch('http://localhost:8000/calculate-nature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scores: totalScores,
        gender: finalGender,
        testId: activeTest
      })
    });
    const data = await response.json();
    setFinalNature(data); 
  } catch (error) {
    console.error("Error al calcular:", error);
  }
};

  return (
    <div className="app.container">
      {!activeTest ? (
        <Home onSelectTest={handleStartTest} />
      ) : !finalNature ? (
        <Quiz questions={questions} 
              onFinish={handleFinish}
              testId={activeTest} />
      ) : (
        <div className="result-view">
          <div className="personality-container">
            <p className="personality-description">{finalNature.text}</p>
          </div>
          <div className="pokemon-reveal">
            <h1 className="pokemon-name">...¡{finalNature.pokemon}!</h1>
            {/*<img
              src={finalNature.imageUrl}
              alt={finalNature.pokemon}
              className="pokemon-sprite"
            />*/}
          </div>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      )}
    </div>
  );
}

export default App
