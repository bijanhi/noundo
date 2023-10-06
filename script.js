const canvas = document.getElementById('drawingCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');

let drawing = true;

// Mouse event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Touch event listeners
canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchend', stopDrawing, { passive: false });
canvas.addEventListener('touchmove', drawTouch, { passive: false });

// Save button functionality
document.getElementById('saveBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); 
    link.download = 'drawing.png';
    link.click();
});

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');

colorPicker.addEventListener('change', function() {
    ctx.strokeStyle = colorPicker.value;
});

brushSize.addEventListener('input', function() {
    ctx.lineWidth = brushSize.value;
});

function startDrawing(event) {
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    drawing = true;
    draw(event);
}

function stopDrawing(event) {
    if (event.type === 'touchend') {
        event.preventDefault();
    }
    drawing = false;
    ctx.beginPath();  
}

function draw(event) {
    if (!drawing) return;
    ctx.lineCap = 'round';

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function drawTouch(event) {
    if (!drawing) return;
    ctx.lineCap = 'round';
    
    const touch = event.touches[0];
    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
}
