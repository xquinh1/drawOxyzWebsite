// Lấy các phần tử cần thiết
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorButtons = document.querySelectorAll('.color-button');
const colorCodeInput = document.getElementById('color-code');
const backgroundColorInput = document.getElementById('background-color');
const backgroundColorCodeInput = document.getElementById('background-color-code');
const penSize = document.getElementById('pen-size');
const clearBtn = document.getElementById('clear');
const saveBtn = document.getElementById('save');
const penColorInput = document.getElementById('pen-color');  // Thêm phần này

let drawing = false;
let color = '#000000'; // Màu mặc định của bút vẽ
let penThickness = penSize.value;
let backgroundColor = '#ffffff'; // Màu nền mặc định

// Thiết lập các thuộc tính vẽ
ctx.lineWidth = penThickness;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Vẽ khi chuột kéo
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Tiếp tục vẽ khi chuột di chuyển
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.strokeStyle = color; // Sử dụng màu hiện tại
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

// Dừng vẽ khi thả chuột
canvas.addEventListener('mouseup', () => {
    drawing = false;
});

// Chọn màu từ các nút
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        color = button.getAttribute('data-color');
        colorCodeInput.value = color;  // Cập nhật ô nhập mã màu khi chọn màu từ nút
    });
});

// Chọn màu từ ô nhập mã màu
colorCodeInput.addEventListener('input', () => {
    color = colorCodeInput.value; // Cập nhật màu khi người dùng nhập mã màu
});

// Chọn màu từ ô chọn màu bút vẽ
penColorInput.addEventListener('input', () => {
    color = penColorInput.value; // Cập nhật màu bút vẽ khi người dùng chọn từ ô màu
});

// Thay đổi kích thước bút vẽ
penSize.addEventListener('input', () => {
    ctx.lineWidth = penSize.value;
});

// Xóa canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Lưu hình ảnh vẽ
saveBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});

// Thay đổi màu nền canvas từ ô chọn màu
backgroundColorInput.addEventListener('input', () => {
    backgroundColor = backgroundColorInput.value;
    canvas.style.backgroundColor = backgroundColor;
    backgroundColorCodeInput.value = backgroundColor;  // Cập nhật ô nhập mã màu nền
});

// Thay đổi màu nền canvas từ ô nhập mã màu
backgroundColorCodeInput.addEventListener('input', () => {
    backgroundColor = backgroundColorCodeInput.value;
    canvas.style.backgroundColor = backgroundColor;
});
