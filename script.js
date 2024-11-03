let container = document.querySelector(".container");
let search = document.querySelector("#search");
let load = 0;
let productsPerPage = 10;
let products = []; // Store all products here


//! Fetch all products initially ------------------------------------------------------------------
async function fetchData() {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    products = data.products;
    console.log(products);
    showData(); // Display the first set of products
}


//! Show a set of products based on the current load count -----------------------------------------
function showData() {
    for (let i = load; i < load + productsPerPage && i < products.length; i++) {
        let ele = products[i];
        let image = document.createElement('img');
        image.setAttribute('id','image');
        let title = document.createElement('h3');
        title.setAttribute('id','title');
        let price = document.createElement('p');
        price.setAttribute('id','price');
        let addtoCart = document.createElement('button');
        addtoCart.setAttribute('id','addtoCart');
        addtoCart.setAttribute('class','fas fa-cart-plus'); 
        // addtoCart.setAttribute('class',ele.title);  
        addtoCart.innerText = ' Add  to  Cart';
        // addtoCart.addEventListener('click', addCart)
        let slide = document.createElement('div');
        slide.addEventListener('click', showDetails);
        slide.setAttribute('id','slide');
        image.setAttribute('src', ele.images[0]);
        title.innerText = ele.title;
        price.innerText = '$' + ele.price;
        slide.append(image, title, price, addtoCart);
        container.append(slide);
    }
    load += productsPerPage;
    checkLoadMore();
}


//! Check if there are more products to load and display the "Load More" button -----------------------
function checkLoadMore() {
    let loadButton = document.getElementById('loadButton');
    if (load < products.length) {
        if (!loadButton) {
            loadButton = document.createElement('button');
            loadButton.setAttribute('id', 'loadButton');
            loadButton.setAttribute('class',"fas fa-spinner fa-spin")
            loadButton.innerText = ' Load More';
            loadButton.addEventListener('click', showData);
            container.append(loadButton);
        } else {
            container.appendChild(loadButton); // Re-append to maintain position
        }
    } else if (loadButton) {
        loadButton.remove(); // Remove the button if all products are loaded
    }
}


//! Add products on cart -----------------------------------------------------------------------------
// function addCart(event){
//     let product = event.target.parentNode;
//     console.log(product);
//     // alert("Item added successfully");
//     event.stopPropagation();

//     let productString = product.outerHTML;
//     localStorage.setItem('product', productString);

//     // let productClass = event.target.className;
//     // console.log(productClass);  
// }
// Existing "Add to Cart" functionality
// Add to Cart logic in script.js
document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'addtoCart') {
        const productIndex = Array.from(container.children).indexOf(event.target.closest('#slide'));
        const product = products[productIndex];

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cartItems.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartItems.push({
                id: product.id,
                name: product.title,
                price: product.price,
                images: product.images, // Ensure the image array is included
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert(`${product.title} added to cart!`);
    }
});



//! show details of any products -----------------------------------------------------------------------
function showDetails(event) {
    // Get the clicked product
    const slide = event.currentTarget; // The clicked slide
    const productIndex = Array.from(container.children).indexOf(slide); // Find the index of the clicked product
    const product = products[productIndex]; // Get the product details

    // Redirect to product-details.html with the product ID
    window.location.href = `Product/product-details.html?id=${product.id}`;
}


//! Search any product ---------------------------------------------------------------------------------
search.addEventListener('keyup',searchProducts);

async function searchProducts() {
    let value = search.value;
    // console.log(value);
    let res = await fetch(`https://dummyjson.com/products/search?q=${value}`);
    let searchResult = await res.json();
    console.log(searchResult);
    container.innerHTML = '';   

    searchResult.products.forEach((ele)=>{
        let image = document.createElement('img');
        image.setAttribute('id','image');
        let title = document.createElement('h3');
        title.setAttribute('id','title');
        let price = document.createElement('p');
        price.setAttribute('id','price');
        let addtoCart = document.createElement('button');
        addtoCart.setAttribute('id','addtoCart');
        addtoCart.setAttribute('class','fas fa-cart-plus'); 
        addtoCart.innerText = ' Add  to  Cart';
        // addtoCart.addEventListener('click', addCart)
        let slide = document.createElement('div');
        slide.addEventListener('click', showDetails);
        slide.setAttribute('id','slide');
        image.setAttribute('src', ele.images[0]);
        title.innerText = ele.title;
        price.innerText = '$' + ele.price;
        slide.append(image, title, price, addtoCart);
        container.append(slide);
    })
    if (searchResult.products.length === 0) {
        let noResultMessage = document.createElement('h1');
        noResultMessage.innerText = 'No Products Found';
        noResultMessage.style.color = 'red';
        noResultMessage.style.padding = '100px'
        container.append(noResultMessage);
    }
}





fetchData();


