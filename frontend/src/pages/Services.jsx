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
        title="Every Wedding Moment Deserves to Be Remembered"
        text="From beautiful wedding rituals to candid smiles and cinematic love stories, we capture every special moment with creativity and care. One dedicated team for your wedding photography and films."
      />

      <section className="sec"><div className="wrap">
        <SecHead center kick="What We Do" ta="சேவைகள்" title="Every Wedding Moment Deserves to Be Remembered" text="From beautiful wedding rituals to candid smiles and cinematic love stories, we capture every special moment with creativity and care. One dedicated team for your wedding photography and films." />
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
        <SecHead center kick="Wedding Packages" ta="தொகுப்புகள்" title="The Perfect Package for Your Special Day" text="Make your wedding memories unforgettable with our thoughtfully designed photography and cinematography packages. Choose the perfect bundle to capture every beautiful moment of your celebration." />
        <Link className="btn wine" to="/packages">View packages</Link>
      </div></section>

      <Cta />
    </Layout>
  );
}
