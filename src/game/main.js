// src/main.js

import { AUTO, Scale, Game } from 'phaser';

import Title from './scenes/Title';
import GrillInstructions from './scenes/Grill_Instructions';
import Grill from './scenes/Grill';

// ─────────────────────────────────────────────────────────────
// WAFFLE HAHZ GAME CONFIG
// ─────────────────────────────────────────────────────────────

const config = {
    type: AUTO,

    // 9:16 PORTRAIT GAME DESIGN
    width: 720,
    height: 1280,

    parent: 'game-container',

    backgroundColor: '#D71920',

    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,

        width: 720,
        height: 1280
    },

    // Keep input optimized for mobile/touch
    input: {
        activePointers: 3
    },

    // Scene progression
    scene: [
        Title,
        GrillInstructions,
        Grill
    ]
};


// ─────────────────────────────────────────────────────────────
// START GAME
// ─────────────────────────────────────────────────────────────

const StartGame = (parent) => {
    return new Game({
        ...config,
        parent
    });
};

export default StartGame;
