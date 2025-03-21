import React, { useState, useEffect } from 'react';
import LevelCard from './LevelCard'; // Importamos el componente LevelCard

interface Question {
  id: number;
  description: string;
  answer: string;
}

const Quiz: React.FC = () => {
  const [level, setLevel] = useState<number>(1); // Nivel actual
  const [questionsByLevel, setQuestionsByLevel] = useState<Map<number, Question[]>>(new Map());
  const [userAnswers, setUserAnswers] = useState<Map<number, string>>(new Map()); // Almacenar respuestas
  const [answered, setAnswered] = useState<boolean>(false); // Para saber si ya se respondió el nivel actual
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set()); // Niveles completados

  // Función para obtener las preguntas desde la API por nivel
  const fetchQuestions = async (level: number) => {
    const response = await fetch(`http://localhost:3000/api/questions?level=${level}`);
    const data: Question[] = await response.json();

    setQuestionsByLevel(prev => {
      const updatedMap = new Map(prev);
      updatedMap.set(level, data);
      return updatedMap;
    });
  };

  // Función para manejar la respuesta del usuario
  const handleAnswer = (questionId: number, answer: string) => {
    setUserAnswers(prev => new Map(prev).set(questionId, answer));
  };

  // Función para verificar las respuestas
  const checkAnswers = () => {
    let correctCount = 0;
    questionsByLevel.forEach((questions) => {
      questions.forEach((question) => {
        if (userAnswers.get(question.id) === question.answer) {
          correctCount++;
        }
      });
    });
    setAnswered(true);
    if (correctCount === questionsByLevel.get(level)?.length) {
      setCompletedLevels(prev => new Set(prev).add(level)); // Marcar nivel como completado
    }
  };

  // Función para avanzar al siguiente nivel
  const handleNextLevel = () => {
    setLevel(level + 1); // Avanzamos al siguiente nivel
    setAnswered(false); // Restablecer estado de respuesta
    setUserAnswers(new Map()); // Limpiar respuestas
  };

  // Obtener las preguntas cuando cambia el nivel
  useEffect(() => {
    fetchQuestions(level);
    setAnswered(false); // Restablecer estado de respuesta cuando se cambia de nivel
  }, [level]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Quiz</h1>

      {/* Tarjetas para los niveles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((lvl) => (
          <LevelCard
            key={lvl}
            level={lvl}
            onClick={setLevel}
            isLocked={lvl > level}
          />
        ))}
      </div>

      {/* Mostrar preguntas por niveles */}
      <div className="space-y-8">
        {questionsByLevel.get(level)?.map((question) => (
          <div key={question.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <p className="text-lg mb-2">{question.description}</p>
            <input
              type="text"
              placeholder="Tu respuesta"
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className={`w-full p-2 border rounded-md ${
                answered
                  ? userAnswers.get(question.id) === question.answer
                    ? 'border-green-500 bg-green-100'
                    : 'border-red-500 bg-red-100'
                  : 'border-gray-300'
              }`}
              disabled={answered} // Desactivar input si ya se respondió
            />
          </div>
        ))}
      </div>

      {/* Botón para verificar respuestas */}
      <div className="flex justify-center mt-6">
        <button
          onClick={checkAnswers}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={answered}
        >
          Verificar respuestas
        </button>
      </div>

      {/* Mostrar feedback */}
      {answered && (
        <div className="mt-6 text-center text-lg text-gray-700">
          {userAnswers.size === questionsByLevel.get(level)?.length
            ? '¡Nivel completado! Puedes avanzar al siguiente.'
            : 'Intenta de nuevo.'}
        </div>
      )}

      {/* Mostrar botón "Siguiente" solo cuando el nivel esté completo */}
      {answered && userAnswers.size === questionsByLevel.get(level)?.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleNextLevel}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
