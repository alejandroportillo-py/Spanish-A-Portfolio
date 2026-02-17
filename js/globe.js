// ==================== THREE.JS GLOBE (Verde y Azul) ====================
(function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        50, 
        canvas.clientWidth / 150, 
        0.1, 
        1000
    );
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(canvas.clientWidth, 150);
    
    // Create Earth sphere
    const geometry = new THREE.SphereGeometry(1.2, 32, 32);
    
    // Create canvas for texture
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 512;
    canvas2d.height = 512;
    const ctx = canvas2d.getContext('2d');
    
    // Draw ocean (blue)
    const oceanGradient = ctx.createLinearGradient(0, 0, 512, 512);
    oceanGradient.addColorStop(0, '#4A9FD8');    // UWC Blue
    oceanGradient.addColorStop(0.5, '#009688');  // UWC Teal
    oceanGradient.addColorStop(1, '#2d5f3f');    // Dark green
    
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add continents (green)
    ctx.fillStyle = '#3a7a4f'; // Green
    
    // Simulate continents with random shapes
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 60 + 30;
        
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add some lighter green details
    ctx.fillStyle = '#4CAF50';
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 20 + 5;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas2d);
    
    // Material with texture
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        shininess: 20,
        specular: new THREE.Color(0x4A9FD8)
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.9);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);
    
    camera.position.z = 3;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        globe.rotation.y += 0.005;
        globe.rotation.x += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        if (canvas && canvas.clientWidth) {
            renderer.setSize(canvas.clientWidth, 150);
            camera.aspect = canvas.clientWidth / 150;
            camera.updateProjectionMatrix();
        }
    });
})();