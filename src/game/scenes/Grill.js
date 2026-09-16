// src/game/scenes/Grill.js

import * as Phaser from 'phaser';

const RECIPES = [
    {
        name: 'NASHVILLE HOT',
        description: 'Cornbread waffle + Nashville chicken + hot honey',
        waffle: 'Cornbread Waffle',
        chicken: 'Nashville Chicken',
        finish: 'Hot Honey',
        accent: 0xff4d1c
    },
    {
        name: 'ATL PEACH',
        description: 'Peach waffle + crispy chicken + peach-habanero glaze',
        waffle: 'Peach Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Peach-Habanero Glaze',
        accent: 0xff9b4dff
    },
    {
        name: 'LEMON PEPPER',
        description: 'Lemon waffle + lemon-pepper chicken + honey',
        waffle: 'Lemon Waffle',
        chicken: 'Lemon-Pepper Chicken',
        finish: 'Honey',
        accent: 0xffe8d83c
    },
    {
        name: 'RED VELVET',
        description: 'Red velvet waffle + crispy chicken + cream cheese honey',
        waffle: 'Red Velvet Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Cream Cheese Honey',
        accent: 0xffd62f45
    },
    {
        name: 'BACON BOURBON',
        description: 'Bacon waffle + fried chicken + maple glaze',
        waffle: 'Bacon Waffle',
        chicken: 'Fried Chicken',
        finish: 'Maple Glaze',
        accent: 0xffb87835
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
    }

    create() {
        this.cameras.main.setBackgroundColor('#121212');

        this.createHeader();
        this.createKitchen();
        this.startNextOrder();

        this.events.once('shutdown', () => {
            if (this.timer) {
                this.timer.remove(false);
            }
        });
    }

    createHeader() {
        const { width } = this.scale;

        this.add.text(30, 25, 'WAFFLE HAHZ', {
            fontFamily: 'Arial Black',
            fontSize: 30,
            color: '#ffffff'
        });

        this.add.text(30, 65, 'WAFFLE HAHZ GAME', {
            fontFamily: 'Arial Black',
            fontSize: 14,
            color: '#ffb000'
        });

        this.scoreText = this.add.text(width - 30, 25, 'SCORE 0000', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff'
        }).setOrigin(1, 0);

        this.comboText = this.add.text(width - 30, 62, 'COMBO x0', {
            fontFamily: 'Arial Black',
            fontSize: 18,
            color: '#ff4d1c'
        }).setOrigin(1, 0);

        this.orderText = this.add.text(width / 2, 35, 'ORDER 1 / 8', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.timerText = this.add.text(width / 2, 70, '00:30', {
            fontFamily: 'Arial Black',
            fontSize: 28,
            color: '#ffb000'
        }).setOrigin(0.5);
    }

    createKitchen() {
        const { width } = this.scale;

        this.orderPanel = this.add.rectangle(
            width / 2,
            150,
            1080,
            115,
            18
        )
        .setFillStyle(0x202020)
        .setStrokeStyle(3, 0x444444);

        this.recipeName = this.add.text(width / 2, 122, '', {
            fontFamily: 'Arial Black',
            fontSize: 30,
            color: '#ffb000'
        }).setOrigin(0.5);

        this.recipeDescription = this.add.text(width / 2, 166, '', {
            fontFamily: 'Arial',
            fontSize: 19,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(width / 2, 215, 'BUILD THE ORDER', {
            fontFamily: 'Arial Black',
            fontSize: 18,
            color: '#aaaaaa'
        }).setOrigin(0.5);

        this.createCategory('WAFFLE', 245, 'waffle');
        this.createCategory('CHICKEN', 520, 'chicken');
        this.createCategory('FINISH', 795, 'finish');

        this.selectedText = this.add.text(width / 2, 610, 'SELECT ONE FROM EACH CATEGORY', {
            fontFamily: 'Arial Black',
            fontSize: 18,
            color: '#aaaaaa'
        }).setOrigin(0.5);

        this.serveButton = this.add.rectangle(
            width / 2,
            665,
            300,
            65,
            15
        )
        .setFillStyle(0x333333)
        .setStrokeStyle(3, 0x555555)
        .setInteractive({ useHandCursor: true });

        this.serveText = this.add.text(width / 2, 665, 'SERVE ORDER', {
            fontFamily: 'Arial Black',
            fontSize: 23,
            color: '#777777'
        }).setOrigin(0.5);

        this.serveButton.on('pointerdown', () => {
            this.submitOrder();
        });
    }

    createCategory(title, x, type) {
        this.add.text(x, 250, title, {
            fontFamily: 'Arial Black',
            fontSize: 19,
            color: '#ffffff'
        }).setOrigin(0.5);

        const options = {
            waffle: [
                'Cornbread Waffle',
                'Peach Waffle',
                'Lemon Waffle',
                'Red Velvet Waffle',
                'Bacon Waffle'
            ],
            chicken: [
                'Nashville Chicken',
                'Crispy Chicken',
                'Lemon-Pepper Chicken',
                'Fried Chicken'
            ],
            finish: [
                'Hot Honey',
                'Peach-Habanero Glaze',
                'Honey',
                'Cream Cheese Honey',
                'Maple Glaze'
            ]
        };

        options[type].forEach((label, index) => {
            const y = 300 + index * 57;

            const button = this.add.rectangle(
                x,
                y,
                245,
                45,
                10
            )
            .setFillStyle(0x282828)
            .setStrokeStyle(2, 0x444444)
            .setInteractive({ useHandCursor: true });

            const text = this.add.text(x, y, label, {
                fontFamily: 'Arial',
                fontSize: 16,
                color: '#ffffff'
            }).setOrigin(0.5);

            button.on('pointerover', () => {
                if (!this.locked) {
                    button.setFillStyle(0x3b3b3b);
                }
            });

            button.on('pointerout', () => {
                if (!this.locked) {
                    button.setFillStyle(0x282828);
                }
            });

            button.on('pointerdown', () => {
                this.selectIngredient(type, label, button, text);
            });

            if (!this.optionButtons) {
                this.optionButtons = [];
            }

            this.optionButtons.push({
                type,
                label,
                button,
                text
            });
        });
    }

    selectIngredient(type, label, button, text) {
        if (this.locked) {
            return;
        }

        this.optionButtons
            .filter(option => option.type === type)
            .forEach(option => {
                option.button.setFillStyle(0x282828);
                option.button.setStrokeStyle(2, 0x444444);
                option.text.setColor('#ffffff');
            });

        button.setFillStyle(0xffb000);
        button.setStrokeStyle(3, 0xffffff);
        text.setColor('#111111');

        this.selected[type] = label;

        this.updateSelectionText();
        this.updateServeButton();
    }

    updateSelectionText() {
        const waffle = this.selected.waffle || '???';
        const chicken = this.selected.chicken || '???';
        const finish = this.selected.finish || '???';

        this.selectedText.setText(
            `${waffle}  +  ${chicken}  +  ${finish}`
        );

        this.selectedText.setColor(
            this.selected.waffle &&
            this.selected.chicken &&
            this.selected.finish
                ? '#ffffff'
                : '#aaaaaa'
        );
    }

    updateServeButton() {
        const ready =
            this.selected.waffle &&
            this.selected.chicken &&
            this.selected.finish;

        if (ready) {
            this.serveButton.setFillStyle(0xffb000);
            this.serveButton.setStrokeStyle(3, 0xffffff);
            this.serveText.setColor('#111111');
        } else {
            this.serveButton.setFillStyle(0x333333);
            this.serveButton.setStrokeStyle(3, 0x555555);
            this.serveText.setColor('#777777');
        }
    }

    startNextOrder() {
        this.locked = false;

        this.orderNumber++;

        if (this.orderNumber > this.totalOrders) {
            this.finishGame();
            return;
        }

        const recipeIndex =
            (this.orderNumber - 1) % RECIPES.length;

        this.currentRecipe = RECIPES[recipeIndex];

        this.selected = {
            waffle: null,
            chicken: null,
            finish: null
        };

        this.timeLeft = Math.max(
            15,
            30 - Math.floor((this.orderNumber - 1) / 2) * 3
        );

        this.orderText.setText(
            `ORDER ${this.orderNumber} / ${this.totalOrders}`
        );

        this.recipeName.setText(this.currentRecipe.name);
        this.recipeName.setColor(
            Phaser.Display.Color.IntegerToColor(
                this.currentRecipe.accent
            ).rgba
        );

        this.recipeDescription.setText(
            this.currentRecipe.description
        );

        this.timerText.setText(
            `00:${String(this.timeLeft).padStart(2, '0')}`
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

    resetOptions() {
        if (!this.optionButtons) {
            return;
        }

        this.optionButtons.forEach(option => {
            option.button.setFillStyle(0x282828);
            option.button.setStrokeStyle(2, 0x444444);
            option.text.setColor('#ffffff');
        });
    }

    tick() {
        if (this.locked) {
            return;
        }

        this.timeLeft--;

        this.timerText.setText(
            `00:${String(Math.max(0, this.timeLeft)).padStart(2, '0')}`
        );

        if (this.timeLeft <= 5) {
            this.timerText.setColor('#ff4d1c');
        } else {
            this.timerText.setColor('#ffb000');
        }

        if (this.timeLeft <= 0) {
            this.orderFailed('TIME OUT!');
        }
    }

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
                '#ff4d1c'
            );
            return;
        }

        const correct =
            this.selected.waffle === this.currentRecipe.waffle &&
            this.selected.chicken === this.currentRecipe.chicken &&
            this.selected.finish === this.currentRecipe.finish;

        if (!correct) {
            this.combo = 0;
            this.comboText.setText('COMBO x0');

            this.flashMessage(
                'WRONG BUILD!',
                '#ff4d1c'
            );

            this.shakeKitchen();
            return;
        }

        const speedBonus = this.timeLeft * 25;
        const comboMultiplier = Math.max(1, this.combo + 1);
        const points =
            (500 + speedBonus) * comboMultiplier;

        this.score += points;
        this.combo++;

        this.scoreText.setText(
            `SCORE ${String(this.score).padStart(4, '0')}`
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
            '#65ff5c'
        );

        if (this.combo >= 3) {
            this.time.delayedCall(500, () => {
                this.flashMessage(
                    '🔥 HAHZ MODE!',
                    '#ffb000'
                );
            });
        }

        this.time.delayedCall(1300, () => {
            this.startNextOrder();
        });
    }

    orderFailed(reason) {
        if (this.locked) {
            return;
        }

        this.locked = true;

        if (this.timer) {
            this.timer.remove(false);
        }

        this.combo = 0;
        this.comboText.setText('COMBO x0');

        this.flashMessage(
            reason,
            '#ff4d1c'
        );

        this.time.delayedCall(1200, () => {
            this.startNextOrder();
        });
    }

    flashMessage(message, color) {
        const { width, height } = this.scale;

        const overlay = this.add.rectangle(
            width / 2,
            height / 2,
            560,
            120,
            0x000000,
            0.9
        );

        const text = this.add.text(
            width / 2,
            height / 2,
            message,
            {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: [overlay, text],
            alpha: 0,
            duration: 1000,
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

    finishGame() {
        if (this.timer) {
            this.timer.remove(false);
        }

        this.scene.start('Results', {
            score: this.score,
            orders: this.totalOrders,
            combo: this.combo
        });
    }
}
