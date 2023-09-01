import {API_URL} from "./config.js";

export const getData = async () => {
  const goodsListElem = document.querySelector('.goods__list');

  const loadingElem = document.createElement('div');
  loadingElem.textContent = 'Загрузка...';
  goodsListElem.appendChild(loadingElem);

  const errorElem = document.createElement('div');

  try {
    const response = await fetch(`${API_URL}api/goods`);
    const data = await response.json();

    // Удаление элемента "Загрузка..." при успешной загрузке данных
    goodsListElem.removeChild(loadingElem);

    return data;
  } catch (error) {
    goodsListElem.removeChild(loadingElem);
    errorElem.textContent = `Произошла ошибка при получении данных: ${error.message}`;
    goodsListElem.appendChild(errorElem);
    console.error('Произошла ошибка при получении данных:', error);
  }
};

export const sendData = async (data) => {
  return await fetch(`${API_URL}api/order`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};