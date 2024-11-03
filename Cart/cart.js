document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    let cartItems = [];

    try {
        // Attempt to parse the cart data from localStorage
        cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        cartItems = []; // Fallback to an empty array if parsing fails
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear current items
        let total = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const img = document.createElement('img');
            img.setAttribute('src', item.images[0]); // Ensure you get the first image

            const details = document.createElement('div');
            details.classList.add('cart-item-details');

            const title = document.createElement('div');
            title.classList.add('cart-item-title');
            title.innerText = `${item.name} (${item.quantity})`;

            const price = document.createElement('div');
            price.classList.add('cart-item-price');
            price.innerText = `$${item.price}`;

            details.append(title, price);

            const quantity = document.createElement('div');
            quantity.classList.add('cart-item-quantity');
            quantity.innerText = `Quantity: ${item.quantity}`;

            cartItem.append(img, details, quantity);
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;
    }

    updateCartDisplay();

    document.getElementById('checkoutButton').addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert('Proceeding to checkout...');
            // Implement checkout logic here
        } else {
            alert('Your cart is empty!');
        }
    });
});
