// Các phần tử DOM
const colorButtons = document.querySelectorAll('.color-button');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');
const penSizeInput = document.getElementById('pen-size');
const backgroundColorInput = document.getElementById('background-color'); // Thêm biến cho ô chọn màu nền

// Biến lưu trữ trạng thái
let currentColor = '#000000'; // Màu mặc định (đen)
let currentPenSize = 5; // Kích thước bút vẽ mặc định
let isDrawing = false; // Trạng thái vẽ
let lastX = 0, lastY = 0; // Dùng để lưu tọa độ vẽ trước đó

// Cập nhật màu nền khi người dùng chọn màu mới
backgroundColorInput.addEventListener('input', (e) => {
    const selectedColor = e.target.value; // Lấy màu người dùng chọn
    canvas.style.backgroundColor = selectedColor; // Thay đổi màu nền của canvas
});

// Thiết lập sự kiện cho các nút màu
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentColor = button.dataset.color; // Lấy màu từ thuộc tính 'data-color'
        colorButtons.forEach(b => b.classList.remove('active')); // Xóa lớp 'active' khỏi các nút khác
        button.classList.add('active'); // Thêm lớp 'active' cho nút đã chọn
    });
});

// Thiết lập sự kiện cho bút vẽ (thay đổi kích thước bút)
penSizeInput.addEventListener('input', (e) => {
    currentPenSize = e.target.value; // Cập nhật kích thước bút theo input
});

// Sự kiện bắt đầu vẽ
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const currentX = e.offsetX;
    const currentY = e.offsetY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = currentColor; // Màu vẽ
    ctx.lineWidth = currentPenSize; // Kích thước bút
    ctx.lineCap = 'round'; // Tạo các đường vẽ mượt mà
    ctx.stroke();

    lastX = currentX;
    lastY = currentY;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Clear canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa tất cả trên canvas
});

// Lưu hình ảnh vẽ dưới dạng file
saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL(); // Lấy ảnh từ canvas
    link.download = 'drawing.png'; // Đặt tên file khi tải về
    link.click();
});
