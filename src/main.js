import * as Phaser from 'phaser';

import Title from './game/scenes/Title.js';
import GrillInstructions from './game/scenes/Grill_Instructions.js';
import Grill from './game/scenes/Grill.js';

/*
|--------------------------------------------------------------------------
| WAFFLE HAHZ DESIGN SYSTEM
|--------------------------------------------------------------------------
*/

const COLORS = {
    RED: 0xD71920,
    RED_DARK: 0xA90000,
    RED_DEEP: 0x7F0000,

    WHITE: 0xFFFFFF,
    OFF_WHITE: 0xFFF8F5,

    BLACK: 0x111111,
    DARK: 0x181818,

    GRAY: 0x777777,
    LIGHT_GRAY: 0xEEEEEE,

    PINK: 0xFF4F70,
    YELLOW: 0xFFD23F
};

const TEXT = {
    RED: '#D71920',
    WHITE: '#FFFFFF',
    OFF_WHITE: '#FFF8F5',
    BLACK: '#111111',
    GRAY: '#777777',
    PINK: '#FF4F70',
    YELLOW: '#FFD23F'
};

/*
|--------------------------------------------------------------------------
| RESULTS SCENE
|--------------------------------------------------------------------------
*/

class Results extends Phaser.Scene {
    constructor() {
        super('Results');
    }

    create(data = {}) {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor(TEXT.RED);

        const score = Number(data.score || 0);
        const ordersServed = Number(data.ordersServed || 0);
        const totalOrders = Number(data.totalOrders || 8);
        const finalCombo = Number(data.finalCombo || 0);

        let grade = 'KEEP COOKING';

        if (score >= 9000) {
            grade = 'HAHZ CERTIFIED';
        } else if (score >= 7000) {
            grade = 'KITCHEN READY';
        } else if (score >= 4500) {
            grade = 'GETTING HOT';
        }

        /*
        |--------------------------------------------------------------------------
        | BACKGROUND
        |--------------------------------------------------------------------------
        */

        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height
        ).setFillStyle(COLORS.RED);

        // Decorative circles
        this.add.circle(
            width + 80,
            120,
            210
        ).setFillStyle(COLORS.RED_DARK, 0.45);

        this.add.circle(
            -80,
            height - 160,
            260
        ).setFillStyle(COLORS.RED_DARK, 0.35);

        /*
        |--------------------------------------------------------------------------
        | HEADER
        |--------------------------------------------------------------------------
        */

        this.add.text(width / 2, 90, 'WAFFLE HAHZ', {
            fontFamily: 'Arial Black',
            fontSize: '76px',
            color: TEXT.WHITE,
            stroke: TEXT.BLACK,
            strokeThickness: 10
        }).setOrigin(0.5);

        this.add.text(width / 2, 165, 'TRAINING COMPLETE', {
            fontFamily: 'Arial Black',
            fontSize: '25px',
            color: TEXT.WHITE,
            letterSpacing: 5
        }).setOrigin(0.5);

        /*
        |--------------------------------------------------------------------------
        | GRADE
        |--------------------------------------------------------------------------
        */

