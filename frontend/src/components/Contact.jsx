import { PRIMARY, SERVICES as SERVICES_ALL } from "../data/services";
import { useState } from "react";
import { API, WA, sendEnquiry } from "../api";

const SERVICES = [PRIMARY.name, ...SERVICES_ALL.map((x) => x.name), "Birthday / events"];
const EMPTY = { name: "", phone: "", date: "", place: "", note: "", website: "" };

export default function ContactForm() {
  const [role, setRole] = useState("Couple");
  const [f, setF] = useState(EMPTY);
  const [sel, setSel] = useState([SERVICES[0]]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (s) => setSel(sel.includes(s) ? sel.filter((x) => x !== s) : [...sel, s]);

  const text = `Hello Ethnic Weddings,\nI am ${f.name} (${role}).\nPhone: ${f.phone || "-"}\nDate: ${f.date || "to be decided"}\nVenue: ${f.place || "-"}\nInterested in: ${sel.join(", ") || "to be discussed"}\nNotes: ${f.note || "-"}`;
  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

  const submit = async (e) => {
    e.preventDefault();
    if (!API) { window.open(waHref, "_blank", "noopener"); return; } // no backend connected: classic click-to-chat
    setStatus("sending"); setErr("");
    try { await sendEnquiry({ ...f, role, services: sel }); setStatus("sent"); }
    catch (x) { setErr(x.message); setStatus("error"); }
  };

  if (status === "sent") {
    return (
      <div className="thanks" role="status">
        <h3>Thank you, {f.name.split(" ")[0] || "friend"}!</h3>
        <p>Your enquiry has reached us. We will reply on WhatsApp at {f.phone} within 24 to 48 hours.</p>
        <div className="arow" style={{ justifyContent: "center" }}>
          {WA && <a className="btn line" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">Chat with us now</a>}
          <button className="btn wine" type="button" onClick={() => { setF(EMPTY); setStatus("idle"); }}>Send another enquiry</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="lg">I am a<div className="seg">{["Couple", "Planner", "Family"].map((r) => <button type="button" key={r} className={role === r ? "on" : ""} onClick={() => setRole(r)}>{r}</button>)}</div></div>
      <div className="two2">
        <label>Your names<input required maxLength={100} value={f.name} onChange={set("name")} placeholder="Priya & Arun" /></label>
        <label>WhatsApp number<input required type="tel" inputMode="tel" minLength={8} maxLength={30} value={f.phone} onChange={set("phone")} placeholder="98765 43210" /></label>
      </div>
      <div className="two2">
        <label>Event date<input type="date" value={f.date} onChange={set("date")} /></label>
        <label>Venue / town<input maxLength={150} value={f.place} onChange={set("place")} placeholder="Tirunelveli" /></label>
      </div>
      <div className="lg">Services you need
        <div className="chips">{SERVICES.map((s) => <button type="button" key={s} aria-pressed={sel.includes(s)} onClick={() => toggle(s)}>{s}</button>)}</div>
      </div>
      <label>Anything we should know<textarea rows="3" maxLength={1000} value={f.note} onChange={set("note")} placeholder="Rituals, number of events, ideas" /></label>
      {/* honeypot: hidden from people, bots fill it in and are ignored by the server */}
      <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} /></label></div>
      {status === "error" && (
        <p className="err" role="alert">
          {err} {WA && <>You can still reach us directly: <a href={waHref} target="_blank" rel="noopener noreferrer"><u>send this on WhatsApp</u></a>.</>}
        </p>
      )}
      <button className="btn wine" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : API ? "Send enquiry" : "Send on WhatsApp"}</button>
      {status === "sending" && <small className="hint">Sending… this can take a few seconds.</small>}
    </form>
  );
}
