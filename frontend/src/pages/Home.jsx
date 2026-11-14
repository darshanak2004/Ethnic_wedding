import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { SecHead, Cta, QUOTES } from "../components/Bits";
import { PRIMARY, SERVICES } from "../data/services";
import { cdn } from "../api";

const HOW_IT_WORKS = [
  ["Let's Connect", "Share your wedding date, venue, and celebration details with us."],
  ["Plan Your Moments", "We understand your traditions, rituals, and photography preferences."],
  ["Capture Every Moment", "Our photography and film team captures every emotion, smile, and celebration."],
  ["Relive Your Memories", "Receive beautifully edited photographs and cinematic wedding films to cherish forever."],
];

const FAQS = [
  ["Where do you provide wedding photography services?", "We are based in Thoothukudi and offer wedding photography and videography services across Tamil Nadu."],
  ["What types of wedding photography do you offer?", "We offer candid wedding photography, traditional photography, pre-wedding shoots, engagement photography, and cinematic couple shoots."],
  ["Do you cover Hindu, Christian, and Muslim weddings?", "Yes! We capture all three wedding traditions, covering every ritual, emotion, and special moment."],
  ["Do you provide both wedding photography and videography?", "Yes, our team provides complete wedding photography and cinematic videography services to capture your special day."],
  ["How can I book your wedding photography services?", "Simply contact us with your wedding date, venue, and event details. We will check availability and help you with the booking."],
  ["How will we receive our wedding photos and videos?", "You will receive professionally edited wedding photographs and cinematic highlight films to cherish and share with your loved ones."],
];

