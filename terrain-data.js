/**
 * Terrain Layout Data
 * Board dimensions: 44 units tall x 60 units wide
 * Units = squares on the grid
 */

// Conversion: 1 unit = 20 pixels (for good visibility)
const UNIT_TO_PX = 20;
const BOARD_WIDTH_UNITS = 60;  // 60 units wide
const BOARD_HEIGHT_UNITS = 44; // 44 units tall
const SVG_WIDTH = 60 * UNIT_TO_PX;  // 1200px
const SVG_HEIGHT = 44 * UNIT_TO_PX; // 880px

// No scaling factor needed - direct unit to pixel conversion
const SCALE_FACTOR = 1;

/**
 * Double mirror: reflect across both X and Y axes (center of board)
 * X mirror: (x, y) -> (BOARD_WIDTH_UNITS - x, y)
 * Y mirror: (x, y) -> (x, BOARD_HEIGHT_UNITS - y)
 * Combined: (x, y) -> (BOARD_WIDTH_UNITS - x, BOARD_HEIGHT_UNITS - y)
 */
function mirrorAcrossDiagonal(point) {
    return {
        x: BOARD_WIDTH_UNITS - point.x,
        y: BOARD_HEIGHT_UNITS - point.y
    };
}

function mirrorRectangle(rect) {
    const pts = [
        { x: rect.position.x, y: rect.position.y },
        { x: rect.position.x + rect.dimensions.width, y: rect.position.y },
        { x: rect.position.x + rect.dimensions.width, y: rect.position.y + rect.dimensions.height },
        { x: rect.position.x, y: rect.position.y + rect.dimensions.height }
    ].map(mirrorAcrossDiagonal);
    const xs = pts.map(p => p.x);
    const ys = pts.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return {
        position: { x: minX, y: minY },
        dimensions: { width: maxX - minX, height: maxY - minY }
    };
}

/**
 * Terrain Layout 3 - Based on PDF measurements
 * This represents the exact layout from the PDF with all measurements
 */

/**
 * Terrain Layout 1 (from Layout1.png + provided coordinates)
 * Left-side plates provided, mirrored across bottom-left to top-right diagonal.
 */
const TERRAIN_LAYOUT_1 = {
    id: "gw_1",
    category: "GW",
    name: "GW 1",
    boardWidth: 60,  // 60 units wide
    boardHeight: 44, // 44 units tall
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "terrain_shape_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 6, y: 27 },
                { x: 6, y: 39 },
                { x: 12, y: 39 },
                { x: 12, y: 27 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_2_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 8, y: 22 },
                { x: 16, y: 22 },
                { x: 16, y: 16 },
                { x: 8, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_2_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 4, y: 22 },
                { x: 8, y: 22 },
                { x: 8, y: 16 },
                { x: 4, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 16, y: 16 },
                { x: 22, y: 16 },
                { x: 22, y: 4 },
                { x: 16, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_l_shape_blue_1",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 22.22, y: 19.22 },
                { x: 26.46, y: 23.46 },
                { x: 23.70, y: 26.22 },
                { x: 19.46, y: 21.98 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_l_shape_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 26.46, y: 23.46 },
                { x: 30, y: 27 },
                { x: 25.76, y: 31.24 },
                { x: 22.22, y: 27.70 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_l_shape_blue_2",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 25.76, y: 31.24 },
                { x: 23, y: 34 },
                { x: 19.46, y: 30.46 },
                { x: 22.22, y: 27.70 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_5",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 28, y: 0 },
                { x: 28, y: 6 },
                { x: 32, y: 6 },
                { x: 32, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 6, y: 27 }),
                mirrorAcrossDiagonal({ x: 6, y: 39 }),
                mirrorAcrossDiagonal({ x: 12, y: 39 }),
                mirrorAcrossDiagonal({ x: 12, y: 27 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_2_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 8, y: 22 }),
                mirrorAcrossDiagonal({ x: 16, y: 22 }),
                mirrorAcrossDiagonal({ x: 16, y: 16 }),
                mirrorAcrossDiagonal({ x: 8, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_2_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 4, y: 22 }),
                mirrorAcrossDiagonal({ x: 8, y: 22 }),
                mirrorAcrossDiagonal({ x: 8, y: 16 }),
                mirrorAcrossDiagonal({ x: 4, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_3_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 16, y: 16 }),
                mirrorAcrossDiagonal({ x: 22, y: 16 }),
                mirrorAcrossDiagonal({ x: 22, y: 4 }),
                mirrorAcrossDiagonal({ x: 16, y: 4 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_l_shape_blue_1_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 22.22, y: 19.22 }),
                mirrorAcrossDiagonal({ x: 26.46, y: 23.46 }),
                mirrorAcrossDiagonal({ x: 23.70, y: 26.22 }),
                mirrorAcrossDiagonal({ x: 19.46, y: 21.98 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_l_shape_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 26.46, y: 23.46 }),
                mirrorAcrossDiagonal({ x: 30, y: 27 }),
                mirrorAcrossDiagonal({ x: 25.76, y: 31.24 }),
                mirrorAcrossDiagonal({ x: 22.22, y: 27.70 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_l_shape_blue_2_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 25.76, y: 31.24 }),
                mirrorAcrossDiagonal({ x: 23, y: 34 }),
                mirrorAcrossDiagonal({ x: 19.46, y: 30.46 }),
                mirrorAcrossDiagonal({ x: 22.22, y: 27.70 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "terrain_shape_5_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 28, y: 0 }),
                mirrorAcrossDiagonal({ x: 28, y: 6 }),
                mirrorAcrossDiagonal({ x: 32, y: 6 }),
                mirrorAcrossDiagonal({ x: 32, y: 0 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw1_ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 12, y: 31 },
                { x: 12, y: 39 },
                { x: 8, y: 39 },
                { x: 8, y: 38.5 },
                { x: 11.5, y: 38.5 },
                { x: 11.5, y: 31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw1_ruin_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 12, y: 31 }),
                mirrorAcrossDiagonal({ x: 12, y: 39 }),
                mirrorAcrossDiagonal({ x: 8, y: 39 }),
                mirrorAcrossDiagonal({ x: 8, y: 38.5 }),
                mirrorAcrossDiagonal({ x: 11.5, y: 38.5 }),
                mirrorAcrossDiagonal({ x: 11.5, y: 31 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw1_ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 8, y: 22 },
                { x: 16, y: 22 },
                { x: 16, y: 18 },
                { x: 15.5, y: 18 },
                { x: 15.5, y: 21.5 },
                { x: 8, y: 21.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw1_ruin_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 8, y: 22 }),
                mirrorAcrossDiagonal({ x: 16, y: 22 }),
                mirrorAcrossDiagonal({ x: 16, y: 18 }),
                mirrorAcrossDiagonal({ x: 15.5, y: 18 }),
                mirrorAcrossDiagonal({ x: 15.5, y: 21.5 }),
                mirrorAcrossDiagonal({ x: 8, y: 21.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw1_ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 22, y: 6 },
                { x: 18, y: 6 },
                { x: 18, y: 6.5 },
                { x: 21.5, y: 6.5 },
                { x: 21.5, y: 13.5 },
                { x: 18, y: 13.5 },
                { x: 18, y: 14 },
                { x: 22, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw1_ruin_3_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 22, y: 6 }),
                mirrorAcrossDiagonal({ x: 18, y: 6 }),
                mirrorAcrossDiagonal({ x: 18, y: 6.5 }),
                mirrorAcrossDiagonal({ x: 21.5, y: 6.5 }),
                mirrorAcrossDiagonal({ x: 21.5, y: 13.5 }),
                mirrorAcrossDiagonal({ x: 18, y: 13.5 }),
                mirrorAcrossDiagonal({ x: 18, y: 14 }),
                mirrorAcrossDiagonal({ x: 22, y: 14 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw1_ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 26.46, y: 23.46 },
                { x: 30, y: 27 },
                { x: 25.76, y: 31.24 },
                { x: 25.40, y: 30.89 },
                { x: 29.29, y: 27.00 },
                { x: 26.11, y: 23.82 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw1_ruin_4_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 26.46, y: 23.46 }),
                mirrorAcrossDiagonal({ x: 30, y: 27 }),
                mirrorAcrossDiagonal({ x: 25.76, y: 31.24 }),
                mirrorAcrossDiagonal({ x: 25.40, y: 30.89 }),
                mirrorAcrossDiagonal({ x: 29.29, y: 27.00 }),
                mirrorAcrossDiagonal({ x: 26.11, y: 23.82 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

/**
 * Get a random terrain layout
 * Returns a random layout from all 8 available layouts
 */
function getRandomTerrainLayout() {
    const layouts = [
        TERRAIN_LAYOUT_1,
        TERRAIN_LAYOUT_2,
        TERRAIN_LAYOUT_3,
        TERRAIN_LAYOUT_4,
        TERRAIN_LAYOUT_5,
        TERRAIN_LAYOUT_6,
        TERRAIN_LAYOUT_7,
        TERRAIN_LAYOUT_8
    ];
    const index = Math.floor(Math.random() * layouts.length);
    return layouts[index];
}

/**
 * Terrain Layout 2
 */
const TERRAIN_LAYOUT_2 = {
    id: "gw_2",
    category: "GW",
    name: "GW 2",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "l2_shape_1",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 2, y: 16 },
                { x: 2, y: 20 },
                { x: 8, y: 20 },
                { x: 8, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 8, y: 16 },
                { x: 14, y: 16 },
                { x: 14, y: 4 },
                { x: 8, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_3_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 5, y: 28 },
                { x: 5, y: 32 },
                { x: 11, y: 32 },
                { x: 11, y: 28 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_3_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 32 },
                { x: 5, y: 40 },
                { x: 11, y: 40 },
                { x: 11, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_4_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 20, y: 40 },
                { x: 20, y: 35 },
                { x: 23.5, y: 35 },
                { x: 23.5, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_4_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 23.5, y: 40 },
                { x: 23.5, y: 35 },
                { x: 30, y: 35 },
                { x: 30, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_5",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 30, y: 35 },
                { x: 30, y: 31 },
                { x: 36, y: 31 },
                { x: 36, y: 35 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_6",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 13, y: 24 },                    // Start
                { x: 21.485, y: 15.515 },           // Up-right 12 units along slope 1: (13 + 8.485, 24 - 8.485)
                { x: 25.728, y: 19.757 },           // Down-right 6 units along slope -1: (21.485 + 4.243, 15.515 + 4.243)
                { x: 17.243, y: 28.242 }            // Down-left 12 units along slope 1: (25.728 - 8.485, 19.757 + 8.485)
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 2, y: 16 }),
                mirrorAcrossDiagonal({ x: 2, y: 20 }),
                mirrorAcrossDiagonal({ x: 8, y: 20 }),
                mirrorAcrossDiagonal({ x: 8, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 8, y: 16 }),
                mirrorAcrossDiagonal({ x: 14, y: 16 }),
                mirrorAcrossDiagonal({ x: 14, y: 4 }),
                mirrorAcrossDiagonal({ x: 8, y: 4 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_3_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 28 }),
                mirrorAcrossDiagonal({ x: 5, y: 32 }),
                mirrorAcrossDiagonal({ x: 11, y: 32 }),
                mirrorAcrossDiagonal({ x: 11, y: 28 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_3_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 32 }),
                mirrorAcrossDiagonal({ x: 5, y: 40 }),
                mirrorAcrossDiagonal({ x: 11, y: 40 }),
                mirrorAcrossDiagonal({ x: 11, y: 32 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_4_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 20, y: 40 }),
                mirrorAcrossDiagonal({ x: 20, y: 35 }),
                mirrorAcrossDiagonal({ x: 23.5, y: 35 }),
                mirrorAcrossDiagonal({ x: 23.5, y: 40 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_4_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23.5, y: 40 }),
                mirrorAcrossDiagonal({ x: 23.5, y: 35 }),
                mirrorAcrossDiagonal({ x: 30, y: 35 }),
                mirrorAcrossDiagonal({ x: 30, y: 40 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_5_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 30, y: 35 }),
                mirrorAcrossDiagonal({ x: 30, y: 31 }),
                mirrorAcrossDiagonal({ x: 36, y: 31 }),
                mirrorAcrossDiagonal({ x: 36, y: 35 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l2_shape_6_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 13, y: 24 }),
                mirrorAcrossDiagonal({ x: 21.485, y: 15.515 }),
                mirrorAcrossDiagonal({ x: 25.728, y: 19.757 }),
                mirrorAcrossDiagonal({ x: 17.243, y: 28.242 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw2_ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 11, y: 32 },
                { x: 11, y: 40 },
                { x: 7, y: 40 },
                { x: 7, y: 39.5 },
                { x: 10.5, y: 39.5 },
                { x: 10.5, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw2_ruin_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 11, y: 32 }),
                mirrorAcrossDiagonal({ x: 11, y: 40 }),
                mirrorAcrossDiagonal({ x: 7, y: 40 }),
                mirrorAcrossDiagonal({ x: 7, y: 39.5 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 39.5 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 32 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw2_ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 18.66, y: 26.83 },
                { x: 15.83, y: 24.00 },
                { x: 16.18, y: 23.65 },
                { x: 18.66, y: 26.12 },
                { x: 23.61, y: 21.17 },
                { x: 21.13, y: 18.70 },
                { x: 21.49, y: 18.34 },
                { x: 24.31, y: 21.17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw2_ruin_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 18.66, y: 26.83 }),
                mirrorAcrossDiagonal({ x: 15.83, y: 24.00 }),
                mirrorAcrossDiagonal({ x: 16.18, y: 23.65 }),
                mirrorAcrossDiagonal({ x: 18.66, y: 26.12 }),
                mirrorAcrossDiagonal({ x: 23.61, y: 21.17 }),
                mirrorAcrossDiagonal({ x: 21.13, y: 18.70 }),
                mirrorAcrossDiagonal({ x: 21.49, y: 18.34 }),
                mirrorAcrossDiagonal({ x: 24.31, y: 21.17 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw2_ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 14, y: 8 },
                { x: 14, y: 16 },
                { x: 10, y: 16 },
                { x: 10, y: 15.5 },
                { x: 13.5, y: 15.5 },
                { x: 13.5, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw2_ruin_3_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 14, y: 8 }),
                mirrorAcrossDiagonal({ x: 14, y: 16 }),
                mirrorAcrossDiagonal({ x: 10, y: 16 }),
                mirrorAcrossDiagonal({ x: 10, y: 15.5 }),
                mirrorAcrossDiagonal({ x: 13.5, y: 15.5 }),
                mirrorAcrossDiagonal({ x: 13.5, y: 8 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw2_ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 30, y: 35 },
                { x: 23.5, y: 35 },
                { x: 23.5, y: 40 },
                { x: 24, y: 40 },
                { x: 24, y: 35.5 },
                { x: 30, y: 35.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw2_ruin_4_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 30, y: 35 }),
                mirrorAcrossDiagonal({ x: 23.5, y: 35 }),
                mirrorAcrossDiagonal({ x: 23.5, y: 40 }),
                mirrorAcrossDiagonal({ x: 24, y: 40 }),
                mirrorAcrossDiagonal({ x: 24, y: 35.5 }),
                mirrorAcrossDiagonal({ x: 30, y: 35.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

/**
 * Terrain Layout 3
 */
const TERRAIN_LAYOUT_3 = {
    id: "gw_3",
    category: "GW",
    name: "GW 3",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "l3_shape_1",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 10, y: 40 },
                { x: 10, y: 36 },
                { x: 16, y: 36 },
                { x: 16, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 22, y: 40 },
                { x: 22, y: 34 },
                { x: 34, y: 34 },
                { x: 34, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 14, y: 6 },
                { x: 4, y: 12 },
                { x: 4 + 3.084, y: 12 + 5.142 },
                { x: 14 + 3.084, y: 6 + 5.142 }
            ],
            traits: ["Defensible", "Obscuring"]
        },  
        {
            id: "l3_angled_4_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 2, y: 25 },
                { x: 4.69, y: 28.02 },
                { x: 9.17, y: 24.04 },
                { x: 6.488, y: 21.016 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_4_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 4.69, y: 28.02 },
                { x: 10, y: 34 },
                { x: 14.488, y: 30.016 },
                { x: 9.17, y: 24.04 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_5_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 17, y: 27 },
                { x: 21, y: 30 },
                { x: 23.1, y: 27.2 },
                { x: 19.1, y: 24.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_5_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 19.1, y: 24.2 },
                { x: 23.1, y: 27.2 },
                { x: 27, y: 22 },
                { x: 23, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_6",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 23, y: 13 },
                { x: 26, y: 15 },
                { x: 22, y: 20 },
                { x: 19, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_shape_1_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 10, y: 40 }),
                mirrorAcrossDiagonal({ x: 10, y: 36 }),
                mirrorAcrossDiagonal({ x: 16, y: 36 }),
                mirrorAcrossDiagonal({ x: 16, y: 40 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_shape_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 22, y: 40 }),
                mirrorAcrossDiagonal({ x: 22, y: 34 }),
                mirrorAcrossDiagonal({ x: 34, y: 34 }),
                mirrorAcrossDiagonal({ x: 34, y: 40 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 14, y: 6 }),
                mirrorAcrossDiagonal({ x: 4, y: 12 }),
                mirrorAcrossDiagonal({ x: 7.084, y: 17.142 }),
                mirrorAcrossDiagonal({ x: 17.084, y: 11.142 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_4_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 2, y: 25 }),
                mirrorAcrossDiagonal({ x: 4.69, y: 28.02 }),
                mirrorAcrossDiagonal({ x: 9.17, y: 24.04 }),
                mirrorAcrossDiagonal({ x: 6.488, y: 21.016 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_4_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 4.69, y: 28.02 }),
                mirrorAcrossDiagonal({ x: 10, y: 34 }),
                mirrorAcrossDiagonal({ x: 14.488, y: 30.016 }),
                mirrorAcrossDiagonal({ x: 9.17, y: 24.04 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_5_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 17, y: 27 }),
                mirrorAcrossDiagonal({ x: 21, y: 30 }),
                mirrorAcrossDiagonal({ x: 23.1, y: 27.2 }),
                mirrorAcrossDiagonal({ x: 19.1, y: 24.2 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_5_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 19.1, y: 24.2 }),
                mirrorAcrossDiagonal({ x: 23.1, y: 27.2 }),
                mirrorAcrossDiagonal({ x: 27, y: 22 }),
                mirrorAcrossDiagonal({ x: 23, y: 19 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l3_angled_6_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23, y: 13 }),
                mirrorAcrossDiagonal({ x: 26, y: 15 }),
                mirrorAcrossDiagonal({ x: 22, y: 20 }),
                mirrorAcrossDiagonal({ x: 19, y: 18 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw3_ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 9.17, y: 24.04 },
                { x: 14.49, y: 30.02 },
                { x: 11.50, y: 32.67 },
                { x: 11.16, y: 32.30 },
                { x: 13.78, y: 29.97 },
                { x: 8.80, y: 24.37 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw3_ruin_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 9.17, y: 24.04 }),
                mirrorAcrossDiagonal({ x: 14.49, y: 30.02 }),
                mirrorAcrossDiagonal({ x: 11.50, y: 32.67 }),
                mirrorAcrossDiagonal({ x: 11.16, y: 32.30 }),
                mirrorAcrossDiagonal({ x: 13.78, y: 29.97 }),
                mirrorAcrossDiagonal({ x: 8.80, y: 24.37 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw3_ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 10.22, y: 15.26 },
                { x: 17.08, y: 11.14 },
                { x: 15.03, y: 7.71 },
                { x: 14.60, y: 7.97 },
                { x: 16.40, y: 10.97 },
                { x: 9.96, y: 14.83 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw3_ruin_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 10.22, y: 15.26 }),
                mirrorAcrossDiagonal({ x: 17.08, y: 11.14 }),
                mirrorAcrossDiagonal({ x: 15.03, y: 7.71 }),
                mirrorAcrossDiagonal({ x: 14.60, y: 7.97 }),
                mirrorAcrossDiagonal({ x: 16.40, y: 10.97 }),
                mirrorAcrossDiagonal({ x: 9.96, y: 14.83 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw3_ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 24, y: 34 },
                { x: 24, y: 38 },
                { x: 24.5, y: 38 },
                { x: 24.5, y: 34.5 },
                { x: 31.5, y: 34.5 },
                { x: 31.5, y: 38 },
                { x: 32, y: 38 },
                { x: 32, y: 34 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw3_ruin_3_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 24, y: 34 }),
                mirrorAcrossDiagonal({ x: 24, y: 38 }),
                mirrorAcrossDiagonal({ x: 24.5, y: 38 }),
                mirrorAcrossDiagonal({ x: 24.5, y: 34.5 }),
                mirrorAcrossDiagonal({ x: 31.5, y: 34.5 }),
                mirrorAcrossDiagonal({ x: 31.5, y: 38 }),
                mirrorAcrossDiagonal({ x: 32, y: 38 }),
                mirrorAcrossDiagonal({ x: 32, y: 34 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw3_ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 23.1, y: 27.2 },
                { x: 27, y: 22 },
                { x: 23, y: 19 },
                { x: 22.7, y: 19.4 },
                { x: 26.3, y: 22.1 },
                { x: 22.7, y: 26.9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw3_ruin_4_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23.1, y: 27.2 }),
                mirrorAcrossDiagonal({ x: 27, y: 22 }),
                mirrorAcrossDiagonal({ x: 23, y: 19 }),
                mirrorAcrossDiagonal({ x: 22.7, y: 19.4 }),
                mirrorAcrossDiagonal({ x: 26.3, y: 22.1 }),
                mirrorAcrossDiagonal({ x: 22.7, y: 26.9 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

/**
 * Terrain Layout 4
 */
const TERRAIN_LAYOUT_4 = {
    id: "gw_4",
    category: "GW",
    name: "GW 4",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "l4_shape_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 12, y: 40 },
                { x: 12, y: 34 },
                { x: 24, y: 34 },
                { x: 24, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_ruin_l_shape_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 24, y: 38 },
                { x: 24, y: 34 },
                { x: 16, y: 34 },
                { x: 16, y: 34.5 },
                { x: 23.5, y: 34.5 },
                { x: 23.5, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_shape_2",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 12, y: 34 },
                { x: 8, y: 34 },
                { x: 8, y: 28 },
                { x: 12, y: 28 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_shape_3",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 4, y: 25 },
                { x: 4, y: 19 },
                { x: 8, y: 19 },
                { x: 8, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 4, y: 12 },                     // Point 1
                { x: 13, y: 4 },                     // Point 2
                { x: 13 + 3.984, y: 4 + 4.488 },    // Around (17, 8.x): (16.984, 8.488)
                { x: 4 + 3.984, y: 12 + 4.488 }     // Around (8, 16.x): (7.984, 16.488)
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_ruin_u_shape_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 9.48, y: 15.16 },
                { x: 6.82, y: 12.17 },
                { x: 7.2, y: 11.84 },
                { x: 9.52, y: 14.45 },
                { x: 14.75, y: 9.8 },
                { x: 12.43, y: 7.19 },
                { x: 12.8, y: 6.85 },
                { x: 15.46, y: 9.84 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_2_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 21, y: 17 },
                { x: 24.76, y: 20.3 },
                { x: 22.45, y: 22.93 },
                { x: 18.69, y: 19.63 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_2_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 18.69, y: 19.63 },
                { x: 22.45, y: 22.93 },
                { x: 18, y: 28 },
                { x: 14.24, y: 24.7 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_ruin_l_shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 14.24, y: 24.7 },
                { x: 18, y: 28 },
                { x: 22.45, y: 22.93 },
                { x: 22.07, y: 22.6 },
                { x: 17.95, y: 27.3 },
                { x: 14.57, y: 24.32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_3_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 30, y: 6 },
                { x: 25.2, y: 2.4 },
                { x: 22.8, y: 5.6 },
                { x: 27.6, y: 9.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_3_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 22.8, y: 5.6 },
                { x: 18, y: 12 },
                { x: 22.8, y: 15.6 },
                { x: 27.6, y: 9.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_ruin_l_shape_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 19.6, y: 13.2 },  // outer: on piece, 4" from corner (22.8,15.6) toward (18,12)
                { x: 22.8, y: 15.6 },  // L corner (bottom-right of piece)
                { x: 27.6, y: 9.2 },   // outer: on piece, 8" from corner toward (30,6)
                { x: 27.2, y: 8.9 },   // inner end of 8" arm
                { x: 22.7, y: 14.9 },  // inner corner (intersection of offset lines)
                { x: 19.9, y: 12.8 }   // inner end of 4" arm
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_shape_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 12, y: 40 }),
                mirrorAcrossDiagonal({ x: 12, y: 34 }),
                mirrorAcrossDiagonal({ x: 24, y: 34 }),
                mirrorAcrossDiagonal({ x: 24, y: 40 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_ruin_l_shape_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 24, y: 38 }),
                mirrorAcrossDiagonal({ x: 24, y: 34 }),
                mirrorAcrossDiagonal({ x: 16, y: 34 }),
                mirrorAcrossDiagonal({ x: 16, y: 34.5 }),
                mirrorAcrossDiagonal({ x: 23.5, y: 34.5 }),
                mirrorAcrossDiagonal({ x: 23.5, y: 38 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_shape_2_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 12, y: 34 }),
                mirrorAcrossDiagonal({ x: 8, y: 34 }),
                mirrorAcrossDiagonal({ x: 8, y: 28 }),
                mirrorAcrossDiagonal({ x: 12, y: 28 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_shape_3_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 4, y: 25 }),
                mirrorAcrossDiagonal({ x: 4, y: 19 }),
                mirrorAcrossDiagonal({ x: 8, y: 19 }),
                mirrorAcrossDiagonal({ x: 8, y: 25 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 4, y: 12 }),
                mirrorAcrossDiagonal({ x: 13, y: 4 }),
                mirrorAcrossDiagonal({ x: 16.984, y: 8.488 }),
                mirrorAcrossDiagonal({ x: 7.984, y: 16.488 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_ruin_u_shape_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 9.48, y: 15.16 }),
                mirrorAcrossDiagonal({ x: 6.82, y: 12.17 }),
                mirrorAcrossDiagonal({ x: 7.2, y: 11.84 }),
                mirrorAcrossDiagonal({ x: 9.52, y: 14.45 }),
                mirrorAcrossDiagonal({ x: 14.75, y: 9.8 }),
                mirrorAcrossDiagonal({ x: 12.43, y: 7.19 }),
                mirrorAcrossDiagonal({ x: 12.8, y: 6.85 }),
                mirrorAcrossDiagonal({ x: 15.46, y: 9.84 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_2_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 21, y: 17 }),
                mirrorAcrossDiagonal({ x: 24.76, y: 20.3 }),
                mirrorAcrossDiagonal({ x: 22.45, y: 22.93 }),
                mirrorAcrossDiagonal({ x: 18.69, y: 19.63 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_2_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 18.69, y: 19.63 }),
                mirrorAcrossDiagonal({ x: 22.45, y: 22.93 }),
                mirrorAcrossDiagonal({ x: 18, y: 28 }),
                mirrorAcrossDiagonal({ x: 14.24, y: 24.7 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_ruin_l_shape_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 14.24, y: 24.7 }),
                mirrorAcrossDiagonal({ x: 18, y: 28 }),
                mirrorAcrossDiagonal({ x: 22.45, y: 22.93 }),
                mirrorAcrossDiagonal({ x: 22.07, y: 22.6 }),
                mirrorAcrossDiagonal({ x: 17.95, y: 27.3 }),
                mirrorAcrossDiagonal({ x: 14.57, y: 24.32 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_3_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 30, y: 6 }),
                mirrorAcrossDiagonal({ x: 25.2, y: 2.4 }),
                mirrorAcrossDiagonal({ x: 22.8, y: 5.6 }),
                mirrorAcrossDiagonal({ x: 27.6, y: 9.2 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_angled_3_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 22.8, y: 5.6 }),
                mirrorAcrossDiagonal({ x: 18, y: 12 }),
                mirrorAcrossDiagonal({ x: 22.8, y: 15.6 }),
                mirrorAcrossDiagonal({ x: 27.6, y: 9.2 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l4_ruin_l_shape_3_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 19.6, y: 13.2 }),
                mirrorAcrossDiagonal({ x: 22.8, y: 15.6 }),
                mirrorAcrossDiagonal({ x: 27.6, y: 9.2 }),
                mirrorAcrossDiagonal({ x: 27.2, y: 8.9 }),
                mirrorAcrossDiagonal({ x: 22.7, y: 14.9 }),
                mirrorAcrossDiagonal({ x: 19.9, y: 12.8 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

/**
 * Terrain Layout 5
 */
const TERRAIN_LAYOUT_5 = {
    id: "gw_5",
    category: "GW",
    name: "GW 5",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "l5_shape_1",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 12, y: 40 },
                { x: 12, y: 36 },
                { x: 18, y: 36 },
                { x: 18, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 24, y: 40 },
                { x: 24, y: 34 },
                { x: 36, y: 34 },
                { x: 36, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_3",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 0, y: 20 },
                { x: 0, y: 16 },
                { x: 6, y: 16 },
                { x: 6, y: 20 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_4_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 19.5, y: 15 },
                { x: 19.5, y: 20 },
                { x: 26, y: 20 },
                { x: 26, y: 15 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_4_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 16, y: 15 },
                { x: 16, y: 20 },
                { x: 19.5, y: 20 },
                { x: 19.5, y: 15 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_angled_1_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 4, y: 8 },
                { x: 10.94, y: 4.03 },
                { x: 13.92, y: 9.24 },
                { x: 6.976, y: 13.208 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_angled_1_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 10.94, y: 4.03 },
                { x: 14.5, y: 2 },
                { x: 17.476, y: 7.208 },
                { x: 13.92, y: 9.24 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_angled_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 28 },                    // Bottom left
                { x: 16, y: 33 },                   // Bottom right
                { x: 18.484, y: 27.540 },          // Top right
                { x: 7.484, y: 22.540 }            // Top left
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_1_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 12, y: 40 }),
                mirrorAcrossDiagonal({ x: 12, y: 36 }),
                mirrorAcrossDiagonal({ x: 18, y: 36 }),
                mirrorAcrossDiagonal({ x: 18, y: 40 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 24, y: 40 }),
                mirrorAcrossDiagonal({ x: 24, y: 34 }),
                mirrorAcrossDiagonal({ x: 36, y: 34 }),
                mirrorAcrossDiagonal({ x: 36, y: 40 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_3_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 0, y: 20 }),
                mirrorAcrossDiagonal({ x: 0, y: 16 }),
                mirrorAcrossDiagonal({ x: 6, y: 16 }),
                mirrorAcrossDiagonal({ x: 6, y: 20 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_4_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 40.5, y: 29 },
                { x: 40.5, y: 24 },
                { x: 34, y: 24 },
                { x: 34, y: 29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_shape_4_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 44, y: 29 },
                { x: 44, y: 24 },
                { x: 40.5, y: 24 },
                { x: 40.5, y: 29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_angled_1_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 56, y: 36 },
                { x: 49.06, y: 39.97 },
                { x: 46.08, y: 34.76 },
                { x: 53.024, y: 30.792 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_angled_1_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 49.06, y: 39.97 },
                { x: 45.5, y: 42 },
                { x: 42.524, y: 36.792 },
                { x: 46.08, y: 34.76 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l5_angled_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 28 }),
                mirrorAcrossDiagonal({ x: 16, y: 33 }),
                mirrorAcrossDiagonal({ x: 18.484, y: 27.540 }),
                mirrorAcrossDiagonal({ x: 7.484, y: 22.540 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // gw5_ruin_1: U on l5_shape_2 top edge (y=34), back wall 8" (26→34), arms 4" down
        {
            id: "gw5_ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 26, y: 34 },
                { x: 26, y: 38 },
                { x: 26.5, y: 38 },
                { x: 26.5, y: 34.5 },
                { x: 33.5, y: 34.5 },
                { x: 33.5, y: 38 },
                { x: 34, y: 38 },
                { x: 34, y: 34 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw5_ruin_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 34, y: 10 },
                { x: 34, y: 6 },
                { x: 33.5, y: 6 },
                { x: 33.5, y: 9.5 },
                { x: 26.5, y: 9.5 },
                { x: 26.5, y: 6 },
                { x: 26, y: 6 },
                { x: 26, y: 10 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // gw5_ruin_2: Angled L on l5_angled_2, C=(18.484,27.540), 4" toward BR + 8" toward TL
        {
            id: "gw5_ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 16.83, y: 31.18 },
                { x: 18.48, y: 27.54 },
                { x: 11.20, y: 24.23 },
                { x: 11.00, y: 24.69 },
                { x: 17.82, y: 27.79 },
                { x: 16.37, y: 30.97 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw5_ruin_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 43.17, y: 12.82 },
                { x: 41.52, y: 16.46 },
                { x: 48.80, y: 19.77 },
                { x: 49.00, y: 19.31 },
                { x: 42.18, y: 16.21 },
                { x: 43.63, y: 13.03 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // gw5_ruin_3: Angled L on l5_angled_1, C=(6.976,13.208), 4" toward BL + 8" toward TR
        {
            id: "gw5_ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 4.99, y: 9.74 },
                { x: 6.976, y: 13.208 },
                { x: 13.92, y: 9.24 },
                { x: 13.67, y: 8.81 },
                { x: 7.16, y: 12.53 },
                { x: 5.43, y: 9.49 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw5_ruin_3_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 55.01, y: 34.26 },
                { x: 53.024, y: 30.792 },
                { x: 46.08, y: 34.76 },
                { x: 46.33, y: 35.19 },
                { x: 52.84, y: 31.47 },
                { x: 54.57, y: 34.51 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // gw5_ruin_4: L on l5_shape_4, C=(26,20), 5" up (full height) + 6" left
        {
            id: "gw5_ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 26, y: 15 },
                { x: 26, y: 20 },
                { x: 19.5, y: 20 },
                { x: 19.5, y: 19.5 },
                { x: 25.5, y: 19.5 },
                { x: 25.5, y: 15 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw5_ruin_4_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 34, y: 29 },
                { x: 34, y: 24 },
                { x: 40.5, y: 24 },
                { x: 40.5, y: 24.5 },
                { x: 34.5, y: 24.5 },
                { x: 34.5, y: 29 }
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

/**
 * Terrain Layout 6
 */
const TERRAIN_LAYOUT_6 = {
    id: "gw_6",
    category: "GW",
    name: "GW 6",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "l6_shape_1_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 14, y: 40 },
                { x: 22, y: 40 },
                { x: 22, y: 34 },
                { x: 14, y: 34 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_1_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 10, y: 40 },
                { x: 14, y: 40 },
                { x: 14, y: 34 },
                { x: 10, y: 34 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_2",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 6, y: 34 },
                { x: 10, y: 34 },
                { x: 10, y: 28 },
                { x: 6, y: 28 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_3",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 30, y: 32 },
                { x: 30, y: 28 },
                { x: 24, y: 28 },
                { x: 24, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 26, y: 16 },
                { x: 26, y: 4 },
                { x: 20, y: 4 },
                { x: 20, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_angled_1_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 13, y: 26 },
                { x: 16.8, y: 29.25 },
                { x: 21.02, y: 24.31 },
                { x: 17.22, y: 21.06 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_angled_1_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 21.02, y: 24.31 },
                { x: 23, y: 22 },
                { x: 19.2, y: 18.75 },
                { x: 17.22, y: 21.06 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_angled_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 4, y: 13 },
                { x: 8.243, y: 17.243 },
                { x: 16.729, y: 8.757 },
                { x: 12.486, y: 4.514 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_1_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 46, y: 4 },
                { x: 38, y: 4 },
                { x: 38, y: 10 },
                { x: 46, y: 10 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_1_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 50, y: 4 },
                { x: 46, y: 4 },
                { x: 46, y: 10 },
                { x: 50, y: 10 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_2_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 6, y: 34 }),
                mirrorAcrossDiagonal({ x: 10, y: 34 }),
                mirrorAcrossDiagonal({ x: 10, y: 28 }),
                mirrorAcrossDiagonal({ x: 6, y: 28 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_3_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 30, y: 32 }),
                mirrorAcrossDiagonal({ x: 30, y: 28 }),
                mirrorAcrossDiagonal({ x: 24, y: 28 }),
                mirrorAcrossDiagonal({ x: 24, y: 32 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_shape_4_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 26, y: 4 }),
                mirrorAcrossDiagonal({ x: 20, y: 4 }),
                mirrorAcrossDiagonal({ x: 20, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_angled_1_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 47, y: 18 },
                { x: 43.2, y: 14.75 },
                { x: 38.98, y: 19.69 },
                { x: 42.78, y: 22.94 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_angled_1_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 38.98, y: 19.69 },
                { x: 37, y: 22 },
                { x: 40.8, y: 25.25 },
                { x: 42.78, y: 22.94 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l6_angled_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 4, y: 13 }),
                mirrorAcrossDiagonal({ x: 8.243, y: 17.243 }),
                mirrorAcrossDiagonal({ x: 16.729, y: 8.757 }),
                mirrorAcrossDiagonal({ x: 12.486, y: 4.514 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // gw6_ruin_1: U on l6_angled_2 interior long edge (8.243,17.243)→(16.729,8.757), arms 4" inward
        {
            id: "gw6_ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 9.66, y: 15.83 },
                { x: 6.83, y: 13.00 },
                { x: 7.18, y: 12.65 },
                { x: 9.66, y: 15.12 },
                { x: 14.61, y: 10.17 },
                { x: 12.13, y: 7.70 },
                { x: 12.49, y: 7.34 },
                { x: 15.31, y: 10.17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw6_ruin_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 50.34, y: 28.17 },
                { x: 53.17, y: 31.00 },
                { x: 52.82, y: 31.35 },
                { x: 50.34, y: 28.88 },
                { x: 45.39, y: 33.83 },
                { x: 47.87, y: 36.30 },
                { x: 47.51, y: 36.66 },
                { x: 44.69, y: 33.83 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // gw6_ruin_2: Angled L on l6_angled_1, C=(16.8,29.25)=BR, 5" to BL=(13,26) + 6" toward TR
        {
            id: "gw6_ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 13.00, y: 26.00 },
                { x: 16.80, y: 29.25 },
                { x: 21.02, y: 24.31 },
                { x: 20.64, y: 23.99 },
                { x: 16.74, y: 28.54 },
                { x: 13.33, y: 25.62 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw6_ruin_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 47.00, y: 18.00 },
                { x: 43.20, y: 14.75 },
                { x: 38.98, y: 19.69 },
                { x: 39.36, y: 20.01 },
                { x: 43.26, y: 15.46 },
                { x: 46.67, y: 18.38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // gw6_ruin_3: Regular L on l6_shape_1, C=(22,34), 4" down + 8" left
        {
            id: "gw6_ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 22, y: 38 },
                { x: 22, y: 34 },
                { x: 14, y: 34 },
                { x: 14, y: 34.5 },
                { x: 21.5, y: 34.5 },
                { x: 21.5, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw6_ruin_3_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 38, y: 6 },
                { x: 38, y: 10 },
                { x: 46, y: 10 },
                { x: 46, y: 9.5 },
                { x: 38.5, y: 9.5 },
                { x: 38.5, y: 6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // gw6_ruin_4: L on l6_shape_4, C=(26,16), 4" left + 8" up
        {
            id: "gw6_ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 22, y: 16 },
                { x: 26, y: 16 },
                { x: 26, y: 8 },
                { x: 25.5, y: 8 },
                { x: 25.5, y: 15.5 },
                { x: 22, y: 15.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw6_ruin_4_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 38, y: 28 },
                { x: 34, y: 28 },
                { x: 34, y: 36 },
                { x: 34.5, y: 36 },
                { x: 34.5, y: 28.5 },
                { x: 38, y: 28.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

/**
 * Terrain Layout 7
 */
const TERRAIN_LAYOUT_7 = {
    id: "gw_7",
    category: "GW",
    name: "GW 7",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "l7_shape_1_blue_bottom",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 8, y: 24 },
                { x: 8, y: 26 },
                { x: 14, y: 26 },
                { x: 14, y: 24 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_1_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 8, y: 26 },
                { x: 8, y: 34 },
                { x: 14, y: 34 },
                { x: 14, y: 26 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_1_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 8, y: 34 },
                { x: 8, y: 36 },
                { x: 14, y: 36 },
                { x: 14, y: 34 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 19, y: 18 },
                { x: 19, y: 24 },
                { x: 23, y: 24 },
                { x: 23, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_3_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 18, y: 8 },
                { x: 18, y: 14.5 },
                { x: 23, y: 14.5 },
                { x: 23, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_3_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 18, y: 14.5 },
                { x: 18, y: 18 },
                { x: 23, y: 18 },
                { x: 23, y: 14.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_4_blue_bottom",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 6, y: 0 },
                { x: 6, y: 4 },
                { x: 12, y: 4 },
                { x: 12, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_4_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 6, y: 4 },
                { x: 6, y: 12 },
                { x: 12, y: 12 },
                { x: 12, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_4_blue_top",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 6, y: 12 },
                { x: 6, y: 16 },
                { x: 12, y: 16 },
                { x: 12, y: 12 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_5",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 23, y: 29 },
                { x: 23, y: 41 },
                { x: 29, y: 41 },
                { x: 29, y: 29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Mirrored shapes across both X and Y axes (double mirror)
        {
            id: "l7_shape_1_blue_top_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 52, y: 20 },
                { x: 52, y: 18 },
                { x: 46, y: 18 },
                { x: 46, y: 20 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_1_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 52, y: 18 },
                { x: 52, y: 10 },
                { x: 46, y: 10 },
                { x: 46, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_1_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 52, y: 10 },
                { x: 52, y: 8 },
                { x: 46, y: 8 },
                { x: 46, y: 10 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 19, y: 18 }),
                mirrorAcrossDiagonal({ x: 19, y: 24 }),
                mirrorAcrossDiagonal({ x: 23, y: 24 }),
                mirrorAcrossDiagonal({ x: 23, y: 18 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_3_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 42, y: 36 },
                { x: 42, y: 29.5 },
                { x: 37, y: 29.5 },
                { x: 37, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_3_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 42, y: 29.5 },
                { x: 42, y: 26 },
                { x: 37, y: 26 },
                { x: 37, y: 29.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_4_blue_bottom_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 54, y: 44 },
                { x: 54, y: 40 },
                { x: 48, y: 40 },
                { x: 48, y: 44 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_4_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 54, y: 40 },
                { x: 54, y: 32 },
                { x: 48, y: 32 },
                { x: 48, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_4_blue_top_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 54, y: 32 },
                { x: 54, y: 28 },
                { x: 48, y: 28 },
                { x: 48, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l7_shape_5_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23, y: 29 }),
                mirrorAcrossDiagonal({ x: 23, y: 41 }),
                mirrorAcrossDiagonal({ x: 29, y: 41 }),
                mirrorAcrossDiagonal({ x: 29, y: 29 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // GW7 ruins
        {
            id: "gw7_ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 29, y: 31 }, { x: 25, y: 31 }, { x: 25, y: 31.5 },
                { x: 28.5, y: 31.5 }, { x: 28.5, y: 38.5 }, { x: 25, y: 38.5 },
                { x: 25, y: 39 }, { x: 29, y: 39 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_1_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 31, y: 13 }, { x: 35, y: 13 }, { x: 35, y: 12.5 },
                { x: 31.5, y: 12.5 }, { x: 31.5, y: 5.5 }, { x: 35, y: 5.5 },
                { x: 35, y: 5 }, { x: 31, y: 5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 14, y: 28 }, { x: 14, y: 34 }, { x: 9, y: 34 },
                { x: 9, y: 33.5 }, { x: 13.5, y: 33.5 }, { x: 13.5, y: 28 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 46, y: 16 }, { x: 46, y: 10 }, { x: 51, y: 10 },
                { x: 51, y: 10.5 }, { x: 46.5, y: 10.5 }, { x: 46.5, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 23, y: 18 }, { x: 23, y: 24 }, { x: 19, y: 24 },
                { x: 19, y: 23.5 }, { x: 22.5, y: 23.5 }, { x: 22.5, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_3_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 37, y: 26 }, { x: 37, y: 20 }, { x: 41, y: 20 },
                { x: 41, y: 20.5 }, { x: 37.5, y: 20.5 }, { x: 37.5, y: 26 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 23, y: 14.5 }, { x: 23, y: 8 }, { x: 18, y: 8 },
                { x: 18, y: 8.5 }, { x: 22.5, y: 8.5 }, { x: 22.5, y: 14.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_4_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 37, y: 29.5 }, { x: 37, y: 36 }, { x: 42, y: 36 },
                { x: 42, y: 35.5 }, { x: 37.5, y: 35.5 }, { x: 37.5, y: 29.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_5",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 12, y: 12 }, { x: 12, y: 4 }, { x: 8, y: 4 },
                { x: 8, y: 4.5 }, { x: 11.5, y: 4.5 }, { x: 11.5, y: 12 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw7_ruin_5_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 48, y: 32 }, { x: 48, y: 40 }, { x: 52, y: 40 },
                { x: 52, y: 39.5 }, { x: 48.5, y: 39.5 }, { x: 48.5, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

/**
 * Terrain Layout 8
 */
const TERRAIN_LAYOUT_8 = {
    id: "gw_8",
    category: "GW",
    name: "GW 8",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "l8_shape_1_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 13, y: 19 },
                { x: 13, y: 27 },
                { x: 19, y: 27 },
                { x: 19, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_1_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 13, y: 27 },
                { x: 13, y: 31 },
                { x: 19, y: 31 },
                { x: 19, y: 27 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 22, y: 32 },
                { x: 22, y: 44 },
                { x: 28, y: 44 },
                { x: 28, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_3_top",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 23, y: 10 },
                { x: 23, y: 16 },
                { x: 27, y: 16 },
                { x: 27, y: 10 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_3_bottom",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 23, y: 16 },
                { x: 23, y: 22 },
                { x: 27, y: 22 },
                { x: 27, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_angled_1_gray",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 9.8, y: 32.1 },
                { x: 15, y: 36 },
                { x: 12, y: 40 },
                { x: 6.8, y: 36.1 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_angled_1_blue",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 4, y: 34 },
                { x: 7, y: 30 },
                { x: 9.8, y: 32.1 },
                { x: 6.8, y: 36.1 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_angled_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 6, y: 12 },
                { x: 10, y: 16.488 },
                { x: 19, y: 8.488 },
                { x: 15, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_1_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 47, y: 25 },
                { x: 47, y: 17 },
                { x: 41, y: 17 },
                { x: 41, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_1_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 47, y: 17 },
                { x: 47, y: 13 },
                { x: 41, y: 13 },
                { x: 41, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 22, y: 32 }),
                mirrorAcrossDiagonal({ x: 22, y: 44 }),
                mirrorAcrossDiagonal({ x: 28, y: 44 }),
                mirrorAcrossDiagonal({ x: 28, y: 32 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_3_top_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23, y: 10 }),
                mirrorAcrossDiagonal({ x: 23, y: 16 }),
                mirrorAcrossDiagonal({ x: 27, y: 16 }),
                mirrorAcrossDiagonal({ x: 27, y: 10 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_shape_3_bottom_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23, y: 16 }),
                mirrorAcrossDiagonal({ x: 23, y: 22 }),
                mirrorAcrossDiagonal({ x: 27, y: 22 }),
                mirrorAcrossDiagonal({ x: 27, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_angled_1_gray_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 50.2, y: 11.9 },
                { x: 45, y: 8 },
                { x: 48, y: 4 },
                { x: 53.2, y: 7.9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_angled_1_blue_mirrored",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 56, y: 10 },
                { x: 53, y: 14 },
                { x: 50.2, y: 11.9 },
                { x: 53.2, y: 7.9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "l8_angled_2_mirrored",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 6, y: 12 }),
                mirrorAcrossDiagonal({ x: 10, y: 16.488 }),
                mirrorAcrossDiagonal({ x: 19, y: 8.488 }),
                mirrorAcrossDiagonal({ x: 15, y: 4 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "gw8_ruin_1",
            type: "ruin",
            shape: "polygon",
            points: [
                { x: 15, y: 19 }, { x: 19, y: 19 }, { x: 19, y: 27 },
                { x: 18.5, y: 27 }, { x: 18.5, y: 19.5 }, { x: 15, y: 19.5 }
            ],
            traits: ["Defensible"]
        },
        {
            id: "gw8_ruin_1_mirrored",
            type: "ruin",
            shape: "polygon",
            points: [
                { x: 45, y: 25 }, { x: 41, y: 25 }, { x: 41, y: 17 },
                { x: 41.5, y: 17 }, { x: 41.5, y: 24.5 }, { x: 45, y: 24.5 }
            ],
            traits: ["Defensible"]
        },
        {
            id: "gw8_ruin_2",
            type: "ruin",
            shape: "polygon",
            points: [
                { x: 28, y: 34 }, { x: 24, y: 34 }, { x: 24, y: 34.5 },
                { x: 27.5, y: 34.5 }, { x: 27.5, y: 41.5 }, { x: 24, y: 41.5 },
                { x: 24, y: 42 }, { x: 28, y: 42 }
            ],
            traits: ["Defensible"]
        },
        {
            id: "gw8_ruin_2_mirrored",
            type: "ruin",
            shape: "polygon",
            points: [
                { x: 32, y: 10 }, { x: 36, y: 10 }, { x: 36, y: 9.5 },
                { x: 32.5, y: 9.5 }, { x: 32.5, y: 2.5 }, { x: 36, y: 2.5 },
                { x: 36, y: 2 }, { x: 32, y: 2 }
            ],
            traits: ["Defensible"]
        },
        {
            id: "gw8_ruin_3",
            type: "ruin",
            shape: "polygon",
            points: [
                { x: 16.34, y: 5.50 }, { x: 19, y: 8.49 }, { x: 13.02, y: 13.80 },
                { x: 12.69, y: 13.43 }, { x: 18.29, y: 8.45 }, { x: 15.97, y: 5.84 }
            ],
            traits: ["Defensible"]
        },
        {
            id: "gw8_ruin_3_mirrored",
            type: "ruin",
            shape: "polygon",
            points: [
                { x: 43.66, y: 38.50 }, { x: 41, y: 35.51 }, { x: 46.98, y: 30.20 },
                { x: 47.31, y: 30.57 }, { x: 41.71, y: 35.55 }, { x: 44.03, y: 38.16 }
            ],
            traits: ["Defensible"]
        },
        {
            id: "gw8_ruin_4",
            type: "ruin",
            shape: "polygon",
            points: [
                { x: 9.8, y: 32.1 }, { x: 15, y: 36 }, { x: 12, y: 40 },
                { x: 11.6, y: 39.7 }, { x: 14.3, y: 36.1 }, { x: 9.5, y: 32.5 }
            ],
            traits: ["Defensible"]
        },
        {
            id: "gw8_ruin_4_mirrored",
            type: "ruin",
            shape: "polygon",
            points: [
                { x: 50.2, y: 11.9 }, { x: 45, y: 8 }, { x: 48, y: 4 },
                { x: 48.4, y: 4.3 }, { x: 45.7, y: 7.9 }, { x: 50.5, y: 11.5 }
            ],
            traits: ["Defensible"]
        }
    ],
    objectives: [],
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

// WTC Layouts - Organized by Deployment Type
// Sweeping Engagement (6 layouts: 1-6)
const WTC_SWEEPING_ENGAGEMENT_1 = {
    id: "wtc_sweeping_engagement_1", 
    category: "WTC", 
    subcategory: "Sweeping Engagement", 
    name: "WTC Sweeping Engagement 1", 
    defaultDeployment: "sweeping_engagement",
    boardWidth: 60, 
    boardHeight: 44, 
    centerX: 30, 
    centerY: 22, 
    terrain: [
        // Shape 1: A=(5,8), B=(17,8), D=(5,14), C=(17,14) - axis-aligned 12x6
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 5, y: 14 },
                { x: 17, y: 14 },
                { x: 17, y: 8 },
                { x: 5, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 55, y: 30 },
                { x: 43, y: 30 },
                { x: 43, y: 36 },
                { x: 55, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(25,8), B=(37,8), D=(25,14), C=(37,14) - axis-aligned 12x6
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 25, y: 14 },
                { x: 37, y: 14 },
                { x: 37, y: 8 },
                { x: 25, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 35, y: 30 },
                { x: 23, y: 30 },
                { x: 23, y: 36 },
                { x: 35, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(42,4), B=(54,4), D=(42,10), C=(54,10) - axis-aligned 12x6
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 42, y: 10 },
                { x: 54, y: 10 },
                { x: 54, y: 4 },
                { x: 42, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 18, y: 34 },
                { x: 6, y: 34 },
                { x: 6, y: 40 },
                { x: 18, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: B=(54,13), C=(57,18) side BC≈6", A=(43.71,19.17), D=(46.71,24.17)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [{ x: 46.71, y: 24.17 }, { x: 57, y: 18 }, { x: 53.91, y: 12.85 }, { x: 43.62, y: 19.02 }],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [{ x: 13.29, y: 19.83 }, { x: 3, y: 26 }, { x: 6.09, y: 31.15 }, { x: 16.38, y: 24.98 }],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: 2.5x5, D=(37.5,19), C=(37.5,24), B=(40,24), A=(40,19)
        {
            id: "shape_9",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 37.5, y: 19 },
                { x: 37.5, y: 24 },
                { x: 40, y: 24 },
                { x: 40, y: 19 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 22.5, y: 25 },
                { x: 22.5, y: 20 },
                { x: 20, y: 20 },
                { x: 20, y: 25 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 11: 2.5x5, D=(32.5,21.5), C=(37.5,21.5), B=(37.5,19), A=(32.5,19)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 32.5, y: 21.5 },
                { x: 37.5, y: 21.5 },
                { x: 37.5, y: 19 },
                { x: 32.5, y: 19 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 27.5, y: 22.5 },
                { x: 22.5, y: 22.5 },
                { x: 22.5, y: 25 },
                { x: 27.5, y: 25 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 16.13, y: 13.13 }, { x: 7.13, y: 13.13 }, { x: 7.13, y: 11.83 }, { x: 14.83, y: 11.83 }, { x: 14.83, y: 8.13 }, { x: 16.13, y: 8.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 43.87, y: 30.87 }, { x: 52.87, y: 30.87 }, { x: 52.87, y: 32.17 }, { x: 45.17, y: 32.17 }, { x: 45.17, y: 35.87 }, { x: 43.87, y: 35.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 25.87, y: 8.87 }, { x: 34.87, y: 8.87 }, { x: 34.87, y: 10.17 }, { x: 27.17, y: 10.17 }, { x: 27.17, y: 13.87 }, { x: 25.87, y: 13.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 34.13, y: 35.13 }, { x: 25.13, y: 35.13 }, { x: 25.13, y: 33.83 }, { x: 32.83, y: 33.83 }, { x: 32.83, y: 30.13 }, { x: 34.13, y: 30.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 42.87, y: 9.13 }, { x: 51.87, y: 9.13 }, { x: 51.87, y: 7.83 }, { x: 44.17, y: 7.83 }, { x: 44.17, y: 4.13 }, { x: 42.87, y: 4.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 17.13, y: 34.87 }, { x: 8.13, y: 34.87 }, { x: 8.13, y: 36.17 }, { x: 15.83, y: 36.17 }, { x: 15.83, y: 39.87 }, { x: 17.13, y: 39.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 47.01, y: 22.98 }, { x: 54.73, y: 18.35 }, { x: 54.06, y: 17.23 }, { x: 47.45, y: 21.19 }, { x: 45.55, y: 18.02 }, { x: 44.44, y: 18.69 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 12.99, y: 21.02 }, { x: 5.27, y: 25.65 }, { x: 5.94, y: 26.77 }, { x: 12.55, y: 22.81 }, { x: 14.45, y: 25.98 }, { x: 15.56, y: 25.31 }], traits: ["Defensible", "Obscuring"] }
    ], 
    objectives: [], 
    deploymentZones: []
};
const WTC_SWEEPING_ENGAGEMENT_2 = {
    id: "wtc_sweeping_engagement_2",
    category: "WTC",
    subcategory: "Sweeping Engagement",
    name: "WTC Sweeping Engagement 2",
    defaultDeployment: "sweeping_engagement",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Same as Sweeping Engagement 1
        { id: "shape_1", type: "blue_solid", shape: "polygon", points: [{ x: 5, y: 14 }, { x: 17, y: 14 }, { x: 17, y: 8 }, { x: 5, y: 8 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "blue_solid", shape: "polygon", points: [{ x: 55, y: 30 }, { x: 43, y: 30 }, { x: 43, y: 36 }, { x: 55, y: 36 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "red_solid", shape: "polygon", points: [{ x: 25, y: 14 }, { x: 37, y: 14 }, { x: 37, y: 8 }, { x: 25, y: 8 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "red_solid", shape: "polygon", points: [{ x: 35, y: 30 }, { x: 23, y: 30 }, { x: 23, y: 36 }, { x: 35, y: 36 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "blue_solid", shape: "polygon", points: [{ x: 42, y: 10 }, { x: 54, y: 10 }, { x: 54, y: 4 }, { x: 42, y: 4 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "blue_solid", shape: "polygon", points: [{ x: 18, y: 34 }, { x: 6, y: 34 }, { x: 6, y: 40 }, { x: 18, y: 40 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 46.71, y: 24.17 }, { x: 57, y: 18 }, { x: 53.91, y: 12.85 }, { x: 43.62, y: 19.02 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 13.29, y: 19.83 }, { x: 3, y: 26 }, { x: 6.09, y: 31.15 }, { x: 16.38, y: 24.98 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "grey_solid", shape: "polygon", points: [{ x: 37.5, y: 19 }, { x: 37.5, y: 24 }, { x: 40, y: 24 }, { x: 40, y: 19 }], traits: ["Obscuring"] },
        { id: "shape_10", type: "grey_solid", shape: "polygon", points: [{ x: 22.5, y: 25 }, { x: 22.5, y: 20 }, { x: 20, y: 20 }, { x: 20, y: 25 }], traits: ["Obscuring"] },
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 32.5, y: 21.5 }, { x: 37.5, y: 21.5 }, { x: 37.5, y: 19 }, { x: 32.5, y: 19 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 27.5, y: 22.5 }, { x: 22.5, y: 22.5 }, { x: 22.5, y: 25 }, { x: 27.5, y: 25 }], traits: ["Obscuring"] }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 5.87, y: 13.13 }, { x: 14.87, y: 13.13 }, { x: 14.87, y: 11.83 }, { x: 7.17, y: 11.83 }, { x: 7.17, y: 8.13 }, { x: 5.87, y: 8.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 54.13, y: 30.87 }, { x: 45.13, y: 30.87 }, { x: 45.13, y: 32.17 }, { x: 52.83, y: 32.17 }, { x: 52.83, y: 35.87 }, { x: 54.13, y: 35.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 25.87, y: 8.87 }, { x: 34.87, y: 8.87 }, { x: 34.87, y: 10.17 }, { x: 27.17, y: 10.17 }, { x: 27.17, y: 13.87 }, { x: 25.87, y: 13.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 34.13, y: 35.13 }, { x: 25.13, y: 35.13 }, { x: 25.13, y: 33.83 }, { x: 32.83, y: 33.83 }, { x: 32.83, y: 30.13 }, { x: 34.13, y: 30.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 42.87, y: 9.13 }, { x: 51.87, y: 9.13 }, { x: 51.87, y: 7.83 }, { x: 44.17, y: 7.83 }, { x: 44.17, y: 4.13 }, { x: 42.87, y: 4.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 17.13, y: 34.87 }, { x: 8.13, y: 34.87 }, { x: 8.13, y: 36.17 }, { x: 15.83, y: 36.17 }, { x: 15.83, y: 39.87 }, { x: 17.13, y: 39.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 47.01, y: 22.98 }, { x: 54.73, y: 18.35 }, { x: 54.06, y: 17.23 }, { x: 47.45, y: 21.19 }, { x: 45.55, y: 18.02 }, { x: 44.44, y: 18.69 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 12.99, y: 21.02 }, { x: 5.27, y: 25.65 }, { x: 5.94, y: 26.77 }, { x: 12.55, y: 22.81 }, { x: 14.45, y: 25.98 }, { x: 15.56, y: 25.31 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SWEEPING_ENGAGEMENT_3 = {
    id: "wtc_sweeping_engagement_3",
    category: "WTC",
    subcategory: "Sweeping Engagement",
    name: "WTC Sweeping Engagement 3",
    defaultDeployment: "sweeping_engagement",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(4,8), B=(16,8), C=(16,14), D=(4,14) - axis-aligned 12x6
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 4, y: 14 },
                { x: 16, y: 14 },
                { x: 16, y: 8 },
                { x: 4, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 56, y: 30 },
                { x: 44, y: 30 },
                { x: 44, y: 36 },
                { x: 56, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(30,6), B=(42,6), C=(42,12), D=(30,12) - axis-aligned 12x6
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 12 },
                { x: 42, y: 12 },
                { x: 42, y: 6 },
                { x: 30, y: 6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 32 },
                { x: 18, y: 32 },
                { x: 18, y: 38 },
                { x: 30, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(17,17), B=(29,17), C=(29,23), D=(17,23) - axis-aligned 12x6
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 17, y: 23 },
                { x: 29, y: 23 },
                { x: 29, y: 17 },
                { x: 17, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 43, y: 21 },
                { x: 31, y: 21 },
                { x: 31, y: 27 },
                { x: 43, y: 27 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(5,34), B=(10,22) diagonal 12x5, angled, A=(13.52,25.55), C=(1.48,30.45)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 5, y: 34 },
                { x: 0.78, y: 29.74 },
                { x: 9.3, y: 21.29 },
                { x: 13.52, y: 25.55 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 55, y: 10 },
                { x: 59.22, y: 14.26 },
                { x: 50.7, y: 22.71 },
                { x: 46.48, y: 18.45 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: 2.5x5, D=(51.5,5), C=(51.5,10), B=(54,10), A=(54,5)
        {
            id: "shape_9",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 51.5, y: 5 },
                { x: 51.5, y: 10 },
                { x: 54, y: 10 },
                { x: 54, y: 5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 8.5, y: 39 },
                { x: 8.5, y: 34 },
                { x: 6, y: 34 },
                { x: 6, y: 39 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 11: 2.5x5, D=(46.5,7.5), C=(51.5,7.5), B=(51.5,5), A=(46.5,5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 46.5, y: 7.5 },
                { x: 51.5, y: 7.5 },
                { x: 51.5, y: 5 },
                { x: 46.5, y: 5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 13.5, y: 36.5 },
                { x: 8.5, y: 36.5 },
                { x: 8.5, y: 39 },
                { x: 13.5, y: 39 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 15.13, y: 13.13 }, { x: 6.13, y: 13.13 }, { x: 6.13, y: 11.83 }, { x: 13.83, y: 11.83 }, { x: 13.83, y: 8.13 }, { x: 15.13, y: 8.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 44.87, y: 30.87 }, { x: 53.87, y: 30.87 }, { x: 53.87, y: 32.17 }, { x: 46.17, y: 32.17 }, { x: 46.17, y: 35.87 }, { x: 44.87, y: 35.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 41.13, y: 11.13 }, { x: 32.13, y: 11.13 }, { x: 32.13, y: 9.83 }, { x: 39.83, y: 9.83 }, { x: 39.83, y: 6.13 }, { x: 41.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 18.87, y: 32.87 }, { x: 27.87, y: 32.87 }, { x: 27.87, y: 34.17 }, { x: 20.17, y: 34.17 }, { x: 20.17, y: 37.87 }, { x: 18.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 17.87, y: 22.13 }, { x: 26.87, y: 22.13 }, { x: 26.87, y: 20.83 }, { x: 19.17, y: 20.83 }, { x: 19.17, y: 17.13 }, { x: 17.87, y: 17.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 42.13, y: 21.87 }, { x: 33.13, y: 21.87 }, { x: 33.13, y: 23.17 }, { x: 40.83, y: 23.17 }, { x: 40.83, y: 26.87 }, { x: 42.13, y: 26.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 2.01, y: 29.75 }, { x: 8.4, y: 23.41 }, { x: 9.32, y: 24.33 }, { x: 3.85, y: 29.75 }, { x: 6.45, y: 32.38 }, { x: 5.53, y: 33.3 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 57.99, y: 14.25 }, { x: 51.6, y: 20.59 }, { x: 50.68, y: 19.67 }, { x: 56.15, y: 14.25 }, { x: 53.55, y: 11.62 }, { x: 54.47, y: 10.7 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SWEEPING_ENGAGEMENT_4 = {
    id: "wtc_sweeping_engagement_4",
    category: "WTC",
    subcategory: "Sweeping Engagement",
    name: "WTC Sweeping Engagement 4",
    defaultDeployment: "sweeping_engagement",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(5,6), B=(17,6), D=(5,12), C=(17,12) - axis-aligned 12x6
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 5, y: 12 },
                { x: 17, y: 12 },
                { x: 17, y: 6 },
                { x: 5, y: 6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 55, y: 32 },
                { x: 43, y: 32 },
                { x: 43, y: 38 },
                { x: 55, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(28,6), B=(40,6), D=(28,12), C=(40,12) - axis-aligned 12x6
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 28, y: 12 },
                { x: 40, y: 12 },
                { x: 40, y: 6 },
                { x: 28, y: 6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 32, y: 32 },
                { x: 20, y: 32 },
                { x: 20, y: 38 },
                { x: 32, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(46,2), B=(57,6) side AB≈12", C=(54.95,11.64), D=(43.95,7.64)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 43.95, y: 7.64 },
                { x: 54.95, y: 11.64 },
                { x: 57, y: 6 },
                { x: 46, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 16.05, y: 36.36 },
                { x: 5.05, y: 32.36 },
                { x: 3, y: 38 },
                { x: 14, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(33,30), B=(38,18) diagonal 12x6, rotated, A=(41.78,22.45), C=(28.78,25.74)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 32.69, y: 30.28 },
                { x: 28.78, y: 25.74 },
                { x: 37.87, y: 17.9 },
                { x: 41.78, y: 22.45 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 27.31, y: 13.72 },
                { x: 31.22, y: 18.26 },
                { x: 22.13, y: 26.1 },
                { x: 18.22, y: 21.55 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: 5x6, C=(55,25), B=(57,21), A=(51.63,18.32), D=(49.63,22.32)
        {
            id: "shape_9",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 49.63, y: 22.32 },
                { x: 55, y: 25 },
                { x: 57, y: 21 },
                { x: 51.63, y: 18.32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 10.37, y: 21.68 },
                { x: 5, y: 19 },
                { x: 3, y: 23 },
                { x: 8.37, y: 25.68 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(34,16.5), C=(39,16.5), B=(39,14), A=(34,14)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 16.5 },
                { x: 39, y: 16.5 },
                { x: 39, y: 14 },
                { x: 34, y: 14 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 27.5 },
                { x: 21, y: 27.5 },
                { x: 21, y: 30 },
                { x: 26, y: 30 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 16.13, y: 11.13 }, { x: 7.13, y: 11.13 }, { x: 7.13, y: 9.83 }, { x: 14.83, y: 9.83 }, { x: 14.83, y: 6.13 }, { x: 16.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 43.87, y: 32.87 }, { x: 52.87, y: 32.87 }, { x: 52.87, y: 34.17 }, { x: 45.17, y: 34.17 }, { x: 45.17, y: 37.87 }, { x: 43.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 39.13, y: 11.13 }, { x: 30.13, y: 11.13 }, { x: 30.13, y: 9.83 }, { x: 37.83, y: 9.83 }, { x: 37.83, y: 6.13 }, { x: 39.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 20.87, y: 32.87 }, { x: 29.87, y: 32.87 }, { x: 29.87, y: 34.17 }, { x: 22.17, y: 34.17 }, { x: 22.17, y: 37.87 }, { x: 20.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 45.06, y: 7.12 }, { x: 53.52, y: 10.2 }, { x: 53.97, y: 8.97 }, { x: 46.73, y: 6.34 }, { x: 47.99, y: 2.86 }, { x: 46.77, y: 2.42 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 14.94, y: 36.88 }, { x: 6.48, y: 33.8 }, { x: 6.03, y: 35.03 }, { x: 13.27, y: 37.66 }, { x: 12.01, y: 41.14 }, { x: 13.23, y: 41.58 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 37.78, y: 19.13 }, { x: 30.96, y: 25.01 }, { x: 31.81, y: 25.99 }, { x: 37.64, y: 20.96 }, { x: 40.05, y: 23.77 }, { x: 41.04, y: 22.92 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 22.22, y: 24.87 }, { x: 29.04, y: 18.99 }, { x: 28.19, y: 18.01 }, { x: 22.36, y: 23.04 }, { x: 19.95, y: 20.23 }, { x: 18.96, y: 21.08 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SWEEPING_ENGAGEMENT_5 = {
    id: "wtc_sweeping_engagement_5",
    category: "WTC",
    subcategory: "Sweeping Engagement",
    name: "WTC Sweeping Engagement 5",
    defaultDeployment: "sweeping_engagement",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Same as Sweeping Engagement 4
        { id: "shape_1", type: "red_solid", shape: "polygon", points: [{ x: 5, y: 12 }, { x: 17, y: 12 }, { x: 17, y: 6 }, { x: 5, y: 6 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "red_solid", shape: "polygon", points: [{ x: 55, y: 32 }, { x: 43, y: 32 }, { x: 43, y: 38 }, { x: 55, y: 38 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "blue_solid", shape: "polygon", points: [{ x: 28, y: 12 }, { x: 40, y: 12 }, { x: 40, y: 6 }, { x: 28, y: 6 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "blue_solid", shape: "polygon", points: [{ x: 32, y: 32 }, { x: 20, y: 32 }, { x: 20, y: 38 }, { x: 32, y: 38 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "blue_solid", shape: "polygon", points: [{ x: 43.95, y: 7.64 }, { x: 54.95, y: 11.64 }, { x: 57, y: 6 }, { x: 46, y: 2 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "blue_solid", shape: "polygon", points: [{ x: 16.05, y: 36.36 }, { x: 5.05, y: 32.36 }, { x: 3, y: 38 }, { x: 14, y: 42 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 32.69, y: 30.28 }, { x: 28.78, y: 25.74 }, { x: 37.87, y: 17.9 }, { x: 41.78, y: 22.45 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 27.31, y: 13.72 }, { x: 31.22, y: 18.26 }, { x: 22.13, y: 26.1 }, { x: 18.22, y: 21.55 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "gray_striped", shape: "polygon", points: [{ x: 49.63, y: 22.32 }, { x: 55, y: 25 }, { x: 57, y: 21 }, { x: 51.63, y: 18.32 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "gray_striped", shape: "polygon", points: [{ x: 10.37, y: 21.68 }, { x: 5, y: 19 }, { x: 3, y: 23 }, { x: 8.37, y: 25.68 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 34, y: 16.5 }, { x: 39, y: 16.5 }, { x: 39, y: 14 }, { x: 34, y: 14 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 26, y: 27.5 }, { x: 21, y: 27.5 }, { x: 21, y: 30 }, { x: 26, y: 30 }], traits: ["Obscuring"] },
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 16.13, y: 11.13 }, { x: 7.13, y: 11.13 }, { x: 7.13, y: 9.83 }, { x: 14.83, y: 9.83 }, { x: 14.83, y: 6.13 }, { x: 16.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 43.87, y: 32.87 }, { x: 52.87, y: 32.87 }, { x: 52.87, y: 34.17 }, { x: 45.17, y: 34.17 }, { x: 45.17, y: 37.87 }, { x: 43.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 28.87, y: 11.13 }, { x: 37.87, y: 11.13 }, { x: 37.87, y: 9.83 }, { x: 30.17, y: 9.83 }, { x: 30.17, y: 6.13 }, { x: 28.87, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 31.13, y: 32.87 }, { x: 22.13, y: 32.87 }, { x: 22.13, y: 34.17 }, { x: 29.83, y: 34.17 }, { x: 29.83, y: 37.87 }, { x: 31.13, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 45.06, y: 7.12 }, { x: 53.52, y: 10.20 }, { x: 53.97, y: 8.97 }, { x: 46.73, y: 6.34 }, { x: 47.99, y: 2.86 }, { x: 46.77, y: 2.42 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 14.94, y: 36.88 }, { x: 6.48, y: 33.80 }, { x: 6.03, y: 35.03 }, { x: 13.27, y: 37.66 }, { x: 12.01, y: 41.14 }, { x: 13.23, y: 41.58 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 37.78, y: 19.13 }, { x: 30.96, y: 25.01 }, { x: 31.81, y: 25.99 }, { x: 37.64, y: 20.96 }, { x: 40.05, y: 23.77 }, { x: 41.04, y: 22.92 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 22.22, y: 24.87 }, { x: 29.04, y: 18.99 }, { x: 28.19, y: 18.01 }, { x: 22.36, y: 23.04 }, { x: 19.95, y: 20.23 }, { x: 18.96, y: 21.08 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SWEEPING_ENGAGEMENT_6 = {
    id: "wtc_sweeping_engagement_6",
    category: "WTC",
    subcategory: "Sweeping Engagement",
    name: "WTC Sweeping Engagement 6",
    defaultDeployment: "sweeping_engagement",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Same as Sweeping Engagement 4
        { id: "shape_1", type: "red_solid", shape: "polygon", points: [{ x: 5, y: 12 }, { x: 17, y: 12 }, { x: 17, y: 6 }, { x: 5, y: 6 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "red_solid", shape: "polygon", points: [{ x: 55, y: 32 }, { x: 43, y: 32 }, { x: 43, y: 38 }, { x: 55, y: 38 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "red_solid", shape: "polygon", points: [{ x: 28, y: 12 }, { x: 40, y: 12 }, { x: 40, y: 6 }, { x: 28, y: 6 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "red_solid", shape: "polygon", points: [{ x: 32, y: 32 }, { x: 20, y: 32 }, { x: 20, y: 38 }, { x: 32, y: 38 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "red_solid", shape: "polygon", points: [{ x: 43.95, y: 7.64 }, { x: 54.95, y: 11.64 }, { x: 57, y: 6 }, { x: 46, y: 2 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "red_solid", shape: "polygon", points: [{ x: 16.05, y: 36.36 }, { x: 5.05, y: 32.36 }, { x: 3, y: 38 }, { x: 14, y: 42 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 32.69, y: 30.28 }, { x: 28.78, y: 25.74 }, { x: 37.87, y: 17.9 }, { x: 41.78, y: 22.45 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 27.31, y: 13.72 }, { x: 31.22, y: 18.26 }, { x: 22.13, y: 26.1 }, { x: 18.22, y: 21.55 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "gray_striped", shape: "polygon", points: [{ x: 49.63, y: 22.32 }, { x: 55, y: 25 }, { x: 57, y: 21 }, { x: 51.63, y: 18.32 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "gray_striped", shape: "polygon", points: [{ x: 10.37, y: 21.68 }, { x: 5, y: 19 }, { x: 3, y: 23 }, { x: 8.37, y: 25.68 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 34, y: 16.5 }, { x: 39, y: 16.5 }, { x: 39, y: 14 }, { x: 34, y: 14 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 26, y: 27.5 }, { x: 21, y: 27.5 }, { x: 21, y: 30 }, { x: 26, y: 30 }], traits: ["Obscuring"] }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 16.13, y: 11.13 }, { x: 7.13, y: 11.13 }, { x: 7.13, y: 9.83 }, { x: 14.83, y: 9.83 }, { x: 14.83, y: 6.13 }, { x: 16.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 43.87, y: 32.87 }, { x: 52.87, y: 32.87 }, { x: 52.87, y: 34.17 }, { x: 45.17, y: 34.17 }, { x: 45.17, y: 37.87 }, { x: 43.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 39.13, y: 11.13 }, { x: 30.13, y: 11.13 }, { x: 30.13, y: 9.83 }, { x: 37.83, y: 9.83 }, { x: 37.83, y: 6.13 }, { x: 39.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 20.87, y: 32.87 }, { x: 29.87, y: 32.87 }, { x: 29.87, y: 34.17 }, { x: 22.17, y: 34.17 }, { x: 22.17, y: 37.87 }, { x: 20.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 54.43, y: 10.53 }, { x: 45.97, y: 7.45 }, { x: 46.42, y: 6.23 }, { x: 53.65, y: 8.86 }, { x: 54.92, y: 5.38 }, { x: 56.14, y: 5.83 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 5.57, y: 33.47 }, { x: 14.03, y: 36.55 }, { x: 13.58, y: 37.77 }, { x: 6.35, y: 35.14 }, { x: 5.08, y: 38.62 }, { x: 3.86, y: 38.17 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 37.78, y: 19.13 }, { x: 30.96, y: 25.01 }, { x: 31.81, y: 25.99 }, { x: 37.64, y: 20.96 }, { x: 40.05, y: 23.77 }, { x: 41.04, y: 22.92 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 22.22, y: 24.87 }, { x: 29.04, y: 18.99 }, { x: 28.19, y: 18.01 }, { x: 22.36, y: 23.04 }, { x: 19.95, y: 20.23 }, { x: 18.96, y: 21.08 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

// Dawn of War (6 layouts: 1-6)
const WTC_DAWN_OF_WAR_1 = {
    id: "wtc_dawn_of_war_1",
    category: "WTC",
    subcategory: "Dawn of War",
    name: "WTC Dawn of War 1",
    defaultDeployment: "dawn_of_war",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(4,8), B=(16,8) side AB=12", axis-aligned, C=(16,14), D=(4,14)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 4, y: 14 },
                { x: 16, y: 14 },
                { x: 16, y: 8 },
                { x: 4, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 56, y: 30 },
                { x: 44, y: 30 },
                { x: 44, y: 36 },
                { x: 56, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(16,17), B=(28,17) side AB=12", axis-aligned, C=(28,23), D=(16,23)
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 16, y: 23 },
                { x: 28, y: 23 },
                { x: 28, y: 17 },
                { x: 16, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 44, y: 21 },
                { x: 32, y: 21 },
                { x: 32, y: 27 },
                { x: 44, y: 27 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(18,32), B=(30,32) side AB=12", axis-aligned, C=(30,38), D=(18,38)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 18, y: 38 },
                { x: 30, y: 38 },
                { x: 30, y: 32 },
                { x: 18, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 42, y: 6 },
                { x: 30, y: 6 },
                { x: 30, y: 12 },
                { x: 42, y: 12 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(5,34), A=(1.25,29.31) side AD≈6", B=(10.62,21.81), C=(14.37,26.50)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 5, y: 34 },
                { x: 14.37, y: 26.50 },
                { x: 10.62, y: 21.81 },
                { x: 1.25, y: 29.31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 55, y: 10 },
                { x: 45.63, y: 17.50 },
                { x: 49.38, y: 22.19 },
                { x: 58.75, y: 14.69 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: 2.5x5, A=(6,39), B=(6,34), D=(8.5,39), C=(8.5,34)
        {
            id: "shape_9",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 8.5, y: 39 },
                { x: 8.5, y: 34 },
                { x: 6, y: 34 },
                { x: 6, y: 39 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 51.5, y: 5 },
                { x: 51.5, y: 10 },
                { x: 54, y: 10 },
                { x: 54, y: 5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 11: 2.5x5, D=(8.5,39), C=(13.5,39), B=(13.5,36.5), A=(8.5,36.5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 8.5, y: 39 },
                { x: 13.5, y: 39 },
                { x: 13.5, y: 36.5 },
                { x: 8.5, y: 36.5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 51.5, y: 5 },
                { x: 46.5, y: 5 },
                { x: 46.5, y: 7.5 },
                { x: 51.5, y: 7.5 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 15.13, y: 13.13 }, { x: 6.13, y: 13.13 }, { x: 6.13, y: 11.83 }, { x: 13.83, y: 11.83 }, { x: 13.83, y: 8.13 }, { x: 15.13, y: 8.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 44.87, y: 30.87 }, { x: 53.87, y: 30.87 }, { x: 53.87, y: 32.17 }, { x: 46.17, y: 32.17 }, { x: 46.17, y: 35.87 }, { x: 44.87, y: 35.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 16.87, y: 22.13 }, { x: 25.87, y: 22.13 }, { x: 25.87, y: 20.83 }, { x: 18.17, y: 20.83 }, { x: 18.17, y: 17.13 }, { x: 16.87, y: 17.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 43.13, y: 21.87 }, { x: 34.13, y: 21.87 }, { x: 34.13, y: 23.17 }, { x: 41.83, y: 23.17 }, { x: 41.83, y: 26.87 }, { x: 43.13, y: 26.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 18.87, y: 32.87 }, { x: 27.87, y: 32.87 }, { x: 27.87, y: 34.17 }, { x: 20.17, y: 34.17 }, { x: 20.17, y: 37.87 }, { x: 18.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 41.13, y: 11.13 }, { x: 32.13, y: 11.13 }, { x: 32.13, y: 9.83 }, { x: 39.83, y: 9.83 }, { x: 39.83, y: 6.13 }, { x: 41.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 10.48, y: 23.03 }, { x: 3.46, y: 28.66 }, { x: 4.27, y: 29.67 }, { x: 10.28, y: 24.86 }, { x: 12.59, y: 27.75 }, { x: 13.61, y: 26.94 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 49.52, y: 20.97 }, { x: 56.54, y: 15.34 }, { x: 55.73, y: 14.33 }, { x: 49.72, y: 19.14 }, { x: 47.41, y: 16.25 }, { x: 46.39, y: 17.06 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_DAWN_OF_WAR_2 = {
    id: "wtc_dawn_of_war_2",
    category: "WTC",
    subcategory: "Dawn of War",
    name: "WTC Dawn of War 2",
    defaultDeployment: "dawn_of_war",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Same as Dawn of War 1
        { id: "shape_1", type: "red_solid", shape: "polygon", points: [{ x: 4, y: 14 }, { x: 16, y: 14 }, { x: 16, y: 8 }, { x: 4, y: 8 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "red_solid", shape: "polygon", points: [{ x: 56, y: 30 }, { x: 44, y: 30 }, { x: 44, y: 36 }, { x: 56, y: 36 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "blue_solid", shape: "polygon", points: [{ x: 16, y: 23 }, { x: 28, y: 23 }, { x: 28, y: 17 }, { x: 16, y: 17 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "blue_solid", shape: "polygon", points: [{ x: 44, y: 21 }, { x: 32, y: 21 }, { x: 32, y: 27 }, { x: 44, y: 27 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "blue_solid", shape: "polygon", points: [{ x: 18, y: 38 }, { x: 30, y: 38 }, { x: 30, y: 32 }, { x: 18, y: 32 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "blue_solid", shape: "polygon", points: [{ x: 42, y: 6 }, { x: 30, y: 6 }, { x: 30, y: 12 }, { x: 42, y: 12 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 5, y: 34 }, { x: 14.37, y: 26.50 }, { x: 10.62, y: 21.81 }, { x: 1.25, y: 29.31 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 55, y: 10 }, { x: 45.63, y: 17.50 }, { x: 49.38, y: 22.19 }, { x: 58.75, y: 14.69 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "grey_solid", shape: "polygon", points: [{ x: 8.5, y: 39 }, { x: 8.5, y: 34 }, { x: 6, y: 34 }, { x: 6, y: 39 }], traits: ["Obscuring"] },
        { id: "shape_10", type: "grey_solid", shape: "polygon", points: [{ x: 51.5, y: 5 }, { x: 51.5, y: 10 }, { x: 54, y: 10 }, { x: 54, y: 5 }], traits: ["Obscuring"] },
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 8.5, y: 39 }, { x: 13.5, y: 39 }, { x: 13.5, y: 36.5 }, { x: 8.5, y: 36.5 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 51.5, y: 5 }, { x: 46.5, y: 5 }, { x: 46.5, y: 7.5 }, { x: 51.5, y: 7.5 }], traits: ["Obscuring"] }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 15.13, y: 13.13 }, { x: 6.13, y: 13.13 }, { x: 6.13, y: 11.83 }, { x: 13.83, y: 11.83 }, { x: 13.83, y: 8.13 }, { x: 15.13, y: 8.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 44.87, y: 30.87 }, { x: 53.87, y: 30.87 }, { x: 53.87, y: 32.17 }, { x: 46.17, y: 32.17 }, { x: 46.17, y: 35.87 }, { x: 44.87, y: 35.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 16.87, y: 22.13 }, { x: 25.87, y: 22.13 }, { x: 25.87, y: 20.83 }, { x: 18.17, y: 20.83 }, { x: 18.17, y: 17.13 }, { x: 16.87, y: 17.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 43.13, y: 21.87 }, { x: 34.13, y: 21.87 }, { x: 34.13, y: 23.17 }, { x: 41.83, y: 23.17 }, { x: 41.83, y: 26.87 }, { x: 43.13, y: 26.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 29.13, y: 32.87 }, { x: 20.13, y: 32.87 }, { x: 20.13, y: 34.17 }, { x: 27.83, y: 34.17 }, { x: 27.83, y: 37.87 }, { x: 29.13, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 30.87, y: 11.13 }, { x: 39.87, y: 11.13 }, { x: 39.87, y: 9.83 }, { x: 32.17, y: 9.83 }, { x: 32.17, y: 6.13 }, { x: 30.87, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 10.48, y: 23.03 }, { x: 3.46, y: 28.66 }, { x: 4.27, y: 29.67 }, { x: 10.28, y: 24.86 }, { x: 12.59, y: 27.75 }, { x: 13.61, y: 26.94 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 49.52, y: 20.97 }, { x: 56.54, y: 15.34 }, { x: 55.73, y: 14.33 }, { x: 49.72, y: 19.14 }, { x: 47.41, y: 16.25 }, { x: 46.39, y: 17.06 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_DAWN_OF_WAR_3 = {
    id: "wtc_dawn_of_war_3",
    category: "WTC",
    subcategory: "Dawn of War",
    name: "WTC Dawn of War 3",
    defaultDeployment: "dawn_of_war",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Same as Dawn of War 1
        { id: "shape_1", type: "red_solid", shape: "polygon", points: [{ x: 4, y: 14 }, { x: 16, y: 14 }, { x: 16, y: 8 }, { x: 4, y: 8 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "red_solid", shape: "polygon", points: [{ x: 56, y: 30 }, { x: 44, y: 30 }, { x: 44, y: 36 }, { x: 56, y: 36 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "blue_solid", shape: "polygon", points: [{ x: 16, y: 23 }, { x: 28, y: 23 }, { x: 28, y: 17 }, { x: 16, y: 17 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "blue_solid", shape: "polygon", points: [{ x: 44, y: 21 }, { x: 32, y: 21 }, { x: 32, y: 27 }, { x: 44, y: 27 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "red_solid", shape: "polygon", points: [{ x: 18, y: 38 }, { x: 30, y: 38 }, { x: 30, y: 32 }, { x: 18, y: 32 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "red_solid", shape: "polygon", points: [{ x: 42, y: 6 }, { x: 30, y: 6 }, { x: 30, y: 12 }, { x: 42, y: 12 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "red_solid", shape: "polygon", points: [{ x: 5, y: 34 }, { x: 14.37, y: 26.50 }, { x: 10.62, y: 21.81 }, { x: 1.25, y: 29.31 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "red_solid", shape: "polygon", points: [{ x: 55, y: 10 }, { x: 45.63, y: 17.50 }, { x: 49.38, y: 22.19 }, { x: 58.75, y: 14.69 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "grey_solid", shape: "polygon", points: [{ x: 8.5, y: 39 }, { x: 8.5, y: 34 }, { x: 6, y: 34 }, { x: 6, y: 39 }], traits: ["Obscuring"] },
        { id: "shape_10", type: "grey_solid", shape: "polygon", points: [{ x: 51.5, y: 5 }, { x: 51.5, y: 10 }, { x: 54, y: 10 }, { x: 54, y: 5 }], traits: ["Obscuring"] },
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 8.5, y: 39 }, { x: 13.5, y: 39 }, { x: 13.5, y: 36.5 }, { x: 8.5, y: 36.5 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 51.5, y: 5 }, { x: 46.5, y: 5 }, { x: 46.5, y: 7.5 }, { x: 51.5, y: 7.5 }], traits: ["Obscuring"] }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 15.13, y: 13.13 }, { x: 6.13, y: 13.13 }, { x: 6.13, y: 11.83 }, { x: 13.83, y: 11.83 }, { x: 13.83, y: 8.13 }, { x: 15.13, y: 8.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 44.87, y: 30.87 }, { x: 53.87, y: 30.87 }, { x: 53.87, y: 32.17 }, { x: 46.17, y: 32.17 }, { x: 46.17, y: 35.87 }, { x: 44.87, y: 35.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 16.87, y: 22.13 }, { x: 25.87, y: 22.13 }, { x: 25.87, y: 20.83 }, { x: 18.17, y: 20.83 }, { x: 18.17, y: 17.13 }, { x: 16.87, y: 17.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 43.13, y: 21.87 }, { x: 34.13, y: 21.87 }, { x: 34.13, y: 23.17 }, { x: 41.83, y: 23.17 }, { x: 41.83, y: 26.87 }, { x: 43.13, y: 26.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 18.87, y: 32.87 }, { x: 27.87, y: 32.87 }, { x: 27.87, y: 34.17 }, { x: 20.17, y: 34.17 }, { x: 20.17, y: 37.87 }, { x: 18.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 41.13, y: 11.13 }, { x: 32.13, y: 11.13 }, { x: 32.13, y: 9.83 }, { x: 39.83, y: 9.83 }, { x: 39.83, y: 6.13 }, { x: 41.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 2.47, y: 29.45 }, { x: 9.5, y: 23.82 }, { x: 10.31, y: 24.84 }, { x: 4.3, y: 29.65 }, { x: 6.61, y: 32.54 }, { x: 5.59, y: 33.35 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 57.53, y: 14.55 }, { x: 50.5, y: 20.18 }, { x: 49.69, y: 19.16 }, { x: 55.7, y: 14.35 }, { x: 53.39, y: 11.46 }, { x: 54.41, y: 10.65 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_DAWN_OF_WAR_4 = {
    id: "wtc_dawn_of_war_4",
    category: "WTC",
    subcategory: "Dawn of War",
    name: "WTC Dawn of War 4",
    defaultDeployment: "dawn_of_war",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(6,6), B=(18,6), D=(6,12), C=(18,12) - axis-aligned 12x6
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 6, y: 12 },
                { x: 18, y: 12 },
                { x: 18, y: 6 },
                { x: 6, y: 6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 54, y: 32 },
                { x: 42, y: 32 },
                { x: 42, y: 38 },
                { x: 54, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(25,6), B=(37,6), D=(25,12), C=(37,12) - axis-aligned 12x6
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 25, y: 12 },
                { x: 37, y: 12 },
                { x: 37, y: 6 },
                { x: 25, y: 6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 35, y: 32 },
                { x: 23, y: 32 },
                { x: 23, y: 38 },
                { x: 35, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(46.09,2), B=(57,7) side AB=12", C=(54.5,12.46), D=(43.59,7.46)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 43.59, y: 7.46 },
                { x: 54.5, y: 12.46 },
                { x: 57, y: 7 },
                { x: 46.09, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 16.41, y: 36.54 },
                { x: 5.5, y: 31.54 },
                { x: 3, y: 37 },
                { x: 13.91, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(37,30), B=(39,17) diagonal, A=(44.03,20.27), C=(31.97,26.73)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 37, y: 30 },
                { x: 31.97, y: 26.73 },
                { x: 39, y: 17 },
                { x: 44.03, y: 20.27 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 23, y: 14 },
                { x: 28.03, y: 17.27 },
                { x: 21, y: 27 },
                { x: 15.97, y: 23.73 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: 6x5, D=(49,24), C=(55,24), B=(55,19), A=(49,19) - axis-aligned
        {
            id: "shape_9",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 49, y: 24 },
                { x: 55, y: 24 },
                { x: 55, y: 19 },
                { x: 49, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 11, y: 20 },
                { x: 5, y: 20 },
                { x: 5, y: 25 },
                { x: 11, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(42,14.5), C=(47,14.5), B=(47,12), A=(42,12) - axis-aligned
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 42, y: 14.5 },
                { x: 47, y: 14.5 },
                { x: 47, y: 12 },
                { x: 42, y: 12 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 18, y: 29.5 },
                { x: 13, y: 29.5 },
                { x: 13, y: 32 },
                { x: 18, y: 32 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 17.13, y: 11.13 }, { x: 8.13, y: 11.13 }, { x: 8.13, y: 9.83 }, { x: 15.83, y: 9.83 }, { x: 15.83, y: 6.13 }, { x: 17.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 42.87, y: 32.87 }, { x: 51.87, y: 32.87 }, { x: 51.87, y: 34.17 }, { x: 44.17, y: 34.17 }, { x: 44.17, y: 37.87 }, { x: 42.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 36.13, y: 11.13 }, { x: 27.13, y: 11.13 }, { x: 27.13, y: 9.83 }, { x: 34.83, y: 9.83 }, { x: 34.83, y: 6.13 }, { x: 36.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 23.87, y: 32.87 }, { x: 32.87, y: 32.87 }, { x: 32.87, y: 34.17 }, { x: 25.17, y: 34.17 }, { x: 25.17, y: 37.87 }, { x: 23.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 44.74, y: 7.03 }, { x: 52.92, y: 10.78 }, { x: 53.47, y: 9.6 }, { x: 46.47, y: 6.39 }, { x: 48.01, y: 3.03 }, { x: 46.82, y: 2.49 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 15.26, y: 36.97 }, { x: 7.08, y: 33.22 }, { x: 6.53, y: 34.4 }, { x: 13.53, y: 37.61 }, { x: 11.99, y: 40.97 }, { x: 13.18, y: 41.51 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 39.22, y: 18.18 }, { x: 33.95, y: 25.47 }, { x: 35, y: 26.24 }, { x: 39.51, y: 19.99 }, { x: 42.7, y: 21.99 }, { x: 43.41, y: 20.9 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 20.78, y: 25.82 }, { x: 26.05, y: 18.53 }, { x: 25, y: 17.76 }, { x: 20.49, y: 24.01 }, { x: 17.3, y: 22.01 }, { x: 16.59, y: 23.1 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_DAWN_OF_WAR_5 = {
    id: "wtc_dawn_of_war_5",
    category: "WTC",
    subcategory: "Dawn of War",
    name: "WTC Dawn of War 5",
    defaultDeployment: "dawn_of_war",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Same as Dawn of War 4
        { id: "shape_1", type: "red_solid", shape: "polygon", points: [{ x: 6, y: 12 }, { x: 18, y: 12 }, { x: 18, y: 6 }, { x: 6, y: 6 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "red_solid", shape: "polygon", points: [{ x: 54, y: 32 }, { x: 42, y: 32 }, { x: 42, y: 38 }, { x: 54, y: 38 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "blue_solid", shape: "polygon", points: [{ x: 25, y: 12 }, { x: 37, y: 12 }, { x: 37, y: 6 }, { x: 25, y: 6 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "blue_solid", shape: "polygon", points: [{ x: 35, y: 32 }, { x: 23, y: 32 }, { x: 23, y: 38 }, { x: 35, y: 38 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "blue_solid", shape: "polygon", points: [{ x: 43.59, y: 7.46 }, { x: 54.5, y: 12.46 }, { x: 57, y: 7 }, { x: 46.09, y: 2 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "blue_solid", shape: "polygon", points: [{ x: 16.41, y: 36.54 }, { x: 5.5, y: 31.54 }, { x: 3, y: 37 }, { x: 13.91, y: 42 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 36.98, y: 30.13 }, { x: 32.08, y: 26.66 }, { x: 39.02, y: 16.87 }, { x: 43.92, y: 20.34 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 23.02, y: 13.87 }, { x: 27.92, y: 17.34 }, { x: 20.98, y: 27.13 }, { x: 16.08, y: 23.66 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "gray_striped", shape: "polygon", points: [{ x: 49, y: 24 }, { x: 55, y: 24 }, { x: 55, y: 19 }, { x: 49, y: 19 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "gray_striped", shape: "polygon", points: [{ x: 11, y: 20 }, { x: 5, y: 20 }, { x: 5, y: 25 }, { x: 11, y: 25 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 42, y: 14.5 }, { x: 47, y: 14.5 }, { x: 47, y: 12 }, { x: 42, y: 12 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 18, y: 29.5 }, { x: 13, y: 29.5 }, { x: 13, y: 32 }, { x: 18, y: 32 }], traits: ["Obscuring"] }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 17.13, y: 11.13 }, { x: 8.13, y: 11.13 }, { x: 8.13, y: 9.83 }, { x: 15.83, y: 9.83 }, { x: 15.83, y: 6.13 }, { x: 17.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 42.87, y: 32.87 }, { x: 51.87, y: 32.87 }, { x: 51.87, y: 34.17 }, { x: 44.17, y: 34.17 }, { x: 44.17, y: 37.87 }, { x: 42.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 25.87, y: 11.13 }, { x: 34.87, y: 11.13 }, { x: 34.87, y: 9.83 }, { x: 27.17, y: 9.83 }, { x: 27.17, y: 6.13 }, { x: 25.87, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 34.13, y: 32.87 }, { x: 25.13, y: 32.87 }, { x: 25.13, y: 34.17 }, { x: 32.83, y: 34.17 }, { x: 32.83, y: 37.87 }, { x: 34.13, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 44.74, y: 7.03 }, { x: 52.92, y: 10.78 }, { x: 53.47, y: 9.6 }, { x: 46.47, y: 6.39 }, { x: 48.01, y: 3.03 }, { x: 46.82, y: 2.49 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 15.26, y: 36.97 }, { x: 7.08, y: 33.22 }, { x: 6.53, y: 34.4 }, { x: 13.53, y: 37.61 }, { x: 11.99, y: 40.97 }, { x: 13.18, y: 41.51 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 39.23, y: 18.08 }, { x: 34.02, y: 25.42 }, { x: 35.08, y: 26.18 }, { x: 39.54, y: 19.89 }, { x: 42.56, y: 22.03 }, { x: 43.31, y: 20.97 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 20.77, y: 25.92 }, { x: 25.98, y: 18.58 }, { x: 24.92, y: 17.82 }, { x: 20.46, y: 24.11 }, { x: 17.44, y: 21.97 }, { x: 16.69, y: 23.03 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_DAWN_OF_WAR_6 = {
    id: "wtc_dawn_of_war_6",
    category: "WTC",
    subcategory: "Dawn of War",
    name: "WTC Dawn of War 6",
    defaultDeployment: "dawn_of_war",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Same as Dawn of War 4
        { id: "shape_1", type: "red_solid", shape: "polygon", points: [{ x: 6, y: 12 }, { x: 18, y: 12 }, { x: 18, y: 6 }, { x: 6, y: 6 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "red_solid", shape: "polygon", points: [{ x: 54, y: 32 }, { x: 42, y: 32 }, { x: 42, y: 38 }, { x: 54, y: 38 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "red_solid", shape: "polygon", points: [{ x: 25, y: 12 }, { x: 37, y: 12 }, { x: 37, y: 6 }, { x: 25, y: 6 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "red_solid", shape: "polygon", points: [{ x: 35, y: 32 }, { x: 23, y: 32 }, { x: 23, y: 38 }, { x: 35, y: 38 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "red_solid", shape: "polygon", points: [{ x: 43.59, y: 7.46 }, { x: 54.5, y: 12.46 }, { x: 57, y: 7 }, { x: 46.09, y: 2 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "red_solid", shape: "polygon", points: [{ x: 16.41, y: 36.54 }, { x: 5.5, y: 31.54 }, { x: 3, y: 37 }, { x: 13.91, y: 42 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 36.98, y: 30.13 }, { x: 32.08, y: 26.66 }, { x: 39.02, y: 16.87 }, { x: 43.92, y: 20.34 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 23.02, y: 13.87 }, { x: 27.92, y: 17.34 }, { x: 20.98, y: 27.13 }, { x: 16.08, y: 23.66 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "gray_striped", shape: "polygon", points: [{ x: 49, y: 24 }, { x: 55, y: 24 }, { x: 55, y: 19 }, { x: 49, y: 19 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "gray_striped", shape: "polygon", points: [{ x: 11, y: 20 }, { x: 5, y: 20 }, { x: 5, y: 25 }, { x: 11, y: 25 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 42, y: 14.5 }, { x: 47, y: 14.5 }, { x: 47, y: 12 }, { x: 42, y: 12 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 18, y: 29.5 }, { x: 13, y: 29.5 }, { x: 13, y: 32 }, { x: 18, y: 32 }], traits: ["Obscuring"] }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 17.13, y: 11.13 }, { x: 8.13, y: 11.13 }, { x: 8.13, y: 9.83 }, { x: 15.83, y: 9.83 }, { x: 15.83, y: 6.13 }, { x: 17.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 42.87, y: 32.87 }, { x: 51.87, y: 32.87 }, { x: 51.87, y: 34.17 }, { x: 44.17, y: 34.17 }, { x: 44.17, y: 37.87 }, { x: 42.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 36.13, y: 11.13 }, { x: 27.13, y: 11.13 }, { x: 27.13, y: 9.83 }, { x: 34.83, y: 9.83 }, { x: 34.83, y: 6.13 }, { x: 36.13, y: 6.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 23.87, y: 32.87 }, { x: 32.87, y: 32.87 }, { x: 32.87, y: 34.17 }, { x: 25.17, y: 34.17 }, { x: 25.17, y: 37.87 }, { x: 23.87, y: 37.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 54.07, y: 11.31 }, { x: 45.89, y: 7.56 }, { x: 46.43, y: 6.38 }, { x: 53.43, y: 9.58 }, { x: 54.97, y: 6.22 }, { x: 56.15, y: 6.76 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 5.93, y: 32.69 }, { x: 14.11, y: 36.44 }, { x: 13.57, y: 37.62 }, { x: 6.57, y: 34.42 }, { x: 5.03, y: 37.78 }, { x: 3.85, y: 37.24 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 39.23, y: 18.08 }, { x: 34.02, y: 25.42 }, { x: 35.08, y: 26.18 }, { x: 39.54, y: 19.89 }, { x: 42.56, y: 22.03 }, { x: 43.31, y: 20.97 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 20.77, y: 25.92 }, { x: 25.98, y: 18.58 }, { x: 24.92, y: 17.82 }, { x: 20.46, y: 24.11 }, { x: 17.44, y: 21.97 }, { x: 16.69, y: 23.03 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

// Tipping Point (7 layouts: 1, 2, 3, 4-5, 6, 7, 8)
const WTC_TIPPING_POINT_1 = {
    id: "wtc_tipping_point_1",
    category: "WTC",
    subcategory: "Tipping Point",
    name: "WTC Tipping Point 1",
    defaultDeployment: "tipping_point",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(32,1), B=(42,7) side AB≈12", C=(38.91,12.14), D=(28.91,6.14)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 28.91, y: 6.14 },
                { x: 38.91, y: 12.14 },
                { x: 42, y: 7 },
                { x: 32, y: 1 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 31.09, y: 37.86 },
                { x: 21.09, y: 31.86 },
                { x: 18, y: 37 },
                { x: 28, y: 43 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(46,12), C=(57,5) diagonal, long steep, B=(50.96,15.37), D=(52.04,1.63)
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 52.01, y: 1.81 },
                { x: 57.16, y: 4.90 },
                { x: 50.99, y: 15.19 },
                { x: 45.84, y: 12.10 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 7.99, y: 42.19 },
                { x: 2.84, y: 39.10 },
                { x: 9.01, y: 28.81 },
                { x: 14.16, y: 31.90 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(48,27), B=(55,16) diagonal, short steep, A=(44.63,22.04), C=(58.37,20.96)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 47.90, y: 27.16 },
                { x: 58.19, y: 20.99 },
                { x: 55.10, y: 15.84 },
                { x: 44.81, y: 22.01 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 12.10, y: 16.84 },
                { x: 1.81, y: 23.01 },
                { x: 4.90, y: 28.16 },
                { x: 15.19, y: 21.99 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: A=(45,40), B=(49,29) side AB≈12", C=(54.64,31.05), D=(50.64,42.05)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 50.64, y: 42.05 },
                { x: 54.64, y: 31.05 },
                { x: 49, y: 29 },
                { x: 45, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 9.36, y: 1.95 },
                { x: 5.36, y: 12.95 },
                { x: 11, y: 15 },
                { x: 15, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: A=(37,15), B=(42,26) side AB≈12", D closer to middle, D=(31.54,17.48), C=(36.54,28.48)
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 31.54, y: 17.48 },
                { x: 36.54, y: 28.48 },
                { x: 42, y: 26 },
                { x: 37, y: 15 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 28.46, y: 26.52 },
                { x: 23.46, y: 15.52 },
                { x: 18, y: 18 },
                { x: 23, y: 29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(37.5,38), C=(40,38), B=(40,33), A=(37.5,33)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 37.5, y: 38 },
                { x: 40, y: 38 },
                { x: 40, y: 33 },
                { x: 37.5, y: 33 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 22.5, y: 6 },
                { x: 20, y: 6 },
                { x: 20, y: 11 },
                { x: 22.5, y: 11 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 30.1, y: 5.84 }, { x: 37.82, y: 10.47 }, { x: 38.49, y: 9.36 }, { x: 31.89, y: 5.4 }, { x: 33.79, y: 2.23 }, { x: 32.68, y: 1.56 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 29.9, y: 38.16 }, { x: 22.18, y: 33.53 }, { x: 21.51, y: 34.64 }, { x: 28.11, y: 38.6 }, { x: 26.21, y: 41.77 }, { x: 27.32, y: 42.44 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 52.31, y: 3 }, { x: 47.68, y: 10.72 }, { x: 48.8, y: 11.39 }, { x: 52.76, y: 4.79 }, { x: 55.93, y: 6.69 }, { x: 56.6, y: 5.58 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 7.69, y: 41 }, { x: 12.32, y: 33.28 }, { x: 11.2, y: 32.61 }, { x: 7.24, y: 39.21 }, { x: 4.07, y: 37.31 }, { x: 3.4, y: 38.42 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 46, y: 22.31 }, { x: 53.72, y: 17.68 }, { x: 54.39, y: 18.8 }, { x: 47.79, y: 22.76 }, { x: 49.69, y: 25.93 }, { x: 48.58, y: 26.6 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 14, y: 21.69 }, { x: 6.28, y: 26.32 }, { x: 5.61, y: 25.2 }, { x: 12.21, y: 21.24 }, { x: 10.31, y: 18.07 }, { x: 11.42, y: 17.4 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 46.11, y: 39.48 }, { x: 49.19, y: 31.02 }, { x: 50.41, y: 31.47 }, { x: 47.78, y: 38.7 }, { x: 51.26, y: 39.97 }, { x: 50.81, y: 41.19 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 13.89, y: 4.52 }, { x: 10.81, y: 12.98 }, { x: 9.59, y: 12.53 }, { x: 12.22, y: 5.3 }, { x: 8.74, y: 4.03 }, { x: 9.19, y: 2.81 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 32.69, y: 17.91 }, { x: 36.42, y: 26.11 }, { x: 37.6, y: 25.57 }, { x: 34.41, y: 18.56 }, { x: 37.78, y: 17.03 }, { x: 37.24, y: 15.84 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 27.31, y: 26.09 }, { x: 23.58, y: 17.89 }, { x: 22.4, y: 18.43 }, { x: 25.59, y: 25.44 }, { x: 22.22, y: 26.97 }, { x: 22.76, y: 28.16 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_TIPPING_POINT_2 = {
    id: "wtc_tipping_point_2",
    category: "WTC",
    subcategory: "Tipping Point",
    name: "WTC Tipping Point 2",
    defaultDeployment: "tipping_point",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(35,0), B=(40,11) side AB≈12", C=(34.54,13.48), D=(29.54,2.48)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 29.54, y: 2.48 },
                { x: 34.54, y: 13.48 },
                { x: 40, y: 11 },
                { x: 35, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 30.46, y: 41.52 },
                { x: 25.46, y: 30.52 },
                { x: 20, y: 33 },
                { x: 25, y: 44 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: D=(38,16), C=(48,24) side DC≈12", A=(41.75,11.31), B=(51.75,19.31)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 16 },
                { x: 48, y: 24 },
                { x: 51.75, y: 19.31 },
                { x: 41.75, y: 11.31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 28 },
                { x: 12, y: 20 },
                { x: 8.25, y: 24.69 },
                { x: 18.25, y: 32.69 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: AD collinear with Shape3.AB, B=(48,0), D=(44.72,13.69), C=(52.68,3.74), A=(40.04,9.95)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 44.72, y: 13.69 },
                { x: 52.68, y: 3.74 },
                { x: 48, y: 0 },
                { x: 40.04, y: 9.95 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 15.28, y: 30.31 },
                { x: 7.32, y: 40.26 },
                { x: 12, y: 44 },
                { x: 19.96, y: 34.05 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: A=(49,29), C=(50,42) diagonal, long steep, B=(54.65,30.95), D=(44.35,40.05)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 55.29, y: 39.21 },
                { x: 50, y: 42 },
                { x: 43.71, y: 31.79 },
                { x: 49, y: 29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 4.71, y: 4.79 },
                { x: 10, y: 2 },
                { x: 16.29, y: 12.21 },
                { x: 11, y: 15 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: B=(35,18), D=(37,31) diagonal, long steep, A=(40.79,19.61), C=(31.21,29.39)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 37, y: 31 },
                { x: 31.21, y: 29.39 },
                { x: 35, y: 18 },
                { x: 40.79, y: 19.61 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 23, y: 13 },
                { x: 28.79, y: 14.61 },
                { x: 25, y: 26 },
                { x: 19.21, y: 24.39 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, A=(20,6), B=(23,2), C=(25,3.5), D=(22,7.5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 7.5 },
                { x: 25, y: 3.5 },
                { x: 23, y: 2 },
                { x: 20, y: 6 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 36.5 },
                { x: 35, y: 40.5 },
                { x: 37, y: 42 },
                { x: 40, y: 38 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 30.69, y: 2.91 }, { x: 34.42, y: 11.11 }, { x: 35.6, y: 10.57 }, { x: 32.41, y: 3.56 }, { x: 35.78, y: 2.03 }, { x: 35.24, y: 0.84 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 29.31, y: 41.09 }, { x: 25.58, y: 32.89 }, { x: 24.4, y: 33.43 }, { x: 27.59, y: 40.44 }, { x: 24.22, y: 41.97 }, { x: 24.76, y: 43.16 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 47.86, y: 22.78 }, { x: 40.84, y: 17.15 }, { x: 41.65, y: 16.14 }, { x: 47.66, y: 20.95 }, { x: 49.97, y: 18.06 }, { x: 50.99, y: 18.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 12.14, y: 21.22 }, { x: 19.16, y: 26.85 }, { x: 18.35, y: 27.86 }, { x: 12.34, y: 23.05 }, { x: 10.03, y: 25.94 }, { x: 9.01, y: 25.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 48.14, y: 1.22 }, { x: 42.51, y: 8.25 }, { x: 43.53, y: 9.06 }, { x: 48.34, y: 3.05 }, { x: 51.23, y: 5.36 }, { x: 52.04, y: 4.34 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 11.86, y: 42.78 }, { x: 17.49, y: 35.75 }, { x: 16.47, y: 34.94 }, { x: 11.66, y: 40.95 }, { x: 8.77, y: 38.64 }, { x: 7.96, y: 39.66 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 44.94, y: 32.12 }, { x: 49.66, y: 39.79 }, { x: 50.76, y: 39.11 }, { x: 46.72, y: 32.55 }, { x: 49.96, y: 30.94 }, { x: 49.36, y: 29.79 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 15.06, y: 11.88 }, { x: 10.34, y: 4.21 }, { x: 9.24, y: 4.89 }, { x: 13.28, y: 11.45 }, { x: 10.04, y: 13.06 }, { x: 10.64, y: 14.21 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 32.32, y: 28.8 }, { x: 35.16, y: 20.26 }, { x: 36.4, y: 20.67 }, { x: 33.97, y: 27.97 }, { x: 37.49, y: 28.88 }, { x: 37.14, y: 30.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 27.68, y: 15.2 }, { x: 24.84, y: 23.74 }, { x: 23.6, y: 23.33 }, { x: 26.03, y: 16.03 }, { x: 22.51, y: 15.12 }, { x: 22.86, y: 13.86 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_TIPPING_POINT_3 = {
    id: "wtc_tipping_point_3",
    category: "WTC",
    subcategory: "Tipping Point",
    name: "WTC Tipping Point 3",
    defaultDeployment: "tipping_point",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(32,0), C=(36,13) diagonal, short steep, B=(27.78,4.26), D=(40.22,8.74)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 40.22, y: 8.74 },
                { x: 36, y: 13 },
                { x: 27.78, y: 4.26 },
                { x: 32, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 19.78, y: 35.26 },
                { x: 24, y: 31 },
                { x: 32.22, y: 39.74 },
                { x: 28, y: 44 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: D=(46,13), B=(49,0) diagonal, short steep, A=(53.67,3.77), C=(41.33,9.23)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 46, y: 13 },
                { x: 41.33, y: 9.23 },
                { x: 49, y: 0 },
                { x: 53.67, y: 3.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 14, y: 31 },
                { x: 18.67, y: 34.77 },
                { x: 11, y: 44 },
                { x: 6.33, y: 40.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: B=(51,14), C=(56,17) side BC≈6", D=(49.83,27.29), A=(44.83,24.29)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 49.83, y: 27.29 },
                { x: 56, y: 17 },
                { x: 51, y: 14 },
                { x: 44.83, y: 24.29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 10.17, y: 16.71 },
                { x: 4, y: 27 },
                { x: 9, y: 30 },
                { x: 15.17, y: 19.71 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: A=(46,29), B=(54,38) side AB≈12", flipped CD, C=(49.52,41.98), D=(41.52,32.98)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 41.52, y: 32.98 },
                { x: 49.52, y: 41.98 },
                { x: 54, y: 38 },
                { x: 46, y: 29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 18.48, y: 11.02 },
                { x: 10.48, y: 2.02 },
                { x: 6, y: 6 },
                { x: 14, y: 15 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: A=(32,32), B=(38,22) side AB≈12", C=(43.14,25.09), D=(37.14,35.09)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 37.14, y: 35.09 },
                { x: 43.14, y: 25.09 },
                { x: 38, y: 22 },
                { x: 32, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22.86, y: 8.91 },
                { x: 16.86, y: 18.91 },
                { x: 22, y: 22 },
                { x: 28, y: 12 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, A=(31,15), D=(30,17), C=(34.47,19.24), B=(35.47,17.24)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 17 },
                { x: 34.47, y: 19.24 },
                { x: 35.47, y: 17.24 },
                { x: 31, y: 15 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 27 },
                { x: 25.53, y: 24.76 },
                { x: 24.53, y: 26.76 },
                { x: 29, y: 29 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 28.99, y: 4.28 }, { x: 35.15, y: 10.83 }, { x: 36.1, y: 9.94 }, { x: 30.83, y: 4.33 }, { x: 33.43, y: 1.64 }, { x: 32.51, y: 0.72 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 31.01, y: 39.72 }, { x: 24.85, y: 33.17 }, { x: 23.9, y: 34.06 }, { x: 29.17, y: 39.67 }, { x: 26.57, y: 42.36 }, { x: 27.49, y: 43.28 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 42.56, y: 9.11 }, { x: 48.32, y: 2.19 }, { x: 49.31, y: 3.02 }, { x: 44.39, y: 8.94 }, { x: 47.27, y: 11.24 }, { x: 46.45, y: 12.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 17.44, y: 34.89 }, { x: 11.68, y: 41.81 }, { x: 10.69, y: 40.98 }, { x: 15.61, y: 35.06 }, { x: 12.73, y: 32.76 }, { x: 13.55, y: 31.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 46.02, y: 23.99 }, { x: 50.65, y: 16.27 }, { x: 51.77, y: 16.94 }, { x: 47.81, y: 23.55 }, { x: 50.98, y: 25.45 }, { x: 50.31, y: 26.56 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 13.98, y: 20.01 }, { x: 9.35, y: 27.73 }, { x: 8.23, y: 27.06 }, { x: 12.19, y: 20.45 }, { x: 9.02, y: 18.55 }, { x: 9.69, y: 17.44 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 42.75, y: 33.05 }, { x: 48.73, y: 39.78 }, { x: 49.7, y: 38.92 }, { x: 44.58, y: 33.16 }, { x: 47.35, y: 30.7 }, { x: 46.49, y: 29.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 17.25, y: 10.95 }, { x: 11.27, y: 4.22 }, { x: 10.3, y: 5.08 }, { x: 15.42, y: 10.84 }, { x: 12.65, y: 13.3 }, { x: 13.51, y: 14.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 33.19, y: 31.7 }, { x: 37.82, y: 23.98 }, { x: 38.94, y: 24.65 }, { x: 34.98, y: 31.26 }, { x: 38.15, y: 33.16 }, { x: 37.48, y: 34.28 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 26.81, y: 12.3 }, { x: 22.18, y: 20.02 }, { x: 21.06, y: 19.35 }, { x: 25.02, y: 12.74 }, { x: 21.85, y: 10.84 }, { x: 22.52, y: 9.72 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_TIPPING_POINT_4_5 = {
    id: "wtc_tipping_point_4_5",
    category: "WTC",
    subcategory: "Tipping Point",
    name: "WTC Tipping Point 4-5",
    defaultDeployment: "tipping_point",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(37,2), C=(38,15) diagonal, flipped, B=(31.73,4.79), D=(43.27,12.21)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 43.16, y: 12.1 },
                { x: 38.01, y: 15.19 },
                { x: 31.84, y: 4.9 },
                { x: 36.99, y: 1.81 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 16.84, y: 31.9 },
                { x: 21.99, y: 28.81 },
                { x: 28.16, y: 39.1 },
                { x: 23.01, y: 42.19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(47,4), C=(54,15) diagonal, flipped, B=(43.63,8.96), D=(57.37,10.04)
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 57.19, y: 10.01 },
                { x: 54.1, y: 15.16 },
                { x: 43.81, y: 8.99 },
                { x: 46.9, y: 3.84 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 2.81, y: 33.99 },
                { x: 5.9, y: 28.84 },
                { x: 16.19, y: 35.01 },
                { x: 13.1, y: 40.16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: B=(47,15), D=(46,28) diagonal, flipped, A=(52.27,17.79), C=(40.73,25.21)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 45.99, y: 28.19 },
                { x: 40.84, y: 25.1 },
                { x: 47.01, y: 14.81 },
                { x: 52.16, y: 17.9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 14.01, y: 15.81 },
                { x: 19.16, y: 18.9 },
                { x: 12.99, y: 29.19 },
                { x: 7.84, y: 26.1 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: B=(51,28), D=(50,41) diagonal, flipped, A=(56.27,30.79), C=(44.73,38.21)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 49.99, y: 41.19 },
                { x: 44.84, y: 38.1 },
                { x: 51.01, y: 27.81 },
                { x: 56.16, y: 30.9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 10.01, y: 2.81 },
                { x: 15.16, y: 5.9 },
                { x: 8.99, y: 16.19 },
                { x: 3.84, y: 13.1 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(36,42), B=(37,29) diagonal, flipped, A=(42.27,31.79), C=(30.73,39.21)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 35.99, y: 42.19 },
                { x: 30.84, y: 39.1 },
                { x: 37.01, y: 28.81 },
                { x: 42.16, y: 31.9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 24.01, y: 1.81 },
                { x: 29.16, y: 4.9 },
                { x: 22.99, y: 15.19 },
                { x: 17.84, y: 12.1 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, C=(35,25), B=(37,24), A=(34.76,19.53), D=(32.76,20.53)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 32.76, y: 20.53 },
                { x: 35, y: 25 },
                { x: 37, y: 24 },
                { x: 34.76, y: 19.53 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 27.24, y: 23.47 },
                { x: 25, y: 19 },
                { x: 23, y: 20 },
                { x: 25.24, y: 24.47 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 33.03, y: 5.2 }, { x: 37.66, y: 12.92 }, { x: 38.78, y: 12.25 }, { x: 34.82, y: 5.64 }, { x: 37.99, y: 3.74 }, { x: 37.32, y: 2.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 26.97, y: 38.8 }, { x: 22.34, y: 31.08 }, { x: 21.22, y: 31.75 }, { x: 25.18, y: 38.36 }, { x: 22.01, y: 40.26 }, { x: 22.68, y: 41.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 45, y: 8.69 }, { x: 52.72, y: 13.32 }, { x: 53.39, y: 12.2 }, { x: 46.79, y: 8.24 }, { x: 48.69, y: 5.07 }, { x: 47.58, y: 4.4 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 15, y: 35.31 }, { x: 7.28, y: 30.68 }, { x: 6.61, y: 31.8 }, { x: 13.21, y: 35.76 }, { x: 11.31, y: 38.93 }, { x: 12.42, y: 39.6 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 42.03, y: 24.8 }, { x: 46.66, y: 17.08 }, { x: 47.78, y: 17.75 }, { x: 43.82, y: 24.36 }, { x: 46.99, y: 26.26 }, { x: 46.32, y: 27.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 17.97, y: 19.2 }, { x: 13.34, y: 26.92 }, { x: 12.22, y: 26.25 }, { x: 16.18, y: 19.64 }, { x: 13.01, y: 17.74 }, { x: 13.68, y: 16.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 46.03, y: 37.8 }, { x: 50.66, y: 30.08 }, { x: 51.78, y: 30.75 }, { x: 47.82, y: 37.36 }, { x: 50.99, y: 39.26 }, { x: 50.32, y: 40.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 13.97, y: 6.2 }, { x: 9.34, y: 13.92 }, { x: 8.22, y: 13.25 }, { x: 12.18, y: 6.64 }, { x: 9.01, y: 4.74 }, { x: 9.68, y: 3.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 32.03, y: 38.8 }, { x: 36.66, y: 31.08 }, { x: 37.78, y: 31.75 }, { x: 33.82, y: 38.36 }, { x: 36.99, y: 40.26 }, { x: 36.32, y: 41.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 27.97, y: 5.2 }, { x: 23.34, y: 12.92 }, { x: 22.22, y: 12.25 }, { x: 26.18, y: 5.64 }, { x: 23.01, y: 3.74 }, { x: 23.68, y: 2.63 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_TIPPING_POINT_6 = {
    id: "wtc_tipping_point_6",
    category: "WTC",
    subcategory: "Tipping Point",
    name: "WTC Tipping Point 6",
    defaultDeployment: "tipping_point",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(25,12), B=(31,0) diagonal, angled, A=(34.6,4.8), C=(21.4,7.2)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 25, y: 12 },
                { x: 21.4, y: 7.2 },
                { x: 31, y: 0 },
                { x: 34.6, y: 4.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 35, y: 32 },
                { x: 38.6, y: 36.8 },
                { x: 29, y: 44 },
                { x: 25.4, y: 39.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: B=(43,0), C=(48,3) side BC≈6", A=(36.83,10.29), D=(41.83,13.29)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 41.97, y: 13.38 },
                { x: 48.14, y: 3.09 },
                { x: 43, y: 0 },
                { x: 36.83, y: 10.29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 18.03, y: 30.62 },
                { x: 11.86, y: 40.91 },
                { x: 17, y: 44 },
                { x: 23.17, y: 33.71 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(49,9), B=(60,14) side AB≈12", C=(57.52,19.46), D=(46.52,14.46)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 46.52, y: 14.46 },
                { x: 57.52, y: 19.46 },
                { x: 60, y: 14 },
                { x: 49, y: 9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 13.48, y: 29.54 },
                { x: 2.48, y: 24.54 },
                { x: 0, y: 30 },
                { x: 11, y: 35 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(52,42), B=(54,29) diagonal, flipped, A=(59.03,32.27), C=(46.97,38.73)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 51.98, y: 42.13 },
                { x: 47.08, y: 38.66 },
                { x: 54.02, y: 28.87 },
                { x: 58.92, y: 32.34 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8.02, y: 1.87 },
                { x: 12.92, y: 5.34 },
                { x: 5.98, y: 15.13 },
                { x: 1.08, y: 11.66 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(40,22), C=(40,34), A=(46,22), B=(46,34) - axis-aligned
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 40, y: 22 },
                { x: 40, y: 34 },
                { x: 46, y: 34 },
                { x: 46, y: 22 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 20, y: 22 },
                { x: 20, y: 10 },
                { x: 14, y: 10 },
                { x: 14, y: 22 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(32,15), C=(32,20), B=(34.5,20), A=(34.5,15)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 32, y: 15 },
                { x: 32, y: 20 },
                { x: 34.5, y: 20 },
                { x: 34.5, y: 15 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 28, y: 29 },
                { x: 28, y: 24 },
                { x: 25.5, y: 24 },
                { x: 25.5, y: 29 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 33.38, y: 4.63 }, { x: 26.18, y: 10.03 }, { x: 25.4, y: 8.99 }, { x: 31.56, y: 4.37 }, { x: 29.34, y: 1.41 }, { x: 30.38, y: 0.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 26.62, y: 39.37 }, { x: 33.82, y: 33.97 }, { x: 34.6, y: 35.01 }, { x: 28.44, y: 39.63 }, { x: 30.66, y: 42.59 }, { x: 29.62, y: 43.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 38.02, y: 9.99 }, { x: 42.65, y: 2.27 }, { x: 43.77, y: 2.94 }, { x: 39.81, y: 9.55 }, { x: 42.98, y: 11.45 }, { x: 42.31, y: 12.57 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 21.98, y: 34.01 }, { x: 17.35, y: 41.73 }, { x: 16.23, y: 41.06 }, { x: 20.19, y: 34.45 }, { x: 17.02, y: 32.55 }, { x: 17.69, y: 31.43 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 47.67, y: 14.03 }, { x: 55.87, y: 17.75 }, { x: 56.4, y: 16.57 }, { x: 49.39, y: 13.38 }, { x: 50.92, y: 10.01 }, { x: 49.74, y: 9.48 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 12.33, y: 29.97 }, { x: 4.13, y: 26.25 }, { x: 3.6, y: 27.43 }, { x: 10.61, y: 30.62 }, { x: 9.08, y: 33.99 }, { x: 10.26, y: 34.52 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 48.29, y: 38.45 }, { x: 53.5, y: 31.11 }, { x: 54.56, y: 31.86 }, { x: 50.11, y: 38.14 }, { x: 53.12, y: 40.28 }, { x: 52.37, y: 41.34 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 11.71, y: 5.55 }, { x: 6.5, y: 12.89 }, { x: 5.44, y: 12.14 }, { x: 9.89, y: 5.86 }, { x: 6.88, y: 3.72 }, { x: 7.63, y: 2.66 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 40.87, y: 22.87 }, { x: 40.87, y: 31.87 }, { x: 42.17, y: 31.87 }, { x: 42.17, y: 24.17 }, { x: 45.87, y: 24.17 }, { x: 45.87, y: 22.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 19.13, y: 21.13 }, { x: 19.13, y: 12.13 }, { x: 17.83, y: 12.13 }, { x: 17.83, y: 19.83 }, { x: 14.13, y: 19.83 }, { x: 14.13, y: 21.13 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_TIPPING_POINT_7 = {
    id: "wtc_tipping_point_7",
    category: "WTC",
    subcategory: "Tipping Point",
    name: "WTC Tipping Point 7",
    defaultDeployment: "tipping_point",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(23,8), B=(32,0) side AB≈12", C=(35.98,4.48), D=(26.98,12.48)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 26.98, y: 12.48 },
                { x: 35.98, y: 4.48 },
                { x: 32, y: 0 },
                { x: 23, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 33.02, y: 31.52 },
                { x: 24.02, y: 39.52 },
                { x: 28, y: 44 },
                { x: 37, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(38,8), B=(46,0) side AB≈11.3", C=(50.24,4.24), D=(42.24,12.24)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 42.24, y: 12.24 },
                { x: 50.24, y: 4.24 },
                { x: 46, y: 0 },
                { x: 38, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 17.76, y: 31.76 },
                { x: 9.76, y: 39.76 },
                { x: 14, y: 44 },
                { x: 22, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(45,14), C=(54,22) side DC≈12", A=(48.98,9.52), B=(57.98,17.52)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 45, y: 14 },
                { x: 54, y: 22 },
                { x: 57.98, y: 17.52 },
                { x: 48.98, y: 9.52 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 15, y: 30 },
                { x: 6, y: 22 },
                { x: 2.02, y: 26.48 },
                { x: 11.02, y: 34.48 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(51,43), C=(57,32) side DC≈12.5", A=(45.73,40.13), B=(51.73,29.13)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 51, y: 43 },
                { x: 57, y: 32 },
                { x: 51.73, y: 29.13 },
                { x: 45.73, y: 40.13 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 9, y: 1 },
                { x: 3, y: 12 },
                { x: 8.27, y: 14.87 },
                { x: 14.27, y: 3.87 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(40,22), C=(40,34), A=(46,22), B=(46,34) - axis-aligned
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 40, y: 22 },
                { x: 40, y: 34 },
                { x: 46, y: 34 },
                { x: 46, y: 22 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 20, y: 22 },
                { x: 20, y: 10 },
                { x: 14, y: 10 },
                { x: 14, y: 22 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(33,17), C=(33,22), B=(35.5,22), A=(35.5,17)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 33, y: 17 },
                { x: 33, y: 22 },
                { x: 35.5, y: 22 },
                { x: 35.5, y: 17 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 27, y: 27 },
                { x: 27, y: 22 },
                { x: 24.5, y: 22 },
                { x: 24.5, y: 27 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 34.75, y: 4.41 }, { x: 28.03, y: 10.39 }, { x: 27.16, y: 9.42 }, { x: 32.92, y: 4.3 }, { x: 30.46, y: 1.53 }, { x: 31.43, y: 0.67 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 25.25, y: 39.59 }, { x: 31.97, y: 33.61 }, { x: 32.84, y: 34.58 }, { x: 27.08, y: 39.7 }, { x: 29.54, y: 42.47 }, { x: 28.57, y: 43.33 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 49.01, y: 4.24 }, { x: 42.65, y: 10.6 }, { x: 41.73, y: 9.68 }, { x: 47.17, y: 4.24 }, { x: 44.55, y: 1.62 }, { x: 45.47, y: 0.7 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 10.99, y: 39.76 }, { x: 17.35, y: 33.4 }, { x: 18.27, y: 34.32 }, { x: 12.83, y: 39.76 }, { x: 15.45, y: 42.38 }, { x: 14.53, y: 43.3 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 46.23, y: 13.93 }, { x: 52.95, y: 19.91 }, { x: 53.82, y: 18.94 }, { x: 48.06, y: 13.82 }, { x: 50.52, y: 11.05 }, { x: 49.55, y: 10.19 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 13.77, y: 30.07 }, { x: 7.05, y: 24.09 }, { x: 6.18, y: 25.06 }, { x: 11.94, y: 30.18 }, { x: 9.48, y: 32.95 }, { x: 10.45, y: 33.81 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 46.91, y: 39.78 }, { x: 51.22, y: 31.88 }, { x: 52.36, y: 32.5 }, { x: 48.67, y: 39.26 }, { x: 51.92, y: 41.03 }, { x: 51.3, y: 42.17 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 13.09, y: 4.22 }, { x: 8.78, y: 12.12 }, { x: 7.64, y: 11.5 }, { x: 11.33, y: 4.74 }, { x: 8.08, y: 2.97 }, { x: 8.7, y: 1.83 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 40.87, y: 33.13 }, { x: 40.87, y: 24.13 }, { x: 42.17, y: 24.13 }, { x: 42.17, y: 31.83 }, { x: 45.87, y: 31.83 }, { x: 45.87, y: 33.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 19.13, y: 10.87 }, { x: 19.13, y: 19.87 }, { x: 17.83, y: 19.87 }, { x: 17.83, y: 12.17 }, { x: 14.13, y: 12.17 }, { x: 14.13, y: 10.87 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_TIPPING_POINT_8 = {
    id: "wtc_tipping_point_8",
    category: "WTC",
    subcategory: "Tipping Point",
    name: "WTC Tipping Point 8",
    defaultDeployment: "tipping_point",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(55,2), D=(49,2), C=(49,14), B=(55,14) - axis-aligned 6x12
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 49, y: 2 },
                { x: 49, y: 14 },
                { x: 55, y: 14 },
                { x: 55, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 11, y: 42 },
                { x: 11, y: 30 },
                { x: 5, y: 30 },
                { x: 5, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(33,9), B=(45,9), C=(45,15), D=(33,15) - axis-aligned 12x6
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 33, y: 15 },
                { x: 45, y: 15 },
                { x: 45, y: 9 },
                { x: 33, y: 9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 27, y: 29 },
                { x: 15, y: 29 },
                { x: 15, y: 35 },
                { x: 27, y: 35 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(52,29), B=(53,16) diagonal, flipped, A=(58.31,18.79), C=(46.69,26.21)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 51.99, y: 29.19 },
                { x: 46.84, y: 26.1 },
                { x: 53.01, y: 15.81 },
                { x: 58.16, y: 18.9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8.01, y: 14.81 },
                { x: 13.16, y: 17.9 },
                { x: 6.99, y: 28.19 },
                { x: 1.84, y: 25.1 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(36,27), B=(43,16) diagonal, flipped, A=(46.37,20.96), C=(32.63,22.04)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 35.9, y: 27.16 },
                { x: 32.81, y: 22.01 },
                { x: 43.1, y: 15.84 },
                { x: 46.19, y: 20.99 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 24.1, y: 16.84 },
                { x: 27.19, y: 21.99 },
                { x: 16.9, y: 28.16 },
                { x: 13.81, y: 23.01 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: B=(45,44), C=(39,44), A=(45,32), D=(39,32) - axis-aligned 6x12
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 39, y: 32 },
                { x: 39, y: 44 },
                { x: 45, y: 44 },
                { x: 45, y: 32 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 21, y: 12 },
                { x: 21, y: 0 },
                { x: 15, y: 0 },
                { x: 15, y: 12 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(33.5,0), C=(33.5,5), B=(36,5), A=(36,0)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 33.5, y: 0 },
                { x: 33.5, y: 5 },
                { x: 36, y: 5 },
                { x: 36, y: 0 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26.5, y: 44 },
                { x: 26.5, y: 39 },
                { x: 24, y: 39 },
                { x: 24, y: 44 }
            ],
            traits: ["Obscuring"]
        }
    ,
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 49.87, y: 13.13 }, { x: 49.87, y: 4.13 }, { x: 51.17, y: 4.13 }, { x: 51.17, y: 11.83 }, { x: 54.87, y: 11.83 }, { x: 54.87, y: 13.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 10.13, y: 30.87 }, { x: 10.13, y: 39.87 }, { x: 8.83, y: 39.87 }, { x: 8.83, y: 32.17 }, { x: 5.13, y: 32.17 }, { x: 5.13, y: 30.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 33.87, y: 9.87 }, { x: 42.87, y: 9.87 }, { x: 42.87, y: 11.17 }, { x: 35.17, y: 11.17 }, { x: 35.17, y: 14.87 }, { x: 33.87, y: 14.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 26.13, y: 34.13 }, { x: 17.13, y: 34.13 }, { x: 17.13, y: 32.83 }, { x: 24.83, y: 32.83 }, { x: 24.83, y: 29.13 }, { x: 26.13, y: 29.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 48.03, y: 25.8 }, { x: 52.66, y: 18.08 }, { x: 53.78, y: 18.75 }, { x: 49.82, y: 25.36 }, { x: 52.99, y: 27.26 }, { x: 52.32, y: 28.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 11.97, y: 18.2 }, { x: 7.34, y: 25.92 }, { x: 6.22, y: 25.25 }, { x: 10.18, y: 18.64 }, { x: 7.01, y: 16.74 }, { x: 7.68, y: 15.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 34, y: 22.31 }, { x: 41.72, y: 17.68 }, { x: 42.39, y: 18.8 }, { x: 35.79, y: 22.76 }, { x: 37.69, y: 25.93 }, { x: 36.58, y: 26.6 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 26, y: 21.69 }, { x: 18.28, y: 26.32 }, { x: 17.61, y: 25.2 }, { x: 24.21, y: 21.24 }, { x: 22.31, y: 18.07 }, { x: 23.42, y: 17.4 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 39.87, y: 32.87 }, { x: 39.87, y: 41.87 }, { x: 41.17, y: 41.87 }, { x: 41.17, y: 34.17 }, { x: 44.87, y: 34.17 }, { x: 44.87, y: 32.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 20.13, y: 11.13 }, { x: 20.13, y: 2.13 }, { x: 18.83, y: 2.13 }, { x: 18.83, y: 9.83 }, { x: 15.13, y: 9.83 }, { x: 15.13, y: 11.13 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

// Search and Destroy (7 layouts: 1, 2, 3, 4-5, 6, 7, 8)
const WTC_SEARCH_AND_DESTROY_1 = {
    id: "wtc_search_and_destroy_1",
    category: "WTC",
    subcategory: "Search and Destroy",
    name: "WTC Search and Destroy 1",
    defaultDeployment: "search_and_destroy",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: B=(37,0), D=(34,13), long steep flipped, A=(41.67,3.77), C=(29.33,9.23)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 13 },
                { x: 29.33, y: 9.23 },
                { x: 37, y: 0 },
                { x: 41.67, y: 3.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 31 },
                { x: 30.67, y: 34.77 },
                { x: 23, y: 44 },
                { x: 18.33, y: 40.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(50,2), C=(53,15), long steep flipped, B=(45.33,5.77), D=(57.67,11.23)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 57.67, y: 11.23 },
                { x: 53, y: 15 },
                { x: 45.33, y: 5.77 },
                { x: 50, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 2.33, y: 32.77 },
                { x: 7, y: 29 },
                { x: 14.67, y: 38.23 },
                { x: 10, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: B=(54,38), C=(49,38), vertical, A=(54,26), D=(49,26)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 48, y: 26 },
                { x: 48, y: 38 },
                { x: 54, y: 38 },
                { x: 54, y: 26 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 12, y: 18 },
                { x: 12, y: 6 },
                { x: 6, y: 6 },
                { x: 6, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: B=(41,13), D=(38,26), long steep flipped, A=(45.67,16.77), C=(33.33,22.23)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 26 },
                { x: 33.33, y: 22.23 },
                { x: 41, y: 13 },
                { x: 45.67, y: 16.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 18 },
                { x: 26.67, y: 21.77 },
                { x: 19, y: 31 },
                { x: 14.33, y: 27.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: B=(41,27), D=(38,40), long steep flipped, A=(45.67,30.77), C=(33.33,36.23)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 40 },
                { x: 33.33, y: 36.23 },
                { x: 41, y: 27 },
                { x: 45.67, y: 30.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 4 },
                { x: 26.67, y: 7.77 },
                { x: 19, y: 17 },
                { x: 14.33, y: 13.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): Shares Shape7.C=(33.33,22.23), 2.5" along C→B (long edge), 5" toward exterior
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 33.33, y: 22.23 },
                { x: 34.93, y: 20.31 },
                { x: 31.08, y: 17.11 },
                { x: 29.48, y: 19.03 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26.67, y: 21.77 },
                { x: 25.07, y: 23.69 },
                { x: 28.92, y: 26.89 },
                { x: 30.52, y: 24.97 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 33.88, y: 11.78 }, { x: 39.63, y: 4.86 }, { x: 38.63, y: 4.03 }, { x: 33.71, y: 9.95 }, { x: 30.81, y: 7.63 }, { x: 29.99, y: 8.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 26.12, y: 32.22 }, { x: 20.37, y: 39.14 }, { x: 21.37, y: 39.97 }, { x: 26.29, y: 34.05 }, { x: 29.19, y: 36.37 }, { x: 30.01, y: 35.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 53.12, y: 13.78 }, { x: 47.37, y: 6.86 }, { x: 48.37, y: 6.03 }, { x: 53.29, y: 11.95 }, { x: 56.19, y: 9.63 }, { x: 57.01, y: 10.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 6.88, y: 30.22 }, { x: 12.63, y: 37.14 }, { x: 11.63, y: 37.97 }, { x: 6.71, y: 32.05 }, { x: 3.81, y: 34.37 }, { x: 2.99, y: 33.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 48.87, y: 26.87 }, { x: 48.87, y: 35.87 }, { x: 50.17, y: 35.87 }, { x: 50.17, y: 28.17 }, { x: 53.87, y: 28.17 }, { x: 53.87, y: 26.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 11.13, y: 17.13 }, { x: 11.13, y: 8.13 }, { x: 9.83, y: 8.13 }, { x: 9.83, y: 15.83 }, { x: 6.13, y: 15.83 }, { x: 6.13, y: 17.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 41.12, y: 14.22 }, { x: 35.37, y: 21.14 }, { x: 36.37, y: 21.97 }, { x: 41.29, y: 16.05 }, { x: 44.19, y: 18.37 }, { x: 45.01, y: 17.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 18.88, y: 29.78 }, { x: 24.63, y: 22.86 }, { x: 23.63, y: 22.03 }, { x: 18.71, y: 27.95 }, { x: 15.81, y: 25.63 }, { x: 14.99, y: 26.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 34.56, y: 36.11 }, { x: 40.32, y: 29.19 }, { x: 41.31, y: 30.02 }, { x: 36.39, y: 35.94 }, { x: 39.27, y: 38.24 }, { x: 38.45, y: 39.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 25.44, y: 7.89 }, { x: 19.68, y: 14.81 }, { x: 18.69, y: 13.98 }, { x: 23.61, y: 8.06 }, { x: 20.73, y: 5.76 }, { x: 21.55, y: 4.75 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

const WTC_SEARCH_AND_DESTROY_2 = {
    id: "wtc_search_and_destroy_2",
    category: "WTC",
    subcategory: "Search and Destroy",
    name: "WTC Search and Destroy 2",
    defaultDeployment: "search_and_destroy",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: B=(33,4), D=(30,17), short steep, A=(25.33,13.23), C=(37.67,7.77)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 17 },
                { x: 37.67, y: 7.77 },
                { x: 33, y: 4 },
                { x: 25.33, y: 13.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 27 },
                { x: 22.33, y: 36.23 },
                { x: 27, y: 40 },
                { x: 34.67, y: 30.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: C=(54,5), B=(48,5), vertical, A=(48,17), D=(54,17)
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 54, y: 17 },
                { x: 54, y: 5 },
                { x: 48, y: 5 },
                { x: 48, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 6, y: 27 },
                { x: 6, y: 39 },
                { x: 12, y: 39 },
                { x: 12, y: 27 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: C=(57,34), D=(45,34), horizontal, A=(45,28), B=(57,28)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 45, y: 32 },
                { x: 57, y: 32 },
                { x: 57, y: 26 },
                { x: 45, y: 26 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 15, y: 12 },
                { x: 3, y: 12 },
                { x: 3, y: 18 },
                { x: 15, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(36,27), B=(39,14), short steep, A=(31.33,23.23), C=(43.67,17.77)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 36, y: 27 },
                { x: 43.67, y: 17.77 },
                { x: 39, y: 14 },
                { x: 31.33, y: 23.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 24, y: 17 },
                { x: 16.33, y: 26.23 },
                { x: 21, y: 30 },
                { x: 28.67, y: 20.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(36,44), B=(39,31), short steep, A=(31.33,40.23), C=(43.67,34.77)
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 36, y: 44 },
                { x: 43.67, y: 34.77 },
                { x: 39, y: 31 },
                { x: 31.33, y: 40.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 24, y: 0 },
                { x: 16.33, y: 9.23 },
                { x: 21, y: 13 },
                { x: 28.67, y: 3.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): C=(57,23), D=(52,23), B=(57,20.5), A=(52,20.5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 23 },
                { x: 57, y: 23 },
                { x: 57, y: 20.5 },
                { x: 52, y: 20.5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 21 },
                { x: 3, y: 21 },
                { x: 3, y: 23.5 },
                { x: 8, y: 23.5 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 36.44, y: 7.89 }, { x: 30.68, y: 14.81 }, { x: 29.69, y: 13.98 }, { x: 34.61, y: 8.06 }, { x: 31.73, y: 5.76 }, { x: 32.55, y: 4.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 23.56, y: 36.11 }, { x: 29.32, y: 29.19 }, { x: 30.31, y: 30.02 }, { x: 25.39, y: 35.94 }, { x: 28.27, y: 38.24 }, { x: 27.45, y: 39.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 48.87, y: 5.87 }, { x: 48.87, y: 14.87 }, { x: 50.17, y: 14.87 }, { x: 50.17, y: 7.17 }, { x: 53.87, y: 7.17 }, { x: 53.87, y: 5.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 11.13, y: 38.13 }, { x: 11.13, y: 29.13 }, { x: 9.83, y: 29.13 }, { x: 9.83, y: 36.83 }, { x: 6.13, y: 36.83 }, { x: 6.13, y: 38.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 45.87, y: 26.87 }, { x: 54.87, y: 26.87 }, { x: 54.87, y: 28.17 }, { x: 47.17, y: 28.17 }, { x: 47.17, y: 31.87 }, { x: 45.87, y: 31.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 14.13, y: 17.13 }, { x: 5.13, y: 17.13 }, { x: 5.13, y: 15.83 }, { x: 12.83, y: 15.83 }, { x: 12.83, y: 12.13 }, { x: 14.13, y: 12.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 39.12, y: 15.22 }, { x: 33.37, y: 22.14 }, { x: 34.37, y: 22.97 }, { x: 39.29, y: 17.05 }, { x: 42.19, y: 19.37 }, { x: 43.01, y: 18.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 20.88, y: 28.78 }, { x: 26.63, y: 21.86 }, { x: 25.63, y: 21.03 }, { x: 20.71, y: 26.95 }, { x: 17.81, y: 24.63 }, { x: 16.99, y: 25.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 39.12, y: 32.22 }, { x: 33.37, y: 39.14 }, { x: 34.37, y: 39.97 }, { x: 39.29, y: 34.05 }, { x: 42.19, y: 36.37 }, { x: 43.01, y: 35.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 20.88, y: 11.78 }, { x: 26.63, y: 4.86 }, { x: 25.63, y: 4.03 }, { x: 20.71, y: 9.95 }, { x: 17.81, y: 7.63 }, { x: 16.99, y: 8.64 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SEARCH_AND_DESTROY_3 = {
    id: "wtc_search_and_destroy_3",
    category: "WTC",
    subcategory: "Search and Destroy",
    name: "WTC Search and Destroy 3",
    defaultDeployment: "search_and_destroy",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: B=(37,0), D=(34,13), long steep flipped, A=(41.67,3.77), C=(29.33,9.23)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 13 },
                { x: 29.33, y: 9.23 },
                { x: 37, y: 0 },
                { x: 41.67, y: 3.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 31 },
                { x: 30.67, y: 34.77 },
                { x: 23, y: 44 },
                { x: 18.33, y: 40.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(50,2), C=(53,15), long steep flipped, B=(45.33,5.77), D=(57.67,11.23)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 57.67, y: 11.23 },
                { x: 53, y: 15 },
                { x: 45.33, y: 5.77 },
                { x: 50, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 2.33, y: 32.77 },
                { x: 7, y: 29 },
                { x: 14.67, y: 38.23 },
                { x: 10, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: B=(54,38), C=(49,38), vertical, A=(54,26), D=(49,26)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 48, y: 26 },
                { x: 48, y: 38 },
                { x: 54, y: 38 },
                { x: 54, y: 26 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 12, y: 18 },
                { x: 12, y: 6 },
                { x: 6, y: 6 },
                { x: 6, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: B=(41,13), D=(38,26), long steep flipped, A=(45.67,16.77), C=(33.33,22.23)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 26 },
                { x: 33.33, y: 22.23 },
                { x: 41, y: 13 },
                { x: 45.67, y: 16.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 18 },
                { x: 26.67, y: 21.77 },
                { x: 19, y: 31 },
                { x: 14.33, y: 27.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(38,40), C=(46,31) adjacent (side DC=12"), A=(33.52,36.01), B=(41.52,27.01)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 40 },
                { x: 46, y: 31 },
                { x: 41.52, y: 27.01 },
                { x: 33.52, y: 36.01 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 4 },
                { x: 14, y: 13 },
                { x: 18.48, y: 16.99 },
                { x: 26.48, y: 7.99 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): Shares Shape7.C=(33.33,22.23), 2.5" along C→B (long edge), 5" toward exterior
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 33.33, y: 22.23 },
                { x: 34.93, y: 20.31 },
                { x: 31.08, y: 17.11 },
                { x: 29.48, y: 19.03 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26.67, y: 21.77 },
                { x: 25.07, y: 23.69 },
                { x: 28.92, y: 26.89 },
                { x: 30.52, y: 24.97 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 33.88, y: 11.78 }, { x: 39.63, y: 4.86 }, { x: 38.63, y: 4.03 }, { x: 33.71, y: 9.95 }, { x: 30.81, y: 7.63 }, { x: 29.99, y: 8.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 26.12, y: 32.22 }, { x: 20.37, y: 39.14 }, { x: 21.37, y: 39.97 }, { x: 26.29, y: 34.05 }, { x: 29.19, y: 36.37 }, { x: 30.01, y: 35.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 53.12, y: 13.78 }, { x: 47.37, y: 6.86 }, { x: 48.37, y: 6.03 }, { x: 53.29, y: 11.95 }, { x: 56.19, y: 9.63 }, { x: 57.01, y: 10.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 6.88, y: 30.22 }, { x: 12.63, y: 37.14 }, { x: 11.63, y: 37.97 }, { x: 6.71, y: 32.05 }, { x: 3.81, y: 34.37 }, { x: 2.99, y: 33.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 48.87, y: 26.87 }, { x: 48.87, y: 35.87 }, { x: 50.17, y: 35.87 }, { x: 50.17, y: 28.17 }, { x: 53.87, y: 28.17 }, { x: 53.87, y: 26.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 11.13, y: 17.13 }, { x: 11.13, y: 8.13 }, { x: 9.83, y: 8.13 }, { x: 9.83, y: 15.83 }, { x: 6.13, y: 15.83 }, { x: 6.13, y: 17.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 34.56, y: 22.11 }, { x: 40.32, y: 15.19 }, { x: 41.31, y: 16.02 }, { x: 36.39, y: 21.94 }, { x: 39.27, y: 24.24 }, { x: 38.45, y: 25.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 25.44, y: 21.89 }, { x: 19.68, y: 28.81 }, { x: 18.69, y: 27.98 }, { x: 23.61, y: 22.06 }, { x: 20.73, y: 19.76 }, { x: 21.55, y: 18.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 34.75, y: 35.94 }, { x: 40.73, y: 29.21 }, { x: 41.7, y: 30.08 }, { x: 36.58, y: 35.83 }, { x: 39.35, y: 38.29 }, { x: 38.48, y: 39.26 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 25.25, y: 8.06 }, { x: 19.27, y: 14.79 }, { x: 18.3, y: 13.92 }, { x: 23.42, y: 8.17 }, { x: 20.65, y: 5.71 }, { x: 21.52, y: 4.74 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SEARCH_AND_DESTROY_4_5 = {
    id: "wtc_search_and_destroy_4_5",
    category: "WTC",
    subcategory: "Search and Destroy",
    name: "WTC Search and Destroy 4-5",
    defaultDeployment: "search_and_destroy",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(26,2), C=(36,11) diagonal, short steep, B=(24.44,7.79), D=(37.56,5.21)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 37.56, y: 5.21 },
                { x: 36, y: 11 },
                { x: 24.44, y: 7.79 },
                { x: 26, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22.44, y: 38.79 },
                { x: 24, y: 33 },
                { x: 35.56, y: 36.21 },
                { x: 34, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(46,0), C=(49,13) diagonal, short steep, B=(41.33,3.77), D=(53.67,9.23)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 53.67, y: 9.23 },
                { x: 49, y: 13 },
                { x: 41.33, y: 3.77 },
                { x: 46, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 6.33, y: 34.77 },
                { x: 11, y: 31 },
                { x: 18.67, y: 40.23 },
                { x: 14, y: 44 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(48,28), C=(56,19) side DC=12", A=(43.52,24.02), B=(51.52,15.02)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 48, y: 28 },
                { x: 56, y: 19 },
                { x: 51.52, y: 15.02 },
                { x: 43.52, y: 24.02 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 12, y: 16 },
                { x: 4, y: 25 },
                { x: 8.48, y: 28.98 },
                { x: 16.48, y: 19.98 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(46,44), C=(54,35) side DC=12", A=(41.52,40.02), B=(49.52,31.02)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 46, y: 44 },
                { x: 54, y: 35 },
                { x: 49.52, y: 31.02 },
                { x: 41.52, y: 40.02 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 14, y: 0 },
                { x: 6, y: 9 },
                { x: 10.48, y: 12.98 },
                { x: 18.48, y: 3.98 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(37,31), B=(34,18) diagonal, long steep, A=(39.85,19.34), C=(31.15,29.66)
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 37, y: 31 },
                { x: 31.15, y: 29.66 },
                { x: 34, y: 18 },
                { x: 39.85, y: 19.34 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 23, y: 13 },
                { x: 28.85, y: 14.34 },
                { x: 26, y: 26 },
                { x: 20.15, y: 24.66 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(34,17), C=(39,17), B=(39,14.5), A=(34,14.5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 17 },
                { x: 39, y: 17 },
                { x: 39, y: 14.5 },
                { x: 34, y: 14.5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 27 },
                { x: 21, y: 27 },
                { x: 21, y: 29.5 },
                { x: 26, y: 29.5 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 35.39, y: 9.93 }, { x: 26.72, y: 7.52 }, { x: 27.06, y: 6.27 }, { x: 34.48, y: 8.33 }, { x: 35.43, y: 4.76 }, { x: 36.69, y: 5.1 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 24.61, y: 34.07 }, { x: 33.28, y: 36.48 }, { x: 32.94, y: 37.73 }, { x: 25.52, y: 35.67 }, { x: 24.57, y: 39.24 }, { x: 23.31, y: 38.9 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 49.12, y: 11.78 }, { x: 43.37, y: 4.86 }, { x: 44.37, y: 4.03 }, { x: 49.29, y: 9.95 }, { x: 52.19, y: 7.63 }, { x: 53.01, y: 8.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 10.88, y: 32.22 }, { x: 16.63, y: 39.14 }, { x: 15.63, y: 39.97 }, { x: 10.71, y: 34.05 }, { x: 7.81, y: 36.37 }, { x: 6.99, y: 35.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 44.75, y: 23.95 }, { x: 50.73, y: 17.22 }, { x: 51.7, y: 18.08 }, { x: 46.58, y: 23.84 }, { x: 49.35, y: 26.3 }, { x: 48.49, y: 27.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 15.25, y: 20.05 }, { x: 9.27, y: 26.78 }, { x: 8.3, y: 25.92 }, { x: 13.42, y: 20.16 }, { x: 10.65, y: 17.7 }, { x: 11.51, y: 16.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 49.59, y: 32.25 }, { x: 43.61, y: 38.97 }, { x: 44.58, y: 39.84 }, { x: 49.7, y: 34.08 }, { x: 52.47, y: 36.54 }, { x: 53.33, y: 35.57 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 10.41, y: 11.75 }, { x: 16.39, y: 5.03 }, { x: 15.42, y: 4.16 }, { x: 10.3, y: 9.92 }, { x: 7.53, y: 7.46 }, { x: 6.67, y: 8.43 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 36.36, y: 29.96 }, { x: 38.5, y: 21.22 }, { x: 37.23, y: 20.91 }, { x: 35.4, y: 28.39 }, { x: 31.78, y: 27.58 }, { x: 31.48, y: 28.84 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 23.64, y: 14.04 }, { x: 21.5, y: 22.78 }, { x: 22.77, y: 23.09 }, { x: 24.6, y: 15.61 }, { x: 28.22, y: 16.42 }, { x: 28.52, y: 15.16 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SEARCH_AND_DESTROY_6 = {
    id: "wtc_search_and_destroy_6",
    category: "WTC",
    subcategory: "Search and Destroy",
    name: "WTC Search and Destroy 6",
    defaultDeployment: "search_and_destroy",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(31,17), B=(34,4) diagonal, short steep, A=(38.67,7.77), C=(26.33,13.23)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 31, y: 17 },
                { x: 26.33, y: 13.23 },
                { x: 34, y: 4 },
                { x: 38.67, y: 7.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 29, y: 27 },
                { x: 33.67, y: 30.77 },
                { x: 26, y: 40 },
                { x: 21.33, y: 36.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: D=(54,17), C=(54,5), B=(48,5), A=(48,17) - axis aligned
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 54, y: 17 },
                { x: 54, y: 5 },
                { x: 48, y: 5 },
                { x: 48, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 6, y: 27 },
                { x: 6, y: 39 },
                { x: 12, y: 39 },
                { x: 12, y: 27 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(45,32), C=(57,32), B=(57,26), A=(45,26) - axis aligned
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 45, y: 32 },
                { x: 57, y: 32 },
                { x: 57, y: 26 },
                { x: 45, y: 26 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 15, y: 12 },
                { x: 3, y: 12 },
                { x: 3, y: 18 },
                { x: 15, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(36,44), C=(41,33) side DC≈12", A=(30.54,41.52), B=(35.54,30.52)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 36, y: 44 },
                { x: 41, y: 33 },
                { x: 35.54, y: 30.52 },
                { x: 30.54, y: 41.52 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 24, y: 0 },
                { x: 19, y: 11 },
                { x: 24.46, y: 13.48 },
                { x: 29.46, y: 2.48 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(36,27), B=(39,14) diagonal, short steep, A=(43.67,17.77), C=(31.33,23.23)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 36, y: 27 },
                { x: 31.33, y: 23.23 },
                { x: 39, y: 14 },
                { x: 43.67, y: 17.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 24, y: 17 },
                { x: 28.67, y: 20.77 },
                { x: 21, y: 30 },
                { x: 16.33, y: 26.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(52,23), C=(57,23), B=(57,20.5), A=(52,20.5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 23 },
                { x: 57, y: 23 },
                { x: 57, y: 20.5 },
                { x: 52, y: 20.5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 21 },
                { x: 3, y: 21 },
                { x: 3, y: 23.5 },
                { x: 8, y: 23.5 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 37.44, y: 7.89 }, { x: 31.68, y: 14.81 }, { x: 30.69, y: 13.98 }, { x: 35.61, y: 8.06 }, { x: 32.73, y: 5.76 }, { x: 33.55, y: 4.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 22.56, y: 36.11 }, { x: 28.32, y: 29.19 }, { x: 29.31, y: 30.02 }, { x: 24.39, y: 35.94 }, { x: 27.27, y: 38.24 }, { x: 26.45, y: 39.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 48.87, y: 5.87 }, { x: 48.87, y: 14.87 }, { x: 50.17, y: 14.87 }, { x: 50.17, y: 7.17 }, { x: 53.87, y: 7.17 }, { x: 53.87, y: 5.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 11.13, y: 38.13 }, { x: 11.13, y: 29.13 }, { x: 9.83, y: 29.13 }, { x: 9.83, y: 36.83 }, { x: 6.13, y: 36.83 }, { x: 6.13, y: 38.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 45.87, y: 26.87 }, { x: 54.87, y: 26.87 }, { x: 54.87, y: 28.17 }, { x: 47.17, y: 28.17 }, { x: 47.17, y: 31.87 }, { x: 45.87, y: 31.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 14.13, y: 17.13 }, { x: 5.13, y: 17.13 }, { x: 5.13, y: 15.83 }, { x: 12.83, y: 15.83 }, { x: 12.83, y: 12.13 }, { x: 14.13, y: 12.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 35.97, y: 31.67 }, { x: 32.25, y: 39.87 }, { x: 33.43, y: 40.4 }, { x: 36.62, y: 33.39 }, { x: 39.99, y: 34.92 }, { x: 40.52, y: 33.74 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 24.03, y: 12.33 }, { x: 27.75, y: 4.13 }, { x: 26.57, y: 3.6 }, { x: 23.38, y: 10.61 }, { x: 20.01, y: 9.08 }, { x: 19.48, y: 10.26 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 32.56, y: 23.11 }, { x: 38.32, y: 16.19 }, { x: 39.31, y: 17.02 }, { x: 34.39, y: 22.94 }, { x: 37.27, y: 25.24 }, { x: 36.45, y: 26.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 27.44, y: 20.89 }, { x: 21.68, y: 27.81 }, { x: 20.69, y: 26.98 }, { x: 25.61, y: 21.06 }, { x: 22.73, y: 18.76 }, { x: 23.55, y: 17.75 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SEARCH_AND_DESTROY_7 = {
    id: "wtc_search_and_destroy_7",
    category: "WTC",
    subcategory: "Search and Destroy",
    name: "WTC Search and Destroy 7",
    defaultDeployment: "search_and_destroy",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: Same as Map 1 - B=(37,0), D=(34,13), long steep flipped
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 13 },
                { x: 29.33, y: 9.23 },
                { x: 37, y: 0 },
                { x: 41.67, y: 3.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 31 },
                { x: 30.67, y: 34.77 },
                { x: 23, y: 44 },
                { x: 18.33, y: 40.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: Modified - B=(44,7), C=(53,15) fixed, A=(47.99,2.52), D=(56.99,10.52)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 56.99, y: 10.52 },
                { x: 53, y: 15 },
                { x: 44, y: 7 },
                { x: 47.99, y: 2.52 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 3.01, y: 33.48 },
                { x: 7, y: 29 },
                { x: 16, y: 37 },
                { x: 12.01, y: 41.48 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: Modified - A=(47,25), C=(60,22) diagonal short steep, B=(56.18,17.11), D=(50.82,29.89)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 50.82, y: 29.89 },
                { x: 60, y: 22 },
                { x: 56.18, y: 17.11 },
                { x: 47, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 9.18, y: 14.11 },
                { x: 0, y: 22 },
                { x: 3.82, y: 26.89 },
                { x: 13, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: Same as Map 1 - B=(41,13), D=(38,26), long steep flipped
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 26 },
                { x: 33.33, y: 22.23 },
                { x: 41, y: 13 },
                { x: 45.67, y: 16.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 18 },
                { x: 26.67, y: 21.77 },
                { x: 19, y: 31 },
                { x: 14.33, y: 27.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: Modified - D=(38,41), C=(46,32) side DC=12", A=(33.52,37.02), B=(41.52,28.02)
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 41 },
                { x: 46, y: 32 },
                { x: 41.52, y: 28.02 },
                { x: 33.52, y: 37.02 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 3 },
                { x: 14, y: 12 },
                { x: 18.48, y: 15.98 },
                { x: 26.48, y: 6.98 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: Same as Map 1 - 2.5x5, shares Shape7.C=(33.33,22.23)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 33.33, y: 22.23 },
                { x: 34.93, y: 20.31 },
                { x: 31.08, y: 17.11 },
                { x: 29.48, y: 19.03 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26.67, y: 21.77 },
                { x: 25.07, y: 23.69 },
                { x: 28.92, y: 26.89 },
                { x: 30.52, y: 24.97 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 30.56, y: 9.11 }, { x: 36.32, y: 2.19 }, { x: 37.31, y: 3.02 }, { x: 32.39, y: 8.94 }, { x: 35.27, y: 11.24 }, { x: 34.45, y: 12.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 29.44, y: 34.89 }, { x: 23.68, y: 41.81 }, { x: 22.69, y: 40.98 }, { x: 27.61, y: 35.06 }, { x: 24.73, y: 32.76 }, { x: 25.55, y: 31.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 48.06, y: 3.75 }, { x: 54.79, y: 9.73 }, { x: 53.92, y: 10.7 }, { x: 48.17, y: 5.58 }, { x: 45.71, y: 8.35 }, { x: 44.74, y: 7.48 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 11.94, y: 40.25 }, { x: 5.21, y: 34.27 }, { x: 6.08, y: 33.3 }, { x: 11.83, y: 38.42 }, { x: 14.29, y: 35.65 }, { x: 15.26, y: 36.52 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 48.2, y: 25.12 }, { x: 55.02, y: 19.25 }, { x: 55.87, y: 20.24 }, { x: 50.03, y: 25.26 }, { x: 52.3, y: 28.26 }, { x: 51.27, y: 29.06 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 11.8, y: 18.88 }, { x: 4.98, y: 24.75 }, { x: 4.13, y: 23.76 }, { x: 9.97, y: 18.74 }, { x: 7.7, y: 15.74 }, { x: 8.73, y: 14.94 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 34.56, y: 22.11 }, { x: 40.32, y: 15.19 }, { x: 41.31, y: 16.02 }, { x: 36.39, y: 21.94 }, { x: 39.27, y: 24.24 }, { x: 38.45, y: 25.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 25.44, y: 21.89 }, { x: 19.68, y: 28.81 }, { x: 18.69, y: 27.98 }, { x: 23.61, y: 22.06 }, { x: 20.73, y: 19.76 }, { x: 21.55, y: 18.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 41.59, y: 29.25 }, { x: 35.61, y: 35.97 }, { x: 36.58, y: 36.84 }, { x: 41.7, y: 31.08 }, { x: 44.47, y: 33.54 }, { x: 45.33, y: 32.57 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 18.41, y: 14.75 }, { x: 24.39, y: 8.03 }, { x: 23.42, y: 7.16 }, { x: 18.3, y: 12.92 }, { x: 15.53, y: 10.46 }, { x: 14.67, y: 11.43 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_SEARCH_AND_DESTROY_8 = {
    id: "wtc_search_and_destroy_8",
    category: "WTC",
    subcategory: "Search and Destroy",
    name: "WTC Search and Destroy 8",
    defaultDeployment: "search_and_destroy",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(32,17), C=(38,7), B=(33,4), A=(27,14)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 32, y: 17 },
                { x: 38, y: 7 },
                { x: 33, y: 4 },
                { x: 27, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 28, y: 27 },
                { x: 22, y: 37 },
                { x: 27, y: 40 },
                { x: 33, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: D=(54,16), C=(54,4), B=(48,4), A=(48,16) - vertical
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 54, y: 16 },
                { x: 54, y: 4 },
                { x: 48, y: 4 },
                { x: 48, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 6, y: 28 },
                { x: 6, y: 40 },
                { x: 12, y: 40 },
                { x: 12, y: 28 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(45,32), C=(57,32), B=(57,26), A=(45,26) - horizontal
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 45, y: 32 },
                { x: 57, y: 32 },
                { x: 57, y: 26 },
                { x: 45, y: 26 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 15, y: 12 },
                { x: 3, y: 12 },
                { x: 3, y: 18 },
                { x: 15, y: 18 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(36,44), C=(42,34) side, B=(36.86,30.91), A=(30.86,40.91)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 36, y: 44 },
                { x: 42, y: 34 },
                { x: 36.86, y: 30.91 },
                { x: 30.86, y: 40.91 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 24, y: 0 },
                { x: 18, y: 10 },
                { x: 23.14, y: 13.09 },
                { x: 29.14, y: 3.09 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(38,27), B=(39,14) diagonal, A=(44.31,16.79), C=(32.69,24.21)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 27 },
                { x: 33, y: 24 },
                { x: 39, y: 14 },
                { x: 44, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 17 },
                { x: 27, y: 20 },
                { x: 21, y: 30 },
                { x: 16, y: 27 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: 2.5x5, D=(52,23), C=(57,23), B=(57,20.5), A=(52,20.5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 23 },
                { x: 57, y: 23 },
                { x: 57, y: 20.5 },
                { x: 52, y: 20.5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 21 },
                { x: 3, y: 21 },
                { x: 3, y: 23.5 },
                { x: 8, y: 23.5 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 36.81, y: 7.3 }, { x: 32.18, y: 15.02 }, { x: 31.06, y: 14.35 }, { x: 35.02, y: 7.74 }, { x: 31.85, y: 5.84 }, { x: 32.52, y: 4.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 23.19, y: 36.7 }, { x: 27.82, y: 28.98 }, { x: 28.94, y: 29.65 }, { x: 24.98, y: 36.26 }, { x: 28.15, y: 38.16 }, { x: 27.48, y: 39.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 53.13, y: 4.87 }, { x: 53.13, y: 13.87 }, { x: 51.83, y: 13.87 }, { x: 51.83, y: 6.17 }, { x: 48.13, y: 6.17 }, { x: 48.13, y: 4.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 6.87, y: 39.13 }, { x: 6.87, y: 30.13 }, { x: 8.17, y: 30.13 }, { x: 8.17, y: 37.83 }, { x: 11.87, y: 37.83 }, { x: 11.87, y: 39.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 45.87, y: 26.87 }, { x: 54.87, y: 26.87 }, { x: 54.87, y: 28.17 }, { x: 47.17, y: 28.17 }, { x: 47.17, y: 31.87 }, { x: 45.87, y: 31.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 14.13, y: 17.13 }, { x: 5.13, y: 17.13 }, { x: 5.13, y: 15.83 }, { x: 12.83, y: 15.83 }, { x: 12.83, y: 12.13 }, { x: 14.13, y: 12.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 37.16, y: 32.1 }, { x: 32.53, y: 39.82 }, { x: 33.64, y: 40.49 }, { x: 37.6, y: 33.89 }, { x: 40.77, y: 35.79 }, { x: 41.44, y: 34.68 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 22.84, y: 11.9 }, { x: 27.47, y: 4.18 }, { x: 26.36, y: 3.51 }, { x: 22.4, y: 10.11 }, { x: 19.23, y: 8.21 }, { x: 18.56, y: 9.32 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 34.19, y: 23.7 }, { x: 38.82, y: 15.98 }, { x: 39.94, y: 16.65 }, { x: 35.98, y: 23.26 }, { x: 39.15, y: 25.16 }, { x: 38.48, y: 26.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 25.81, y: 20.3 }, { x: 21.18, y: 28.02 }, { x: 20.06, y: 27.35 }, { x: 24.02, y: 20.74 }, { x: 20.85, y: 18.84 }, { x: 21.52, y: 17.73 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

// Crucible of Battle (7 layouts: 1, 2, 3, 4-5, 6, 7, 8)
const WTC_CRUCIBLE_OF_BATTLE_1 = {
    id: "wtc_crucible_of_battle_1",
    category: "WTC",
    subcategory: "Crucible of Battle",
    name: "WTC Crucible of Battle 1",
    defaultDeployment: "crucible_of_battle",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Blue ruin footprints (L at closest corner to center = ┌)
        { id: "shape_1", type: "red_solid", shape: "polygon", points: [{ x: 26.4, y: 7.8 }, { x: 38, y: 11 }, { x: 39.6, y: 5.2 }, { x: 28, y: 2 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "red_solid", shape: "polygon", points: [{ x: 33.6, y: 36.2 }, { x: 22, y: 33 }, { x: 20.4, y: 38.8 }, { x: 32, y: 42 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 35, y: 31 }, { x: 40, y: 20 }, { x: 34.54, y: 17.52 }, { x: 29.54, y: 28.52 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 25, y: 13 }, { x: 20, y: 24 }, { x: 25.46, y: 26.48 }, { x: 30.46, y: 15.48 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "blue_solid", shape: "polygon", points: [{ x: 46, y: 44 }, { x: 54, y: 33 }, { x: 49.15, y: 29.47 }, { x: 41.15, y: 40.47 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "blue_solid", shape: "polygon", points: [{ x: 14, y: 0 }, { x: 6, y: 11 }, { x: 10.85, y: 14.53 }, { x: 18.85, y: 3.53 }], traits: ["Defensible", "Obscuring"] },
        // Red ruin footprints (L at adjacent corner along short edge = ┐)
        { id: "shape_3", type: "red_solid", shape: "polygon", points: [{ x: 42.52, y: 3.98 }, { x: 50.52, y: 12.98 }, { x: 55, y: 9 }, { x: 47, y: 0 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "red_solid", shape: "polygon", points: [{ x: 17.48, y: 40.02 }, { x: 9.48, y: 31.02 }, { x: 5, y: 35 }, { x: 13, y: 44 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "blue_solid", shape: "polygon", points: [{ x: 48, y: 27 }, { x: 56, y: 18 }, { x: 51.52, y: 14.02 }, { x: 43.52, y: 23.02 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "blue_solid", shape: "polygon", points: [{ x: 12, y: 17 }, { x: 4, y: 26 }, { x: 8.48, y: 29.98 }, { x: 16.48, y: 20.98 }], traits: ["Defensible", "Obscuring"] },
        // Blue L-walls (┌ at closest corner to center)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 37.39, y: 9.93 }, { x: 28.71, y: 7.54 }, { x: 29.06, y: 6.29 }, { x: 36.48, y: 8.33 }, { x: 37.47, y: 4.76 }, { x: 38.72, y: 5.11 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 22.61, y: 34.07 }, { x: 31.29, y: 36.46 }, { x: 30.94, y: 37.71 }, { x: 23.52, y: 35.67 }, { x: 22.53, y: 39.24 }, { x: 21.28, y: 38.89 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 34.57, y: 29.85 }, { x: 38.29, y: 21.65 }, { x: 37.11, y: 21.12 }, { x: 33.92, y: 28.13 }, { x: 30.55, y: 26.6 }, { x: 30.02, y: 27.78 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 25.43, y: 14.15 }, { x: 21.71, y: 22.35 }, { x: 22.89, y: 22.88 }, { x: 26.08, y: 15.87 }, { x: 29.45, y: 17.4 }, { x: 29.98, y: 16.22 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 49.34, y: 30.69 }, { x: 44.05, y: 37.97 }, { x: 45.10, y: 38.74 }, { x: 49.63, y: 32.51 }, { x: 52.62, y: 34.68 }, { x: 53.38, y: 33.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 10.66, y: 13.31 }, { x: 15.95, y: 6.03 }, { x: 14.90, y: 5.26 }, { x: 10.37, y: 11.49 }, { x: 7.38, y: 9.32 }, { x: 6.62, y: 10.37 }], traits: ["Defensible", "Obscuring"] },
        // Red L-walls (┐ at adjacent corner along short edge)
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 50.59, y: 11.75 }, { x: 44.61, y: 5.03 }, { x: 45.58, y: 4.16 }, { x: 50.7, y: 9.92 }, { x: 53.47, y: 7.46 }, { x: 54.33, y: 8.43 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 9.41, y: 32.25 }, { x: 15.39, y: 38.97 }, { x: 14.42, y: 39.84 }, { x: 9.3, y: 34.08 }, { x: 6.53, y: 36.54 }, { x: 5.67, y: 35.57 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 51.59, y: 15.25 }, { x: 45.61, y: 21.97 }, { x: 46.58, y: 22.84 }, { x: 51.7, y: 17.08 }, { x: 54.47, y: 19.54 }, { x: 55.33, y: 18.57 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 8.41, y: 28.75 }, { x: 14.39, y: 22.03 }, { x: 13.42, y: 21.16 }, { x: 8.3, y: 26.92 }, { x: 5.53, y: 24.46 }, { x: 4.67, y: 25.43 }], traits: ["Defensible", "Obscuring"] },
        // Armoured containers (grey solid, block LOS)
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 33, y: 17 }, { x: 38, y: 17 }, { x: 38, y: 14.5 }, { x: 33, y: 14.5 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 27, y: 27 }, { x: 22, y: 27 }, { x: 22, y: 29.5 }, { x: 27, y: 29.5 }], traits: ["Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_CRUCIBLE_OF_BATTLE_2 = {
    id: "wtc_crucible_of_battle_2",
    category: "WTC",
    subcategory: "Crucible of Battle",
    name: "WTC Crucible of Battle 2",
    defaultDeployment: "crucible_of_battle",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: B=(37,0), D=(34,13) diagonal, A=(41.6,3.8), C=(29.4,9.2)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 13 },
                { x: 29.4, y: 9.2 },
                { x: 37, y: 0 },
                { x: 41.6, y: 3.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 31 },
                { x: 30.6, y: 34.8 },
                { x: 23, y: 44 },
                { x: 18.4, y: 40.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(48,3), B=(57,11), C=(53.02,15.48), D=(44.02,7.48)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 44.02, y: 7.48 },
                { x: 53.02, y: 15.48 },
                { x: 57, y: 11 },
                { x: 48, y: 3 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 15.98, y: 36.52 },
                { x: 6.98, y: 28.52 },
                { x: 3, y: 33 },
                { x: 12, y: 41 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(38,26), C=(46,17), B=(41.52,13.02), A=(33.52,22.02)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 26 },
                { x: 46, y: 17 },
                { x: 41.52, y: 13.02 },
                { x: 33.52, y: 22.02 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 18 },
                { x: 14, y: 27 },
                { x: 18.48, y: 30.98 },
                { x: 26.48, y: 21.98 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(54,38), C=(54,26), B=(48,26), A=(48,38)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 54, y: 38 },
                { x: 54, y: 26 },
                { x: 48, y: 26 },
                { x: 48, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 6, y: 6 },
                { x: 6, y: 18 },
                { x: 12, y: 18 },
                { x: 12, y: 6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(38,40), C=(46,31), B=(41.52,27.02), A=(33.52,36.02)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 40 },
                { x: 46, y: 31 },
                { x: 41.52, y: 27.02 },
                { x: 33.52, y: 36.02 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 4 },
                { x: 14, y: 13 },
                { x: 18.48, y: 16.98 },
                { x: 26.48, y: 7.98 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): At A of shape 5, short side toward B, long side away
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 29.78, y: 18.70 },
                { x: 31.44, y: 16.83 },
                { x: 35.18, y: 20.15 },
                { x: 33.52, y: 22.02 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 30.22, y: 25.30 },
                { x: 28.56, y: 27.17 },
                { x: 24.82, y: 23.85 },
                { x: 26.48, y: 21.98 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 33.88, y: 11.78 }, { x: 39.62, y: 4.84 }, { x: 38.61, y: 4.01 }, { x: 33.71, y: 9.94 }, { x: 30.86, y: 7.59 }, { x: 30.03, y: 8.59 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 26.12, y: 32.22 }, { x: 20.38, y: 39.16 }, { x: 21.39, y: 39.99 }, { x: 26.29, y: 34.06 }, { x: 29.14, y: 36.41 }, { x: 29.97, y: 35.41 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 52.95, y: 14.25 }, { x: 46.22, y: 8.27 }, { x: 47.08, y: 7.3 }, { x: 52.84, y: 12.42 }, { x: 55.3, y: 9.65 }, { x: 56.27, y: 10.51 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 7.05, y: 29.75 }, { x: 13.78, y: 35.73 }, { x: 12.92, y: 36.7 }, { x: 7.16, y: 31.58 }, { x: 4.7, y: 34.35 }, { x: 3.73, y: 33.49 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 41.59, y: 14.25 }, { x: 35.61, y: 20.97 }, { x: 36.58, y: 21.84 }, { x: 41.7, y: 16.08 }, { x: 44.47, y: 18.54 }, { x: 45.33, y: 17.57 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 18.41, y: 29.75 }, { x: 24.39, y: 23.03 }, { x: 23.42, y: 22.16 }, { x: 18.3, y: 27.92 }, { x: 15.53, y: 25.46 }, { x: 14.67, y: 26.43 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 48.87, y: 26.87 }, { x: 48.87, y: 35.87 }, { x: 50.17, y: 35.87 }, { x: 50.17, y: 28.17 }, { x: 53.87, y: 28.17 }, { x: 53.87, y: 26.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 11.13, y: 17.13 }, { x: 11.13, y: 8.13 }, { x: 9.83, y: 8.13 }, { x: 9.83, y: 15.83 }, { x: 6.13, y: 15.83 }, { x: 6.13, y: 17.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 34.75, y: 35.95 }, { x: 40.73, y: 29.22 }, { x: 41.7, y: 30.08 }, { x: 36.58, y: 35.84 }, { x: 39.35, y: 38.3 }, { x: 38.49, y: 39.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 25.25, y: 8.05 }, { x: 19.27, y: 14.78 }, { x: 18.3, y: 13.92 }, { x: 23.42, y: 8.16 }, { x: 20.65, y: 5.7 }, { x: 21.51, y: 4.73 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_CRUCIBLE_OF_BATTLE_3 = {
    id: "wtc_crucible_of_battle_3",
    category: "WTC",
    subcategory: "Crucible of Battle",
    name: "WTC Crucible of Battle 3",
    defaultDeployment: "crucible_of_battle",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(25,7), B=(38,5) diagonal, A=(26.8,1.4), C=(36.2,10.6)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 24.96, y: 7.11 },
                { x: 36.16, y: 10.71 },
                { x: 38, y: 5 },
                { x: 26.8, y: 1.4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 35.04, y: 36.89 },
                { x: 23.84, y: 33.29 },
                { x: 22, y: 39 },
                { x: 33.2, y: 42.6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(46,0), C=(49,13) diagonal, B=(53.6,9.2), D=(41.4,3.8)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 41.4, y: 3.8 },
                { x: 49, y: 13 },
                { x: 53.6, y: 9.2 },
                { x: 46, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 18.6, y: 40.2 },
                { x: 11, y: 31 },
                { x: 6.4, y: 34.8 },
                { x: 14, y: 44 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: B=(51,15), D=(48,28) diagonal, A=(43.4,24.2), C=(55.6,18.8)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 48, y: 28 },
                { x: 55.6, y: 18.8 },
                { x: 51, y: 15 },
                { x: 43.4, y: 24.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 12, y: 16 },
                { x: 4.4, y: 25.2 },
                { x: 9, y: 29 },
                { x: 16.6, y: 19.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: B=(46,44), D=(49,31) diagonal, A=(53.6,34.8), C=(41.4,40.2)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 49, y: 31 },
                { x: 41.4, y: 40.2 },
                { x: 46, y: 44 },
                { x: 53.6, y: 34.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 11, y: 13 },
                { x: 18.6, y: 3.8 },
                { x: 14, y: 0 },
                { x: 6.4, y: 9.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: B=(37,31), D=(35,19) diagonal, A=(40.2,20.6), C=(31.8,29.4)
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 18.84 },
                { x: 30.8, y: 29.24 },
                { x: 36.53, y: 31 },
                { x: 39.73, y: 20.6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 25.16 },
                { x: 29.2, y: 14.76 },
                { x: 23.47, y: 13 },
                { x: 20.27, y: 23.4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): C=(39,17), D=(34,17), B=(39,14.5), A=(34,14.5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 17 },
                { x: 39, y: 17 },
                { x: 39, y: 14.5 },
                { x: 34, y: 14.5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 27 },
                { x: 21, y: 27 },
                { x: 21, y: 29.5 },
                { x: 26, y: 29.5 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 35.6, y: 9.62 }, { x: 27.03, y: 6.86 }, { x: 27.43, y: 5.62 }, { x: 34.76, y: 7.98 }, { x: 35.89, y: 4.46 }, { x: 37.13, y: 4.86 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 24.4, y: 34.38 }, { x: 32.97, y: 37.14 }, { x: 32.57, y: 38.38 }, { x: 25.24, y: 36.02 }, { x: 24.11, y: 39.54 }, { x: 22.87, y: 39.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 49.12, y: 11.78 }, { x: 43.38, y: 4.84 }, { x: 44.39, y: 4.01 }, { x: 49.29, y: 9.94 }, { x: 52.14, y: 7.59 }, { x: 52.97, y: 8.59 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 10.88, y: 32.22 }, { x: 16.62, y: 39.16 }, { x: 15.61, y: 39.99 }, { x: 10.71, y: 34.06 }, { x: 7.86, y: 36.41 }, { x: 7.03, y: 35.41 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 44.62, y: 24.08 }, { x: 50.36, y: 17.14 }, { x: 51.36, y: 17.97 }, { x: 46.46, y: 23.91 }, { x: 49.31, y: 26.27 }, { x: 48.48, y: 27.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 15.38, y: 19.92 }, { x: 9.64, y: 26.86 }, { x: 8.64, y: 26.03 }, { x: 13.54, y: 20.09 }, { x: 10.69, y: 17.73 }, { x: 11.52, y: 16.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 49.12, y: 32.22 }, { x: 43.38, y: 39.16 }, { x: 44.39, y: 39.99 }, { x: 49.29, y: 34.06 }, { x: 52.14, y: 36.41 }, { x: 52.97, y: 35.41 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 10.88, y: 11.78 }, { x: 16.62, y: 4.84 }, { x: 15.61, y: 4.01 }, { x: 10.71, y: 9.94 }, { x: 7.86, y: 7.59 }, { x: 7.03, y: 8.59 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 35.95, y: 29.91 }, { x: 38.6, y: 21.31 }, { x: 37.36, y: 20.93 }, { x: 35.09, y: 28.29 }, { x: 31.56, y: 27.2 }, { x: 31.18, y: 28.44 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 24.05, y: 14.09 }, { x: 21.4, y: 22.69 }, { x: 22.64, y: 23.07 }, { x: 24.91, y: 15.71 }, { x: 28.44, y: 16.8 }, { x: 28.82, y: 15.56 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_CRUCIBLE_OF_BATTLE_4_5 = {
    id: "wtc_crucible_of_battle_4_5",
    category: "WTC",
    subcategory: "Crucible of Battle",
    name: "WTC Crucible of Battle 4-5",
    defaultDeployment: "crucible_of_battle",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: B=(37,0), D=(34,13) diagonal, A=(41.6,3.8), C=(29.4,9.2)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 13 },
                { x: 29.4, y: 9.2 },
                { x: 37, y: 0 },
                { x: 41.6, y: 3.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 31 },
                { x: 30.6, y: 34.8 },
                { x: 23, y: 44 },
                { x: 18.4, y: 40.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(48,3), B=(57,11), C=(53.02,15.48), D=(44.02,7.48)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 44.02, y: 7.48 },
                { x: 53.02, y: 15.48 },
                { x: 57, y: 11 },
                { x: 48, y: 3 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 15.98, y: 36.52 },
                { x: 6.98, y: 28.52 },
                { x: 3, y: 33 },
                { x: 12, y: 41 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(38,26), C=(46,17), B=(41.52,13.02), A=(33.52,22.02)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 26 },
                { x: 46, y: 17 },
                { x: 41.52, y: 13.02 },
                { x: 33.52, y: 22.02 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 18 },
                { x: 14, y: 27 },
                { x: 18.48, y: 30.98 },
                { x: 26.48, y: 21.98 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(54,38), C=(54,26), B=(48,26), A=(48,38)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 54, y: 38 },
                { x: 54, y: 26 },
                { x: 48, y: 26 },
                { x: 48, y: 38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 6, y: 6 },
                { x: 6, y: 18 },
                { x: 12, y: 18 },
                { x: 12, y: 6 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(38,40), C=(46,31), B=(41.52,27.02), A=(33.52,36.02)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 38, y: 40 },
                { x: 46, y: 31 },
                { x: 41.52, y: 27.02 },
                { x: 33.52, y: 36.02 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22, y: 4 },
                { x: 14, y: 13 },
                { x: 18.48, y: 16.98 },
                { x: 26.48, y: 7.98 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): At A of shape 5, short side toward B, long side away
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 29.78, y: 18.70 },
                { x: 31.44, y: 16.83 },
                { x: 35.18, y: 20.15 },
                { x: 33.52, y: 22.02 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 30.22, y: 25.30 },
                { x: 28.56, y: 27.17 },
                { x: 24.82, y: 23.85 },
                { x: 26.48, y: 21.98 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 33.88, y: 11.78 }, { x: 39.62, y: 4.84 }, { x: 38.61, y: 4.01 }, { x: 33.71, y: 9.94 }, { x: 30.86, y: 7.59 }, { x: 30.03, y: 8.59 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 26.12, y: 32.22 }, { x: 20.38, y: 39.16 }, { x: 21.39, y: 39.99 }, { x: 26.29, y: 34.06 }, { x: 29.14, y: 36.41 }, { x: 29.97, y: 35.41 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 52.95, y: 14.25 }, { x: 46.22, y: 8.27 }, { x: 47.08, y: 7.3 }, { x: 52.84, y: 12.42 }, { x: 55.3, y: 9.65 }, { x: 56.27, y: 10.51 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 7.05, y: 29.75 }, { x: 13.78, y: 35.73 }, { x: 12.92, y: 36.7 }, { x: 7.16, y: 31.58 }, { x: 4.7, y: 34.35 }, { x: 3.73, y: 33.49 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 34.75, y: 21.95 }, { x: 40.73, y: 15.22 }, { x: 41.7, y: 16.08 }, { x: 36.58, y: 21.84 }, { x: 39.35, y: 24.3 }, { x: 38.49, y: 25.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 25.25, y: 22.05 }, { x: 19.27, y: 28.78 }, { x: 18.3, y: 27.92 }, { x: 23.42, y: 22.16 }, { x: 20.65, y: 19.7 }, { x: 21.51, y: 18.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 48.87, y: 26.87 }, { x: 48.87, y: 35.87 }, { x: 50.17, y: 35.87 }, { x: 50.17, y: 28.17 }, { x: 53.87, y: 28.17 }, { x: 53.87, y: 26.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 11.13, y: 17.13 }, { x: 11.13, y: 8.13 }, { x: 9.83, y: 8.13 }, { x: 9.83, y: 15.83 }, { x: 6.13, y: 15.83 }, { x: 6.13, y: 17.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 34.75, y: 35.95 }, { x: 40.73, y: 29.22 }, { x: 41.7, y: 30.08 }, { x: 36.58, y: 35.84 }, { x: 39.35, y: 38.3 }, { x: 38.49, y: 39.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 25.25, y: 8.05 }, { x: 19.27, y: 14.78 }, { x: 18.3, y: 13.92 }, { x: 23.42, y: 8.16 }, { x: 20.65, y: 5.7 }, { x: 21.51, y: 4.73 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_CRUCIBLE_OF_BATTLE_6 = {
    id: "wtc_crucible_of_battle_6",
    category: "WTC",
    subcategory: "Crucible of Battle",
    name: "WTC Crucible of Battle 6",
    defaultDeployment: "crucible_of_battle",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(34,16), B=(37,3), short steep 6x12, A=(29.33,12.23), C=(41.67,6.77)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 16 },
                { x: 41.67, y: 6.77 },
                { x: 37, y: 3 },
                { x: 29.33, y: 12.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 28 },
                { x: 18.33, y: 37.23 },
                { x: 23, y: 41 },
                { x: 30.67, y: 31.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: D=(47,15), B=(50,2), long steep flipped, A=(54.53,5.66), C=(42.47,11.34)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 47, y: 15 },
                { x: 42.33, y: 11.23 },
                { x: 50, y: 2 },
                { x: 54.67, y: 5.77 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 13, y: 29 },
                { x: 17.67, y: 32.77 },
                { x: 10, y: 42 },
                { x: 5.33, y: 38.23 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: B=(53,15), C=(58,18), long steep, A=(46.83,25.29), D=(51.83,28.29)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 51.83, y: 28.29 },
                { x: 58, y: 18 },
                { x: 53, y: 15 },
                { x: 46.69, y: 25.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8.17, y: 15.71 },
                { x: 2, y: 26 },
                { x: 7, y: 29 },
                { x: 13.31, y: 18.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: B=(40,16), C=(45,19), long steep, A=(33.83,26.29), D=(38.83,29.29)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 38.83, y: 29.29 },
                { x: 45, y: 19 },
                { x: 39.86, y: 15.91 },
                { x: 33.83, y: 26.29 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 21.17, y: 14.71 },
                { x: 15, y: 25 },
                { x: 20.14, y: 28.09 },
                { x: 26.17, y: 17.71 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(46,41), A=(40,41), vertical, B=(40,29), C=(46,29)
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 46, y: 41 },
                { x: 46, y: 29 },
                { x: 40, y: 29 },
                { x: 40, y: 41 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 14, y: 3 },
                { x: 14, y: 15 },
                { x: 20, y: 15 },
                { x: 20, y: 3 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): A=(25,3), B=(30,3), C=(30,5.5), D=(25,5.5) horizontal
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 25, y: 5.5 },
                { x: 30, y: 5.5 },
                { x: 30, y: 3 },
                { x: 25, y: 3 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 35, y: 38.5 },
                { x: 30, y: 38.5 },
                { x: 30, y: 41 },
                { x: 35, y: 41 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 30.56, y: 12.11 }, { x: 36.32, y: 5.19 }, { x: 37.31, y: 6.02 }, { x: 32.39, y: 11.94 }, { x: 35.27, y: 14.24 }, { x: 34.45, y: 15.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 29.44, y: 31.89 }, { x: 23.68, y: 38.81 }, { x: 22.69, y: 37.98 }, { x: 27.61, y: 32.06 }, { x: 24.73, y: 29.76 }, { x: 25.55, y: 28.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 43.56, y: 11.11 }, { x: 49.32, y: 4.19 }, { x: 50.31, y: 5.02 }, { x: 45.39, y: 10.94 }, { x: 48.27, y: 13.24 }, { x: 47.45, y: 14.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 16.44, y: 32.89 }, { x: 10.68, y: 39.81 }, { x: 9.69, y: 38.98 }, { x: 14.61, y: 33.06 }, { x: 11.73, y: 30.76 }, { x: 12.55, y: 29.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 47.89, y: 24.91 }, { x: 52.63, y: 17.25 }, { x: 53.73, y: 17.94 }, { x: 49.68, y: 24.49 }, { x: 52.85, y: 26.37 }, { x: 52.18, y: 27.48 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 12.11, y: 19.09 }, { x: 7.37, y: 26.75 }, { x: 6.27, y: 26.06 }, { x: 10.32, y: 19.51 }, { x: 7.15, y: 17.63 }, { x: 7.82, y: 16.52 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 40.17, y: 17.11 }, { x: 35.65, y: 24.89 }, { x: 36.77, y: 25.55 }, { x: 40.64, y: 18.89 }, { x: 43.78, y: 20.8 }, { x: 44.45, y: 19.69 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 19.83, y: 26.89 }, { x: 24.35, y: 19.11 }, { x: 23.23, y: 18.45 }, { x: 19.36, y: 25.11 }, { x: 16.22, y: 23.2 }, { x: 15.55, y: 24.31 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 40.87, y: 29.87 }, { x: 40.87, y: 38.87 }, { x: 42.17, y: 38.87 }, { x: 42.17, y: 31.17 }, { x: 45.87, y: 31.17 }, { x: 45.87, y: 29.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 19.13, y: 14.13 }, { x: 19.13, y: 5.13 }, { x: 17.83, y: 5.13 }, { x: 17.83, y: 12.83 }, { x: 14.13, y: 12.83 }, { x: 14.13, y: 14.13 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_CRUCIBLE_OF_BATTLE_7 = {
    id: "wtc_crucible_of_battle_7",
    category: "WTC",
    subcategory: "Crucible of Battle",
    name: "WTC Crucible of Battle 7",
    defaultDeployment: "crucible_of_battle",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(24,7.5), A=(26,2), B=(37,6), C=(35,11.5)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 23.95, y: 7.64 },
                { x: 34.95, y: 11.64 },
                { x: 37, y: 6 },
                { x: 26, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 36.05, y: 36.36 },
                { x: 25.05, y: 32.36 },
                { x: 23, y: 38 },
                { x: 34, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(46,0), B=(54,8.5), C=(49.63,12.61), D=(41.63,4.11)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 41.63, y: 4.11 },
                { x: 49.63, y: 12.61 },
                { x: 54, y: 8.5 },
                { x: 46, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 18.37, y: 39.89 },
                { x: 10.37, y: 31.39 },
                { x: 6, y: 35.5 },
                { x: 14, y: 44 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: D=(48,27), C=(56,18.5), B=(51.63,14.39), A=(43.63,22.89)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 48, y: 27 },
                { x: 56, y: 18.5 },
                { x: 51.63, y: 14.39 },
                { x: 43.63, y: 22.89 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 12, y: 17 },
                { x: 4, y: 25.5 },
                { x: 8.37, y: 29.61 },
                { x: 16.37, y: 21.11 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(46,44), C=(54,35.5), B=(49.63,31.39), A=(41.63,39.89)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 46, y: 44 },
                { x: 54, y: 35.5 },
                { x: 49.63, y: 31.39 },
                { x: 41.63, y: 39.89 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 14, y: 0 },
                { x: 6, y: 8.5 },
                { x: 10.37, y: 12.61 },
                { x: 18.37, y: 4.11 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(37,31), C=(40,19.5), B=(34.19,17.98), A=(31.19,29.48)
        {
            id: "shape_9",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 37, y: 31 },
                { x: 40, y: 19.5 },
                { x: 34.19, y: 17.98 },
                { x: 31.19, y: 29.48 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 23, y: 13 },
                { x: 20, y: 24.5 },
                { x: 25.81, y: 26.02 },
                { x: 28.81, y: 14.52 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): D=(33,17), C=(38,17), B=(38,19.5), A=(33,19.5)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 33, y: 17 },
                { x: 38, y: 17 },
                { x: 38, y: 14.5 },
                { x: 33, y: 14.5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 27, y: 27 },
                { x: 22, y: 27 },
                { x: 22, y: 29.5 },
                { x: 27, y: 29.5 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 34.43, y: 10.53 }, { x: 25.97, y: 7.45 }, { x: 26.42, y: 6.23 }, { x: 33.65, y: 8.86 }, { x: 34.92, y: 5.38 }, { x: 36.14, y: 5.83 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 25.57, y: 33.47 }, { x: 34.03, y: 36.55 }, { x: 33.58, y: 37.77 }, { x: 26.35, y: 35.14 }, { x: 25.08, y: 38.62 }, { x: 23.86, y: 38.17 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 49.67, y: 11.38 }, { x: 43.5, y: 4.83 }, { x: 44.45, y: 3.94 }, { x: 49.72, y: 9.54 }, { x: 52.42, y: 7.01 }, { x: 53.31, y: 7.95 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 10.33, y: 32.62 }, { x: 16.5, y: 39.17 }, { x: 15.55, y: 40.06 }, { x: 10.28, y: 34.46 }, { x: 7.58, y: 36.99 }, { x: 6.69, y: 36.05 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 44.86, y: 22.85 }, { x: 51.03, y: 16.3 }, { x: 51.97, y: 17.19 }, { x: 46.7, y: 22.8 }, { x: 49.39, y: 25.33 }, { x: 48.5, y: 26.28 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 15.14, y: 21.15 }, { x: 8.97, y: 27.7 }, { x: 8.03, y: 26.81 }, { x: 13.3, y: 21.2 }, { x: 10.61, y: 18.67 }, { x: 11.5, y: 17.72 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 42.86, y: 39.85 }, { x: 49.03, y: 33.3 }, { x: 49.97, y: 34.19 }, { x: 44.7, y: 39.8 }, { x: 47.39, y: 42.33 }, { x: 46.5, y: 43.28 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 17.14, y: 4.15 }, { x: 10.97, y: 10.7 }, { x: 10.03, y: 9.81 }, { x: 15.3, y: 4.2 }, { x: 12.61, y: 1.67 }, { x: 13.5, y: 0.72 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 36.38, y: 29.94 }, { x: 38.65, y: 21.23 }, { x: 37.39, y: 20.9 }, { x: 35.45, y: 28.35 }, { x: 31.87, y: 27.41 }, { x: 31.54, y: 28.67 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 23.62, y: 14.06 }, { x: 21.35, y: 22.77 }, { x: 22.61, y: 23.1 }, { x: 24.55, y: 15.65 }, { x: 28.13, y: 16.59 }, { x: 28.46, y: 15.33 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_CRUCIBLE_OF_BATTLE_8 = {
    id: "wtc_crucible_of_battle_8",
    category: "WTC",
    subcategory: "Crucible of Battle",
    name: "WTC Crucible of Battle 8",
    defaultDeployment: "crucible_of_battle",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(32.5,11), B=(43,3), short steep 6x12, A=(31.43,5.09), C=(44.07,8.91)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 32.5, y: 11 },
                { x: 44.07, y: 8.91 },
                { x: 43, y: 3 },
                { x: 31.43, y: 5.09 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 27.5, y: 33 },
                { x: 15.93, y: 35.09 },
                { x: 17, y: 41 },
                { x: 28.57, y: 38.91 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(50,2), C=(51,15), long steep, B=(44.73,4.79), D=(56.27,12.21)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 51.08, y: 15.18 },
                { x: 56.2, y: 12.04 },
                { x: 49.92, y: 1.82 },
                { x: 44.8, y: 4.96 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8.92, y: 28.82 },
                { x: 3.8, y: 31.96 },
                { x: 10.08, y: 42.18 },
                { x: 15.2, y: 39.04 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(47,24), C=(60,22), long steep 6x12 flipped, B=(56.79,17.39), D=(50.21,28.61)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 45.85, y: 23.83 },
                { x: 55.79, y: 17.11 },
                { x: 59.15, y: 22.09 },
                { x: 49.21, y: 28.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 14.15, y: 20.17 },
                { x: 4.21, y: 26.89 },
                { x: 0.85, y: 21.91 },
                { x: 10.79, y: 15.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: B=(40,29), D=(38,42), long steep flipped, A=(44.55,31.93), C=(33.45,39.07)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 33.21, y: 38.89 },
                { x: 38.24, y: 42.17 },
                { x: 44.79, y: 32.11 },
                { x: 39.76, y: 28.83 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 26.79, y: 5.11 },
                { x: 21.76, y: 1.83 },
                { x: 15.21, y: 11.89 },
                { x: 20.24, y: 15.17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: B=(41,13), C=(45.5,17), long steep, A=(33.02,21.96), D=(37.52,25.96)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 37.52, y: 25.96 },
                { x: 45.5, y: 17 },
                { x: 41, y: 13 },
                { x: 33.02, y: 21.96 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 22.48, y: 18.04 },
                { x: 14.5, y: 27 },
                { x: 19, y: 31 },
                { x: 26.98, y: 22.04 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): C=Shape9.A=(33.02,21.96), 2.5" along A→B, 5" toward top-left
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 34.68, y: 20.09 },
                { x: 33.02, y: 21.96 },
                { x: 29.28, y: 18.63 },
                { x: 30.94, y: 16.76 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 25.32, y: 23.91 },
                { x: 26.98, y: 22.04 },
                { x: 30.72, y: 25.37 },
                { x: 29.06, y: 27.24 }
            ],
            traits: ["Obscuring"]
        },
        // L-walls (blue: left-handed, red: right-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 32.44, y: 5.79 }, { x: 41.3, y: 4.19 }, { x: 41.53, y: 5.47 }, { x: 33.95, y: 6.84 }, { x: 34.61, y: 10.48 }, { x: 33.33, y: 10.71 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 27.56, y: 38.21 }, { x: 18.7, y: 39.81 }, { x: 18.47, y: 38.53 }, { x: 26.05, y: 37.16 }, { x: 25.39, y: 33.52 }, { x: 26.67, y: 33.29 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 51.37, y: 13.98 }, { x: 46.65, y: 6.32 }, { x: 47.76, y: 5.64 }, { x: 51.79, y: 12.2 }, { x: 54.95, y: 10.26 }, { x: 55.63, y: 11.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 8.63, y: 30.02 }, { x: 13.35, y: 37.68 }, { x: 12.24, y: 38.36 }, { x: 8.21, y: 31.8 }, { x: 5.05, y: 33.74 }, { x: 4.37, y: 32.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 47.06, y: 24.06 }, { x: 54.51, y: 19.02 }, { x: 55.24, y: 20.1 }, { x: 48.86, y: 24.41 }, { x: 50.94, y: 27.48 }, { x: 49.86, y: 28.21 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 12.94, y: 19.94 }, { x: 5.49, y: 24.98 }, { x: 4.76, y: 23.9 }, { x: 11.14, y: 19.59 }, { x: 9.06, y: 16.52 }, { x: 10.14, y: 15.79 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 40.01, y: 30.03 }, { x: 35.1, y: 37.58 }, { x: 36.19, y: 38.29 }, { x: 40.39, y: 31.83 }, { x: 43.49, y: 33.85 }, { x: 44.2, y: 32.77 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 19.99, y: 13.97 }, { x: 24.9, y: 6.42 }, { x: 23.81, y: 5.71 }, { x: 19.61, y: 12.17 }, { x: 16.51, y: 10.15 }, { x: 15.8, y: 11.23 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 34.25, y: 21.89 }, { x: 40.23, y: 15.17 }, { x: 41.21, y: 16.03 }, { x: 36.08, y: 21.78 }, { x: 38.85, y: 24.24 }, { x: 37.99, y: 25.21 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 25.75, y: 22.11 }, { x: 19.77, y: 28.83 }, { x: 18.79, y: 27.97 }, { x: 23.92, y: 22.22 }, { x: 21.15, y: 19.76 }, { x: 22.01, y: 18.79 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

// Hammer and Anvil - Hidden Supplies (7 layouts: 1, 2, 3, 4-5, 6, 7, 8)
const WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_1 = {
    id: "wtc_hammer_and_anvil_hidden_supplies_1",
    category: "WTC",
    subcategory: "Hammer and Anvil - Hidden Supplies",
    name: "WTC Hammer and Anvil HS 1",
    defaultDeployment: "wtc_hidden_supplies",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Blue ruin footprints
        { id: "shape_1", type: "blue_solid", shape: "polygon", points: [{ x: 26, y: 13 }, { x: 38, y: 13 }, { x: 38, y: 7 }, { x: 26, y: 7 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "blue_solid", shape: "polygon", points: [{ x: 34, y: 37 }, { x: 22, y: 37 }, { x: 22, y: 31 }, { x: 34, y: 31 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "blue_solid", shape: "polygon", points: [{ x: 42, y: 9 }, { x: 52, y: 15 }, { x: 55, y: 10 }, { x: 45, y: 4 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "blue_solid", shape: "polygon", points: [{ x: 18, y: 35 }, { x: 8, y: 29 }, { x: 5, y: 34 }, { x: 15, y: 40 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 45, y: 41 }, { x: 39, y: 41 }, { x: 39, y: 29 }, { x: 45, y: 29 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 15, y: 3 }, { x: 21, y: 3 }, { x: 21, y: 15 }, { x: 15, y: 15 }], traits: ["Defensible", "Obscuring"] },
        // Red ruin footprints
        { id: "shape_5", type: "red_solid", shape: "polygon", points: [{ x: 36, y: 26 }, { x: 44, y: 20 }, { x: 40.4, y: 15.2 }, { x: 32.4, y: 21.2 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "red_solid", shape: "polygon", points: [{ x: 24, y: 18 }, { x: 16, y: 24 }, { x: 19.6, y: 28.8 }, { x: 27.6, y: 22.8 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "red_solid", shape: "polygon", points: [{ x: 54, y: 30 }, { x: 58, y: 19 }, { x: 52.36, y: 16.95 }, { x: 48.36, y: 27.95 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "red_solid", shape: "polygon", points: [{ x: 6, y: 14 }, { x: 2, y: 25 }, { x: 7.64, y: 27.05 }, { x: 11.64, y: 16.05 }], traits: ["Defensible", "Obscuring"] },
        // L-shaped ruin walls (1.3" thick, 9"x5" ruin, corner inset 0.87" from nearest base edges)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 26.87, y: 12.13 }, { x: 35.87, y: 12.13 }, { x: 35.87, y: 10.83 }, { x: 28.17, y: 10.83 }, { x: 28.17, y: 7.13 }, { x: 26.87, y: 7.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 33.13, y: 31.87 }, { x: 24.13, y: 31.87 }, { x: 24.13, y: 33.17 }, { x: 31.83, y: 33.17 }, { x: 31.83, y: 36.87 }, { x: 33.13, y: 36.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 43.19, y: 8.70 }, { x: 50.91, y: 13.34 }, { x: 51.58, y: 12.22 }, { x: 44.98, y: 8.26 }, { x: 46.88, y: 5.09 }, { x: 45.77, y: 4.42 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 16.81, y: 35.30 }, { x: 9.09, y: 30.66 }, { x: 8.42, y: 31.78 }, { x: 15.02, y: 35.74 }, { x: 13.12, y: 38.91 }, { x: 14.23, y: 39.58 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 33.62, y: 21.37 }, { x: 40.82, y: 15.97 }, { x: 41.6, y: 17.01 }, { x: 35.44, y: 21.63 }, { x: 37.66, y: 24.59 }, { x: 36.62, y: 25.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 26.38, y: 22.63 }, { x: 19.18, y: 28.03 }, { x: 18.4, y: 26.99 }, { x: 24.56, y: 22.37 }, { x: 22.34, y: 19.41 }, { x: 23.38, y: 18.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 39.87, y: 29.87 }, { x: 44.87, y: 29.87 }, { x: 44.87, y: 31.17 }, { x: 41.17, y: 31.17 }, { x: 41.17, y: 38.87 }, { x: 39.87, y: 38.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 20.13, y: 14.13 }, { x: 15.13, y: 14.13 }, { x: 15.13, y: 12.83 }, { x: 18.83, y: 12.83 }, { x: 18.83, y: 5.13 }, { x: 20.13, y: 5.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 49.48, y: 27.43 }, { x: 52.55, y: 18.97 }, { x: 53.78, y: 19.42 }, { x: 51.14, y: 26.65 }, { x: 54.62, y: 27.92 }, { x: 54.18, y: 29.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 10.52, y: 16.57 }, { x: 7.45, y: 25.03 }, { x: 6.22, y: 24.58 }, { x: 8.86, y: 17.35 }, { x: 5.38, y: 16.08 }, { x: 5.82, y: 14.86 }], traits: ["Defensible", "Obscuring"] },
        // Armoured containers (grey solid, block LOS)
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 33, y: 0 }, { x: 35.5, y: 0 }, { x: 35.5, y: 5 }, { x: 33, y: 5 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 27, y: 44 }, { x: 24.5, y: 44 }, { x: 24.5, y: 39 }, { x: 27, y: 39 }], traits: ["Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_2 = {
    id: "wtc_hammer_and_anvil_hidden_supplies_2",
    category: "WTC",
    subcategory: "Hammer and Anvil - Hidden Supplies",
    name: "WTC Hammer and Anvil HS 2",
    defaultDeployment: "wtc_hidden_supplies",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Blue ruin footprints (L at closest corner to center = ┌)
        { id: "shape_1", type: "blue_solid", shape: "polygon", points: [{ x: 32.72, y: 16.83 }, { x: 43, y: 23 }, { x: 46, y: 18 }, { x: 35.72, y: 11.83 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "blue_solid", shape: "polygon", points: [{ x: 27.28, y: 27.17 }, { x: 17, y: 21 }, { x: 14, y: 26 }, { x: 24.28, y: 32.17 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "blue_solid", shape: "polygon", points: [{ x: 43.86, y: 7.09 }, { x: 49.86, y: 17.09 }, { x: 55, y: 14 }, { x: 49, y: 4 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "blue_solid", shape: "polygon", points: [{ x: 16.14, y: 36.91 }, { x: 10.14, y: 26.91 }, { x: 5, y: 30 }, { x: 11, y: 40 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 36, y: 27 }, { x: 36, y: 39 }, { x: 42, y: 39 }, { x: 42, y: 27 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 24, y: 17 }, { x: 24, y: 5 }, { x: 18, y: 5 }, { x: 18, y: 17 }], traits: ["Defensible", "Obscuring"] },
        // Red ruin footprints (L at 2nd closest corner to center = ┐)
        { id: "shape_3", type: "red_solid", shape: "polygon", points: [{ x: 32.72, y: 16.83 }, { x: 38.5, y: 7 }, { x: 33.33, y: 3.96 }, { x: 27.55, y: 13.79 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "red_solid", shape: "polygon", points: [{ x: 27.28, y: 27.17 }, { x: 21.5, y: 37 }, { x: 26.67, y: 40.04 }, { x: 32.45, y: 30.21 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "red_solid", shape: "polygon", points: [{ x: 51, y: 21 }, { x: 51, y: 33 }, { x: 57, y: 33 }, { x: 57, y: 21 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "red_solid", shape: "polygon", points: [{ x: 9, y: 23 }, { x: 9, y: 11 }, { x: 3, y: 11 }, { x: 3, y: 23 }], traits: ["Defensible", "Obscuring"] },
        // Blue L-walls (┌ at closest corner to center)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 33.91, y: 16.53 }, { x: 41.63, y: 21.17 }, { x: 42.3, y: 20.05 }, { x: 35.7, y: 16.09 }, { x: 37.6, y: 12.92 }, { x: 36.49, y: 12.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 26.09, y: 27.47 }, { x: 18.37, y: 22.83 }, { x: 17.7, y: 23.95 }, { x: 24.3, y: 27.91 }, { x: 22.4, y: 31.08 }, { x: 23.51, y: 31.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 45.05, y: 7.39 }, { x: 49.69, y: 15.10 }, { x: 50.8, y: 14.43 }, { x: 46.84, y: 7.83 }, { x: 50.01, y: 5.93 }, { x: 49.34, y: 4.81 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 14.95, y: 36.61 }, { x: 10.31, y: 28.90 }, { x: 9.2, y: 29.57 }, { x: 13.16, y: 36.17 }, { x: 9.99, y: 38.07 }, { x: 10.66, y: 39.19 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 36.87, y: 27.87 }, { x: 41.87, y: 27.87 }, { x: 41.87, y: 29.17 }, { x: 38.17, y: 29.17 }, { x: 38.17, y: 36.87 }, { x: 36.87, y: 36.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 23.13, y: 16.13 }, { x: 18.13, y: 16.13 }, { x: 18.13, y: 14.83 }, { x: 21.83, y: 14.83 }, { x: 21.83, y: 7.13 }, { x: 23.13, y: 7.13 }], traits: ["Defensible", "Obscuring"] },
        // Red L-walls (┐ at 2nd closest corner to center)
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 28.74, y: 13.48 }, { x: 33.3, y: 5.72 }, { x: 34.43, y: 6.38 }, { x: 30.52, y: 13.02 }, { x: 33.71, y: 14.90 }, { x: 33.05, y: 16.02 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 31.26, y: 30.52 }, { x: 26.7, y: 38.28 }, { x: 25.57, y: 37.62 }, { x: 29.48, y: 30.98 }, { x: 26.29, y: 29.10 }, { x: 26.95, y: 27.98 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 51.87, y: 32.13 }, { x: 51.87, y: 23.13 }, { x: 53.17, y: 23.13 }, { x: 53.17, y: 30.83 }, { x: 56.87, y: 30.83 }, { x: 56.87, y: 32.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 8.13, y: 11.87 }, { x: 8.13, y: 20.87 }, { x: 6.83, y: 20.87 }, { x: 6.83, y: 13.17 }, { x: 3.13, y: 13.17 }, { x: 3.13, y: 11.87 }], traits: ["Defensible", "Obscuring"] },
        // Armoured containers (grey solid, block LOS)
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 47.76, y: 40.47 }, { x: 50, y: 36 }, { x: 48, y: 35 }, { x: 45.76, y: 39.47 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 12.24, y: 3.53 }, { x: 10, y: 8 }, { x: 12, y: 9 }, { x: 14.24, y: 4.53 }], traits: ["Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_3 = {
    id: "wtc_hammer_and_anvil_hidden_supplies_3",
    category: "WTC",
    subcategory: "Hammer and Anvil - Hidden Supplies", 
    name: "WTC Hammer and Anvil HS 3",
    defaultDeployment: "wtc_hidden_supplies",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Blue ruin footprints (L at closest corner to center = ┌)
        { id: "shape_1", type: "blue_solid", shape: "polygon", points: [{ x: 5, y: 40 }, { x: 17, y: 40 }, { x: 17, y: 34 }, { x: 5, y: 34 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "blue_solid", shape: "polygon", points: [{ x: 55, y: 4 }, { x: 43, y: 4 }, { x: 43, y: 10 }, { x: 55, y: 10 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "blue_solid", shape: "polygon", points: [{ x: 13.46, y: 1.08 }, { x: 18, y: 5 }, { x: 10.16, y: 14.08 }, { x: 5.61, y: 10.16 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "blue_solid", shape: "polygon", points: [{ x: 46.54, y: 42.92 }, { x: 42, y: 39 }, { x: 49.84, y: 29.92 }, { x: 54.39, y: 33.84 }], traits: ["Defensible", "Obscuring"] },
        // Red ruin footprints (L at 2nd closest corner to center = ┐)
        { id: "shape_3", type: "red_solid", shape: "polygon", points: [{ x: 25.64, y: 43.05 }, { x: 29.64, y: 32.05 }, { x: 24, y: 30 }, { x: 20, y: 41 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "red_solid", shape: "polygon", points: [{ x: 34.36, y: 0.95 }, { x: 30.36, y: 11.95 }, { x: 36, y: 14 }, { x: 40, y: 3 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "red_solid", shape: "polygon", points: [{ x: 22.99, y: 12.81 }, { x: 18.46, y: 23.93 }, { x: 24.01, y: 26.19 }, { x: 28.54, y: 15.07 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "red_solid", shape: "polygon", points: [{ x: 37.01, y: 31.19 }, { x: 41.54, y: 20.07 }, { x: 35.99, y: 17.81 }, { x: 31.46, y: 28.93 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "red_solid", shape: "polygon", points: [{ x: 13, y: 17 }, { x: 7, y: 27 }, { x: 12, y: 30 }, { x: 18, y: 20 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "red_solid", shape: "polygon", points: [{ x: 47, y: 27 }, { x: 53, y: 17 }, { x: 48, y: 14 }, { x: 42, y: 24 }], traits: ["Defensible", "Obscuring"] },
        // Blue L-walls (┌ at closest corner to center)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 16.13, y: 34.87 }, { x: 7.13, y: 34.87 }, { x: 7.13, y: 36.17 }, { x: 14.83, y: 36.17 }, { x: 14.83, y: 39.87 }, { x: 16.13, y: 39.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 43.87, y: 9.13 }, { x: 52.87, y: 9.13 }, { x: 52.87, y: 7.83 }, { x: 45.17, y: 7.83 }, { x: 45.17, y: 4.13 }, { x: 43.87, y: 4.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 10.07, y: 12.85 }, { x: 15.96, y: 6.04 }, { x: 14.98, y: 5.19 }, { x: 9.94, y: 11.02 }, { x: 7.13, y: 8.60 }, { x: 6.28, y: 9.59 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 49.93, y: 31.15 }, { x: 44.04, y: 37.96 }, { x: 45.02, y: 38.81 }, { x: 50.06, y: 32.98 }, { x: 52.87, y: 35.40 }, { x: 53.72, y: 34.41 }], traits: ["Defensible", "Obscuring"] },
        // Red L-walls (┐ at 2nd closest corner to center)
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 28.52, y: 32.57 }, { x: 25.44, y: 41.03 }, { x: 24.22, y: 40.59 }, { x: 26.85, y: 33.35 }, { x: 23.38, y: 32.08 }, { x: 23.82, y: 30.86 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 31.48, y: 11.43 }, { x: 34.56, y: 2.97 }, { x: 35.78, y: 3.41 }, { x: 33.15, y: 10.65 }, { x: 36.62, y: 11.92 }, { x: 36.18, y: 13.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 27.41, y: 15.54 }, { x: 24.01, y: 23.89 }, { x: 22.81, y: 23.40 }, { x: 25.72, y: 16.25 }, { x: 22.29, y: 14.86 }, { x: 22.78, y: 13.66 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 32.59, y: 28.46 }, { x: 35.99, y: 20.11 }, { x: 37.19, y: 20.60 }, { x: 34.28, y: 27.75 }, { x: 37.71, y: 29.14 }, { x: 37.22, y: 30.34 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 16.81, y: 20.30 }, { x: 12.18, y: 28.01 }, { x: 11.07, y: 27.34 }, { x: 15.03, y: 20.74 }, { x: 11.86, y: 18.83 }, { x: 12.52, y: 17.72 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 43.19, y: 23.70 }, { x: 47.82, y: 15.99 }, { x: 48.93, y: 16.66 }, { x: 44.97, y: 23.26 }, { x: 48.14, y: 25.17 }, { x: 47.48, y: 26.28 }], traits: ["Defensible", "Obscuring"] },
        // Armoured containers (grey solid, block LOS)
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 22.76, y: 7.47 }, { x: 25, y: 3 }, { x: 23, y: 2 }, { x: 20.76, y: 6.47 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 37.24, y: 36.53 }, { x: 35, y: 41 }, { x: 37, y: 42 }, { x: 39.24, y: 37.53 }], traits: ["Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

const WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_4_5 = {
    id: "wtc_hammer_and_anvil_hidden_supplies_4_5",
    category: "WTC",
    subcategory: "Hammer and Anvil - Hidden Supplies",
    name: "WTC Hammer and Anvil HS 4-5",
    defaultDeployment: "wtc_hidden_supplies",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(7,30), B=(18,35), C=(15.52,40.46), D=(4.52,35.46)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 4.52, y: 35.46 },
                { x: 15.52, y: 40.46 },
                { x: 18, y: 35 },
                { x: 7, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 55.48, y: 8.54 },
                { x: 44.48, y: 3.54 },
                { x: 42, y: 9 },
                { x: 53, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(2,25), B=(6,14), C=(11.64,16.05), D=(7.64,27.05)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 7.64, y: 27.05 },
                { x: 11.64, y: 16.05 },
                { x: 6, y: 14 },
                { x: 2, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52.36, y: 16.95 },
                { x: 48.36, y: 27.95 },
                { x: 54, y: 30 },
                { x: 58, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(15,14), B=(15,2), C=(21,2), D=(21,14)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 21, y: 14 },
                { x: 21, y: 2 },
                { x: 15, y: 2 },
                { x: 15, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 39, y: 30 },
                { x: 39, y: 42 },
                { x: 45, y: 42 },
                { x: 45, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(16.90,28.16), C=(27.19,21.99), B=(24.10,16.84), A=(13.81,23.01) — 12x6 rectangle
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 16.9, y: 28.16 },
                { x: 27.19, y: 21.99 },
                { x: 24.1, y: 16.84 },
                { x: 13.81, y: 23.01 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y) — 12x6 rectangle
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 43.1, y: 15.84 },
                { x: 32.81, y: 22.01 },
                { x: 35.9, y: 27.16 },
                { x: 46.19, y: 20.99 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(26,11), C=(37,15), A=(28.05,5.36), B=(39.05,9.36)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 11 },
                { x: 37, y: 15 },
                { x: 39.05, y: 9.36 },
                { x: 28.05, y: 5.36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 33 },
                { x: 23, y: 29 },
                { x: 20.95, y: 34.64 },
                { x: 31.95, y: 38.64 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: A=(33,5), B=(33,0), C=(35.5,0), D=(35.5,5) - 2.5x5" (x,y swapped)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 35.5, y: 5 },
                { x: 35.5, y: 0 },
                { x: 33, y: 0 },
                { x: 33, y: 5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 24.5, y: 39 },
                { x: 24.5, y: 44 },
                { x: 27, y: 44 },
                { x: 27, y: 39 }
            ],
            traits: ["Obscuring"]
        },
        // Blue L-walls (left-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 16.85, y: 35.43 }, { x: 8.65, y: 31.71 }, { x: 8.12, y: 32.89 }, { x: 15.13, y: 36.08 }, { x: 13.6, y: 39.45 }, { x: 14.78, y: 39.98 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 43.15, y: 8.57 }, { x: 51.35, y: 12.29 }, { x: 51.88, y: 11.11 }, { x: 44.87, y: 7.92 }, { x: 46.4, y: 4.55 }, { x: 45.22, y: 4.02 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 20.13, y: 13.13 }, { x: 20.13, y: 4.13 }, { x: 18.83, y: 4.13 }, { x: 18.83, y: 11.83 }, { x: 15.13, y: 11.83 }, { x: 15.13, y: 13.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 39.87, y: 30.87 }, { x: 39.87, y: 39.87 }, { x: 41.17, y: 39.87 }, { x: 41.17, y: 32.17 }, { x: 44.87, y: 32.17 }, { x: 44.87, y: 30.87 }], traits: ["Defensible", "Obscuring"] },
        // Red L-walls (right-handed)
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 10.53, y: 16.57 }, { x: 7.45, y: 25.03 }, { x: 6.23, y: 24.58 }, { x: 8.86, y: 17.35 }, { x: 5.38, y: 16.08 }, { x: 5.83, y: 14.86 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 49.47, y: 27.43 }, { x: 52.55, y: 18.97 }, { x: 53.77, y: 19.42 }, { x: 51.14, y: 26.65 }, { x: 54.62, y: 27.92 }, { x: 54.17, y: 29.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 26.0, y: 21.69 }, { x: 18.28, y: 26.32 }, { x: 17.61, y: 25.2 }, { x: 24.21, y: 21.25 }, { x: 22.31, y: 18.07 }, { x: 23.42, y: 17.4 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 34.0, y: 22.31 }, { x: 41.72, y: 17.68 }, { x: 42.39, y: 18.8 }, { x: 35.79, y: 22.75 }, { x: 37.69, y: 25.93 }, { x: 36.58, y: 26.6 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 36.48, y: 13.89 }, { x: 28.02, y: 10.81 }, { x: 28.47, y: 9.59 }, { x: 35.7, y: 12.22 }, { x: 36.97, y: 8.74 }, { x: 38.19, y: 9.19 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 23.52, y: 30.11 }, { x: 31.98, y: 33.19 }, { x: 31.53, y: 34.41 }, { x: 24.3, y: 31.78 }, { x: 23.03, y: 35.26 }, { x: 21.81, y: 34.81 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_6 = {
    id: "wtc_hammer_and_anvil_hidden_supplies_6",
    category: "WTC",
    subcategory: "Hammer and Anvil - Hidden Supplies",
    name: "WTC Hammer and Anvil HS 6",
    defaultDeployment: "wtc_hidden_supplies",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(33,15), B=(31,2) diagonal, C=(36.6,3.8), A=(27.4,13.2)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 33, y: 15 },
                { x: 36.6, y: 3.8 },
                { x: 31, y: 2 },
                { x: 27.4, y: 13.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 27, y: 29 },
                { x: 23.4, y: 40.2 },
                { x: 29, y: 42 },
                { x: 32.6, y: 30.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(42,12), C=(42,25) diagonal, B=(47.2,22.4), D=(36.8,14.6)
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 36.8, y: 14.6 },
                { x: 42, y: 25 },
                { x: 47.37, y: 22.32 },
                { x: 42.17, y: 11.92 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 23.2, y: 29.4 },
                { x: 18, y: 19 },
                { x: 12.63, y: 21.68 },
                { x: 17.83, y: 32.08 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(47,13), C=(58,6) diagonal, B=(53,3), D=(52,16)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 16 },
                { x: 58, y: 6 },
                { x: 53, y: 3 },
                { x: 47, y: 13 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 28 },
                { x: 2, y: 38 },
                { x: 7, y: 41 },
                { x: 13, y: 31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(52,33), B=(53,20) diagonal, C=(58,23), A=(47,30)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 33 },
                { x: 58, y: 23 },
                { x: 53, y: 20 },
                { x: 47, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 11 },
                { x: 2, y: 21 },
                { x: 7, y: 24 },
                { x: 13, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(42,40), A=(36,40), C=(42,28), B=(36,28)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 42, y: 40 },
                { x: 42, y: 28 },
                { x: 36, y: 28 },
                { x: 36, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 18, y: 4 },
                { x: 18, y: 16 },
                { x: 24, y: 16 },
                { x: 24, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): D=(35,26), C=(35,21), B=(32.5,21), A=(32.5,26)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 35, y: 26 },
                { x: 35, y: 21 },
                { x: 32.5, y: 21 },
                { x: 32.5, y: 26 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 25, y: 18 },
                { x: 25, y: 23 },
                { x: 27.5, y: 23 },
                { x: 27.5, y: 18 }
            ],
            traits: ["Obscuring"]
        },
        // L-shaped ruin walls
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 31.56, y: 3.09 }, { x: 28.81, y: 11.66 }, { x: 30.05, y: 12.06 }, { x: 32.4, y: 4.73 }, { x: 35.92, y: 5.86 }, { x: 36.32, y: 4.62 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 28.44, y: 40.91 }, { x: 31.19, y: 32.34 }, { x: 29.95, y: 31.94 }, { x: 27.6, y: 39.27 }, { x: 24.08, y: 38.14 }, { x: 23.68, y: 39.38 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 37.97, y: 14.99 }, { x: 41.99, y: 23.04 }, { x: 43.15, y: 22.46 }, { x: 39.71, y: 15.57 }, { x: 43.02, y: 13.92 }, { x: 42.44, y: 12.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 22.03, y: 29.01 }, { x: 18.01, y: 20.96 }, { x: 16.85, y: 21.54 }, { x: 20.29, y: 28.43 }, { x: 16.98, y: 30.08 }, { x: 17.56, y: 31.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 48.19, y: 12.7 }, { x: 52.82, y: 4.98 }, { x: 53.94, y: 5.65 }, { x: 49.98, y: 12.26 }, { x: 53.15, y: 14.16 }, { x: 52.48, y: 15.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 11.81, y: 31.3 }, { x: 7.18, y: 39.02 }, { x: 6.06, y: 38.35 }, { x: 10.02, y: 31.74 }, { x: 6.85, y: 29.84 }, { x: 7.52, y: 28.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 48.19, y: 29.7 }, { x: 52.82, y: 21.98 }, { x: 53.94, y: 22.65 }, { x: 49.98, y: 29.26 }, { x: 53.15, y: 31.16 }, { x: 52.48, y: 32.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 11.81, y: 14.3 }, { x: 7.18, y: 22.02 }, { x: 6.06, y: 21.35 }, { x: 10.02, y: 14.74 }, { x: 6.85, y: 12.84 }, { x: 7.52, y: 11.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 36.87, y: 39.13 }, { x: 36.87, y: 30.13 }, { x: 38.17, y: 30.13 }, { x: 38.17, y: 37.83 }, { x: 41.87, y: 37.83 }, { x: 41.87, y: 39.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 23.13, y: 4.87 }, { x: 23.13, y: 13.87 }, { x: 21.83, y: 13.87 }, { x: 21.83, y: 6.17 }, { x: 18.13, y: 6.17 }, { x: 18.13, y: 4.87 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_7 = {
    id: "wtc_hammer_and_anvil_hidden_supplies_7",
    category: "WTC",
    subcategory: "Hammer and Anvil - Hidden Supplies",
    name: "WTC Hammer and Anvil HS 7",
    defaultDeployment: "wtc_hidden_supplies",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: C=(34,13), A=(31,0) diagonal, B=(38.6,9.2), D=(26.4,3.8)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 26.4, y: 3.8 },
                { x: 34, y: 13 },
                { x: 38.6, y: 9.2 },
                { x: 31, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 33.6, y: 40.2 },
                { x: 26, y: 31 },
                { x: 21.4, y: 34.8 },
                { x: 29, y: 44 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(48,3), B=(48,15), C=(42,15), D=(42,3)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 42, y: 3 },
                { x: 42, y: 15 },
                { x: 48, y: 15 },
                { x: 48, y: 3 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 18, y: 41 },
                { x: 18, y: 29 },
                { x: 12, y: 29 },
                { x: 12, y: 41 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(58,19), B=(54,30), C=(48.36,27.95), D=(52.36,16.95)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52.36, y: 16.95 },
                { x: 48.36, y: 27.95 },
                { x: 54, y: 30 },
                { x: 58, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 7.64, y: 27.05 },
                { x: 11.64, y: 16.05 },
                { x: 6, y: 14 },
                { x: 2, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: A=(37,16), B=(43,26), C=(37.86,29.09), D=(31.86,19.09)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 31.86, y: 19.09 },
                { x: 37.86, y: 29.09 },
                { x: 43, y: 26 },
                { x: 37, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 28.14, y: 24.91 },
                { x: 22.14, y: 14.91 },
                { x: 17, y: 18 },
                { x: 23, y: 28 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: A=(49,30), B=(45,41), C=(39.36,38.95), D=(43.36,27.95)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 43.36, y: 27.95 },
                { x: 39.36, y: 38.95 },
                { x: 45, y: 41 },
                { x: 49, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 16.64, y: 16.05 },
                { x: 20.64, y: 5.05 },
                { x: 15, y: 3 },
                { x: 11, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): A=(53,0), B=(53,5), C=(50.5,5), D=(50.5,0)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 50.5, y: 0 },
                { x: 50.5, y: 5 },
                { x: 53, y: 5 },
                { x: 53, y: 0 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 9.5, y: 44 },
                { x: 9.5, y: 39 },
                { x: 7, y: 39 },
                { x: 7, y: 44 }
            ],
            traits: ["Obscuring"]
        },
        // L-shaped ruin walls
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 34.12, y: 11.78 }, { x: 28.38, y: 4.84 }, { x: 29.39, y: 4.01 }, { x: 34.29, y: 9.94 }, { x: 37.14, y: 7.59 }, { x: 37.97, y: 8.59 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 25.88, y: 32.22 }, { x: 31.62, y: 39.16 }, { x: 30.61, y: 39.99 }, { x: 25.71, y: 34.06 }, { x: 22.86, y: 36.41 }, { x: 22.03, y: 35.41 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 42.87, y: 14.13 }, { x: 42.87, y: 5.13 }, { x: 44.17, y: 5.13 }, { x: 44.17, y: 12.83 }, { x: 47.87, y: 12.83 }, { x: 47.87, y: 14.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 17.13, y: 29.87 }, { x: 17.13, y: 38.87 }, { x: 15.83, y: 38.87 }, { x: 15.83, y: 31.17 }, { x: 12.13, y: 31.17 }, { x: 12.13, y: 29.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 49.47, y: 27.43 }, { x: 52.55, y: 18.97 }, { x: 53.77, y: 19.42 }, { x: 51.14, y: 26.65 }, { x: 54.62, y: 27.92 }, { x: 54.17, y: 29.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 10.53, y: 16.57 }, { x: 7.45, y: 25.03 }, { x: 6.23, y: 24.58 }, { x: 8.86, y: 17.35 }, { x: 5.38, y: 16.08 }, { x: 5.83, y: 14.86 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 33.05, y: 19.39 }, { x: 37.68, y: 27.11 }, { x: 38.8, y: 26.44 }, { x: 34.84, y: 19.83 }, { x: 38.01, y: 17.93 }, { x: 37.34, y: 16.81 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 26.95, y: 24.61 }, { x: 22.32, y: 16.89 }, { x: 21.2, y: 17.56 }, { x: 25.16, y: 24.17 }, { x: 21.99, y: 26.07 }, { x: 22.66, y: 27.19 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 40.47, y: 38.43 }, { x: 43.55, y: 29.97 }, { x: 44.77, y: 30.42 }, { x: 42.14, y: 37.65 }, { x: 45.62, y: 38.92 }, { x: 45.17, y: 40.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 19.53, y: 5.57 }, { x: 16.45, y: 14.03 }, { x: 15.23, y: 13.58 }, { x: 17.86, y: 6.35 }, { x: 14.38, y: 5.08 }, { x: 14.83, y: 3.86 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_8 = {
    id: "wtc_hammer_and_anvil_hidden_supplies_8",
    category: "WTC",
    subcategory: "Hammer and Anvil - Hidden Supplies",
    name: "WTC Hammer and Anvil HS 8",
    defaultDeployment: "wtc_hidden_supplies",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(15,2), C=(15,14), B=(21,14), A=(21,2)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 21, y: 2 },
                { x: 21, y: 14 },
                { x: 15, y: 14 },
                { x: 15, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 39, y: 42 },
                { x: 39, y: 30 },
                { x: 45, y: 30 },
                { x: 45, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(35,5), C=(24,12) diagonal, B=(29,15), D=(30,2)
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 2 },
                { x: 24, y: 12 },
                { x: 29, y: 15 },
                { x: 35, y: 5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 42 },
                { x: 36, y: 32 },
                { x: 31, y: 29 },
                { x: 25, y: 39 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(41,8), C=(40,21) diagonal, B=(45.4,18.8), D=(35.6,10.2)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 35.6, y: 10.2 },
                { x: 40, y: 21 },
                { x: 45.4, y: 18.8 },
                { x: 41, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 24.4, y: 33.8 },
                { x: 20, y: 23 },
                { x: 14.6, y: 25.2 },
                { x: 19, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(52,2), C=(47,13), B=(52.46,15.48), A=(57.46,4.48) - AB below DC (y increases down)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 2 },
                { x: 47, y: 13 },
                { x: 52.46, y: 15.48 },
                { x: 57.46, y: 4.48 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 42 },
                { x: 13, y: 31 },
                { x: 7.54, y: 28.52 },
                { x: 2.54, y: 39.52 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: A=(52,19), B=(47,30), C=(52.46,32.48), D=(57.46,21.48)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 57.46, y: 21.48 },
                { x: 52.46, y: 32.48 },
                { x: 47, y: 30 },
                { x: 52, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 2.54, y: 22.52 },
                { x: 7.54, y: 11.52 },
                { x: 13, y: 14 },
                { x: 8, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): B=(36,26), A=(36,21), C=(38.5,26), D=(38.5,21)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 33.5, y: 21 },
                { x: 33.5, y: 26 },
                { x: 36, y: 26 },
                { x: 36, y: 21 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26.5, y: 23 },
                { x: 26.5, y: 18 },
                { x: 24, y: 18 },
                { x: 24, y: 23 }
            ],
            traits: ["Obscuring"]
        },
        // L-shaped ruin walls
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 20.13, y: 2.87 }, { x: 20.13, y: 11.87 }, { x: 18.83, y: 11.87 }, { x: 18.83, y: 4.17 }, { x: 15.13, y: 4.17 }, { x: 15.13, y: 2.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 39.87, y: 41.13 }, { x: 39.87, y: 32.13 }, { x: 41.17, y: 32.13 }, { x: 41.17, y: 39.83 }, { x: 44.87, y: 39.83 }, { x: 44.87, y: 41.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 28.7, y: 13.81 }, { x: 33.33, y: 6.09 }, { x: 32.22, y: 5.42 }, { x: 28.26, y: 12.02 }, { x: 25.08, y: 10.12 }, { x: 24.41, y: 11.23 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 31.3, y: 30.19 }, { x: 26.67, y: 37.91 }, { x: 27.78, y: 38.58 }, { x: 31.74, y: 31.98 }, { x: 34.92, y: 33.88 }, { x: 35.59, y: 32.77 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 40.48, y: 19.87 }, { x: 37.08, y: 11.53 }, { x: 38.29, y: 11.04 }, { x: 41.19, y: 18.17 }, { x: 44.62, y: 16.78 }, { x: 45.11, y: 17.98 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 19.52, y: 24.13 }, { x: 22.92, y: 32.47 }, { x: 21.71, y: 32.96 }, { x: 18.81, y: 25.83 }, { x: 15.38, y: 27.22 }, { x: 14.89, y: 26.02 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 48.15, y: 12.57 }, { x: 51.88, y: 4.37 }, { x: 53.06, y: 4.91 }, { x: 49.87, y: 11.92 }, { x: 53.24, y: 13.45 }, { x: 52.7, y: 14.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 11.85, y: 31.43 }, { x: 8.12, y: 39.63 }, { x: 6.94, y: 39.09 }, { x: 10.13, y: 32.08 }, { x: 6.76, y: 30.55 }, { x: 7.3, y: 29.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 48.15, y: 29.57 }, { x: 51.88, y: 21.37 }, { x: 53.06, y: 21.91 }, { x: 49.87, y: 28.92 }, { x: 53.24, y: 30.45 }, { x: 52.7, y: 31.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 11.85, y: 14.43 }, { x: 8.12, y: 22.63 }, { x: 6.94, y: 22.09 }, { x: 10.13, y: 15.08 }, { x: 6.76, y: 13.55 }, { x: 7.3, y: 12.36 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

// Hammer and Anvil (7 layouts: 1, 2, 3, 4-5, 6, 7, 8)
const WTC_HAMMER_AND_ANVIL_1 = {
    id: "wtc_hammer_and_anvil_1",
    category: "WTC",
    subcategory: "Hammer and Anvil",
    name: "WTC Hammer and Anvil 1",
    defaultDeployment: "hammer_and_anvil",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Blue ruin footprints
        { id: "shape_1", type: "blue_solid", shape: "polygon", points: [{ x: 26, y: 13 }, { x: 38, y: 13 }, { x: 38, y: 7 }, { x: 26, y: 7 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "blue_solid", shape: "polygon", points: [{ x: 34, y: 37 }, { x: 22, y: 37 }, { x: 22, y: 31 }, { x: 34, y: 31 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_3", type: "blue_solid", shape: "polygon", points: [{ x: 42, y: 9 }, { x: 52, y: 15 }, { x: 55, y: 10 }, { x: 45, y: 4 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "blue_solid", shape: "polygon", points: [{ x: 18, y: 35 }, { x: 8, y: 29 }, { x: 5, y: 34 }, { x: 15, y: 40 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 45, y: 41 }, { x: 39, y: 41 }, { x: 39, y: 29 }, { x: 45, y: 29 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 15, y: 3 }, { x: 21, y: 3 }, { x: 21, y: 15 }, { x: 15, y: 15 }], traits: ["Defensible", "Obscuring"] },
        // Red ruin footprints
        { id: "shape_5", type: "red_solid", shape: "polygon", points: [{ x: 36, y: 26 }, { x: 44, y: 20 }, { x: 40.4, y: 15.2 }, { x: 32.4, y: 21.2 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "red_solid", shape: "polygon", points: [{ x: 24, y: 18 }, { x: 16, y: 24 }, { x: 19.6, y: 28.8 }, { x: 27.6, y: 22.8 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "red_solid", shape: "polygon", points: [{ x: 54, y: 30 }, { x: 58, y: 19 }, { x: 52.36, y: 16.95 }, { x: 48.36, y: 27.95 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "red_solid", shape: "polygon", points: [{ x: 6, y: 14 }, { x: 2, y: 25 }, { x: 7.64, y: 27.05 }, { x: 11.64, y: 16.05 }], traits: ["Defensible", "Obscuring"] },
        // L-shaped ruin walls (1.3" thick, 9"x5" ruin, corner inset 0.87" from nearest base edges)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 26.87, y: 12.13 }, { x: 35.87, y: 12.13 }, { x: 35.87, y: 10.83 }, { x: 28.17, y: 10.83 }, { x: 28.17, y: 7.13 }, { x: 26.87, y: 7.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 33.13, y: 31.87 }, { x: 24.13, y: 31.87 }, { x: 24.13, y: 33.17 }, { x: 31.83, y: 33.17 }, { x: 31.83, y: 36.87 }, { x: 33.13, y: 36.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 43.19, y: 8.70 }, { x: 50.91, y: 13.34 }, { x: 51.58, y: 12.22 }, { x: 44.98, y: 8.26 }, { x: 46.88, y: 5.09 }, { x: 45.77, y: 4.42 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 16.81, y: 35.30 }, { x: 9.09, y: 30.66 }, { x: 8.42, y: 31.78 }, { x: 15.02, y: 35.74 }, { x: 13.12, y: 38.91 }, { x: 14.23, y: 39.58 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 33.62, y: 21.37 }, { x: 40.82, y: 15.97 }, { x: 41.60, y: 17.01 }, { x: 35.44, y: 21.63 }, { x: 37.66, y: 24.59 }, { x: 36.62, y: 25.37 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 26.38, y: 22.63 }, { x: 19.18, y: 28.03 }, { x: 18.40, y: 26.99 }, { x: 24.56, y: 22.37 }, { x: 22.34, y: 19.41 }, { x: 23.38, y: 18.63 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 39.87, y: 29.87 }, { x: 44.87, y: 29.87 }, { x: 44.87, y: 31.17 }, { x: 41.17, y: 31.17 }, { x: 41.17, y: 38.87 }, { x: 39.87, y: 38.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 20.13, y: 14.13 }, { x: 15.13, y: 14.13 }, { x: 15.13, y: 12.83 }, { x: 18.83, y: 12.83 }, { x: 18.83, y: 5.13 }, { x: 20.13, y: 5.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 49.48, y: 27.43 }, { x: 52.55, y: 18.97 }, { x: 53.78, y: 19.42 }, { x: 51.14, y: 26.65 }, { x: 54.62, y: 27.92 }, { x: 54.18, y: 29.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 10.52, y: 16.57 }, { x: 7.45, y: 25.03 }, { x: 6.22, y: 24.58 }, { x: 8.86, y: 17.35 }, { x: 5.38, y: 16.08 }, { x: 5.82, y: 14.86 }], traits: ["Defensible", "Obscuring"] },
        // Armoured containers (grey solid, block LOS)
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 33, y: 0 }, { x: 35.5, y: 0 }, { x: 35.5, y: 5 }, { x: 33, y: 5 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 27, y: 44 }, { x: 24.5, y: 44 }, { x: 24.5, y: 39 }, { x: 27, y: 39 }], traits: ["Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_2 = {
    id: "wtc_hammer_and_anvil_2",
    category: "WTC",
    subcategory: "Hammer and Anvil",
    name: "WTC Hammer and Anvil 2",
    defaultDeployment: "hammer_and_anvil",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Blue ruin footprints (L at closest corner to center = ┌)
        { id: "shape_1", type: "blue_solid", shape: "polygon", points: [{ x: 32.72, y: 16.83 }, { x: 43, y: 23 }, { x: 46, y: 18 }, { x: 35.72, y: 11.83 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "blue_solid", shape: "polygon", points: [{ x: 27.28, y: 27.17 }, { x: 17, y: 21 }, { x: 14, y: 26 }, { x: 24.28, y: 32.17 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "blue_solid", shape: "polygon", points: [{ x: 43.86, y: 7.09 }, { x: 49.86, y: 17.09 }, { x: 55, y: 14 }, { x: 49, y: 4 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "blue_solid", shape: "polygon", points: [{ x: 16.14, y: 36.91 }, { x: 10.14, y: 26.91 }, { x: 5, y: 30 }, { x: 11, y: 40 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "blue_solid", shape: "polygon", points: [{ x: 36, y: 27 }, { x: 36, y: 39 }, { x: 42, y: 39 }, { x: 42, y: 27 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "blue_solid", shape: "polygon", points: [{ x: 24, y: 17 }, { x: 24, y: 5 }, { x: 18, y: 5 }, { x: 18, y: 17 }], traits: ["Defensible", "Obscuring"] },
        // Red ruin footprints (L at adjacent corner along short edge = ┐)
        { id: "shape_3", type: "red_solid", shape: "polygon", points: [{ x: 32.72, y: 16.83 }, { x: 38.5, y: 7 }, { x: 33.33, y: 3.96 }, { x: 27.55, y: 13.79 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "red_solid", shape: "polygon", points: [{ x: 27.28, y: 27.17 }, { x: 21.5, y: 37 }, { x: 26.67, y: 40.04 }, { x: 32.45, y: 30.21 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "red_solid", shape: "polygon", points: [{ x: 51, y: 21 }, { x: 51, y: 33 }, { x: 57, y: 33 }, { x: 57, y: 21 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "red_solid", shape: "polygon", points: [{ x: 9, y: 23 }, { x: 9, y: 11 }, { x: 3, y: 11 }, { x: 3, y: 23 }], traits: ["Defensible", "Obscuring"] },
        // Blue L-walls (┌ at closest corner to center)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 33.91, y: 16.53 }, { x: 41.63, y: 21.17 }, { x: 42.30, y: 20.05 }, { x: 35.70, y: 16.09 }, { x: 37.60, y: 12.92 }, { x: 36.49, y: 12.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 26.09, y: 27.47 }, { x: 18.37, y: 22.83 }, { x: 17.70, y: 23.95 }, { x: 24.30, y: 27.91 }, { x: 22.40, y: 31.08 }, { x: 23.51, y: 31.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 45.05, y: 7.39 }, { x: 49.69, y: 15.10 }, { x: 50.80, y: 14.43 }, { x: 46.84, y: 7.83 }, { x: 50.01, y: 5.93 }, { x: 49.34, y: 4.81 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 14.95, y: 36.61 }, { x: 10.31, y: 28.90 }, { x: 9.20, y: 29.57 }, { x: 13.16, y: 36.17 }, { x: 9.99, y: 38.07 }, { x: 10.66, y: 39.19 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 36.87, y: 27.87 }, { x: 41.87, y: 27.87 }, { x: 41.87, y: 29.17 }, { x: 38.17, y: 29.17 }, { x: 38.17, y: 36.87 }, { x: 36.87, y: 36.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 23.13, y: 16.13 }, { x: 18.13, y: 16.13 }, { x: 18.13, y: 14.83 }, { x: 21.83, y: 14.83 }, { x: 21.83, y: 7.13 }, { x: 23.13, y: 7.13 }], traits: ["Defensible", "Obscuring"] },
        // Red L-walls (┐ at adjacent corner along short edge)
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 28.74, y: 13.48 }, { x: 33.30, y: 5.72 }, { x: 34.43, y: 6.38 }, { x: 30.52, y: 13.02 }, { x: 33.71, y: 14.90 }, { x: 33.05, y: 16.02 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 31.26, y: 30.52 }, { x: 26.70, y: 38.28 }, { x: 25.57, y: 37.62 }, { x: 29.48, y: 30.98 }, { x: 26.29, y: 29.10 }, { x: 26.95, y: 27.98 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 51.87, y: 32.13 }, { x: 51.87, y: 23.13 }, { x: 53.17, y: 23.13 }, { x: 53.17, y: 30.83 }, { x: 56.87, y: 30.83 }, { x: 56.87, y: 32.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 8.13, y: 11.87 }, { x: 8.13, y: 20.87 }, { x: 6.83, y: 20.87 }, { x: 6.83, y: 13.17 }, { x: 3.13, y: 13.17 }, { x: 3.13, y: 11.87 }], traits: ["Defensible", "Obscuring"] },
        // Armoured containers (grey solid, block LOS)
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 47.76, y: 40.47 }, { x: 50, y: 36 }, { x: 48, y: 35 }, { x: 45.76, y: 39.47 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 12.24, y: 3.53 }, { x: 10, y: 8 }, { x: 12, y: 9 }, { x: 14.24, y: 4.53 }], traits: ["Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_3 = {
    id: "wtc_hammer_and_anvil_3",
    category: "WTC",
    subcategory: "Hammer and Anvil",
    name: "WTC Hammer and Anvil 3",
    defaultDeployment: "hammer_and_anvil",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Blue ruin footprints (L at closest corner to center = ┌)
        { id: "shape_1", type: "blue_solid", shape: "polygon", points: [{ x: 5, y: 40 }, { x: 17, y: 40 }, { x: 17, y: 34 }, { x: 5, y: 34 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_2", type: "blue_solid", shape: "polygon", points: [{ x: 55, y: 4 }, { x: 43, y: 4 }, { x: 43, y: 10 }, { x: 55, y: 10 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_9", type: "blue_solid", shape: "polygon", points: [{ x: 13.46, y: 1.08 }, { x: 18, y: 5 }, { x: 10.16, y: 14.08 }, { x: 5.61, y: 10.16 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_10", type: "blue_solid", shape: "polygon", points: [{ x: 46.54, y: 42.92 }, { x: 42, y: 39 }, { x: 49.84, y: 29.92 }, { x: 54.39, y: 33.84 }], traits: ["Defensible", "Obscuring"] },
        // Red ruin footprints (L at 2nd closest corner to center = ┐)
        { id: "shape_3", type: "red_solid", shape: "polygon", points: [{ x: 25.64, y: 43.05 }, { x: 29.64, y: 32.05 }, { x: 24, y: 30 }, { x: 20, y: 41 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_4", type: "red_solid", shape: "polygon", points: [{ x: 34.36, y: 0.95 }, { x: 30.36, y: 11.95 }, { x: 36, y: 14 }, { x: 40, y: 3 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_5", type: "red_solid", shape: "polygon", points: [{ x: 22.99, y: 12.81 }, { x: 18.46, y: 23.93 }, { x: 24.01, y: 26.19 }, { x: 28.54, y: 15.07 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_6", type: "red_solid", shape: "polygon", points: [{ x: 37.01, y: 31.19 }, { x: 41.54, y: 20.07 }, { x: 35.99, y: 17.81 }, { x: 31.46, y: 28.93 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_7", type: "red_solid", shape: "polygon", points: [{ x: 13, y: 17 }, { x: 7, y: 27 }, { x: 12, y: 30 }, { x: 18, y: 20 }], traits: ["Defensible", "Obscuring"] },
        { id: "shape_8", type: "red_solid", shape: "polygon", points: [{ x: 47, y: 27 }, { x: 53, y: 17 }, { x: 48, y: 14 }, { x: 42, y: 24 }], traits: ["Defensible", "Obscuring"] },
        // Blue L-walls (┌ at closest corner to center)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 16.13, y: 34.87 }, { x: 7.13, y: 34.87 }, { x: 7.13, y: 36.17 }, { x: 14.83, y: 36.17 }, { x: 14.83, y: 39.87 }, { x: 16.13, y: 39.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 43.87, y: 9.13 }, { x: 52.87, y: 9.13 }, { x: 52.87, y: 7.83 }, { x: 45.17, y: 7.83 }, { x: 45.17, y: 4.13 }, { x: 43.87, y: 4.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 10.07, y: 12.85 }, { x: 15.96, y: 6.04 }, { x: 14.98, y: 5.19 }, { x: 9.94, y: 11.02 }, { x: 7.13, y: 8.60 }, { x: 6.28, y: 9.59 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 49.93, y: 31.15 }, { x: 44.04, y: 37.96 }, { x: 45.02, y: 38.81 }, { x: 50.06, y: 32.98 }, { x: 52.87, y: 35.40 }, { x: 53.72, y: 34.41 }], traits: ["Defensible", "Obscuring"] },
        // Red L-walls (┐ at 2nd closest corner to center)
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 28.52, y: 32.57 }, { x: 25.44, y: 41.03 }, { x: 24.22, y: 40.59 }, { x: 26.85, y: 33.35 }, { x: 23.38, y: 32.08 }, { x: 23.82, y: 30.86 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 31.48, y: 11.43 }, { x: 34.56, y: 2.97 }, { x: 35.78, y: 3.41 }, { x: 33.15, y: 10.65 }, { x: 36.62, y: 11.92 }, { x: 36.18, y: 13.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 27.41, y: 15.54 }, { x: 24.01, y: 23.89 }, { x: 22.81, y: 23.40 }, { x: 25.72, y: 16.25 }, { x: 22.29, y: 14.86 }, { x: 22.78, y: 13.66 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 32.59, y: 28.46 }, { x: 35.99, y: 20.11 }, { x: 37.19, y: 20.60 }, { x: 34.28, y: 27.75 }, { x: 37.71, y: 29.14 }, { x: 37.22, y: 30.34 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 16.81, y: 20.30 }, { x: 12.18, y: 28.01 }, { x: 11.07, y: 27.34 }, { x: 15.03, y: 20.74 }, { x: 11.86, y: 18.83 }, { x: 12.52, y: 17.72 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 43.19, y: 23.70 }, { x: 47.82, y: 15.99 }, { x: 48.93, y: 16.66 }, { x: 44.97, y: 23.26 }, { x: 48.14, y: 25.17 }, { x: 47.48, y: 26.28 }], traits: ["Defensible", "Obscuring"] },
        // Armoured containers (grey solid, block LOS)
        { id: "shape_11", type: "grey_solid", shape: "polygon", points: [{ x: 22.76, y: 7.47 }, { x: 25, y: 3 }, { x: 23, y: 2 }, { x: 20.76, y: 6.47 }], traits: ["Obscuring"] },
        { id: "shape_12", type: "grey_solid", shape: "polygon", points: [{ x: 37.24, y: 36.53 }, { x: 35, y: 41 }, { x: 37, y: 42 }, { x: 39.24, y: 37.53 }], traits: ["Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_4_5 = {
    id: "wtc_hammer_and_anvil_4_5",
    category: "WTC",
    subcategory: "Hammer and Anvil",
    name: "WTC Hammer and Anvil 4-5",
    defaultDeployment: "hammer_and_anvil",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: A=(7,30), B=(18,35), C=(15.52,40.46), D=(4.52,35.46)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 4.52, y: 35.46 },
                { x: 15.52, y: 40.46 },
                { x: 18, y: 35 },
                { x: 7, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 55.48, y: 8.54 },
                { x: 44.48, y: 3.54 },
                { x: 42, y: 9 },
                { x: 53, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(2,25), B=(6,14), C=(11.64,16.05), D=(7.64,27.05)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 7.64, y: 27.05 },
                { x: 11.64, y: 16.05 },
                { x: 6, y: 14 },
                { x: 2, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52.36, y: 16.95 },
                { x: 48.36, y: 27.95 },
                { x: 54, y: 30 },
                { x: 58, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(15,14), B=(15,2), C=(21,2), D=(21,14)
        {
            id: "shape_5",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 21, y: 14 },
                { x: 21, y: 2 },
                { x: 15, y: 2 },
                { x: 15, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 39, y: 30 },
                { x: 39, y: 42 },
                { x: 45, y: 42 },
                { x: 45, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(16.90,28.16), C=(27.19,21.99), B=(24.10,16.84), A=(13.81,23.01) — 12x6 rectangle
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 16.90, y: 28.16 },
                { x: 27.19, y: 21.99 },
                { x: 24.10, y: 16.84 },
                { x: 13.81, y: 23.01 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y) — 12x6 rectangle
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 43.10, y: 15.84 },
                { x: 32.81, y: 22.01 },
                { x: 35.90, y: 27.16 },
                { x: 46.19, y: 20.99 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(26,11), C=(37,15), A=(28.05,5.36), B=(39.05,9.36)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 26, y: 11 },
                { x: 37, y: 15 },
                { x: 39.05, y: 9.36 },
                { x: 28.05, y: 5.36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 34, y: 33 },
                { x: 23, y: 29 },
                { x: 20.95, y: 34.64 },
                { x: 31.95, y: 38.64 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11: A=(33,5), B=(33,0), C=(35.5,0), D=(35.5,5) - 2.5x5" (x,y swapped)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 35.5, y: 5 },
                { x: 35.5, y: 0 },
                { x: 33, y: 0 },
                { x: 33, y: 5 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 24.5, y: 39 },
                { x: 24.5, y: 44 },
                { x: 27, y: 44 },
                { x: 27, y: 39 }
            ],
            traits: ["Obscuring"]
        },
        // Blue L-walls (left-handed)
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 16.85, y: 35.43 }, { x: 8.65, y: 31.71 }, { x: 8.12, y: 32.89 }, { x: 15.13, y: 36.08 }, { x: 13.6, y: 39.45 }, { x: 14.78, y: 39.98 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 43.15, y: 8.57 }, { x: 51.35, y: 12.29 }, { x: 51.88, y: 11.11 }, { x: 44.87, y: 7.92 }, { x: 46.4, y: 4.55 }, { x: 45.22, y: 4.02 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 20.13, y: 13.13 }, { x: 20.13, y: 4.13 }, { x: 18.83, y: 4.13 }, { x: 18.83, y: 11.83 }, { x: 15.13, y: 11.83 }, { x: 15.13, y: 13.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 39.87, y: 30.87 }, { x: 39.87, y: 39.87 }, { x: 41.17, y: 39.87 }, { x: 41.17, y: 32.17 }, { x: 44.87, y: 32.17 }, { x: 44.87, y: 30.87 }], traits: ["Defensible", "Obscuring"] },
        // Red L-walls (right-handed)
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 10.53, y: 16.57 }, { x: 7.45, y: 25.03 }, { x: 6.23, y: 24.58 }, { x: 8.86, y: 17.35 }, { x: 5.38, y: 16.08 }, { x: 5.83, y: 14.86 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 49.47, y: 27.43 }, { x: 52.55, y: 18.97 }, { x: 53.77, y: 19.42 }, { x: 51.14, y: 26.65 }, { x: 54.62, y: 27.92 }, { x: 54.17, y: 29.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 26.0, y: 21.69 }, { x: 18.28, y: 26.32 }, { x: 17.61, y: 25.2 }, { x: 24.21, y: 21.25 }, { x: 22.31, y: 18.07 }, { x: 23.42, y: 17.4 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 34.0, y: 22.31 }, { x: 41.72, y: 17.68 }, { x: 42.39, y: 18.8 }, { x: 35.79, y: 22.75 }, { x: 37.69, y: 25.93 }, { x: 36.58, y: 26.6 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 36.48, y: 13.89 }, { x: 28.02, y: 10.81 }, { x: 28.47, y: 9.59 }, { x: 35.7, y: 12.22 }, { x: 36.97, y: 8.74 }, { x: 38.19, y: 9.19 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 23.52, y: 30.11 }, { x: 31.98, y: 33.19 }, { x: 31.53, y: 34.41 }, { x: 24.3, y: 31.78 }, { x: 23.03, y: 35.26 }, { x: 21.81, y: 34.81 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_6 = {
    id: "wtc_hammer_and_anvil_6",
    category: "WTC",
    subcategory: "Hammer and Anvil",
    name: "WTC Hammer and Anvil 6",
    defaultDeployment: "hammer_and_anvil",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(33,15), B=(31,2) diagonal, C=(36.6,3.8), A=(27.4,13.2)
        {
            id: "shape_1",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 33, y: 15 },
                { x: 36.6, y: 3.8 },
                { x: 31, y: 2 },
                { x: 27.4, y: 13.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 27, y: 29 },
                { x: 23.4, y: 40.2 },
                { x: 29, y: 42 },
                { x: 32.6, y: 30.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(42,12), C=(42,25) diagonal, B=(47.2,22.4), D=(36.8,14.6)
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 36.8, y: 14.6 },
                { x: 42, y: 25 },
                { x: 47.37, y: 22.32 },
                { x: 42.17, y: 11.92 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 23.2, y: 29.4 },
                { x: 18, y: 19 },
                { x: 12.63, y: 21.68 },
                { x: 17.83, y: 32.08 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(47,13), C=(58,6) diagonal, B=(53,3), D=(52,16)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 16 },
                { x: 58, y: 6 },
                { x: 53, y: 3 },
                { x: 47, y: 13 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 28 },
                { x: 2, y: 38 },
                { x: 7, y: 41 },
                { x: 13, y: 31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(52,33), B=(53,20) diagonal, C=(58,23), A=(47,30)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 33 },
                { x: 58, y: 23 },
                { x: 53, y: 20 },
                { x: 47, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 11 },
                { x: 2, y: 21 },
                { x: 7, y: 24 },
                { x: 13, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: D=(42,40), A=(36,40), C=(42,28), B=(36,28)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 42, y: 40 },
                { x: 42, y: 28 },
                { x: 36, y: 28 },
                { x: 36, y: 40 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 18, y: 4 },
                { x: 18, y: 16 },
                { x: 24, y: 16 },
                { x: 24, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): D=(35,26), C=(35,21), B=(32.5,21), A=(32.5,26)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 35, y: 26 },
                { x: 35, y: 21 },
                { x: 32.5, y: 21 },
                { x: 32.5, y: 26 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 25, y: 18 },
                { x: 25, y: 23 },
                { x: 27.5, y: 23 },
                { x: 27.5, y: 18 }
            ],
            traits: ["Obscuring"]
        },
        // L-shaped ruin walls
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 31.56, y: 3.09 }, { x: 28.81, y: 11.66 }, { x: 30.05, y: 12.06 }, { x: 32.4, y: 4.73 }, { x: 35.92, y: 5.86 }, { x: 36.32, y: 4.62 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 28.44, y: 40.91 }, { x: 31.19, y: 32.34 }, { x: 29.95, y: 31.94 }, { x: 27.6, y: 39.27 }, { x: 24.08, y: 38.14 }, { x: 23.68, y: 39.38 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 37.97, y: 14.99 }, { x: 41.99, y: 23.04 }, { x: 43.15, y: 22.46 }, { x: 39.71, y: 15.57 }, { x: 43.02, y: 13.92 }, { x: 42.44, y: 12.75 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 22.03, y: 29.01 }, { x: 18.01, y: 20.96 }, { x: 16.85, y: 21.54 }, { x: 20.29, y: 28.43 }, { x: 16.98, y: 30.08 }, { x: 17.56, y: 31.25 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 48.19, y: 12.7 }, { x: 52.82, y: 4.98 }, { x: 53.94, y: 5.65 }, { x: 49.98, y: 12.26 }, { x: 53.15, y: 14.16 }, { x: 52.48, y: 15.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 11.81, y: 31.3 }, { x: 7.18, y: 39.02 }, { x: 6.06, y: 38.35 }, { x: 10.02, y: 31.74 }, { x: 6.85, y: 29.84 }, { x: 7.52, y: 28.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 48.19, y: 29.7 }, { x: 52.82, y: 21.98 }, { x: 53.94, y: 22.65 }, { x: 49.98, y: 29.26 }, { x: 53.15, y: 31.16 }, { x: 52.48, y: 32.27 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 11.81, y: 14.3 }, { x: 7.18, y: 22.02 }, { x: 6.06, y: 21.35 }, { x: 10.02, y: 14.74 }, { x: 6.85, y: 12.84 }, { x: 7.52, y: 11.73 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 36.87, y: 39.13 }, { x: 36.87, y: 30.13 }, { x: 38.17, y: 30.13 }, { x: 38.17, y: 37.83 }, { x: 41.87, y: 37.83 }, { x: 41.87, y: 39.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 23.13, y: 4.87 }, { x: 23.13, y: 13.87 }, { x: 21.83, y: 13.87 }, { x: 21.83, y: 6.17 }, { x: 18.13, y: 6.17 }, { x: 18.13, y: 4.87 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_7 = {
    id: "wtc_hammer_and_anvil_7",
    category: "WTC",
    subcategory: "Hammer and Anvil",
    name: "WTC Hammer and Anvil 7",
    defaultDeployment: "hammer_and_anvil",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: C=(34,13), A=(31,0) diagonal, B=(38.6,9.2), D=(26.4,3.8)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 26.4, y: 3.8 },
                { x: 34, y: 13 },
                { x: 38.6, y: 9.2 },
                { x: 31, y: 0 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 33.6, y: 40.2 },
                { x: 26, y: 31 },
                { x: 21.4, y: 34.8 },
                { x: 29, y: 44 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(48,3), B=(48,15), C=(42,15), D=(42,3)
        {
            id: "shape_3",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 42, y: 3 },
                { x: 42, y: 15 },
                { x: 48, y: 15 },
                { x: 48, y: 3 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 18, y: 41 },
                { x: 18, y: 29 },
                { x: 12, y: 29 },
                { x: 12, y: 41 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(58,19), B=(54,30), C=(48.36,27.95), D=(52.36,16.95)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52.36, y: 16.95 },
                { x: 48.36, y: 27.95 },
                { x: 54, y: 30 },
                { x: 58, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 7.64, y: 27.05 },
                { x: 11.64, y: 16.05 },
                { x: 6, y: 14 },
                { x: 2, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: A=(37,16), B=(43,26), C=(37.86,29.09), D=(31.86,19.09)
        {
            id: "shape_7",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 31.86, y: 19.09 },
                { x: 37.86, y: 29.09 },
                { x: 43, y: 26 },
                { x: 37, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 28.14, y: 24.91 },
                { x: 22.14, y: 14.91 },
                { x: 17, y: 18 },
                { x: 23, y: 28 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: A=(49,30), B=(45,41), C=(39.36,38.95), D=(43.36,27.95)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 43.36, y: 27.95 },
                { x: 39.36, y: 38.95 },
                { x: 45, y: 41 },
                { x: 49, y: 30 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 16.64, y: 16.05 },
                { x: 20.64, y: 5.05 },
                { x: 15, y: 3 },
                { x: 11, y: 14 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): A=(53,0), B=(53,5), C=(50.5,5), D=(50.5,0)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 50.5, y: 0 },
                { x: 50.5, y: 5 },
                { x: 53, y: 5 },
                { x: 53, y: 0 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 9.5, y: 44 },
                { x: 9.5, y: 39 },
                { x: 7, y: 39 },
                { x: 7, y: 44 }
            ],
            traits: ["Obscuring"]
        },
        // L-shaped ruin walls
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 34.12, y: 11.78 }, { x: 28.38, y: 4.84 }, { x: 29.39, y: 4.01 }, { x: 34.29, y: 9.94 }, { x: 37.14, y: 7.59 }, { x: 37.97, y: 8.59 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 25.88, y: 32.22 }, { x: 31.62, y: 39.16 }, { x: 30.61, y: 39.99 }, { x: 25.71, y: 34.06 }, { x: 22.86, y: 36.41 }, { x: 22.03, y: 35.41 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 42.87, y: 14.13 }, { x: 42.87, y: 5.13 }, { x: 44.17, y: 5.13 }, { x: 44.17, y: 12.83 }, { x: 47.87, y: 12.83 }, { x: 47.87, y: 14.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 17.13, y: 29.87 }, { x: 17.13, y: 38.87 }, { x: 15.83, y: 38.87 }, { x: 15.83, y: 31.17 }, { x: 12.13, y: 31.17 }, { x: 12.13, y: 29.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 49.47, y: 27.43 }, { x: 52.55, y: 18.97 }, { x: 53.77, y: 19.42 }, { x: 51.14, y: 26.65 }, { x: 54.62, y: 27.92 }, { x: 54.17, y: 29.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 10.53, y: 16.57 }, { x: 7.45, y: 25.03 }, { x: 6.23, y: 24.58 }, { x: 8.86, y: 17.35 }, { x: 5.38, y: 16.08 }, { x: 5.83, y: 14.86 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 33.05, y: 19.39 }, { x: 37.68, y: 27.11 }, { x: 38.8, y: 26.44 }, { x: 34.84, y: 19.83 }, { x: 38.01, y: 17.93 }, { x: 37.34, y: 16.81 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 26.95, y: 24.61 }, { x: 22.32, y: 16.89 }, { x: 21.2, y: 17.56 }, { x: 25.16, y: 24.17 }, { x: 21.99, y: 26.07 }, { x: 22.66, y: 27.19 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 40.47, y: 38.43 }, { x: 43.55, y: 29.97 }, { x: 44.77, y: 30.42 }, { x: 42.14, y: 37.65 }, { x: 45.62, y: 38.92 }, { x: 45.17, y: 40.14 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 19.53, y: 5.57 }, { x: 16.45, y: 14.03 }, { x: 15.23, y: 13.58 }, { x: 17.86, y: 6.35 }, { x: 14.38, y: 5.08 }, { x: 14.83, y: 3.86 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};
const WTC_HAMMER_AND_ANVIL_8 = {
    id: "wtc_hammer_and_anvil_8",
    category: "WTC",
    subcategory: "Hammer and Anvil",
    name: "WTC Hammer and Anvil 8",
    defaultDeployment: "hammer_and_anvil",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        // Shape 1: D=(15,2), C=(15,14), B=(21,14), A=(21,2)
        {
            id: "shape_1",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 21, y: 2 },
                { x: 21, y: 14 },
                { x: 15, y: 14 },
                { x: 15, y: 2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 2: Mirror of shape 1 (60-x, 44-y)
        {
            id: "shape_2",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 39, y: 42 },
                { x: 39, y: 30 },
                { x: 45, y: 30 },
                { x: 45, y: 42 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 3: A=(35,5), C=(24,12) diagonal, B=(29,15), D=(30,2)
        {
            id: "shape_3",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 2 },
                { x: 24, y: 12 },
                { x: 29, y: 15 },
                { x: 35, y: 5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 4: Mirror of shape 3 (60-x, 44-y)
        {
            id: "shape_4",
            type: "blue_solid",
            shape: "polygon",
            points: [
                { x: 30, y: 42 },
                { x: 36, y: 32 },
                { x: 31, y: 29 },
                { x: 25, y: 39 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 5: A=(41,8), C=(40,21) diagonal, B=(45.4,18.8), D=(35.6,10.2)
        {
            id: "shape_5",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 35.6, y: 10.2 },
                { x: 40, y: 21 },
                { x: 45.4, y: 18.8 },
                { x: 41, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 6: Mirror of shape 5 (60-x, 44-y)
        {
            id: "shape_6",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 24.4, y: 33.8 },
                { x: 20, y: 23 },
                { x: 14.6, y: 25.2 },
                { x: 19, y: 36 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 7: D=(52,2), C=(47,13), B=(52.46,15.48), A=(57.46,4.48) - AB below DC (y increases down)
        {
            id: "shape_7",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 52, y: 2 },
                { x: 47, y: 13 },
                { x: 52.46, y: 15.48 },
                { x: 57.46, y: 4.48 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 8: Mirror of shape 7 (60-x, 44-y)
        {
            id: "shape_8",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 8, y: 42 },
                { x: 13, y: 31 },
                { x: 7.54, y: 28.52 },
                { x: 2.54, y: 39.52 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 9: A=(52,19), B=(47,30), C=(52.46,32.48), D=(57.46,21.48)
        {
            id: "shape_9",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 57.46, y: 21.48 },
                { x: 52.46, y: 32.48 },
                { x: 47, y: 30 },
                { x: 52, y: 19 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 10: Mirror of shape 9 (60-x, 44-y)
        {
            id: "shape_10",
            type: "red_solid",
            shape: "polygon",
            points: [
                { x: 2.54, y: 22.52 },
                { x: 7.54, y: 11.52 },
                { x: 13, y: 14 },
                { x: 8, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // Shape 11 (2.5x5): B=(36,26), A=(36,21), C=(38.5,26), D=(38.5,21)
        {
            id: "shape_11",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 33.5, y: 21 },
                { x: 33.5, y: 26 },
                { x: 36, y: 26 },
                { x: 36, y: 21 }
            ],
            traits: ["Obscuring"]
        },
        // Shape 12: Mirror of shape 11 (60-x, 44-y)
        {
            id: "shape_12",
            type: "grey_solid",
            shape: "polygon",
            points: [
                { x: 26.5, y: 23 },
                { x: 26.5, y: 18 },
                { x: 24, y: 18 },
                { x: 24, y: 23 }
            ],
            traits: ["Obscuring"]
        },
        // L-shaped ruin walls
        { id: "wall_1", type: "gray_striped", shape: "polygon", points: [{ x: 20.13, y: 2.87 }, { x: 20.13, y: 11.87 }, { x: 18.83, y: 11.87 }, { x: 18.83, y: 4.17 }, { x: 15.13, y: 4.17 }, { x: 15.13, y: 2.87 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_2", type: "gray_striped", shape: "polygon", points: [{ x: 39.87, y: 41.13 }, { x: 39.87, y: 32.13 }, { x: 41.17, y: 32.13 }, { x: 41.17, y: 39.83 }, { x: 44.87, y: 39.83 }, { x: 44.87, y: 41.13 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_3", type: "gray_striped", shape: "polygon", points: [{ x: 28.7, y: 13.81 }, { x: 33.33, y: 6.09 }, { x: 32.22, y: 5.42 }, { x: 28.26, y: 12.02 }, { x: 25.08, y: 10.12 }, { x: 24.41, y: 11.23 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_4", type: "gray_striped", shape: "polygon", points: [{ x: 31.3, y: 30.19 }, { x: 26.67, y: 37.91 }, { x: 27.78, y: 38.58 }, { x: 31.74, y: 31.98 }, { x: 34.92, y: 33.88 }, { x: 35.59, y: 32.77 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_5", type: "gray_striped", shape: "polygon", points: [{ x: 40.48, y: 19.87 }, { x: 37.08, y: 11.53 }, { x: 38.29, y: 11.04 }, { x: 41.19, y: 18.17 }, { x: 44.62, y: 16.78 }, { x: 45.11, y: 17.98 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_6", type: "gray_striped", shape: "polygon", points: [{ x: 19.52, y: 24.13 }, { x: 22.92, y: 32.47 }, { x: 21.71, y: 32.96 }, { x: 18.81, y: 25.83 }, { x: 15.38, y: 27.22 }, { x: 14.89, y: 26.02 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_7", type: "gray_striped", shape: "polygon", points: [{ x: 48.15, y: 12.57 }, { x: 51.88, y: 4.37 }, { x: 53.06, y: 4.91 }, { x: 49.87, y: 11.92 }, { x: 53.24, y: 13.45 }, { x: 52.7, y: 14.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_8", type: "gray_striped", shape: "polygon", points: [{ x: 11.85, y: 31.43 }, { x: 8.12, y: 39.63 }, { x: 6.94, y: 39.09 }, { x: 10.13, y: 32.08 }, { x: 6.76, y: 30.55 }, { x: 7.3, y: 29.36 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_9", type: "gray_striped", shape: "polygon", points: [{ x: 48.15, y: 29.57 }, { x: 51.88, y: 21.37 }, { x: 53.06, y: 21.91 }, { x: 49.87, y: 28.92 }, { x: 53.24, y: 30.45 }, { x: 52.7, y: 31.64 }], traits: ["Defensible", "Obscuring"] },
        { id: "wall_10", type: "gray_striped", shape: "polygon", points: [{ x: 11.85, y: 14.43 }, { x: 8.12, y: 22.63 }, { x: 6.94, y: 22.09 }, { x: 10.13, y: 15.08 }, { x: 6.76, y: 13.55 }, { x: 7.3, y: 12.36 }], traits: ["Defensible", "Obscuring"] }
    ],
    objectives: [],
    deploymentZones: []
};

// UKTC Layouts (Skeleton - to be filled in)
const UKTC_LAYOUT_1 = {
    id: "uktc_1",
    category: "UKTC",
    name: "UKTC 1",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            "id": "shape_1",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 5,
                    "y": 36
                },
                {
                    "x": 12.200279,
                    "y": 32.400380
                },
                {
                    "x": 14,
                    "y": 36
                },
                {
                    "x": 6.799721,
                    "y": 39.599620
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_2",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 8,
                    "y": 22
                },
                {
                    "x": 11.238242,
                    "y": 25.809697
                },
                {
                    "x": 7.428546,
                    "y": 29.047939
                },
                {
                    "x": 4.190303,
                    "y": 25.238242
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_3",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 11,
                    "y": 19.45
                },
                {
                    "x": 8,
                    "y": 22
                },

                {
                    "x": 13.1,
                    "y": 28
                },
                {
                    "x": 16.1,
                    "y": 25.45
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_4",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 19,
                    "y": 34.2
                },
                {
                    "x": 19,
                    "y": 41
                },
                {
                    "x": 21,
                    "y": 41
                },
                {
                    "x": 21,
                    "y": 36
                },
                {
                    "x": 27.7,
                    "y": 36
                },
                {
                    "x": 27.7,
                    "y": 34.2
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 38,
                    "y": 34
                },
                {
                    "x": 38,
                    "y": 26
                },
                {
                    "x": 30,
                    "y": 26
                },
                {
                    "x": 30,
                    "y": 34
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_6",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 30,
                    "y": 29
                },
                {
                    "x": 21,
                    "y": 29
                },
                {
                    "x": 21,
                    "y": 26
                },
                {
                    "x": 30,
                    "y": 26
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_7",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 43.1,
                    "y": 34.98
                },
                {
                    "x": 46.98,
                    "y": 29.53
                },
                {
                    "x": 54.03,
                    "y": 34.56
                },
                {
                    "x": 53,
                    "y": 36
                },
                {
                    "x": 47.39,
                    "y": 32
                },
                {
                    "x": 44.53,
                    "y": 36
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_8",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 49,
                    "y": 24.55
                },
                {
                    "x": 52,
                    "y": 22
                },
                {
                    "x": 46.9,
                    "y": 16
                },
                {
                    "x": 43.9,
                    "y": 18.55
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_9",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 52,
                    "y": 22
                },
                {
                    "x": 48.761758,
                    "y": 18.190303
                },
                {
                    "x": 52.571454,
                    "y": 14.952061
                },
                {
                    "x": 55.809697,
                    "y": 18.761758
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_10",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 39,
                    "y": 18
                },
                {
                    "x": 30,
                    "y": 18
                },
                {
                    "x": 30,
                    "y": 15
                },
                {
                    "x": 39,
                    "y": 15
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_11",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 30,
                    "y": 18
                },
                {
                    "x": 22,
                    "y": 18
                },
                {
                    "x": 22,
                    "y": 10
                },
                {
                    "x": 30,
                    "y": 10
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_12",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 16.9,
                    "y": 9.02
                },
                {
                    "x": 13.02,
                    "y": 14.47
                },
                {
                    "x": 5.97,
                    "y": 9.44
                },
                {
                    "x": 7,
                    "y": 8
                },
                {
                    "x": 12.61,
                    "y": 12
                },
                {
                    "x": 15.47,
                    "y": 8
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_13",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 32.5,
                    "y": 9.8
                },
                {
                    "x": 41,
                    "y": 9.8
                },
                {
                    "x": 41,
                    "y": 2.8
                },
                {
                    "x": 39,
                    "y": 2.8
                },
                {
                    "x": 39,
                    "y": 8
                },
                {
                    "x": 32.5,
                    "y": 8
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 55,
                    "y": 8
                },
                {
                    "x": 47.799721,
                    "y": 11.599620
                },
                {
                    "x": 46,
                    "y": 8
                },
                {
                    "x": 53.200279,
                    "y": 4.400380
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "ruin_1",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 5, "y": 36 },
                { "x": 12.2, "y": 32.4 },
                { "x": 14, "y": 36 },
                { "x": 13.55, "y": 36.22 },
                { "x": 11.98, "y": 33.07 },
                { "x": 5.22, "y": 36.45 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_3",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 8, "y": 22 },
                { "x": 11, "y": 19.45 },
                { "x": 16.1, "y": 25.45 },
                { "x": 15.72, "y": 25.77 },
                { "x": 10.94, "y": 20.15 },
                { "x": 8.32, "y": 22.38 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 38, "y": 34 },
                { "x": 38, "y": 26 },
                { "x": 30, "y": 26 },
                { "x": 30, "y": 26.5 },
                { "x": 37.5, "y": 26.5 },
                { "x": 37.5, "y": 34 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_6a",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 21, "y": 29 },
                { "x": 24, "y": 29 },
                { "x": 24, "y": 28.5 },
                { "x": 21.5, "y": 28.5 },
                { "x": 21.5, "y": 27.5 },
                { "x": 21, "y": 27.5 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_6b",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 30, "y": 26 },
                { "x": 27, "y": 26 },
                { "x": 27, "y": 26.5 },
                { "x": 29.5, "y": 26.5 },
                { "x": 29.5, "y": 27.5 },
                { "x": 30, "y": 27.5 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_8",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 52, "y": 22 },
                { "x": 49, "y": 24.55 },
                { "x": 43.9, "y": 18.55 },
                { "x": 44.28, "y": 18.23 },
                { "x": 49.06, "y": 23.85 },
                { "x": 51.68, "y": 21.62 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_10a",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 39, "y": 15 },
                { "x": 36, "y": 15 },
                { "x": 36, "y": 15.5 },
                { "x": 38.5, "y": 15.5 },
                { "x": 38.5, "y": 16.5 },
                { "x": 39, "y": 16.5 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_10b",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 30, "y": 18 },
                { "x": 33, "y": 18 },
                { "x": 33, "y": 17.5 },
                { "x": 30.5, "y": 17.5 },
                { "x": 30.5, "y": 16.5 },
                { "x": 30, "y": 16.5 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_11",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 22, "y": 10 },
                { "x": 22, "y": 18 },
                { "x": 30, "y": 18 },
                { "x": 30, "y": 17.5 },
                { "x": 22.5, "y": 17.5 },
                { "x": 22.5, "y": 10 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 55, "y": 8 },
                { "x": 47.8, "y": 11.6 },
                { "x": 46, "y": 8 },
                { "x": 46.45, "y": 7.78 },
                { "x": 48.02, "y": 10.93 },
                { "x": 54.78, "y": 7.55 }
            ],
            "traits": ["Defensible", "Obscuring"]
        }
    ],
    "objectives": [],
    "deploymentZones": [
        {
            "id": "deploy_player",
            "type": "player",
            "shape": "rectangle",
            "position": {
                "x": 0,
                "y": 0
            },
            "dimensions": {
                "width": 60,
                "height": 12
            }
        },
        {
            "id": "deploy_opponent",
            "type": "opponent",
            "shape": "rectangle",
            "position": {
                "x": 0,
                "y": 32
            },
            "dimensions": {
                "width": 60,
                "height": 12
            }
        }
    ],
    "objectives": [],
    "deploymentZones": [
        {
            "id": "deploy_player",
            "type": "player",
            "shape": "rectangle",
            "position": {
                "x": 0,
                "y": 0
            },
            "dimensions": {
                "width": 60,
                "height": 12
            }
        },
        {
            "id": "deploy_opponent",
            "type": "opponent",
            "shape": "rectangle",
            "position": {
                "x": 0,
                "y": 32
            },
            "dimensions": {
                "width": 60,
                "height": 12
            }
        }
    ],
    objectives: [],
    defaultDeployment: "sweeping_engagement",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_2 = {
    id: "uktc_2",
    category: "UKTC",
    name: "UKTC 2",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            "id": "shape_1",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 8,
                    "y": 10
                },
                {
                    "x": 14.89,
                    "y": 10
                },
                {
                    "x": 14.89,
                    "y": 5.0
                },
                {
                    "x": 16.66,
                    "y": 5.0
                },
                {
                    "x": 16.66,
                    "y": 11.77
                },
                {
                    "x": 8,
                    "y": 11.77
                }

            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_2",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 52,
                    "y": 34
                },
                {
                    "x": 45.11,
                    "y": 34
                },
                {
                    "x": 45.11,
                    "y": 39
                },
                {
                    "x": 43.34,
                    "y": 39
                },
                {
                    "x": 43.34,
                    "y": 32.23
                },
                {
                    "x": 52,
                    "y": 32.23
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_3",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 56,
                    "y": 10.77
                },
                {
                    "x": 49.11,
                    "y": 10.77
                },
                {
                    "x": 49.11,
                    "y": 15.77
                },
                {
                    "x": 47.34,
                    "y": 15.77
                },
                {
                    "x": 47.34,
                    "y": 9
                },
                {
                    "x": 56,
                    "y": 9
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_4",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 4,
                    "y": 33.23
                },
                {
                    "x": 10.89,
                    "y": 33.23
                },
                {
                    "x": 10.89,
                    "y": 28.23
                },
                {
                    "x": 12.66,
                    "y": 28.23
                },
                {
                    "x": 12.66,
                    "y": 35
                },
                {
                    "x": 4,
                    "y": 35
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 35,
                    "y": 5
                },
                {
                    "x": 39,
                    "y": 5
                },
                {
                    "x": 39,
                    "y": 13
                },
                {
                    "x": 35,
                    "y": 13
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_6",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25,
                    "y": 39
                },
                {
                    "x": 21,
                    "y": 39
                },
                {
                    "x": 21,
                    "y": 31
                },
                {
                    "x": 25,
                    "y": 31
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_7",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 35,
                    "y": 5
                },
                {
                    "x": 30,
                    "y": 5
                },
                {
                    "x": 30,
                    "y": 0
                },
                {
                    "x": 35,
                    "y": 0
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_8",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25,
                    "y": 39
                },
                {
                    "x": 30,
                    "y": 39
                },
                {
                    "x": 30,
                    "y": 44
                },
                {
                    "x": 25,
                    "y": 44
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_9",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 15,
                    "y": 22
                },
                {
                    "x": 19.43,
                    "y": 15.49
                },
                {
                    "x": 25.94,
                    "y": 19.92
                },
                {
                    "x": 21.51,
                    "y": 26.43
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_10",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 45,
                    "y": 22
                },
                {
                    "x": 40.57,
                    "y": 28.51
                },
                {
                    "x": 34.06,
                    "y": 24.08
                },
                {
                    "x": 38.49,
                    "y": 17.57
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_11",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25.94,
                    "y": 19.92
                },
                {
                    "x": 23.46,
                    "y": 18.23
                },
                {
                    "x": 28.52,
                    "y": 10.79
                },
                {
                    "x": 31.00,
                    "y": 12.48
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_12",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 34.06,
                    "y": 24.08
                },
                {
                    "x": 36.54,
                    "y": 25.77
                },
                {
                    "x": 31.48,
                    "y": 33.21
                },
                {
                    "x": 29.00,
                    "y": 31.52
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_13",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 4,
                    "y": 23
                },
                {
                    "x": 8,
                    "y": 16
                },
                {
                    "x": 11.42,
                    "y": 17.95
                },
                {
                    "x": 7.42,
                    "y": 24.95
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 56,
                    "y": 21
                },
                {
                    "x": 52,
                    "y": 28
                },
                {
                    "x": 48.58,
                    "y": 26.05
                },
                {
                    "x": 52.58,
                    "y": 19.05
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_15",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {"x": 39, "y": 13},
                {"x": 39, "y": 5},
                {"x": 38.5, "y": 5},
                {"x": 38.5, "y": 12.5},
                {"x": 35, "y": 12.5},
                {"x": 35, "y": 13}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_16",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {"x": 21, "y": 31},
                {"x": 21, "y": 39},
                {"x": 21.5, "y": 39},
                {"x": 21.5, "y": 31.5},
                {"x": 25, "y": 31.5},
                {"x": 25, "y": 31}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_17",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {"x": 15, "y": 22},
                {"x": 21.51, "y": 26.43},
                {"x": 25.94, "y": 19.92},
                {"x": 25.53, "y": 19.64},
                {"x": 21.38, "y": 25.73},
                {"x": 15.28, "y": 21.59}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_18",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {"x": 45, "y": 22},
                {"x": 38.49, "y": 17.57},
                {"x": 34.06, "y": 24.08},
                {"x": 34.47, "y": 24.36},
                {"x": 38.62, "y": 18.27},
                {"x": 44.72, "y": 22.41}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_19",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                {"x": 25.94, "y": 19.92},
                {"x": 24.45, "y": 18.91},
                {"x": 24.68, "y": 18.58},
                {"x": 25.84, "y": 19.36},
                {"x": 27.02, "y": 17.62},
                {"x": 27.35, "y": 17.85}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_20",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                {"x": 28.53, "y": 10.79},
                {"x": 30.02, "y": 11.80},
                {"x": 29.79, "y": 12.13},
                {"x": 28.63, "y": 11.35},
                {"x": 27.45, "y": 13.08},
                {"x": 27.12, "y": 12.85}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_21",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                {"x": 34.06, "y": 24.08},
                {"x": 35.55, "y": 25.09},
                {"x": 35.32, "y": 25.42},
                {"x": 34.16, "y": 24.64},
                {"x": 32.98, "y": 26.38},
                {"x": 32.65, "y": 26.15}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_22",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                {"x": 31.47, "y": 33.21},
                {"x": 29.98, "y": 32.20},
                {"x": 30.21, "y": 31.87},
                {"x": 31.37, "y": 32.65},
                {"x": 32.55, "y": 30.92},
                {"x": 32.88, "y": 31.15}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_23",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {"x": 8, "y": 16},
                {"x": 11.42, "y": 17.95},
                {"x": 7.42, "y": 24.95},
                {"x": 6.99, "y": 24.70},
                {"x": 10.74, "y": 18.14},
                {"x": 7.75, "y": 16.43}
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "shape_24",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {"x": 52, "y": 28},
                {"x": 48.58, "y": 26.05},
                {"x": 52.58, "y": 19.05},
                {"x": 53.01, "y": 19.30},
                {"x": 49.26, "y": 25.86},
                {"x": 52.25, "y": 27.57}
            ],
            "traits": ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "crucible_of_battle",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_3 = {
    id: "uktc_3",
    category: "UKTC",
    name: "UKTC 3",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "shape_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 17 },
                { x: 9, y: 17 },
                { x: 9, y: 25 },
                { x: 5, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 25 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 7, y: 39 },
                { x: 11, y: 39 },
                { x: 11, y: 31 },
                { x: 7, y: 31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 7, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_5",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 31, y: 9 },
                { x: 36, y: 9 },
                { x: 36, y: 4 },
                { x: 31, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_6",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 31, y: 9 }),
                mirrorAcrossDiagonal({ x: 36, y: 9 }),
                mirrorAcrossDiagonal({ x: 36, y: 4 }),
                mirrorAcrossDiagonal({ x: 31, y: 4 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_7",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 31, y: 9 },
                { x: 23, y: 9 },
                { x: 23, y: 17 },
                { x: 31, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_8",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 31, y: 9 }),
                mirrorAcrossDiagonal({ x: 23, y: 9 }),
                mirrorAcrossDiagonal({ x: 23, y: 17 }),
                mirrorAcrossDiagonal({ x: 31, y: 17 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_9",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 23, y: 17 },
                { x: 14, y: 17 },
                { x: 14, y: 20 },
                { x: 23, y: 20 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_10",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23, y: 17 }),
                mirrorAcrossDiagonal({ x: 14, y: 17 }),
                mirrorAcrossDiagonal({ x: 14, y: 20 }),
                mirrorAcrossDiagonal({ x: 23, y: 20 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_11",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 10 },
                { x: 12, y: 10 },
                { x: 12, y: 5 },
                { x: 13.77, y: 5 },
                { x: 13.77, y: 11.69 },
                { x: 5, y: 11.69 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_12",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 10 }),
                mirrorAcrossDiagonal({ x: 12, y: 10 }),
                mirrorAcrossDiagonal({ x: 12, y: 5 }),
                mirrorAcrossDiagonal({ x: 13.77, y: 5 }),
                mirrorAcrossDiagonal({ x: 13.77, y: 11.69 }),
                mirrorAcrossDiagonal({ x: 5, y: 11.69 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_13",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 41, y: 9 },
                { x: 41, y: 16 },
                { x: 46, y: 16 },
                { x: 46, y: 17.77 },
                { x: 39.23, y: 17.77 },
                { x: 39.23, y: 9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_14",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 41, y: 9 }),
                mirrorAcrossDiagonal({ x: 41, y: 16 }),
                mirrorAcrossDiagonal({ x: 46, y: 16 }),
                mirrorAcrossDiagonal({ x: 46, y: 17.77 }),
                mirrorAcrossDiagonal({ x: 39.23, y: 17.77 }),
                mirrorAcrossDiagonal({ x: 39.23, y: 9 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_15",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 9, y: 25 },
                { x: 9, y: 17 },
                { x: 8.5, y: 17 },
                { x: 8.5, y: 24.5 },
                { x: 5, y: 24.5 },
                { x: 5, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_16",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 9, y: 25 }),
                mirrorAcrossDiagonal({ x: 9, y: 17 }),
                mirrorAcrossDiagonal({ x: 8.5, y: 17 }),
                mirrorAcrossDiagonal({ x: 8.5, y: 24.5 }),
                mirrorAcrossDiagonal({ x: 5, y: 24.5 }),
                mirrorAcrossDiagonal({ x: 5, y: 25 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_17",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 11, y: 31 },
                { x: 11, y: 39 },
                { x: 10.5, y: 39 },
                { x: 10.5, y: 31.5 },
                { x: 7, y: 31.5 },
                { x: 7, y: 31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_18",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 11, y: 31 }),
                mirrorAcrossDiagonal({ x: 11, y: 39 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 39 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 31.5 }),
                mirrorAcrossDiagonal({ x: 7, y: 31.5 }),
                mirrorAcrossDiagonal({ x: 7, y: 31 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_19",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 31, y: 17 },
                { x: 31, y: 9 },
                { x: 30.5, y: 9 },
                { x: 30.5, y: 16.5 },
                { x: 23, y: 16.5 },
                { x: 23, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_20",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 31, y: 17 }),
                mirrorAcrossDiagonal({ x: 31, y: 9 }),
                mirrorAcrossDiagonal({ x: 30.5, y: 9 }),
                mirrorAcrossDiagonal({ x: 30.5, y: 16.5 }),
                mirrorAcrossDiagonal({ x: 23, y: 16.5 }),
                mirrorAcrossDiagonal({ x: 23, y: 17 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_21",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 14, y: 20 },
                { x: 16.5, y: 20 },
                { x: 16.5, y: 19.6 },
                { x: 14.4, y: 19.6 },
                { x: 14.4, y: 18.2 },
                { x: 14, y: 18.2 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_22",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 23, y: 17 },
                { x: 20.5, y: 17 },
                { x: 20.5, y: 17.4 },
                { x: 22.6, y: 17.4 },
                { x: 22.6, y: 18.8 },
                { x: 23, y: 18.8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_23",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23, y: 17 }),
                mirrorAcrossDiagonal({ x: 20.5, y: 17 }),
                mirrorAcrossDiagonal({ x: 20.5, y: 17.4 }),
                mirrorAcrossDiagonal({ x: 22.6, y: 17.4 }),
                mirrorAcrossDiagonal({ x: 22.6, y: 18.8 }),
                mirrorAcrossDiagonal({ x: 23, y: 18.8 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_24",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 14, y: 20 }),
                mirrorAcrossDiagonal({ x: 16.5, y: 20 }),
                mirrorAcrossDiagonal({ x: 16.5, y: 19.6 }),
                mirrorAcrossDiagonal({ x: 14.4, y: 19.6 }),
                mirrorAcrossDiagonal({ x: 14.4, y: 18.2 }),
                mirrorAcrossDiagonal({ x: 14, y: 18.2 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "hidden_supplies",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_4 = {
    id: "uktc_4",
    category: "UKTC",
    name: "UKTC 4",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            "id": "shape_1",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 8,
                    "y": 10
                },
                {
                    "x": 14.89,
                    "y": 10
                },
                {
                    "x": 14.89,
                    "y": 5.0
                },
                {
                    "x": 16.66,
                    "y": 5.0
                },
                {
                    "x": 16.66,
                    "y": 11.77
                },
                {
                    "x": 8,
                    "y": 11.77
                }

            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_2",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 52,
                    "y": 34
                },
                {
                    "x": 45.11,
                    "y": 34
                },
                {
                    "x": 45.11,
                    "y": 39
                },
                {
                    "x": 43.34,
                    "y": 39
                },
                {
                    "x": 43.34,
                    "y": 32.23
                },
                {
                    "x": 52,
                    "y": 32.23
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_3",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 56,
                    "y": 10.77
                },
                {
                    "x": 49.11,
                    "y": 10.77
                },
                {
                    "x": 49.11,
                    "y": 15.77
                },
                {
                    "x": 47.34,
                    "y": 15.77
                },
                {
                    "x": 47.34,
                    "y": 9
                },
                {
                    "x": 56,
                    "y": 9
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_4",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 4,
                    "y": 33.23
                },
                {
                    "x": 10.89,
                    "y": 33.23
                },
                {
                    "x": 10.89,
                    "y": 28.23
                },
                {
                    "x": 12.66,
                    "y": 28.23
                },
                {
                    "x": 12.66,
                    "y": 35
                },
                {
                    "x": 4,
                    "y": 35
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 35,
                    "y": 5
                },
                {
                    "x": 39,
                    "y": 5
                },
                {
                    "x": 39,
                    "y": 13
                },
                {
                    "x": 35,
                    "y": 13
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_6",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25,
                    "y": 39
                },
                {
                    "x": 21,
                    "y": 39
                },
                {
                    "x": 21,
                    "y": 31
                },
                {
                    "x": 25,
                    "y": 31
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_7",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 35,
                    "y": 5
                },
                {
                    "x": 30,
                    "y": 5
                },
                {
                    "x": 30,
                    "y": 0
                },
                {
                    "x": 35,
                    "y": 0
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_8",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25,
                    "y": 39
                },
                {
                    "x": 30,
                    "y": 39
                },
                {
                    "x": 30,
                    "y": 44
                },
                {
                    "x": 25,
                    "y": 44
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_9",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 15,
                    "y": 22
                },
                {
                    "x": 19.43,
                    "y": 15.49
                },
                {
                    "x": 25.94,
                    "y": 19.92
                },
                {
                    "x": 21.51,
                    "y": 26.43
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_10",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 45,
                    "y": 22
                },
                {
                    "x": 40.57,
                    "y": 28.51
                },
                {
                    "x": 34.06,
                    "y": 24.08
                },
                {
                    "x": 38.49,
                    "y": 17.57
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_11",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25.94,
                    "y": 19.92
                },
                {
                    "x": 23.46,
                    "y": 18.23
                },
                {
                    "x": 28.52,
                    "y": 10.79
                },
                {
                    "x": 31.00,
                    "y": 12.48
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_12",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 34.06,
                    "y": 24.08
                },
                {
                    "x": 36.54,
                    "y": 25.77
                },
                {
                    "x": 31.48,
                    "y": 33.21
                },
                {
                    "x": 29.00,
                    "y": 31.52
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_13",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 4,
                    "y": 23
                },
                {
                    "x": 8,
                    "y": 16
                },
                {
                    "x": 11.42,
                    "y": 17.95
                },
                {
                    "x": 7.42,
                    "y": 24.95
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 56,
                    "y": 21
                },
                {
                    "x": 52,
                    "y": 28
                },
                {
                    "x": 48.58,
                    "y": 26.05
                },
                {
                    "x": 52.58,
                    "y": 19.05
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "ruin_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 39, "y": 5 },
                { "x": 39, "y": 13 },
                { "x": 35, "y": 13 },
                { "x": 35, "y": 12.5 },
                { "x": 38.5, "y": 12.5 },
                { "x": 38.5, "y": 5 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_6",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 21, "y": 39 },
                { "x": 21, "y": 31 },
                { "x": 25, "y": 31 },
                { "x": 25, "y": 31.5 },
                { "x": 21.5, "y": 31.5 },
                { "x": 21.5, "y": 39 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_9",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 15, "y": 22 },
                { "x": 21.51, "y": 26.43 },
                { "x": 25.94, "y": 19.92 },
                { "x": 25.53, "y": 19.64 },
                { "x": 21.38, "y": 25.74 },
                { "x": 15.28, "y": 21.59 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_10",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 45, "y": 22 },
                { "x": 38.49, "y": 17.57 },
                { "x": 34.06, "y": 24.08 },
                { "x": 34.47, "y": 24.36 },
                { "x": 38.62, "y": 18.26 },
                { "x": 44.72, "y": 22.41 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_11a",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 24.70, "y": 19.08 },
                { "x": 25.94, "y": 19.92 },
                { "x": 27.63, "y": 17.44 },
                { "x": 27.22, "y": 17.16 },
                { "x": 25.81, "y": 19.23 },
                { "x": 24.98, "y": 18.67 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_11b",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 29.76, "y": 11.63 },
                { "x": 28.52, "y": 10.79 },
                { "x": 26.83, "y": 13.27 },
                { "x": 27.24, "y": 13.55 },
                { "x": 28.65, "y": 11.48 },
                { "x": 29.48, "y": 12.04 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_12a",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 35.30, "y": 24.92 },
                { "x": 34.06, "y": 24.08 },
                { "x": 32.37, "y": 26.56 },
                { "x": 32.78, "y": 26.84 },
                { "x": 34.19, "y": 24.77 },
                { "x": 35.02, "y": 25.33 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_12b",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 30.24, "y": 32.37 },
                { "x": 31.48, "y": 33.21 },
                { "x": 33.17, "y": 30.73 },
                { "x": 32.76, "y": 30.45 },
                { "x": 31.35, "y": 32.52 },
                { "x": 30.52, "y": 31.96 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_13",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 8, "y": 16 },
                { "x": 11.42, "y": 17.95 },
                { "x": 7.42, "y": 24.95 },
                { "x": 6.99, "y": 24.70 },
                { "x": 10.74, "y": 18.14 },
                { "x": 7.75, "y": 16.43 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        {
            "id": "ruin_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 52, "y": 28 },
                { "x": 48.58, "y": 26.05 },
                { "x": 52.58, "y": 19.05 },
                { "x": 53.01, "y": 19.30 },
                { "x": 49.26, "y": 25.86 },
                { "x": 52.25, "y": 27.57 }
            ],
            "traits": ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "crucible_of_battle",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_5 = {
    id: "uktc_5",
    category: "UKTC",
    name: "UKTC 5",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "shape_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 17 },
                { x: 9, y: 17 },
                { x: 9, y: 25 },
                { x: 5, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 25 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 7, y: 39 },
                { x: 11, y: 39 },
                { x: 11, y: 31 },
                { x: 7, y: 31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 7, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_5",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 29, y: 8 },
                { x: 29, y: 3 },
                { x: 34, y: 3 },
                { x: 34, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_6",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 29, y: 8 }),
                mirrorAcrossDiagonal({ x: 29, y: 3 }),
                mirrorAcrossDiagonal({ x: 34, y: 3 }),
                mirrorAcrossDiagonal({ x: 34, y: 8 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_7",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 34, y: 8 },
                { x: 26, y: 8 },
                { x: 26, y: 16 },
                { x: 34, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_8",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 34, y: 8 }),
                mirrorAcrossDiagonal({ x: 26, y: 8 }),
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 34, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_9",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 26, y: 16 },
                { x: 26, y: 19 },
                { x: 17, y: 19 },
                { x: 17, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_10",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 26, y: 19 }),
                mirrorAcrossDiagonal({ x: 17, y: 19 }),
                mirrorAcrossDiagonal({ x: 17, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_11",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 10 },
                { x: 12, y: 10 },
                { x: 12, y: 5 },
                { x: 13.77, y: 5 },
                { x: 13.77, y: 11.69 },
                { x: 5, y: 11.69 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_12",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 10 }),
                mirrorAcrossDiagonal({ x: 12, y: 10 }),
                mirrorAcrossDiagonal({ x: 12, y: 5 }),
                mirrorAcrossDiagonal({ x: 13.77, y: 5 }),
                mirrorAcrossDiagonal({ x: 13.77, y: 11.69 }),
                mirrorAcrossDiagonal({ x: 5, y: 11.69 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_13",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 41, y: 9 },
                { x: 41, y: 16 },
                { x: 46, y: 16 },
                { x: 46, y: 17.77 },
                { x: 39.23, y: 17.77 },
                { x: 39.23, y: 9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_14",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 41, y: 9 }),
                mirrorAcrossDiagonal({ x: 41, y: 16 }),
                mirrorAcrossDiagonal({ x: 46, y: 16 }),
                mirrorAcrossDiagonal({ x: 46, y: 17.77 }),
                mirrorAcrossDiagonal({ x: 39.23, y: 17.77 }),
                mirrorAcrossDiagonal({ x: 39.23, y: 9 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_1: L wall on shape_1 (4×8, left mid), corner at (9,25)
        {
            id: "ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 9, y: 17 },
                { x: 9, y: 25 },
                { x: 5, y: 25 },
                { x: 5, y: 24.5 },
                { x: 8.5, y: 24.5 },
                { x: 8.5, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_2: mirror of ruin_1 (shape_2)
        {
            id: "ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 9, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 24.5 }),
                mirrorAcrossDiagonal({ x: 8.5, y: 24.5 }),
                mirrorAcrossDiagonal({ x: 8.5, y: 17 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_3: L wall on shape_3 (4×8, left bottom), corner at (11,31)
        {
            id: "ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 11, y: 39 },
                { x: 11, y: 31 },
                { x: 7, y: 31 },
                { x: 7, y: 31.5 },
                { x: 10.5, y: 31.5 },
                { x: 10.5, y: 39 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_4: mirror of ruin_3 (shape_4)
        {
            id: "ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 11, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31.5 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 31.5 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 39 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_7: L wall on shape_7 (8×8, center top), corner at (34,16)
        {
            id: "ruin_7",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 34, y: 8 },
                { x: 34, y: 16 },
                { x: 26, y: 16 },
                { x: 26, y: 15.5 },
                { x: 33.5, y: 15.5 },
                { x: 33.5, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_8: mirror of ruin_7 (shape_8)
        {
            id: "ruin_8",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 34, y: 8 }),
                mirrorAcrossDiagonal({ x: 34, y: 16 }),
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 26, y: 15.5 }),
                mirrorAcrossDiagonal({ x: 33.5, y: 15.5 }),
                mirrorAcrossDiagonal({ x: 33.5, y: 8 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_9a: blue stub on shape_9 (9×3, left center), TR corner (26,16)
        {
            id: "ruin_9a",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 26, y: 16 },
                { x: 23, y: 16 },
                { x: 23, y: 16.5 },
                { x: 25.5, y: 16.5 },
                { x: 25.5, y: 17.5 },
                { x: 26, y: 17.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_9b: blue stub on shape_9 (9×3, left center), BL corner (17,19)
        {
            id: "ruin_9b",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 17, y: 19 },
                { x: 20, y: 19 },
                { x: 20, y: 18.5 },
                { x: 17.5, y: 18.5 },
                { x: 17.5, y: 17.5 },
                { x: 17, y: 17.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_10a: mirror of ruin_9a (shape_10)
        {
            id: "ruin_10a",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 23, y: 16 }),
                mirrorAcrossDiagonal({ x: 23, y: 16.5 }),
                mirrorAcrossDiagonal({ x: 25.5, y: 16.5 }),
                mirrorAcrossDiagonal({ x: 25.5, y: 17.5 }),
                mirrorAcrossDiagonal({ x: 26, y: 17.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_10b: mirror of ruin_9b (shape_10)
        {
            id: "ruin_10b",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 17, y: 19 }),
                mirrorAcrossDiagonal({ x: 20, y: 19 }),
                mirrorAcrossDiagonal({ x: 20, y: 18.5 }),
                mirrorAcrossDiagonal({ x: 17.5, y: 18.5 }),
                mirrorAcrossDiagonal({ x: 17.5, y: 17.5 }),
                mirrorAcrossDiagonal({ x: 17, y: 17.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "search_and_destroy",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_6 = {
    id: "uktc_6",
    category: "UKTC",
    name: "UKTC 6",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            "id": "shape_1",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 5,
                    "y": 36
                },
                {
                    "x": 12.200279,
                    "y": 32.400380
                },
                {
                    "x": 14,
                    "y": 36
                },
                {
                    "x": 6.799721,
                    "y": 39.599620
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_2",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 8,
                    "y": 22
                },
                {
                    "x": 11.238242,
                    "y": 25.809697
                },
                {
                    "x": 7.428546,
                    "y": 29.047939
                },
                {
                    "x": 4.190303,
                    "y": 25.238242
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_3",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 11,
                    "y": 19.45
                },
                {
                    "x": 8,
                    "y": 22
                },

                {
                    "x": 13.1,
                    "y": 28
                },
                {
                    "x": 16.1,
                    "y": 25.45
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_4",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 19,
                    "y": 34.2
                },
                {
                    "x": 19,
                    "y": 41
                },
                {
                    "x": 21,
                    "y": 41
                },
                {
                    "x": 21,
                    "y": 36
                },
                {
                    "x": 27.7,
                    "y": 36
                },
                {
                    "x": 27.7,
                    "y": 34.2
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 38,
                    "y": 34
                },
                {
                    "x": 38,
                    "y": 26
                },
                {
                    "x": 30,
                    "y": 26
                },
                {
                    "x": 30,
                    "y": 34
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_6",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 30,
                    "y": 29
                },
                {
                    "x": 21,
                    "y": 29
                },
                {
                    "x": 21,
                    "y": 26
                },
                {
                    "x": 30,
                    "y": 26
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_7",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 43.1,
                    "y": 34.98
                },
                {
                    "x": 46.98,
                    "y": 29.53
                },
                {
                    "x": 54.03,
                    "y": 34.56
                },
                {
                    "x": 53,
                    "y": 36
                },
                {
                    "x": 47.39,
                    "y": 32
                },
                {
                    "x": 44.53,
                    "y": 36
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_8",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 49,
                    "y": 24.55
                },
                {
                    "x": 52,
                    "y": 22
                },
                {
                    "x": 46.9,
                    "y": 16
                },
                {
                    "x": 43.9,
                    "y": 18.55
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_9",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 52,
                    "y": 22
                },
                {
                    "x": 48.761758,
                    "y": 18.190303
                },
                {
                    "x": 52.571454,
                    "y": 14.952061
                },
                {
                    "x": 55.809697,
                    "y": 18.761758
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_10",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 39,
                    "y": 18
                },
                {
                    "x": 30,
                    "y": 18
                },
                {
                    "x": 30,
                    "y": 15
                },
                {
                    "x": 39,
                    "y": 15
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_11",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 30,
                    "y": 18
                },
                {
                    "x": 22,
                    "y": 18
                },
                {
                    "x": 22,
                    "y": 10
                },
                {
                    "x": 30,
                    "y": 10
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_12",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 16.9,
                    "y": 9.02
                },
                {
                    "x": 13.02,
                    "y": 14.47
                },
                {
                    "x": 5.97,
                    "y": 9.44
                },
                {
                    "x": 7,
                    "y": 8
                },
                {
                    "x": 12.61,
                    "y": 12
                },
                {
                    "x": 15.47,
                    "y": 8
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_13",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 32.5,
                    "y": 9.8
                },
                {
                    "x": 41,
                    "y": 9.8
                },
                {
                    "x": 41,
                    "y": 2.8
                },
                {
                    "x": 39,
                    "y": 2.8
                },
                {
                    "x": 39,
                    "y": 8
                },
                {
                    "x": 32.5,
                    "y": 8
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 55,
                    "y": 8
                },
                {
                    "x": 47.799721,
                    "y": 11.599620
                },
                {
                    "x": 46,
                    "y": 8
                },
                {
                    "x": 53.200279,
                    "y": 4.400380
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        // ruin_1: L wall on shape_1 (~4×8 rotated), corner at B(12.2,32.4)
        {
            id: "ruin_1", type: "gray_striped", shape: "polygon",
            points: [
                { x: 5, y: 36 },
                { x: 12.2, y: 32.4 },
                { x: 14, y: 36 },
                { x: 13.55, y: 36.22 },
                { x: 11.98, y: 33.07 },
                { x: 5.22, y: 36.45 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_3: L wall on shape_3 (~4×8 rotated), corner at A(11,19.45)
        {
            id: "ruin_3", type: "gray_striped", shape: "polygon",
            points: [
                { x: 8, y: 22 },
                { x: 11, y: 19.45 },
                { x: 16.1, y: 25.45 },
                { x: 15.72, y: 25.77 },
                { x: 10.94, y: 20.15 },
                { x: 8.32, y: 22.38 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_5: L wall on shape_5 (8×8), corner at (38,26)
        {
            id: "ruin_5", type: "gray_striped", shape: "polygon",
            points: [
                { x: 38, y: 34 },
                { x: 38, y: 26 },
                { x: 30, y: 26 },
                { x: 30, y: 26.5 },
                { x: 37.5, y: 26.5 },
                { x: 37.5, y: 34 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_6a: blue stub on shape_6 (9×3), BL corner (21,29)
        {
            id: "ruin_6a", type: "blue_dotted", shape: "polygon",
            points: [
                { x: 21, y: 29 },
                { x: 24, y: 29 },
                { x: 24, y: 28.5 },
                { x: 21.5, y: 28.5 },
                { x: 21.5, y: 27.5 },
                { x: 21, y: 27.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_6b: blue stub on shape_6 (9×3), TR corner (30,26)
        {
            id: "ruin_6b", type: "blue_dotted", shape: "polygon",
            points: [
                { x: 30, y: 26 },
                { x: 27, y: 26 },
                { x: 27, y: 26.5 },
                { x: 29.5, y: 26.5 },
                { x: 29.5, y: 27.5 },
                { x: 30, y: 27.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_8: mirror of ruin_3 (shape_8)
        {
            id: "ruin_8", type: "gray_striped", shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 8, y: 22 }),
                mirrorAcrossDiagonal({ x: 11, y: 19.45 }),
                mirrorAcrossDiagonal({ x: 16.1, y: 25.45 }),
                mirrorAcrossDiagonal({ x: 15.72, y: 25.77 }),
                mirrorAcrossDiagonal({ x: 10.94, y: 20.15 }),
                mirrorAcrossDiagonal({ x: 8.32, y: 22.38 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_10a: mirror of ruin_6a (shape_10)
        {
            id: "ruin_10a", type: "blue_dotted", shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 21, y: 29 }),
                mirrorAcrossDiagonal({ x: 24, y: 29 }),
                mirrorAcrossDiagonal({ x: 24, y: 28.5 }),
                mirrorAcrossDiagonal({ x: 21.5, y: 28.5 }),
                mirrorAcrossDiagonal({ x: 21.5, y: 27.5 }),
                mirrorAcrossDiagonal({ x: 21, y: 27.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_10b: mirror of ruin_6b (shape_10)
        {
            id: "ruin_10b", type: "blue_dotted", shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 30, y: 26 }),
                mirrorAcrossDiagonal({ x: 27, y: 26 }),
                mirrorAcrossDiagonal({ x: 27, y: 26.5 }),
                mirrorAcrossDiagonal({ x: 29.5, y: 26.5 }),
                mirrorAcrossDiagonal({ x: 29.5, y: 27.5 }),
                mirrorAcrossDiagonal({ x: 30, y: 27.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_11: mirror of ruin_5 (shape_11)
        {
            id: "ruin_11", type: "gray_striped", shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 38, y: 34 }),
                mirrorAcrossDiagonal({ x: 38, y: 26 }),
                mirrorAcrossDiagonal({ x: 30, y: 26 }),
                mirrorAcrossDiagonal({ x: 30, y: 26.5 }),
                mirrorAcrossDiagonal({ x: 37.5, y: 26.5 }),
                mirrorAcrossDiagonal({ x: 37.5, y: 34 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_14: mirror of ruin_1 (shape_14)
        {
            id: "ruin_14", type: "gray_striped", shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 36 }),
                mirrorAcrossDiagonal({ x: 12.2, y: 32.4 }),
                mirrorAcrossDiagonal({ x: 14, y: 36 }),
                mirrorAcrossDiagonal({ x: 13.55, y: 36.22 }),
                mirrorAcrossDiagonal({ x: 11.98, y: 33.07 }),
                mirrorAcrossDiagonal({ x: 5.22, y: 36.45 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "sweeping_engagement",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_7 = {
    id: "uktc_7",
    category: "UKTC",
    name: "UKTC 7",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            "id": "shape_1",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 8,
                    "y": 10
                },
                {
                    "x": 14.89,
                    "y": 10
                },
                {
                    "x": 14.89,
                    "y": 5.0
                },
                {
                    "x": 16.66,
                    "y": 5.0
                },
                {
                    "x": 16.66,
                    "y": 11.77
                },
                {
                    "x": 8,
                    "y": 11.77
                }

            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_2",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 52,
                    "y": 34
                },
                {
                    "x": 45.11,
                    "y": 34
                },
                {
                    "x": 45.11,
                    "y": 39
                },
                {
                    "x": 43.34,
                    "y": 39
                },
                {
                    "x": 43.34,
                    "y": 32.23
                },
                {
                    "x": 52,
                    "y": 32.23
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_3",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 56,
                    "y": 10.77
                },
                {
                    "x": 49.11,
                    "y": 10.77
                },
                {
                    "x": 49.11,
                    "y": 15.77
                },
                {
                    "x": 47.34,
                    "y": 15.77
                },
                {
                    "x": 47.34,
                    "y": 9
                },
                {
                    "x": 56,
                    "y": 9
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_4",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 4,
                    "y": 33.23
                },
                {
                    "x": 10.89,
                    "y": 33.23
                },
                {
                    "x": 10.89,
                    "y": 28.23
                },
                {
                    "x": 12.66,
                    "y": 28.23
                },
                {
                    "x": 12.66,
                    "y": 35
                },
                {
                    "x": 4,
                    "y": 35
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 35,
                    "y": 5
                },
                {
                    "x": 39,
                    "y": 5
                },
                {
                    "x": 39,
                    "y": 13
                },
                {
                    "x": 35,
                    "y": 13
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_6",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25,
                    "y": 39
                },
                {
                    "x": 21,
                    "y": 39
                },
                {
                    "x": 21,
                    "y": 31
                },
                {
                    "x": 25,
                    "y": 31
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_7",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 35,
                    "y": 5
                },
                {
                    "x": 30,
                    "y": 5
                },
                {
                    "x": 30,
                    "y": 0
                },
                {
                    "x": 35,
                    "y": 0
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_8",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25,
                    "y": 39
                },
                {
                    "x": 30,
                    "y": 39
                },
                {
                    "x": 30,
                    "y": 44
                },
                {
                    "x": 25,
                    "y": 44
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_9",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 15,
                    "y": 22
                },
                {
                    "x": 19.43,
                    "y": 15.49
                },
                {
                    "x": 25.94,
                    "y": 19.92
                },
                {
                    "x": 21.51,
                    "y": 26.43
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_10",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 45,
                    "y": 22
                },
                {
                    "x": 40.57,
                    "y": 28.51
                },
                {
                    "x": 34.06,
                    "y": 24.08
                },
                {
                    "x": 38.49,
                    "y": 17.57
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_11",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25.94,
                    "y": 19.92
                },
                {
                    "x": 23.46,
                    "y": 18.23
                },
                {
                    "x": 28.52,
                    "y": 10.79
                },
                {
                    "x": 31.00,
                    "y": 12.48
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_12",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 34.06,
                    "y": 24.08
                },
                {
                    "x": 36.54,
                    "y": 25.77
                },
                {
                    "x": 31.48,
                    "y": 33.21
                },
                {
                    "x": 29.00,
                    "y": 31.52
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_13",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 4,
                    "y": 23
                },
                {
                    "x": 8,
                    "y": 16
                },
                {
                    "x": 11.42,
                    "y": 17.95
                },
                {
                    "x": 7.42,
                    "y": 24.95
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 56,
                    "y": 21
                },
                {
                    "x": 52,
                    "y": 28
                },
                {
                    "x": 48.58,
                    "y": 26.05
                },
                {
                    "x": 52.58,
                    "y": 19.05
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        // ruin_5: L wall on shape_5 (4×8 rect), corner at (39,13)
        {
            "id": "ruin_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 39, "y": 5 },
                { "x": 39, "y": 13 },
                { "x": 35, "y": 13 },
                { "x": 35, "y": 12.5 },
                { "x": 38.5, "y": 12.5 },
                { "x": 38.5, "y": 5 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_6: mirror of ruin_5 (shape_6)
        {
            "id": "ruin_6",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 21, "y": 39 },
                { "x": 21, "y": 31 },
                { "x": 25, "y": 31 },
                { "x": 25, "y": 31.5 },
                { "x": 21.5, "y": 31.5 },
                { "x": 21.5, "y": 39 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_9: L wall on shape_9 (8×8 rotated), corner at D(21.51,26.43)
        {
            "id": "ruin_9",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 15, "y": 22 },
                { "x": 21.51, "y": 26.43 },
                { "x": 25.94, "y": 19.92 },
                { "x": 25.53, "y": 19.64 },
                { "x": 21.38, "y": 25.74 },
                { "x": 15.28, "y": 21.59 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_10: mirror of ruin_9 (shape_10)
        {
            "id": "ruin_10",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 45, "y": 22 },
                { "x": 38.49, "y": 17.57 },
                { "x": 34.06, "y": 24.08 },
                { "x": 34.47, "y": 24.36 },
                { "x": 38.62, "y": 18.26 },
                { "x": 44.72, "y": 22.41 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_11a: blue stub on shape_11 (3×9 rotated), corner A
        {
            "id": "ruin_11a",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 24.70, "y": 19.08 },
                { "x": 25.94, "y": 19.92 },
                { "x": 27.63, "y": 17.44 },
                { "x": 27.22, "y": 17.16 },
                { "x": 25.81, "y": 19.23 },
                { "x": 24.98, "y": 18.67 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_11b: blue stub on shape_11 (3×9 rotated), corner C
        {
            "id": "ruin_11b",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 29.76, "y": 11.63 },
                { "x": 28.52, "y": 10.79 },
                { "x": 26.83, "y": 13.27 },
                { "x": 27.24, "y": 13.55 },
                { "x": 28.65, "y": 11.48 },
                { "x": 29.48, "y": 12.04 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_12a: mirror of ruin_11a (shape_12)
        {
            "id": "ruin_12a",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 35.30, "y": 24.92 },
                { "x": 34.06, "y": 24.08 },
                { "x": 32.37, "y": 26.56 },
                { "x": 32.78, "y": 26.84 },
                { "x": 34.19, "y": 24.77 },
                { "x": 35.02, "y": 25.33 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_12b: mirror of ruin_11b (shape_12)
        {
            "id": "ruin_12b",
            "type": "blue_dotted",
            "shape": "polygon",
            "points": [
                { "x": 30.24, "y": 32.37 },
                { "x": 31.48, "y": 33.21 },
                { "x": 33.17, "y": 30.73 },
                { "x": 32.76, "y": 30.45 },
                { "x": 31.35, "y": 32.52 },
                { "x": 30.52, "y": 31.96 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_13: L wall on shape_13 (4×8 rotated), corner C(11.42,17.95)
        {
            "id": "ruin_13",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 8, "y": 16 },
                { "x": 11.42, "y": 17.95 },
                { "x": 7.42, "y": 24.95 },
                { "x": 6.99, "y": 24.70 },
                { "x": 10.74, "y": 18.14 },
                { "x": 7.75, "y": 16.43 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_14: mirror of ruin_13 (shape_14)
        {
            "id": "ruin_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                { "x": 52, "y": 28 },
                { "x": 48.58, "y": 26.05 },
                { "x": 52.58, "y": 19.05 },
                { "x": 53.01, "y": 19.30 },
                { "x": 49.26, "y": 25.86 },
                { "x": 52.25, "y": 27.57 }
            ],
            "traits": ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "crucible_of_battle",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_8 = {
    id: "uktc_8",
    category: "UKTC",
    name: "UKTC 8",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "shape_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 17 },
                { x: 9, y: 17 },
                { x: 9, y: 25 },
                { x: 5, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 25 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 7, y: 39 },
                { x: 11, y: 39 },
                { x: 11, y: 31 },
                { x: 7, y: 31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 7, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_5",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 31, y: 9 },
                { x: 36, y: 9 },
                { x: 36, y: 4 },
                { x: 31, y: 4 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_6",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 31, y: 9 }),
                mirrorAcrossDiagonal({ x: 36, y: 9 }),
                mirrorAcrossDiagonal({ x: 36, y: 4 }),
                mirrorAcrossDiagonal({ x: 31, y: 4 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_7",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 31, y: 9 },
                { x: 23, y: 9 },
                { x: 23, y: 17 },
                { x: 31, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_8",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 31, y: 9 }),
                mirrorAcrossDiagonal({ x: 23, y: 9 }),
                mirrorAcrossDiagonal({ x: 23, y: 17 }),
                mirrorAcrossDiagonal({ x: 31, y: 17 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_9",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 23, y: 17 },
                { x: 14, y: 17 },
                { x: 14, y: 20 },
                { x: 23, y: 20 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_10",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23, y: 17 }),
                mirrorAcrossDiagonal({ x: 14, y: 17 }),
                mirrorAcrossDiagonal({ x: 14, y: 20 }),
                mirrorAcrossDiagonal({ x: 23, y: 20 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_11",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 10 },
                { x: 12, y: 10 },
                { x: 12, y: 5 },
                { x: 13.77, y: 5 },
                { x: 13.77, y: 11.69 },
                { x: 5, y: 11.69 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_12",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 10 }),
                mirrorAcrossDiagonal({ x: 12, y: 10 }),
                mirrorAcrossDiagonal({ x: 12, y: 5 }),
                mirrorAcrossDiagonal({ x: 13.77, y: 5 }),
                mirrorAcrossDiagonal({ x: 13.77, y: 11.69 }),
                mirrorAcrossDiagonal({ x: 5, y: 11.69 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_13",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 41, y: 9 },
                { x: 41, y: 16 },
                { x: 46, y: 16 },
                { x: 46, y: 17.77 },
                { x: 39.23, y: 17.77 },
                { x: 39.23, y: 9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_14",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 41, y: 9 }),
                mirrorAcrossDiagonal({ x: 41, y: 16 }),
                mirrorAcrossDiagonal({ x: 46, y: 16 }),
                mirrorAcrossDiagonal({ x: 46, y: 17.77 }),
                mirrorAcrossDiagonal({ x: 39.23, y: 17.77 }),
                mirrorAcrossDiagonal({ x: 39.23, y: 9 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_1: L wall on shape_1 (4×8, left mid), corner at (9,25)
        {
            id: "ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 9, y: 17 },
                { x: 9, y: 25 },
                { x: 5, y: 25 },
                { x: 5, y: 24.5 },
                { x: 8.5, y: 24.5 },
                { x: 8.5, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_2: mirror of ruin_1 (shape_2)
        {
            id: "ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 9, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 24.5 }),
                mirrorAcrossDiagonal({ x: 8.5, y: 24.5 }),
                mirrorAcrossDiagonal({ x: 8.5, y: 17 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_3: L wall on shape_3 (4×8, left bottom), corner at (11,31)
        {
            id: "ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 11, y: 39 },
                { x: 11, y: 31 },
                { x: 7, y: 31 },
                { x: 7, y: 31.5 },
                { x: 10.5, y: 31.5 },
                { x: 10.5, y: 39 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_4: mirror of ruin_3 (shape_4)
        {
            id: "ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 11, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31.5 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 31.5 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 39 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_7: L wall on shape_7 (8×8, center top), corner at (31,17)
        {
            id: "ruin_7",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 31, y: 9 },
                { x: 31, y: 17 },
                { x: 23, y: 17 },
                { x: 23, y: 16.5 },
                { x: 30.5, y: 16.5 },
                { x: 30.5, y: 9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_8: mirror of ruin_7 (shape_8)
        {
            id: "ruin_8",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 31, y: 9 }),
                mirrorAcrossDiagonal({ x: 31, y: 17 }),
                mirrorAcrossDiagonal({ x: 23, y: 17 }),
                mirrorAcrossDiagonal({ x: 23, y: 16.5 }),
                mirrorAcrossDiagonal({ x: 30.5, y: 16.5 }),
                mirrorAcrossDiagonal({ x: 30.5, y: 9 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_9a: blue stub on shape_9 (9×3), TR corner (23,17)
        {
            id: "ruin_9a",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 23, y: 17 },
                { x: 20, y: 17 },
                { x: 20, y: 17.5 },
                { x: 22.5, y: 17.5 },
                { x: 22.5, y: 18.5 },
                { x: 23, y: 18.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_9b: blue stub on shape_9 (9×3), BL corner (14,20)
        {
            id: "ruin_9b",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 14, y: 20 },
                { x: 17, y: 20 },
                { x: 17, y: 19.5 },
                { x: 14.5, y: 19.5 },
                { x: 14.5, y: 18.5 },
                { x: 14, y: 18.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_10a: mirror of ruin_9a (shape_10)
        {
            id: "ruin_10a",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 23, y: 17 }),
                mirrorAcrossDiagonal({ x: 20, y: 17 }),
                mirrorAcrossDiagonal({ x: 20, y: 17.5 }),
                mirrorAcrossDiagonal({ x: 22.5, y: 17.5 }),
                mirrorAcrossDiagonal({ x: 22.5, y: 18.5 }),
                mirrorAcrossDiagonal({ x: 23, y: 18.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_10b: mirror of ruin_9b (shape_10)
        {
            id: "ruin_10b",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 14, y: 20 }),
                mirrorAcrossDiagonal({ x: 17, y: 20 }),
                mirrorAcrossDiagonal({ x: 17, y: 19.5 }),
                mirrorAcrossDiagonal({ x: 14.5, y: 19.5 }),
                mirrorAcrossDiagonal({ x: 14.5, y: 18.5 }),
                mirrorAcrossDiagonal({ x: 14, y: 18.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "hidden_supplies",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_9 = {
    id: "uktc_9",
    category: "UKTC",
    name: "UKTC 9",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            "id": "shape_1",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 8,
                    "y": 10
                },
                {
                    "x": 14.89,
                    "y": 10
                },
                {
                    "x": 14.89,
                    "y": 5.0
                },
                {
                    "x": 16.66,
                    "y": 5.0
                },
                {
                    "x": 16.66,
                    "y": 11.77
                },
                {
                    "x": 8,
                    "y": 11.77
                }

            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_2",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 52,
                    "y": 34
                },
                {
                    "x": 45.11,
                    "y": 34
                },
                {
                    "x": 45.11,
                    "y": 39
                },
                {
                    "x": 43.34,
                    "y": 39
                },
                {
                    "x": 43.34,
                    "y": 32.23
                },
                {
                    "x": 52,
                    "y": 32.23
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_3",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 56,
                    "y": 10.77
                },
                {
                    "x": 49.11,
                    "y": 10.77
                },
                {
                    "x": 49.11,
                    "y": 15.77
                },
                {
                    "x": 47.34,
                    "y": 15.77
                },
                {
                    "x": 47.34,
                    "y": 9
                },
                {
                    "x": 56,
                    "y": 9
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_4",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 4,
                    "y": 33.23
                },
                {
                    "x": 10.89,
                    "y": 33.23
                },
                {
                    "x": 10.89,
                    "y": 28.23
                },
                {
                    "x": 12.66,
                    "y": 28.23
                },
                {
                    "x": 12.66,
                    "y": 35
                },
                {
                    "x": 4,
                    "y": 35
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_5",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 35,
                    "y": 5
                },
                {
                    "x": 39,
                    "y": 5
                },
                {
                    "x": 39,
                    "y": 13
                },
                {
                    "x": 35,
                    "y": 13
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_6",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25,
                    "y": 39
                },
                {
                    "x": 21,
                    "y": 39
                },
                {
                    "x": 21,
                    "y": 31
                },
                {
                    "x": 25,
                    "y": 31
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_7",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 35,
                    "y": 5
                },
                {
                    "x": 30,
                    "y": 5
                },
                {
                    "x": 30,
                    "y": 0
                },
                {
                    "x": 35,
                    "y": 0
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_8",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25,
                    "y": 39
                },
                {
                    "x": 30,
                    "y": 39
                },
                {
                    "x": 30,
                    "y": 44
                },
                {
                    "x": 25,
                    "y": 44
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_9",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 15,
                    "y": 22
                },
                {
                    "x": 19.43,
                    "y": 15.49
                },
                {
                    "x": 25.94,
                    "y": 19.92
                },
                {
                    "x": 21.51,
                    "y": 26.43
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_10",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 45,
                    "y": 22
                },
                {
                    "x": 40.57,
                    "y": 28.51
                },
                {
                    "x": 34.06,
                    "y": 24.08
                },
                {
                    "x": 38.49,
                    "y": 17.57
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_11",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 25.94,
                    "y": 19.92
                },
                {
                    "x": 23.46,
                    "y": 18.23
                },
                {
                    "x": 28.52,
                    "y": 10.79
                },
                {
                    "x": 31.00,
                    "y": 12.48
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_12",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 34.06,
                    "y": 24.08
                },
                {
                    "x": 36.54,
                    "y": 25.77
                },
                {
                    "x": 31.48,
                    "y": 33.21
                },
                {
                    "x": 29.00,
                    "y": 31.52
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_13",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 4,
                    "y": 23
                },
                {
                    "x": 8,
                    "y": 16
                },
                {
                    "x": 11.42,
                    "y": 17.95
                },
                {
                    "x": 7.42,
                    "y": 24.95
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        {
            "id": "shape_14",
            "type": "gray_striped",
            "shape": "polygon",
            "points": [
                {
                    "x": 56,
                    "y": 21
                },
                {
                    "x": 52,
                    "y": 28
                },
                {
                    "x": 48.58,
                    "y": 26.05
                },
                {
                    "x": 52.58,
                    "y": 19.05
                }
            ],
            "traits": [
                "Defensible",
                "Obscuring"
            ]
        },
        // ruin_5: L wall on shape_5 (4×8 rect), corner at (39,13)
        {
            "id": "ruin_5", "type": "gray_striped", "shape": "polygon",
            "points": [
                { "x": 39, "y": 5 },
                { "x": 39, "y": 13 },
                { "x": 35, "y": 13 },
                { "x": 35, "y": 12.5 },
                { "x": 38.5, "y": 12.5 },
                { "x": 38.5, "y": 5 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_6: mirror of ruin_5 (shape_6)
        {
            "id": "ruin_6", "type": "gray_striped", "shape": "polygon",
            "points": [
                { "x": 21, "y": 39 },
                { "x": 21, "y": 31 },
                { "x": 25, "y": 31 },
                { "x": 25, "y": 31.5 },
                { "x": 21.5, "y": 31.5 },
                { "x": 21.5, "y": 39 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_9: L wall on shape_9 (8×8 rotated), corner at D(21.51,26.43)
        {
            "id": "ruin_9", "type": "gray_striped", "shape": "polygon",
            "points": [
                { "x": 15, "y": 22 },
                { "x": 21.51, "y": 26.43 },
                { "x": 25.94, "y": 19.92 },
                { "x": 25.53, "y": 19.64 },
                { "x": 21.38, "y": 25.74 },
                { "x": 15.28, "y": 21.59 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_10: mirror of ruin_9 (shape_10)
        {
            "id": "ruin_10", "type": "gray_striped", "shape": "polygon",
            "points": [
                { "x": 45, "y": 22 },
                { "x": 38.49, "y": 17.57 },
                { "x": 34.06, "y": 24.08 },
                { "x": 34.47, "y": 24.36 },
                { "x": 38.62, "y": 18.26 },
                { "x": 44.72, "y": 22.41 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_11a: blue stub on shape_11 (3×9 rotated), corner A
        {
            "id": "ruin_11a", "type": "blue_dotted", "shape": "polygon",
            "points": [
                { "x": 24.70, "y": 19.08 },
                { "x": 25.94, "y": 19.92 },
                { "x": 27.63, "y": 17.44 },
                { "x": 27.22, "y": 17.16 },
                { "x": 25.81, "y": 19.23 },
                { "x": 24.98, "y": 18.67 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_11b: blue stub on shape_11 (3×9 rotated), corner C
        {
            "id": "ruin_11b", "type": "blue_dotted", "shape": "polygon",
            "points": [
                { "x": 29.76, "y": 11.63 },
                { "x": 28.52, "y": 10.79 },
                { "x": 26.83, "y": 13.27 },
                { "x": 27.24, "y": 13.55 },
                { "x": 28.65, "y": 11.48 },
                { "x": 29.48, "y": 12.04 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_12a: mirror of ruin_11a (shape_12)
        {
            "id": "ruin_12a", "type": "blue_dotted", "shape": "polygon",
            "points": [
                { "x": 35.30, "y": 24.92 },
                { "x": 34.06, "y": 24.08 },
                { "x": 32.37, "y": 26.56 },
                { "x": 32.78, "y": 26.84 },
                { "x": 34.19, "y": 24.77 },
                { "x": 35.02, "y": 25.33 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_12b: mirror of ruin_11b (shape_12)
        {
            "id": "ruin_12b", "type": "blue_dotted", "shape": "polygon",
            "points": [
                { "x": 30.24, "y": 32.37 },
                { "x": 31.48, "y": 33.21 },
                { "x": 33.17, "y": 30.73 },
                { "x": 32.76, "y": 30.45 },
                { "x": 31.35, "y": 32.52 },
                { "x": 30.52, "y": 31.96 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_13: L wall on shape_13 (4×8 rotated), corner C(11.42,17.95)
        {
            "id": "ruin_13", "type": "gray_striped", "shape": "polygon",
            "points": [
                { "x": 8, "y": 16 },
                { "x": 11.42, "y": 17.95 },
                { "x": 7.42, "y": 24.95 },
                { "x": 6.99, "y": 24.70 },
                { "x": 10.74, "y": 18.14 },
                { "x": 7.75, "y": 16.43 }
            ],
            "traits": ["Defensible", "Obscuring"]
        },
        // ruin_14: mirror of ruin_13 (shape_14)
        {
            "id": "ruin_14", "type": "gray_striped", "shape": "polygon",
            "points": [
                { "x": 52, "y": 28 },
                { "x": 48.58, "y": 26.05 },
                { "x": 52.58, "y": 19.05 },
                { "x": 53.01, "y": 19.30 },
                { "x": 49.26, "y": 25.86 },
                { "x": 52.25, "y": 27.57 }
            ],
            "traits": ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "crucible_of_battle",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

const UKTC_LAYOUT_10 = {
    id: "uktc_10",
    category: "UKTC",
    name: "UKTC 10",
    boardWidth: 60,
    boardHeight: 44,
    centerX: 30,
    centerY: 22,
    terrain: [
        {
            id: "shape_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 17 },
                { x: 9, y: 17 },
                { x: 9, y: 25 },
                { x: 5, y: 25 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 25 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 7, y: 39 },
                { x: 11, y: 39 },
                { x: 11, y: 31 },
                { x: 7, y: 31 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 7, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_5",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 29, y: 8 },
                { x: 29, y: 3 },
                { x: 34, y: 3 },
                { x: 34, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_6",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 29, y: 8 }),
                mirrorAcrossDiagonal({ x: 29, y: 3 }),
                mirrorAcrossDiagonal({ x: 34, y: 3 }),
                mirrorAcrossDiagonal({ x: 34, y: 8 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_7",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 34, y: 8 },
                { x: 26, y: 8 },
                { x: 26, y: 16 },
                { x: 34, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_8",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 34, y: 8 }),
                mirrorAcrossDiagonal({ x: 26, y: 8 }),
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 34, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_9",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 26, y: 16 },
                { x: 26, y: 19 },
                { x: 17, y: 19 },
                { x: 17, y: 16 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_10",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 26, y: 19 }),
                mirrorAcrossDiagonal({ x: 17, y: 19 }),
                mirrorAcrossDiagonal({ x: 17, y: 16 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_11",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 5, y: 10 },
                { x: 12, y: 10 },
                { x: 12, y: 5 },
                { x: 13.77, y: 5 },
                { x: 13.77, y: 11.69 },
                { x: 5, y: 11.69 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_12",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 5, y: 10 }),
                mirrorAcrossDiagonal({ x: 12, y: 10 }),
                mirrorAcrossDiagonal({ x: 12, y: 5 }),
                mirrorAcrossDiagonal({ x: 13.77, y: 5 }),
                mirrorAcrossDiagonal({ x: 13.77, y: 11.69 }),
                mirrorAcrossDiagonal({ x: 5, y: 11.69 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_13",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 41, y: 9 },
                { x: 41, y: 16 },
                { x: 46, y: 16 },
                { x: 46, y: 17.77 },
                { x: 39.23, y: 17.77 },
                { x: 39.23, y: 9 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        {
            id: "shape_14",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 41, y: 9 }),
                mirrorAcrossDiagonal({ x: 41, y: 16 }),
                mirrorAcrossDiagonal({ x: 46, y: 16 }),
                mirrorAcrossDiagonal({ x: 46, y: 17.77 }),
                mirrorAcrossDiagonal({ x: 39.23, y: 17.77 }),
                mirrorAcrossDiagonal({ x: 39.23, y: 9 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_1: L wall on shape_1 (4×8, left mid), corner at (9,25)
        {
            id: "ruin_1",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 9, y: 17 },
                { x: 9, y: 25 },
                { x: 5, y: 25 },
                { x: 5, y: 24.5 },
                { x: 8.5, y: 24.5 },
                { x: 8.5, y: 17 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_2: mirror of ruin_1 (shape_2)
        {
            id: "ruin_2",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 9, y: 17 }),
                mirrorAcrossDiagonal({ x: 9, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 25 }),
                mirrorAcrossDiagonal({ x: 5, y: 24.5 }),
                mirrorAcrossDiagonal({ x: 8.5, y: 24.5 }),
                mirrorAcrossDiagonal({ x: 8.5, y: 17 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_3: L wall on shape_3 (4×8, left bottom), corner at (11,31)
        {
            id: "ruin_3",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 11, y: 39 },
                { x: 11, y: 31 },
                { x: 7, y: 31 },
                { x: 7, y: 31.5 },
                { x: 10.5, y: 31.5 },
                { x: 10.5, y: 39 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_4: mirror of ruin_3 (shape_4)
        {
            id: "ruin_4",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 11, y: 39 }),
                mirrorAcrossDiagonal({ x: 11, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31 }),
                mirrorAcrossDiagonal({ x: 7, y: 31.5 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 31.5 }),
                mirrorAcrossDiagonal({ x: 10.5, y: 39 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_7: L wall on shape_7 (8×8, center top), corner at (34,16)
        {
            id: "ruin_7",
            type: "gray_striped",
            shape: "polygon",
            points: [
                { x: 34, y: 8 },
                { x: 34, y: 16 },
                { x: 26, y: 16 },
                { x: 26, y: 15.5 },
                { x: 33.5, y: 15.5 },
                { x: 33.5, y: 8 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_8: mirror of ruin_7 (shape_8)
        {
            id: "ruin_8",
            type: "gray_striped",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 34, y: 8 }),
                mirrorAcrossDiagonal({ x: 34, y: 16 }),
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 26, y: 15.5 }),
                mirrorAcrossDiagonal({ x: 33.5, y: 15.5 }),
                mirrorAcrossDiagonal({ x: 33.5, y: 8 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_9a: blue stub on shape_9 (9×3), TR corner (26,16)
        {
            id: "ruin_9a",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 26, y: 16 },
                { x: 23, y: 16 },
                { x: 23, y: 16.5 },
                { x: 25.5, y: 16.5 },
                { x: 25.5, y: 17.5 },
                { x: 26, y: 17.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_9b: blue stub on shape_9 (9×3), BL corner (17,19)
        {
            id: "ruin_9b",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                { x: 17, y: 19 },
                { x: 20, y: 19 },
                { x: 20, y: 18.5 },
                { x: 17.5, y: 18.5 },
                { x: 17.5, y: 17.5 },
                { x: 17, y: 17.5 }
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_10a: mirror of ruin_9a (shape_10)
        {
            id: "ruin_10a",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 26, y: 16 }),
                mirrorAcrossDiagonal({ x: 23, y: 16 }),
                mirrorAcrossDiagonal({ x: 23, y: 16.5 }),
                mirrorAcrossDiagonal({ x: 25.5, y: 16.5 }),
                mirrorAcrossDiagonal({ x: 25.5, y: 17.5 }),
                mirrorAcrossDiagonal({ x: 26, y: 17.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        },
        // ruin_10b: mirror of ruin_9b (shape_10)
        {
            id: "ruin_10b",
            type: "blue_dotted",
            shape: "polygon",
            points: [
                mirrorAcrossDiagonal({ x: 17, y: 19 }),
                mirrorAcrossDiagonal({ x: 20, y: 19 }),
                mirrorAcrossDiagonal({ x: 20, y: 18.5 }),
                mirrorAcrossDiagonal({ x: 17.5, y: 18.5 }),
                mirrorAcrossDiagonal({ x: 17.5, y: 17.5 }),
                mirrorAcrossDiagonal({ x: 17, y: 17.5 })
            ],
            traits: ["Defensible", "Obscuring"]
        }
    ],
    objectives: [],
    defaultDeployment: "search_and_destroy",
    deploymentZones: [
        { id: "deploy_player", type: "player", shape: "rectangle", position: { x: 0, y: 0 }, dimensions: { width: 60, height: 12 } },
        { id: "deploy_opponent", type: "opponent", shape: "rectangle", position: { x: 0, y: 32 }, dimensions: { width: 60, height: 12 } }
    ]
};

// Get all layouts
function getAllLayouts() {
    return [
        // GW Layouts
        TERRAIN_LAYOUT_1,
        TERRAIN_LAYOUT_2,
        TERRAIN_LAYOUT_3,
        TERRAIN_LAYOUT_4,
        TERRAIN_LAYOUT_5,
        TERRAIN_LAYOUT_6,
        TERRAIN_LAYOUT_7,
        TERRAIN_LAYOUT_8,
        // WTC Layouts - Sweeping Engagement
        WTC_SWEEPING_ENGAGEMENT_1,
        WTC_SWEEPING_ENGAGEMENT_2,
        WTC_SWEEPING_ENGAGEMENT_3,
        WTC_SWEEPING_ENGAGEMENT_4,
        WTC_SWEEPING_ENGAGEMENT_5,
        WTC_SWEEPING_ENGAGEMENT_6,
        // WTC Layouts - Dawn of War
        WTC_DAWN_OF_WAR_1,
        WTC_DAWN_OF_WAR_2,
        WTC_DAWN_OF_WAR_3,
        WTC_DAWN_OF_WAR_4,
        WTC_DAWN_OF_WAR_5,
        WTC_DAWN_OF_WAR_6,
        // WTC Layouts - Tipping Point
        WTC_TIPPING_POINT_1,
        WTC_TIPPING_POINT_2,
        WTC_TIPPING_POINT_3,
        WTC_TIPPING_POINT_4_5,
        WTC_TIPPING_POINT_6,
        WTC_TIPPING_POINT_7,
        WTC_TIPPING_POINT_8,
        // WTC Layouts - Search and Destroy
        WTC_SEARCH_AND_DESTROY_1,
        WTC_SEARCH_AND_DESTROY_2,
        WTC_SEARCH_AND_DESTROY_3,
        WTC_SEARCH_AND_DESTROY_4_5,
        WTC_SEARCH_AND_DESTROY_6,
        WTC_SEARCH_AND_DESTROY_7,
        WTC_SEARCH_AND_DESTROY_8,
        // WTC Layouts - Crucible of Battle
        WTC_CRUCIBLE_OF_BATTLE_1,
        WTC_CRUCIBLE_OF_BATTLE_2,
        WTC_CRUCIBLE_OF_BATTLE_3,
        WTC_CRUCIBLE_OF_BATTLE_4_5,
        WTC_CRUCIBLE_OF_BATTLE_6,
        WTC_CRUCIBLE_OF_BATTLE_7,
        WTC_CRUCIBLE_OF_BATTLE_8,
        // WTC Layouts - Hammer and Anvil Hidden Supplies
        WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_1,
        WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_2,
        WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_3,
        WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_4_5,
        WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_6,
        WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_7,
        WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_8,
        // WTC Layouts - Hammer and Anvil
        WTC_HAMMER_AND_ANVIL_1,
        WTC_HAMMER_AND_ANVIL_2,
        WTC_HAMMER_AND_ANVIL_3,
        WTC_HAMMER_AND_ANVIL_4_5,
        WTC_HAMMER_AND_ANVIL_6,
        WTC_HAMMER_AND_ANVIL_7,
        WTC_HAMMER_AND_ANVIL_8,
        // UKTC Layouts
        UKTC_LAYOUT_1,
        UKTC_LAYOUT_2,
        UKTC_LAYOUT_3,
        UKTC_LAYOUT_4,
        UKTC_LAYOUT_5,
        UKTC_LAYOUT_6,
        UKTC_LAYOUT_7,
        UKTC_LAYOUT_8,
        UKTC_LAYOUT_9,
        UKTC_LAYOUT_10
    ];
}

// Get layouts by category
function getLayoutsByCategory(category) {
    return getAllLayouts().filter(layout => layout.category === category);
}

// Get WTC layouts by subcategory (deployment type)
function getWTCLayoutsByDeployment(deployment) {
    return getAllLayouts().filter(layout => layout.category === "WTC" && layout.subcategory === deployment);
}

function getLayoutById(id) {
    // GW Layouts
    if (id === "gw_1" || id === "layout_1") return TERRAIN_LAYOUT_1;
    if (id === "gw_2" || id === "layout_2") return TERRAIN_LAYOUT_2;
    if (id === "gw_3" || id === "layout_3") return TERRAIN_LAYOUT_3;
    if (id === "gw_4" || id === "layout_4") return TERRAIN_LAYOUT_4;
    if (id === "gw_5" || id === "layout_5") return TERRAIN_LAYOUT_5;
    if (id === "gw_6" || id === "layout_6") return TERRAIN_LAYOUT_6;
    if (id === "gw_7" || id === "layout_7") return TERRAIN_LAYOUT_7;
    if (id === "gw_8" || id === "layout_8") return TERRAIN_LAYOUT_8;
    
    // WTC Layouts - Sweeping Engagement
    if (id === "wtc_sweeping_engagement_1") return WTC_SWEEPING_ENGAGEMENT_1;
    if (id === "wtc_sweeping_engagement_2") return WTC_SWEEPING_ENGAGEMENT_2;
    if (id === "wtc_sweeping_engagement_3") return WTC_SWEEPING_ENGAGEMENT_3;
    if (id === "wtc_sweeping_engagement_4") return WTC_SWEEPING_ENGAGEMENT_4;
    if (id === "wtc_sweeping_engagement_5") return WTC_SWEEPING_ENGAGEMENT_5;
    if (id === "wtc_sweeping_engagement_6") return WTC_SWEEPING_ENGAGEMENT_6;
    
    // WTC Layouts - Dawn of War
    if (id === "wtc_dawn_of_war_1") return WTC_DAWN_OF_WAR_1;
    if (id === "wtc_dawn_of_war_2") return WTC_DAWN_OF_WAR_2;
    if (id === "wtc_dawn_of_war_3") return WTC_DAWN_OF_WAR_3;
    if (id === "wtc_dawn_of_war_4") return WTC_DAWN_OF_WAR_4;
    if (id === "wtc_dawn_of_war_5") return WTC_DAWN_OF_WAR_5;
    if (id === "wtc_dawn_of_war_6") return WTC_DAWN_OF_WAR_6;
    
    // WTC Layouts - Tipping Point
    if (id === "wtc_tipping_point_1") return WTC_TIPPING_POINT_1;
    if (id === "wtc_tipping_point_2") return WTC_TIPPING_POINT_2;
    if (id === "wtc_tipping_point_3") return WTC_TIPPING_POINT_3;
    if (id === "wtc_tipping_point_4_5") return WTC_TIPPING_POINT_4_5;
    if (id === "wtc_tipping_point_6") return WTC_TIPPING_POINT_6;
    if (id === "wtc_tipping_point_7") return WTC_TIPPING_POINT_7;
    if (id === "wtc_tipping_point_8") return WTC_TIPPING_POINT_8;
    
    // WTC Layouts - Search and Destroy
    if (id === "wtc_search_and_destroy_1") return WTC_SEARCH_AND_DESTROY_1;
    if (id === "wtc_search_and_destroy_2") return WTC_SEARCH_AND_DESTROY_2;
    if (id === "wtc_search_and_destroy_3") return WTC_SEARCH_AND_DESTROY_3;
    if (id === "wtc_search_and_destroy_4_5") return WTC_SEARCH_AND_DESTROY_4_5;
    if (id === "wtc_search_and_destroy_6") return WTC_SEARCH_AND_DESTROY_6;
    if (id === "wtc_search_and_destroy_7") return WTC_SEARCH_AND_DESTROY_7;
    if (id === "wtc_search_and_destroy_8") return WTC_SEARCH_AND_DESTROY_8;
    
    // WTC Layouts - Crucible of Battle
    if (id === "wtc_crucible_of_battle_1") return WTC_CRUCIBLE_OF_BATTLE_1;
    if (id === "wtc_crucible_of_battle_2") return WTC_CRUCIBLE_OF_BATTLE_2;
    if (id === "wtc_crucible_of_battle_3") return WTC_CRUCIBLE_OF_BATTLE_3;
    if (id === "wtc_crucible_of_battle_4_5") return WTC_CRUCIBLE_OF_BATTLE_4_5;
    if (id === "wtc_crucible_of_battle_6") return WTC_CRUCIBLE_OF_BATTLE_6;
    if (id === "wtc_crucible_of_battle_7") return WTC_CRUCIBLE_OF_BATTLE_7;
    if (id === "wtc_crucible_of_battle_8") return WTC_CRUCIBLE_OF_BATTLE_8;
    
    // WTC Layouts - Hammer and Anvil Hidden Supplies
    if (id === "wtc_hammer_and_anvil_hidden_supplies_1") return WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_1;
    if (id === "wtc_hammer_and_anvil_hidden_supplies_2") return WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_2;
    if (id === "wtc_hammer_and_anvil_hidden_supplies_3") return WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_3;
    if (id === "wtc_hammer_and_anvil_hidden_supplies_4_5") return WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_4_5;
    if (id === "wtc_hammer_and_anvil_hidden_supplies_6") return WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_6;
    if (id === "wtc_hammer_and_anvil_hidden_supplies_7") return WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_7;
    if (id === "wtc_hammer_and_anvil_hidden_supplies_8") return WTC_HAMMER_AND_ANVIL_HIDDEN_SUPPLIES_8;
    
    // WTC Layouts - Hammer and Anvil
    if (id === "wtc_hammer_and_anvil_1") return WTC_HAMMER_AND_ANVIL_1;
    if (id === "wtc_hammer_and_anvil_2") return WTC_HAMMER_AND_ANVIL_2;
    if (id === "wtc_hammer_and_anvil_3") return WTC_HAMMER_AND_ANVIL_3;
    if (id === "wtc_hammer_and_anvil_4_5") return WTC_HAMMER_AND_ANVIL_4_5;
    if (id === "wtc_hammer_and_anvil_6") return WTC_HAMMER_AND_ANVIL_6;
    if (id === "wtc_hammer_and_anvil_7") return WTC_HAMMER_AND_ANVIL_7;
    if (id === "wtc_hammer_and_anvil_8") return WTC_HAMMER_AND_ANVIL_8;
    
    // UKTC Layouts
    if (id === "uktc_1") return UKTC_LAYOUT_1;
    if (id === "uktc_2") return UKTC_LAYOUT_2;
    if (id === "uktc_3") return UKTC_LAYOUT_3;
    if (id === "uktc_4") return UKTC_LAYOUT_4;
    if (id === "uktc_5") return UKTC_LAYOUT_5;
    if (id === "uktc_6") return UKTC_LAYOUT_6;
    if (id === "uktc_7") return UKTC_LAYOUT_7;
    if (id === "uktc_8") return UKTC_LAYOUT_8;
    if (id === "uktc_9") return UKTC_LAYOUT_9;
    if (id === "uktc_10") return UKTC_LAYOUT_10;
    
    return null;
}

/**
 * Convert units to pixels for SVG rendering
 */
function unitsToPixels(units) {
    return units * UNIT_TO_PX;
}

/**
 * Convert board coordinates (units from top-left) to SVG coordinates
 * Board starts at (0,0) in SVG - no centering offset
 */
function boardToSVG(boardX, boardY, boardHeight = BOARD_HEIGHT_UNITS) {
    return {
        x: unitsToPixels(boardX),
        y: unitsToPixels(boardHeight - boardY) // Flip Y axis (board Y increases downward, SVG Y increases upward)
    };
}

