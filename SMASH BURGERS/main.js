// Sepete öğe ekleme fonksiyonu
function addToCart(name, price) {
  // Eğer aynı ürün zaten sepete eklenmişse
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // Yeni bir öğe olarak sepete ekle
    cartItems.push({ name: name, price: price, quantity: 1 });
  }

  // Toplam tutarı güncelle
  updateCart();
}

// Sepeti güncelleyen fonksiyon
function updateCart() {
  const cartElement = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  // Sepet listesini temizle
  cartElement.innerHTML = "";

  // Her bir öğe için listeye bir öğe ekle
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity}: $${item.price * item.quantity}`;
    cartElement.appendChild(li);
  });

  // Toplam tutarı hesapla ve güncelle
  total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalElement.textContent = `Toplam: $${total.toFixed(2)}`;
}

// Tüm Add to cart düğmelerine tıklama olayı ekle
const addToCartButtons = document.querySelectorAll('.box-bottom .btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    const parentBox = event.target.closest('.box');
    const itemName = parentBox.querySelector('h3').textContent;
    const itemPrice = parseFloat(parentBox.querySelector('.price p').textContent);
    addToCart(itemName, itemPrice);
  });
});
