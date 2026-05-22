
const products = [
    {
        id: 1,
        name: "Cheeseburger",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        nutrition: {
            calories: 320,
            protein: "18g",
            fat: "14g",
            carbs: "30g"
        }
    },
    {
        id: 2,
        name: "Pommes",
        price: 3.49,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f",
        nutrition: {
            calories: 280,
            protein: "4g",
            fat: "12g",
            carbs: "38g"
        }
    },
    {
        id: 3,
        name: "Pizza Salami",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        nutrition: {
            calories: 540,
            protein: "22g",
            fat: "20g",
            carbs: "55g"
        }
    },
    {
        id: 4,
        name: "Cola",
        price: 2.49,
        image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13",
        nutrition: {
            calories: 140,
            protein: "0g",
            fat: "0g",
            carbs: "35g"
        }
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

            <p>${product.price.toFixed(2)} Euro</p>

            <button onclick="addToCart(${product.id})">
                In den Warenkorb
            </button>

            <button class="nutrition-btn"
                onclick="toggleNutrition(${product.id})">
                Nutrition anzeigen
            </button> 

            <div
                class="nutrition-box"
                id="nutrition-${product.id}"
                style="display:none;"
            >
                <strong>Kalorien:</strong> ${product.nutrition.calories} kcal<br>
                <strong>Protein:</strong> ${product.nutrition.protein}<br>
                <strong>Fett:</strong> ${product.nutrition.fat}<br>
                <strong>Kohlenhydrate:</strong> ${product.nutrition.carbs}
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });
}

function toggleNutrition(id) {
    const box = document.getElementById(`nutrition-${id}`);

    if (box.style.display === "none") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
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
                ${item.quantity} x ${item.price.toFixed(2)} Euro
            </div>

            <div class="cart-item-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = total.toFixed(2) + " Euro";
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

/* ---------------- */
/* FORM VALIDATION */
/* ---------------- */

document
.getElementById("address-form")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const street = document.getElementById("street").value.trim();
    const city = document.getElementById("city").value.trim();
    const zipcode = document.getElementById("zipcode").value.trim();

    const message = document.getElementById("form-message");

    const zipRegex = /^[0-9]{5}$/;

    if (cart.length === 0) {
        message.style.color = "red";
        message.textContent = "Der Warenkorb ist leer.";
        return;
    }

    if (
        fullname.length < 3 ||
        street.length < 5 ||
        city.length < 2
    ) {
        message.style.color = "red";
        message.textContent =
            "Bitte alle Felder korrekt ausfüllen.";
        return;
    }

    if (!zipRegex.test(zipcode)) {
        message.style.color = "red";
        message.textContent =
            "Bitte gültige Postleitzahl eingeben.";
        return;
    }

    message.style.color = "green";
    message.textContent =
        "Bestellung erfolgreich abgeschickt!";

    cart = [];
    updateCart();

    document.getElementById("address-form").reset();
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