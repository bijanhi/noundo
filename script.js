const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;

// Mouse event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Touch event listeners
canvas.addEventListener('touchstart', startDrawing, false);
canvas.addEventListener('touchend', stopDrawing, false);
canvas.addEventListener('touchmove', drawTouch, false);

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
        event.preventDefault();  // Prevent scrolling when touching the canvas
    }
    drawing = true;
}

function stopDrawing(event) {
    if (event.type === 'touchend') {
        event.preventDefault();  // Prevent any unwanted behavior after touching ends
    }
    drawing = false;
    ctx.beginPath();  // This ensures that the path doesn't continue when you start drawing again.
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

    // Since multiple touch points could exist, we get the first one
    var touch = event.touches[0];

    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
}
