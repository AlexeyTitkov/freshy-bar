import { renderCardsList } from "./renderCardsList.js";
import { modalController } from "./modalController.js";
import { getData } from "./apiService.js"
import { renderCart } from "./cartControl.js"
import { calculateMakeYourOwn, calculateAdd } from "./formControl.js"
import { addMouseMoveListener } from "./decorAnimation.js"

const init = async () => {
  modalController({
    modal: '.modal_order',
    btnOpen: '.header__btn-order',
    open: renderCart,
  })

  const {resetForm: resetFormMakeYourOwn} = calculateMakeYourOwn()

  modalController({
    modal: '.modal_make-your-own',
    btnOpen: '.cocktail__btn_make',
    close: resetFormMakeYourOwn,
  })

  const goodsListElem = document.querySelector('.goods__list')
  const data = await getData()
  
  renderCardsList(goodsListElem, data);

  const {fillInForm: fillInFormAdd, resetForm: resetFormAdd} = calculateAdd()

  modalController({
    modal: '.modal_add',
    btnOpen: '.cocktail__btn_add',
    open({btn}) {
      const id = btn.dataset.id
      const item = data.find(item => item.id.toString() === id)
      fillInFormAdd(item)
    },
    close: resetFormAdd
  })

  const images = document.querySelectorAll('.decor__img');
  addMouseMoveListener(images);
}

init()
