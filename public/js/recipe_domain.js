function RecipeManager() {

    const recipe_base = {
        "miner": {
            "iron-ore": {
                name: "Iron ore",
                multiplier: 1,
                output: {
                    impure: {
                        "iron-ore": 30,
                    },
                    normal: {
                        "iron-ore": 60,
                    },
                    pure: {
                        "iron-ore": 120,
                    },

                }
            },
            "cooper-ore": {
                name: "Cooper ore",
                multiplier: 1,
                output: {
                    impure: {
                        "cooper-ore": 30,
                    },
                    normal: {
                        "cooper-ore": 60,
                    },
                    pure: {
                        "cooper-ore": 120,
                    },

                }
            }
        },
        "smelter": {
            "iron-ingot": {
                name: "Iron ingot",
                input: {
                    "iron-ore": 30
                },
                output: {
                    "iron-ingot": 30
                }
            },
            "cooper-ingot": {
                name: "Cooper ingot",
                input: {
                    "cooper-ore": 30
                },
                output: {
                    "cooper-ingot": 30
                }
            }
        }

    };
}


