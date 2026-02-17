// ==================== THREE.JS GLOBE (Sphere) ====================
(function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;
    
    // Scene setup
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
    
    // Create Earth-like sphere
    const geometry = new THREE.SphereGeometry(1.2, 32, 32);
    
    // Create gradient texture for Earth
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 512;
    canvas2d.height = 512;
    const ctx = canvas2d.getContext('2d');
    
    // Create gradient background (ocean blue to green land)
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#3a7a4f');    // Green
    gradient.addColorStop(0.5, '#2d5f3f');  // Dark green
    gradient.addColorStop(1, '#1a4d3a');    // Very dark green
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some "continents" (random shapes)
    ctx.fillStyle = '#8a6f47'; // Brown for land
    for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * 512, 
            Math.random() * 512, 
            Math.random() * 80 + 20, 
            0, 
            Math.PI * 2
        );
        ctx.fill();
    }
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas2d);
    
    // Material with the texture
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        shininess: 15
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // Add lighting for realistic effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);
    
    camera.position.z = 3;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate globe slowly
        globe.rotation.y += 0.005;
        globe.rotation.x += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (canvas && canvas.clientWidth) {
            renderer.setSize(canvas.clientWidth, 150);
            camera.aspect = canvas.clientWidth / 150;
            camera.updateProjectionMatrix();
        }
    });
})();