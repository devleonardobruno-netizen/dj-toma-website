"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Prevent canvas from capturing scroll/mouse events
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 4;

    // --- VINYL RECORD ---
    const vinylGroup = new THREE.Group();

    // Outer ring (black vinyl)
    const vinylGeo = new THREE.TorusGeometry(1.5, 0.02, 16, 80);
    const vinylMat = new THREE.MeshBasicMaterial({ color: "#a855f7", transparent: true, opacity: 0.4 });
    for (let i = 0; i < 8; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.6 + i * 0.13, 0.005, 8, 80),
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? "#a855f7" : "#06b6d4",
          transparent: true,
          opacity: 0.25 + i * 0.03,
          blending: THREE.AdditiveBlending,
        })
      );
      vinylGroup.add(ring);
    }
    vinylGroup.add(new THREE.Mesh(vinylGeo, vinylMat));
    vinylGroup.position.set(-2.5, 0, -1);
    scene.add(vinylGroup);

    // --- EQUALIZER BARS ---
    const barCount = 32;
    const bars: THREE.Mesh[] = [];
    const barHeights = Array.from({ length: barCount }, () => Math.random());
    const barTargets = Array.from({ length: barCount }, () => Math.random());

    for (let i = 0; i < barCount; i++) {
      const geo = new THREE.BoxGeometry(0.06, 0.1, 0.06);
      const hue = i / barCount;
      const color = new THREE.Color().setHSL(0.75 - hue * 0.15, 1, 0.6);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const bar = new THREE.Mesh(geo, mat);
      const x = (i - barCount / 2) * 0.12;
      bar.position.set(x, 0, 0);
      bars.push(bar);
      scene.add(bar);
    }

    // --- WAVEFORM LINE ---
    const wavePoints = 200;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(wavePoints * 3);
    for (let i = 0; i < wavePoints; i++) {
      wavePos[i * 3] = (i / wavePoints) * 8 - 4;
      wavePos[i * 3 + 1] = 0;
      wavePos[i * 3 + 2] = -2;
    }
    waveGeo.setAttribute("position", new THREE.BufferAttribute(wavePos, 3));
    const waveMat = new THREE.LineBasicMaterial({
      color: "#06b6d4",
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const waveLine = new THREE.Line(waveGeo, waveMat);
    scene.add(waveLine);

    // Second waveform
    const waveGeo2 = new THREE.BufferGeometry();
    const wavePos2 = new Float32Array(wavePoints * 3);
    for (let i = 0; i < wavePoints; i++) {
      wavePos2[i * 3] = (i / wavePoints) * 8 - 4;
      wavePos2[i * 3 + 1] = 0;
      wavePos2[i * 3 + 2] = -2.2;
    }
    waveGeo2.setAttribute("position", new THREE.BufferAttribute(wavePos2, 3));
    const waveLine2 = new THREE.Line(
      waveGeo2,
      new THREE.LineBasicMaterial({ color: "#ec4899", transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending })
    );
    scene.add(waveLine2);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    const animate = () => {
      const id = requestAnimationFrame(animate);
      t += 0.02;

      // Spin vinyl
      vinylGroup.rotation.z += 0.008;
      vinylGroup.position.x = -2.5 + mouseX * 0.3;
      vinylGroup.position.y = mouseY * 0.3;

      // Animate EQ bars
      for (let i = 0; i < barCount; i++) {
        barHeights[i] += (barTargets[i] - barHeights[i]) * 0.08;
        if (Math.random() < 0.03) barTargets[i] = 0.1 + Math.random() * 0.9;
        const h = 0.1 + barHeights[i] * 2;
        bars[i].scale.y = h;
        bars[i].position.y = -1.5 + h / 2;
      }

      // Animate waveform
      const positions = waveGeo.attributes.position.array as Float32Array;
      const positions2 = waveGeo2.attributes.position.array as Float32Array;
      for (let i = 0; i < wavePoints; i++) {
        const x = (i / wavePoints) * 8 - 4;
        positions[i * 3 + 1] = Math.sin(x * 2 + t) * 0.3 + Math.sin(x * 5 + t * 1.3) * 0.15;
        positions2[i * 3 + 1] = Math.sin(x * 3 - t * 0.8) * 0.2 + Math.cos(x * 4 + t) * 0.1;
      }
      waveGeo.attributes.position.needsUpdate = true;
      waveGeo2.attributes.position.needsUpdate = true;

      // Camera parallax
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
      return id;
    };
    const animId = animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />;
}
