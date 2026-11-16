import { useState } from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/Contact";
import { SecHead, PageHead } from "../components/Bits";
import { WA } from "../api";

const FAQ = [
  ["Do you shoot photos and film?", "Yes! We provide both professional wedding photography and cinematic videography with one dedicated team to capture every special moment."],
  ["Do you travel for weddings?", "Absolutely! We travel across Tamil Nadu and other locations to capture weddings and special celebrations."],
  ["Will you cover every ritual?", "Yes! We plan our coverage around your wedding schedule to capture all important rituals, family moments, and celebrations."],
  ["What happens after I inquire?", "Once you contact us, our team will connect with you to understand your wedding plans, discuss packages, check availability, and guide you through the booking process."]
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
        <SecHead kick="Common FAQs" ta="கேள்விகள்" title="Before You Ask" text="Find answers to the most common questions couples ask before booking their wedding photography and cinematography." />
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
