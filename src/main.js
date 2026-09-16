import * as Phaser from 'phaser';

import Title from './game/scenes/Title.js';
import GrillInstructions from './game/scenes/Grill_Instructions.js';
import Grill from './game/scenes/Grill.js';

class Results extends Phaser.Scene {
    constructor() {
        super('Results');
    }

    create(data = {}) {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor('#121212');

        const score = Number(data.score || 0);
        const ordersServed = Number(data.ordersServed || 0);
        const totalOrders = Number(data.totalOrders || 8);
        const finalCombo = Number(data.finalCombo || 0);

        let grade = 'KEEP TRAINING';

        if (score >= 9000) {
            grade = 'HAHZ CERTIFIED';
        } else if (score >= 7000) {
            grade = 'KITCHEN READY';
        } else if (score >= 4500) {
            grade = 'GETTING HOT';
        }

        this.add.text(width / 2, 55, 'WAFFLE HAHZ', {
            fontFamily: 'Arial Black',
            fontSize: '58px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, 115, 'TRAINING COMPLETE', {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffb000'
        }).setOrigin(0.5);

        this.add.text(width / 2, 170, grade, {
            fontFamily: 'Arial Black',
            fontSize: '38px',
            color: '#ff4d1c'
        }).setOrigin(0.5);

        const panel = this.add.rectangle(
            width / 2,
            305,
            620,
            220,
            20
        );

        panel
            .setFillStyle(0x1d1d1d)
            .setStrokeStyle(3, 0xffb000);

        this.add.text(width / 2, 230, 'FINAL SCORE', {
            fontFamily: 'Arial Black',
            fontSize: '18px',
            color: '#999999'
        }).setOrigin(0.5);

        this.add.text(width / 2, 270, score.toLocaleString(), {
            fontFamily: 'Arial Black',
            fontSize: '50px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(
            width / 2,
            345,
            `ORDERS SERVED: ${ordersServed} / ${totalOrders}`,
            {
                fontFamily: 'Arial Black',
                fontSize: '21px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            385,
            `FINAL COMBO: ${finalCombo}X`,
            {
                fontFamily: 'Arial Black',
                fontSize: '21px',
                color: '#ffb000'
            }
        ).setOrigin(0.5);

        const socialPanel = this.add.rectangle(
            width / 2,
            500,
            820,
            125,
            18
        );

        socialPanel
            .setFillStyle(0x242424)
            .setStrokeStyle(3, 0xff4d1c);

        this.add.text(width / 2, 455, 'SHOW US YOUR SCORE', {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(
            width / 2,
            492,
            'Follow @WaffleHahz + post your score with #WaffleHahz',
            {
                fontFamily: 'Arial Black',
                fontSize: '19px',
                color: '#ffb000'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            527,
            'for a chance to win a FREE WAFFLE HAHZ MEAL!',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        const followButton = this.add.rectangle(
            width / 2 - 190,
            590,
            330,
            58,
            14
        );

        followButton
            .setFillStyle(0x111111)
            .setStrokeStyle(3, 0xffffff)
            .setInteractive({ useHandCursor: true });

        this.add.text(
            width / 2 - 190,
            590,
            'FOLLOW @WAFFLEHAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: '19px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        followButton.on('pointerdown', () => {
            window.open(
                'https://x.com/WaffleHahz',
                '_blank',
                'noopener,noreferrer'
            );
        });

        const postButton = this.add.rectangle(
            width / 2 + 190,
            590,
            330,
            58,
            14
        );

        postButton
            .setFillStyle(0xffb000)
            .setStrokeStyle(3, 0xffffff)
            .setInteractive({ useHandCursor: true });

        this.add.text(
            width / 2 + 190,
            590,
            'POST MY SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: '20px',
                color: '#121212'
            }
        ).setOrigin(0.5);

        postButton.on('pointerdown', () => {
            const postText = encodeURIComponent(
                `I scored ${score.toLocaleString()} in the WAFFLE HAHZ GAME! 🧇🔥\n\nCan you beat my score?\n\n@WaffleHahz #WaffleHahz`
            );

            window.open(
                `https://twitter.com/intent/tweet?text=${postText}`,
                '_blank',
                'noopener,noreferrer'
            );
        });

        const playAgain = this.add.text(
            width / 2 - 150,
            670,
            'PLAY AGAIN',
            {
                fontFamily: 'Arial Black',
                fontSize: '18px',
                color: '#ffb000'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        playAgain.on('pointerdown', () => {
            this.scene.start('Grill');
        });

        const home = this.add.text(
            width / 2 + 150,
            670,
            'BACK TO START',
            {
                fontFamily: 'Arial Black',
                fontSize: '18px',
                color: '#ff4d1c'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        home.on('pointerdown', () => {
            this.scene.start('Title');
        });
    }
}

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

window.addEventListener('load', () => {
    const gameContainer = document.getElementById('game');

    if (!gameContainer) {
        console.error('WAFFLE HAHZ: #game container not found.');
        return;
    }

    new Phaser.Game(config);
});
