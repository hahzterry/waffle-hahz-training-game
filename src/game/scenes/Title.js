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

export default class Title extends Phaser.Scene {
    constructor() {
        super('Title');

        this.pulseTween = null;
    }

    create() {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor('#D71920');

        this.createBackground(width, height);
        this.createBrand(width);
        this.createHero(width);
        this.createButtons(width);
        this.createFooter(width, height);

        this.cameras.main.fadeIn(500, 0, 0, 0);
    }

    createBackground(width, height) {
        this.add.circle(
            width + 80,
            -60,
            330,
            COLORS.WHITE,
            0.055
        );

        this.add.circle(
            -80,
            this.scale.height + 70,
            360,
            COLORS.WHITE,
            0.045
        );

        this.add.circle(
            width - 55,
            300,
            30,
            COLORS.WHITE,
            0.06
        );

        this.add.circle(
            70,
            470,
            22,
            COLORS.WHITE,
            0.05
        );

        const stripe = this.add.rectangle(
            width / 2,
            this.scale.height / 2,
            width * 1.7,
            120,
            COLORS.WHITE,
            0.025
        );

        stripe.setAngle(-28);
        stripe.setDepth(-10);
    }

    createBrand(width) {
        this.add.text(
            width / 2,
            68,
            'WAFFLE',
            {
                fontFamily: 'Arial Black',
                fontSize: 58,
                fontStyle: 'bold',
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 7,
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            125,
            'HAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: 58,
                fontStyle: 'bold',
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 7,
                letterSpacing: 4
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            175,
            'THE HOUSE ALTERNATIVE',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#FFD43B',
                letterSpacing: 4
            }
        ).setOrigin(0.5);
    }

    createHero(width) {
        this.add.text(
            width / 2,
            265,
            'THE WAFFLE HAHZ GAME',
            {
                fontFamily: 'Arial Black',
                fontSize: 34,
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 4,
                align: 'center'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            315,
            'MASTER THE BUILD.',
            {
                fontFamily: 'Arial Black',
                fontSize: 25,
                color: '#FFD43B',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            350,
            'BEAT THE CLOCK.',
            {
                fontFamily: 'Arial Black',
                fontSize: 25,
                color: '#FFFFFF',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            405,
            'Can you survive the rush?',
            {
                fontFamily: 'Arial',
                fontSize: 20,
                fontStyle: 'bold',
                color: '#FFFFFF'
            }
        ).setOrigin(0.5);
    }

    createButtons(width) {
        const playButton = this.createButton(
            width / 2,
            490,
            width - 120,
            82,
            'START TRAINING',
            COLORS.YELLOW,
            '#111111',
            () => {
                this.scene.start('GrillInstructions');
            }
        );

        this.pulseTween = this.tweens.add({
            targets: playButton,
            scaleX: 1.025,
            scaleY: 1.025,
            duration: 850,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.createInfoPill(
            width / 2,
            590,
            '8 ORDERS  •  5 SIGNATURE BUILDS  •  1 KITCHEN'
        );

        this.add.text(
            width / 2,
            655,
            'WAFFLE  •  CHICKEN  •  FINISH',
            {
                fontFamily: 'Arial Black',
                fontSize: 15,
                color: '#FFFFFF',
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }

    createButton(
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
            buttonHeight / 5
        );

        button
            .setFillStyle(fillColor)
            .setStrokeStyle(4, COLORS.WHITE)
            .setInteractive({ useHandCursor: true });

        const text = this.add.text(
            x,
            y,
            label,
            {
                fontFamily: 'Arial Black',
                fontSize: 27,
                color: textColor,
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        button.on('pointerover', () => {
            button.setFillStyle(COLORS.WHITE);
            button.setScale(1.025);
            text.setColor('#D71920');
        });

        button.on('pointerout', () => {
            button.setFillStyle(fillColor);
            button.setScale(1);
            text.setColor(textColor);
        });

        button.on('pointerdown', () => {
            this.tweens.add({
                targets: [button, text],
                scaleX: 0.97,
                scaleY: 0.97,
                duration: 70,
                yoyo: true,
                onComplete: callback
            });
        });

        return button;
    }

    createInfoPill(x, y, label) {
        const pill = this.add.rectangle(
            x,
            y,
            this.scale.width - 160,
            46,
            999
        );

        pill
            .setFillStyle(COLORS.RED_DEEP, 0.9)
            .setStrokeStyle(2, COLORS.WHITE);

        this.add.text(
            x,
            y,
            label,
            {
                fontFamily: 'Arial Black',
                fontSize: 13,
                color: '#FFFFFF',
                letterSpacing: 1
            }
        ).setOrigin(0.5);
    }

    createFooter(width, height) {
        this.add.text(
            width / 2,
            height - 42,
            'LEARN IT. BUILD IT. SERVE IT.',
            {
                fontFamily: 'Arial Black',
                fontSize: 13,
                color: '#FFFFFF',
                alpha: 0.7,
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }

    shutdown() {
        if (this.pulseTween) {
            this.pulseTween.stop();
            this.pulseTween = null;
        }
    }
}
