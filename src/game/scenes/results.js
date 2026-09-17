import * as Phaser from 'phaser';

const COLORS = {
    RED: 0xD71920,
    RED_DARK: 0xA90000,
    RED_DEEP: 0x760000,

    WHITE: 0xFFFFFF,
    OFF_WHITE: 0xFFF8F2,

    BLACK: 0x111111,
    GRAY: 0x777777,
    LIGHT_GRAY: 0xEEEEEE,

    YELLOW: 0xFFD43B,
    GREEN: 0x35D06F
};

export default class Results extends Phaser.Scene {
    constructor() {
        super('Results');
    }

    create(data = {}) {
        const { width, height } = this.scale;

        this.score = Number(data.score || 0);
        this.ordersServed = Number(
            data.ordersServed ??
            data.orders ??
            0
        );

        this.totalOrders = Number(
            data.totalOrders ??
            8
        );

        this.finalCombo = Number(
            data.finalCombo ??
            data.combo ??
            0
        );

        this.bestCombo = Number(
            data.bestCombo ??
            this.finalCombo
        );

        this.mistakes = Number(
            data.mistakes || 0
        );

        this.accuracy = Number(
            data.accuracy || 0
        );

        this.satisfaction = Number(
            data.satisfaction ?? 100
        );

        this.level = Number(
            data.level || 1
        );

        this.xp = Number(
            data.xp || 0
        );

        const gradeData =
            this.getGrade(this.score);

        this.cameras.main.setBackgroundColor(
            '#D71920'
        );

        this.createBackground(width, height);
        this.createHeader(width);
        this.createHero(
            width,
            gradeData
        );
        this.createScoreCard(width);
        this.createPerformanceCard(width);
        this.createSocialSection(width);
        this.createNavigation(width);
        this.createFooter(width, height);

        this.cameras.main.fadeIn(
            400,
            0,
            0,
            0
        );
    }

    getGrade(score) {
        if (score >= 10000) {
            return {
                title: 'HAHZ CERTIFIED',
                subtitle: 'YOU OWN THE KITCHEN.',
                color: '#FFD43B'
            };
        }

        if (score >= 7500) {
            return {
                title: 'KITCHEN READY',
                subtitle: 'YOU KNOW YOUR BUILDS.',
                color: '#FFFFFF'
            };
        }

        if (score >= 5000) {
            return {
                title: 'GETTING HOT',
                subtitle: 'KEEP THE HEAT ON.',
                color: '#FFD43B'
            };
        }

        return {
            title: 'KEEP TRAINING',
            subtitle: 'THE KITCHEN IS WAITING.',
            color: '#FFFFFF'
        };
    }