        this.add.text(width / 2, 275, grade, {
            fontFamily: 'Arial Black',
            fontSize: '46px',
            color: TEXT.YELLOW,
            stroke: TEXT.BLACK,
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(width / 2, 330, '🔥 THAT WAS A SHIFT', {
            fontFamily: 'Arial Black',
            fontSize: '20px',
            color: TEXT.WHITE
        }).setOrigin(0.5);

        /*
        |--------------------------------------------------------------------------
        | SCORE CARD
        |--------------------------------------------------------------------------
        */

        const scoreCard = this.add.rectangle(
            width / 2,
            555,
            900,
            430,
            40
        );

        scoreCard
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(8, COLORS.BLACK);

        this.add.text(width / 2, 410, 'FINAL SCORE', {
            fontFamily: 'Arial Black',
            fontSize: '22px',
            color: TEXT.GRAY
        }).setOrigin(0.5);

        this.add.text(width / 2, 490, score.toLocaleString(), {
            fontFamily: 'Arial Black',
            fontSize: '92px',
            color: TEXT.BLACK,
            stroke: TEXT.WHITE,
            strokeThickness: 2
        }).setOrigin(0.5);

        /*
        |--------------------------------------------------------------------------
        | STATS
        |--------------------------------------------------------------------------
        */

        const statY = 630;

        this.add.text(
            width / 2 - 230,
            statY,
            `${ordersServed}/${totalOrders}`,
            {
                fontFamily: 'Arial Black',
                fontSize: '38px',
                color: TEXT.RED
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2 - 230,
            statY + 48,
            'ORDERS',
            {
                fontFamily: 'Arial Black',
                fontSize: '16px',
                color: TEXT.GRAY
            }
        ).setOrigin(0.5);

        this.add.rectangle(
            width / 2,
            statY + 20,
            3,
            90
        ).setFillStyle(COLORS.LIGHT_GRAY);

        this.add.text(
            width / 2 + 230,
            statY,
            `${finalCombo}X`,
            {
                fontFamily: 'Arial Black',
                fontSize: '38px',
                color: TEXT.RED
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2 + 230,
            statY + 48,
            'BEST COMBO',
            {
                fontFamily: 'Arial Black',
                fontSize: '16px',
                color: TEXT.GRAY
            }
        ).setOrigin(0.5);

        /*
        |--------------------------------------------------------------------------
        | SOCIAL CHALLENGE
        |--------------------------------------------------------------------------
        */

        this.add.text(width / 2, 850, 'CAN YOU BEAT THIS?', {
            fontFamily: 'Arial Black',
            fontSize: '34px',
            color: TEXT.WHITE,
            stroke: TEXT.BLACK,
            strokeThickness: 5
        }).setOrigin(0.5);

        this.add.text(width / 2, 900, 'POST YOUR SCORE • TAG @WAFFLEHAHZ', {
            fontFamily: 'Arial Black',
            fontSize: '18px',
            color: TEXT.WHITE,
            letterSpacing: 2
        }).setOrigin(0.5);

        /*
        |--------------------------------------------------------------------------
        | FOLLOW BUTTON
        |--------------------------------------------------------------------------
        */

        const followButton = this.createButton(
            width / 2,
            1010,
            820,
            100,
            COLORS.WHITE,
            COLORS.BLACK,
            'FOLLOW @WAFFLEHAHZ'
        );

        followButton.on('pointerdown', () => {
            window.open(
                'https://x.com/WaffleHahz',
                '_blank',
                'noopener,noreferrer'
            );
        });

        /*
        |--------------------------------------------------------------------------
        | POST BUTTON
        |--------------------------------------------------------------------------
        */

        const postButton = this.createButton(
            width / 2,
            1140,
            820,
            100,
            COLORS.BLACK,
            COLORS.WHITE,
            'POST MY SCORE'
        );

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

        /*
        |--------------------------------------------------------------------------
        | PRIZE / SHARE MESSAGE
        |--------------------------------------------------------------------------
        */

        const prizeCard = this.add.rectangle(
            width / 2,
            1315,
            820,
            190,
            28
        );

        prizeCard
            .setFillStyle(COLORS.RED_DARK)
            .setStrokeStyle(4, COLORS.WHITE);

        this.add.text(width / 2, 1270, '🔥 HAHZ CHALLENGE', {
            fontFamily: 'Arial Black',
            fontSize: '22px',
            color: TEXT.YELLOW
        }).setOrigin(0.5);

        this.add.text(
            width / 2,
            1330,
            'POST YOUR SCORE WITH',
            {
                fontFamily: 'Arial Black',
                fontSize: '17px',
                color: TEXT.WHITE
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            1370,
            '#WAFFLEHAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: '30px',
                color: TEXT.WHITE
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            1410,
            'for a chance to win a FREE MEAL.',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: TEXT.WHITE
            }
        ).setOrigin(0.5);

        /*
        |--------------------------------------------------------------------------
        | PLAY AGAIN
        |--------------------------------------------------------------------------
        */

        const playAgain = this.add.text(
            width / 2,
            1570,
            '↻ PLAY AGAIN',
            {
                fontFamily: 'Arial Black',
                fontSize: '30px',
                color: TEXT.WHITE
            }
        ).setOrigin(0.5).setInteractive({
            useHandCursor: true
        });

        playAgain.on('pointerover', () => {
            playAgain.setColor(TEXT.YELLOW);
        });

        playAgain.on('pointerout', () => {
            playAgain.setColor(TEXT.WHITE);
        });

        playAgain.on('pointerdown', () => {
            this.scene.start('Grill');
        });

        /*
        |--------------------------------------------------------------------------
        | HOME
        |--------------------------------------------------------------------------
        */

        const home = this.add.text(
            width / 2,
            1640,
            'BACK TO START',
            {
                fontFamily: 'Arial Black',
                fontSize: '18px',
                color: TEXT.WHITE
            }
        ).setOrigin(0.5).setInteractive({
            useHandCursor: true
        });

        home.on('pointerover', () => {
            home.setColor(TEXT.YELLOW);
        });

        home.on('pointerout', () => {
            home.setColor(TEXT.WHITE);
        });

        home.on('pointerdown', () => {
            this.scene.start('Title');
        });

        /*
        |--------------------------------------------------------------------------
        | FOOTER
        |--------------------------------------------------------------------------
        */

        this.add.text(
            width / 2,
            1815,
            'THE HOUSE ALTERNATIVE™',
            {
                fontFamily: 'Arial Black',
                fontSize: '15px',
                color: TEXT.WHITE,
                letterSpacing: 4
            }
        ).setOrigin(0.5);
    }

    createButton(x, y, width, height, fill, textColor, label) {
        const button = this.add.rectangle(
            x,
            y,
            width,
            height,
            25
        );

        button
            .setFillStyle(fill)
            .setStrokeStyle(5, COLORS.BLACK)
            .setInteractive({
                useHandCursor: true
            });

        const text = this.add.text(x, y, label, {
            fontFamily: 'Arial Black',
            fontSize: 25,
            color: TEXT.WHITE
        }).setOrigin(0.5);

        if (textColor === COLORS.BLACK) {
            text.setColor(TEXT.BLACK);
        }

        button.on('pointerover', () => {
            button.setScale(1.025);
        });

        button.on('pointerout', () => {
            button.setScale(1);
        });

        return button;
    }
}

/*
|--------------------------------------------------------------------------
| PHASER CONFIG
|--------------------------------------------------------------------------
|
| 1080 × 1920 = 9:16
|
*/

const config = {
    type: Phaser.AUTO,

    width: 1080,
    height: 1920,

    parent: 'game',

    backgroundColor: '#D71920',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        width: 1080,
        height: 1920,

        min: {
            width: 320,
            height: 568
        },

        max: {
            width: 1080,
            height: 1920
        }
    },

    render: {
        antialias: true,
        pixelArt: false,
        roundPixels: true
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

/*
|--------------------------------------------------------------------------
| START GAME
|--------------------------------------------------------------------------
*/

window.addEventListener('load', () => {
    const gameContainer = document.getElementById('game');

    if (!gameContainer) {
        console.error(
            'WAFFLE HAHZ: #game container not found.'
        );

        return;
    }

    new Phaser.Game(config);
});
