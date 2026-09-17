import * as Phaser from 'phaser';

const COLORS = {
    RED: 0xD71920,
    RED_DARK: 0xA90000,
    RED_DEEP: 0x760000,
    WHITE: 0xFFFFFF,
    OFF_WHITE: 0xFFF8F2,
    BLACK: 0x111111,
    YELLOW: 0xFFD43B
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
        this.createBrand(width, height);
        this.createTrainingMessage(width, height);
        this.createPlayButton(width, height);
        this.createFooter(width, height);

        this.cameras.main.fadeIn(450, 0, 0, 0);
    }

    createBackground(width, height) {
        this.add.circle(
            width + 90,
            -70,
            340,
            COLORS.WHITE,
            0.055
        );

        this.add.circle(
            -100,
            this.scale.height + 80,
            390,
            COLORS.WHITE,
            0.045
        );

        this.add.circle(
            width * 0.13,
            height * 0.31,
            24,
            COLORS.WHITE,
            0.06
        );

        this.add.circle(
            width * 0.88,
            height * 0.43,
            32,
            COLORS.WHITE,
            0.055
        );

        const stripe = this.add.rectangle(
            width / 2,
            height * 0.53,
            width * 1.8,
            105,
            COLORS.WHITE,
            0.025
        );

        stripe.setAngle(-28);
        stripe.setDepth(-10);

        this.add.rectangle(
            width / 2,
            height - 110,
            width,
            220,
            COLORS.RED_DEEP,
            0.12
        ).setDepth(-5);
    }

    createBrand(width, height) {
        const brandY = Math.max(82, height * 0.13);

        const waffle = this.add.text(
            width / 2,
            brandY,
            'WAFFLE',
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(width * 0.18, 76),
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 8,
                letterSpacing: 0
            }
        ).setOrigin(0.5);

        waffle.setAngle(-2);

        const hahz = this.add.text(
            width / 2,
            brandY + Math.min(66, height * 0.085),
            'HAHZ',
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(width * 0.21, 86),
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 9,
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        hahz.setAngle(-2);

        this.add.rectangle(
            width / 2,
            brandY + Math.min(119, height * 0.15),
            Math.min(width * 0.42, 190),
            5,
            COLORS.YELLOW
        );
    }

    createTrainingMessage(width, height) {
        const centerY = height * 0.40;

        this.add.text(
            width / 2,
            centerY,
            'THE MENU\\nIS THE GAME.',
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(width * 0.115, 50),
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 5,
                align: 'center',
                lineSpacing: -3
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            centerY + Math.min(96, height * 0.12),
            'TRAINING OUR FUTURE STAFF\\nAND CUSTOMERS BEFORE WE OPEN.',
            {
                fontFamily: 'Arial',
                fontSize: Math.min(width * 0.047, 20),
                fontStyle: 'bold',
                color: '#FFD43B',
                align: 'center',
                lineSpacing: 5
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            centerY + Math.min(151, height * 0.19),
            'LEARN THE BUILDS.\\nKNOW THE MENU.\\nGET READY FOR ATLANTA.',
            {
                fontFamily: 'Arial',
                fontSize: Math.min(width * 0.045, 19),
                fontStyle: 'bold',
                color: '#FFFFFF',
                align: 'center',
                lineSpacing: 6
            }
        ).setOrigin(0.5);
    }

    createPlayButton(width, height) {
        const buttonY = height * 0.73;

        const buttonWidth = Math.min(
            width - 70,
            430
        );

        const buttonHeight = Math.min(
            88,
            height * 0.11
        );

        const shadow = this.add.rectangle(
            width / 2,
            buttonY + 9,
            buttonWidth,
            buttonHeight,
            COLORS.RED_DEEP
        );

        const button = this.add.rectangle(
            width / 2,
            buttonY,
            buttonWidth,
            buttonHeight,
            COLORS.YELLOW
        );

        button
            .setStrokeStyle(5, COLORS.WHITE)
            .setInteractive({
                useHandCursor: true
            });

        const text = this.add.text(
            width / 2,
            buttonY,
            'START TRAINING',
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(width * 0.075, 32),
                color: '#111111',
                letterSpacing: 0
            }
        ).setOrigin(0.5);

        button.on('pointerover', () => {
            button.setFillStyle(COLORS.WHITE);
            text.setColor('#D71920');
        });

        button.on('pointerout', () => {
            button.setFillStyle(COLORS.YELLOW);
            text.setColor('#111111');
        });

        button.on('pointerdown', () => {
            this.tweens.add({
                targets: [button, text],
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 70,
                yoyo: true,
                onComplete: () => {
                    this.scene.start('GrillInstructions');
                }
            });
        });

        this.pulseTween = this.tweens.add({
            targets: [button, text],
            scaleX: 1.025,
            scaleY: 1.025,
            duration: 850,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.add.text(
            width / 2,
            buttonY + buttonHeight / 2 + 38,
            '8 ORDERS  •  5 SIGNATURE BUILDS',
            {
                fontFamily: 'Arial',
                fontSize: Math.min(width * 0.035, 15),
                fontStyle: 'bold',
                color: '#FFFFFF',
                letterSpacing: 1
            }
        ).setOrigin(0.5);
    }

    createFooter(width, height) {
        this.add.text(
            width / 2,
            height - 34,
            'WAFFLE HAHZ  •  ATLANTA  •  TRAINING DAY',
            {
                fontFamily: 'Arial',
                fontSize: Math.min(width * 0.028, 12),
                fontStyle: 'bold',
                color: '#FFFFFF',
                alpha: 0.65,
                letterSpacing: 1.5
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
