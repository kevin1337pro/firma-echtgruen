"use client";

import { useId, useRef, useState } from "react";

const recipient = "Info@skorubski-echtgruen.de";

type PreparedInquiry = {
  mailto: string;
  preview: string;
};

export function ProjectInquiry() {
  const id = useId();
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const [prepared, setPrepared] = useState<PreparedInquiry | null>(null);
  const [status, setStatus] = useState("");

  function prepareInquiry(event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (field: string) => String(data.get(field) ?? "").trim();

    // Required fields should also reject a value consisting only of spaces.
    for (const name of ["location", "description", "name", "email"]) {
      const field = form.elements.namedItem(name);
      if (
        (field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement) &&
        !read(name)
      ) {
        field.setCustomValidity("Bitte füllen Sie dieses Feld aus.");
        field.reportValidity();
        return;
      }
    }

    const service = read("service");
    const location = read("location").replace(/\s+/g, " ");
    const name = read("name").replace(/\s+/g, " ");
    const email = read("email");
    const subject = `Projektanfrage: ${service} in ${location}`;
    const body = [
      "Guten Tag, liebes EchtGrün-Team,",
      "",
      "ich möchte folgendes Projekt mit Ihnen besprechen:",
      "",
      `Bereich: ${service}`,
      `Ort: ${location}`,
      "",
      read("description"),
      "",
      "Sie erreichen mich unter:",
      `Name: ${name}`,
      `E-Mail: ${email}`,
      "",
      "Ich freue mich über Ihre Rückmeldung.",
      "",
      "Freundliche Grüße",
      name,
    ].join("\n");

    setPrepared({
      mailto: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      preview: `An: ${recipient}\nBetreff: ${subject}\n\n${body}`,
    });
    setStatus(
      "Ihre E-Mail ist vorbereitet. Prüfen Sie den Text und öffnen Sie ihn anschließend in Ihrem E-Mail-Programm oder kopieren Sie ihn.",
    );
  }

  async function copyInquiry() {
    if (!prepared) return;

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }
      await navigator.clipboard.writeText(prepared.preview);
      setStatus("Der E-Mail-Text wurde in die Zwischenablage kopiert.");
    } catch {
      previewRef.current?.focus();
      previewRef.current?.select();
      setStatus(
        "Automatisches Kopieren ist hier nicht verfügbar. Der Vorschautext ist markiert. Kopieren Sie ihn bitte mit Strg+C, auf dem Mac mit ⌘C, oder über das Kontextmenü.",
      );
    }
  }

  return (
    <form
      className="inquiry-form"
      onSubmit={prepareInquiry}
      onChange={(event) => {
        const field = event.target;
        if (
          (field instanceof HTMLSelectElement ||
            ((field instanceof HTMLInputElement ||
              field instanceof HTMLTextAreaElement) &&
              !field.readOnly)) &&
          field.name
        ) {
          setPrepared(null);
          setStatus("");
        }
      }}
      onInput={(event) => {
        const field = event.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        ) {
          field.setCustomValidity("");
        }
      }}
      aria-describedby={`${id}-notice`}
    >
      <p id={`${id}-notice`}>
        Bereitet eine E-Mail vor. Es wird hier nichts versendet oder gespeichert.
        Alle Felder sind Pflichtfelder.
      </p>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={`${id}-service`}>Worum geht es?</label>
          <select id={`${id}-service`} name="service" defaultValue="" required>
            <option value="" disabled>
              Bereich auswählen
            </option>
            <option>Baum-/Landschaftspflege</option>
            <option>Garten-/Landschaftsbau</option>
            <option>Energieholz</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor={`${id}-location`}>Wo liegt Ihr Projekt?</label>
          <input
            id={`${id}-location`}
            name="location"
            autoComplete="address-level2"
            placeholder="Ort oder Postleitzahl"
            maxLength={100}
            required
          />
        </div>

        <div className="form-field form-full">
          <label htmlFor={`${id}-description`}>Ihr Vorhaben in wenigen Worten</label>
          <textarea
            id={`${id}-description`}
            name="description"
            rows={4}
            placeholder="Was steht an? Was ist Ihnen dabei wichtig?"
            maxLength={2500}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${id}-name`}>Ihr Name</label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            placeholder="Vor- und Nachname"
            maxLength={120}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${id}-email`}>Ihre E-Mail-Adresse</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@beispiel.de"
            maxLength={254}
            required
          />
        </div>
      </div>

      <button className="button button--dark" type="submit">
        E-Mail vorbereiten <span aria-hidden="true">↗</span>
      </button>

      {prepared ? (
        <div className="form-preview" aria-labelledby={`${id}-preview-title`}>
          <h3 id={`${id}-preview-title`}>Ihre Anfrage, bereit zum Versenden.</h3>
          <div className="form-field">
            <label htmlFor={`${id}-preview`}>E-Mail-Vorschau</label>
            <textarea
              ref={previewRef}
              id={`${id}-preview`}
              value={prepared.preview}
              rows={14}
              readOnly
            />
          </div>
          <a className="button button--dark" href={prepared.mailto}>
            Im E-Mail-Programm öffnen <span aria-hidden="true">↗</span>
          </a>
          <button
            className="button button--outline"
            type="button"
            onClick={copyInquiry}
          >
            E-Mail-Text kopieren
          </button>
          <p>
            Der Versand erfolgt erst in Ihrem E-Mail-Programm. Wenn sich kein
            Programm öffnet, kopieren Sie den Text und senden Sie ihn an{" "}
            <a href={`mailto:${recipient}`}>{recipient}</a>.
          </p>
        </div>
      ) : null}

      <p className="form-status" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </form>
  );
}
