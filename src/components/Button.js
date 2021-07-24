import React from 'react';
import '../App.css'
import sound from '../assets/button.mp3'
function Button({ children, clickHandler, disabled }) {
    const playAudio = async () => {
        new Audio(sound).play();
    }
    return (
        <button
            type="button"
            class="navButton"
            onClick={() => { playAudio(); clickHandler(); }}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;