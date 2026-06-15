import { useState, useRef, useEffect } from 'react';
import { PhoneOutlined, SendOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const submitRef  = useRef(null);

  /* ── Three.js drifting particle field ────────────────────────── */
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const w = section.offsetWidth;
    const h = section.offsetHeight || 900;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const COUNT = 280;
    const pos   = new Float32Array(COUNT * 3);
    const vel   = [];

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 55;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 5;
      vel.push({ x: (Math.random() - 0.5) * 0.009, y: (Math.random() - 0.5) * 0.007 });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xb8821f,
      size: 0.07,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* Secondary small accent dots */
    const pos2   = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      pos2[i * 3]     = (Math.random() - 0.5) * 55;
      pos2[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    const geo2 = new THREE.BufferGeometry();
    geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
    const mat2 = new THREE.PointsMaterial({ color: 0xc9922a, size: 0.035, transparent: true, opacity: 0.22, sizeAttenuation: true });
    scene.add(new THREE.Points(geo2, mat2));

    let mx = 0, my = 0;
    const onMouse = e => {
      mx =  (e.clientX / window.innerWidth  - 0.5);
      my = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const posAttr = geo.attributes.position;
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      for (let i = 0; i < COUNT; i++) {
        posAttr.array[i * 3]     += vel[i].x;
        posAttr.array[i * 3 + 1] += vel[i].y;
        if (posAttr.array[i * 3]     >  28) posAttr.array[i * 3]     = -28;
        if (posAttr.array[i * 3]     < -28) posAttr.array[i * 3]     =  28;
        if (posAttr.array[i * 3 + 1] >  22) posAttr.array[i * 3 + 1] = -22;
        if (posAttr.array[i * 3 + 1] < -22) posAttr.array[i * 3 + 1] =  22;
      }
      posAttr.needsUpdate = true;

      camera.position.x += (mx * 3 - camera.position.x) * 0.025;
      camera.position.y += (my * 2 - camera.position.y) * 0.025;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const nw = section.offsetWidth;
      const nh = section.offsetHeight || h;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      geo.dispose(); mat.dispose();
      geo2.dispose(); mat2.dispose();
      renderer.dispose();
    };
  }, []);

  /* ── GSAP entrance animations ────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Section header */
      gsap.from('.cs-section-tag, .cs-section-title', {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.85, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.cs-section-header', start: 'top 90%', once: true },
      });

      /* Form section split-slide */
      gsap.from('.cs-form-left', {
        opacity: 0, x: -60, duration: 0.85, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.cs-form-section', start: 'top 90%', once: true },
      });
      gsap.from('.cs-form-right', {
        opacity: 0, x: 60, duration: 0.85, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.cs-form-section', start: 'top 90%', once: true },
      });

    }, sectionRef);

    /* Refresh after layout settles so trigger positions are accurate */
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => { clearTimeout(t); ctx.revert(); };
  }, []);

  /* ── Card entrance — IntersectionObserver for reliability ──────── */
  useEffect(() => {
    const cards = [...(sectionRef.current?.querySelectorAll('.cs-card') || [])];
    if (!cards.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const idx = cards.indexOf(entry.target);
        gsap.fromTo(entry.target,
          { opacity: 0, y: 60, rotateY: -15, transformOrigin: '50% 50% -60px' },
          { opacity: 1, y: 0, rotateY: 0, duration: 0.85, ease: 'back.out(1.4)', delay: idx * 0.14 }
        );
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  /* ── Magnetic submit button ──────────────────────────────────── */
  useEffect(() => {
    const btn = submitRef.current;
    if (!btn) return;

    const onMove = e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width  / 2)) * 0.3;
      const y = (e.clientY - (r.top  + r.height / 2)) * 0.3;
      gsap.to(btn, { x, y, duration: 0.35, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave); };
  }, [sent]);

  /* ── Card hover 3D ────────────────────────────────────────────── */
  useEffect(() => {
    const cards    = sectionRef.current?.querySelectorAll('.cs-card') || [];
    const cleanups = [];

    cards.forEach(card => {
      const onMove = e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, { rotateY: x * 14, rotateX: -y * 10, scale: 1.04, duration: 0.3, ease: 'power2.out' });
      };
      const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.55, ease: 'back.out(2)' });
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  return (
    <section className="cs-section" id="contact" ref={sectionRef}>

      {/* WebGL particle canvas */}
      <canvas className="cs-webgl-canvas" ref={canvasRef} aria-hidden="true" />

      {/* Radial glow blobs */}
      <div className="cs-glow cs-glow-1" aria-hidden="true" />
      <div className="cs-glow cs-glow-2" aria-hidden="true" />

      {/* ── Section heading ─────────────────────────────────────── */}
      <div className="cs-section-header">
        <span className="cs-section-tag">Get In Touch</span>
        <h2 className="cs-section-title">Connect With <em>Us</em></h2>
      </div>

      {/* ── Three contact cards ─────────────────────────────────── */}
      <div className="cs-cards">

        <div className="cs-card cs-card-gold" data-num="01">
          <div className="cs-card-icon"><PhoneOutlined /></div>
          <div className="cs-card-content">
            <h3 className="cs-card-title">Call Us</h3>
            <div className="cs-card-divider" />
            <p className="cs-card-line">Sales: +91 8320287041</p>
            <p className="cs-card-line">Support: +91 8320287041</p>
          </div>
        </div>

        <div className="cs-card cs-card-dark" data-num="02">
          <div className="cs-card-icon"><SendOutlined /></div>
          <div className="cs-card-content">
            <h3 className="cs-card-title">Write Us</h3>
            <div className="cs-card-divider" />
            <p className="cs-card-line">info@shivamagrotech.com</p>
            <p className="cs-card-line">support@shivamagrotech.com</p>
          </div>
        </div>

        <div className="cs-card cs-card-light" data-num="03">
          <div className="cs-card-icon"><EnvironmentOutlined /></div>
          <div className="cs-card-content">
            <h3 className="cs-card-title">Visit Us</h3>
            <div className="cs-card-divider" />
            <p className="cs-card-line">Rajkot, Gujarat, India</p>
            <p className="cs-card-line">Mon – Sat, 9 AM – 6 PM</p>
          </div>
        </div>

      </div>

      {/* ── Contact form ────────────────────────────────────────── */}
      <div className="cs-form-section">

        <div className="cs-form-left">
          <span className="cs-tag">Contact Us</span>
          <h2 className="cs-heading">Send Us a <em>Message</em></h2>
          <p className="cs-subtext">
            Have a question about our products or need after-sales support?
            Fill out the form and we&rsquo;ll get back to you within 24 hours.
          </p>
          <div className="cs-form-badge">
            <span className="cs-form-badge-dot" />
            Typically replies within 24 hours
          </div>
        </div>

        <div className="cs-form-right">
          {sent ? (
            <div className="cs-success">
              <span className="cs-success-icon">✦</span>
              Thank you! We&rsquo;ll get back to you within 24 hours.
            </div>
          ) : (
            <form className="cs-form" onSubmit={handleSubmit}>
              <div className="cs-input-row">
                <div className="cs-input-group">
                  <label className="cs-input-label">Full name</label>
                  <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
                <div className="cs-input-group">
                  <label className="cs-input-label">Email address</label>
                  <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="cs-input-group">
                <label className="cs-input-label">Phone number <span className="cs-optional">(optional)</span></label>
                <input name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} />
              </div>
              <div className="cs-input-group">
                <label className="cs-input-label">Your message</label>
                <textarea name="message" rows={5} placeholder="Tell us how we can help…" value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="cs-submit" ref={submitRef}>
                <span className="cs-submit-text">Send Message</span>
                <span className="cs-submit-arrow">——→</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
}

export default ContactSection;
