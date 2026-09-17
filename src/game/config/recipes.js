// src/game/config/recipes.js
// ─────────────────────────────────────────────────────────────
// WAFFLE HAHZ — SIGNATURE RECIPES
// Mobile-first / 9:16 game presentation
// ─────────────────────────────────────────────────────────────

export const WAFFLE_HAHZ_RECIPES = [
    {
        id: 'nashville-hot',
        number: '01',
        name: 'NASHVILLE HOT',
        shortName: 'NASHVILLE',
        waffle: 'Cornbread Waffle',
        chicken: 'Nashville Chicken',
        finish: 'Hot Honey',
        description:
            'Cornbread waffle + Nashville chicken + hot honey',
        accent: 'HOT'
    },

    {
        id: 'atl-peach',
        number: '02',
        name: 'ATL PEACH',
        shortName: 'ATL PEACH',
        waffle: 'Peach Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Peach-Habanero Glaze',
        description:
            'Peach waffle + crispy chicken + peach-habanero glaze',
        accent: 'ATL'
    },

    {
        id: 'lemon-pepper',
        number: '03',
        name: 'LEMON PEPPER',
        shortName: 'LEMON PEPPER',
        waffle: 'Lemon Waffle',
        chicken: 'Lemon-Pepper Chicken',
        finish: 'Honey',
        description:
            'Lemon waffle + lemon-pepper chicken + honey',
        accent: 'ZEST'
    },

    {
        id: 'red-velvet',
        number: '04',
        name: 'RED VELVET',
        shortName: 'RED VELVET',
        waffle: 'Red Velvet Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Cream Cheese Honey',
        description:
            'Red velvet waffle + crispy chicken + cream cheese honey',
        accent: 'SWEET'
    },

    {
        id: 'bacon-bourbon',
        number: '05',
        name: 'BACON BOURBON',
        shortName: 'BOURBON',
        waffle: 'Bacon Waffle',
        chicken: 'Fried Chicken',
        finish: 'Maple Glaze',
        description:
            'Bacon waffle + fried chicken + maple glaze',
        accent: 'SMOKY'
    }
];


// ─────────────────────────────────────────────────────────────
// FEATURED TRAINING RECIPE
// ─────────────────────────────────────────────────────────────

export const LEMON_PEPPER_WAFFLE = {
    id: 'lemon-pepper-waffle',

    name: 'LEMON PEPPER WAFFLE',

    tagline: 'THE SIGNATURE BUILD',

    description:
        'A bright, savory-sweet waffle build with lemon, cracked pepper, crispy chicken and hot honey.',

    batter: [
        'Waffle batter',
        'Fresh lemon zest',
        'Lemon powder',
        'Coarse cracked black pepper',
        'Tiny amount of garlic powder',
        'Butter',
        'Buttermilk',
        'Small amount of honey'
    ],

    finish: [
        'Lemon pepper butter',
        'Hot honey',
        'Crispy fried chicken',
        'Pickled jalapeños'
    ]
};


// ─────────────────────────────────────────────────────────────
// GAME PRESENTATION DATA
// ─────────────────────────────────────────────────────────────

export const WAFFLE_HAHZ_GAME_STYLE = {
    background: '#D71920',
    backgroundDark: '#A80F16',
    foreground: '#FFFFFF',
    ink: '#111111',
    panel: '#FFFFFF',
    accent: '#FFD400',

    // Designed around a 9:16 portrait viewport.
    portrait: {
        width: 1080,
        height: 1920,
        aspectRatio: 9 / 16
    },

    typography: {
        title: 104,
        section: 68,
        recipeName: 62,
        body: 34,
        small: 26,
        button: 42
    }
};


// ─────────────────────────────────────────────────────────────
// RECIPE HELPERS
// ─────────────────────────────────────────────────────────────

export const getRecipeById = (id) => {
    return WAFFLE_HAHZ_RECIPES.find((recipe) => recipe.id === id);
};

export const getRecipeByNumber = (number) => {
    return WAFFLE_HAHZ_RECIPES.find(
        (recipe) => recipe.number === String(number).padStart(2, '0')
    );
};

export const getRecipeIngredients = (recipe) => {
    if (!recipe) return [];

    return [
        recipe.waffle,
        recipe.chicken,
        recipe.finish
    ];
};

export const getRecipeDescription = (recipe) => {
    if (!recipe) return '';

    return recipe.description ||
        `${recipe.waffle} + ${recipe.chicken} + ${recipe.finish}`;
};
