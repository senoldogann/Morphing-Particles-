import { useRef, useEffect } from 'react';

interface ParticleNetworkProps {
    text: string;
}

const ParticleNetwork: React.FC<ParticleNetworkProps> = ({ text }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        let time = 0;

        const colors = ['#00d4ff', '#7c3aed', '#f472b6', '#34d399', '#fbbf24'];

        class Particle {
            x: number;
            y: number;
            size: number;
            baseSize: number;
            color: string;
            baseX: number;
            baseY: number;
            density: number;
            angle: number;
            speed: number;
            orbitRadius: number;
            pulseOffset: number;
            vx: number;
            vy: number;

            constructor(x: number, y: number) {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.baseSize = 2.5 * dpr;
                this.size = this.baseSize;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.baseX = x;
                this.baseY = y;
                this.density = Math.random() * 30 + 1;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = 0.005 + Math.random() * 0.015;
                this.orbitRadius = 15 + Math.random() * 25;
                this.pulseOffset = Math.random() * Math.PI * 2;
                this.vx = 0;
                this.vy = 0;
            }

            draw() {
                if (!ctx) return;

                const pulse = Math.sin(time * 2 + this.pulseOffset) * 0.3 + 1;
                this.size = this.baseSize * pulse;

                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 3
                );
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(0.4, this.color + '80');
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            }

            update(isIdleMode: boolean) {
                const mouseX = (mouse.current.x || 0) * dpr;
                const mouseY = (mouse.current.y || 0) * dpr;

                let dx = mouseX - this.x;
                let dy = mouseY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let maxDistance = 200 * dpr;

                if (distance < maxDistance && mouse.current.x !== null) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    this.vx -= Math.cos(angle) * force * 8;
                    this.vy -= Math.sin(angle) * force * 8;
                }

                if (isIdleMode) {
                    this.angle += this.speed;
                    const targetX = this.baseX + Math.cos(this.angle) * this.orbitRadius * dpr;
                    const targetY = this.baseY + Math.sin(this.angle) * this.orbitRadius * dpr;
                    this.vx += (targetX - this.x) * 0.02;
                    this.vy += (targetY - this.y) * 0.02;
                } else {
                    this.vx += (this.baseX - this.x) * 0.05;
                    this.vy += (this.baseY - this.y) * 0.05;
                }

                this.vx *= 0.92;
                this.vy *= 0.92;
                this.x += this.vx;
                this.y += this.vy;
            }
        }

        let particleArray: Particle[] = [];
        let isIdleMode = !text;

        const init = () => {
            particleArray = [];
            isIdleMode = !text;

            if (!text) {
                const numberOfParticles = 100;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = Math.min(canvas.width, canvas.height) / 10;

                for (let i = 0; i < numberOfParticles; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const r = Math.sqrt(Math.random()) * radius;
                    const x = centerX + Math.cos(angle) * r;
                    const y = centerY + Math.sin(angle) * r;
                    const p = new Particle(x, y);
                    p.baseX = x;
                    p.baseY = y;
                    particleArray.push(p);
                }
                return;
            }

            const fontSize = Math.min(canvas.width / 8, 150 * dpr);
            ctx.font = `900 ${fontSize}px Orbitron, Verdana, sans-serif`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const step = Math.floor(10 * dpr);
            for (let y = 0; y < textCoordinates.height; y += step) {
                for (let x = 0; x < textCoordinates.width; x += step) {
                    const index = (y * 4 * textCoordinates.width) + (x * 4) + 3;
                    if (textCoordinates.data[index] > 128) {
                        const p = new Particle(x, y);
                        p.baseX = x;
                        p.baseY = y;
                        p.color = '#ffffff';
                        particleArray.push(p);
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx) return;

            ctx.fillStyle = 'rgba(10, 10, 20, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.016;

            for (let i = 0; i < particleArray.length; i++) {
                particleArray[i].update(isIdleMode);
                particleArray[i].draw();
            }

            if (isIdleMode) {
                connect();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        const connect = () => {
            const maxDist = 8000 * dpr * dpr;
            ctx.lineWidth = 1 * dpr;

            for (let a = 0; a < particleArray.length; a++) {
                for (let b = a + 1; b < particleArray.length; b++) {
                    const dx = particleArray[a].x - particleArray[b].x;
                    if (Math.abs(dx) > 90 * dpr) continue;
                    const dy = particleArray[a].y - particleArray[b].y;
                    if (Math.abs(dy) > 90 * dpr) continue;

                    const distance = dx * dx + dy * dy;
                    if (distance < maxDist) {
                        const opacity = (1 - distance / maxDist) * 0.6;

                        const gradient = ctx.createLinearGradient(
                            particleArray[a].x, particleArray[a].y,
                            particleArray[b].x, particleArray[b].y
                        );
                        gradient.addColorStop(0, particleArray[a].color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
                        gradient.addColorStop(1, particleArray[b].color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));

                        ctx.strokeStyle = gradient;
                        ctx.beginPath();
                        ctx.moveTo(particleArray[a].x, particleArray[a].y);
                        ctx.lineTo(particleArray[b].x, particleArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        init();
        animate();

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [text]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                background: 'linear-gradient(135deg, #0a0a14 0%, #1a1a2e 50%, #0f0f1a 100%)'
            }}
        />
    );
};

export default ParticleNetwork;
