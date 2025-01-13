import { TEXTAREA_SELECTOR } from './constants.js';
export function limitedTextarea() {
const textareas = document.querySelectorAll(TEXTAREA_SELECTOR);
    if(textareas){
        textareas.forEach((textarea) => {
            textarea.addEventListener('input', () => {
                const wrapper = textarea.closest('div');
                const counting = wrapper.querySelector('.counting b');
                const maxLength = parseInt(textarea.getAttribute('maxlength'), 10);
                const currentLength = textarea.value.length;
                counting.textContent = `${currentLength}`;
            });
        });
    }
}