export default function Home({ content }) {
  const show = !sessionStorage.getItem("ew_door");
  if (show) sessionStorage.setItem("ew_door", "1");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <Layout door={show} overHero>
      <Hero hero={content.hero} />

      {/* Stats Section */}
      <div className="wrap"><div className="stats stg">
        <div className="st"><b className="num" data-n="100" data-s="+">100+</b><span>Happy Couples & Customers</span></div>
        <div className="st"><b className="num" data-n="3" data-s="">3</b><span>Wedding Traditions Covered</span></div>
        <div className="st"><b className="num" data-n="9" data-s="">9</b><span>Photography & Film Services</span></div>
        <div className="st"><b className="num" data-n="38" data-s="">38</b><span>Services & TN Districts</span></div>
      </div></div>

      {/* About Us Section */}
      <section className="sec"><div className="wrap two">
        <div className="pair imgrv">
          <div className="arch">
            <img src="/assets/portfolio/weddings/103a3710.jpg" alt="Traditional wedding couple under chandelier" loading="lazy" style={{ objectPosition: "50% 30%" }} />
          </div>
          <div className="mini">
            <img src="/assets/portfolio/pre-wedding/ses_6102.jpg" alt="Outdoor pre-wedding portrait" loading="lazy" />
          </div>
        </div>
        <div>
          <SecHead kick="About Us" ta="எங்களைப் பற்றி" title={<>Every Wedding Has a Story. <em>We Capture It Beautifully.</em></>} />
          <div className="stack rv">
            <p>At Ethnic Weddings, we turn your special wedding moments into timeless memories. Based in Thoothukudi, we specialize in candid wedding photography, traditional portraits, and cinematic wedding films for Hindu, Christian, and Muslim weddings.</p>
            <p>We capture every emotion, tradition, and celebration with creativity and care.</p>
          </div>
          <ul className="ticks rv">
            <li>We understand your wedding traditions and rituals.</li>
            <li>Photography and cinematic films by one dedicated team.</li>
            <li>Available across Thoothukudi and all of Tamil Nadu.</li>
          </ul>
          <p className="rv" style={{ marginTop: 14, fontWeight: 600, color: "var(--wine)" }}>Wedding Photography Thoothukudi, Tamil Nadu</p>
          <div style={{ marginTop: 18 }}><Link className="btn wine rv" to="/about">More about us</Link></div>
        </div>
      </div></section>

      {/* What We Do / Services */}
      <section className="sec alt"><div className="wrap">
        <SecHead center kick="What We Do" ta="எங்கள் சேவைகள்" title="Beautiful Moments, Captured Forever" text="From wedding photography to cinematic films, we capture every special moment with creativity and care. Our team brings your wedding memories to life through beautiful photographs and unforgettable films across Tamil Nadu." />
        <article className="primary rv kolam">
          <span className="tag">Primary service</span>
          <span className="ta">{PRIMARY.ta}</span>
          <h3>{PRIMARY.name}</h3>
          <p>{PRIMARY.text}</p>
        </article>
        <div className="grid g4 stg">{SERVICES.map((s) => (
          <article className="card" key={s.name}><div className="ico">{s.icon}</div><span className="ta">{s.ta}</span><h3>{s.name}</h3><p>{s.text}</p></article>
        ))}</div>
        <div style={{ textAlign: "center", marginTop: 56 }}><Link className="btn line" to="/services">All services</Link> <Link className="btn line" to="/packages" style={{ marginLeft: 14 }}>View packages</Link></div>
      </div></section>

      {/* Outdoor Reel Photography Section (Landscape 16:9) */}
      <section className="sec video-sec"><div className="wrap">
        <SecHead center kick="Outdoor Reel Photography" ta="வெளிப்புற திரைப்படப் பதிவுகள்" title="Cinematic Couple Films & Outdoor Reels" text="Emotion, light, and movement captured in timeless cinematic motion across scenic locations in Tamil Nadu." />
        <div className="landscape-video-card rv">
          <div className="landscape-player-wrap">
            <video
              src="/assets/outdoor-reel.mp4"
              controls
              playsInline
              preload="metadata"
              poster="/assets/portfolio/concept-shoots/103a8325-1.jpg"
              className="landscape-reel-video"
            />
          </div>
          <div className="landscape-video-foot">
            <p>Outdoor Reel Photography · Available across Thoothukudi & all Tamil Nadu</p>
            <div className="arow" style={{ margin: 0 }}>
              <Link className="btn wine sm" to="/contact">Book Your Shoot</Link>
              <Link className="btn line sm" to="/portfolio">Explore Portfolio Films →</Link>
            </div>
          </div>
        </div>
      </div></section>

      {/* Portfolio Section */}
      <section className="sec alt"><div className="wrap">
        <SecHead center kick="Our Portfolio" ta="எங்கள் படைப்புகள்" title="Every Picture Tells a Beautiful Story" text="Real Moments. Beautiful Stories. Timeless Memories." />
        <div className="grid g4 stg">{content.events.map((e) => (
          <Link to={`/portfolio?folder=${e.slug}`} className="folder-card ev" key={e.slug}>
            <div className="folder-tab">
              <span className="folder-icon">📁</span>
              <span>{e.images.length ? `${e.images.length} Photos` : "Coming Soon"}</span>
            </div>
            {e.images[0] ? (
              <img src={cdn(e.images[0].url, 700)} alt={e.title} loading="lazy" />
            ) : (
              <span className="empty"><img src="/assets/mono-cream.png" alt="" /></span>
            )}
            <div className="cap">
              <small>{e.images.length ? `${e.images.length} photographs` : "Coming soon"}</small>
              <h3>{e.title}</h3>
              {e.description && <p className="folder-sub">{e.description}</p>}
            </div>
          </Link>
        ))}</div>
        <div style={{ textAlign: "center", marginTop: 56 }}><Link className="btn line" to="/portfolio">View portfolio folders</Link></div>
      </div></section>

      {/* How It Works Section */}
      <section className="sec"><div className="wrap">
        <SecHead center kick="How It Works" ta="எங்கள் செயல்முறை" title="From Your First Call to Memories Forever" text="We make your wedding photography experience simple and stress-free. From planning every detail to capturing your special moments, our team takes care of everything." />
        <div className="steps stg">{HOW_IT_WORKS.map((p, i) => (
          <div className="step" key={p[0]}>
            <b>{i + 1}</b>
            <h3>{p[0]}</h3>
            <p>{p[1]}</p>
          </div>
        ))}</div>
      </div></section>

      {/* From Our Couples */}
      <section className="sec alt"><div className="wrap">
        <SecHead center kick="From Our Couples" ta="மணமக்களின் வாழ்த்துக்கள்" title="Love, Trust & Beautiful Words" text="Every wedding is special, and every couple has a story to share. We feel proud to be part of their celebrations and grateful for the love and trust they place in us." />
        <div className="grid g3 stg">{QUOTES.map(([n, q]) => (
          <div className="q" key={n}>
            <p>{q}</p>
            <footer>{n}</footer>
          </div>
        ))}</div>
      </div></section>

      {/* Frequently Asked Questions */}
      <section className="sec"><div className="wrap two">
        <div>
          <SecHead kick="Frequently Asked Questions" ta="கேள்விகள்" title="Everything You Need to Know About Our Wedding Photography" text="Have questions about booking, traditions, or delivery? Here are quick answers to what couples ask us most." />
          <div style={{ marginTop: 24 }}>
            <Link className="btn wine" to="/contact">Ask a Question</Link>
          </div>
        </div>
        <div className="acc rv">
          {FAQS.map((f, i) => (
            <div className={`row${openFaq === i ? " open" : ""}`} key={f[0]}>
              <button aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <h3>{f[0]}</h3>
                <span className="pm" aria-hidden="true" />
              </button>
              <div className="panel">
                <div><p>{f[1]}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div></section>

      {/* Call to Action */}
      <Cta />
    </Layout>
  );
}
