import Phaser from 'phaser';

export default class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor('#121212');

        this.add.text(width / 2, 110, 'WAFFLE HAHZ', {
            fontFamily: 'Arial Black',
            fontSize: '76px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, 195, 'THE HOUSE ALTERNATIVE', {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffb000',
            letterSpacing: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, 285, 'WAFFLE HAHZ GAME', {
            fontFamily: 'Arial Black',
            fontSize: '42px',
            color: '#ff4d1c'
        }).setOrigin(0.5);

        this.add.text(width / 2, 330, 'TRAINING DAY', {
            fontFamily: 'Arial Black',
            fontSize: '22px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const playButton = this.add.rectangle(
            width / 2,
            455,
            340,
            85,
            16
        )
        .setFillStyle(0xffb000)
        .setStrokeStyle(4, 0xffffff)
        .setInteractive({
            useHandCursor: true
        });

        const playText = this.add.text(
            width / 2,
            455,
            'START TRAINING',
            {
                fontFamily: 'Arial Black',
                fontSize: '28px',
                color: '#121212'
            }
        ).setOrigin(0.5);

        playButton.on('pointerover', () => {
            playButton.setFillStyle(0xffffff);
            playText.setColor('#121212');
            playButton.setScale(1.04);
        });

        playButton.on('pointerout', () => {
            playButton.setFillStyle(0xffb000);
            playText.setColor('#121212');
            playButton.setScale(1);
        });

        playButton.on('pointerdown', () => {
            this.scene.start('GrillInstructions');
        });

        this.add.text(
            width / 2,
            590,
            'Master the waffle. Master the chicken. Master the rush.',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#999999'
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            height - 30,
            'NASHVILLE HOT  •  ATL PEACH  •  LEMON PEPPER  •  RED VELVET  •  BACON BOURBON',
            {
                fontFamily: 'Arial',
                fontSize: '13px',
                color: '#666666'
            }
        ).setOrigin(0.5);
    }
}
