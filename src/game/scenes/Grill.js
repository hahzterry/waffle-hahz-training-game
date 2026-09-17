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
        finish: 'Hot Honey',
        difficulty: 1
    },
    {
        name: 'ATL PEACH',
        description: 'Peach waffle + crispy chicken + peach-habanero glaze',
        waffle: 'Peach Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Peach-Habanero Glaze',
        difficulty: 2
    },
    {
        name: 'LEMON PEPPER',
        description: 'Lemon waffle + lemon-pepper chicken + honey',
        waffle: 'Lemon Waffle',
        chicken: 'Lemon-Pepper Chicken',
        finish: 'Honey',
        difficulty: 2
    },
    {
        name: 'RED VELVET',
        description: 'Red velvet waffle + crispy chicken + cream cheese honey',
        waffle: 'Red Velvet Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Cream Cheese Honey',
        difficulty: 3
    },
    {
        name: 'BACON BOURBON',
        description: 'Bacon waffle + fried chicken + maple glaze',
        waffle: 'Bacon Waffle',
        chicken: 'Fried Chicken',
        finish: 'Maple Glaze',
        difficulty: 3
    }
];

const WAFFLES = [
    'Cornbread Waffle',
    'Peach Waffle',
    'Lemon Waffle',
    'Red Velvet Waffle',
    'Bacon Waffle'
];

const CHICKEN = [
    'Nashville Chicken',
    'Crispy Chicken',
    'Lemon-Pepper Chicken',
    'Fried Chicken'
];

const FINISHES = [
    'Hot Honey',
    'Peach-Habanero Glaze',
    'Honey',
    'Cream Cheese Honey',
    'Maple Glaze'
];

export default class Grill extends Phaser.Scene {
    constructor() {
        super('Grill');

        this.score = 0;
        this.combo = 0;
        this.bestCombo = 0;

        this.orderNumber = 0;
        this.totalOrders = 8;

        this.timeLeft = 30;
        this.maxTime = 30;

        this.correctOrders = 0;
        this.mistakes = 0;
        this.attempts = 0;

        this.xp = 0;
        this.level = 1;
        this.satisfaction = 100;

        this.currentRecipe = null;

        this.selected = {
            waffle: null,
            chicken: null,
            finish: null
        };

        this.locked = false;
        this.timer = null;

        this.optionButtons = [];
        this.orderSequence = [];
    }

    create() {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor('#D71920');

        this.createBackground(width, height);
        this.createHeader(width);
        this.createOrderCard(width);
        this.createKitchen(width);
        this.createServeButton(width);
        this.createProgressBar(width);

        this.generateOrderSequence();
        this.startNextOrder();

        this.cameras.main.fadeIn(350, 0, 0, 0);

        this.events.once('shutdown', () => {
            this.stopTimer();
        });
    }

