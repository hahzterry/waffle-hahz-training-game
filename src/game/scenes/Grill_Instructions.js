import * as Phaser from 'phaser';

export default class GrillInstructions extends Phaser.Scene {
    constructor() {
        super('GrillInstructions');
    }

    create() {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor('#181818');

        // HEADER
        this.add.text(width / 2, 70, 'WAFFLE HAHZ TRAINING', {
            fontFamily: 'Arial Black',
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(width / 2, 125, 'LEARN THE FIVE SIGNATURE BUILDS', {
            fontFamily: 'Arial Black',
            fontSize: '20px',
            color: '#ffb000'
        }).setOrigin(0.5);

        // RECIPES
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

        builds.forEach((item, index) => {
            const y = 195 + index * 65;

            this.add.text(
                150,
                y,
                item.name,
                {
                    fontFamily: 'Arial Black',
                    fontSize: '21px',
                    color: '#ff4d1c'
                }
            );

            this.add.text(
                405,
                y,
                `${item.waffle} + ${item.chicken} + ${item.finish}`,
                {
                    fontFamily: 'Arial',
                    fontSize: '19px',
                    color: '#ffffff'
                }
            );
        });

        // START BUTTON
        const start = this.add.rectangle(
            width / 2,
            610,
            320,
            70,
            14
        )
        .setFillStyle(0xffb000)
        .setStrokeStyle(3, 0xffffff)
        .setInteractive({ useHandCursor: true });

        const startText = this.add.text(
            width / 2,
            610,
            'ENTER THE KITCHEN',
            {
                fontFamily: 'Arial Black',
                fontSize: '23px',
                color: '#111111'
            }
        ).setOrigin(0.5);

        start.on('pointerover', () => {
            start.setFillStyle(0xffffff);
            start.setScale(1.04);
        });

        start.on('pointerout', () => {
            start.setFillStyle(0xffb000);
            start.setScale(1);
        });

        start.on('pointerdown', () => {
            this.scene.start('Grill');
        });

        // FOOTER
        this.add.text(
            width / 2,
            height - 20,
            'LEARN IT. BUILD IT. SERVE IT.',
            {
                fontFamily: 'Arial Black',
                fontSize: '13px',
                color: '#666666'
            }
        ).setOrigin(0.5);
    }
}
