import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import ProductModal from './ProductModal';
import './Categories.css';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: 1, name: 'OEM Products',     desc: 'Genuine certified parts built for precision and long-lasting performance.',          image: 'https://picsum.photos/400/400?random=101' },
  { id: 2, name: 'Battery Sprayers', desc: 'Eco-friendly battery-powered sprayers for efficient crop protection.',                image: 'https://picsum.photos/400/400?random=102' },
  { id: 3, name: 'Power Sprayers',   desc: 'High-pressure engine sprayers designed for large-scale field coverage.',             image: 'https://picsum.photos/400/400?random=103' },
  { id: 4, name: 'Brush Cutters',    desc: 'Heavy-duty brush cutters that tackle dense vegetation with ease.',                   image: 'https://picsum.photos/400/400?random=104' },
  { id: 5, name: 'Water Pumps',      desc: 'High-flow pumps engineered for reliable irrigation and drainage.',                   image: 'https://picsum.photos/400/400?random=105' },
  { id: 6, name: 'Car Washers',      desc: 'Powerful jet washers that deliver a spotless clean every time.',                    image: 'https://picsum.photos/400/400?random=106' },
  { id: 7, name: 'Chainsaws',        desc: 'Professional-grade chainsaws for timber cutting and land clearing.',                 image: 'https://picsum.photos/400/400?random=107' },
  { id: 8, name: 'Tillers',          desc: 'Electric and petrol tillers that prepare soil for optimal yield.',                   image: 'https://picsum.photos/400/400?random=108' },
];

