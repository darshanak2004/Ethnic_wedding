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

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
        <button
          className="ew-btn-wine"
          type="submit"
          disabled={status === "sending"}
          style={{ flex: "1 1 180px", cursor: "pointer", border: "none" }}
        >
          {status === "sending" ? "Sending…" : API ? "Send enquiry" : "Send on WhatsApp"}
        </button>
        <button
          type="button"
          onClick={handleWhatsAppDirect}
          className="ew-btn-gold"
          style={{ flex: "1 1 180px", cursor: "pointer" }}
        >
          Direct WhatsApp 💬
        </button>
      </div>
      {status === "sending" && <small className="hint">Sending… this can take a few seconds.</small>}
    </form>
  );
}