    createBackground(width, height) {
        this.add.circle(
            width + 60,
            -40,
            260,
            COLORS.WHITE,
            0.055
        );

        this.add.circle(
            -60,
            height + 30,
            300,
            COLORS.WHITE,
            0.045
        );

        this.add.circle(
            70,
            270,
            35,
            COLORS.WHITE,
            0.055
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
            30,
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
            72,
            'HAHZ',
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
            120,
            'TRAINING KITCHEN',
            {
                fontFamily: 'Arial Black',
                fontSize: 16,
                color: '#FFFFFF',
                letterSpacing: 2
            }
        );

        const scoreCard = this.add.rectangle(
            width - 145,
            78,
            225,
            100,
            16
        );

        scoreCard
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(4, COLORS.RED_DEEP);

        this.add.text(
            width - 145,
            51,
            'SCORE',
            {
                fontFamily: 'Arial Black',
                fontSize: 15,
                color: '#D71920',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.scoreNumberText = this.add.text(
            width - 145,
            86,
            '00000',
            {
                fontFamily: 'Arial Black',
                fontSize: 31,
                color: '#111111'
            }
        ).setOrigin(0.5);

        this.comboText = this.add.text(
            width - 145,
            133,
            'COMBO x0',
            {
                fontFamily: 'Arial Black',
                fontSize: 14,
                color: '#D71920'
            }
        ).setOrigin(0.5);

        this.levelText = this.add.text(
            width - 145,
            156,
            'LEVEL 1',
            {
                fontFamily: 'Arial Black',
                fontSize: 11,
                color: '#777777'
            }
        ).setOrigin(0.5);

        this.orderText = this.add.text(
            width / 2,
            176,
            'ORDER 1 / 8',
            {
                fontFamily: 'Arial Black',
                fontSize: 21,
                color: '#FFFFFF'
            }
        ).setOrigin(0.5);

        this.timerPill = this.add.rectangle(
            width / 2,
            222,
            235,
            58,
            999
        );

        this.timerPill
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(4, COLORS.RED_DEEP);

        this.timerText = this.add.text(
            width / 2,
            222,
            '00:30',
            {
                fontFamily: 'Arial Black',
                fontSize: 30,
                color: '#D71920'
            }
        ).setOrigin(0.5);
    }

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

        this.add.text(
            width / 2,
            cardY - 77,
            'CUSTOMER ORDER',
            {
                fontFamily: 'Arial Black',
                fontSize: 16,
                color: '#D71920',
                letterSpacing: 3
            }
        ).setOrigin(0.5);

        this.recipeName = this.add.text(
            width / 2,
            cardY - 27,
            '',
            {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#D71920',
                align: 'center',
                wordWrap: {
                    width: width - 120
                }
            }
        ).setOrigin(0.5);

        this.recipeDescription = this.add.text(
            width / 2,
            cardY + 36,
            '',
            {
                fontFamily: 'Arial',
                fontSize: 18,
                fontStyle: 'bold',
                color: '#111111',
                align: 'center',
                wordWrap: {
                    width: width - 110
                },
                lineSpacing: 5
            }
        ).setOrigin(0.5);

        this.difficultyText = this.add.text(
            width / 2,
            cardY + 82,
            '',
            {
                fontFamily: 'Arial Black',
                fontSize: 12,
                color: '#777777',
                letterSpacing: 2
            }
        ).setOrigin(0.5);
    }

    createKitchen(width) {
        this.createCategory(
            '1',
            'WAFFLE',
            620,
            'waffle',
            WAFFLES
        );

        this.createCategory(
            '2',
            'CHICKEN',
            910,
            'chicken',
            CHICKEN
        );

        this.createCategory(
            '3',
            'FINISH',
            1200,
            'finish',
            FINISHES
        );

        this.selectedText = this.add.text(
            width / 2,
            1510,
            'SELECT ONE FROM EACH',
            {
                fontFamily: 'Arial Black',
                fontSize: 20,
                color: '#FFFFFF',
                align: 'center',
                wordWrap: {
                    width: width - 80
                }
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            1550,
            'WAFFLE  +  CHICKEN  +  FINISH',
            {
                fontFamily: 'Arial',
                fontSize: 14,
                fontStyle: 'bold',
                color: '#FFFFFF',
                alpha: 0.72
            }
        ).setOrigin(0.5);
    }

    createCategory(number, title, y, type, options) {
        const { width } = this.scale;

        this.add.circle(
            70,
            y,
            25,
            COLORS.WHITE
        );

        this.add.text(
            70,
            y,
            number,
            {
                fontFamily: 'Arial Black',
                fontSize: 21,
                color: '#D71920'
            }
        ).setOrigin(0.5);

        this.add.text(
            112,
            y,
            title,
            {
                fontFamily: 'Arial Black',
                fontSize: 24,
                color: '#FFFFFF',
                letterSpacing: 1
            }
        ).setOrigin(0, 0.5);

        this.add.rectangle(
            112,
            y + 34,
            width - 150,
            2,
            COLORS.WHITE,
            0.22
        ).setOrigin(0, 0.5);

        options.forEach((label, index) => {
            const buttonY = y + 80 + index * 49;

            const button = this.add.rectangle(
                width / 2,
                buttonY,
                width - 80,
                42,
                12
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
                    fontSize: 17,
                    fontStyle: 'bold',
                    color: '#111111',
                    align: 'center',
                    wordWrap: {
                        width: width - 130
                    }
                }
            ).setOrigin(0.5);

            const check = this.add.text(
                width - 60,
                buttonY,
                '✓',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 20,
                    color: '#FFFFFF'
                }
            ).setOrigin(0.5);

            check.setVisible(false);

            button.on('pointerover', () => {
                if (this.locked) return;

                if (this.selected[type] !== label) {
                    button.setFillStyle(COLORS.OFF_WHITE);
                    button.setScale(1.015);
                }
            });

            button.on('pointerout', () => {
                if (this.locked) return;

                if (this.selected[type] !== label) {
                    button.setFillStyle(COLORS.WHITE);
                    button.setScale(1);
                }
            });

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

    createServeButton(width) {
        this.serveButton = this.add.rectangle(
            width / 2,
            1660,
            width - 80,
            105,
            20
        );

        this.serveButton
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(5, COLORS.RED_DEEP)
            .setInteractive({
                useHandCursor: true
            });

        this.serveText = this.add.text(
            width / 2,
            1648,
            'SERVE ORDER',
            {
                fontFamily: 'Arial Black',
                fontSize: 34,
                color: '#D71920'
            }
        ).setOrigin(0.5);

        this.serveSubtext = this.add.text(
            width / 2,
            1691,
            'SELECT ALL THREE INGREDIENTS',
            {
                fontFamily: 'Arial',
                fontSize: 13,
                fontStyle: 'bold',
                color: '#777777',
                letterSpacing: 1
            }
        ).setOrigin(0.5);

        this.serveButton.on('pointerover', () => {
            if (this.locked) return;

            if (this.isBuildComplete()) {
                this.serveButton.setFillStyle(COLORS.OFF_WHITE);
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

    createProgressBar(width) {
        this.add.text(
            width / 2,
            1735,
            'CUSTOMER SATISFACTION',
            {
                fontFamily: 'Arial Black',
                fontSize: 11,
                color: '#FFFFFF',
                letterSpacing: 2
            }
        ).setOrigin(0.5);

        this.satisfactionBackground = this.add.rectangle(
            width / 2,
            1760,
            width - 120,
            13,
            999,
            COLORS.RED_DEEP
        );

        this.satisfactionBar = this.add.rectangle(
            60,
            1760,
            width - 120,
            13,
            999,
            COLORS.GREEN
        ).setOrigin(0, 0.5);

        this.updateSatisfaction();
    }

    generateOrderSequence() {
        const pool = [...RECIPES];

        this.orderSequence = [];

        for (let i = 0; i < this.totalOrders; i++) {
            const index = Phaser.Math.Between(0, pool.length - 1);
            const recipe = pool.splice(index, 1)[0];

            this.orderSequence.push(recipe);

            if (pool.length === 0 && i < this.totalOrders - 1) {
                pool.push(...RECIPES);
            }
        }
    }

    startNextOrder() {
        this.locked = false;

        this.orderNumber++;

        if (this.orderNumber > this.totalOrders) {
            this.finishGame();
            return;
        }

        this.currentRecipe =
            this.orderSequence[this.orderNumber - 1];

        this.selected = {
            waffle: null,
            chicken: null,
            finish: null
        };

        this.maxTime = Math.max(
            16,
            30 -
            Math.floor(
                (this.orderNumber - 1) / 2
            ) * 2
        );

        this.timeLeft = this.maxTime;

        this.orderText.setText(
            `ORDER ${this.orderNumber} / ${this.totalOrders}`
        );

        this.recipeName.setText(
            this.currentRecipe.name
        );

        this.recipeDescription.setText(
            this.currentRecipe.description
        );

        this.difficultyText.setText(
            `DIFFICULTY ${this.currentRecipe.difficulty} / 3`
        );

        this.timerText.setText(
            this.formatTime(this.timeLeft)
        );

        this.timerText.setColor('#D71920');

        this.timerPill
            .setFillStyle(COLORS.WHITE)
            .setStrokeStyle(4, COLORS.RED_DEEP);

        this.resetOptions();
        this.updateSelectionText();
        this.updateServeButton();

        this.updateLevel();

        this.stopTimer();

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.tick,
            callbackScope: this,
            loop: true
        });
    }

    selectIngredient(type, label, button, text) {
        if (this.locked) return;

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

        button.setFillStyle(COLORS.RED_DEEP);
        button.setStrokeStyle(4, COLORS.WHITE);
        button.setScale(1.02);

        text.setColor('#FFFFFF');

        const selectedOption =
            this.optionButtons.find(
                option =>
                    option.type === type &&
                    option.label === label
            );

        if (selectedOption) {
            selectedOption.check.setColor('#FFFFFF');
            selectedOption.check.setVisible(true);
        }

        this.selected[type] = label;

        this.updateSelectionText();
        this.updateServeButton();
    }

    updateSelectionText() {
        const waffle =
            this.selected.waffle || 'WAFFLE';

        const chicken =
            this.selected.chicken || 'CHICKEN';

        const finish =
            this.selected.finish || 'FINISH';

        this.selectedText.setText(
            `${waffle}  +  ${chicken}  +  ${finish}`
        );
    }

    updateServeButton() {
        const ready = this.isBuildComplete();

        if (ready) {
            this.serveButton.setFillStyle(
                COLORS.YELLOW
            );

            this.serveButton.setStrokeStyle(
                5,
                COLORS.WHITE
            );

            this.serveText.setColor('#111111');

            this.serveSubtext.setText(
                'TAP TO SERVE • LOCK IN YOUR BUILD'
            );

            this.serveSubtext.setColor('#111111');
        } else {
            this.serveButton.setFillStyle(
                COLORS.WHITE
            );

            this.serveButton.setStrokeStyle(
                5,
                COLORS.RED_DEEP
            );

            this.serveText.setColor('#D71920');

            this.serveSubtext.setText(
                'SELECT ALL THREE INGREDIENTS'
            );

            this.serveSubtext.setColor('#777777');
        }
    }

    isBuildComplete() {
        return Boolean(
            this.selected.waffle &&
            this.selected.chicken &&
            this.selected.finish
        );
    }

    resetOptions() {
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

    tick() {
        if (this.locked) return;

        this.timeLeft--;

        this.timerText.setText(
            this.formatTime(
                Math.max(0, this.timeLeft)
            )
        );

        const ratio =
            this.timeLeft / this.maxTime;

        if (ratio <= 0.2) {
            this.timerText.setColor('#FFFFFF');

            this.timerPill
                .setFillStyle(COLORS.RED_DEEP)
                .setStrokeStyle(4, COLORS.WHITE);

            this.tweens.add({
                targets: this.timerPill,
                scaleX: 1.04,
                scaleY: 1.04,
                duration: 150,
                yoyo: true
            });
        } else if (ratio <= 0.4) {
            this.timerText.setColor('#D71920');

            this.timerPill
                .setFillStyle(COLORS.YELLOW)
                .setStrokeStyle(4, COLORS.RED_DEEP);
        } else {
            this.timerText.setColor('#D71920');

            this.timerPill
                .setFillStyle(COLORS.WHITE)
                .setStrokeStyle(4, COLORS.RED_DEEP);
        }

        if (this.timeLeft <= 0) {
            this.orderFailed('TIME OUT!');
        }
    }

    submitOrder() {
        if (this.locked) return;

        this.attempts++;

        if (!this.isBuildComplete()) {
            this.flashMessage(
                'BUILD THE COMPLETE ORDER!',
                '#D71920'
            );

            this.cameras.main.shake(
                100,
                0.003
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
            this.mistakes++;
            this.combo = 0;

            this.satisfaction = Math.max(
                0,
                this.satisfaction - 12
            );

            this.comboText.setText(
                'COMBO x0'
            );

            this.updateSatisfaction();

            this.flashMessage(
                'WRONG BUILD!',
                '#D71920'
            );

            this.shakeKitchen();

            this.locked = true;

            this.stopTimer();

            this.time.delayedCall(
                950,
                () => {
                    this.startNextOrder();
                }
            );

            return;
        }

        this.correctOrders++;

        const speedRatio =
            this.timeLeft / this.maxTime;

        let quality = 'GOOD';

        if (speedRatio >= 0.65) {
            quality = 'PERFECT';
        } else if (speedRatio >= 0.35) {
            quality = 'GREAT';
        }

        const basePoints = 500;

        const speedBonus =
            Math.round(
                this.timeLeft * 30
            );

        const difficultyBonus =
            this.currentRecipe.difficulty * 100;

        const comboMultiplier =
            Math.max(
                1,
                this.combo + 1
            );

        const points = Math.round(
            (
                basePoints +
                speedBonus +
                difficultyBonus
            ) * comboMultiplier
        );

        this.score += points;

        this.combo++;

        this.bestCombo = Math.max(
            this.bestCombo,
            this.combo
        );

        this.satisfaction = Math.min(
            100,
            this.satisfaction +
            (quality === 'PERFECT' ? 4 : 2)
        );

        this.addXP(
            100 +
            this.currentRecipe.difficulty * 25
        );

        this.scoreNumberText.setText(
            this.formatScore(this.score)
        );

        this.comboText.setText(
            `COMBO x${this.combo}`
        );

        this.updateSatisfaction();

        this.locked = true;

        this.stopTimer();

        this.flashMessage(
            `${quality}! +${points}`,
            quality === 'PERFECT'
                ? '#FFD43B'
                : '#D71920'
        );

        if (this.combo >= 3) {
            this.time.delayedCall(
                350,
                () => {
                    this.flashMessage(
                        'HAHZ MODE!',
                        '#FFD43B'
                    );
                }
            );
        }

        this.time.delayedCall(
            1100,
            () => {
                this.startNextOrder();
            }
        );
    }

    orderFailed(reason) {
        if (this.locked) return;

        this.locked = true;

        this.stopTimer();

        this.mistakes++;

        this.combo = 0;

        this.satisfaction = Math.max(
            0,
            this.satisfaction - 10
        );

        this.comboText.setText(
            'COMBO x0'
        );

        this.updateSatisfaction();

        this.flashMessage(
            reason,
            '#D71920'
        );

        this.shakeKitchen();

        this.time.delayedCall(
            1000,
            () => {
                this.startNextOrder();
            }
        );
    }

    addXP(amount) {
        this.xp += amount;

        const newLevel =
            Math.floor(this.xp / 300) + 1;

        if (newLevel > this.level) {
            this.level = newLevel;

            this.flashMessage(
                `LEVEL ${this.level}!`,
                '#FFD43B'
            );

            this.tweens.add({
                targets: this.levelText,
                scaleX: 1.25,
                scaleY: 1.25,
                duration: 180,
                yoyo: true
            });
        }

        this.level = Math.min(
            10,
            this.level
        );

        this.levelText.setText(
            `LEVEL ${this.level}`
        );
    }

    updateLevel() {
        this.levelText.setText(
            `LEVEL ${this.level}`
        );
    }

    updateSatisfaction() {
        if (!this.satisfactionBar) {
            return;
        }

        const maxWidth =
            this.scale.width - 120;

        const barWidth =
            maxWidth *
            (this.satisfaction / 100);

        this.satisfactionBar.width =
            Math.max(0, barWidth);

        if (this.satisfaction > 65) {
            this.satisfactionBar.setFillStyle(
                COLORS.GREEN
            );
        } else if (this.satisfaction > 35) {
            this.satisfactionBar.setFillStyle(
                COLORS.YELLOW
            );
        } else {
            this.satisfactionBar.setFillStyle(
                COLORS.RED_DEEP
            );
        }
    }

    flashMessage(message, color = '#D71920') {
        const { width, height } = this.scale;

        const overlay =
            this.add.rectangle(
                width / 2,
                height / 2,
                width - 80,
                230,
                COLORS.WHITE,
                0.98
            );

        overlay
            .setStrokeStyle(
                7,
                COLORS.RED_DEEP
            )
            .setDepth(100);

        const text =
            this.add.text(
                width / 2,
                height / 2,
                message,
                {
                    fontFamily: 'Arial Black',
                    fontSize: 43,
                    color,
                    align: 'center',
                    wordWrap: {
                        width: width - 130
                    }
                }
            )
            .setOrigin(0.5)
            .setDepth(101);

        this.tweens.add({
            targets: [overlay, text],
            alpha: 0,
            scaleX: 1.04,
            scaleY: 1.04,
            duration: 650,
            delay: 350,
            onComplete: () => {
                overlay.destroy();
                text.destroy();
            }
        });
    }

    shakeKitchen() {
        this.cameras.main.shake(
            180,
            0.008
        );
    }

    stopTimer() {
        if (this.timer) {
            this.timer.remove(false);
            this.timer = null;
        }
    }

    formatTime(seconds) {
        return `00:${String(
            Math.max(0, seconds)
        ).padStart(2, '0')}`;
    }

    formatScore(score) {
        return String(score).padStart(5, '0');
    }

    finishGame() {
        this.stopTimer();

        const accuracy =
            this.attempts > 0
                ? Math.round(
                    (
                        this.correctOrders /
                        this.attempts
                    ) * 100
                )
                : 0;

        this.scene.start(
            'Results',
            {
                score: this.score,
                ordersServed: this.correctOrders,
                totalOrders: this.totalOrders,
                finalCombo: this.combo,
                bestCombo: this.bestCombo,
                mistakes: this.mistakes,
                accuracy,
                satisfaction: this.satisfaction,
                level: this.level,
                xp: this.xp
            }
        );
    }
}
