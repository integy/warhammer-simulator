/**
 * Deployment Data
 * Crucible of Battle (Strike Force)
 *
 * Coordinates in units on a 60 units wide x 44 units tall board (origin top-left).
 */

const DEPLOYMENT_CRUCIBLE_OF_BATTLE = {
    id: "crucible_of_battle",
    name: "Crucible of Battle",
    boardWidth: 60,
    boardHeight: 44,
    // Deployment zones as polygons (in units)
    zones: [
        {
            id: "attacker",
            type: "opponent",
            color: "rgba(255, 74, 74, 0.12)",
            stroke: "rgba(255, 74, 74, 0.4)",
            shape: "polygon",
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 44 },
                { x: 30, y: 0 }
            ]
        },
        {
            id: "defender",
            type: "player",
            color: "rgba(74, 158, 255, 0.12)",
            stroke: "rgba(74, 158, 255, 0.4)",
            shape: "polygon",
            points: [
                { x: 30, y: 44 },
                { x: 60, y: 0 },
                { x: 60, y: 44 }
            ]
        }
    ],
    objectives: [
        { id: "obj_1", position: { x: 14, y: 10 }, number: 1 },
        { id: "obj_2", position: { x: 20, y: 36 }, number: 2 },
        { id: "obj_3", position: { x: 40, y: 8 }, number: 3 },
        { id: "obj_mid", position: { x: 30, y: 22 }, number: 4 },
        { id: "obj_5", position: { x: 46, y: 34 }, number: 5 }
    ]
};

const DEPLOYMENT_DAWN_OF_WAR = {
    id: "dawn_of_war",
    name: "Dawn of War",
    boardWidth: 60,
    boardHeight: 44,
    // Deployment zones as rectangles along the long edges (top and bottom)
    zones: [
        {
            id: "player",
            type: "player",
            color: "rgba(74, 158, 255, 0.12)",
            stroke: "rgba(74, 158, 255, 0.4)",
            shape: "rectangle",
            position: { x: 0, y: 0 },
            dimensions: { width: 60, height: 12 }
        },
        {
            id: "opponent",
            type: "opponent",
            color: "rgba(255, 74, 74, 0.12)",
            stroke: "rgba(255, 74, 74, 0.4)",
            shape: "rectangle",
            position: { x: 0, y: 32 },
            dimensions: { width: 60, height: 12 }
        }
    ],
    objectives: [
        { id: "obj_1", position: { x: 30, y: 6 }, number: 1 },
        { id: "obj_2", position: { x: 30, y: 22 }, number: 2 },
        { id: "obj_3", position: { x: 30, y: 38 }, number: 3 },
        { id: "obj_4", position: { x: 10, y: 22 }, number: 4 },
        { id: "obj_5", position: { x: 50, y: 22 }, number: 5 }
    ]
};

const DEPLOYMENT_HAMMER_AND_ANVIL = {
    id: "hammer_and_anvil",
    name: "Hammer And Anvil",
    boardWidth: 60,
    boardHeight: 44,
    // Deployment zones as rectangles along the short edges (left and right)
    zones: [
        {
            id: "player",
            type: "player",
            color: "rgba(74, 158, 255, 0.12)",
            stroke: "rgba(74, 158, 255, 0.4)",
            shape: "rectangle",
            position: { x: 0, y: 0 },
            dimensions: { width: 18, height: 44 }
        },
        {
            id: "opponent",
            type: "opponent",
            color: "rgba(255, 74, 74, 0.12)",
            stroke: "rgba(255, 74, 74, 0.4)",
            shape: "rectangle",
            position: { x: 42, y: 0 },
            dimensions: { width: 18, height: 44 }
        }
    ],
    objectives: [
        { id: "obj_1", position: { x: 10, y: 22 }, number: 1 },
        { id: "obj_2", position: { x: 30, y: 22 }, number: 2 },
        { id: "obj_3", position: { x: 50, y: 22 }, number: 3 },
        { id: "obj_4", position: { x: 30, y: 6 }, number: 4 },
        { id: "obj_5", position: { x: 30, y: 38 }, number: 5 }
    ]
};

