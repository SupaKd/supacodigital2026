import { Icon } from "../icons";
import MeshBg from "./MeshBg";

export default function Hero({ onOpenCalendly }) {
  return (
    <section className="hero" id="accueil">
      <div className="hero-bg">
        <MeshBg />
        <div className="hero-bg-noise" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-outline">Plus de</span>
          <span className="hero-title-solid">Clients</span>
          <span className="hero-title-outline">Grâce au Web</span>
        </h1>
        <p className="hero-sub">Votre site web, votre meilleur commercial.</p>
        <p className="hero-desc">
          Agence web dans le Pays de Gex, Supaco Digital conçoit des sites et applications qui attirent,
          convainquent et convertissent — pour que les PME, indépendants et
          e-commerces gagnent de nouveaux clients chaque jour.
        </p>
      </div>
      <div className="hero-right">
        <div className="hero-badge">Agence web · Pays de Gex · Site web</div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">9</div>
            <div className="hero-stat-lbl">Projets livrés</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">100%</div>
            <div className="hero-stat-lbl">Clients satisfaits</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">72h</div>
            <div className="hero-stat-lbl">Délai vitrine</div>
          </div>
        </div>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            <span>Démarrer mon projet</span>
            <Icon.Arrow />
          </a>
          <button onClick={onOpenCalendly} className="btn-ghost">
            <span>Appel gratuit 30 min</span>
            <Icon.Arrow />
          </button>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span>Découvrir</span>
      </div>
    </section>
  );
}
