window.onload = function() {

    let form = document.getElementById('form');
    let pizzaSize = document.getElementById('pizza-Size');
    let pizzaIngredients = document.getElementById('pizza-Ingredients');


    class Order {
        constructor(){
            const typeData = getOrderPizza('Заказать маленькую пиццу - 0; среднюю - 1 ; большая - 2');
            if (typeData === -1) {
                this.status = 'failed';
                return;
            }
            this.type = typeData;
    
            const ingredientsData = addPizzaIngredients('Добавить ингридиент сыр - 0, помидор - 1, грибы - 2');
            if (ingredientsData === -1) {
                this.status = 'failed';
                return;
            }
            this.ingredients = ingredientsData;
    
            this.status = 'ordered';
            this.feedback = '';
            this.star = 0; //like, dislike
        }
    
        cooking(callback) {
            console.log('cooking');
            setTimeout(() => {
                console.log('setTimeout', this.type);
                this.status = 'cooked';
                callback();
            }, this.type + 1 * 1000);
        }
    
        delivering(callback) {
            console.log('delivering');
            let deliveringStatus = 0;
            this.status = 'picked up';
            const intr = setInterval(() => {
                
                if (deliveringStatus === 1) {
                    this.status = 'on the way';
                }
                if (deliveringStatus === 2) {
                    this.status = 'delivered';
                    console.log('setInterval, deliveringStatus', deliveringStatus, this.status);
                    clearInterval(intr);
                    callback();
                
                }
                deliveringStatus = deliveringStatus + 1;
                console.log('setInterval, deliveringStatus', deliveringStatus, this.status);
            }, 1000);
        }
    
        survey(callback) {
            console.log('survey');
            this.feedback = prompt('vse ponravilos?');
            callback();
        }
    }

    function getOrderPizza(message) {
        let data = prompt(message);
        console.log('getOrderPizza');
    
        if (validatePromptMassage(data)) {
            return  +data;
        } 
        // ИСПРАВЛЕНО - если ордер валидный
        return -1;
    }
    
    function addPizzaIngredients(message) {
        let data = prompt(message);
        console.log('addPizzaIngredients');
    
        if (validatePromptMassage(data)) {
            return  +data;
        } 
        // ИСПРАВЛЕНО - если ордер валидный
        return -1;
    }
    
    function validatePromptMassage(data) {
        let valid = false;
        console.log('validatePromptMassage');
    
        if (isNaN(data)) {
            console.error('Введите число');
        } else if (data == null) {
            console.info('Вы отменили!');
        } else {
            valid = true;
        }
    
        return valid;
    }
    
    let orders = [];
    
    function makeOrder() {
        console.log('makeOrder');
        let order = new Order();
        if (order.status == 'ordered') {
            order.cooking(() => {
                order.delivering(() => {
                    order.survey(() => {
    
                        orders.push({type: order.type, ingredients: order.ingredients, feedback: order.feedback});
                        console.log(orders);
                        
    
                    });
                });
            });
        }
    }
    makeOrder();

}