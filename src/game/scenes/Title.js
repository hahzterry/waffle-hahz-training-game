// src/game/scenes/Title.js

import Phaser from 'phaser';

export default class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor('#151515');

        this.add.text(width / 2, 125, 'WAFFLE HAHZ', {
            fontFamily: 'Arial Black',
            fontSize: '76px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, 205, 'THE HOUSE ALTERNATIVE', {
            fontFamily: 'Arial Black',
            fontSize: '25px',
            color: '#ffb000',
            letterSpacing: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, 290, 'WAFFLE HAHZ GAME', {
            fontFamily: 'Arial Black',
            fontSize: '42px',
            color: '#ff4d1c'
        }).setOrigin(0.5);

        this.add.text(width / 2, 350, 'TRAINING DAY', {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const play = this.add.rectangle(
            width / 2,
            475,
            330,
            90,
            16
        )
        .setFillStyle(0xffb000)
        .setStrokeStyle(5, 0xffffff)
        .setInteractive({ useHandCursor: true });

        this.add.text(width / 2, 475, 'START TRAINING', {
            fontFamily: 'Arial Black',
            fontSize: '30px',
            color: '#111111'
        }).setOrigin(0.5);

        play.on('pointerover', () => {
            play.setScale(1.05);
        });

        play.on('pointerout', () => {
            play.setScale(1);
        });

        play.on('pointerdown', () => {
            this.scene.start('GrillInstructions');
        });

        this.add.text(width / 2, 620, 'Master the waffles. Master the chicken. Master the rush.', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#aaaaaa'
        }).setOrigin(0.5);
    }
}