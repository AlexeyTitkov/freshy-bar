import {getFormData} from "./getFormData.js";
import {API_URL} from "./config.js";
import {sendData} from "./apiService.js";

const modalOrder = document.querySelector(".modal_order");
const orderCount = modalOrder.querySelector(".order__count");
const orderList = modalOrder.querySelector(".order__list");
const orderTotalPrice = modalOrder.querySelector(".order__total-price");
const orderForm = modalOrder.querySelector(".order__form");

export const cartDataControl = {
  getLS() {
    return JSON.parse(localStorage.getItem('freshyBarCart') || '[]')
  },
  addLS(item) {
    const cartData = this.getLS()
    item.idls = Math.random().toString(36).substring(2, 8)
    cartData.push(item)
    localStorage.setItem('freshyBarCart', JSON.stringify(cartData))
    renderCountCart(cartData.length);
  },
  removeLS(idls) {
    const cartData = this.getLS();
    const index = cartData.findIndex((item) => item.idls === idls);
    if (index !== -1) {
      cartData.splice(index, 1);
    }
    localStorage.setItem("freshyBarCart", JSON.stringify(cartData));
    renderCountCart(cartData.length);
  },
  clearLS() {
    localStorage.removeItem('freshyBarCart')
    renderCountCart(0);
  },
}

const renderCountCart = (count) => {
  const headerBtnOrder = document.querySelector(".header__btn-order");
  headerBtnOrder.dataset.count = count || cartDataControl.getLS().length;
};

renderCountCart();

export const createCartItem = (item, data) => {
  const li = document.createElement('li')
  const img = data.find((cocktail) => cocktail.title === item.title)?.image;

  li.classList.add('order__item')
  li.innerHTML = `
    <img class="order__img"
         src="${img ? `${API_URL}${img}` : "./src/images/make-your-own.jpg"}"     
         alt="${item.title}">

      <div class="order__info">
        <h3 class="order__name">${item.title}</h3>

        <ul class="order__topping-list">
          <li class="order__topping-item">${item.size}</li>
          <li class="order__topping-item">${item.cup}</li>
          ${
    item.toppings
      ? (Array.isArray(item.toppings)
        ? item.toppings.map(
          (topping) => `<li class="order__topping-item">${topping}</li>`
        ).toString().replace(',', '')
        : `<li class="order__topping-item">${item.toppings}</li>`)
      : ''
  }
        </ul>
      </div>

      <button class="order__item-delete" data-idls="${item.idls}" aria-label="Удалить коктейль из корзины"></button>

      <p class="order__item-price">${item.price}&nbsp;₽</p>
  `

  return li
}

const renderCartList = (data) => {
  const orderListData = cartDataControl.getLS()

  orderList.textContent = ''
  orderCount.textContent = `(${orderListData.length})`

  orderListData.forEach(item => {
    orderList.append((createCartItem(item, data)))
  })

  orderTotalPrice.textContent = `${orderListData.reduce((acc, item) => acc + +item.price, 0)} ₽`

};

const handlerSubmit = async (e) => {
  const orderListData = cartDataControl.getLS();

  e.preventDefault();
  if (!orderListData.length) {
    alert("Корзина пустая")
    orderForm.reset();
    modalOrder.closeModal("close");
    return;
  }

  const data = getFormData(orderForm)

  const response = await sendData({
    ...data,
    products: orderListData,
  });

  const {message} = await response.json()

  alert(message)

  cartDataControl.clearLS()
  orderForm.reset()
  modalOrder.closeModal('close')
}

export const renderCart = (data) => {
  renderCartList(data);
  orderForm.addEventListener("submit", handlerSubmit);
  orderList.addEventListener("click", (e) => {
    if (e.target.classList.contains("order__item-delete")) {
      cartDataControl.removeLS(e.target.dataset.idls);
      renderCartList(data);
    }
  });
}
