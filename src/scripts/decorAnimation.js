function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function onMouseMove(event, moveX, moveY) {
  if (isTouchDevice()) {
    return; // Прерываем выполнение кода на сенсорных устройствах
  }

  event.style.transform = `translate(-${moveX}px, -${moveY}px)`;
}

export function addMouseMoveListener(images) {
  document.addEventListener('mousemove', function(e) {
    const moves = [
      { x: 0.4, y: 0.4 },
      { x: 0.3, y: 0.3 },
      { x: 0.4, y: 0.4 },
      { x: 0.7, y: 0.7 },
      { x: 0.7, y: 0.7 },
      { x: 0.3, y: 0.3 },
    ];

    images.forEach((image, index) => {
      const moveX = (e.clientX * moves[index].x) / 8;
      const moveY = (e.clientY * moves[index].y) / 8;
      onMouseMove(image, moveX, moveY);
    });
  });
}

