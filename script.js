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
const penColorInput = document.getElementById('pen-color');

let drawing = false;
let color = '#000000'; // Màu mặc định của bút vẽ
let penThickness = penSize.value;
let backgroundColor = '#ffffff'; // Màu nền mặc định

// Lưu lịch sử vẽ để hỗ trợ undo
let history = [];
let historyIndex = -1;

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
        ctx.strokeStyle = color;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

// Dừng vẽ khi thả chuột
canvas.addEventListener('mouseup', () => {
    drawing = false;
    saveHistory(); // Lưu trạng thái sau mỗi hành động vẽ
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
    history = [];  // Xóa lịch sử vẽ khi xóa canvas
    historyIndex = -1;
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

// Lưu lại lịch sử vẽ
function saveHistory() {
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);  // Xóa redo nếu có sau khi vẽ mới
    }
    history.push(canvas.toDataURL());  // Lưu ảnh hiện tại của canvas vào lịch sử
    historyIndex++;
}

// Hoàn tác (Undo)
function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        const img = new Image();
        img.src = history[historyIndex];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Xóa canvas trước
            ctx.drawImage(img, 0, 0);  // Vẽ lại trạng thái trước đó
        };
    }
}

// Sao chép (Ctrl+C)
function copy() {
    const dataURL = canvas.toDataURL();
    const img = new Image();
    img.src = dataURL;

    img.onload = () => {
        const canvasCopy = document.createElement('canvas');
        const ctxCopy = canvasCopy.getContext('2d');
        canvasCopy.width = canvas.width;
        canvasCopy.height = canvas.height;
        ctxCopy.drawImage(img, 0, 0);

        // Copy vào clipboard
        canvasCopy.toBlob((blob) => {
            const item = new ClipboardItem({'image/png': blob});
            navigator.clipboard.write([item]);
        });
    };
}

// Dán (Ctrl+V)
async function paste() {
    const clipboardItems = await navigator.clipboard.read();
    for (const item of clipboardItems) {
        const blob = await item.getType('image/png');
        const img = new Image();
        const url = URL.createObjectURL(blob);
        img.src = url;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);  // Dán hình ảnh vào canvas
        };
    }
}

// Lắng nghe các sự kiện bàn phím
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();  // Ngăn không cho trình duyệt thực hiện hành động mặc định
        undo();
    }
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        copy();
    }
    if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        paste();
    }
});
