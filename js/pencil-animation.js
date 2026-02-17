// ==================== PENCIL WRITING ANIMATION ====================
(function initPencilAnimation() {
    const canvas = document.getElementById('pencil-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = 150;
    
    let animationFrame;
    let progress = 0;
    
    // Pencil properties
    const pencil = {
        x: 0,
        y: 0,
        angle: -30,
        length: 60,
        width: 8
    };
    
    // Text to write
    const text = "Español IB";
    let currentText = "";
    let charIndex = 0;
    
    // Writing path
    const writingPath = [];
    let pathIndex = 0;
    
    function drawPencil(x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((angle * Math.PI) / 180);
        
        // Pencil body (wooden part)
        ctx.fillStyle = '#8a6f47';
        ctx.fillRect(-pencil.length, -pencil.width/2, pencil.length * 0.8, pencil.width);
        
        // Pencil tip (dark)
        ctx.fillStyle = '#2a2a2a';
        ctx.beginPath();
        ctx.moveTo(-pencil.length * 0.2, -pencil.width/2);
        ctx.lineTo(0, 0);
        ctx.lineTo(-pencil.length * 0.2, pencil.width/2);
        ctx.closePath();
        ctx.fill();
        
        // Eraser
        ctx.fillStyle = '#e89ba8';
        ctx.fillRect(-pencil.length * 0.95, -pencil.width/2 - 1, pencil.length * 0.15, pencil.width + 2);
        
        // Metal band
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(-pencil.length * 0.82, -pencil.width/2, pencil.length * 0.05, pencil.width);
        
        ctx.restore();
    }
    
    function drawText() {
        ctx.font = 'bold 32px Montserrat';
        ctx.fillStyle = '#3a7a4f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentText, canvas.width / 2, canvas.height / 2);
    }
    
    function generateWritingPath() {
        // Simple path that moves across the canvas
        const startX = canvas.width * 0.2;
        const startY = canvas.height * 0.5;
        const endX = canvas.width * 0.8;
        
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const x = startX + (endX - startX) * t;
            const y = startY + Math.sin(t * Math.PI * 2) * 10; // Slight wave
            writingPath.push({ x, y });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update writing progress
        if (pathIndex < writingPath.length) {
            const pos = writingPath[pathIndex];
            pencil.x = pos.x;
            pencil.y = pos.y;
            pathIndex += 2;
            
            // Update text character by character
            if (pathIndex % 15 === 0 && charIndex < text.length) {
                currentText += text[charIndex];
                charIndex++;
            }
        } else {
            // Reset animation
            pathIndex = 0;
            charIndex = 0;
            currentText = "";
            setTimeout(() => {
                // Pause before restarting
            }, 2000);
        }
        
        // Draw text first (behind pencil)
        drawText();
        
        // Draw pencil
        drawPencil(pencil.x, pencil.y, pencil.angle);
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    // Initialize
    generateWritingPath();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (canvas && canvas.clientWidth) {
            canvas.width = canvas.clientWidth;
            canvas.height = 150;
            writingPath.length = 0;
            generateWritingPath();
        }
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
})();