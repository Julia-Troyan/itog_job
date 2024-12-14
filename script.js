const cartItems = [];
const cartItemsContainer = document.querySelector('.cart-items');
const btnBrowse = document.querySelector('.btn-browse');
const cardsWrapper = document.querySelector('.cards__wrapper');
const clearCartButton = document.querySelector('.clear-cart'); 


function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - ${item.price}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';
        removeBtn.classList.add('remove-btn');

        removeBtn.addEventListener('click', () => {
            removeFromCart(item);
        });

        li.appendChild(removeBtn);
        cartItemsContainer.appendChild(li);

        totalPrice += parseFloat(item.price.substring(1));
    });

    document.querySelector('.total-price').textContent = `${totalPrice.toFixed(2)}`;
}

function addToCart(item) {
    cartItems.push(item);
    updateCart();
}

function removeFromCart(item) {
    const index = cartItems.indexOf(item);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    updateCart();
}


function clearCart() {
    cartItems.length = 0;
    updateCart();
}


document.querySelectorAll('.item-img__hover-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.cards__item');
        const title = card.querySelector('.item-title').textContent;
        const price = card.querySelector('.item-price').textContent;


        const image = card.querySelector('.item-img').style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '\$2');

        addToCart({ title, price, image });


        btn.disabled = true;
        btn.textContent = 'Added';
        btn.classList.add('added');
    });
});


btnBrowse.addEventListener('click', () => {
    cardsWrapper.innerHTML = '';


    cartItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('cards__item');


        card.innerHTML = `
            <div class="item-img" style="background-image: url('${item.image}')">
                <div class="item-img__hover">
                    <!-- Здесь убираем кнопку "Add to Cart" -->
                </div>
            </div>
            <div class="item-description">
                <h4 class="item-title">${item.title}</h4>
                <p class="item-price">${item.price}</p>
            </div>
        `;
        cardsWrapper.appendChild(card);
    });
});

clearCartButton.addEventListener('click', clearCart);
