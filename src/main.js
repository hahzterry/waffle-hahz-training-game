import Phaser from 'phaser';

import Title from './scenes/Title.js';
import GrillInstructions from './scenes/Grill_Instructions.js';
import Grill from './scenes/Grill.js';
import Results from './scenes/Results.js';

const config = {
    type: Phaser.AUTO,

    width: 1280,
    height: 720,

    parent: 'game',

    backgroundColor: '#121212',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },

    render: {
        antialias: true,
        pixelArt: false,
        roundPixels: false
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scene: [
        Title,
        GrillInstructions,
        Grill,
        Results
    ]
};

new Phaser.Game(config);