const DEPLOYMENT_SEARCH_AND_DESTROY = {
    id: "search_and_destroy",
    name: "Search And Destroy",
    boardWidth: 60,
    boardHeight: 44,
    // Circle cutout overlay: 9" radius centered at (30, 22)
    cutoutCircle: {
        center: { x: 30, y: 22 },
        radius: 9
    },
    // Deployment zones: quadrants minus 9" circle centered at (30, 22)
    // Circle radius = 9, center = (30, 22)
    // Bottom-left quadrant: (0,0) to (30,22) minus circle
    // Top-right quadrant: (30,22) to (60,44) minus circle
    zones: [
        {
            id: "player",
            type: "player",
            color: "rgba(74, 158, 255, 0.12)",
            stroke: "rgba(74, 158, 255, 0.4)",
            shape: "polygon",
            // Bottom-left quadrant (0,0 to 30,22) minus 9" circle cutout centered at (30,22)
            // Circle: center (30, 22), radius 9
            // Circle edges: (21, 22) left, (30, 13) bottom
            // Follow quadrant boundary, then follow exact circle arc
            points: [
                { x: 0, y: 0 },      // Top-left corner of quadrant
                { x: 0, y: 22 },     // Bottom-left corner of quadrant
                // Follow exact circle arc from 180° to 270° using trigonometry
                // Circle: center (30, 22), radius 9
                // x = 30 + 9*cos(θ), y = 22 + 9*sin(θ) where θ is in radians
                { x: 21, y: 22 },    // 180° = π radians: (30-9, 22+0)
                { x: 21.137, y: 20.438 }, // 190°: cos=-0.985, sin=-0.174
                { x: 21.532, y: 18.923 }, // 200°: cos=-0.940, sin=-0.342
                { x: 22.202, y: 17.500 }, // 210°: cos=-0.866, sin=-0.500
                { x: 23.137, y: 16.202 }, // 220°: cos=-0.766, sin=-0.643
                { x: 24.313, y: 15.062 }, // 230°: cos=-0.643, sin=-0.766
                { x: 25.702, y: 14.106 }, // 240°: cos=-0.500, sin=-0.866
                { x: 27.266, y: 13.358 }, // 250°: cos=-0.342, sin=-0.940
                { x: 28.962, y: 12.837 }, // 260°: cos=-0.174, sin=-0.985
                { x: 30, y: 13 },    // 270° = 3π/2 radians: (30+0, 22-9)
                { x: 30, y: 0 },     // Top-right corner of quadrant
                { x: 0, y: 0 }       // Close polygon
            ]
        },
        {
            id: "opponent",
            type: "opponent",
            color: "rgba(255, 74, 74, 0.12)",
            stroke: "rgba(255, 74, 74, 0.4)",
            shape: "polygon",
            // Top-right quadrant (30,22 to 60,44) minus 9" circle cutout centered at (30,22)
            // Circle: center (30, 22), radius 9
            // Circle edges: (30, 31) top, (39, 22) right
            // Follow quadrant boundary, then follow exact circle arc
            points: [
                { x: 60, y: 44 },    // Bottom-right corner of quadrant
                { x: 30, y: 44 },    // Bottom-left corner of quadrant
                { x: 30, y: 31 },    // Top edge of circle (90°) - FIXED: should be 31, not 35
                // Follow exact circle arc from 90° to 0° using trigonometry
                // Circle: center (30, 22), radius 9
                // x = 30 + 9*cos(θ), y = 22 + 9*sin(θ) where θ is in radians
                { x: 30, y: 31 },    // 90° = π/2 radians: (30+0, 22+9)
                { x: 31.563, y: 30.863 }, // 80°: cos=0.174, sin=0.985
                { x: 33.062, y: 30.438 }, // 70°: cos=0.342, sin=0.940
                { x: 34.500, y: 29.702 }, // 60°: cos=0.500, sin=0.866
                { x: 35.798, y: 28.637 }, // 50°: cos=0.643, sin=0.766
                { x: 36.938, y: 27.313 }, // 40°: cos=0.766, sin=0.643
                { x: 37.894, y: 25.702 }, // 30°: cos=0.866, sin=0.500
                { x: 38.642, y: 23.866 }, // 20°: cos=0.940, sin=0.342
                { x: 39.163, y: 22.038 }, // 10°: cos=0.985, sin=0.174
                { x: 39, y: 22 },    // 0° = 0 radians: (30+9, 22+0)
                { x: 60, y: 22 },    // Top-right corner of quadrant
                { x: 60, y: 44 }     // Close polygon
            ]
        }
    ],
    objectives: [
        { id: "obj_1", position: { x: 14, y: 10 }, number: 1 },
        { id: "obj_2", position: { x: 14, y: 34 }, number: 2 },
        { id: "obj_3", position: { x: 30, y: 22 }, number: 3 },
        { id: "obj_4", position: { x: 46, y: 10 }, number: 4 },
        { id: "obj_5", position: { x: 46, y: 34 }, number: 5 }
    ]
};

