const products = [
    {
        id: 1,
        name: "Cheeseburger",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
        id: 2,
        name: "Pommes",
        price: 3.49,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f"
    },
    {
        id: 3,
        name: "Pizza Salami",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },
    {
        id: 4,
        name: "Cola",
        price: 2.49,
        image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13"
    }
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");

function renderProducts() {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toFixed(2)} €</p>
            <button onclick="addToCart(${product.id})">
                In den Warenkorb
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                ${item.quantity} x ${item.price.toFixed(2)} €
            </div>

            <div class="cart-item-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = total.toFixed(2) + " €";
    cartCount.textContent = count;
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

document.getElementById("order-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Dein Warenkorb ist leer!");
        return;
    }

    alert("Bestellung erfolgreich abgeschickt!");

    cart = [];
    updateCart();
});

/* ---------------- */
/* DARKMODE */
/* ---------------- */

const darkmodeToggle = document.getElementById("darkmode-toggle");

darkmodeToggle.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");

    if (document.body.classList.contains("darkmode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("darkmode");
    }
}

loadTheme();

renderProducts();