export const DEFAULT_CONFIG = {
    radius: 25,
    nodeWidthSpacing: 40,
    nodeHeightSpacing: 80,
    fontSize: 10
}

export function getRquiredActualHeightAndWidth(root) {
    const heightOfTree = root.getHeight();
    const maxLeafNode = Math.pow(2, heightOfTree);
    const getRequiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;
    const getRequiredCanvasWidth = maxLeafNode * DEFAULT_CONFIG.nodeWidthSpacing;

    return { getRequiredCanvasHeight, getRequiredCanvasWidth };
}

export function drawNode(value, canvasElement, x, y) {

    const context = canvasElement.getContext('2d'); // tool to draw 
    //Draw Circle
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "yellow";
    context.fill();
    // context.stroke();

    //draw circle border
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = "black";
    context.stroke();

    //write value
    context.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText(value, x, y + DEFAULT_CONFIG.fontSize / 2);
}

export function connectEdges(canvasElement,xCoordinates,yCoordinates) {
    const {xStart,xEnd}=xCoordinates;
    const {yStart,yEnd}=yCoordinates;

    const xhalf=(xStart+xEnd)/2;
    const yhalf=(yStart+yEnd)/2;

    const start={x:xStart,y:yStart};
    const controlPoint1={x:xhalf, y:yhalf};
    const controlPoint2={x:xEnd, y:yEnd};
    const end={x:xEnd,y:yEnd};
    const ctx = canvasElement.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    // ctx.lineTo(end.x, end.y);
    ctx.strokeStyle='black';
    ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y , end.x, end.y);
    ctx.stroke();
}