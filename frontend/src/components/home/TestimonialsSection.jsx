const REVIEWS = [
  {
    couple: "Preethi & Karthik",
    location: "Thoothukudi · Hindu Wedding",
    photo: "/assets/portfolio/weddings/103a3710.jpg",
    quote:
      "Ethnic Weddings captured our wedding so naturally! Looking back at our wedding album brings every sacred emotion back. The candid photos of our family are our treasures.",
  },
  {
    couple: "Divya & Vignesh",
    location: "Tirunelveli · Church Wedding & Reception",
    photo: "/assets/portfolio/engagement/2j3a7639.jpg",
    quote:
      "The cinematic teaser gave all our friends goosebumps! Their crew was so courteous, on time, and never once got in the way of our rituals. Highly recommended!",
  },
  {
    couple: "Ananya & Rahul",
    location: "Madurai · Grand Celebration",
    photo: "/assets/portfolio/pre-wedding/103a0149.jpg",
    quote:
      "From the misty pre-wedding shoot to our wedding night, every photograph was magazine quality. Best decision we made for our big day!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="h-section h-testimonials-sec" id="testimonials" aria-label="Client Testimonials">
      <div className="h-container">
        <div className="h-section-header">
          <span className="h-eyebrow">TESTIMONIALS · வாழ்த்துரைகள்</span>
          <h2 className="h-section-title">
            Loved by Couples & <em>Cherished by Families</em>
          </h2>
          <p className="h-section-sub">
            Real experiences from couples across Thoothukudi, Tirunelveli, and Tamil Nadu who trusted
            us with their biggest day.
          </p>
        </div>

        <div className="h-testimonials-grid">
          {REVIEWS.map((rev, idx) => (
            <article className="h-testimonial-card" key={idx}>
              <div className="h-testimonial-photo-wrap">
                <img
                  src={rev.photo}
                  alt={rev.couple}
                  loading="lazy"
                  width="400"
                  height="260"
                  className="h-testimonial-img"
                />
              </div>
              <div className="h-testimonial-body">
                <span className="h-testimonial-quote-mark" aria-hidden="true">“</span>
                <p className="h-testimonial-quote">{rev.quote}</p>
                <div className="h-testimonial-author">
                  <h3 className="h-testimonial-name">{rev.couple}</h3>
                  <span className="h-testimonial-loc">{rev.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
