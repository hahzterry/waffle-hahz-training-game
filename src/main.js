// src/game/main.js

import Phaser from 'phaser';
import Title from './scenes/Title';
import GrillInstructions from './scenes/Grill_Instructions';
import Grill from './scenes/Grill';
import Results from './scenes/Results';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game',
    backgroundColor: '#111111',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
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