// src/game/scenes/Grill_Instructions.js

import Phaser from 'phaser';

export default class GrillInstructions extends Phaser.Scene {
    constructor() {
        super('GrillInstructions');
    }

    create() {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor('#181818');

        this.add.text(width / 2, 80, 'WAFFLE HAHZ TRAINING', {
            fontFamily: 'Arial Black',
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(width / 2, 135, 'LEARN THE FIVE SIGNATURE BUILDS', {
            fontFamily: 'Arial Black',
            fontSize: '20px',
            color: '#ffb000'
        }).setOrigin(0.5);

        const builds = [
            {
                name: 'NASHVILLE HOT',
                waffle: 'Cornbread Waffle',
                chicken: 'Nashville Chicken',
                finish: 'Hot Honey'
            },
            {
                name: 'ATL PEACH',
                waffle: 'Peach Waffle',
                chicken: 'Crispy Chicken',
                finish: 'Peach-Habanero Glaze'
            },
            {
                name: 'LEMON PEPPER',
                waffle: 'Lemon Waffle',
                chicken: 'Lemon-Pepper Chicken',
                finish: 'Honey'
            },
            {
                name: 'RED VELVET',
                waffle: 'Red Velvet Waffle',
                chicken: 'Crispy Chicken',
                finish: 'Cream Cheese Honey'
            },
            {
                name: 'BACON BOURBON',
                waffle: 'Bacon Waffle',
                chicken: 'Fried Chicken',
                finish: 'Maple Glaze'
            }
        ];

        builds.forEach((item, index) => {
            const y = 205 + index * 65;

            this.add.text(170, y, item.name, {
                fontFamily: 'Arial Black',
                fontSize: 22,
                color: '#ff4d1c'
            });

            this.add.text(430, y, `${item.waffle} + ${item.chicken} + ${item.finish}`, {
                fontFamily: 'Arial',
                fontSize: 20,
                color: '#ffffff'
            });
        });

        const start = this.add.rectangle(
            width / 2,
            615,
            320,
            70,
            14
        )
        .setFillStyle(0xffb000)
        .setInteractive({ useHandCursor: true });

        this.add.text(width / 2, 615, 'ENTER THE KITCHEN', {
            fontFamily: 'Arial Black',
            fontSize: 23,
            color: '#111111'
        }).setOrigin(0.5);

        start.on('pointerdown', () => {
            this.scene.start('Grill');
        });
    }
}