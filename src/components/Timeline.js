import './Timeline.css';

const ITEMS = [
  {
    year: '2010',
    title: 'Shivam Agrotech Founded',
    desc: 'Established with a vision to deliver quality agricultural equipment to farmers across India.',
  },
  {
    year: '2015',
    title: 'Pan-India Dealer Network',
    desc: 'Expanded to 500+ active dealers across 15 states, bringing equipment closer to every farmer.',
  },
  {
    year: '2019',
    title: 'OEM Certification Achieved',
    desc: 'Received OEM certification, a landmark in manufacturing quality and industry recognition.',
  },
  {
    year: '2024',
    title: '10 Lakh Farmers Served',
    desc: 'Crossed the milestone of serving over 10 lakh farmers, deepening our roots in Indian agriculture.',
  },
];

function Timeline() {
  return (
    <section className="timeline-section">
      <div className="timeline-leaf-bg" aria-hidden="true" />

      <div className="timeline-inner">
        <h2 className="timeline-heading">The Shivam Agrotech Timeline</h2>

        <div className="timeline-track">
          <div className="timeline-line" />

          {ITEMS.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-dot" />
              <div className="timeline-connector" />
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <strong className="timeline-title">{item.title}</strong>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
