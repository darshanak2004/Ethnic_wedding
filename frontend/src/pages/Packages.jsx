import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { SecHead, PageHead, Cta } from "../components/Bits";
import { PACKAGES } from "../data/services";

export default function Packages() {
  return (
    <Layout>
      <PageHead crumb="Packages" ta="தொகுப்புகள்" title="Our packages" text="Each package bundles our services. Tell us your date and venue and we will send a quote." />

      <section className="sec"><div className="wrap">
        <SecHead center kick="Packages" ta="தொகுப்புகள்" title="Choose what fits your day" />
        <div className="grid g3 stg pkgs">{PACKAGES.map((p) => (
          <article className={`pk${p.featured ? " feat" : ""}`} key={p.name}>
            <span className="ta">{p.ta}</span>
            <h3>{p.name}</h3>
            <p>{p.text}</p>
            <ul className="ticks">{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
            <div className="price">{p.price || "Price on request"}</div>
            <Link className={`btn ${p.featured ? "gold" : "wine"}`} to="/contact">Get a quote</Link>
          </article>
        ))}</div>
        <p style={{ textAlign: "center", marginTop: 28 }}>Want something different? <Link to="/contact" style={{ color: "var(--wine)", borderBottom: "1px solid var(--gold)" }}>Tell us what you need</Link>, or see <Link to="/services" style={{ color: "var(--wine)", borderBottom: "1px solid var(--gold)" }}>each service</Link>.</p>
      </div></section>

      <Cta />
    </Layout>
  );
}
