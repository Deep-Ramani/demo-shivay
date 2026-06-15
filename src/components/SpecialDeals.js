import { Card, Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './SpecialDeals.css';

const products = [
  {
    id: 1,
    name: 'Balwaan BX-52 2 Stroke 52cc Side Pack Brush Cutter',
    desc: 'Powerful side-pack cutter engineered for heavy-duty grass and shrub removal.',
    image: 'https://picsum.photos/300/300?random=11',
    status: 'New',
    statusColor: '#4caf50',
  },
  {
    id: 2,
    name: 'Balwaan 50cc Backpack Crop cum Grass Cutter BX-50B',
    desc: 'Ergonomic backpack design for extended operation without fatigue.',
    image: 'https://picsum.photos/300/300?random=12',
    status: 'Hot Deal',
    statusColor: '#e07b00',
  },
  {
    id: 3,
    name: 'Balwaan 22 No. HTP Sprayer with 6.5HP Engine & 50 Mtr',
    desc: 'High-throughput power sprayer covering large fields with uniform spray.',
    image: 'https://picsum.photos/300/300?random=13',
    status: 'Trending',
    statusColor: '#1a6fb5',
  },
  {
    id: 4,
    name: 'Balwaan Double Motor Battery Sprayer BS-22D | 12 Volts x 12',
    desc: 'Dual-motor battery sprayer delivering consistent pressure across the tank.',
    image: 'https://picsum.photos/300/300?random=14',
    status: 'Featured',
    statusColor: '#7a3a9a',
  },
  {
    id: 5,
    name: 'Balwaan BS-20 Single Motor Battery Sprayer | 12x8',
    desc: 'Lightweight and reliable single-motor sprayer for everyday crop care.',
    image: 'https://picsum.photos/300/300?random=15',
    status: 'New',
    statusColor: '#4caf50',
  },
  {
    id: 6,
    name: 'Balwaan Agricultural Sprayer Machine',
    desc: 'Versatile agricultural sprayer suitable for a wide range of field conditions.',
    image: 'https://picsum.photos/300/300?random=16',
    status: 'Best Seller',
    statusColor: '#e07b00',
  },
];

function SpecialDeals() {
  const scrollLeft = () =>
    document.querySelector('.deals-scroll-container').scrollBy({ left: -300, behavior: 'smooth' });

  const scrollRight = () =>
    document.querySelector('.deals-scroll-container').scrollBy({ left: 300, behavior: 'smooth' });

  return (
    <section className="special-deals-section">
      <div className="section-row-header">
        <div className="row-header-text">
          <span className="section-tag">Limited Time</span>
          <h2 className="section-title">Special <em>Deals</em></h2>
        </div>
        <div className="header-nav-arrows">
          <button className="nav-arrow-btn" onClick={scrollLeft}><LeftOutlined /></button>
          <button className="nav-arrow-btn" onClick={scrollRight}><RightOutlined /></button>
        </div>
      </div>

      <div className="deals-carousel-wrapper">
        <div className="deals-scroll-container">
          <Row gutter={[20, 20]} wrap={false} className="deals-row">
            {products.map(product => (
              <Col key={product.id} flex="0 0 260px">
                <Card
                  hoverable
                  className="deal-card"
                  cover={
                    <div className="deal-card-image-wrapper">
                      <span className="status-badge" style={{ backgroundColor: product.statusColor }}>
                        {product.status}
                      </span>
                      <img alt={product.name} src={product.image} className="deal-card-image" />
                    </div>
                  }
                >
                  <h3 className="deal-product-name">{product.name}</h3>
                  <p className="deal-product-desc">{product.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
}

export default SpecialDeals;
