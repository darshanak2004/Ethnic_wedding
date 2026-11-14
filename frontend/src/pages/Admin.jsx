import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  API, token, login, uploadFile, saveImage, removeImage, saveHeroVideo, addEvent, deleteEvent,
  getEnquiries, resendEnquiry, deleteEnquiry, waStatus, waPair, waTest, waReset, cdn,
} from "../api";

function Grid({ images, section, busy, label, onAdd, onDel }) {
  return (
    <div className="agrid">
      {images.map((im) => (
        <figure key={im.id}>
          <img src={cdn(im.url, 400)} alt={im.alt} />
          <button onClick={() => onDel(im.id, section)} aria-label="Remove">✕</button>
        </figure>
      ))}
      <label className="add">
        {busy ? label || "Uploading…" : "+ Add photos"}
        <input type="file" accept="image/*" multiple hidden disabled={busy} onChange={(e) => { onAdd([...e.target.files], section); e.target.value = ""; }} />
      </label>
    </div>
  );
}

const when = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

function Enquiries({ fail }) {
  const [rows, setRows] = useState(null);
  const load = () => getEnquiries().then(setRows).catch(fail);
  useEffect(() => { load(); }, []);
  if (!API) return <><h2>Enquiries</h2><p className="hint">Connect the backend to see customer enquiries here.</p></>;
  const resend = async (id) => { try { await resendEnquiry(id); setTimeout(load, 2500); } catch (x) { fail(x); } };
  const del = async (id) => { if (!confirm("Delete this enquiry?")) return; try { await deleteEnquiry(id); setRows((r) => r.filter((x) => x.id !== id)); } catch (x) { fail(x); } };
  return (
    <>
      <h2>Enquiries</h2>
      <p className="hint">Every enquiry is saved here first, then sent to your WhatsApp. <button className="lnk" onClick={load}>Refresh</button></p>
      {rows === null ? <p>Loading…</p> : rows.length === 0 ? <p>No enquiries yet.</p> : (
        <div className="enqs">{rows.map((e) => {
          const d = e.phone.replace(/\D/g, "");
          const wa = d.length === 10 ? "91" + d : d;
          return (
            <article className="enq" key={e.id}>
              <header><b>{e.name}</b> <span className="muted">· {e.role || "-"} · {when(e.created_at)}</span><span className={`pill ${e.wa_status}`}>{e.wa_status === "sent" ? "On WhatsApp" : e.wa_status === "pending" ? "Waiting to send" : "Not delivered"}</span></header>
              <p><a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">{e.phone}</a>{e.event_date && ` · ${e.event_date}`}{e.place && ` · ${e.place}`}</p>
              {e.services && <p>{e.services}</p>}
              {e.note && <p className="muted">“{e.note}”</p>}
              <div className="arow">
                <a className="btn wine sm" href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">Reply on WhatsApp</a>
                {e.wa_status !== "sent" && <button className="btn line sm" onClick={() => resend(e.id)}>Send to my WhatsApp again</button>}
                <button className="btn line sm" onClick={() => del(e.id)}>Delete</button>
              </div>
            </article>
          );
        })}</div>
      )}
    </>
  );
}

