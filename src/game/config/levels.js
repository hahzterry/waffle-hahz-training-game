// src/game/config/levels.js

/*
|--------------------------------------------------------------------------
| WAFFLE HAHZ EMPLOYEE LEVEL SYSTEM
|--------------------------------------------------------------------------
|
| The player's score determines their employee rank.
|
| 0 - 99       = KITCHEN TRAINEE
| 100 - 249    = LINE COOK
| 250 - 449    = SENIOR LINE COOK
| 450 - 699    = SHIFT LEAD
| 700+         = WAFFLE HAHZ MASTER
|
|--------------------------------------------------------------------------
*/

export const WAFFLE_HAHZ_EMPLOYEE_LEVELS = [
    {
        level: 1,
        title: 'KITCHEN TRAINEE',
        shortTitle: 'TRAINEE',

        minScore: 0,
        maxScore: 99,

        recipeId: 'nashville-hot',

        timeLimit: 60,
        targetScore: 100,

        difficulty: 'EASY',

        description:
            'Learn the kitchen. Learn the build. Learn the menu.',

        unlockMessage:
            'WELCOME TO WAFFLE HAHZ TRAINING.'
    },

    {
        level: 2,
        title: 'LINE COOK',
        shortTitle: 'LINE COOK',

        minScore: 100,
        maxScore: 249,

        recipeId: 'atl-peach',

        timeLimit: 55,
        targetScore: 150,

        difficulty: 'EASY',

        description:
            'You know the basics. Now pick up the pace.',

        unlockMessage:
            'YOU MADE THE LINE.'
    },

    {
        level: 3,
        title: 'SENIOR LINE COOK',
        shortTitle: 'SENIOR COOK',

        minScore: 250,
        maxScore: 449,

        recipeId: 'lemon-pepper',

        timeLimit: 50,
        targetScore: 200,

        difficulty: 'MEDIUM',

        description:
            'Consistency matters. Speed matters. Accuracy matters.',

        unlockMessage:
            'YOU ARE RUNNING THE LINE.'
    },

    {
        level: 4,
        title: 'SHIFT LEAD',
        shortTitle: 'SHIFT LEAD',

        minScore: 450,
        maxScore: 699,

        recipeId: 'red-velvet',

        timeLimit: 45,
        targetScore: 250,

        difficulty: 'MEDIUM',

        description:
            'Lead the kitchen. Keep the orders moving.',

        unlockMessage:
            'YOU ARE READY TO LEAD A SHIFT.'
    },

    {
        level: 5,
        title: 'WAFFLE HAHZ MASTER',
        shortTitle: 'MASTER',

        minScore: 700,
        maxScore: Infinity,

        recipeId: 'bacon-bourbon',

        timeLimit: 40,
        targetScore: 300,

        difficulty: 'HARD',

        description:
            'Master the menu. Beat the clock. Own the kitchen.',

        unlockMessage:
            'YOU HAVE MASTERED THE WAFFLE HAHZ KITCHEN.'
    }
];


/*
|--------------------------------------------------------------------------
| GET EMPLOYEE LEVEL
|--------------------------------------------------------------------------
*/

export function getEmployeeLevel(score = 0) {

    const safeScore = Math.max(
        0,
        Number(score) || 0
    );

    return (
        WAFFLE_HAHZ_EMPLOYEE_LEVELS.find(
            level =>
                safeScore >= level.minScore &&
                safeScore <= level.maxScore
        ) ||
        WAFFLE_HAHZ_EMPLOYEE_LEVELS[0]
    );
}


/*
|--------------------------------------------------------------------------
| GET LEVEL BY NUMBER
|--------------------------------------------------------------------------
*/

export function getLevel(levelNumber = 1) {

    return (
        WAFFLE_HAHZ_EMPLOYEE_LEVELS.find(
            level =>
                level.level === Number(levelNumber)
        ) ||
        WAFFLE_HAHZ_EMPLOYEE_LEVELS[0]
    );
}


/*
|--------------------------------------------------------------------------
| GET NEXT EMPLOYEE LEVEL
|--------------------------------------------------------------------------
*/

export function getNextEmployeeLevel(score = 0) {

    const currentLevel =
        getEmployeeLevel(score);

    return (
        WAFFLE_HAHZ_EMPLOYEE_LEVELS.find(
            level =>
                level.level ===
                currentLevel.level + 1
        ) ||
        null
    );
}


/*
|--------------------------------------------------------------------------
| POINTS UNTIL NEXT LEVEL
|--------------------------------------------------------------------------
*/

export function getPointsToNextLevel(score = 0) {

    const safeScore =
        Math.max(
            0,
            Number(score) || 0
        );

    const nextLevel =
        getNextEmployeeLevel(safeScore);

    if (!nextLevel) {
        return 0;
    }

    return Math.max(
        0,
        nextLevel.minScore - safeScore
    );
}


/*
|--------------------------------------------------------------------------
| CURRENT LEVEL PROGRESS
|--------------------------------------------------------------------------
*/

export function getLevelProgress(score = 0) {

    const safeScore =
        Math.max(
            0,
            Number(score) || 0
        );

    const currentLevel =
        getEmployeeLevel(safeScore);

    // Master is the highest rank.

    if (
        currentLevel.maxScore === Infinity
    ) {
        return 1;
    }

    const range =
        currentLevel.maxScore -
        currentLevel.minScore +
        1;

    const progress =
        (
            safeScore -
            currentLevel.minScore
        ) / range;

    return Math.min(
        1,
        Math.max(
            0,
            progress
        )
    );
}
