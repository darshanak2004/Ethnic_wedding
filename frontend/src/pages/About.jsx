import Layout from "../components/Layout";
import { SecHead, PageHead, Cta } from "../components/Bits";

const VAL = [["Family first", "Weddings here belong to whole families. We photograph every elder and cousin because they are who the album is for.", "◈"], ["Respect for ritual", "We learn the order of your ceremonies so we are in the right place without interrupting anyone.", "✦"], ["Honest pictures", "Real moments over staged ones. Fewer, better frames you will still love in fifty years.", "❖"], ["Photo and film together", "One team shoots both, so the story and the look stay consistent.", "▶"]];
const TR = [["இந்து திருமணம்", "Hindu weddings", "Muhurtham, kasi yatra, oonjal, thali and saptapadi, covered in sequence."], ["கிறிஸ்தவ திருமணம்", "Christian weddings", "Church ceremony, vows, ring exchange and reception, with respect for the service."], ["முஸ்லிம் திருமணம்", "Muslim weddings", "Nikah, mehndi and walima, photographed with sensitivity and care."]];

export default function About() {
  return (
    <Layout>
      <PageHead
        crumb="About"
        ta="எங்களைப் பற்றி"
        title="Every Wedding Has a Story. We Capture It Beautifully."
        text="At Ethnic Weddings, we turn your special wedding moments into timeless memories. Based in Thoothukudi, we specialize in candid wedding photography, traditional portraits, and cinematic wedding films for Hindu, Christian, and Muslim weddings across Tamil Nadu."
      />

      <section className="sec"><div className="wrap two">
        <div className="pair imgrv">
          <div className="arch"><img src="/assets/portfolio/weddings/103a3710.jpg" alt="Traditional wedding couple" style={{ objectPosition: "50% 40%" }} /></div>
          <div className="mini"><img src="/assets/portfolio/pre-wedding/ses_6102.jpg" alt="Outdoor couple" loading="lazy" /></div>
        </div>
        <div>
          <SecHead kick="About Us" title={<>We Capture Every Emotion, Tradition & <em>Celebration</em></>} />
          <div className="stack rv">
            <p>At Ethnic Weddings, we turn your special wedding moments into timeless memories. Based in Thoothukudi, we specialize in candid wedding photography, traditional portraits, and cinematic wedding films for Hindu, Christian, and Muslim weddings.</p>
            <p>We capture every emotion, tradition, and celebration with creativity and care. From traditional wedding portraits to candid moments, we turn your precious memories into timeless stories that you and your family will cherish forever.</p>
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
        <SecHead center kick="What we value" ta="எங்கள் மதிப்புகள்" title="How we work" />
        <div className="grid g4 stg">{VAL.map((v) => <article className="card" key={v[0]}><div className="ico">{v[2]}</div><h3>{v[0]}</h3><p>{v[1]}</p></article>)}</div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SecHead center kick="Traditions we cover" ta="அனைத்து மரபுகளும்" title="Every wedding, in its own way" />
        <div className="grid g3 stg">{TR.map((t) => <article className="card" key={t[1]}><span className="ta">{t[0]}</span><h3>{t[1]}</h3><p>{t[2]}</p></article>)}</div>
      </div></section>

      <section className="sec alt"><div className="wrap"><div className="stats stg" style={{ marginTop: 0 }}>
        <div className="st"><b className="num" data-n="100" data-s="+">100+</b><span>Happy Couples & Customers</span></div>
        <div className="st"><b className="num" data-n="3" data-s="">3</b><span>Wedding Traditions</span></div>
        <div className="st"><b className="num" data-n="9" data-s="">9</b><span>Photography & Film Services</span></div>
        <div className="st"><b className="num" data-n="38" data-s="">38</b><span>Services & TN Districts</span></div>
      </div></div></section>
      <Cta />
    </Layout>
  );
}
