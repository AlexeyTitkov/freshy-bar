import {API_URL} from "./config.js";

const createCard = (item) => {
  const cocktail = document.createElement('article')
  cocktail.classList.add('cocktail')
  cocktail.innerHTML = `
     <img class="cocktail__img" 
          src="${API_URL}${item.image}" 
          alt="Коктейль ${item.title}">

            <div class="cocktail__content">
              <div class="cocktail__text">
                <h3 class="cocktail__title">${item.title}</h3>
                <p class="cocktail__price text-red">${item.price}&nbsp;₽</p>
                <p class="cocktail__size">${item.size}</p>
              </div>

              <button class="btn cocktail__btn cocktail__btn_add" data-id="${item.id}">Добавить</button>
            </div>
  `

  return cocktail
}

export const renderCardsList = (goodsListElem, data) => {
  const MakeYourOwnCocktail = document.createElement('li')
  MakeYourOwnCocktail.classList.add('goods__item')
  const cocktail = document.createElement('article')
  cocktail.classList.add('cocktail')
  cocktail.innerHTML = `
      <img class="cocktail__img" src="./src/images/make-your-own.jpg" alt="Коктейль 'Собери сам">

            <div class="cocktail__content">
              <div class="cocktail__text">
                <h3 class="cocktail__title">Собери сам</h3>
                <p class="cocktail__price text-red">260&nbsp;₽</p>
                <p class="cocktail__size">300мл</p>
              </div>

              <button class="btn cocktail__btn cocktail__btn_make">Добавить</button>
            </div>
  `
  MakeYourOwnCocktail.append(cocktail)
  goodsListElem.prepend(MakeYourOwnCocktail)
  
  const cartsCocktail = data.map((item) => {
    const li = document.createElement('li')
    li.classList.add('goods__item')
    li.append(createCard(item))
    return li
  })

  goodsListElem.append(...cartsCocktail)
}
