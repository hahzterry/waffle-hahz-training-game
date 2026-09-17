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
        this.createBrand(width, height);
        this.createTrainingMessage(width, height);
        this.createPlayButton(width, height);
        this.createFooter(width, height);

        this.cameras.main.fadeIn(450, 0, 0, 0);
    }

    createBackground(width, height) {
        // Large upper-right graphic
        this.add.circle(
            width + 90,
            -70,
            340,
            COLORS.WHITE,
            0.055
        );

        // Large lower-left graphic
        this.add.circle(
            -100,
            height + 80,
            390,
            COLORS.WHITE,
            0.045
        );

        // Decorative circles
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

        // Diagonal graphic
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

        // Subtle bottom panel
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
                fontFamily: 'Arial Black',
                fontSize: Math.min(width * 0.16, 70),
                fontStyle: 'bold',
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 8,
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        waffle.setAngle(-2);

        const hahz = this.add.text(
            width / 2,
            brandY + Math.min(62, height * 0.085),
            'HAHZ',
            {
                fontFamily: 'Arial Black',
                fontSize: Math.min(width * 0.18, 78),
                fontStyle: 'bold',
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 9,
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        hahz.setAngle(-2);

        // Small brand separator — not another duplicate tagline
        this.add.rectangle(
            width / 2,
            brandY + Math.min(112, height * 0.15),
            Math.min(width * 0.42, 190),
            5,
            COLORS.YELLOW
        );
    }

    createTrainingMessage(width, height) {
        const centerY = height * 0.42;

        this.add.text(
            width / 2,
            centerY,
            'THE MENU IS\\nTHE GAME.',
            {
                fontFamily: 'Arial Black',
                fontSize: Math.min(width * 0.105, 46),
                fontStyle: 'bold',
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 5,
                align: 'center',
                lineSpacing: -5
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            centerY + Math.min(92, height * 0.115),
            'WE ARE TRAINING OUR FUTURE STAFF\\nAND CUSTOMERS BEFORE WE OPEN.',
            {
                fontFamily: 'Arial Black',
                fontSize: Math.min(width * 0.043, 19),
                color: '#FFD43B',
                align: 'center',
                lineSpacing: 5,
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            centerY + Math.min(145, height * 0.18),
            'LEARN THE BUILDS.\\nKNOW THE MENU.\\nGET READY FOR ATLANTA.',
            {
                fontFamily: 'Arial',
                fontSize: Math.min(width * 0.045, 19),
                fontStyle: 'bold',
                color: '#FFFFFF',
                align: 'center',
                lineSpacing: 7
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
            86,
            height * 0.105
        );

        const playButton = this.createButton(
            width / 2,
            buttonY,
            buttonWidth,
            buttonHeight,
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

        // Training progress statement
        this.add.text(
            width / 2,
            buttonY + buttonHeight / 2 + 38,
            '8 ORDERS  •  5 SIGNATURE BUILDS',
            {
                fontFamily: 'Arial Black',
                fontSize: Math.min(width * 0.035, 15),
                color: '#FFFFFF',
                letterSpacing: 1.5
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
        // Shadow
        const shadow = this.add.rectangle(
            x,
            y + 9,
            buttonWidth,
            buttonHeight,
            COLORS.RED_DEEP,
            1
        );

        shadow.setStrokeStyle(0, COLORS.RED_DEEP);

        const button = this.add.rectangle(
            x,
            y,
            buttonWidth,
            buttonHeight,
            fillColor
        );

        button
            .setStrokeStyle(5, COLORS.WHITE)
            .setInteractive({
                useHandCursor: true
            });

        const text = this.add.text(
            x,
            y,
            label,
            {
                fontFamily: 'Arial Black',
                fontSize: Math.min(widthSafe(this.scale.width) * 0.075, 31),
                color: textColor,
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        button.on('pointerover', () => {
            button.setFillStyle(COLORS.WHITE);
            text.setColor('#D71920');
        });

        button.on('pointerout', () => {
            button.setFillStyle(fillColor);
            text.setColor(textColor);
        });

        button.on('pointerdown', () => {
            this.tweens.add({
                targets: [button, text],
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 70,
                yoyo: true,
                onComplete: callback
            });
        });

        return button;
    }

    createFooter(width, height) {
        this.add.text(
            width / 2,
            height - 34,
            'WAFFLE HAHZ  •  ATLANTA  •  TRAINING DAY',
            {
                fontFamily: 'Arial Black',
                fontSize: Math.min(width * 0.028, 12),
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

function widthSafe(width) {
    return Math.max(320, width);
}
