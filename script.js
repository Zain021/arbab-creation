/* =========================================
   ARBAB CREATION
   WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   CART
========================================= */

let cart = [];


function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();

}


/* UPDATE CART */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(product => {

        totalItems += product.quantity;

        totalPrice +=
            product.price * product.quantity;

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        "£" + totalPrice.toFixed(2);


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((product, index) => {

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <div>

                <h4>${product.name}</h4>

                <p>
                    £${product.price.toFixed(2)}
                    × ${product.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>

        `;

        cartItems.appendChild(item);

    });

}


/* REMOVE CART ITEM */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* CLOSE CART */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert(
        "Checkout system is ready to be connected to your payment gateway."
    );

}


/* =========================================
   WISHLIST
========================================= */

let wishlist = 0;


function addWishlist(button) {

    button.classList.toggle("active");

    if (button.classList.contains("active")) {

        button.textContent = "♥";

        wishlist++;

    } else {

        button.textContent = "♡";

        wishlist--;

    }

    document.getElementById(
        "wishlistCount"
    ).textContent = wishlist;

}


function toggleWishlist() {

    if (wishlist === 0) {

        alert(
            "Your wishlist is currently empty."
        );

    } else {

        alert(
            "You have " +
            wishlist +
            " item(s) in your wishlist."
        );

    }

}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterCategory(category) {

    const products =
        document.querySelectorAll(
            ".product-card"
        );

    const filters =
        document.querySelectorAll(".filter");


    filters.forEach(button => {

        button.classList.remove("active");

        if (
            button.textContent.trim() === category
        ) {

            button.classList.add("active");

        }

    });


    products.forEach(product => {

        const productCategory =
            product.dataset.category;

        if (
            category === "All" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   SEARCH
========================================= */

function openSearch() {

    document
        .getElementById("searchOverlay")
        .classList.add("active");

    document
        .getElementById("searchInput")
        .focus();

}


function closeSearch() {

    document
        .getElementById("searchOverlay")
        .classList.remove("active");

}


function searchProducts() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        const productName =
            product
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const category =
            product
            .dataset.category
            .toLowerCase();


        if (
            productName.includes(search) ||
            category.includes(search)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    document
        .querySelector(".navbar")
        .classList.toggle("active");

}


/* =========================================
   NEWSLETTER
========================================= */

function subscribe(event) {

    event.preventDefault();

    const email =
        event.target.querySelector(
            "input"
        ).value;

    alert(
        "Thank you! " +
        email +
        " has been subscribed to Arbab Creation."
    );

    event.target.reset();

}


/* =========================================
   CLOSE CART WHEN CLICKING OUTSIDE
========================================= */

document
    .getElementById("cartOverlay")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeCart();

        }

    });


/* =========================================
   CLOSE SEARCH WITH ESC
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeSearch();

            closeCart();

        }

    }
);