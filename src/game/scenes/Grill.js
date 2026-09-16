// src/game/scenes/Grill.js

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

const RECIPES = [
    {
        name: 'NASHVILLE HOT',
        description: 'Cornbread waffle + Nashville chicken + hot honey',
        waffle: 'Cornbread Waffle',
        chicken: 'Nashville Chicken',
        finish: 'Hot Honey'
    },
    {
        name: 'ATL PEACH',
        description: 'Peach waffle + crispy chicken + peach-habanero glaze',
        waffle: 'Peach Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Peach-Habanero Glaze'
    },
    {
        name: 'LEMON PEPPER',
        description: 'Lemon waffle + lemon-pepper chicken + honey',
        waffle: 'Lemon Waffle',
        chicken: 'Lemon-Pepper Chicken',
        finish: 'Honey'
    },
    {
        name: 'RED VELVET',
        description: 'Red velvet waffle + crispy chicken + cream cheese honey',
        waffle: 'Red Velvet Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Cream Cheese Honey'
    },
    {
        name: 'BACON BOURBON',
        description: 'Bacon waffle + fried chicken + maple glaze',
        waffle: 'Bacon Waffle',
        chicken: 'Fried Chicken',
        finish: 'Maple Glaze'
    }
];

export default class Grill extends Phaser.Scene {
    constructor() {
        super('Grill');

        this.score = 0;
        this.combo = 0;
        this.orderNumber = 0;
        this.totalOrders = 8;

        this.timeLeft = 30;

        this.currentRecipe = null;

        this.selected = {
            waffle: null,
            chicken: null,
            finish: null
        };

        this.locked = false;
        this.timer = null;
        this.optionButtons = [];
    }

    create() {
        const { width, height } = this.scale;

        // ---------------------------------------------------------
        // RED BRAND BACKGROUND
        // ---------------------------------------------------------

        this.cameras.main.setBackgroundColor('#D71920');

        // Decorative background shapes
        this.createBackground(width, height);

        // Main UI
        this.createHeader(width);
        this.createOrderCard(width);
        this.createKitchen(width);
        this.createServeButton(width);

        // Start
        this.startNextOrder();

        // Cleanup timer when scene shuts down
        this.events.once('shutdown', () => {
            if (this.timer) {
                this.timer.remove(false);
                this.timer = null;
            }
        });
    }

    // ============================================================
    // BACKGROUND
    // ============================================================

