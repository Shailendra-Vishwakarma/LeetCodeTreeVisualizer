export class BinaryTreeNode {
    value = null;
    left = null;
    right = null;

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }
    getHeight() {
        let leftHeight=this.left?.getHeight() || 0;
        let rightHeight=this.right?.getHeight() || 0;
        return Math.max(leftHeight,rightHeight)+1;
    }
}