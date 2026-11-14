import { Link } from "react-router-dom";
import { WA } from "../api";

export function SecHead({ kick, ta, title, text, center }) {
  return (
    <div className={`sh rv ${center ? "center" : ""}`}>
      {ta && <span className="ta">{ta}</span>}
      <span className="kick">{kick}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function PageHead({ crumb, ta, title, text }) {
  return (
    <header className="phead kolam">
      <div className="wrap">
        <div className="crumb"><Link to="/">Home</Link> &nbsp;/&nbsp; {crumb}</div>
        <span className="ta">{ta}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="zari" />
    </header>
  );
}
export function Cta({
  title = <>Let's Make Your Wedding <em>Memories Beautiful</em></>,
  text = "Your special day deserves the perfect team. Share your wedding date and celebration details with us. We'll check our availability and get back to you on WhatsApp within 24–48 hours.",
  sub = "Let's capture your beautiful story together!"
}) {
  return (
    <section className="ctab kolam">
      <div className="zari" />
      <div className="wrap">
        <span className="ta" style={{ color: "#E2C275" }}>தொடர்புக்கு</span>
        <h2>{title}</h2>
        <p>{text}</p>
        {sub && <p style={{ fontWeight: 600, color: "#E2C275", marginTop: 8 }}>{sub}</p>}
        <div className="row2">
          <Link className="btn gold" to="/contact">Book Your Date</Link>
          <Link className="btn line" to="/contact" style={{ borderColor: "#E2C275", color: "#F7F3E9" }}>Contact Us</Link>
          {WA && <a className="btn gl" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
        </div>
      </div>
    </section>
  );
}
export const QUOTES = [
  ["Priya & Arun", "They stayed out of the way of every ritual and still caught every moment. Our families cried watching the film."],
  ["Meena & Karthik", "The candid frames of our parents are the photographs we treasure most. So calm on a very busy day."],
  ["Divya & Samuel", "From the church to the reception they felt like family, not vendors. The album is already an heirloom."],
];
