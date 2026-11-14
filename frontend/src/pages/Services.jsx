import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { SecHead, PageHead, Cta } from "../components/Bits";
import { PRIMARY, SERVICES } from "../data/services";

export default function Services() {
  return (
    <Layout>
      <PageHead
        crumb="Services"
        ta="எங்கள் சேவைகள்"
        title="Beautiful Moments, Captured Forever"
        text="From wedding photography to cinematic films, we capture every special moment with creativity and care. Our team brings your wedding memories to life through beautiful photographs and unforgettable films across Tamil Nadu."
      />

      <section className="sec"><div className="wrap">
        <SecHead center kick="What We Do" ta="சேவைகள்" title="Our 9 Photography & Film Services" text="From traditional wedding portraits to candid moments, we turn your precious memories into timeless stories that you and your family will cherish forever." />
        <article className="primary rv kolam">
          <span className="tag">Primary service</span>
          <span className="ta">{PRIMARY.ta}</span>
          <h3>{PRIMARY.name}</h3>
          <p>{PRIMARY.text}</p>
          <Link className="btn gold" to="/contact">Enquire about this</Link>
        </article>
        <div className="grid g4 stg">{SERVICES.map((s) => (
          <article className="card" key={s.name}><div className="ico">{s.icon}</div><span className="ta">{s.ta}</span><h3>{s.name}</h3><p>{s.text}</p></article>
        ))}</div>
      </div></section>

      <section className="sec alt"><div className="wrap" style={{ textAlign: "center" }}>
        <SecHead center kick="Packages" ta="தொகுப்புகள்" title="Prefer a ready bundle?" text="See our packages, which combine these services for your wedding." />
        <Link className="btn wine" to="/packages">View packages</Link>
      </div></section>

      <Cta />
    </Layout>
  );
}
