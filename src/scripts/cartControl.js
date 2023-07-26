import {getFormData} from "./getFormData.js";
import {API_URL} from "./config.js";

export const cartDataControl = {
  getLS() {
    return JSON.parse(localStorage.getItem('freshyBarCart') || '[]')
  },
  addLS(item) {
    const cartData = this.getLS()
    item.idLS = Math.random().toString(36).substring(2, 8)
    cartData.push(item)
    localStorage.setItem('freshyBarCart', JSON.stringify(cartData))
  },
  removeLS(idLS) {
    const cartData = this.getLS()
    const index = cartData.findIndex((item) => item.idLS === idLS)
    if (index !== -1) {
      cartData.splice(index, 1)
    }
    localStorage.setItem('freshyBarCart', JSON.stringify(cartData))
  },
  clearLS() {
    localStorage.removeItem('freshyBarCart')
  },
}

export const createCartItem = (item) => {
  const li = document.createElement('li')

  li.classList.add('order__item')
  li.innerHTML = `
    <img class="order__img" src="./src/images/make-your-own.jpg" alt="${item.title}">

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

      <button class="order__item-delete" data-idLS="${item.idLS}" aria-label="Удалить коктейль из корзины"></button>

      <p class="order__item-price">${item.price}&nbsp;₽</p>
  `
  
  return li
}

export const renderCart = () => {
  const modalOrder = document.querySelector('.modal_order')
  const orderCount = document.querySelector('.order__count')
  const orderList = document.querySelector('.order__list')
  const orderTotalPrice = document.querySelector('.order__total-price')
  const orderForm = document.querySelector('.order__form')

  const orderListData = cartDataControl.getLS()

  orderList.textContent = ''
  orderCount.textContent = `(${orderListData.length})`

  orderListData.forEach(item => {
    orderList.append((createCartItem(item)))
  })

  orderTotalPrice.textContent = `${orderListData.reduce((acc, item) => acc + +item.price, 0)} ₽`

  orderForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!orderListData.length) {
      alert("Корзина пуста")
      return
    }

    const data = getFormData(orderForm)

    const response = await fetch(`${API_URL}api/order`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        products: orderListData,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const {message} = await response.json()

    alert(message)

    cartDataControl.clearLS()
    orderForm.reset()
    modalOrder.closeModal('close')
  })
}
