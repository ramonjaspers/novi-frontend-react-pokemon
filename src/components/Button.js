import React from 'react';
import '../App.css'
import sound from '../assets/button.mp3'

/**
 * 
 * @param {String} children Button text
 * @param {Function} clickHandler Function which gets called onclick
 * @param {Boolean} disabled true or false based which disabled the button
 * @returns 
 */
function Button({ children, clickHandler, disabled }) {
    /**
     * Plays the included sound when called
     */
    const playAudio = async () => {
        new Audio(sound).play();
    }
    // Render of button
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