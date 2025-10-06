import { BinaryTreeNode } from './BinaryTreeNode.js'
import { DEFAULT_CONFIG, getRquiredActualHeightAndWidth, drawNode, connectEdges } from './treeUtils.js'
import { validInputChacker } from './events.js'

const canvas = document.querySelector('canvas');

validInputChacker();

function drawBinaryTree(root, canvasElement) {

    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    //Initializing canvas size
    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;

    //calculating required height and width for tree structure
    const { getRequiredCanvasHeight, getRequiredCanvasWidth } = getRquiredActualHeightAndWidth(root);

    const windowWidthCenter = maxWidth / 2;
    const requiredWidthCenter = getRequiredCanvasWidth / 2;

    const xStart = windowWidthCenter - requiredWidthCenter;
    const xEnd = windowWidthCenter + requiredWidthCenter;

    const horizontalConfig = { xStart, xEnd };

    //draw
    recursivelyDrawNodes(root, canvasElement, 0.5, horizontalConfig);
}

function recursivelyDrawNodes(root, canvasElement, currentLevel, horizontalConfig) {
    const { xStart, xEnd } = horizontalConfig;

    const xPos = (xStart + xEnd) / 2;
    const yPos = currentLevel * DEFAULT_CONFIG.nodeHeightSpacing;

    drawNode(root.value, canvasElement, xPos, yPos);

    if (root.left !== null) {
        const leftNodeHorizontalConfig = { xStart, xEnd: xPos };
        recursivelyDrawNodes(root.left, canvasElement, currentLevel + 1, leftNodeHorizontalConfig);

        connectEdges(canvasElement, {
            xStart: xPos,
            xEnd: (xStart + xPos) / 2
        },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing - DEFAULT_CONFIG.radius)
            })
    }
    if (root.right !== null) {
        const rightNodeHorizontalConfig = { xStart: xPos, xEnd };
        recursivelyDrawNodes(root.right, canvasElement, currentLevel + 1, rightNodeHorizontalConfig);

        connectEdges(canvasElement, {
            xStart: xPos,
            xEnd: (xPos + xEnd) / 2
        },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing - DEFAULT_CONFIG.radius)
            })
    }
}

export function buildBinaryTree(arr) {

    if (!arr.length) return null;
   
    const nodes = arr.map(value => value === null ? null : new BinaryTreeNode(value));

    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] !== null) {
            const leftIndex = 2 * i + 1;
            const rightIndex = 2 * i + 2;
            if (leftIndex < nodes.length) nodes[i].setLeft(nodes[leftIndex]);
            if (rightIndex < nodes.length) nodes[i].setRight(nodes[rightIndex]);
        }
    }
    drawBinaryTree(nodes[0], canvas);

    return nodes[0];
}


