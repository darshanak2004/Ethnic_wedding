import { PRIMARY, SERVICES as SERVICES_ALL } from "../data/services";
import { useState } from "react";
import { API, WA, sendEnquiry } from "../api";

const SERVICES = [
  PRIMARY.name,
  ...SERVICES_ALL.map((x) => x.name),
  "Birthday / events",
];
const EMPTY = { name: "", phone: "", date: "", place: "", note: "", website: "" };

export default function ContactForm() {
  const [role, setRole] = useState("COUPLE");
  const [f, setF] = useState(EMPTY);
  const [sel, setSel] = useState([SERVICES[0]]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (s) => setSel(sel.includes(s) ? sel.filter((x) => x !== s) : [...sel, s]);

  const text = `Hello Ethnic Weddings,\nI am ${f.name} (${role}).\nPhone: ${f.phone || "-"}\nDate: ${f.date || "to be decided"}\nVenue: ${f.place || "-"}\nInterested in: ${sel.join(", ") || "to be discussed"}\nNotes: ${f.note || "-"}`;
  const waHref = `https://wa.me/${WA || "919789325528"}?text=${encodeURIComponent(text)}`;

  const submit = async (e) => {
    e.preventDefault();
    if (!API) {
      window.open(waHref, "_blank", "noopener");
      return;
    }
    setStatus("sending");
    setErr("");
    try {
      await sendEnquiry({ ...f, role, services: sel });
      setStatus("sent");
    } catch (x) {
      setErr(x.message);
      setStatus("error");
    }
  };

  const handleWhatsAppDirect = (e) => {
    e.preventDefault();
    window.open(waHref, "_blank", "noopener");
  };

  if (status === "sent") {
    return (
      <div className="thanks" role="status" style={{ padding: "32px 20px", textAlign: "center" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "var(--wine)" }}>Thank you, {f.name.split(" ")[0] || "friend"}!</h3>
        <p style={{ marginTop: 8, color: "var(--mute)" }}>Your enquiry has reached us. We will reply on WhatsApp at {f.phone} within 24 to 48 hours.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
          <a className="ew-btn-gold" href={waHref} target="_blank" rel="noopener noreferrer">
            Open WhatsApp Chat
          </a>
          <button className="ew-btn-wine" type="button" onClick={() => { setF(EMPTY); setStatus("idle"); }}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="ew-contact-form">
      {/* I AM A */}
      <div className="lg">
        I AM A
        <div className="seg">
          {["COUPLE", "PLANNER", "FAMILY"].map((r) => (
            <button
              type="button"
              key={r}
              className={role === r ? "on" : ""}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* YOUR NAMES & PHONE */}
      <div className="two2">
        <label>
          YOUR NAMES
          <input
            required
            maxLength={100}
            value={f.name}
            onChange={set("name")}
            placeholder="Priya & Arun"
          />
        </label>
        <label>
          PHONE
          <input
            required
            type="tel"
            inputMode="tel"
            minLength={8}
            maxLength={30}
            value={f.phone}
            onChange={set("phone")}
            placeholder="98765 43210"
          />
        </label>
      </div>

      {/* EVENT DATE & VENUE / TOWN */}
      <div className="two2">
        <label>
          EVENT DATE
          <input
            type="date"
            value={f.date}
            onChange={set("date")}
          />
        </label>
        <label>
          VENUE / TOWN
          <input
            maxLength={150}
            value={f.place}
            onChange={set("place")}
            placeholder="Tirunelveli"
          />
        </label>
      </div>

      {/* SERVICES YOU NEED */}
      <div className="lg">
        SERVICES YOU NEED
        <div className="chips">
          {SERVICES.map((s) => (
            <button
              type="button"
              key={s}
              aria-pressed={sel.includes(s)}
              onClick={() => toggle(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ANYTHING WE SHOULD KNOW */}
      <label>
        ANYTHING WE SHOULD KNOW
        <textarea
          rows="3"
          maxLength={1000}
          value={f.note}
          onChange={set("note")}
          placeholder="Rituals, number of events, ideas"
        />
      </label>

      {/* honeypot: hidden from people, bots fill it in and are ignored by the server */}
      <div className="hp" aria-hidden="true" style={{ display: "none" }}>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} />
        </label>
      </div>

      {status === "error" && (
        <p className="err" role="alert" style={{ color: "#9b1c1c", background: "#fdf2f2", padding: "10px 14px", borderRadius: 4, margin: 0 }}>
          {err} {WA && <>You can still reach us directly: <a href={waHref} target="_blank" rel="noopener noreferrer"><u>send this on WhatsApp</u></a>.</>}
        </p>
      )}

      <div style={{ marginTop: 14 }}>
        <button
          className="ew-btn-whatsapp"
          type="submit"
          disabled={status === "sending"}
          style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", border: "none" }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.45 0-2.88-.39-4.14-1.13l-.3-.18-3.08.81.82-3-.2-.31c-.81-1.3-1.24-2.8-1.24-4.35 0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.02 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
          </svg>
          <span>{status === "sending" ? "Sending…" : "Check Availability on WhatsApp"}</span>
        </button>
      </div>
      {status === "sending" && <small className="hint">Sending… this can take a few seconds.</small>}
    </form>
  );
}
