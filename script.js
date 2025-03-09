const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('image-upload');
const addLayerButton = document.getElementById('add-layer');
const deleteColorButton = document.getElementById('delete-color');
const brushSizeInput = document.getElementById('brush-size');
const colorPicker = document.getElementById('color-picker');
const colorCodeInput = document.getElementById('color-code');
const colorPalette = document.getElementById('color-palette');
const downloadImageButton = document.getElementById('download-image');

let drawing = false;
let lastX, lastY;
let brushSize = 5;
let brushColor = '#000000';

// Add event listeners for drawing
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    const x = e.offsetX;
    const y = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.stroke();
    lastX = x;
    lastY = y;
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

// Add event listeners for features
imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const imageData = event.target.result;
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
    image.src = imageData;
  };
  reader.readAsDataURL(file);
});

addLayerButton.addEventListener('click', () => {
  const newCanvas = document.createElement('canvas');
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  const newCtx = newCanvas.getContext('2d');
  document.body.appendChild(newCanvas);
});

deleteColorButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

brushSizeInput.addEventListener('input', (e) => {
  brushSize = e.target.value;
  ctx.lineWidth = brushSize;
});

colorPicker.addEventListener('input', (e) => {
  const color = e.target.value;
  brushColor = color;
  ctx.strokeStyle = color;
  colorCodeInput.value = color;
});

colorCodeInput.addEventListener('input', (e) => {
  const color = e.target.value;
  brushColor = color;
  ctx.strokeStyle = color;
  colorPicker.value = color;
});

const colorSwatches = colorPalette.children;
for (let i = 0; i < colorSwatches.length; i++) {
  const swatch = colorSwatches[i];
  swatch.addEventListener('click', () => {
    const color = swatch.style.backgroundColor;
    brushColor = color;
    ctx.strokeStyle = color;
    colorPicker.value = color;
    colorCodeInput.value = color;
  });
}

downloadImageButton.addEventListener('click', () => {
  const imageData = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = imageData;
  link.download = 'drawing.png';
  link.click();
});