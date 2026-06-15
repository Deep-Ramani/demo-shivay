import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import './Loader.css';

function Loader({ exiting }) {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  /* ── Progress counter ───────────────────────────────────────── */
  useEffect(() => {
    const total = 2800;
    const step  = 40;
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += step;
      const pct = Math.min(Math.round((elapsed / total) * 100), 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(id);
    }, step);
    return () => clearInterval(id);
  }, []);

  /* ── Three.js — ambient edge decorations only ───────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 120);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ── Large background ring (far back, subtle arc across scene) */
    const bgGeo = new THREE.TorusGeometry(16, 0.05, 6, 120);
    const bgMat = new THREE.MeshBasicMaterial({ color: 0xc9922a, transparent: true, opacity: 0.12 });
    const bgRing = new THREE.Mesh(bgGeo, bgMat);
    bgRing.rotation.x = 0.55;
    bgRing.position.set(2, 1, -12);
    scene.add(bgRing);

    /* ── Corner accent tori — positioned well off-center ── */
    const cornerDefs = [
      /* top-left  */ { pos: [-17, 12, -4],  r: 8, tube: 0.045, col: 0xc9922a, op: 0.28, rx: 0.3,  ry: 0.2,  dx: 0.0022, dy: 0.0014 },
      /* bot-right */ { pos: [  17, -12, -5], r: 8, tube: 0.045, col: 0xd4a84b, op: 0.22, rx: 1.1,  ry: 0.5,  dx: -0.0018, dy: 0.0020 },
      /* top-right */ { pos: [  16, 11, -6],  r: 6, tube: 0.035, col: 0xb8821f, op: 0.16, rx: 0.6,  ry: 1.2,  dx: 0.0015, dy: -0.0012 },
      /* bot-left  */ { pos: [-15, -11, -5], r: 6, tube: 0.035, col: 0xc9922a, op: 0.14, rx: -0.4, ry: 0.8,  dx: -0.0020, dy: 0.0018 },
    ];

    const corners = cornerDefs.map(d => {
      const geo  = new THREE.TorusGeometry(d.r, d.tube, 6, 64);
      const mat  = new THREE.MeshBasicMaterial({ color: d.col, transparent: true, opacity: d.op });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(d.rx, d.ry, 0);
      mesh.position.set(...d.pos);
      mesh.userData = { dx: d.dx, dy: d.dy };
      scene.add(mesh);
      return mesh;
    });

    /* ── Ambient particle dust — spread across the full background */
    const DUST = 280;
    const dustPos = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * 50;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 36;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xc9922a, size: 0.055,
      transparent: true, opacity: 0.32, sizeAttenuation: true,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    /* ── Tick ── */
    let t = 0, raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.005;

      bgRing.rotation.z += 0.0008;
      bgRing.rotation.y += 0.0005;

      corners.forEach(m => {
        m.rotation.x += m.userData.dx;
        m.rotation.y += m.userData.dy;
      });

      dust.rotation.y += 0.0008;
      dust.rotation.x  = Math.sin(t * 0.2) * 0.03;

      /* subtle camera drift — stays well away from center */
      camera.position.x = Math.sin(t * 0.3) * 0.6;
      camera.position.y = Math.cos(t * 0.22) * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      bgGeo.dispose(); bgMat.dispose();
      corners.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
      dustGeo.dispose(); dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`loader-overlay ${exiting ? 'loader-exit' : ''}`} aria-live="polite" aria-label="Loading">

      {/* Three.js canvas — background only */}
      <canvas className="loader-canvas" ref={canvasRef} aria-hidden="true" />

      {/* Grain texture */}
      <div className="loader-grain" aria-hidden="true" />

      {/* Soft ambient glows at corners */}
      <div className="loader-glow loader-glow-1" aria-hidden="true" />
      <div className="loader-glow loader-glow-2" aria-hidden="true" />

      {/* ── Main card — frosted glass panel ── */}
      <div className="loader-card">

        {/* CSS spinning rings + GIF */}
        <div className="loader-ring-wrap">
          <div className="loader-ring loader-ring-outer" />
          <div className="loader-ring loader-ring-mid"   />
          <div className="loader-ring loader-ring-inner" />
          <div className="loader-gif-circle">
            <img src="/spraying.gif" alt="" className="loader-gif" aria-hidden="true" />
          </div>
        </div>

        <p className="loader-brand">SHIVAM AGROTECH</p>

        <p className="loader-subtext">
          Preparing your experience<span className="loader-dots" />
        </p>

        <div className="loader-track">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>

        <span className="loader-pct">{progress}%</span>
      </div>
    </div>
  );
}

Loader.propTypes = {
  exiting: PropTypes.bool,
};

export default Loader;
