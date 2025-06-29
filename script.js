const plants = [
  { name: 'Aloe Vera', image: 'images/aloe-vera.jpg', description: 'Medicinal plant.', cost: 15, category: 'Medicinal' },
  { name: 'Snake Plant', image: 'images/snake-plant.jpg', description: 'Air-purifying.', cost: 20, category: 'Aromatic' },
  { name: 'Money Plant', image: 'images/money-plant.jpg', description: 'Indoor green.', cost: 18, category: 'Aromatic' },
  { name: 'Peace Lily', image: 'images/peace-lily.jpg', description: 'Indoor flowering.', cost: 22, category: 'Aromatic' },
  { name: 'Areca Palm', image: 'images/areca-palm.jpg', description: 'Air freshener.', cost: 25, category: 'Aromatic' },
  { name: 'Spider Plant', image: 'images/spider-plant.jpg', description: 'Easy care.', cost: 17, category: 'Medicinal' }
];

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElem = document.getElementById('cartCount');
  if (countElem) countElem.textContent = total;
}

if (document.getElementById('Aromatic')) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  ['Aromatic', 'Medicinal'].forEach(category => {
    const container = document.getElementById(category);
    plants.filter(p => p.category === category).forEach(plant => {
      const isAdded = cart.find(item => item.name === plant.name);
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h3>${plant.name}</h3>
        <img src="${plant.image}" width="150" />
        <p>${plant.description}</p>
        <p>$${plant.cost}</p>
        <button ${isAdded ? 'disabled' : ''} onclick="addToCart('${plant.name}')">
          ${isAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>`;
      container.appendChild(card);
    });
  });
  updateCartCount();
}

function addToCart(name) {
  const plant = plants.find(p => p.name === name);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ ...plant, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

if (document.getElementById('cartItems')) {
  const cartItems = document.getElementById('cartItems');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const subtotal = item.cost * item.quantity;
      total += subtotal;
      const div = document.createElement('div');
      div.className = 'cart-card';
      div.innerHTML = `
        <h3>${item.name}</h3>
        <img src="${item.image}" width="100" />
        <p>$${item.cost} x ${item.quantity} = $${subtotal}</p>
        <button onclick="decreaseQty('${item.name}')">-</button>
        <button onclick="increaseQty('${item.name}')">+</button>
        <button onclick="removeItem('${item.name}')">Delete</button>
      `;
      cartItems.appendChild(div);
    });

    document.getElementById('totalAmount').innerText = total;
    updateCartCount();
  }

  window.increaseQty = (name) => {
    const item = cart.find(p => p.name === name);
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };

  window.decreaseQty = (name) => {
    const index = cart.findIndex(p => p.name === name);
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };

  window.removeItem = (name) => {
    cart = cart.filter(p => p.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };

  renderCart();
} 
