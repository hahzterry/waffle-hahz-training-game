import * as Phaser from 'phaser';

const COLORS = {
    RED: 0xD71920,
    RED_DARK: 0xA90000,
    RED_DEEP: 0x760000,
    WHITE: 0xFFFFFF,
    CREAM: 0xFFF8F2,
    BLACK: 0x111111,
    YELLOW: 0xFFD43B
};

export default class GrillInstructions extends Phaser.Scene {
    constructor() {
        super('GrillInstructions');

        this.buttonTween = null;
    }

    create() {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor('#D71920');

        this.createBackground(width, height);
        this.createHeader(width, height);
        this.createRecipes(width, height);
        this.createStartButton(width, height);
        this.createFooter(width, height);

        this.cameras.main.fadeIn(400, 0, 0, 0);
    }

    // ─────────────────────────────────────────────────────────────
    // BACKGROUND
    // ─────────────────────────────────────────────────────────────

    createBackground(width, height) {
        // Large soft white corner glow
        this.add.circle(
            width + 80,
            -50,
            260,
            COLORS.WHITE,
            0.055
        );

        // Bottom glow
        this.add.circle(
            -80,
            height + 80,
            300,
            COLORS.WHITE,
            0.045
        );

        // Small graphic accents
        this.add.circle(
            width * 0.08,
            height * 0.31,
            18,
            COLORS.WHITE,
            0.075
        );

        this.add.circle(
            width * 0.92,
            height * 0.47,
            22,
            COLORS.WHITE,
            0.06
        );

        // Diagonal graphic stripe
        const stripe = this.add.rectangle(
            width / 2,
            height * 0.48,
            width * 1.8,
            85,
            COLORS.WHITE,
            0.025
        );

        stripe.setAngle(-28);
        stripe.setDepth(-10);

        // Bottom deep-red section
        this.add.rectangle(
            width / 2,
            height - 80,
            width,
            160,
            COLORS.RED_DEEP,
            0.16
        ).setDepth(-5);
    }

    // ─────────────────────────────────────────────────────────────
    // HEADER
    // ─────────────────────────────────────────────────────────────

    createHeader(width, height) {
        const headerY = Math.max(
            48,
            height * 0.065
        );

        // Main brand
        this.add.text(
            width / 2,
            headerY,
            'WAFFLE HAHZ',
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(
                    width * 0.105,
                    44
                ),
                color: '#FFFFFF',
                stroke: '#760000',
                strokeThickness: 5
            }
        ).setOrigin(0.5);

