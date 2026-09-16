// src/game/scenes/Results.js

import * as Phaser from 'phaser';

const COLORS = {
    RED: 0xD71920,
    RED_DARK: 0xA90000,
    RED_DEEP: 0x760000,

    WHITE: 0xFFFFFF,
    OFF_WHITE: 0xFFF8F2,

    BLACK: 0x111111,
    GRAY: 0x777777,

    YELLOW: 0xFFD43B,
    GREEN: 0x35D06F
};

export default class Results extends Phaser.Scene {
    constructor() {
        super('Results');
    }

    create(data = {}) {
        const { width, height } = this.scale;

        // ========================================================
        // DATA
        // ========================================================

        const score = Number(data.score || 0);

        // Support both the new and old Grill.js property names
        const ordersServed = Number(
            data.ordersServed ??
            data.orders ??
            0
        );

        const totalOrders = Number(
            data.totalOrders ??
            8
        );

        const finalCombo = Number(
            data.finalCombo ??
            data.combo ??
            0
        );

        // ========================================================
        // GRADE
        // ========================================================

        let grade = 'KEEP TRAINING';
        let gradeSubtext = 'THE KITCHEN IS WAITING.';
        let gradeColor = '#FFFFFF';

        if (score >= 9000) {
            grade = 'HAHZ CERTIFIED';
            gradeSubtext = 'YOU OWN THE KITCHEN.';
            gradeColor = '#FFD43B';
        } else if (score >= 7000) {
            grade = 'KITCHEN READY';
            gradeSubtext = 'YOU KNOW YOUR BUILDS.';
            gradeColor = '#FFFFFF';
        } else if (score >= 4500) {
            grade = 'GETTING HOT';
            gradeSubtext = 'KEEP THE HEAT ON.';
            gradeColor = '#FFD43B';
        }

        // ========================================================
        // BACKGROUND
        // ========================================================

        this.cameras.main.setBackgroundColor('#D71920');

        this.createBackground(width, height);

        // ========================================================
        // HEADER
        // ========================================================

        this.createHeader(width);

        // ========================================================
        // RESULT HERO
        // ========================================================

        this.createResultHero(
            width,
            grade,
            gradeSubtext,
            gradeColor
        );

        // ========================================================
        // SCORE CARD
        // ========================================================

        this.createScoreCard(
            width,
            score,
            ordersServed,
            totalOrders,
            finalCombo
        );

        // ========================================================
        // SOCIAL
        // ========================================================

        this.createSocialSection(
            width,
            score
        );

        // ========================================================
        // NAVIGATION
        // ========================================================

        this.createNavigation(
            width
        );

        // ========================================================
        // FOOTER
        // ========================================================

        this.createFooter(
            width,
            height
        );
    }

    // ============================================================
    // BACKGROUND
    // ============================================================

    createBackground(width, height) {
        // Top-right circle
        this.add.circle(
            width + 50,
            -40,
            280,
            COLORS.WHITE,
            0.055
        );

        // Bottom-left circle
        this.add.circle(
            -90,
            height + 40,
            330,
            COLORS.WHITE,
            0.045
        );

        // Decorative circles
        this.add.circle(
            55,
            330,
            25,
            COLORS.WHITE,
            0.055
        );

        this.add.circle(
            width - 55,
            760,
            20,
            COLORS.WHITE,
            0.05
        );

        // Diagonal brand stripe
        const stripe = this.add.rectangle(
            width / 2,
            height / 2,
            width * 1.5,
            110,
            COLORS.WHITE,
            0.025
        );

        stripe.setAngle(-28);
        stripe.setDepth(-10);
    }

    // ============================================================
    // HEADER
    // ============================================================

    createHeader(width) {
        this.add.text(
            42,
            35,
            'WAFFLE',
            {
                fontFamily: 'Arial Black',
                fontSize: 43,
                fontStyle: 'bold',
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 5
            }
        );

        this.add.text(
            42,
            80,
            'HAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: 43,
                fontStyle: 'bold',
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 5
            }
        );

        const badge = this.add.rectangle(
            width - 155,
            78,
            250,
            82,
            18
        );

        badge
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(
                4,
                COLORS.RED_DEEP
            );

