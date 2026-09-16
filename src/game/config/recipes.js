// src/game/config/recipes.js

export const WAFFLE_HAHZ_RECIPES = [
    {
        id: 'nashville-hot',
        name: 'NASHVILLE HOT',
        waffle: 'Cornbread Waffle',
        chicken: 'Nashville Chicken',
        finish: 'Hot Honey',
        description:
            'Cornbread waffle + Nashville chicken + hot honey'
    },

    {
        id: 'atl-peach',
        name: 'ATL PEACH',
        waffle: 'Peach Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Peach-Habanero Glaze',
        description:
            'Peach waffle + crispy chicken + peach-habanero glaze'
    },

    {
        id: 'lemon-pepper',
        name: 'LEMON PEPPER',
        waffle: 'Lemon Waffle',
        chicken: 'Lemon-Pepper Chicken',
        finish: 'Honey',
        description:
            'Lemon waffle + lemon-pepper chicken + honey'
    },

    {
        id: 'red-velvet',
        name: 'RED VELVET',
        waffle: 'Red Velvet Waffle',
        chicken: 'Crispy Chicken',
        finish: 'Cream Cheese Honey',
        description:
            'Red velvet waffle + crispy chicken + cream cheese honey'
    },

    {
        id: 'bacon-bourbon',
        name: 'BACON BOURBON',
        waffle: 'Bacon Waffle',
        chicken: 'Fried Chicken',
        finish: 'Maple Glaze',
        description:
            'Bacon waffle + fried chicken + maple glaze'
    }
];

export const LEMON_PEPPER_WAFFLE = {
    name: 'LEMON PEPPER WAFFLE',
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