const ALL_PRODUCTS = {
  'OEM Products': [
    { id: 1,  name: 'Genuine OEM Engine Parts Kit',          desc: 'Factory-certified engine components ensuring peak performance and long-lasting durability.', image: 'https://picsum.photos/400/320?random=201', price: 4499,  originalPrice: 6999,  badge: 'Certified',   specs: ['Factory-certified OEM grade components', 'Compatible with all Balwaan engine series', 'Anti-corrosion treated finish', '12-month manufacturer warranty', 'ISO 9001 certified quality'] },
    { id: 2,  name: 'OEM Carburettor Assembly',              desc: 'Precision-machined carburettor for smooth fuel delivery across all weather conditions.',     image: 'https://picsum.photos/400/320?random=202', price: 1899,  originalPrice: 2999,  badge: 'Genuine',     specs: ['Precision CNC-machined body', 'All-weather fuel delivery performance', 'OEM fitment guaranteed', 'Compatible: BX-35 / BX-50B / BX-52 series', '6-month warranty'] },
    { id: 3,  name: 'OEM Air Filter Set (Pack of 3)',        desc: 'Original air filters providing superior dust protection and improved engine efficiency.',     image: 'https://picsum.photos/400/320?random=203', price: 699,   originalPrice: 1099,  badge: null,          specs: ['Multi-layer filtration media', 'Filters particles down to 10 microns', 'Compatible with BS / BX / PT series', 'Pack of 3 units', 'Easy drop-in replacement'] },
    { id: 4,  name: 'OEM Piston & Cylinder Kit',             desc: 'Precision-engineered piston kit for full engine rebuilds and overhauls.',                   image: 'https://picsum.photos/400/320?random=204', price: 3299,  originalPrice: 4999,  badge: 'Hot Deal',    specs: ['Chrome-plated cylinder bore', 'Precision-ground piston rings', 'Fits all 52cc Balwaan engines', 'Complete gasket set included', '12-month warranty on components'] },
  ],
  'Battery Sprayers': [
    { id: 5,  name: 'Balwaan BS-22D Double Motor Sprayer',   desc: 'Dual-motor 12V sprayer delivering consistent pressure across a large 22L tank.',            image: 'https://picsum.photos/400/320?random=205', price: 6499,  originalPrice: 8999,  badge: 'Best Seller', specs: ['22L HDPE tank capacity', 'Dual 12V × 12Ah motors', 'Pressure: 2–4 bar adjustable', 'Battery runtime: 4–6 hours per charge', 'Weight: 5.2 kg (empty)'] },
    { id: 6,  name: 'Balwaan BS-20 Single Motor Sprayer',    desc: 'Lightweight everyday sprayer with an easy-grip handle and a 20L capacity tank.',            image: 'https://picsum.photos/400/320?random=206', price: 4999,  originalPrice: 6500,  badge: null,          specs: ['20L HDPE tank capacity', 'Single 12V × 8Ah motor', 'Pressure: 2–3 bar', 'Battery runtime: 5–7 hours per charge', 'Weight: 4.8 kg (empty)'] },
    { id: 7,  name: 'Balwaan Eco-Spray 16L Battery Sprayer', desc: 'Eco-friendly electric sprayer for precise, even crop protection on small fields.',          image: 'https://picsum.photos/400/320?random=207', price: 3799,  originalPrice: 5200,  badge: 'New',         specs: ['16L HDPE tank', 'Brushless motor — low noise', 'Pressure: 1.5–3 bar', 'Battery runtime: up to 8 hours', 'Includes adjustable nozzle set'] },
    { id: 8,  name: 'Balwaan Pro-Spray 20L Lithium Sprayer', desc: 'Lithium-battery powered sprayer with 6-hour runtime and auto-pressure control.',            image: 'https://picsum.photos/400/320?random=208', price: 8499,  originalPrice: 11000, badge: 'Trending',    specs: ['20L tank with lithium-ion battery', 'Auto pressure regulation', 'Runtime: up to 6 hours on full charge', 'Digital charge indicator', 'USB-C charging port'] },
  ],
  'Power Sprayers': [
    { id: 9,  name: 'Balwaan HTP Sprayer 6.5HP Engine',      desc: 'High-throughput power sprayer with a 50m hose for wide, uniform field coverage.',           image: 'https://picsum.photos/400/320?random=209', price: 32000, originalPrice: 45000, badge: 'Hot Deal',    specs: ['6.5HP 4-stroke petrol engine', '50-metre delivery hose', 'Pressure: up to 40 bar', 'Flow rate: 20–25 L/min', 'Weight: 42 kg'] },
    { id: 10, name: 'Balwaan Mist Blower MB-52',              desc: 'Backpack mist blower built for orchard and plantation pesticide application.',              image: 'https://picsum.photos/400/320?random=210', price: 16500, originalPrice: 22000, badge: null,          specs: ['52cc 2-stroke engine', '14L tank capacity', 'Air volume: 800 m³/hr', 'Range: up to 8m horizontal', 'Weight: 9.5 kg (empty)'] },
    { id: 11, name: 'Balwaan Power Sprayer 5HP Honda',        desc: 'Honda-engine powered sprayer designed for high-pressure, wide-reach spraying.',             image: 'https://picsum.photos/400/320?random=211', price: 28500, originalPrice: 38000, badge: 'Best Seller', specs: ['5HP genuine Honda 4-stroke engine', 'Pressure: up to 35 bar', 'Pump: 3-piston diaphragm', 'Flow rate: 18–22 L/min', '30m hose included'] },
  ],
  'Brush Cutters': [
    { id: 12, name: 'Balwaan BX-52 52cc Side Pack Cutter',   desc: 'Professional-grade side-pack brush cutter for tackling the toughest vegetation.',          image: 'https://picsum.photos/400/320?random=212', price: 8999,  originalPrice: 15999, badge: 'Best Seller', specs: ['52cc 2-stroke engine', '3-tooth blade + nylon head included', 'Weight: 10.2 kg', 'Side-pack frame for reduced fatigue', '2-year warranty'] },
    { id: 13, name: 'Balwaan BX-50B 50cc Backpack Cutter',   desc: 'Ergonomic backpack design engineered for extended field operation without fatigue.',        image: 'https://picsum.photos/400/320?random=213', price: 10499, originalPrice: 14000, badge: null,          specs: ['50cc 2-stroke engine', 'Padded ergonomic backpack harness', 'Weight: 11.5 kg', '255mm blade diameter', 'Anti-vibration handle system'] },
    { id: 14, name: 'Balwaan BX-35 Shoulder Brush Cutter',   desc: 'Compact shoulder-type cutter ideal for small farms and residential gardens.',              image: 'https://picsum.photos/400/320?random=214', price: 6299,  originalPrice: 8500,  badge: 'New',         specs: ['35cc 2-stroke engine', 'Lightweight: 7.8 kg', 'Single shoulder harness', 'Nylon cord head + blade included', '1-year warranty'] },
  ],
  'Water Pumps': [
    { id: 15, name: 'Balwaan Petrol Water Pump 2 Inch',      desc: 'Compact petrol pump delivering high-volume water flow for reliable field irrigation.',      image: 'https://picsum.photos/400/320?random=215', price: 14999, originalPrice: 18500, badge: null,          specs: ['5.5HP 4-stroke petrol engine', '2-inch inlet & outlet', 'Flow rate: 500 L/min', 'Max head: 28 metres', 'Weight: 19 kg'] },
    { id: 16, name: 'Balwaan 3-Inch High Flow Pump',         desc: '3-inch inlet/outlet engine pump for rapid drainage and large-scale irrigation.',            image: 'https://picsum.photos/400/320?random=216', price: 19500, originalPrice: 25000, badge: 'Hot Deal',    specs: ['6.5HP 4-stroke engine', '3-inch inlet & outlet', 'Flow rate: 1100 L/min', 'Max head: 26 metres', 'Weight: 28 kg'] },
    { id: 17, name: 'Balwaan Electric Submersible Pump',     desc: 'Heavy-duty submersible pump for deep borewell and tank irrigation.',                       image: 'https://picsum.photos/400/320?random=217', price: 8999,  originalPrice: 12000, badge: 'New',         specs: ['1.5HP electric motor', 'Max depth: 25 metres', 'Flow rate: 150 L/min', 'Stainless steel impeller', 'IP68 waterproof rated'] },
  ],
  'Car Washers': [
    { id: 18, name: 'Balwaan Pressure Washer PW-150',        desc: '150-bar electric pressure washer that delivers a spotless vehicle clean every time.',       image: 'https://picsum.photos/400/320?random=218', price: 8499,  originalPrice: 11999, badge: 'New',         specs: ['1800W induction motor', 'Pressure: 150 bar max', 'Flow rate: 6.5 L/min', '5m high-pressure hose included', 'Thermal overload protection'] },
    { id: 19, name: 'Balwaan Heavy-Duty Jet Washer PW-200',  desc: '200-bar commercial-grade jet washer built for stubborn grime and large surfaces.',          image: 'https://picsum.photos/400/320?random=219', price: 13999, originalPrice: 19000, badge: null,          specs: ['2200W induction motor', 'Pressure: 200 bar max', 'Flow rate: 8 L/min', 'Adjustable lance + foam cannon included', 'Self-priming pump'] },
    { id: 20, name: 'Balwaan Portable Foam Washer PW-100',   desc: 'Compact foam washer with snap-on foam cannon for rich, touchless car washing.',             image: 'https://picsum.photos/400/320?random=220', price: 5499,  originalPrice: 7500,  badge: 'Trending',    specs: ['1400W motor', 'Pressure: 100 bar max', 'Snap-on foam cannon included', 'Compact & portable design', 'Weight: 4.2 kg'] },
  ],
  'Chainsaws': [
    { id: 21, name: 'Balwaan CS-18 Professional Chainsaw',   desc: 'Precision chainsaw with an 18-inch bar for timber cutting and land clearing.',              image: 'https://picsum.photos/400/320?random=221', price: 8750,  originalPrice: 12500, badge: 'Trending',    specs: ['52cc 2-stroke engine', '18-inch guide bar', 'Anti-vibration system', 'Chain brake safety feature', 'Weight: 5.6 kg'] },
    { id: 22, name: 'Balwaan CS-14 Compact Chainsaw',        desc: 'Lightweight 14-inch chainsaw perfect for pruning and medium tree felling tasks.',           image: 'https://picsum.photos/400/320?random=222', price: 5999,  originalPrice: 8200,  badge: null,          specs: ['38cc 2-stroke engine', '14-inch guide bar', 'Low-kickback chain', 'Tool-free chain tensioning', 'Weight: 4.8 kg'] },
    { id: 23, name: 'Balwaan CS-22 Heavy-Duty Chainsaw',     desc: '22-inch heavy-duty chainsaw for large timber and dense forest clearing.',                  image: 'https://picsum.photos/400/320?random=223', price: 14999, originalPrice: 20000, badge: 'Best Seller', specs: ['65cc 2-stroke engine', '22-inch guide bar', 'Decompression valve for easy start', 'Automatic chain lubrication', 'Weight: 7.2 kg'] },
  ],
  'Tillers': [
    { id: 24, name: 'Balwaan Electric Tiller ET-6',          desc: 'Electric cultivator that breaks and aerates soil for optimal crop growth.',                image: 'https://picsum.photos/400/320?random=224', price: 19999, originalPrice: 25000, badge: 'New',         specs: ['1500W electric motor', 'Tilling width: 40 cm', 'Tilling depth: up to 20 cm', '6 heavy-duty steel tines', 'Weight: 18 kg'] },
    { id: 25, name: 'Balwaan Petrol Tiller PT-65',           desc: 'Powerful 65cc petrol tiller for deep soil cultivation across large fields.',               image: 'https://picsum.photos/400/320?random=225', price: 28000, originalPrice: 35000, badge: null,          specs: ['65cc 4-stroke petrol engine', 'Tilling width: 60 cm', 'Tilling depth: up to 30 cm', '4-speed forward + 1 reverse', 'Weight: 65 kg'] },
    { id: 26, name: 'Balwaan Mini Tiller MT-35',             desc: 'Compact mini tiller ideal for raised-bed gardens and tight row spacing.',                  image: 'https://picsum.photos/400/320?random=226', price: 12500, originalPrice: 17000, badge: 'Hot Deal',    specs: ['35cc 2-stroke engine', 'Tilling width: 25 cm', 'Tilling depth: up to 18 cm', 'Foldable handles for storage', 'Weight: 12 kg'] },
  ],
};

