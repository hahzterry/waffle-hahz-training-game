// src/main.js

import * as Phaser from 'phaser';

import Title from './game/scenes/Title.js';
import GrillInstructions from './game/scenes/Grill_Instructions.js';
import Grill from './game/scenes/Grill.js';

import {
    getEmployeeLevel,
    getNextEmployeeLevel,
    getPointsToNextLevel,
    getLevelProgress
} from './game/config/levels.js';

/*
|--------------------------------------------------------------------------
| WAFFLE HAHZ DESIGN SYSTEM
|--------------------------------------------------------------------------
*/

const COLORS = {
    RED: 0xD71920,
    RED_DARK: 0xA90000,
    RED_DEEP: 0x760000,

    WHITE: 0xFFFFFF,
    CREAM: 0xFFF8F2,

    BLACK: 0x111111,
    DARK: 0x181818,

    GRAY: 0x777777,
    LIGHT_GRAY: 0xEEEEEE,

    YELLOW: 0xFFD43B
};

const TEXT = {
    RED: '#D71920',
    RED_DARK: '#A90000',
    RED_DEEP: '#760000',

    WHITE: '#FFFFFF',
    CREAM: '#FFF8F2',

    BLACK: '#111111',
    GRAY: '#777777',

    YELLOW: '#FFD43B'
};


/*
|--------------------------------------------------------------------------
| RESULTS SCENE
|--------------------------------------------------------------------------
*/

class Results extends Phaser.Scene {

    constructor() {
        super('Results');

        this.buttonTweens = [];
    }

    create(data = {}) {

        const {
            width,
            height
        } = this.scale;

        /*
        |--------------------------------------------------------------------------
        | SCORE DATA
        |--------------------------------------------------------------------------
        */

        const score = Math.max(
            0,
            Number(data.score || 0)
        );

        const ordersServed = Math.max(
            0,
            Number(data.ordersServed || 0)
        );

        const totalOrders = Math.max(
            1,
            Number(data.totalOrders || 8)
        );

        const finalCombo = Math.max(
            0,
            Number(data.finalCombo || 0)
        );

        /*
        |--------------------------------------------------------------------------
        | EMPLOYEE LEVEL
        |--------------------------------------------------------------------------
        */

        const employee = getEmployeeLevel(score);

        const nextEmployee = getNextEmployeeLevel(score);

        const pointsToNext = getPointsToNextLevel(score);

        const levelProgress = getLevelProgress(score);

        /*
        |--------------------------------------------------------------------------
        | BACKGROUND
        |--------------------------------------------------------------------------
        */

        this.cameras.main.setBackgroundColor(
            TEXT.RED
        );

        this.createBackground(
            width,
            height
        );

        /*
        |--------------------------------------------------------------------------
        | HEADER
        |--------------------------------------------------------------------------
        */

        this.createHeader(
            width,
            height
        );

        /*
        |--------------------------------------------------------------------------
        | EMPLOYEE BADGE
        |--------------------------------------------------------------------------
        */

        this.createEmployeeBadge(
            width,
            height,
            employee
        );

        /*
        |--------------------------------------------------------------------------
        | SCORE
        |--------------------------------------------------------------------------
        */

        this.createScoreCard(
            width,
            height,
            score
        );

        /*
        |--------------------------------------------------------------------------
        | STATS
        |--------------------------------------------------------------------------
        */

        this.createStats(
            width,
            height,
            ordersServed,
            totalOrders,
            finalCombo
        );

        /*
        |--------------------------------------------------------------------------
        | PROGRESSION
        |--------------------------------------------------------------------------
        */

        this.createProgress(
            width,
            height,
            score,
            employee,
            nextEmployee,
            pointsToNext,
            levelProgress
        );

        /*
        |--------------------------------------------------------------------------
        | SOCIAL CHALLENGE
        |--------------------------------------------------------------------------
        */

        this.createSocialChallenge(
            width,
            height,
            score
        );

        /*
        |--------------------------------------------------------------------------
        | BUTTONS
        |--------------------------------------------------------------------------
        */

        this.createButtons(
            width,
            height,
            score
        );

        /*
        |--------------------------------------------------------------------------
        | FOOTER
        |--------------------------------------------------------------------------
        */

        this.createFooter(
            width,
            height
        );

        /*
        |--------------------------------------------------------------------------
        | ENTRANCE
        |--------------------------------------------------------------------------
        */

        this.cameras.main.fadeIn(
            450,
            0,
            0,
            0
        );
    }


