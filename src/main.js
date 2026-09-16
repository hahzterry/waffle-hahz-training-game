import Phaser from 'phaser';

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

        // HEADER
        this.add.text(width / 2, 45, 'WAFFLE HAHZ', {
            fontFamily: 'Arial Black',
            fontSize: '58px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, 105, 'TRAINING COMPLETE', {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffb000'
        }).setOrigin(0.5);

        // GRADE
        this.add.text(width / 2, 160, grade, {
            fontFamily: 'Arial Black',
            fontSize: '38px',
            color: '#ff4d1c'
        }).setOrigin(0.5);

        // SCORE PANEL
        const panel = this.add.rectangle(
            width / 2,
            295,
            620,
            210,
            20
        );

        panel
            .setFillStyle(0x1d1d1d)
            .setStrokeStyle(3, 0xffb000);

        this.add.text(width / 2, 220, 'FINAL SCORE', {
            fontFamily: 'Arial Black',
            fontSize: '18px',
            color: '#999999'
        }).setOrigin(0.5);

        this.add.text(width / 2, 260, score.toLocaleString(), {
            fontFamily: 'Arial Black',
            fontSize: '50px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(
            width / 2,
            330,
            `ORDERS SERVED: ${ordersServed} / ${totalOrders}`,
            {
                fontFamily: 'Arial Black',
                fontSize: '21px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            370,
            `FINAL COMBO: ${finalCombo}X`,
            {
                fontFamily: 'Arial Black',
                fontSize: '21px',
                color: '#ffb000'
            }
        ).setOrigin(0.5);

        // SOCIAL PANEL
        const socialPanel = this.add.rectangle(
            width / 2,
            485,
            820,
            125,
            18
        );

        socialPanel
            .setFillStyle(0x242424)
            .setStrokeStyle(3, 0xff4d1c);

        this.add.text(
            width / 2,
            438,
            'SHOW US YOUR SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: '24px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            475,
            'Follow @WaffleHahz + post your score with #WaffleHahz',
            {
                fontFamily: 'Arial Black',
                fontSize: '19px',
                color: '#ffb000'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            510,
            'for a chance to win a FREE WAFFLE HAHZ MEAL!',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // FOLLOW BUTTON
        const followButton = this.add.rectangle(
            width / 2 - 190,
            565,
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
            565,
            'FOLLOW @WAFFLEHAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: '19px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        followButton.on('pointerover', () => {
            followButton.setFillStyle(0x333333);
            followButton.setScale(1.04);
        });

        followButton.on('pointerout', () => {
            followButton.setFillStyle(0x111111);
            followButton.setScale(1);
        });

        followButton.on('pointerdown', () => {
            window.open(
                'https://x.com/WaffleHahz',
                '_blank',
                'noopener,noreferrer'
            );
        });

        // POST SCORE BUTTON
        const postButton = this.add.rectangle(
            width / 2 + 190,
            565,
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
            565,
            'POST MY SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: '20px',
                color: '#121212'
            }
        ).setOrigin(0.5);

        postButton.on('pointerover', () => {
            postButton.setFillStyle(0xffffff);
            postButton.setScale(1.04);
        });

        postButton.on('pointerout', () => {
            postButton.setFillStyle(0xffb000);
            postButton.setScale(1);
        });

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

        // PLAY AGAIN
        const playAgain = this.add.text(
            width / 2 - 150,
            660,
            'PLAY AGAIN',
            {
                fontFamily: 'Arial Black',
                fontSize: '18px',
                color: '#ffb000'
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        playAgain.on('pointerover', () => {
            playAgain.setColor('#ffffff');
        });

        playAgain.on('pointerout', () => {
            playAgain.setColor('#ffb000');
        });

        playAgain.on('pointerdown', () => {
            this.scene.start('Grill');
        });

        // BACK TO START
        const home = this.add.text(
            width / 2 + 150,
            660,
            'BACK TO START',
            {
                fontFamily: 'Arial Black',
                fontSize: '18px',
                color: '#ff4d1c'
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        home.on('pointerover', () => {
            home.setColor('#ffffff');
        });

        home.on('pointerout', () => {
            home.setColor('#ff4d1c');
        });

        home.on('pointerdown', () => {
            this.scene.start('Title');
        });

        // FOOTER
        this.add.text(
            width / 2,
            height - 8,
            'NASHVILLE HOT  •  ATL PEACH  •  LEMON PEPPER  •  RED VELVET  •  BACON BOURBON',
            {
                fontFamily: 'Arial',
                fontSize: '11px',
                color: '#555555'
            }
        ).setOrigin(0.5);
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

new Phaser.Game(config);
