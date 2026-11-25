import { STEPS } from "@/lib/content";

export function Steps() {
  return (
    <section className="section surface-cream" aria-labelledby="como-funciona">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">Cómo funciona</p>
          <h2 className="h2" id="como-funciona">
            Tres pasos, siempre contigo.
          </h2>
          <p className="lead">De la elección a la experiencia, todo se coordina por canal directo.</p>
        </div>
        <ol className="steps" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {STEPS.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step__number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