    /*
    |--------------------------------------------------------------------------
    | BACKGROUND
    |--------------------------------------------------------------------------
    */

    createBackground(width, height) {

        // Main red background

        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            COLORS.RED
        );

        // Top-right graphic

        this.add.circle(
            width + 100,
            -80,
            300,
            COLORS.WHITE,
            0.055
        );

        this.add.circle(
            width + 40,
            80,
            190,
            COLORS.RED_DARK,
            0.35
        );

        // Bottom-left graphic

        this.add.circle(
            -100,
            height + 80,
            350,
            COLORS.WHITE,
            0.045
        );

        // Decorative small circles

        this.add.circle(
            width * 0.08,
            height * 0.18,
            20,
            COLORS.WHITE,
            0.075
        );

        this.add.circle(
            width * 0.91,
            height * 0.34,
            25,
            COLORS.WHITE,
            0.06
        );

        // Diagonal brand stripe

        const stripe = this.add.rectangle(
            width / 2,
            height * 0.48,
            width * 1.8,
            100,
            COLORS.WHITE,
            0.025
        );

        stripe.setAngle(-28);

        // Bottom deep-red area

        this.add.rectangle(
            width / 2,
            height - 100,
            width,
            200,
            COLORS.RED_DEEP,
            0.25
        );
    }


    /*
    |--------------------------------------------------------------------------
    | HEADER
    |--------------------------------------------------------------------------
    */

    createHeader(width, height) {

        this.add.text(
            width / 2,
            70,
            'WAFFLE HAHZ',
            {
                fontFamily: 'Cooper Black',
                fontSize: 82,
                color: TEXT.WHITE,
                stroke: TEXT.RED_DEEP,
                strokeThickness: 9
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            145,
            'SHIFT COMPLETE',
            {
                fontFamily: 'Cooper Black',
                fontSize: 38,
                color: TEXT.YELLOW,
                stroke: TEXT.RED_DEEP,
                strokeThickness: 5
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            195,
            'YOUR KITCHEN PERFORMANCE',
            {
                fontFamily: 'Arial',
                fontSize: 19,
                fontStyle: 'bold',
                color: TEXT.WHITE,
                letterSpacing: 3
            }
        ).setOrigin(0.5);
    }


    /*
    |--------------------------------------------------------------------------
    | EMPLOYEE BADGE
    |--------------------------------------------------------------------------
    */

    createEmployeeBadge(
        width,
        height,
        employee
    ) {

        const badgeY = 300;

        // Shadow

        this.add.rectangle(
            width / 2,
            badgeY + 9,
            850,
            150,
            COLORS.RED_DEEP
        );

        // Badge

        const badge = this.add.rectangle(
            width / 2,
            badgeY,
            850,
            150,
            COLORS.CREAM
        );

        badge.setStrokeStyle(
            5,
            COLORS.WHITE
        );

        // Level circle

        this.add.circle(
            width / 2 - 325,
            badgeY,
            48,
            COLORS.RED
        ).setStrokeStyle(
            4,
            COLORS.RED_DEEP
        );

        this.add.text(
            width / 2 - 325,
            badgeY,
            String(employee.level),
            {
                fontFamily: 'Cooper Black',
                fontSize: 38,
                color: TEXT.WHITE
            }
        ).setOrigin(0.5);

        // Employee label

        this.add.text(
            width / 2 - 250,
            badgeY - 30,
            'EMPLOYEE LEVEL',
            {
                fontFamily: 'Arial',
                fontSize: 17,
                fontStyle: 'bold',
                color: TEXT.GRAY,
                letterSpacing: 2
            }
        ).setOrigin(0, 0.5);

        // Employee title

        this.add.text(
            width / 2 - 250,
            badgeY + 20,
            employee.title,
            {
                fontFamily: 'Cooper Black',
                fontSize: 35,
                color: TEXT.RED
            }
        ).setOrigin(0, 0.5);
    }


    /*
    |--------------------------------------------------------------------------
    | SCORE CARD
    |--------------------------------------------------------------------------
    */

    createScoreCard(
        width,
        height,
        score
    ) {

        const cardY = 530;

        // Shadow

        this.add.rectangle(
            width / 2,
            cardY + 10,
            850,
            330,
            COLORS.RED_DEEP
        );

        // Card

        this.add.rectangle(
            width / 2,
            cardY,
            850,
            330,
            COLORS.CREAM
        ).setStrokeStyle(
            6,
            COLORS.WHITE
        );

        // Label

        this.add.text(
            width / 2,
            cardY - 95,
            'FINAL SCORE',
            {
                fontFamily: 'Arial',
                fontSize: 22,
                fontStyle: 'bold',
                color: TEXT.GRAY,
                letterSpacing: 4
            }
        ).setOrigin(0.5);

        // Score

        this.add.text(
            width / 2,
            cardY + 10,
            score.toLocaleString(),
            {
                fontFamily: 'Cooper Black',
                fontSize: 105,
                color: TEXT.RED,
                stroke: TEXT.BLACK,
                strokeThickness: 4
            }
        ).setOrigin(0.5);

        // Points

        this.add.text(
            width / 2,
            cardY + 105,
            'POINTS',
            {
                fontFamily: 'Cooper Black',
                fontSize: 27,
                color: TEXT.BLACK
            }
        ).setOrigin(0.5);
    }


    /*
    |--------------------------------------------------------------------------
    | STATS
    |--------------------------------------------------------------------------
    */

    createStats(
        width,
        height,
        ordersServed,
        totalOrders,
        finalCombo
    ) {

        const statY = 750;

        // Orders

        this.add.text(
            width / 2 - 220,
            statY,
            `${ordersServed}/${totalOrders}`,
            {
                fontFamily: 'Cooper Black',
                fontSize: 46,
                color: TEXT.YELLOW,
                stroke: TEXT.BLACK,
                strokeThickness: 3
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2 - 220,
            statY + 55,
            'ORDERS SERVED',
            {
                fontFamily: 'Arial',
                fontSize: 16,
                fontStyle: 'bold',
                color: TEXT.WHITE,
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        // Divider

        this.add.rectangle(
            width / 2,
            statY + 15,
            3,
            100,
            COLORS.WHITE,
            0.35
        );

        // Combo

        this.add.text(
            width / 2 + 220,
            statY,
            `${finalCombo}X`,
            {
                fontFamily: 'Cooper Black',
                fontSize: 46,
                color: TEXT.YELLOW,
                stroke: TEXT.BLACK,
                strokeThickness: 3
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2 + 220,
            statY + 55,
            'BEST COMBO',
            {
                fontFamily: 'Arial',
                fontSize: 16,
                fontStyle: 'bold',
                color: TEXT.WHITE,
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }


    /*
    |--------------------------------------------------------------------------
    | EMPLOYEE PROGRESS
    |--------------------------------------------------------------------------
    */

    createProgress(
        width,
        height,
        score,
        employee,
        nextEmployee,
        pointsToNext,
        levelProgress
    ) {

        const progressY = 900;

        this.add.text(
            width / 2,
            progressY,
            employee.level === 5
                ? 'YOU HAVE REACHED THE TOP'
                : 'NEXT EMPLOYEE LEVEL',
            {
                fontFamily: 'Cooper Black',
                fontSize: 27,
                color: TEXT.WHITE,
                stroke: TEXT.RED_DEEP,
                strokeThickness: 4
            }
        ).setOrigin(0.5);

        if (!nextEmployee) {

            this.add.text(
                width / 2,
                progressY + 55,
                'WAFFLE HAHZ MASTER',
                {
                    fontFamily: 'Cooper Black',
                    fontSize: 34,
                    color: TEXT.YELLOW,
                    stroke: TEXT.BLACK,
                    strokeThickness: 3
                }
            ).setOrigin(0.5);

            return;
        }

        // Next title

        this.add.text(
            width / 2,
            progressY + 55,
            nextEmployee.title,
            {
                fontFamily: 'Cooper Black',
                fontSize: 31,
                color: TEXT.YELLOW,
                stroke: TEXT.RED_DEEP,
                strokeThickness: 3
            }
        ).setOrigin(0.5);

        // Progress background

        const barX = width / 2;
        const barY = progressY + 120;
        const barWidth = 780;
        const barHeight = 32;

        this.add.rectangle(
            barX,
            barY,
            barWidth,
            barHeight,
            COLORS.RED_DEEP
        ).setStrokeStyle(
            3,
            COLORS.WHITE
        );

        // Progress fill

        const fillWidth =
            Math.max(
                0,
                Math.min(
                    barWidth,
                    barWidth * levelProgress
                )
            );

        if (fillWidth > 0) {

            this.add.rectangle(
                barX - barWidth / 2 + fillWidth / 2,
                barY,
                fillWidth,
                barHeight,
                COLORS.YELLOW
            );
        }

        this.add.text(
            width / 2,
            barY + 55,
            `${pointsToNext.toLocaleString()} POINTS TO GO`,
            {
                fontFamily: 'Arial',
                fontSize: 17,
                fontStyle: 'bold',
                color: TEXT.WHITE,
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }


    /*
    |--------------------------------------------------------------------------
    | SOCIAL CHALLENGE
    |--------------------------------------------------------------------------
    */

    createSocialChallenge(
        width,
        height,
        score
    ) {

        const challengeY = 1115;

        this.add.text(
            width / 2,
            challengeY,
            'CAN YOU BEAT THIS?',
            {
                fontFamily: 'Cooper Black',
                fontSize: 39,
                color: TEXT.WHITE,
                stroke: TEXT.RED_DEEP,
                strokeThickness: 5
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            challengeY + 55,
            'POST YOUR SCORE • TAG @WAFFLEHAHZ',
            {
                fontFamily: 'Arial',
                fontSize: 18,
                fontStyle: 'bold',
                color: TEXT.WHITE,
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }


    /*
    |--------------------------------------------------------------------------
    | BUTTONS
    |--------------------------------------------------------------------------
    */

    createButtons(
        width,
        height,
        score
    ) {

        // Follow

        const followButton =
            this.createButton(
                width / 2,
                1285,
                820,
                88,
                COLORS.WHITE,
                TEXT.BLACK,
                'FOLLOW @WAFFLEHAHZ'
            );

        followButton.on(
            'pointerdown',
            () => {

                window.open(
                    'https://x.com/WaffleHahz',
                    '_blank',
                    'noopener,noreferrer'
                );
            }
        );

        // Post

        const postButton =
            this.createButton(
                width / 2,
                1400,
                820,
                88,
                COLORS.YELLOW,
                TEXT.BLACK,
                'POST MY SCORE'
            );

        postButton.on(
            'pointerdown',
            () => {

                const postText =
                    encodeURIComponent(
                        `I scored ${score.toLocaleString()} in the WAFFLE HAHZ GAME! 🧇🔥\n\nCan you beat my score?\n\n@WaffleHahz #WaffleHahz`
                    );

                window.open(
                    `https://twitter.com/intent/tweet?text=${postText}`,
                    '_blank',
                    'noopener,noreferrer'
                );
            }
        );

        // Play Again

        const playAgain =
            this.createButton(
                width / 2,
                1515,
                820,
                88,
                COLORS.RED_DEEP,
                TEXT.WHITE,
                'PLAY AGAIN'
            );

        playAgain.on(
            'pointerdown',
            () => {

                this.scene.start(
                    'Grill'
                );
            }
        );

        // Back to training

        const training =
            this.add.text(
                width / 2,
                1635,
                '← BACK TO TRAINING',
                {
                    fontFamily: 'Cooper Black',
                    fontSize: 23,
                    color: TEXT.WHITE
                }
            )
            .setOrigin(0.5)
            .setInteractive({
                useHandCursor: true
            });

        training.on(
            'pointerover',
            () => {
                training.setColor(
                    TEXT.YELLOW
                );
            }
        );

        training.on(
            'pointerout',
            () => {
                training.setColor(
                    TEXT.WHITE
                );
            }
        );

        training.on(
            'pointerdown',
            () => {

                this.scene.start(
                    'GrillInstructions'
                );
            }
        );
    }


    /*
    |--------------------------------------------------------------------------
    | BUTTON CREATOR
    |--------------------------------------------------------------------------
    */

    createButton(
        x,
        y,
        width,
        height,
        fill,
        textColor,
        label
    ) {

        // Shadow

        this.add.rectangle(
            x,
            y + 8,
            width,
            height,
            COLORS.RED_DEEP
        );

        // Button

        const button =
            this.add.rectangle(
                x,
                y,
                width,
                height,
                fill
            );

        button
            .setStrokeStyle(
                5,
                COLORS.BLACK
            )
            .setInteractive({
                useHandCursor: true
            });

        // Text

        const text =
            this.add.text(
                x,
                y,
                label,
                {
                    fontFamily: 'Cooper Black',
                    fontSize: 29,
                    color: textColor
                }
            ).setOrigin(0.5);

        // Hover

        button.on(
            'pointerover',
            () => {

                button.setScale(
                    1.025
                );

                text.setScale(
                    1.025
                );
            }
        );

        button.on(
            'pointerout',
            () => {

                button.setScale(
                    1
                );

                text.setScale(
                    1
                );
            }
        );

        // Press animation

        button.on(
            'pointerdown',
            () => {

                this.tweens.add({
                    targets: [
                        button,
                        text
                    ],

                    scaleX: 0.97,
                    scaleY: 0.97,

                    duration: 70,

                    yoyo: true
                });
            }
        );

        return button;
    }


    /*
    |--------------------------------------------------------------------------
    | FOOTER
    |--------------------------------------------------------------------------
    */

    createFooter(
        width,
        height
    ) {

        this.add.text(
            width / 2,
            1775,
            'LEARN IT  •  BUILD IT  •  SERVE IT',
            {
                fontFamily: 'Arial',
                fontSize: 16,
                fontStyle: 'bold',
                color: TEXT.WHITE,
                alpha: 0.75,
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            1815,
            'THE HOUSE ALTERNATIVE™',
            {
                fontFamily: 'Cooper Black',
                fontSize: 19,
                color: TEXT.YELLOW,
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }


    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    shutdown() {

        this.buttonTweens.forEach(
            tween => {

                if (tween) {
                    tween.stop();
                }
            }
        );

        this.buttonTweens = [];
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

        autoCenter:
            Phaser.Scale.CENTER_BOTH,

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

    input: {
        activePointers: 3
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

window.addEventListener(
    'load',
    () => {

        const gameContainer =
            document.getElementById(
                'game'
            );

        if (!gameContainer) {

            console.error(
                'WAFFLE HAHZ: #game container not found.'
            );

            return;
        }

        new Phaser.Game(
            config
        );
    }
);
