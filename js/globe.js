// ==================== THREE.JS EARTH GLOBE ====================
(function initEarthGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45, 
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
    const geometry = new THREE.SphereGeometry(1.3, 64, 64);
    
    // Create Earth texture using canvas
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 1024;
    textureCanvas.height = 512;
    const ctx = textureCanvas.getContext('2d');
    
    // Ocean gradient (blue)
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGradient.addColorStop(0, '#1e3a5f');     // Deep blue
    oceanGradient.addColorStop(0.5, '#2e5f8f');   // Ocean blue
    oceanGradient.addColorStop(1, '#1e3a5f');     // Deep blue
    
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Add land masses (green)
    ctx.fillStyle = '#3a7a4f'; // Green
    
    // Simulate continents with random organic shapes
    // North America
    ctx.beginPath();
    ctx.ellipse(200, 180, 80, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(250, 320, 50, 80, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Europe
    ctx.beginPath();
    ctx.ellipse(520, 160, 60, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(540, 280, 70, 90, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(750, 200, 120, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(850, 360, 50, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Add darker green for depth
    ctx.fillStyle = '#2d5f3f';
    ctx.globalAlpha = 0.3;
    
    // Add some detail to continents
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const size = Math.random() * 20 + 10;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
    
    // Add white clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const size = Math.random() * 30 + 15;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Create texture
    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    // Create material with lighting
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        shininess: 10,
        specular: new THREE.Color(0x333333)
    });
    
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    
    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.35, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x4a9eff,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Add subtle point light
    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-5, 0, 3);
    scene.add(pointLight);
    
    camera.position.z = 3.5;
    
    // Rotation variables
    let rotationSpeed = 0.003;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate earth
        earth.rotation.y += rotationSpeed;
        atmosphere.rotation.y += rotationSpeed * 0.8;
        
        // Slight tilt animation
        earth.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1 + 0.3;
        
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
    
    // Add mouse interaction (optional - speed up on hover)
    canvas.addEventListener('mouseenter', () => {
        rotationSpeed = 0.008;
    });
    
    canvas.addEventListener('mouseleave', () => {
        rotationSpeed = 0.003;
    });
})();