const TESTIMONIALS = [
  {
    location: "Thoothukudi · Hindu Wedding",
    quote: "Ethnic Weddings captured our wedding so naturally! Looking back at our wedding album brings every sacred emotion back. The candid photos of our family are our greatest treasures.",
  },
  {
    location: "Tirunelveli · Church Ceremony & Reception",
    quote: "The cinematic teaser gave all our friends goosebumps! Their crew was so polite, punctual, and never once got in the way of our rituals. Highly recommended!",
  },
  {
    location: "Madurai · Grand Celebration",
    quote: "From the misty pre-wedding shoot to our wedding night, every photograph was magazine quality. Best decision we made for our big celebration!",
  },
];

export default function Testimonials() {
  return (
    <section className="ew-testimonials-sec" id="testimonials" aria-label="From Our Couples">
      <div className="ew-container">
        <div className="ew-sec-header">
          <span className="ew-kicker">FROM OUR COUPLES · <span className="ew-ta">மணமக்களின் வாழ்த்துக்கள்</span></span>
          <h2 className="ew-sec-heading">
            Love, Trust &amp; <em>Beautiful Words</em>
          </h2>
          <p className="ew-sec-sub">
            Every wedding tells a beautiful story. We are proud to capture each couple's special moments
            and grateful for the love and trust they place in us.
          </p>
        </div>

        <div className="ew-testimonials-grid">
          {TESTIMONIALS.map((item, idx) => (
            <article className="ew-testimonial-card ew-testimonial-text-card" key={idx}>
              <div className="ew-testimonial-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <span className="ew-quote-mark" aria-hidden="true">“</span>
              <p className="ew-testimonial-quote">{item.quote}</p>
              <div className="ew-testimonial-author">
                <span className="ew-author-loc">{item.location}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
