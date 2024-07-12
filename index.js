let products = [];

function addProductToCart(name, image, price) {
  const product = products.find((product) => product.name === name);
  if (product) {
    product.quantity++;
  } else {
    products.push({
      name,
      image,
      price,
      quantity: 1,
    });
  }

  renderCart();
}

function removeProductFromCart(name) {
  products = products.filter((product) => product.name !== name);
  renderCart();
}

function renderCart() {
  const productsList = document.querySelector(".cart-products");
  productsList.innerHTML = "";

  products.forEach((product) => {
    productsList.innerHTML += `
<div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src=${product.image} style="max-width: 200px" class="card-img" alt="Imagen del Producto">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text"><small class="text-muted">Precio: $${product.price.toFixed(2)}</small></p>
        <div class="input-group mb-3" style="max-width: 200px;">
          <div class="input-group-prepend">
            <button class="btn btn-outline-secondary btn-cart-sub" type="button">-</button>
          </div>
          <input type="text" class="form-control" value=${product.quantity} readonly>
          <div class="input-group-append btn-cart-add">
            <button class="btn btn-outline-secondary" type="button">+</button>
          </div>
        </div>
        <button class="btn btn-danger btn-cart-delete">Eliminar</button>
      </div>
    </div>
  </div>
</div>
        `;
  });

  document.querySelectorAll(".btn-cart-sub").forEach((element) => {
    element.addEventListener("click", (event) => {
      const item = event.target.closest(".card");
      const name = item.querySelector(".card-title").textContent;

      const product = products.find((product) => product.name === name);
      if (product.quantity > 1) {
        product.quantity--;
        renderCart();
      } else {
        removeProductFromCart(name);
      }
    });
  });

  document.querySelectorAll(".btn-cart-add").forEach((element) => {
    element.addEventListener("click", (event) => {
      const item = event.target.closest(".card");
      const name = item.querySelector(".card-title").textContent;

      const product = products.find((product) => product.name === name);
      product.quantity++;

      renderCart();
    });
  });

  document.querySelectorAll(".btn-cart-delete").forEach((element) => {
    element.addEventListener("click", (event) => {
      const item = event.target.closest(".card");
      const name = item.querySelector(".card-title").textContent;

      removeProductFromCart(name);
    });
  });

  const cartEmpty = document.querySelector(".cart-empty");
  const cartTotal = document.querySelector(".cart-total");
  const cartPay = document.querySelector(".cart-pay");
  const totalValue = document.querySelector(".cart-total-value");

  function setVisible(element, visible) {
    element.classList.remove("d-none");
    element.classList.remove("d-block");

    if (visible) {
      element.classList.add("d-block");
    } else {
      element.classList.add("d-none");
    }
  }

  if (products.length > 0) {
    setVisible(cartEmpty, false);
    setVisible(cartTotal, true);
    setVisible(cartPay, true);

    let total = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    totalValue.textContent = `$${total.toFixed(2)}`;
  } else {
    setVisible(cartEmpty, true);
    setVisible(cartTotal, false);
    setVisible(cartPay, false);
  }
}

document.querySelectorAll(".add-cart").forEach((element) => {
  element.addEventListener("click", () => {
    const card = element.closest(".card-product");
    const name = card.querySelector("h3").textContent;
    const image = card.querySelector("img").getAttribute("src");
    const price = card.querySelector(".price").textContent.replace("$", "");

    alert(`${name} ha sido añadido al carrito!`);
    addProductToCart(name, image, parseFloat(price));
  });
});

document.querySelectorAll(".container-options span").forEach((element) => {
  element.addEventListener("click", function () {
    if (element.classList.contains("active")) {
      return;
    }

    document
      .querySelectorAll(".container-options span")
      .forEach((s) => s.classList.remove("active"));

    element.classList.add("active");

    const targetId = element.getAttribute("data-tab");

    document.querySelectorAll(".container-products").forEach((cp) => {
      cp.classList.remove("active");
      cp.style.display = "none";
    });

    const targetContainer = document.getElementById(targetId);
    targetContainer.offsetWidth;
    targetContainer.style.display = "grid";

    setTimeout(() => {
      targetContainer.classList.add("active");
    }, 10);
  });
});

const cartButton = document.getElementById("btn-cart");
const cartContainer = document.querySelector(".content-shopping-cart");

cartButton.addEventListener("click", () => {
  if (cartContainer.classList.contains("d-none")) {
    cartContainer.classList.remove("d-none");
  } else {
    cartContainer.classList.add("d-none");
  }
});

document.getElementById("link1").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.getElementById("link2").addEventListener("click", () => {
  const element = document.getElementById("products-heading");
  const position = element.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: position - 140,
    behavior: "smooth",
  });
});

document.getElementById("link3").addEventListener("click", () => {
  const element = document.getElementById("about-us");
  const position = element.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: position - 115,
    behavior: "smooth",
  });
});

document.getElementById("link4").addEventListener("click", () => {
  const element = document.getElementById("mapa");
  const position = element.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: position - 150,
    behavior: "smooth",
  });
});
