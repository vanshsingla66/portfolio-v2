import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { journey } from "../data/profile";
import "./styles/Journey.css";

const Journey = () => {
  return (
    <section className="section journey" id="journey">
      <Reveal>
        <span className="eyebrow">Journey</span>
        <h2 className="section-title">
          The road <span className="gradient-text">so far</span>
        </h2>
      </Reveal>

      <div className="journey__timeline">
        <motion.div
          className="journey__line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        {journey.map((j, i) => (
          <Reveal key={j.year} delay={i * 0.1} className="journey__item">
            <div className="journey__node">
              <span className="journey__node-ring" />
            </div>
            <div className="journey__content glass">
              <span className="journey__year mono">{j.year}</span>
              <h3>{j.title}</h3>
              <p>{j.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Journey;