const DEPLOYMENT_SWEEPING_ENGAGEMENT = {
    id: "sweeping_engagement",
    name: "Sweeping Engagement",
    boardWidth: 60,
    boardHeight: 44,
    // Deployment zones with stair-step pattern
    zones: [
        {
            id: "player",
            type: "player",
            color: "rgba(74, 158, 255, 0.12)",
            stroke: "rgba(74, 158, 255, 0.4)",
            shape: "polygon",
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 14 },
                { x: 30, y: 14 },
                { x: 30, y: 8 },
                { x: 60, y: 8 },
                { x: 60, y: 0 }
            ]
        },
        {
            id: "opponent",
            type: "opponent",
            color: "rgba(255, 74, 74, 0.12)",
            stroke: "rgba(255, 74, 74, 0.4)",
            shape: "polygon",
            points: [
                { x: 0, y: 44 },
                { x: 60, y: 44 },
                { x: 60, y: 30 },
                { x: 30, y: 30 },
                { x: 30, y: 36 },
                { x: 0, y: 36 }
            ]
        }
    ],
    objectives: [
        { id: "obj_1", position: { x: 10, y: 26 }, number: 1 },
        { id: "obj_2", position: { x: 18, y: 6 }, number: 2 },
        { id: "obj_3", position: { x: 30, y: 22 }, number: 3 },
        { id: "obj_4", position: { x: 50, y: 18 }, number: 4 },
        { id: "obj_5", position: { x: 42, y: 38 }, number: 5 }
    ]
};

const DEPLOYMENT_TIPPING_POINT = {
    id: "tipping_point",
    name: "TippingPoint",
    boardWidth: 60,
    boardHeight: 44,
    // Deployment zones with sideways stair-step pattern
    zones: [
        {
            id: "player",
            type: "player",
            color: "rgba(74, 158, 255, 0.12)",
            stroke: "rgba(74, 158, 255, 0.4)",
            shape: "polygon",
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 44 },
                { x: 12, y: 44 },
                { x: 12, y: 22 },
                { x: 20, y: 22 },
                { x: 20, y: 0 }
            ]
        },
        {
            id: "opponent",
            type: "opponent",
            color: "rgba(255, 74, 74, 0.12)",
            stroke: "rgba(255, 74, 74, 0.4)",
            shape: "polygon",
            points: [
                { x: 60, y: 0 },
                { x: 48, y: 0 },
                { x: 48, y: 22 },
                { x: 40, y: 22 },
                { x: 40, y: 44 },
                { x: 60, y: 44 }
            ]
        }
    ],
    objectives: [
        { id: "obj_1", position: { x: 14, y: 10 }, number: 1 },
        { id: "obj_2", position: { x: 22, y: 36 }, number: 2 },
        { id: "obj_3", position: { x: 30, y: 22 }, number: 3 },
        { id: "obj_4", position: { x: 38, y: 8 }, number: 4 },
        { id: "obj_5", position: { x: 46, y: 34 }, number: 5 }
    ]
};

