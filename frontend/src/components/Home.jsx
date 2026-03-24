import React from "react";

const TEST_SETS = [
    {id: 'rescue', title: 'Equipo de Rescate', color: '#ff7675'},
    {id: 'explorers', title: 'Exploradores', color: '#74b9ff'},
    {id: 'sky', title: 'Exploradores del Cielo', color: '#00F7C1'},
    {id: 'super', title: 'Mundo Megamisterioso', color: '#620579A9'}
];

const Home = ({onSelectTest}) => {
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>TEST DE PERSONALIDAD</h1>
            <p style={styles.subtitle}>Selecciona un test:</p>

            <div style={styles.buttonContainer}>
                {TEST_SETS.map((test) => (
                    <button
                        key={test.id}
                        onClick={() => onSelectTest(test.id)}
                        style={{...styles.button, borderLeft: `8px solid ${test.color}`}}
                    >
                        {test.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: '"Press Start 2P", cursive', // Fuente pixel-art típica
    backgroundColor: '#2d3436',
    color: 'white',
    padding: '20px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '30px'
  },
  button: {
    padding: '15px 30px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#2d3436',
    border: 'none',
    borderRadius: '4px',
    textAlign: 'left',
    transition: 'transform 0.1s',
    width: '300px'
  }
};

export default Home;