import Layout from "../components/Layout";
import { SecHead, PageHead, Cta, QUOTES } from "../components/Bits";

const TL = [["Before the day", "Let's begin with a call", "We hear your story, your families and the rituals you are planning, and plan coverage around them."], ["Planning", "Working with your team", "We coordinate with your planner, decorators and priest so the shoot fits the day without interrupting it."], ["Wedding day", "Present, never intrusive", "We blend in with your closest circle, knowing when to step in and when to step back."], ["After the day", "Your story, delivered", "Edited photographs, a highlight video and the full film, delivered with care and ready to share."]];
const INC = [["Candid coverage", "Natural moments through every ritual."], ["Family portraits", "Planned group portraits for every side."], ["Cinematic film", "Highlight reel and full-length film."], ["Couple shoot", "Pre-wedding or couple portraits outdoors."], ["Edited gallery", "Colour-graded, retouched and delivered online."], ["Albums & prints", "Heirloom albums made to be held."]];

export default function Experience() {
  return (
    <Layout>
      <PageHead crumb="Experience" ta="எங்கள் அனுபவம்" title="The Ethnic Weddings experience" text="Honest, unfussy and relaxed. You enjoy the day and we quietly take care of the memories." />

      <section className="sec"><div className="wrap two">
        <div>
          <SecHead kick="What to expect" title={<>Relaxed in front of the camera, <em>because it's all captured</em></>} />
          <div className="stack rv"><p>You want timeless, artistic images, not forced or posed ones. You want your relatives to feel they are among friends. We build our whole approach around that.</p><p>If it rains, it rains. If the power goes out, someone lights the lamps. We will be there for all of it.</p></div>
        </div>
        <div className="arch imgrv" style={{ maxWidth: 400, justifySelf: "center", width: "100%" }}><img src="/assets/photo-2.jpg" alt="Wedding evening lights" loading="lazy" style={{ objectPosition: "50% 40%" }} /></div>
      </div></section>

      <section className="sec alt"><div className="wrap">
        <SecHead kick="Our process" ta="எங்கள் செயல்முறை" title="From the first call to the final film" />
        <div className="tl stg">{TL.map((t) => <article key={t[0]}><small>{t[0]}</small><h3>{t[1]}</h3><p>{t[2]}</p></article>)}</div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SecHead center kick="What's included" ta="உள்ளடக்கம்" title="Everything your day needs" />
        <div className="grid g3 stg">{INC.map(([h, p], i) => <article className="card" key={h}><span className="no">{String(i + 1).padStart(2, "0")}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
      </div></section>

      <section className="sec alt"><div className="wrap">
        <SecHead center kick="Kind words" title="What couples say" />
        <div className="grid g3 stg">{QUOTES.map(([n, q]) => <div className="q" key={n}><p>{q}</p><footer>{n}</footer></div>)}</div>
      </div></section>
      <Cta title={<>Reserve your <em>date</em></>} text="We take a limited number of weddings each year so every couple gets our full attention." />
    </Layout>
  );
}
