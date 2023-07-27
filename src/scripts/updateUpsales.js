import { price } from "./config.js";

export function updateUpsales() {
  const modals = document.querySelectorAll(".modal");

  modals.forEach((modal) => {
    const checkboxes = modal.querySelectorAll(".make__label.checkbox");
    checkboxes.forEach((checkbox) => {
      const ingredientName = checkbox.querySelector(".checkbox__input").value;
      const upsalePrice = price[ingredientName] || 0;
      const upsaleElement = checkbox.querySelector(".make__upsale");
      if (upsaleElement) {
        upsaleElement.textContent = `(+${upsalePrice} ₽)`;
      }
    });

    const radioInputs = modal.querySelectorAll(".radio__input");
    radioInputs.forEach((radioInput) => {
      const cupType = radioInput.value;
      const upsalePrice = price[cupType] || 0;
      const upsaleElement = radioInput.nextElementSibling;
      if (upsaleElement) {
        upsaleElement.textContent = `(+${upsalePrice} ₽)`;
      }
    });
  });
}
