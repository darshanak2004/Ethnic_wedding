import Layout from "../components/Layout";
import { SecHead, PageHead, Cta, QUOTES } from "../components/Bits";

const TL = [
  ["Before the Day", "Understanding Your Story", "We get to know your love story, family traditions, and wedding plans to create the perfect photography experience."],
  ["Planning", "Every Detail, Perfectly Planned", "We coordinate with your wedding team to ensure smooth photography and video coverage without disturbing your celebrations."],
  ["Wedding Day", "Capturing Moments Naturally", "Our team captures every smile, emotion, and special ritual while allowing you to enjoy your wedding freely."],
  ["After the Day", "Your Memories, Beautifully Delivered", "Receive professionally edited wedding photographs, cinematic highlight videos, and your complete wedding film."]
];

const INC = [
  ["Candid Photography", "Natural emotions, beautiful smiles, and unforgettable wedding moments."],
  ["Family Portraits", "Beautiful traditional portraits with your loved ones and family members."],
  ["Cinematic Wedding Films", "Creative wedding highlight videos and full-length cinematic films."],
  ["Couple Photoshoot", "Romantic pre-wedding and outdoor couple photography."],
  ["Edited Wedding Gallery", "Professionally edited, color-corrected, and retouched wedding photographs."],
  ["Wedding Albums & Prints", "Premium wedding albums and prints to preserve your memories forever."]
];

export default function Experience() {
  return (
    <Layout>
      <PageHead
        crumb="Experience"
        ta="எங்கள் அனுபவம்"
        title="The Ethnic Weddings Experience"
        text="Relax, celebrate, and enjoy every moment. We capture your wedding story with beautiful photography and cinematic films, while you enjoy your special day."
      />

      <section className="sec"><div className="wrap two">
        <div>
          <SecHead kick="What to Expect" title={<>Enjoy every moment; <em>we'll Capture the memories</em></>} />
          <div className="stack rv">
            <p>Your wedding is about love, family, and unforgettable moments. We focus on natural photography, genuine emotions, and timeless memories without making you feel uncomfortable in front of the camera.</p>
            <p>From unexpected moments to beautiful traditions, we capture everything with care and creativity.</p>
          </div>
        </div>
        <div className="arch imgrv" style={{ maxWidth: 400, justifySelf: "center", width: "100%" }}><img src="/assets/photo-2.jpg" alt="Wedding evening lights" loading="lazy" style={{ objectPosition: "50% 40%" }} /></div>
      </div></section>

      <section className="sec alt"><div className="wrap">
        <SecHead kick="Our Process" ta="எங்கள் செயல்முறை" title="From Your First Call to Your Wedding Memories" />
        <div className="tl stg">{TL.map((t) => <article key={t[0]}><small>{t[0]}</small><h3>{t[1]}</h3><p>{t[2]}</p></article>)}</div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SecHead center kick="What's Included" ta="உள்ளடக்கம்" title="Everything You Need to Capture Your Wedding" />
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