    createBackground(width, height) {
        // Large subtle circle
        this.add.circle(
            width + 60,
            -40,
            260,
            COLORS.WHITE,
            0.055
        );

        // Bottom circle
        this.add.circle(
            -60,
            height + 30,
            300,
            COLORS.WHITE,
            0.045
        );

        // Small decorative circles
        this.add.circle(
            70,
            270,
            35,
            COLORS.WHITE,
            0.055
        );

        this.add.circle(
            width - 65,
            920,
            24,
            COLORS.WHITE,
            0.055
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

        // Keep decoration behind UI
        stripe.setDepth(-10);
    }

    // ============================================================
    // HEADER
    // ============================================================

    createHeader(width) {
        // Brand
        this.add.text(42, 38, 'WAFFLE', {
            fontFamily: 'Arial Black',
            fontSize: 42,
            fontStyle: 'bold',
            color: '#FFFFFF',
            stroke: '#760000',
            strokeThickness: 5
        });

        this.add.text(42, 82, 'HAHZ', {
            fontFamily: 'Arial Black',
            fontSize: 42,
            fontStyle: 'bold',
            color: '#FFFFFF',
            stroke: '#760000',
            strokeThickness: 5
        });

        // Training label
        this.add.text(42, 132, 'TRAINING KITCHEN', {
            fontFamily: 'Arial Black',
            fontSize: 18,
            color: '#FFFFFF',
            letterSpacing: 2
        });

        // Score card
        const scoreCard = this.add.rectangle(
            width - 155,
            78,
            245,
            100,
            COLORS.WHITE,
            1
        );

        scoreCard
            .setStrokeStyle(4, COLORS.RED_DEEP)
            .setOrigin(0.5);

        this.scoreText = this.add.text(
            width - 155,
            55,
            'SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#D71920',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.scoreNumberText = this.add.text(
            width - 155,
            91,
            '0000',
            {
                fontFamily: 'Arial Black',
                fontSize: 36,
                color: '#111111'
            }
        ).setOrigin(0.5);

        // Combo
        this.comboText = this.add.text(
            width - 155,
            154,
            'COMBO x0',
            {
                fontFamily: 'Arial Black',
                fontSize: 16,
                color: '#D71920'
            }
        ).setOrigin(0.5);

        // Order indicator
        this.orderText = this.add.text(
            width / 2,
            177,
            'ORDER 1 / 8',
            {
                fontFamily: 'Arial Black',
                fontSize: 23,
                color: '#FFFFFF'
            }
        ).setOrigin(0.5);

        // Timer pill
        this.timerPill = this.add.rectangle(
            width / 2,
            225,
            250,
            65,
            999
        );

        this.timerPill
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(4, COLORS.RED_DEEP);

        this.timerText = this.add.text(
            width / 2,
            225,
            '00:30',
            {
                fontFamily: 'Arial Black',
                fontSize: 34,
                color: '#D71920'
            }
        ).setOrigin(0.5);
    }

    // ============================================================
    // ORDER CARD
    // ============================================================

    createOrderCard(width) {
        const cardY = 365;

        this.orderPanel = this.add.rectangle(
            width / 2,
            cardY,
            width - 70,
            210,
            28
        );

        this.orderPanel
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(6, COLORS.RED_DEEP);

        // Small label
        this.add.text(
            width / 2,
            cardY - 77,
            'CURRENT ORDER',
            {
                fontFamily: 'Arial Black',
                fontSize: 18,
                color: '#D71920',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        // Recipe name
        this.recipeName = this.add.text(
            width / 2,
            cardY - 25,
            '',
            {
                fontFamily: 'Arial Black',
                fontSize: 44,
                color: '#D71920',
                align: 'center',
                wordWrap: {
                    width: width - 130
                }
            }
        ).setOrigin(0.5);

        // Description
        this.recipeDescription = this.add.text(
            width / 2,
            cardY + 42,
            '',
            {
                fontFamily: 'Arial',
                fontSize: 23,
                fontStyle: 'bold',
                color: '#111111',
                align: 'center',
                wordWrap: {
                    width: width - 130
                },
                lineSpacing: 6
            }
        ).setOrigin(0.5);

        // Instruction
        this.add.text(
            width / 2,
            cardY + 87,
            'BUILD THIS ORDER',
            {
                fontFamily: 'Arial Black',
                fontSize: 17,
                color: '#777777',
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }

    // ============================================================
    // KITCHEN
    // ============================================================

    createKitchen(width) {
        this.createCategory(
            '1',
            'WAFFLE',
            620,
            'waffle',
            [
                'Cornbread Waffle',
                'Peach Waffle',
                'Lemon Waffle',
                'Red Velvet Waffle',
                'Bacon Waffle'
            ]
        );

        this.createCategory(
            '2',
            'CHICKEN',
            910,
            'chicken',
            [
                'Nashville Chicken',
                'Crispy Chicken',
                'Lemon-Pepper Chicken',
                'Fried Chicken'
            ]
        );

        this.createCategory(
            '3',
            'FINISH',
            1200,
            'finish',
            [
                'Hot Honey',
                'Peach-Habanero Glaze',
                'Honey',
                'Cream Cheese Honey',
                'Maple Glaze'
            ]
        );

        // Current build display
        this.selectedText = this.add.text(
            width / 2,
            1510,
            'SELECT ONE FROM EACH',
            {
                fontFamily: 'Arial Black',
                fontSize: 22,
                color: '#FFFFFF',
                align: 'center',
                wordWrap: {
                    width: width - 100
                }
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            1555,
            'WAFFLE  +  CHICKEN  +  FINISH',
            {
                fontFamily: 'Arial',
                fontSize: 16,
                fontStyle: 'bold',
                color: '#FFFFFF',
                alpha: 0.72
            }
        ).setOrigin(0.5);
    }

    // ============================================================
    // CATEGORY
    // ============================================================

    createCategory(number, title, y, type, options) {
        const { width } = this.scale;

        // Category heading
        this.add.circle(
            78,
            y,
            27,
            COLORS.WHITE
        );

        this.add.text(
            78,
            y,
            number,
            {
                fontFamily: 'Arial Black',
                fontSize: 24,
                color: '#D71920'
            }
        ).setOrigin(0.5);

        this.add.text(
            125,
            y,
            title,
            {
                fontFamily: 'Arial Black',
                fontSize: 26,
                color: '#FFFFFF',
                letterSpacing: 1
            }
        ).setOrigin(0, 0.5);

        // Divider
        this.add.rectangle(
            125,
            y + 35,
            width - 165,
            2,
            COLORS.WHITE,
            0.22
        ).setOrigin(0, 0.5);

        options.forEach((label, index) => {
            const buttonY = y + 80 + index * 50;

            const button = this.add.rectangle(
                width / 2,
                buttonY,
                width - 90,
                43,
                13
            );

            button
                .setFillStyle(COLORS.WHITE)
                .setStrokeStyle(2, COLORS.RED_DEEP)
                .setInteractive({
                    useHandCursor: true
                });

            const text = this.add.text(
                width / 2,
                buttonY,
                label,
                {
                    fontFamily: 'Arial',
                    fontSize: 19,
                    fontStyle: 'bold',
                    color: '#111111',
                    align: 'center',
                    wordWrap: {
                        width: width - 150
                    }
                }
            ).setOrigin(0.5);

            // Selection check
            const check = this.add.text(
                width - 72,
                buttonY,
                '✓',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 22,
                    color: '#D71920'
                }
            ).setOrigin(0.5);

            check.setVisible(false);

            // Hover
            button.on('pointerover', () => {
                if (this.locked) {
                    return;
                }

                if (this.selected[type] !== label) {
                    button.setFillStyle(COLORS.OFF_WHITE);
                    button.setScale(1.015);
                }
            });

            button.on('pointerout', () => {
                if (this.locked) {
                    return;
                }

                if (this.selected[type] !== label) {
                    button.setFillStyle(COLORS.WHITE);
                    button.setScale(1);
                }
            });

            // Touch
            button.on('pointerdown', () => {
                this.selectIngredient(
                    type,
                    label,
                    button,
                    text
                );
            });

            this.optionButtons.push({
                type,
                label,
                button,
                text,
                check
            });
        });
    }

    // ============================================================
    // SELECT INGREDIENT
    // ============================================================

    selectIngredient(type, label, button, text) {
        if (this.locked) {
            return;
        }

        this.optionButtons
            .filter(option => option.type === type)
            .forEach(option => {
                option.button.setFillStyle(COLORS.WHITE);
                option.button.setStrokeStyle(
                    2,
                    COLORS.RED_DEEP
                );

                option.button.setScale(1);

                option.text.setColor('#111111');

                if (option.check) {
                    option.check.setVisible(false);
                }
            });

        // Selected state
        button.setFillStyle(COLORS.RED_DEEP);
        button.setStrokeStyle(4, COLORS.WHITE);
        button.setScale(1.02);

        text.setColor('#FFFFFF');

        const selectedOption = this.optionButtons.find(
            option =>
                option.type === type &&
                option.label === label
        );

        if (selectedOption && selectedOption.check) {
            selectedOption.check.setColor('#FFFFFF');
            selectedOption.check.setVisible(true);
        }

        this.selected[type] = label;

        this.updateSelectionText();
        this.updateServeButton();
    }

    // ============================================================
    // SELECTION SUMMARY
    // ============================================================

    updateSelectionText() {
        const waffle = this.selected.waffle || 'WAFFLE';
        const chicken = this.selected.chicken || 'CHICKEN';
        const finish = this.selected.finish || 'FINISH';

        const ready =
            this.selected.waffle &&
            this.selected.chicken &&
            this.selected.finish;

        this.selectedText.setText(
            ready
                ? `${waffle}  +  ${chicken}  +  ${finish}`
                : `${waffle}  +  ${chicken}  +  ${finish}`
        );

        this.selectedText.setColor(
            ready
                ? '#FFFFFF'
                : '#FFFFFF'
        );
    }

    // ============================================================
    // SERVE BUTTON
    // ============================================================

    createServeButton(width) {
        this.serveButton = this.add.rectangle(
            width / 2,
            1660,
            width - 90,
            110,
            22
        );

        this.serveButton
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(5, COLORS.RED_DEEP)
            .setInteractive({
                useHandCursor: true
            });

        this.serveText = this.add.text(
            width / 2,
            1660,
            'SERVE ORDER',
            {
                fontFamily: 'Arial Black',
                fontSize: 39,
                color: '#D71920',
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        this.serveSubtext = this.add.text(
            width / 2,
            1710,
            'TAP TO CHECK YOUR BUILD',
            {
                fontFamily: 'Arial',
                fontSize: 15,
                fontStyle: 'bold',
                color: '#777777',
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        this.serveButton.on('pointerover', () => {
            if (this.locked) {
                return;
            }

            const ready =
                this.selected.waffle &&
                this.selected.chicken &&
                this.selected.finish;

            if (ready) {
                this.serveButton.setFillStyle(
                    COLORS.OFF_WHITE
                );

                this.serveButton.setScale(1.015);
            }
        });

        this.serveButton.on('pointerout', () => {
            this.serveButton.setScale(1);
        });

        this.serveButton.on('pointerdown', () => {
            this.submitOrder();
        });

        this.updateServeButton();
    }

    updateServeButton() {
        const ready =
            this.selected.waffle &&
            this.selected.chicken &&
            this.selected.finish;

        if (ready) {
            this.serveButton.setFillStyle(
                COLORS.WHITE
            );

            this.serveButton.setStrokeStyle(
                5,
                COLORS.RED_DEEP
            );

            this.serveText.setColor('#D71920');

            this.serveSubtext.setColor('#111111');
        } else {
            this.serveButton.setFillStyle(
                COLORS.WHITE
            );

            this.serveButton.setStrokeStyle(
                5,
                COLORS.WHITE
            );

            this.serveText.setColor('#D71920');

            this.serveSubtext.setColor('#777777');
        }
    }

    // ============================================================
    // NEXT ORDER
    // ============================================================

    startNextOrder() {
        this.locked = false;

        this.orderNumber++;

        if (this.orderNumber > this.totalOrders) {
            this.finishGame();
            return;
        }

        const recipeIndex =
            (this.orderNumber - 1) % RECIPES.length;

        this.currentRecipe =
            RECIPES[recipeIndex];

        this.selected = {
            waffle: null,
            chicken: null,
            finish: null
        };

        this.timeLeft = Math.max(
            15,
            30 -
            Math.floor(
                (this.orderNumber - 1) / 2
            ) * 3
        );

        this.orderText.setText(
            `ORDER ${this.orderNumber} / ${this.totalOrders}`
        );

        this.recipeName.setText(
            this.currentRecipe.name
        );

        this.recipeDescription.setText(
            this.currentRecipe.description
        );

        this.timerText.setText(
            `00:${String(
                this.timeLeft
            ).padStart(2, '0')}`
        );

        this.timerText.setColor('#D71920');

        this.timerPill.setFillStyle(
            COLORS.WHITE
        );

        this.updateSelectionText();
        this.updateServeButton();
        this.resetOptions();

        if (this.timer) {
            this.timer.remove(false);
        }

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.tick,
            callbackScope: this,
            loop: true
        });
    }

    // ============================================================
    // RESET OPTIONS
    // ============================================================

    resetOptions() {
        if (!this.optionButtons) {
            return;
        }

        this.optionButtons.forEach(option => {
            option.button.setFillStyle(
                COLORS.WHITE
            );

            option.button.setStrokeStyle(
                2,
                COLORS.RED_DEEP
            );

            option.button.setScale(1);

            option.text.setColor('#111111');

            if (option.check) {
                option.check.setVisible(false);
            }
        });
    }

    // ============================================================
    // TIMER
    // ============================================================

    tick() {
        if (this.locked) {
            return;
        }

        this.timeLeft--;

        this.timerText.setText(
            `00:${String(
                Math.max(0, this.timeLeft)
            ).padStart(2, '0')}`
        );

        if (this.timeLeft <= 5) {
            this.timerText.setColor('#FFFFFF');
            this.timerPill.setFillStyle(
                COLORS.RED_DEEP
            );

            this.timerPill.setStrokeStyle(
                4,
                COLORS.WHITE
            );
        } else {
            this.timerText.setColor('#D71920');

            this.timerPill.setFillStyle(
                COLORS.WHITE
            );

            this.timerPill.setStrokeStyle(
                4,
                COLORS.RED_DEEP
            );
        }

        if (this.timeLeft <= 0) {
            this.orderFailed('TIME OUT!');
        }
    }

    // ============================================================
    // SUBMIT ORDER
    // ============================================================

    submitOrder() {
        if (this.locked) {
            return;
        }

        if (
            !this.selected.waffle ||
            !this.selected.chicken ||
            !this.selected.finish
        ) {
            this.flashMessage(
                'BUILD THE COMPLETE ORDER!',
                '#FFFFFF'
            );

            return;
        }

        const correct =
            this.selected.waffle ===
                this.currentRecipe.waffle &&
            this.selected.chicken ===
                this.currentRecipe.chicken &&
            this.selected.finish ===
                this.currentRecipe.finish;

        if (!correct) {
            this.combo = 0;

            this.comboText.setText(
                'COMBO x0'
            );

            this.flashMessage(
                'WRONG BUILD!',
                '#FFFFFF'
            );

            this.shakeKitchen();

            return;
        }

        const speedBonus =
            this.timeLeft * 25;

        const comboMultiplier =
            Math.max(
                1,
                this.combo + 1
            );

        const points =
            (500 + speedBonus) *
            comboMultiplier;

        this.score += points;

        this.combo++;

        this.scoreNumberText.setText(
            String(this.score).padStart(4, '0')
        );

        this.comboText.setText(
            `COMBO x${this.combo}`
        );

        this.locked = true;

        if (this.timer) {
            this.timer.remove(false);
        }

        this.flashMessage(
            `PERFECT! +${points}`,
            '#FFFFFF'
        );

        if (this.combo >= 3) {
            this.time.delayedCall(
                500,
                () => {
                    this.flashMessage(
                        'HAHZ MODE!',
                        '#FFD43B'
                    );
                }
            );
        }

        this.time.delayedCall(
            1300,
            () => {
                this.startNextOrder();
            }
        );
    }

    // ============================================================
    // FAILED ORDER
    // ============================================================

    orderFailed(reason) {
        if (this.locked) {
            return;
        }

        this.locked = true;

        if (this.timer) {
            this.timer.remove(false);
        }

        this.combo = 0;

        this.comboText.setText(
            'COMBO x0'
        );

        this.flashMessage(
            reason,
            '#FFFFFF'
        );

        this.time.delayedCall(
            1200,
            () => {
                this.startNextOrder();
            }
        );
    }

    // ============================================================
    // MESSAGE OVERLAY
    // ============================================================

    flashMessage(message, color) {
        const { width, height } =
            this.scale;

        const overlay =
            this.add.rectangle(
                width / 2,
                height / 2,
                width - 70,
                250,
                COLORS.WHITE,
                1
            );

        overlay.setStrokeStyle(
            7,
            COLORS.RED_DEEP
        );

        overlay.setDepth(100);

        const text =
            this.add.text(
                width / 2,
                height / 2,
                message,
                {
                    fontFamily: 'Arial Black',
                    fontSize: 48,
                    color,
                    align: 'center',
                    wordWrap: {
                        width: width - 150
                    },
                    stroke: '#760000',
                    strokeThickness: 3
                }
            )
            .setOrigin(0.5)
            .setDepth(101);

        // For white success/failure text,
        // keep the brand red readable.
        if (color === '#FFFFFF') {
            text.setColor('#D71920');
            text.setStrokeStyle(0, 0x000000, 0);
        }

        this.tweens.add({
            targets: [
                overlay,
                text
            ],
            alpha: 0,
            duration: 750,
            delay: 500,

            onComplete: () => {
                overlay.destroy();
                text.destroy();
            }
        });
    }

    // ============================================================
    // SCREEN SHAKE
    // ============================================================

    shakeKitchen() {
        this.cameras.main.shake(
            180,
            0.008
        );
    }

    // ============================================================
    // FINISH
    // ============================================================

    finishGame() {
        if (this.timer) {
            this.timer.remove(false);
            this.timer = null;
        }

        this.scene.start(
            'Results',
            {
                score: this.score,
                orders: this.totalOrders,
                combo: this.combo
            }
        );
    }
}