function WhatsApp({ fail }) {
  const [s, setS] = useState(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!API) return;
    let live = true;
    const tick = () => waStatus().then((x) => live && setS(x)).catch(fail);
    tick();
    const t = setInterval(tick, 3000);
    return () => { live = false; clearInterval(t); };
  }, []);
  if (!API) return <><h2>WhatsApp</h2><p className="hint">Connect the backend to link WhatsApp.</p></>;
  if (!s) return <><h2>WhatsApp</h2><p>Loading…</p></>;
  const run = async (fn, ok) => { setBusy(true); setMsg(""); try { await fn(); setMsg(ok); } catch (x) { if (x.status === 401) fail(x); else setMsg(x.message); } setBusy(false); };
  const sameNumber = s.linkedAs && s.receivers.includes(s.linkedAs);
  return (
    <>
      <h2>WhatsApp</h2>
      <p className="hint">New enquiries are sent to: {s.receivers.length ? s.receivers.map((n) => `+${n}`).join(", ") : "nobody yet (set ADMIN_WHATSAPP on the server)"}</p>
      {!s.enabled && <p className="err">WhatsApp is switched off on the server (WHATSAPP_ENABLED=false).</p>}
      {s.state === "open" && (
        <div className="wabox ok">
          <b>● Connected</b> as +{s.linkedAs}
          {sameNumber && <p className="hint" style={{ marginTop: 8 }}>You linked the same number that receives enquiries, so they arrive in your “Message yourself” chat and may not notify. A second number for linking is more reliable.</p>}
          <div className="arow">
            <button className="btn wine sm" disabled={busy} onClick={() => run(waTest, "Test message sent. Check your WhatsApp.")}>Send test message</button>
            <button className="btn line sm" disabled={busy} onClick={() => confirm("Unlink this WhatsApp? You will need to link again.") && run(waReset, "Unlinked. A new QR code will appear shortly.")}>Unlink / change number</button>
          </div>
        </div>
      )}
      {s.state === "qr" && (
        <div className="wabox">
          <b>Link a WhatsApp account</b>
          <p className="hint">This is the account that will <i>send</i> the enquiry messages (a spare number or WhatsApp Business is best).</p>
          <div className="walink">
            {s.qr && <img src={s.qr} alt="WhatsApp QR code" width="220" height="220" />}
            <ol>
              <li>On that phone open WhatsApp, then <b>Settings → Linked devices → Link a device</b>.</li>
              <li>Scan this QR code. It refreshes by itself.</li>
            </ol>
          </div>
          <p className="hint" style={{ marginTop: 14 }}>Using the same phone you are on now? Link with a code instead: choose <b>Link with phone number instead</b> in WhatsApp and enter the code below.</p>
          <form className="arow" onSubmit={(e) => { e.preventDefault(); run(async () => setCode((await waPair(phone)).code), ""); }}>
            <input placeholder="91XXXXXXXXXX (with country code)" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" />
            <button className="btn wine sm" disabled={busy}>Get code</button>
          </form>
          {code && <p className="pcode">{code}</p>}
        </div>
      )}
      {["starting", "connecting", "closed"].includes(s.state) && <div className="wabox"><b>Connecting…</b><p className="hint">If this stays here for more than a minute, reload this page.</p></div>}
      {msg && <p className="hint" style={{ marginTop: 10 }}>{msg}</p>}
    </>
  );
}

