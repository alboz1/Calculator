const calculator = (function() {
     const buttons = document.querySelectorAll('button[data-val]');
     const mathOperations = document.querySelectorAll('button[data-math]');
     const screen = document.querySelector('.screen span');
     const equals = document.querySelector('#equal');

     let firstNum = 0;
     eventListeners();

     function eventListeners() {
        [...buttons].forEach(btn => {
            //here we dont add an eventListener for the toggle negative and postive number
            if (btn.dataset.val === '-') return;

            btn.addEventListener('click', function() {
                show(this.dataset.val);
            });
        });

        document.querySelector('#clear').addEventListener('click', clear);

        [...mathOperations].forEach(btn => btn.addEventListener('click', function() {
            firstNum = screen.textContent === ' ' ? firstNum : screen.textContent;

            if (!this.classList.contains('active')) {
                [...mathOperations].forEach(btn => btn.classList.remove('active'));
            }

            this.classList.add('active');
            screen.textContent = '';
        }));

        equals.addEventListener('click', result);
        
        //this button toggles if a number should be negative or positive
        document.querySelector('button[data-val="-"]').addEventListener('click', function() {
            if (screen.textContent === '') {
                show(this.dataset.val);
            } else if (screen.textContent === '-'){
                screen.textContent = '';
            }
        });
     }

     function result() {
        const [addBtn, subtrBtn, multiplyBtn, divideBtn] = [...mathOperations];
        
        if (addBtn.classList.contains('active')) {
            screen.textContent = add(firstNum, screen.textContent);
            addBtn.classList.remove('active');
        } else if (subtrBtn.classList.contains('active')) {
            screen.textContent = subtract(firstNum, screen.textContent);
            subtrBtn.classList.remove('active');
        } else if (multiplyBtn.classList.contains('active')) {
            screen.textContent = multiply(firstNum, screen.textContent);
            multiplyBtn.classList.remove('active');
        } else if (divideBtn.classList.contains('active')) {
            screen.textContent = divide(firstNum, screen.textContent);
            divideBtn.classList.remove('active');
        }
     }

     function show(value) {
         screen.textContent += value;
     }

     function clear() {
         screen.textContent = '';
         [...mathOperations].forEach(btn => btn.classList.remove('active'));
     }

     function add(first, second) {
         return Number(firstNum) + Number(second);
     }

     function subtract(first, second) {
         return Number(first) - Number(second);
     }

     function multiply(first, second) {
        return Number(first) * Number(second);
     }

     function divide(first, second) {
        return Number(first) / Number(second);
     }
})();