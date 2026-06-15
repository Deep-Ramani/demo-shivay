import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CategoriesPage.css';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_LIST = [
  'OEM Products', 'Battery Sprayers', 'Power Sprayers',
  'Brush Cutters', 'Water Pumps', 'Car Washers', 'Chainsaws', 'Tillers',
];

const CATEGORY_CIRCLES = [
  { name: 'OEM Products',     image: 'https://picsum.photos/400/400?random=101' },
  { name: 'Battery Sprayers', image: 'https://picsum.photos/400/400?random=102' },
  { name: 'Power Sprayers',   image: 'https://picsum.photos/400/400?random=103' },
  { name: 'Brush Cutters',    image: 'https://picsum.photos/400/400?random=104' },
  { name: 'Water Pumps',      image: 'https://picsum.photos/400/400?random=105' },
  { name: 'Car Washers',      image: 'https://picsum.photos/400/400?random=106' },
  { name: 'Chainsaws',        image: 'https://picsum.photos/400/400?random=107' },
  { name: 'Tillers',          image: 'https://picsum.photos/400/400?random=108' },
];

const ALL_PRODUCTS = {
  'OEM Products': [
    { id: 1,  name: 'Genuine OEM Engine Parts Kit',        desc: 'Factory-certified engine components ensuring peak performance and long-lasting durability.', image: 'https://picsum.photos/400/320?random=201', price: 4499,  originalPrice: 6999,  badge: 'Certified'   },
    { id: 2,  name: 'OEM Carburettor Assembly',            desc: 'Precision-machined carburettor for smooth fuel delivery across all weather conditions.',     image: 'https://picsum.photos/400/320?random=202', price: 1899,  originalPrice: 2999,  badge: 'Genuine'     },
    { id: 3,  name: 'OEM Air Filter Set (Pack of 3)',      desc: 'Original air filters providing superior dust protection and improved engine efficiency.',     image: 'https://picsum.photos/400/320?random=203', price: 699,   originalPrice: 1099,  badge: null          },
    { id: 4,  name: 'OEM Piston & Cylinder Kit',           desc: 'Precision-engineered piston kit for full engine rebuilds and overhauls.',                   image: 'https://picsum.photos/400/320?random=204', price: 3299,  originalPrice: 4999,  badge: 'Hot Deal'    },
  ],
  'Battery Sprayers': [
    { id: 5,  name: 'Balwaan BS-22D Double Motor Sprayer', desc: 'Dual-motor 12V sprayer delivering consistent pressure across a large 22L tank.',            image: 'https://picsum.photos/400/320?random=205', price: 6499,  originalPrice: 8999,  badge: 'Best Seller' },
    { id: 6,  name: 'Balwaan BS-20 Single Motor Sprayer',  desc: 'Lightweight everyday sprayer with an easy-grip handle and a 20L capacity tank.',            image: 'https://picsum.photos/400/320?random=206', price: 4999,  originalPrice: 6500,  badge: null          },
    { id: 7,  name: 'Balwaan Eco-Spray 16L Battery Sprayer',desc: 'Eco-friendly electric sprayer for precise, even crop protection on small fields.',         image: 'https://picsum.photos/400/320?random=207', price: 3799,  originalPrice: 5200,  badge: 'New'         },
    { id: 8,  name: 'Balwaan Pro-Spray 20L Lithium Sprayer',desc: 'Lithium-battery powered sprayer with 6-hour runtime and auto-pressure control.',           image: 'https://picsum.photos/400/320?random=208', price: 8499,  originalPrice: 11000, badge: 'Trending'    },
  ],
  'Power Sprayers': [
    { id: 9,  name: 'Balwaan HTP Sprayer 6.5HP Engine',    desc: 'High-throughput power sprayer with a 50m hose for wide, uniform field coverage.',           image: 'https://picsum.photos/400/320?random=209', price: 32000, originalPrice: 45000, badge: 'Hot Deal'    },
    { id: 10, name: 'Balwaan Mist Blower MB-52',            desc: 'Backpack mist blower built for orchard and plantation pesticide application.',              image: 'https://picsum.photos/400/320?random=210', price: 16500, originalPrice: 22000, badge: null          },
    { id: 11, name: 'Balwaan Power Sprayer 5HP Honda',      desc: 'Honda-engine powered sprayer designed for high-pressure, wide-reach spraying.',             image: 'https://picsum.photos/400/320?random=211', price: 28500, originalPrice: 38000, badge: 'Best Seller' },
  ],
  'Brush Cutters': [
    { id: 12, name: 'Balwaan BX-52 52cc Side Pack Cutter',  desc: 'Professional-grade side-pack brush cutter for tackling the toughest vegetation.',          image: 'https://picsum.photos/400/320?random=212', price: 8999,  originalPrice: 15999, badge: 'Best Seller' },
    { id: 13, name: 'Balwaan BX-50B 50cc Backpack Cutter',  desc: 'Ergonomic backpack design engineered for extended field operation without fatigue.',        image: 'https://picsum.photos/400/320?random=213', price: 10499, originalPrice: 14000, badge: null          },
    { id: 14, name: 'Balwaan BX-35 Shoulder Brush Cutter',  desc: 'Compact shoulder-type cutter ideal for small farms and residential gardens.',              image: 'https://picsum.photos/400/320?random=214', price: 6299,  originalPrice: 8500,  badge: 'New'         },
    { id: 15, name: 'Balwaan BX-75 Heavy-Duty Cutter',      desc: 'High-displacement heavy-duty cutter built for the most demanding terrains.',               image: 'https://picsum.photos/400/320?random=215', price: 13999, originalPrice: 19000, badge: null          },
  ],
  'Water Pumps': [
    { id: 16, name: 'Balwaan Petrol Water Pump 2 Inch',     desc: 'Compact petrol pump delivering high-volume water flow for reliable field irrigation.',      image: 'https://picsum.photos/400/320?random=216', price: 14999, originalPrice: 18500, badge: null          },
    { id: 17, name: 'Balwaan 3-Inch High Flow Pump',        desc: '3-inch inlet/outlet engine pump for rapid drainage and large-scale irrigation.',            image: 'https://picsum.photos/400/320?random=217', price: 19500, originalPrice: 25000, badge: 'Hot Deal'    },
    { id: 18, name: 'Balwaan Electric Submersible Pump',    desc: 'Heavy-duty submersible pump for deep borewell and tank irrigation.',                       image: 'https://picsum.photos/400/320?random=218', price: 8999,  originalPrice: 12000, badge: 'New'         },
  ],
  'Car Washers': [
    { id: 19, name: 'Balwaan Pressure Washer PW-150',       desc: '150-bar electric pressure washer that delivers a spotless vehicle clean every time.',       image: 'https://picsum.photos/400/320?random=219', price: 8499,  originalPrice: 11999, badge: 'New'         },
    { id: 20, name: 'Balwaan Heavy-Duty Jet Washer PW-200', desc: '200-bar commercial-grade jet washer built for stubborn grime and large surfaces.',          image: 'https://picsum.photos/400/320?random=220', price: 13999, originalPrice: 19000, badge: null          },
    { id: 21, name: 'Balwaan Portable Foam Washer PW-100',  desc: 'Compact foam washer with snap-on foam cannon for rich, touchless car washing.',             image: 'https://picsum.photos/400/320?random=221', price: 5499,  originalPrice: 7500,  badge: 'Trending'    },
  ],
  'Chainsaws': [
    { id: 22, name: 'Balwaan CS-18 Professional Chainsaw',  desc: 'Precision chainsaw with an 18-inch bar for timber cutting and land clearing.',              image: 'https://picsum.photos/400/320?random=222', price: 8750,  originalPrice: 12500, badge: 'Trending'    },
    { id: 23, name: 'Balwaan CS-14 Compact Chainsaw',       desc: 'Lightweight 14-inch chainsaw perfect for pruning and medium tree felling tasks.',           image: 'https://picsum.photos/400/320?random=223', price: 5999,  originalPrice: 8200,  badge: null          },
    { id: 24, name: 'Balwaan CS-22 Heavy-Duty Chainsaw',    desc: '22-inch heavy-duty chainsaw for large timber and dense forest clearing.',                  image: 'https://picsum.photos/400/320?random=224', price: 14999, originalPrice: 20000, badge: 'Best Seller' },
  ],
  'Tillers': [
    { id: 25, name: 'Balwaan Electric Tiller ET-6',         desc: 'Electric cultivator that breaks and aerates soil for optimal crop growth.',                image: 'https://picsum.photos/400/320?random=225', price: 19999, originalPrice: 25000, badge: 'New'         },
    { id: 26, name: 'Balwaan Petrol Tiller PT-65',          desc: 'Powerful 65cc petrol tiller for deep soil cultivation across large fields.',               image: 'https://picsum.photos/400/320?random=226', price: 28000, originalPrice: 35000, badge: null          },
    { id: 27, name: 'Balwaan Mini Tiller MT-35',            desc: 'Compact mini tiller ideal for raised-bed gardens and tight row spacing.',                  image: 'https://picsum.photos/400/320?random=227', price: 12500, originalPrice: 17000, badge: 'Hot Deal'    },
  ],
};

function CategoriesPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const decoded  = decodeURIComponent(categoryName || 'OEM Products');

  const [selected, setSelected] = useState(decoded);
  const [animKey,  setAnimKey]   = useState(0);

  const heroRef    = useRef(null);
  const sidebarRef = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const d = decodeURIComponent(categoryName || 'OEM Products');
    setSelected(d);
    setAnimKey(k => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryName]);

  /* ── Kinetic hero title on load ─────────────────────────────── */
  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(heroRef.current.querySelector('.cpage-breadcrumb'), { opacity: 0, y: 20, duration: 0.5 })
      .from(heroRef.current.querySelector('.cpage-hero-title'), { opacity: 0, y: 50, rotationX: -30, transformOrigin: '50% 50% -40px', duration: 0.75 }, '-=0.2')
      .from(heroRef.current.querySelector('.cpage-hero-sub'),   { opacity: 0, y: 20, duration: 0.5 }, '-=0.35')
      .from(heroRef.current.querySelectorAll('.cpage-hero-stat'), { opacity: 0, y: 25, stagger: 0.1, duration: 0.5 }, '-=0.3');
  }, []);

  /* ── Sidebar slide-in ────────────────────────────────────────── */
  useEffect(() => {
    if (!sidebarRef.current) return;
    gsap.from(sidebarRef.current, {
      opacity: 0, x: -40, duration: 0.7, ease: 'power3.out', delay: 0.2,
    });
    gsap.from(sidebarRef.current.querySelectorAll('.cpage-cat-btn'), {
      opacity: 0, x: -20, stagger: 0.05, duration: 0.5, ease: 'power2.out', delay: 0.3,
    });
  }, []);

  /* ── Product grid reveal + hover ────────────────────────────── */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards    = [...gridRef.current.querySelectorAll('.cpage-card')];
    const cleanups = [];

    gsap.fromTo(cards,
      { opacity: 0, y: 55, clipPath: 'inset(20% 0% 0% 0% round 14px)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 14px)', stagger: 0.07, duration: 0.6, ease: 'power3.out', clearProps: 'clipPath' }
    );

    cards.forEach(card => {
      const onMove = e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, { rotateY: x * 10, rotateX: -y * 8, scale: 1.02, duration: 0.3, ease: 'power2.out' });
      };
      const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' });
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); });
    });

    return () => cleanups.forEach(fn => fn());
  }, [animKey]);

  const handleTabClick = cat => navigate(`/categories/${encodeURIComponent(cat)}`);
  const products = ALL_PRODUCTS[selected] || [];

  return (
    <div className="cpage-shell">

      {/* ── Hero strip ────────────────────────────────────────────── */}
      <div className="cpage-hero" ref={heroRef}>
        <div className="cpage-hero-inner">
          <nav className="cpage-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="cpage-bread-link">Home</Link>
            <span className="cpage-bread-sep">›</span>
            <Link to="/" className="cpage-bread-link" onClick={e => { e.preventDefault(); navigate(-1); }}>
              Categories
            </Link>
            <span className="cpage-bread-sep">›</span>
            <span className="cpage-bread-cur">{selected}</span>
          </nav>

          <h1 className="cpage-hero-title">
            <em>Shop</em> {selected}
          </h1>
          <p className="cpage-hero-sub">
            {products.length} product{products.length === 1 ? '' : 's'} available
          </p>

          <div className="cpage-hero-stats">
            <div className="cpage-hero-stat">
              <span className="cpage-hero-stat-num">100%</span>
              <span className="cpage-hero-stat-lbl">Genuine</span>
            </div>
            <div className="cpage-hero-stat-sep" />
            <div className="cpage-hero-stat">
              <span className="cpage-hero-stat-num">60%</span>
              <span className="cpage-hero-stat-lbl">Max Savings</span>
            </div>
            <div className="cpage-hero-stat-sep" />
            <div className="cpage-hero-stat">
              <span className="cpage-hero-stat-num">24h</span>
              <span className="cpage-hero-stat-lbl">Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category circles selector ─────────────────────────────── */}
      <div className="cpage-circles-bar">
        <div className="cpage-circles-track">
          {CATEGORY_CIRCLES.map(cat => (
            <button
              key={cat.name}
              className={`cpage-circle-item${selected === cat.name ? ' cpage-circle-active' : ''}`}
              onClick={() => handleTabClick(cat.name)}
              aria-label={`Browse ${cat.name}`}
            >
              <div className="cpage-circle-img-wrap">
                <img src={cat.image} alt={cat.name} className="cpage-circle-img" loading="lazy" />
              </div>
              <span className="cpage-circle-name">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="cpage-body">

        {/* ── Sidebar ───────────────────────────────────────────── */}
        <aside className="cpage-sidebar" ref={sidebarRef}>
          <p className="cpage-sidebar-label">Categories</p>
          <ul className="cpage-cat-list">
            {CATEGORY_LIST.map(cat => (
              <li key={cat}>
                <button
                  className={`cpage-cat-btn ${selected === cat ? 'cpage-cat-btn-active' : ''}`}
                  onClick={() => handleTabClick(cat)}
                >
                  <span>{cat}</span>
                  <span className="cpage-cat-count">{ALL_PRODUCTS[cat]?.length ?? 0}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Product grid ──────────────────────────────────────── */}
        <main className="cpage-main">
          <div className="cpage-results-bar">
            <span className="cpage-results-text">
              Showing <strong>{products.length}</strong> results for &ldquo;{selected}&rdquo;
            </span>
          </div>

          <div className="cpage-grid" key={animKey} ref={gridRef} style={{ perspective: '1200px' }}>
            {products.map((p, i) => (
              <div
                key={p.id}
                className="cpage-card"
                style={{ animationDelay: `${i * 0.07}s`, transformStyle: 'preserve-3d' }}
              >
                <div className="cpage-card-img-wrap">
                  {p.badge && <span className="cpage-card-badge">{p.badge}</span>}
                  <img src={p.image} alt={p.name} className="cpage-card-img" loading="lazy" />
                  <div className="cpage-card-img-overlay" aria-hidden="true" />
                </div>

                <div className="cpage-card-body">
                  <span className="cpage-card-cat">{selected}</span>
                  <h3 className="cpage-card-name">{p.name}</h3>
                  <p className="cpage-card-desc">{p.desc}</p>

                  <div className="cpage-card-price-row">
                    <span className="cpage-card-price">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="cpage-card-original">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="cpage-card-savings">
                      {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  <div className="cpage-card-actions">
                    <button className="cpage-btn-view" onClick={() => navigate(`/product/category/${p.id}`)}>
                      View Details
                    </button>
                    <button className="cpage-btn-enquire">Enquire</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}

export default CategoriesPage;