export default function Admin({ content, setContent, live }) {
  const [authed, setAuthed] = useState(!!token.get());
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [label, setLabel] = useState("");
  const [tab, setTab] = useState("home");
  const [newEvent, setNewEvent] = useState("");

  const fail = (x) => {
    if (x.status === 401) { token.clear(); setAuthed(false); setErr("Your session ended. Please sign in again."); }
    else alert(x.message);
  };

  const doLogin = async (e) => {
    e.preventDefault();
    try { token.set(await login(pw)); setAuthed(true); setErr(""); }
    catch (x) { setErr(x.message); }
  };

  if (!authed) {
    return (
      <div className="adm-login">
        <form onSubmit={doLogin}>
          <img src="/assets/mono-wine.png" alt="" />
          <h2>Admin</h2>
          <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
          {err && <p className="err">{err}</p>}
          <button className="btn wine">Sign in</button>
          {!API && <small>Demo mode: backend not connected, any password works and changes are not saved.</small>}
        </form>
      </div>
    );
  }

  if (!live) return <div className="adm-login"><div style={{ textAlign: "center" }}><img src="/assets/mono-wine.png" alt="" style={{ height: 70, margin: "0 auto 12px" }} /><p>Connecting to the server…</p><small>If the server was idle this can take up to a minute.</small></div></div>;

  const persist = (next) => {
    try { localStorage.setItem("ew_content_v1", JSON.stringify(next)); } catch {}
    return next;
  };

  const patchSection = (section, fn) =>
    setContent((c) => persist(section === "hero"
      ? { ...c, hero: { ...c.hero, slides: fn(c.hero.slides) } }
      : { ...c, events: c.events.map((e) => (e.slug === section ? { ...e, images: fn(e.images) } : e)) }));

  const addTo = async (files, section) => {
    setBusy(true);
    let n = 0;
    try {
      for (const file of files) {
        setLabel(`Uploading ${++n} of ${files.length}…`);
        const up = await uploadFile(file);
        const rec = await saveImage(section, up, file.name.replace(/\.\w+$/, ""));
        patchSection(section, (list) => [...list, rec]);
      }
    } catch (x) { fail(x); }
    setBusy(false);
  };

  const del = async (id, section) => {
    if (!confirm("Remove this photo?")) return;
    try { await removeImage(id); patchSection(section, (list) => list.filter((i) => i.id !== id)); } catch (x) { fail(x); }
  };

  const setVideo = async (file) => {
    setBusy(true); setLabel("Uploading video…");
    try {
      const up = await uploadFile(file);
      await saveHeroVideo(up);
      setContent((c) => persist({ ...c, hero: { ...c.hero, videoUrl: up.url } }));
    } catch (x) { fail(x); }
    setBusy(false);
  };

  const clearVideo = async () => {
    try { await saveHeroVideo(null); setContent((c) => persist({ ...c, hero: { ...c.hero, videoUrl: "" } })); } catch (x) { fail(x); }
  };

  const makeEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.trim()) return;
    try {
      const ev = await addEvent(newEvent);
      setContent((c) => persist({ ...c, events: [...c.events, ev] }));
      setNewEvent(""); setTab(ev.slug);
    } catch (x) { fail(x); }
  };

  const removeEvent = async (ev) => {
    if (!confirm(`Delete "${ev.title}" and all its photos? This cannot be undone.`)) return;
    try { await deleteEvent(ev.slug); setContent((c) => persist({ ...c, events: c.events.filter((e) => e.slug !== ev.slug) })); setTab("home"); } catch (x) { fail(x); }
  };

  const ev = content.events.find((e) => e.slug === tab);

  return (
    <div className="adm">
      <aside>
        <img src="/assets/word-cream.png" alt="Ethnic Weddings" />
        <button className={tab === "home" ? "on" : ""} onClick={() => setTab("home")}>Homepage</button>
        <small>Portfolio events</small>
        {content.events.map((e) => (
          <button key={e.slug} className={tab === e.slug ? "on" : ""} onClick={() => setTab(e.slug)}>{e.title}</button>
        ))}
        <form onSubmit={makeEvent}>
          <input placeholder="New event name" maxLength={40} value={newEvent} onChange={(e) => setNewEvent(e.target.value)} />
          <button className="btn cream">Add</button>
        </form>
        <small>Customers</small>
        <button className={tab === "__enq" ? "on" : ""} onClick={() => setTab("__enq")}>Enquiries</button>
        <button className={tab === "__wa" ? "on" : ""} onClick={() => setTab("__wa")}>WhatsApp</button>
        <Link to="/">View site ↗</Link>
        <button onClick={() => { token.clear(); setAuthed(false); }}>Sign out</button>
      </aside>
      <main>
        {tab === "home" ? (
          <>
            <h2>Homepage</h2>
            <h3>Hero video</h3>
            <p className="hint">Keep it under 30 seconds and about 20-30 MB. It plays muted on a loop.</p>
            {content.hero.videoUrl && <video src={cdn(content.hero.videoUrl)} muted controls style={{ maxWidth: 420, borderRadius: 16 }} />}
            <div className="arow">
              <label className="btn wine">
                {busy ? label || "Uploading…" : content.hero.videoUrl ? "Replace video" : "Upload video"}
                <input type="file" accept="video/*" hidden disabled={busy} onChange={(e) => { e.target.files[0] && setVideo(e.target.files[0]); e.target.value = ""; }} />
              </label>
              {content.hero.videoUrl && <button className="btn line" onClick={clearVideo}>Remove video</button>}
            </div>
            <h3>Hero photos (shown when no video is set)</h3>
            <Grid images={content.hero.slides} section="hero" busy={busy} label={label} onAdd={addTo} onDel={del} />
          </>
        ) : tab === "__enq" ? <Enquiries fail={fail} />
          : tab === "__wa" ? <WhatsApp fail={fail} />
          : ev ? (
            <>
              <h2>{ev.title}</h2>
              <p className="hint">Photos added here appear in the Portfolio under “{ev.title}”. Large photos are shrunk automatically before upload.</p>
              <Grid images={ev.images} section={ev.slug} busy={busy} label={label} onAdd={addTo} onDel={del} />
              <div className="arow" style={{ marginTop: 28 }}><button className="btn line sm" onClick={() => removeEvent(ev)}>Delete this event</button></div>
            </>
          ) : null}
      </main>
    </div>
  );
}
