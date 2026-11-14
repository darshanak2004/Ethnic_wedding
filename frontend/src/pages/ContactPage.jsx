import { useState } from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/Contact";
import { SecHead, PageHead } from "../components/Bits";
import { WA } from "../api";

const FAQ = [
  ["Where do you provide wedding photography services?", "We are based in Thoothukudi and offer wedding photography and videography services across Tamil Nadu."],
  ["What types of wedding photography do you offer?", "We offer candid wedding photography, traditional photography, pre-wedding shoots, engagement photography, and cinematic couple shoots."],
  ["Do you cover Hindu, Christian, and Muslim weddings?", "Yes! We capture all three wedding traditions, covering every ritual, emotion, and special moment."],
  ["Do you provide both wedding photography and videography?", "Yes, our team provides complete wedding photography and cinematic videography services to capture your special day."],
  ["How can I book your wedding photography services?", "Simply contact us with your wedding date, venue, and event details. We will check availability and help you with the booking."],
  ["How will we receive our wedding photos and videos?", "You will receive professionally edited wedding photographs and cinematic highlight films to cherish and share with your loved ones."],
];

export default function ContactPage() {
  const [open, setOpen] = useState(0);
  return (
    <Layout>
      <PageHead crumb="Contact" ta="தொடர்புக்கு" title="Let's talk about your day" text="Share your date and venue. If we are available, expect a reply on WhatsApp within 24 to 48 hours." />
      <section className="sec"><div className="wrap cgrid">
        <aside className="cinfo kolam rv">
          <div><h2>Get in touch</h2><p style={{ marginTop: 8 }}>We would love to hear about your celebration.</p></div>
          <div><small>WhatsApp</small>{WA ? <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">+{WA}</a> : <span className="v">Add number in .env</span>}</div>
          <div><small>Studio</small><span className="v">Thoothukudi, Tamil Nadu</span></div>
          <div><small>Instagram</small><a href="https://www.instagram.com/ethnicweddings" target="_blank" rel="noopener noreferrer">@ethnicweddings</a></div>
          <div><small>Reply time</small><span className="v">Within 24 to 48 hours</span></div>
        </aside>
        <div className="cform rv"><ContactForm /></div>
      </div></section>
      <section className="sec alt"><div className="wrap two">
        <SecHead kick="Common FAQs" ta="கேள்விகள்" title="Before you ask" text="Quick answers to what couples ask us most." />
        <div className="acc rv">{FAQ.map((f, i) => (
          <div className={`row${open === i ? " open" : ""}`} key={f[0]}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><h3>{f[0]}</h3><span className="pm" aria-hidden="true" /></button>
            <div className="panel"><div><p>{f[1]}</p></div></div>
          </div>
        ))}</div>
      </div></section>
    </Layout>
  );
}
