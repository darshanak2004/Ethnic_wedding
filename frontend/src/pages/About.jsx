import Layout from "../components/Layout";
import { SecHead, PageHead, Cta } from "../components/Bits";

const VAL = [
  ["Family First", "Every family member matters. We capture the smiles, emotions, and togetherness that make your wedding special.", "◈"],
  ["Respect for Traditions", "We understand your wedding rituals and capture every important moment with care and respect.", "✦"],
  ["Natural Photography", "We focus on genuine emotions and candid moments rather than artificial poses.", "❖"],
  ["Photography & Films Together", "One dedicated team for wedding photography and cinematic films, ensuring a beautiful and consistent story.", "▶"]
];

const TR = [
  ["இந்து திருமணம்", "Hindu Wedding Photography", "Capturing beautiful moments from Muhurtham, Kasi Yatra, Oonjal, Thali, and Saptapadi ceremonies."],
  ["கிறிஸ்தவ திருமணம்", "Christian Wedding Photography", "Beautiful coverage of church ceremonies, wedding vows, ring exchanges, and grand receptions."],
  ["முஸ்லிம் திருமணம்", "Muslim Wedding Photography", "Capturing Nikah, Mehndi, Walima, and meaningful family celebrations with care and respect."]
];

export default function About() {
  return (
    <Layout>
      <PageHead
        crumb="About"
        ta="எங்களைப் பற்றி"
        title="The Team Behind Your Beautiful Memories"
        text="A passionate wedding photography team from Thoothukudi, capturing beautiful celebrations, real emotions, and unforgettable moments across Tamil Nadu."
      />

      <section className="sec"><div className="wrap two">
        <div className="pair imgrv">
          <div className="arch"><img src="/assets/portfolio/weddings/103a3710.jpg" alt="Traditional wedding couple" style={{ objectPosition: "50% 40%" }} /></div>
          <div className="mini"><img src="/assets/portfolio/pre-wedding/ses_6102.jpg" alt="Outdoor couple" loading="lazy" /></div>
        </div>
        <div>
          <SecHead kick="Our Story" title={<>Every Wedding Has a Story. <em>We Make It Last Forever.</em></>} />
          <div className="stack rv">
            <p>At Ethnic Weddings, our journey began with a passion for capturing beautiful wedding moments. What started with photographing friends' weddings has grown into a love for telling meaningful stories through photography and films.</p>
            <p>We believe in capturing real emotions, family traditions, and special moments naturally, creating memories that last a lifetime.</p>
          </div>
          <ul className="ticks rv" style={{ marginTop: 16 }}>
            <li>We understand your wedding traditions and rituals.</li>
            <li>Photography and cinematic films by one dedicated team.</li>
            <li>Available across Thoothukudi and all of Tamil Nadu.</li>
          </ul>
          <p style={{ marginTop: 14, fontWeight: 600, color: "var(--wine)" }}>Wedding Photography Thoothukudi, Tamil Nadu</p>
        </div>
      </div></section>

      <section className="sec alt"><div className="wrap">
        <SecHead center kick="What We Value" ta="எங்கள் அணுகுமுறை" title="Our Approach to Every Wedding" />
        <div className="grid g4 stg">{VAL.map((v) => <article className="card" key={v[0]}><div className="ico">{v[2]}</div><h3>{v[0]}</h3><p>{v[1]}</p></article>)}</div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SecHead center kick="Wedding Traditions We Cover" ta="அனைத்து மரபுகளும்" title="Celebrating Every Tradition with Love and Respect" text="Every culture has its own beauty. We capture each wedding tradition with creativity, care, and attention to detail." />
        <div className="grid g3 stg">{TR.map((t) => <article className="card" key={t[1]}><span className="ta">{t[0]}</span><h3>{t[1]}</h3><p>{t[2]}</p></article>)}</div>
      </div></section>

      <section className="sec alt"><div className="wrap">
        <SecHead center kick="Our Growth" ta="எங்கள் வளர்ச்சி" title="Every Milestone Tells Our Story" text="Our journey is built on passion, creativity, and the trust of families who invite us to capture their most precious celebrations. Every wedding has helped us grow and create memories that last forever." />
        <div className="grid g3 stg" style={{ marginTop: 32 }}>
          <article className="card" style={{ textAlign: "center" }}>
            <b className="num" data-n="2026" data-s="" style={{ fontSize: "2.4rem", color: "var(--gold)", display: "block", marginBottom: 8 }}>2026</b>
            <h3 style={{ marginBottom: 8 }}>Where Our Journey Began</h3>
            <p>Started with a passion for capturing beautiful wedding moments and preserving family memories.</p>
          </article>
          <article className="card" style={{ textAlign: "center" }}>
            <b className="num" data-n="100" data-s="+" style={{ fontSize: "2.4rem", color: "var(--gold)", display: "block", marginBottom: 8 }}>100+</b>
            <h3 style={{ marginBottom: 8 }}>Happy Families & Celebrations</h3>
            <p>Thousands of beautiful celebrations captured with love, care, and dedication.</p>
          </article>
          <article className="card" style={{ textAlign: "center" }}>
            <b className="num" data-n="100" data-s="+" style={{ fontSize: "2.4rem", color: "var(--gold)", display: "block", marginBottom: 8 }}>100+</b>
            <h3 style={{ marginBottom: 8 }}>Creative Professionals</h3>
            <p>A dedicated team working together to deliver beautiful wedding photography and cinematic films.</p>
          </article>
        </div>
      </div></section>
      <Cta />
    </Layout>
  );
}
