import { buildBinaryTree } from './drawBinaryTree.js'
let textarea = document.querySelector('textarea');

export function validInputChacker() {
    if (!textarea) return;

    textarea.addEventListener('input', (e) => {
        const el = e.target;
        let raw = el.value.replace(/[^0-9nulNUL,\s]/g, '');

        const endsWithComma = /,\s*$/.test(raw);

        const tokens = raw.split(',');
        const cleaned = tokens.map(tok => {
            const t = tok.trim();
            if (t === '') return null;                
            if (/^\d+$/.test(t)) return t;            
            if (/^null$/i.test(t)) return 'null';     

            if (/^n$/i.test(t) || /^nu$/i.test(t) || /^nul$/i.test(t)) return t.toLowerCase();

            const digits = t.replace(/\D/g, '');
            if (digits) return digits;
            return null;                
        }).filter(Boolean);

        let newValue = cleaned.join(', ');

        if (endsWithComma) {
            newValue = newValue ? (newValue + ',') : '';
        }

        if (el.value !== newValue) {
            el.value = newValue;
            el.selectionStart = el.selectionEnd = el.value.length;
        }
    });
}

function getInputAsArray() {
    const value = textarea.value.trim();
    if (!value) return [];

    return value.split(',')
        .map(item => item.trim())
        .map(item => item === 'null' ? null : Number(item));
}

const applyButton = document.querySelector('#applyBtn');
const clearButton = document.querySelector('#clearBtn');
applyButton.addEventListener('click', () => {
    const arr = getInputAsArray();
    while (arr.length && arr[0] === null) {
        arr.shift();
    }
    const root = buildBinaryTree(arr);
    // if (root) {
    //     console.log("Tree root:", root);
    //     console.log("Tree height:", root.getHeight());
    // }
});

clearButton.addEventListener('click', () => {
    textarea.value = '';
})