"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { company, scenes, services } from "@/data/site-content";
import { SectionHeading } from "@/components/section-heading";
import { ProjectInquiry } from "@/components/project-inquiry";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"} stroke="currentColor" strokeWidth="1.5" /></svg>;
}
function Leaf() {
  return <svg className="leaf" viewBox="0 0 50 50" fill="none" aria-hidden="true"><path d="M9 36C9 17 24 8 43 7c0 20-9 35-28 35l-6-6Z" fill="currentColor"/><path d="m10 40 22-22" stroke="var(--forest)" strokeWidth="2.5"/></svg>;
}
export function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const sceneId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-line > span", { yPercent: 110, stagger: .13, duration: 1.15, ease: "power4.out", delay: .15 });
        gsap.from(".hero-meta, .hero-bottom", { autoAlpha: 0, y: 20, duration: .8, delay: .65 });
        gsap.to(".hero-image", { yPercent: 18, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".scroll-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true } });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => gsap.from(el, { y: 44, opacity: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 91%", once: true } }));
        gsap.fromTo(".manifesto-word", { opacity: .23 }, { opacity: 1, stagger: .08, ease: "none", scrollTrigger: { trigger: ".manifesto-title", start: "top 80%", end: "bottom 48%", scrub: .3 } });
        gsap.to(".marquee-inner", { xPercent: -18, ease: "none", scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.to(".nature-photo", { scale: 1, ease: "none", scrollTrigger: { trigger: ".nature-window", start: "top bottom", end: "bottom top", scrub: true } });
      });
      mm.add("(min-width: 1000px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".service-track");
        if (!track) return;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const animation = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: ".service-stage", start: "top top", end: () => "+=" + distance(), pin: true, scrub: .7, invalidateOnRefresh: true } });
        const revealFocusedPanel = (event: FocusEvent) => {
          const target = event.target;
          const trigger = animation.scrollTrigger;
          if (!(target instanceof HTMLElement) || !trigger || !distance()) return;
          const panel = target.closest<HTMLElement>(".service-panel");
          if (!panel || !track.contains(panel)) return;
          const bounds = target.getBoundingClientRect();
          if (bounds.left >= 0 && bounds.right <= window.innerWidth) return;
          const offset = panel.getBoundingClientRect().left - track.getBoundingClientRect().left;
          const progress = Math.min(1, Math.max(0, offset / distance()));
          // Keyboard focus must expose the same panel that scrolling would reveal.
          window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: "instant" });
          trigger.update();
          animation.progress(progress);
          trigger.getTween()?.progress(1);
        };
        track.addEventListener("focusin", revealFocusedPanel);
        return () => track.removeEventListener("focusin", revealFocusedPanel);
      });
    }, root);
    const onLoad = () => ScrollTrigger.refresh();
    document.fonts.ready.then(onLoad);
    window.addEventListener("load", onLoad);
    return () => { window.removeEventListener("load", onLoad); mm.revert(); ctx.revert(); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    navigation.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <div ref={root}>
      <a className="skip-link" href="#inhalt">Zum Inhalt</a><div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="EchtGrün Startseite"><Leaf /><span>echtgrün<span className="wordmark-dot">.</span></span></a>
        <nav ref={navigation} className={menuOpen ? "main-nav is-open" : "main-nav"} id="main-navigation" aria-label="Hauptnavigation">
          <a href="#haltung" onClick={() => setMenuOpen(false)}>Unsere Haltung</a><a href="#leistungen" onClick={() => setMenuOpen(false)}>Was wir machen</a><a href="#einblicke" onClick={() => setMenuOpen(false)}>Einblicke</a><a className="nav-contact" href="#kontakt" onClick={() => setMenuOpen(false)}>Projekt besprechen <Arrow diagonal /></a>
        </nav><button ref={menuButton} className="menu-toggle" type="button" aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Schließen −" : "Menü +"}</button>
      </header>
      <main id="inhalt" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <Image className="hero-image" width={2200} height={1467} src="/images/forest-hero.jpg" alt="Licht fällt zwischen hohe Bäume in einem grünen Wald. Illustrative Naturaufnahme." fetchPriority="high" />
          <div className="hero-shade" /><div className="hero-meta"><span><i className="status-dot" /> Draußen ist unser Ding.</span><span>LEICHLINGEN / BERGISCHES LAND</span></div>
          <div className="hero-content"><h1 id="hero-title"><span className="hero-line"><span>ECHT.</span></span><span className="hero-line hero-line--green"><span>GRÜN.</span></span></h1><div className="hero-side"><p>Starke Hände.<br />Starke Technik.<br /><em>Ein gutes Stück Natur.</em></p><a className="circle-link" href="#leistungen" aria-label="Leistungen entdecken"><Arrow /></a></div></div>
          <div className="hero-bottom"><a href="#haltung"><span className="scroll-line" /> Runter ins Grüne</a><p>Baum & Landschaft · Garten & Gestaltung · Energieholz</p><span className="image-note">Naturaufnahme zur Illustration</span></div>
        </section>
        <section className="manifesto section-pad" id="haltung">
          <div className="section-top" data-reveal><span className="eyebrow"><span className="little-cross">+</span> Verwurzelt im Handwerk</span><span className="section-index">01 / HALTUNG</span></div>
          <h2 className="manifesto-title">{"WIR PACKEN AN. DAMIT DRAUSSEN WAS GUTES WÄCHST.".split(" ").map((word, i) => <span className="manifesto-word" key={i}>{word} </span>)}</h2>
          <div className="manifesto-bottom" data-reveal><div className="brand-stamp"><Leaf /><span>Mit Kopf.<br />Mit Hand.<br />Mit Haltung.</span></div><div><p>Ob Baum, Garten oder Landschaft: Hinter jedem Stück Grün steckt Arbeit. Genau dort setzt EchtGrün an – mit dem Blick fürs Ganze und der passenden Technik.</p><p className="muted">Baum- und Landschaftspflege. Garten- und Landschaftsbau. Energieholzvermarktung. Drei Bereiche, ein Name.</p></div></div>
        </section>
        <section id="leistungen" className="services-section" aria-labelledby="services-heading">
          <div className="service-intro section-pad"><SectionHeading eyebrow="Was wir machen" title="VON DER WURZEL BIS ZUR IDEE." body="Drei Wege, draußen etwas zu bewegen. Scrollen Sie durch die Leistungen." /><span className="section-index">02 / LEISTUNGEN</span></div><h2 id="services-heading" className="sr-only">Unsere Leistungen</h2>
          <div className="service-stage"><div className="service-track">{services.map(service => <article className="service-panel" key={service.number}><div className="service-info"><div className="service-label"><span>{service.number} / 03</span><span>{service.category}</span></div><h3>{service.short}</h3><p className="service-subtitle">{service.title}</p><p className="service-copy">{service.copy}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="text-link" href="#kontakt">Darüber sprechen <Arrow diagonal /></a></div><figure className="service-image"><Image src={service.image} alt={service.alt} loading="lazy" width="640" height="560" /><figcaption>{service.credit}</figcaption><span className="image-cross" aria-hidden="true">+</span></figure></article>)}</div></div>
        </section>
        <div className="marquee" aria-hidden="true"><div className="marquee-inner">ECHTE ARBEIT. <span>✳</span> ECHTES GRÜN. <span>✳</span> ECHTE ARBEIT. <span>✳</span> ECHTES GRÜN. <span>✳</span></div></div>
        <section className="machine-section section-pad" id="technik">
          <div className="machine-heading" data-reveal><span className="eyebrow">Kraft trifft Fingerspitzengefühl</span><h2>GROSSE TECHNIK.<br /><span>KLARER AUFTRAG.</span></h2><p>Manche Aufgaben brauchen mehr als Muskelkraft. Ein Blick auf die Maschinen, die EchtGrün auf Instagram zeigt.</p></div>
          <figure className="machine-figure" data-reveal><Image src="/images/echtgruen-truck.jpg" alt="EchtGrün-Firmen-Lkw mit grünem Aufbau und rotem Ladekran im Einsatz" width="640" height="559" loading="lazy" /><figcaption><span>ECHTGRÜN IN AKTION</span><span>Originalaufnahme · @echtgruen</span></figcaption><div className="machine-badge" aria-hidden="true"><Arrow diagonal /></div></figure>
          <div className="machine-list" data-reveal><span>IM PROFIL ENTDECKEN</span><a href={company.instagram} target="_blank" rel="noreferrer">Sennebogen <Arrow diagonal /></a><a href={company.instagram} target="_blank" rel="noreferrer">Menzi Muck <Arrow diagonal /></a><a href={company.instagram} target="_blank" rel="noreferrer">Albach <Arrow diagonal /></a></div>
        </section>
        <section className="insights section-pad" id="einblicke">
          <div className="section-top" data-reveal><span className="eyebrow">Ein Perspektivwechsel</span><span className="section-index">03 / EINBLICKE</span></div><div className="insights-heading" data-reveal><h2>MAN MUSS ES<br /><span>GESEHEN HABEN.</span></h2><p>Arbeit, die sich sehen lassen kann.<br />So könnte EchtGrün in Bewegung aussehen.</p></div>
          <div className="storyboard" data-reveal><div className="storyboard-image"><Image src={activeScene === 1 ? "/images/echtgruen-sennebogen.webp" : activeScene === 2 ? "/images/echtgruen-truck.jpg" : "/images/forest-detail.jpg"} alt={activeScene === 0 ? "Waldaufnahme als Stimmung für eine geplante Drohnensequenz" : activeScene === 1 ? "EchtGrün Sennebogen bei der Baumpflege, Foto Photo Faber" : "EchtGrün Lkw im Einsatz"} width="900" height="650" loading="lazy" /><span className="frame-corner frame-corner--tl" /><span className="frame-corner frame-corner--br" /><div className="viewfinder"><span><i className="status-dot" /> STORYBOARD</span><span>0{activeScene + 1} / 03</span></div><span className="storyboard-label">{activeScene === 0 ? "STIMMUNGSBILD · KEINE DROHNENAUFNAHME" : activeScene === 1 ? "ORIGINALFOTO · PHOTO FABER · KEIN VIDEO" : "ORIGINALFOTO · ECHTGRÜN · KEIN VIDEO"}</span></div>
          <div className="scene-selector">
            <div role="tablist" aria-label="Geplante Filmszenen" aria-orientation="vertical">
              {scenes.map((scene, i) => (
                <button
                  key={scene.number}
                  type="button"
                  id={`${sceneId}-tab-${i}`}
                  role="tab"
                  aria-selected={activeScene === i}
                  aria-controls={`${sceneId}-description`}
                  tabIndex={activeScene === i ? 0 : -1}
                  className={activeScene === i ? "scene is-active" : "scene"}
                  onClick={() => setActiveScene(i)}
                  onKeyDown={event => {
                    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
                      event.preventDefault();
                      const next = event.key === "Home" ? 0 : event.key === "End" ? scenes.length - 1 : (i + (event.key === "ArrowDown" ? 1 : -1) + scenes.length) % scenes.length;
                      setActiveScene(next);
                      document.getElementById(`${sceneId}-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span className="scene-number">{scene.number}</span>
                  <span><small>{scene.kind}</small><strong>{scene.title}</strong></span>
                  <span className="scene-plus" aria-hidden="true">{activeScene === i ? "−" : "+"}</span>
                </button>
              ))}
            </div>
            <div id={`${sceneId}-description`} role="tabpanel" aria-labelledby={`${sceneId}-tab-${activeScene}`} tabIndex={0}>
              <p className="scene-description">{scenes[activeScene].text}</p>
            </div>
            <p className="concept-note">Film- und Content-Konzept. Die Dreharbeiten und Drohnenaufnahmen sind noch zu produzieren.</p>
          </div></div>
          <a className="text-link instagram-link" href={company.instagram} target="_blank" rel="noreferrer">Schon jetzt echte Einblicke: @echtgruen <Arrow diagonal /></a>
        </section>
        <section className="nature-window" aria-label="Natur als Ausgangspunkt"><Image className="nature-photo" src="/images/forest-hero.jpg" alt="Licht zwischen Bäumen, illustrative Naturaufnahme" loading="lazy" width="2200" height="1467" /><div className="nature-copy"><span className="eyebrow">Unser gemeinsamer Nenner</span><p>DRAUSSEN.<br />MIT ZUKUNFT.</p></div><span className="nature-caption">Illustrative Naturaufnahme · Unsplash</span></section>
        <section id="kontakt" className="contact-section section-pad">
          <div className="section-top" data-reveal><span className="eyebrow">Der nächste Schritt ist ein Gespräch.</span><span className="section-index">04 / KONTAKT</span></div><h2 data-reveal>LASS UNS<br /><span>GRÜN MACHEN.</span><span className="contact-asterisk" aria-hidden="true">✳</span></h2>
          <div className="contact-grid"><div className="contact-copy" data-reveal><p>Ein Baum, eine Fläche, eine Idee?<br />Erzählen Sie uns, was Sie vorhaben.</p><a className="contact-email" href={`mailto:${company.email}`}>{company.email}<Arrow diagonal /></a><a className="text-link" href="tel:+4921751806082">{company.phone}<Arrow diagonal /></a><a className="text-link" href={company.instagram} target="_blank" rel="noreferrer">Instagram @echtgruen <Arrow diagonal /></a><div className="demo-disclosure"><span className="eyebrow">Unabhängiges Website-Konzept</span><p>Diese Vorschau ist ein Gestaltungsvorschlag von Kevin und keine offizielle Website von EchtGrün. Die Kontaktdaten führen zum Unternehmen.</p></div></div><ProjectInquiry /></div>
        </section>
      </main>
      <footer className="site-footer"><div className="footer-top"><a className="wordmark" href="#"><Leaf /><span>echtgrün</span></a><span>Grün mit Charakter.</span><a href="#" className="back-top">Zurück nach oben ↑</a></div><div className="footer-bottom"><span>Konzept © {new Date().getFullYear()} Kevin · Für EchtGrün</span><div><Link href="/konzepthinweise">Konzept & Bildnachweise</Link><Link href="/datenschutz">Datenschutz</Link><a href={company.website} target="_blank" rel="noreferrer">Bestehende Website ↗</a></div></div></footer>
    </div>
  );
}