    createBackground(width, height) {
        this.add.circle(
            width + 50,
            -40,
            280,
            COLORS.WHITE,
            0.055
        );

        this.add.circle(
            -90,
            height + 40,
            330,
            COLORS.WHITE,
            0.045
        );

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

    createHeader(width) {
        this.add.text(
            38,
            32,
            'WAFFLE',
            {
                fontFamily: 'Arial Black',
                fontSize: 39,
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 5
            }
        );

        this.add.text(
            38,
            73,
            'HAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: 39,
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 5
            }
        );

        const badge = this.add.rectangle(
            width - 145,
            72,
            230,
            76,
            16
        );

        badge
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(
                4,
                COLORS.RED_DEEP
            );

        this.add.text(
            width - 145,
            52,
            'TRAINING COMPLETE',
            {
                fontFamily: 'Arial Black',
                fontSize: 13,
                color: '#D71920',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.add.text(
            width - 145,
            82,
            `LEVEL ${this.level}`,
            {
                fontFamily: 'Arial Black',
                fontSize: 19,
                color: '#111111'
            }
        ).setOrigin(0.5);
    }

    createHero(width, gradeData) {
        this.add.text(
            width / 2,
            178,
            'YOUR KITCHEN RESULT',
            {
                fontFamily: 'Arial Black',
                fontSize: 16,
                color: '#FFFFFF',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        const grade = this.add.text(
            width / 2,
            235,
            gradeData.title,
            {
                fontFamily: 'Arial Black',
                fontSize: 43,
                color: gradeData.color,
                stroke: '#760000',
                strokeThickness: 4,
                align: 'center',
                wordWrap: {
                    width: width - 80
                }
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: grade,
            scaleX: 1.03,
            scaleY: 1.03,
            duration: 850,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.add.text(
            width / 2,
            292,
            gradeData.subtitle,
            {
                fontFamily: 'Arial Black',
                fontSize: 18,
                color: '#FFFFFF'
            }
        ).setOrigin(0.5);

        if (gradeData.title === 'HAHZ CERTIFIED') {
            const badge = this.add.rectangle(
                width / 2,
                340,
                300,
                50,
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
                340,
                '★ HAHZ CERTIFIED ★',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 18,
                    color: '#111111'
                }
            ).setOrigin(0.5);
        }
    }

    createScoreCard(width) {
        const cardY = 485;

        const card = this.add.rectangle(
            width / 2,
            cardY,
            width - 70,
            255,
            24
        );

        card
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(
                6,
                COLORS.RED_DEEP
            );

        this.add.text(
            width / 2,
            cardY - 92,
            'FINAL SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#D71920',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        this.scoreText = this.add.text(
            width / 2,
            cardY - 28,
            '0',
            {
                fontFamily: 'Arial Black',
                fontSize: 62,
                color: '#111111'
            }
        ).setOrigin(0.5);

        this.tweens.addCounter({
            from: 0,
            to: this.score,
            duration: 900,
            ease: 'Cubic.easeOut',
            onUpdate: tween => {
                const value =
                    Math.floor(
                        tween.getValue()
                    );

                this.scoreText.setText(
                    value.toLocaleString()
                );
            }
        });

        this.add.rectangle(
            width / 2,
            cardY + 25,
            width - 140,
            2,
            COLORS.LIGHT_GRAY
        );

        this.createStat(
            width / 2 - 180,
            cardY + 72,
            `${this.ordersServed}/${this.totalOrders}`,
            'ORDERS'
        );

        this.createStat(
            width / 2,
            cardY + 72,
            `${this.bestCombo}X`,
            'BEST COMBO'
        );

        this.createStat(
            width / 2 + 180,
            cardY + 72,
            `${this.accuracy}%`,
            'ACCURACY'
        );
    }

    createStat(x, y, value, label) {
        this.add.text(
            x,
            y,
            value,
            {
                fontFamily: 'Arial Black',
                fontSize: 25,
                color: '#D71920'
            }
        ).setOrigin(0.5);

        this.add.text(
            x,
            y + 34,
            label,
            {
                fontFamily: 'Arial Black',
                fontSize: 10,
                color: '#777777',
                letterSpacing: 1
            }
        ).setOrigin(0.5);
    }

    createPerformanceCard(width) {
        const y = 700;

        const card = this.add.rectangle(
            width / 2,
            y,
            width - 70,
            180,
            22
        );

        card
            .setFillStyle(
                COLORS.RED_DEEP,
                0.95
            )
            .setStrokeStyle(
                4,
                COLORS.WHITE
            );

        this.add.text(
            width / 2,
            y - 62,
            'KITCHEN PERFORMANCE',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#FFFFFF',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.createPerformanceStat(
            width / 2 - 175,
            y + 4,
            `${this.mistakes}`,
            'MISTAKES'
        );

        this.createPerformanceStat(
            width / 2,
            y + 4,
            `${this.satisfaction}%`,
            'CUSTOMER SATISFACTION'
        );

        this.createPerformanceStat(
            width / 2 + 175,
            y + 4,
            `${this.xp}`,
            'XP EARNED'
        );

        this.add.text(
            width / 2,
            y + 55,
            this.getTip(),
            {
                fontFamily: 'Arial',
                fontSize: 13,
                fontStyle: 'bold',
                color: '#FFFFFF',
                align: 'center',
                wordWrap: {
                    width: width - 110
                }
            }
        ).setOrigin(0.5);
    }

    createPerformanceStat(
        x,
        y,
        value,
        label
    ) {
        this.add.text(
            x,
            y,
            value,
            {
                fontFamily: 'Arial Black',
                fontSize: 22,
                color: '#FFD43B'
            }
        ).setOrigin(0.5);

        this.add.text(
            x,
            y + 30,
            label,
            {
                fontFamily: 'Arial Black',
                fontSize: 9,
                color: '#FFFFFF',
                letterSpacing: 1,
                align: 'center'
            }
        ).setOrigin(0.5);
    }

    getTip() {
        if (this.accuracy >= 90 && this.bestCombo >= 4) {
            return 'ELITE BUILDING. NOW CHASE A HIGHER SCORE.';
        }

        if (this.accuracy >= 75) {
            return 'YOUR BUILDS ARE DIALED IN. SPEED IS THE NEXT LEVEL.';
        }

        if (this.mistakes > 2) {
            return 'SLOW DOWN FOR A SECOND. MEMORIZE THE BUILD, THEN ATTACK.';
        }

        return 'KEEP PLAYING. EVERY RUN BUILDS YOUR KITCHEN IQ.';
    }

    createSocialSection(width) {
        const y = 920;

        this.add.text(
            width / 2,
            y - 48,
            'SHOW US YOUR SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: 24,
                color: '#FFFFFF',
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            y - 12,
            'CAN YOU BEAT IT?',
            {
                fontFamily: 'Arial Black',
                fontSize: 20,
                color: '#FFD43B'
            }
        ).setOrigin(0.5);

        const postButton = this.createActionButton(
            width / 2,
            y + 55,
            width - 100,
            62,
            'POST MY SCORE',
            COLORS.YELLOW,
            '#111111',
            () => {
                this.shareScore();
            }
        );

        const followButton = this.createActionButton(
            width / 2,
            y + 125,
            width - 100,
            52,
            'FOLLOW @WAFFLEHAHZ',
            COLORS.WHITE,
            '#D71920',
            () => {
                window.open(
                    'https://x.com/WaffleHahz',
                    '_blank',
                    'noopener,noreferrer'
                );
            }
        );
    }

    createActionButton(
        x,
        y,
        buttonWidth,
        buttonHeight,
        label,
        fillColor,
        textColor,
        callback
    ) {
        const button = this.add.rectangle(
            x,
            y,
            buttonWidth,
            buttonHeight,
            15
        );

        button
            .setFillStyle(fillColor)
            .setStrokeStyle(
                3,
                COLORS.WHITE
            )
            .setInteractive({
                useHandCursor: true
            });

        const text = this.add.text(
            x,
            y,
            label,
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: textColor
            }
        ).setOrigin(0.5);

        button.on('pointerover', () => {
            button.setFillStyle(
                fillColor === COLORS.YELLOW
                    ? COLORS.WHITE
                    : COLORS.OFF_WHITE
            );

            text.setColor(
                fillColor === COLORS.YELLOW
                    ? '#D71920'
                    : '#D71920'
            );

            button.setScale(1.02);
        });

        button.on('pointerout', () => {
            button.setFillStyle(fillColor);
            text.setColor(textColor);
            button.setScale(1);
        });

        button.on('pointerdown', callback);

        return button;
    }

    shareScore() {
        const post = encodeURIComponent(
            `I scored ${this.score.toLocaleString()} in the WAFFLE HAHZ GAME! 🧇🔥\n\n` +
            `Orders: ${this.ordersServed}/${this.totalOrders}\n` +
            `Accuracy: ${this.accuracy}%\n` +
            `Best Combo: ${this.bestCombo}x\n\n` +
            `Can you beat my score?\n\n` +
            `@WaffleHahz #WaffleHahz`
        );

        window.open(
            `https://twitter.com/intent/tweet?text=${post}`,
            '_blank',
            'noopener,noreferrer'
        );
    }

    createNavigation(width) {
        const y = 1080;

        const playAgain =
            this.createActionButton(
                width / 2,
                y,
                width - 90,
                82,
                'PLAY AGAIN',
                COLORS.WHITE,
                '#D71920',
                () => {
                    this.scene.start('Grill');
                }
            );

        this.add.text(
            width / 2,
            y + 55,
            'RUN IT BACK • BEAT YOUR SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: 10,
                color: '#777777',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        const home = this.add.text(
            width / 2,
            y + 115,
            '← BACK TO START',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#FFFFFF',
                letterSpacing: 1
            }
        )
        .setOrigin(0.5)
        .setInteractive({
            useHandCursor: true
        });

        home.on('pointerover', () => {
            home.setColor('#FFD43B');
        });

        home.on('pointerout', () => {
            home.setColor('#FFFFFF');
        });

        home.on('pointerdown', () => {
            this.scene.start('Title');
        });
    }

    createFooter(width, height) {
        this.add.text(
            width / 2,
            height - 52,
            'WAFFLE HAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#FFFFFF',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            height - 25,
            'THE HOUSE ALTERNATIVE',
            {
                fontFamily: 'Arial',
                fontSize: 11,
                color: '#FFFFFF',
                alpha: 0.6,
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }
}