        // Secondary headline
        this.add.text(
            width / 2,
            headerY + 45,
            'KNOW THE BUILDS.',
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(
                    width * 0.075,
                    31
                ),
                color: '#FFD43B',
                stroke: '#760000',
                strokeThickness: 3
            }
        ).setOrigin(0.5);

        // Training message
        this.add.text(
            width / 2,
            headerY + 82,
            'LEARN THE 5 SIGNATURE BUILDS',
            {
                fontFamily: 'Arial',
                fontSize: Math.min(
                    width * 0.038,
                    16
                ),
                fontStyle: 'bold',
                color: '#FFFFFF',
                letterSpacing: 1.5
            }
        ).setOrigin(0.5);
    }

    // ─────────────────────────────────────────────────────────────
    // RECIPE CARDS
    // ─────────────────────────────────────────────────────────────

    createRecipes(width, height) {
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

        const cardWidth = Math.min(
            width - 42,
            460
        );

        const cardHeight = Math.min(
            76,
            height * 0.085
        );

        const startY = height * 0.255;

        const gap = Math.min(
            9,
            height * 0.012
        );

        builds.forEach((item, index) => {
            const y =
                startY +
                index * (cardHeight + gap);

            this.createRecipeCard(
                width / 2,
                y,
                cardWidth,
                cardHeight,
                item,
                index
            );
        });
    }

    createRecipeCard(
        x,
        y,
        cardWidth,
        cardHeight,
        item,
        index
    ) {
        // Deep red offset shadow
        this.add.rectangle(
            x,
            y + 6,
            cardWidth,
            cardHeight,
            COLORS.RED_DEEP
        );

        // Main cream card
        const card = this.add.rectangle(
            x,
            y,
            cardWidth,
            cardHeight,
            COLORS.CREAM
        );

        card.setStrokeStyle(
            3,
            COLORS.WHITE
        );

        // Number badge
        const badgeSize = Math.min(
            38,
            cardHeight * 0.52
        );

        const badgeX =
            x -
            cardWidth / 2 +
            27;

        this.add.circle(
            badgeX,
            y,
            badgeSize / 2,
            COLORS.RED
        ).setStrokeStyle(
            2,
            COLORS.RED_DEEP
        );

        this.add.text(
            badgeX,
            y,
            String(index + 1),
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(
                    badgeSize * 0.55,
                    20
                ),
                color: '#FFFFFF'
            }
        ).setOrigin(0.5);

        // Recipe name
        this.add.text(
            x - cardWidth / 2 + 55,
            y - 14,
            item.name,
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(
                    cardWidth * 0.055,
                    21
                ),
                color: '#D71920'
            }
        ).setOrigin(0, 0.5);

        // Build ingredients
        const ingredients =
            `${item.waffle}  +  ${item.chicken}  +  ${item.finish}`;

        this.add.text(
            x - cardWidth / 2 + 55,
            y + 15,
            ingredients,
            {
                fontFamily: 'Arial',
                fontSize: Math.min(
                    cardWidth * 0.032,
                    13
                ),
                fontStyle: 'bold',
                color: '#111111',
                wordWrap: {
                    width: cardWidth - 75
                },
                lineSpacing: 2
            }
        ).setOrigin(0, 0.5);
    }

    // ─────────────────────────────────────────────────────────────
    // ENTER KITCHEN BUTTON
    // ─────────────────────────────────────────────────────────────

    createStartButton(width, height) {
        const buttonY = height * 0.825;

        const buttonWidth = Math.min(
            width - 65,
            430
        );

        const buttonHeight = Math.min(
            72,
            height * 0.09
        );

        // Button shadow
        this.add.rectangle(
            width / 2,
            buttonY + 8,
            buttonWidth,
            buttonHeight,
            COLORS.RED_DEEP
        );

        // Main button
        const button = this.add.rectangle(
            width / 2,
            buttonY,
            buttonWidth,
            buttonHeight,
            COLORS.YELLOW
        );

        button
            .setStrokeStyle(
                5,
                COLORS.WHITE
            )
            .setInteractive({
                useHandCursor: true
            });

        // Button text
        const buttonText = this.add.text(
            width / 2,
            buttonY,
            'ENTER THE KITCHEN',
            {
                fontFamily: 'Cooper Black',
                fontSize: Math.min(
                    width * 0.065,
                    28
                ),
                color: '#111111'
            }
        ).setOrigin(0.5);

        // Hover
        button.on('pointerover', () => {
            button.setFillStyle(
                COLORS.WHITE
            );

            buttonText.setColor(
                '#D71920'
            );
        });

        // Hover out
        button.on('pointerout', () => {
            button.setFillStyle(
                COLORS.YELLOW
            );

            buttonText.setColor(
                '#111111'
            );
        });

        // Press
        button.on('pointerdown', () => {
            this.tweens.add({
                targets: [
                    button,
                    buttonText
                ],
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 70,
                yoyo: true,
                onComplete: () => {
                    this.scene.start('Grill');
                }
            });
        });

        // Subtle attention pulse
        this.buttonTween = this.tweens.add({
            targets: [
                button,
                buttonText
            ],
            scaleX: 1.018,
            scaleY: 1.018,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    // ─────────────────────────────────────────────────────────────
    // FOOTER
    // ─────────────────────────────────────────────────────────────

    createFooter(width, height) {
        this.add.text(
            width / 2,
            height - 31,
            'LEARN IT  •  BUILD IT  •  SERVE IT',
            {
                fontFamily: 'Arial',
                fontSize: Math.min(
                    width * 0.032,
                    13
                ),
                fontStyle: 'bold',
                color: '#FFFFFF',
                alpha: 0.72,
                letterSpacing: 1.5
            }
        ).setOrigin(0.5);
    }

    // ─────────────────────────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────────────────────────

    shutdown() {
        if (this.buttonTween) {
            this.buttonTween.stop();
            this.buttonTween = null;
        }
    }
}