const TABS    = ['All', ...CATEGORIES.map(c => c.name)];
const ALL_FLAT = Object.entries(ALL_PRODUCTS).flatMap(([cat, list]) =>
  list.map(p => ({ ...p, category: cat }))
);

function Categories() {
  const [selected,        setSelected]        = useState('All');
  const [animKey,         setAnimKey]         = useState(0);
  const [activeProduct,   setActiveProduct]   = useState(null);

  const closeModal = useCallback(() => setActiveProduct(null), []);

  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const gridRef    = useRef(null);
  const productRef = useRef(null);

  /* ── Three.js WebGL floating-geometry background ─────────────── */
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const w = section.offsetWidth;
    const h = section.offsetHeight || 1200;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const meshCfgs = [
      { geo: new THREE.IcosahedronGeometry(2.5, 1),       op: 0.18, col: 0xb8821f },
      { geo: new THREE.TorusGeometry(2, 0.35, 8, 20),     op: 0.14, col: 0xc9922a },
      { geo: new THREE.OctahedronGeometry(2, 0),           op: 0.16, col: 0xb8821f },
      { geo: new THREE.IcosahedronGeometry(3.8, 0),        op: 0.1,  col: 0xd4a84b },
      { geo: new THREE.TorusGeometry(1.5, 0.3, 8, 16),    op: 0.19, col: 0xb8821f },
      { geo: new THREE.OctahedronGeometry(1.6, 1),         op: 0.15, col: 0xc9922a },
      { geo: new THREE.IcosahedronGeometry(1.8, 1),        op: 0.2,  col: 0xb8821f },
      { geo: new THREE.TorusGeometry(2.8, 0.45, 8, 14),   op: 0.11, col: 0xd4a84b },
      { geo: new THREE.OctahedronGeometry(2.4, 0),         op: 0.14, col: 0xc9922a },
    ];

    const meshes = meshCfgs.map(cfg => {
      const mat  = new THREE.MeshBasicMaterial({ color: cfg.col, wireframe: true, transparent: true, opacity: cfg.op });
      const mesh = new THREE.Mesh(cfg.geo, mat);
      const sp   = 28;
      mesh.position.set((Math.random() - 0.5) * sp, (Math.random() - 0.5) * (h / w) * sp, (Math.random() - 0.5) * 8 - 2);
      mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);
      mesh.userData.rx = (Math.random() - 0.5) * 0.004;
      mesh.userData.ry = (Math.random() - 0.5) * 0.006;
      scene.add(mesh);
      return mesh;
    });

    let mx = 0, my = 0;
    const onMouse = e => {
      mx =  (e.clientX / window.innerWidth  - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      meshes.forEach(m => { m.rotation.x += m.userData.rx; m.rotation.y += m.userData.ry; });
      camera.position.x += (mx * 2.5 - camera.position.x) * 0.03;
      camera.position.y += (my * 1.8 - camera.position.y) * 0.03;
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
      meshes.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
      renderer.dispose();
    };
  }, []);

  /* ── GSAP ScrollTrigger entrance animations ──────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.section-tag-light', {
        opacity: 0, x: -30, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.section-tag-light', start: 'top 92%', once: true },
      });

      gsap.from('.title-plain, .title-em', {
        opacity: 0, y: 70, rotationX: -50,
        transformOrigin: '50% 50% -60px',
        stagger: 0.18, duration: 0.9, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.section-title-light', start: 'top 88%', once: true },
      });

      gsap.from('.section-divider-light', {
        scaleX: 0, transformOrigin: 'center center',
        duration: 0.7, delay: 0.35, ease: 'power3.out',
        scrollTrigger: { trigger: '.section-divider-light', start: 'top 92%', once: true },
      });

      gsap.from('.section-subtitle-light', {
        opacity: 0, y: 25, duration: 0.7, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.section-subtitle-light', start: 'top 92%', once: true },
      });

      gsap.from('.cat-card', {
        opacity: 0, y: 60, rotateX: 18,
        stagger: 0.08, duration: 0.85, ease: 'back.out(1.5)',
        immediateRender: false,
        scrollTrigger: { trigger: '.categories-grid', start: 'top 88%', once: true },
      });

      gsap.from('.cat-stats-item', {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.cat-stats-strip', start: 'top 88%', once: true },
      });

      gsap.from('.cat-stats-num', {
        scale: 0.5, opacity: 0, stagger: 0.12, duration: 0.55, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.cat-stats-strip', start: 'top 88%', once: true },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── 3-D tilt on category cards ─────────────────────────────── */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards    = [...gridRef.current.querySelectorAll('.cat-card')];
    const cleanups = [];

    cards.forEach(card => {
      const onMove = e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, { rotateY: x * 16, rotateX: -y * 11, duration: 0.25, ease: 'power2.out' });
      };
      const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'back.out(1.8)' });
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  /* ── Product card reveal + hover on every filter change ─────── */
  useEffect(() => {
    if (!productRef.current) return;
    const cards    = [...productRef.current.querySelectorAll('.cat-prod-card')];
    const cleanups = [];

    gsap.fromTo(cards,
      { opacity: 0, y: 65, clipPath: 'inset(25% 0% 0% 0% round 14px)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 14px)', stagger: 0.06, duration: 0.6, ease: 'power3.out', clearProps: 'clipPath' }
    );

    cards.forEach(card => {
      const onEnter = () => {
        gsap.to(card, { y: -9, duration: 0.3, ease: 'power2.out',
          boxShadow: '0 28px 72px rgba(201,146,42,0.25), 0 0 0 1px rgba(201,146,42,0.35)' });
        const img = card.querySelector('.cat-prod-img');
        if (img) gsap.to(img, { scale: 1.1, duration: 0.55, ease: 'power2.out' });
      };
      const onLeave = () => {
        gsap.to(card, { y: 0, duration: 0.45, ease: 'power3.out',
          boxShadow: '0 2px 20px rgba(0,0,0,0.2)' });
        const img = card.querySelector('.cat-prod-img');
        if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
      };
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { card.removeEventListener('mouseenter', onEnter); card.removeEventListener('mouseleave', onLeave); });
    });

    return () => cleanups.forEach(fn => fn());
  }, [animKey]);

  const products = selected === 'All'
    ? ALL_FLAT
    : (ALL_PRODUCTS[selected] || []).map(p => ({ ...p, category: selected }));

  const selectAndScroll = catName => {
    setSelected(catName);
    setAnimKey(k => k + 1);
    setTimeout(() => {
      productRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleTabClick = tab => { setSelected(tab); setAnimKey(k => k + 1); };

  return (
    <>
    <section className="categories-section" id="categories" ref={sectionRef}>

      {/* WebGL background canvas */}
      <canvas className="cat-webgl-canvas" ref={canvasRef} aria-hidden="true" tabIndex={-1} />

      {/* Decorative */}
      <div className="categories-watermark" aria-hidden="true">Our Products</div>
      <div className="cat-noise" aria-hidden="true" />

      <div className="categories-inner">

        {/* ── Sticky wrapper: header + grid stay visible on scroll ── */}
        <div className="cat-sticky-top">

          {/* ── Section header ─────────────────────────────────────── */}
          <div className="section-header">
            <span className="section-tag-light">Browse</span>
            <h2 className="section-title-light">
              <span className="title-plain">Shop by</span>{' '}
              <em className="title-em">Category</em>
            </h2>
            <div className="section-divider-light" />
            <p className="section-subtitle-light">Click a category to explore its products below</p>
          </div>

          {/* ── Category cards ──────────────────────────────────────── */}
          <div className="categories-grid" ref={gridRef}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`cat-card ${selected === cat.name ? 'cat-card-active' : ''}`}
                onClick={() => selectAndScroll(cat.name)}
                aria-label={`Browse ${cat.name}`}
              >
                <div className="cat-img-circle">
                  <img src={cat.image} alt={cat.name} className="cat-img" loading="lazy" />
                  <div className="cat-img-overlay" aria-hidden="true" />
                </div>
                <h3 className="cat-name">{cat.name}</h3>
                <p className="cat-desc">{cat.desc}</p>
                <div className="cat-card-shine" aria-hidden="true" />
              </button>
            ))}
          </div>

        </div>

        {/* ── Stats strip ─────────────────────────────────────────── */}
        <div className="cat-stats-strip" aria-label="Key statistics">
          {[
            { num: '1,500+',   lbl: 'Active Dealers'  },
            { num: '1,92,852', lbl: 'Products Sold'   },
            { num: '10 Lakh+', lbl: 'Farmers Served'  },
            { num: '60%',      lbl: 'Max Savings'     },
          ].map((s, i) => (
            <div key={s.lbl} className="cat-stats-item-wrap">
              {i > 0 && <div className="cat-stats-sep" aria-hidden="true" />}
              <div className="cat-stats-item">
                <span className="cat-stats-num">{s.num}</span>
                <span className="cat-stats-lbl">{s.lbl}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Product listing ─────────────────────────────────────── */}
        <div className="cat-listing" id="products" ref={productRef}>

          <div className="cat-listing-header">
            <div>
              <h3 className="cat-listing-title">{selected === 'All' ? 'All Products' : selected}</h3>
              <p className="cat-listing-count">{products.length} product{products.length === 1 ? '' : 's'} available</p>
            </div>
          </div>

          <div className="cat-filter-wrap">
            <div className="cat-filter-tabs">
              {TABS.map(tab => (
                <button
                  key={tab}
                  className={`cat-filter-tab ${selected === tab ? 'cat-filter-tab-active' : ''}`}
                  onClick={() => handleTabClick(tab)}
                >{tab}</button>
              ))}
            </div>
          </div>

          <div className="cat-prod-grid" key={animKey}>
            {products.map((p, i) => (
              <div key={p.id} className="cat-prod-card" style={{ animationDelay: `${Math.min(i, 7) * 0.06}s` }}>
                <div className="cat-prod-img-wrap">
                  {p.badge && <span className="cat-prod-badge">{p.badge}</span>}
                  <img src={p.image} alt={p.name} className="cat-prod-img" loading="lazy" />
                  <div className="cat-prod-img-shimmer" aria-hidden="true" />
                </div>
                <div className="cat-prod-body">
                  <span className="cat-prod-cat-label">{p.category}</span>
                  <h3 className="cat-prod-name">{p.name}</h3>
                  <p className="cat-prod-desc">{p.desc}</p>
                  <div className="cat-prod-price-row">
                    <span className="cat-prod-price">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="cat-prod-original">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="cat-prod-savings">{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF</span>
                  </div>
                  <div className="cat-prod-actions">
                    <button
                      className="cat-prod-btn-view"
                      onClick={() => setActiveProduct({ ...p })}
                    >
                      View Details
                    </button>
                    <button className="cat-prod-btn-enquire">Enquire</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>

    {activeProduct && (
      <ProductModal product={activeProduct} onClose={closeModal} />
    )}
    </>
  );
}

export default Categories;
