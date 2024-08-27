import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MainComponent.css';
import globeImage from '../../resources/images/globe-network.png';
import { UserContext } from '../../context/UserContext';
import { motion } from 'framer-motion';

function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

function MainComponent() {
    const { token } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const canvasRef = useRef(null);

    const handleGetStarted = () => {
        if (token) {
            navigate('/tabview'); // Adjust the path as needed
        } else {
            navigate('/login');
        }
    };

    // useEffect(() => {
    //     if (location.pathname === '/') {
    //         const canvas = canvasRef.current;
    //         if (!canvas) return; // Guard clause if canvasRef.current is not set

    //         const ctx = canvas.getContext('2d');
    //         const stars = [];
    //         const numStars = 60; // Reduced number of stars
    //         const maxDistance = 200;
    //         const starSpeed = 0.4; // Reduced speed

    //         const baseColor = { r: 170, g: 170, b: 170 };
    //         const maxColor = { r: 255, g: 255, b: 255 };

    //         function randomPosition() {
    //             return {
    //                 x: Math.random() * canvas.width,
    //                 y: Math.random() * canvas.height,
    //                 dx: (Math.random() - 0.5) * starSpeed,
    //                 dy: (Math.random() - 0.5) * starSpeed
    //             };
    //         }

    //         function interpolateColor(distance) {
    //             const factor = Math.min(distance / maxDistance, 1);
    //             const r = Math.round(baseColor.r + factor * (maxColor.r - baseColor.r));
    //             const g = Math.round(baseColor.g + factor * (maxColor.g - baseColor.g));
    //             const b = Math.round(baseColor.b + factor * (maxColor.b - baseColor.b));
    //             return `rgb(${r},${g},${b})`;
    //         }

    //         function drawStar(star) {
    //             if (!star) return;
    //             ctx.beginPath();
    //             ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
    //             ctx.fillStyle = '#aaaaaa'; // Set star color
    //             ctx.fill();
    //         }

    //         function drawLine(star1, star2) {
    //             if (!star1 || !star2) return;
    //             const distance = Math.sqrt(
    //                 (star1.x - star2.x) ** 2 +
    //                 (star1.y - star2.y) ** 2
    //             );
    //             const color = interpolateColor(distance);
    //             ctx.beginPath();
    //             ctx.moveTo(star1.x, star1.y);
    //             ctx.lineTo(star2.x, star2.y);
    //             ctx.strokeStyle = color;
    //             ctx.lineWidth = 1;
    //             ctx.stroke();
    //         }

    //         function updateStars() {
    //             for (let i = 0; i < numStars; i++) {
    //                 if (!stars[i]) {
    //                     stars[i] = { ...randomPosition() };
    //                 } else {
    //                     stars[i].x += stars[i].dx;
    //                     stars[i].y += stars[i].dy;
    //                     if (stars[i].x > canvas.width) stars[i].x = 0;
    //                     if (stars[i].x < 0) stars[i].x = canvas.width;
    //                     if (stars[i].y > canvas.height) stars[i].y = 0;
    //                     if (stars[i].y < 0) stars[i].y = canvas.height;
    //                 }
    //                 drawStar(stars[i]);
    //                 for (let j = i + 1; j < numStars; j++) {
    //                     if (!stars[j]) continue;
    //                     const distance = Math.sqrt(
    //                         (stars[i].x - stars[j].x) ** 2 +
    //                         (stars[i].y - stars[j].y) ** 2
    //                     );
    //                     if (distance < maxDistance) {
    //                         drawLine(stars[i], stars[j]);
    //                     }
    //                 }
    //             }
    //         }

    //         function animate() {
    //             ctx.fillStyle = 'white';
    //             ctx.fillRect(0, 0, canvas.width, canvas.height);
    //             updateStars();
    //             requestAnimationFrame(animate);
    //         }

    //         canvas.width = window.innerWidth;
    //         canvas.height = window.innerHeight;
    //         animate();

    //         const handleResize = debounce(() => {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }, 200);

    //         window.addEventListener('resize', handleResize);

    //         return () => {
    //             window.removeEventListener('resize', handleResize);
    //         };
    //     }
    // }, [location.pathname]);


    return (
        <>
            {/* {location.pathname === '/' && <canvas ref={canvasRef} className="star-canvas"></canvas>} */}
            <div className="main-section">
                <div className="text-section">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                    >
                        Welcome to Generative Voice AI
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
                    >
                        Transform text into lifelike speech instantly with our cutting-edge AI voice generator.
                        Perfect for video creators, developers, and businesses seeking high-quality voice synthesis
                        in multiple languages. Experience seamless integration and high performance, all at your fingertips.
                    </motion.p>
                    <motion.button
                        className="get-started-button"
                        onClick={handleGetStarted}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 1 }}
                    >
                        Get Started
                    </motion.button>
                </div>
                <motion.div
                    className="image-section"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 3, ease: 'easeOut', delay: 0.4 }}
                >
                    <img
                        src={globeImage}
                        alt="Globe"
                        className="globe-image"
                    />
                </motion.div>
            </div>
        </>
    );
}

export default MainComponent;
