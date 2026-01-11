let cart = [];
let total = 0;

function addToCart(name, price, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value);
    const existing = cart.find(item => item.name === name);
    if(existing) {
        existing.qty += qty;
    } else {
        cart.push({name, price, qty});
    }
    updateCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x ${item.qty} = KES ${item.price * item.qty}`;
        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.onclick = () => removeFromCart(item.name);
        li.appendChild(btn);
        cartList.appendChild(li);
        total += item.price * item.qty;
    });
    document.getElementById("total").textContent = total;
}

function checkout() {
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;

    if(name === "" || phone === "") {
        alert("Please enter your name and phone number!");
        return;
    }

    const mpesaText = document.getElementById("mpesaText");
    mpesaText.textContent = `Initializing payment for KES ${total}...`;
    openModal();
}

function openModal() {
    document.getElementById("mpesaModal").style.display = "block";
}

function closeModal() {
    document.getElementById("mpesaModal").style.display = "none";
}

function openAdminLogin() {
    document.getElementById("adminModal").style.display = "block";
}

function closeAdminLogin() {
    document.getElementById("adminModal").style.display = "none";
}

function adminLogin(event) {
    event.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;
    const position = document.getElementById("adminPosition").value;

    alert(`Admin login attempted:\nEmail: ${email}\nPosition: ${position}`);
    closeAdminLogin();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if(event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
}