        this.add.text(
            width - 155,
            57,
            'GAME OVER',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#D71920',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        this.add.text(
            width - 155,
            94,
            'TRAINING COMPLETE',
            {
                fontFamily: 'Arial Black',
                fontSize: 13,
                color: '#111111'
            }
        ).setOrigin(0.5);
    }

    // ============================================================
    // RESULT HERO
    // ============================================================

    createResultHero(
        width,
        grade,
        gradeSubtext,
        gradeColor
    ) {
        // Eyebrow
        this.add.text(
            width / 2,
            205,
            'YOUR KITCHEN RESULT',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#FFFFFF',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        // Main grade
        this.add.text(
            width / 2,
            260,
            grade,
            {
                fontFamily: 'Arial Black',
                fontSize: 48,
                color: gradeColor,
                align: 'center',
                stroke: '#760000',
                strokeThickness: 4,
                wordWrap: {
                    width: width - 100
                }
            }
        ).setOrigin(0.5);

        // Subtext
        this.add.text(
            width / 2,
            320,
            gradeSubtext,
            {
                fontFamily: 'Arial',
                fontSize: 20,
                fontStyle: 'bold',
                color: '#FFFFFF',
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        // Certification badge for high scores
        if (grade === 'HAHZ CERTIFIED') {
            const badge = this.add.rectangle(
                width / 2,
                370,
                330,
                55,
                14
            );

            badge
                .setFillStyle(COLORS.YELLOW)
                .setStrokeStyle(
                    4,
                    COLORS.RED_DEEP
                );

            this.add.text(
                width / 2,
                370,
                '★ HAHZ CERTIFIED ★',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 20,
                    color: '#111111'
                }
            ).setOrigin(0.5);
        }
    }

    // ============================================================
    // SCORE CARD
    // ============================================================

    createScoreCard(
        width,
        score,
        ordersServed,
        totalOrders,
        finalCombo
    ) {
        const cardY = 575;

        const card = this.add.rectangle(
            width / 2,
            cardY,
            width - 70,
            345,
            28
        );

        card
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(
                6,
                COLORS.RED_DEEP
            );

        // Label
        this.add.text(
            width / 2,
            cardY - 128,
            'FINAL SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: 19,
                color: '#D71920',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        // Score
        this.add.text(
            width / 2,
            cardY - 62,
            score.toLocaleString(),
            {
                fontFamily: 'Arial Black',
                fontSize: 72,
                color: '#111111'
            }
        ).setOrigin(0.5);

        // Divider
        this.add.rectangle(
            width / 2,
            cardY + 10,
            width - 150,
            3,
            COLORS.LIGHT_GRAY
        );

        // Stats
        this.createStat(
            width / 2 - 190,
            cardY + 75,
            ordersServed,
            totalOrders,
            'ORDERS SERVED'
        );

        this.createStat(
            width / 2 + 190,
            cardY + 75,
            `${finalCombo}X`,
            null,
            'BEST COMBO'
        );
    }

    // ============================================================
    // STAT
    // ============================================================

    createStat(
        x,
        y,
        value,
        total,
        label
    ) {
        const valueText =
            total !== null
                ? `${value} / ${total}`
                : String(value);

        this.add.text(
            x,
            y,
            valueText,
            {
                fontFamily: 'Arial Black',
                fontSize: 29,
                color: '#D71920'
            }
        ).setOrigin(0.5);

        this.add.text(
            x,
            y + 39,
            label,
            {
                fontFamily: 'Arial Black',
                fontSize: 13,
                color: '#777777',
                letterSpacing: 1
            }
        ).setOrigin(0.5);
    }

    // ============================================================
    // SOCIAL SECTION
    // ============================================================

    createSocialSection(
        width,
        score
    ) {
        const panelY = 850;

        const panel = this.add.rectangle(
            width / 2,
            panelY,
            width - 70,
            300,
            28
        );

        panel
            .setFillStyle(
                COLORS.RED_DEEP,
                0.95
            )
            .setStrokeStyle(
                5,
                COLORS.WHITE
            );

        this.add.text(
            width / 2,
            panelY - 105,
            'SHOW US YOUR SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: 29,
                color: '#FFFFFF',
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            panelY - 55,
            'CAN YOU BEAT IT?',
            {
                fontFamily: 'Arial Black',
                fontSize: 25,
                color: '#FFD43B'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            panelY - 12,
            'FOLLOW @WAFFLEHAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: 20,
                color: '#FFFFFF'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            panelY + 22,
            'POST YOUR SCORE WITH #WAFFLEHAHZ',
            {
                fontFamily: 'Arial',
                fontSize: 16,
                fontStyle: 'bold',
                color: '#FFFFFF',
                alpha: 0.85
            }
        ).setOrigin(0.5);

        // Follow button
        this.followButton = this.add.rectangle(
            width / 2 - 185,
            panelY + 92,
            330,
            65,
            16
        );

        this.followButton
            .setFillStyle(
                COLORS.WHITE
            )
            .setStrokeStyle(
                3,
                COLORS.WHITE
            )
            .setInteractive({
                useHandCursor: true
            });

        this.followText =
            this.add.text(
                width / 2 - 185,
                panelY + 92,
                'FOLLOW @WAFFLEHAHZ',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 18,
                    color: '#D71920'
                }
            ).setOrigin(0.5);

        this.followButton.on(
            'pointerover',
            () => {
                this.followButton
                    .setFillStyle(
                        COLORS.OFF_WHITE
                    )
                    .setScale(1.02);
            }
        );

        this.followButton.on(
            'pointerout',
            () => {
                this.followButton
                    .setFillStyle(
                        COLORS.WHITE
                    )
                    .setScale(1);
            }
        );

        this.followButton.on(
            'pointerdown',
            () => {
                window.open(
                    'https://x.com/WaffleHahz',
                    '_blank',
                    'noopener,noreferrer'
                );
            }
        );

        // Post button
        this.postButton = this.add.rectangle(
            width / 2 + 185,
            panelY + 92,
            330,
            65,
            16
        );

        this.postButton
            .setFillStyle(
                COLORS.YELLOW
            )
            .setStrokeStyle(
                3,
                COLORS.WHITE
            )
            .setInteractive({
                useHandCursor: true
            });

        this.postText =
            this.add.text(
                width / 2 + 185,
                panelY + 92,
                'POST MY SCORE',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 20,
                    color: '#111111'
                }
            ).setOrigin(0.5);

        this.postButton.on(
            'pointerover',
            () => {
                this.postButton
                    .setFillStyle(
                        COLORS.WHITE
                    )
                    .setScale(1.02);

                this.postText.setColor(
                    '#D71920'
                );
            }
        );

        this.postButton.on(
            'pointerout',
            () => {
                this.postButton
                    .setFillStyle(
                        COLORS.YELLOW
                    )
                    .setScale(1);

                this.postText.setColor(
                    '#111111'
                );
            }
        );

        this.postButton.on(
            'pointerdown',
            () => {
                const post = encodeURIComponent(
                    `I scored ${score.toLocaleString()} in the WAFFLE HAHZ GAME! 🧇🔥\n\nCan you beat my score?\n\n@WaffleHahz #WaffleHahz`
                );

                window.open(
                    `https://twitter.com/intent/tweet?text=${post}`,
                    '_blank',
                    'noopener,noreferrer'
                );
            }
        );
    }

    // ============================================================
    // NAVIGATION
    // ============================================================

    createNavigation(width) {
        const y = 1235;

        // Play again
        const playAgain = this.add.rectangle(
            width / 2,
            y,
            width - 90,
            95,
            20
        );

        playAgain
            .setFillStyle(
                COLORS.WHITE
            )
            .setStrokeStyle(
                4,
                COLORS.RED_DEEP
            )
            .setInteractive({
                useHandCursor: true
            });

        this.add.text(
            width / 2,
            y - 10,
            'PLAY AGAIN',
            {
                fontFamily: 'Arial Black',
                fontSize: 31,
                color: '#D71920'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            y + 27,
            'RUN IT BACK',
            {
                fontFamily: 'Arial',
                fontSize: 13,
                fontStyle: 'bold',
                color: '#777777',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        playAgain.on(
            'pointerover',
            () => {
                playAgain.setScale(1.02);
            }
        );

        playAgain.on(
            'pointerout',
            () => {
                playAgain.setScale(1);
            }
        );

        playAgain.on(
            'pointerdown',
            () => {
                this.scene.start('Grill');
            }
        );

        // Home
        const home = this.add.text(
            width / 2,
            y + 100,
            '← BACK TO START',
            {
                fontFamily: 'Arial Black',
                fontSize: 19,
                color: '#FFFFFF',
                letterSpacing: 1
            }
        )
        .setOrigin(0.5)
        .setInteractive({
            useHandCursor: true
        });

        home.on(
            'pointerover',
            () => {
                home.setColor('#FFD43B');
            }
        );

        home.on(
            'pointerout',
            () => {
                home.setColor('#FFFFFF');
            }
        );

        home.on(
            'pointerdown',
            () => {
                this.scene.start('Title');
            }
        );
    }

    // ============================================================
    // FOOTER
    // ============================================================

    createFooter(width, height) {
        this.add.text(
            width / 2,
            height - 75,
            'WAFFLE HAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: 18,
                color: '#FFFFFF',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            height - 42,
            'THE HOUSE ALTERNATIVE',
            {
                fontFamily: 'Arial',
                fontSize: 12,
                fontStyle: 'bold',
                color: '#FFFFFF',
                alpha: 0.6,
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }
}
