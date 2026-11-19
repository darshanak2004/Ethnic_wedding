import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { SecHead, PageHead, Cta } from "../components/Bits";
import { PRIMARY, SERVICES, PACKAGES } from "../data/services";

export default function Services() {
  const allServices = [PRIMARY, ...SERVICES];

  return (
    <Layout>
      <PageHead
        crumb="Services"
        ta="எங்கள் சேவைகள்"
        title="Every Wedding Moment Deserves to Be Remembered"
        text="From beautiful wedding rituals to candid smiles and cinematic love stories, we capture every special moment with creativity and care. One dedicated team for your wedding photography and films."
      />

      <section className="sec">
        <div className="wrap">
          <SecHead
            center
            kick="What We Do"
            ta="சேவைகள்"
            title="Every Wedding Moment Deserves to Be Remembered"
            text="From beautiful wedding rituals to candid smiles and cinematic love stories, we capture every special moment with creativity and care. One dedicated team for your wedding photography and films."
          />
          <div className="grid g3 stg" style={{ marginTop: 32 }}>
            {allServices.map((s) => (
              <article className="card" key={s.name}>
                <div className="ico">{s.icon || "◈"}</div>
                {s.ta && <span className="ta">{s.ta}</span>}
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <Link to="/contact" className="btn line" style={{ marginTop: 14, fontSize: "0.78rem" }}>
                  Enquire now →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Packages Section */}
      <section className="sec alt" id="packages">
        <div className="wrap">
          <SecHead
            center
            kick="Wedding Packages"
            ta="தொகுப்புகள்"
            title="The Perfect Package for Your Special Day"
            text="Make your wedding memories unforgettable with our thoughtfully designed photography and cinematography packages. Choose the perfect bundle to capture every beautiful moment of your celebration."
          />
          <div className="grid g3 stg pkgs" style={{ marginTop: 32 }}>
            {PACKAGES.map((p) => (
              <article className={`pk${p.featured ? " feat" : ""}`} key={p.name}>
                <span className="ta">{p.ta}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <ul className="ticks">
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <div className="price">{p.price || "Price on request"}</div>
                <Link className={`btn ${p.featured ? "gold" : "wine"}`} to="/contact">
                  Get a quote
                </Link>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link className="btn wine" to="/packages">
              Explore All Packages →
            </Link>
          </div>
        </div>
      </section>

      <Cta
        title={<>Like what you have <em>seen?</em></>}
        text="Dates get booked up quickly. Tell us your dates and we will confirm availability via WhatsApp within 24 to 48 hours."
      />
    </Layout>
  );
}
