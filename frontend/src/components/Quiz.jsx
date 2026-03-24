import React, {useState, useEffect} from 'react';

const Quiz = ({questions, onFinish, testId}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState({});
    const [selectedGender, setSelectedGender] = useState('m');
    const [displayedText, setDisplayedText] = useState("");
    const currentQuestion = questions[currentIndex];
    const [isFinished, setIsFinished] = useState(false);

    if (!questions || questions.length === 0) {
        return <div className="quiz-box">Cargando preguntas...</div>;
    }

    useEffect(() => {
        setDisplayedText("");
        setIsFinished(false);
        let i = 0;
        const fullText = currentQuestion.text;

        const timer = setInterval(() => {
            //setDisplayedText((prev) => prev + fullText.charAt(i));
            setDisplayedText(fullText.substring(0, i + 1));
            i++;
            if (i >= fullText.length) {
                clearInterval(timer);
                setIsFinished(true);
            } 
        }, 30);
        return () => clearInterval(timer);
    }, [currentIndex, currentQuestion.text]);

    const handleAnswer = (points, optionText) => {
        if (optionText === "Chico") {
            setSelectedGender('m');
        } else if (optionText === "Chica") {
            setSelectedGender('f');
        }
        const newScores = {...scores};
        Object.entries(points).forEach(([nature, val]) => {
            newScores[nature] = (newScores[nature] || 0) + val;
        });
        setScores(newScores);
        if (currentIndex < questions.length - 1) {
            if (testId === "rescue" && currentQuestion.id == 10) {
                if (optionText === "¡Luchar!") {
                    setCurrentIndex(currentIndex + 1);
                } else {
                    setCurrentIndex(currentIndex + 2);
                }
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        } else {
            const finalGender = optionText === "Chica" ? 'f' : (optionText === "Chico" ? 'm' : selectedGender);
            onFinish(newScores, finalGender);
        }
    };

    return (
        <div className="quiz-box">
            <div className="text-container">
                <p>{displayedText}</p>
            </div>
            {isFinished && (
                <div className="options-container">
                    {currentQuestion.options.map((opt, idx) => (
                        <button 
                            key={idx} 
                            className="option-button"
                            onClick={() => handleAnswer(opt.points)}>
                            {opt.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;