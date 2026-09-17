import * as Phaser from 'phaser';

/**
 * Makes a Phaser GameObject draggable.
 *
 * Works with Phaser 3 GameObjects that support input.
 *
 * @param {Phaser.GameObjects.GameObject} gameObject
 * @param {boolean} enableLogs
 * @returns {Phaser.GameObjects.GameObject}
 */
export function makeDraggable(
    gameObject,
    enableLogs = false
) {
    if (!gameObject) {
        throw new Error(
            'makeDraggable: gameObject is required.'
        );
    }

    const scene = gameObject.scene;

    if (!scene || !scene.input) {
        throw new Error(
            'makeDraggable: gameObject must belong to an active Phaser Scene.'
        );
    }

    gameObject.setInteractive({
        useHandCursor: true
    });

    scene.input.setDraggable(
        gameObject,
        true
    );

    const originalDepth =
        gameObject.depth || 0;

    function log(message) {
        if (enableLogs) {
            console.debug(
                `[makeDraggable] ${message}`
            );
        }
    }

    function onDragStart(
        pointer,
        draggedObject
    ) {
        if (
            draggedObject !== gameObject
        ) {
            return;
        }

        gameObject.setData(
            'dragStartX',
            gameObject.x
        );

        gameObject.setData(
            'dragStartY',
            gameObject.y
        );

        gameObject.setData(
            'isDragging',
            true
        );

        gameObject.setDepth(
            originalDepth + 100
        );

        gameObject.setScale(
            1.04
        );

        log(
            `dragstart: ${gameObject.name || 'unnamed'}`
        );
    }

    function onDrag(
        pointer,
        draggedObject,
        dragX,
        dragY
    ) {
        if (
            draggedObject !== gameObject
        ) {
            return;
        }

        gameObject.x = dragX;
        gameObject.y = dragY;

        log(
            `drag: ${gameObject.name || 'unnamed'}`
        );
    }

    function onDragEnd(
        pointer,
        draggedObject
    ) {
        if (
            draggedObject !== gameObject
        ) {
            return;
        }

        gameObject.setData(
            'isDragging',
            false
        );

        gameObject.setDepth(
            originalDepth
        );

        gameObject.setScale(
            1
        );

        gameObject.x =
            Math.round(
                gameObject.x
            );

        gameObject.y =
            Math.round(
                gameObject.y
            );

        log(
            `dragend: ${gameObject.name || 'unnamed'}`
        );
    }

    function onDestroy() {
        scene.input.off(
            Phaser.Input.Events.DRAG_START,
            onDragStart
        );

        scene.input.off(
            Phaser.Input.Events.DRAG,
            onDrag
        );

        scene.input.off(
            Phaser.Input.Events.DRAG_END,
            onDragEnd
        );

        log(
            `destroy: ${gameObject.name || 'unnamed'}`
        );
    }

    scene.input.on(
        Phaser.Input.Events.DRAG_START,
        onDragStart
    );

    scene.input.on(
        Phaser.Input.Events.DRAG,
        onDrag
    );

    scene.input.on(
        Phaser.Input.Events.DRAG_END,
        onDragEnd
    );

    gameObject.once(
        Phaser.GameObjects.Events.DESTROY,
        onDestroy
    );

    return gameObject;
}