const DEPLOYMENT_HIDDEN_SUPPLIES = {
    id: "hidden_supplies",
    name: "Hidden Supplies",
    boardWidth: 60,
    boardHeight: 44,
    // Same deployment zones as Search and Destroy
    cutoutCircle: {
        center: { x: 30, y: 22 },
        radius: 9
    },
    zones: [
        {
            id: "player",
            type: "player",
            color: "rgba(74, 158, 255, 0.12)",
            stroke: "rgba(74, 158, 255, 0.4)",
            shape: "polygon",
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 22 },
                { x: 21, y: 22 },
                { x: 21.137, y: 20.438 },
                { x: 21.532, y: 18.923 },
                { x: 22.202, y: 17.500 },
                { x: 23.137, y: 16.202 },
                { x: 24.313, y: 15.062 },
                { x: 25.702, y: 14.106 },
                { x: 27.266, y: 13.358 },
                { x: 28.962, y: 12.837 },
                { x: 30, y: 13 },
                { x: 30, y: 0 },
                { x: 0, y: 0 }
            ]
        },
        {
            id: "opponent",
            type: "opponent",
            color: "rgba(255, 74, 74, 0.12)",
            stroke: "rgba(255, 74, 74, 0.4)",
            shape: "polygon",
            points: [
                { x: 60, y: 44 },
                { x: 30, y: 44 },
                { x: 30, y: 31 },
                { x: 31.563, y: 30.863 },
                { x: 33.062, y: 30.438 },
                { x: 34.500, y: 29.702 },
                { x: 35.798, y: 28.637 },
                { x: 36.938, y: 27.313 },
                { x: 37.894, y: 25.702 },
                { x: 38.642, y: 23.866 },
                { x: 39.163, y: 22.038 },
                { x: 39, y: 22 },
                { x: 60, y: 22 },
                { x: 60, y: 44 }
            ]
        }
    ],
    // 6 objectives: same as Search and Destroy but remove (30, 22) and add (25, 25.5) and (35, 18.5)
    objectives: [
        { id: "obj_1", position: { x: 14, y: 10 }, number: 1 },
        { id: "obj_2", position: { x: 14, y: 34 }, number: 2 },
        { id: "obj_3", position: { x: 25, y: 25.5 }, number: 3 },
        { id: "obj_4", position: { x: 35, y: 18.5 }, number: 4 },
        { id: "obj_5", position: { x: 46, y: 10 }, number: 5 },
        { id: "obj_6", position: { x: 46, y: 34 }, number: 6 }
    ]
};

const DEPLOYMENT_WTC_HIDDEN_SUPPLIES = {
    id: "wtc_hidden_supplies",
    name: "Hidden Supplies (WTC)",
    boardWidth: 60,
    boardHeight: 44,
    // Same deployment zones as Hammer and Anvil
    zones: [
        {
            id: "player",
            type: "player",
            color: "rgba(74, 158, 255, 0.12)",
            stroke: "rgba(74, 158, 255, 0.4)",
            shape: "rectangle",
            position: { x: 0, y: 0 },
            dimensions: { width: 18, height: 44 }
        },
        {
            id: "opponent",
            type: "opponent",
            color: "rgba(255, 74, 74, 0.12)",
            stroke: "rgba(255, 74, 74, 0.4)",
            shape: "rectangle",
            position: { x: 42, y: 0 },
            dimensions: { width: 18, height: 44 }
        }
    ],
    // 6 objectives for WTC Hidden Supplies
    objectives: [
        { id: "obj_1", position: { x: 30, y: 6 }, number: 1 },
        { id: "obj_2", position: { x: 30, y: 38 }, number: 2 },
        { id: "obj_3", position: { x: 10, y: 22 }, number: 3 },
        { id: "obj_4", position: { x: 50, y: 22 }, number: 4 },
        { id: "obj_5", position: { x: 35, y: 25.5 }, number: 5 },
        { id: "obj_6", position: { x: 25, y: 18.5 }, number: 6 }
    ]
};

function getRandomDeployment() {
    const deployments = [
        DEPLOYMENT_CRUCIBLE_OF_BATTLE,
        DEPLOYMENT_DAWN_OF_WAR,
        DEPLOYMENT_HAMMER_AND_ANVIL,
        DEPLOYMENT_SEARCH_AND_DESTROY,
        DEPLOYMENT_SWEEPING_ENGAGEMENT,
        DEPLOYMENT_TIPPING_POINT
    ];
    const index = Math.floor(Math.random() * deployments.length);
    return deployments[index];
}

function getDeploymentById(id) {
    if (id === "crucible_of_battle") return DEPLOYMENT_CRUCIBLE_OF_BATTLE;
    if (id === "dawn_of_war") return DEPLOYMENT_DAWN_OF_WAR;
    if (id === "hammer_and_anvil") return DEPLOYMENT_HAMMER_AND_ANVIL;
    if (id === "search_and_destroy") return DEPLOYMENT_SEARCH_AND_DESTROY;
    if (id === "sweeping_engagement") return DEPLOYMENT_SWEEPING_ENGAGEMENT;
    if (id === "tipping_point") return DEPLOYMENT_TIPPING_POINT;
    if (id === "hidden_supplies") return DEPLOYMENT_HIDDEN_SUPPLIES;
    if (id === "wtc_hidden_supplies") return DEPLOYMENT_WTC_HIDDEN_SUPPLIES;
    return null;
}

