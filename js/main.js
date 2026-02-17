// ==================== PARTICLES ANIMATION ====================
(function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 40;
    const colors = ['#4A9FD8', '#009688', '#3a7a4f', '#B9D9EB'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        // Random animation duration
        const duration = Math.random() * 20 + 15;
        particle.style.animation = `particleFloat ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(50px, -50px);
            }
            50% {
                transform: translate(-30px, 30px);
            }
            75% {
                transform: translate(40px, 20px);
            }
        }
    `;
    document.head.appendChild(style);
})();