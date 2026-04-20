import { useState } from "react";
import { Icon } from "../icons";
import LightBg from "./LightBg";

const projects = [
  {
    num: "01",
    name: "Kekosan",
    tags: ["App restaurant"],
    placeholder: "KK",
    logo: "/logo/logokekosan.png",
    desc: "Application web pour un restaurant. Commandes en ligne, gestion des menus et interface d'administration sur mesure.",
    url: "https://www.kekosan.com/",
    year: "2026",
  },

  {
    num: "02",
    name: "MB Patrimoine",
    tags: ["Site Vitrine"],
    placeholder: "MB",
    logo: "/logo/mbpatrimoine.png",
    desc: "Site vitrine pour une conseillère en gestion de patrimoine. Design soigné, formulaire de contact et présentation des services.",
    url: "https://mb-patrimoine-finance.fr/",
    year: "2026",
  },
  {
    num: "03",
    name: "Bellifood",
    tags: ["Site Vitrine"],
    placeholder: "BF",
    logo: "/logo/belli.logo.png",
    desc: "Site vitrine pour une entreprise de restauration. Présentation des services, menu et prise de contact.",
    url: "https://bellifood.com/",
    year: "2025",
  },
  {
    num: "04",
    name: "Sabai Thoiry",
    tags: ["App restaurant"],
    placeholder: "ST",
    logo: "/logo/logosabai.png",
    desc: "Application de commandes en ligne pour un restaurant. Gestion des menus, commandes en temps réel et interface d'administration.",
    url: "https://sabai-thoiry.com/",
    year: "2026",
  },
  {
    num: "05",
    name: "Dépannage Gémeaux",
    tags: ["Site Vitrine"],
    placeholder: "DG",
    logo: "/logo/depannagegemeaux.svg",
    desc: "Site vitrine pour un service de dépannage. Mise en avant des interventions, zone géographique et formulaire de demande urgente.",
    url: "https://depannage-gemeaux.fr/",
    year: "2025",
  },
  {
    num: "06",
    name: "Yojeme",
    tags: ["Site Vitrine"],
    placeholder: "YJ",
    logo: "/logo/yojeme.png",
    desc: "Site vitrine moderne pour une marque indépendante. Design épuré, identité visuelle forte et expérience utilisateur soignée.",
    url: "https://www.yojeme.fr/",
    year: "2025",
  },
  {
    num: "07",
    name: "Photographe",
    tags: ["Portfolio"],
    placeholder: "PH",
    desc: "Portfolio en ligne pour un photographe professionnel. Galerie immersive, présentation des prestations et prise de rendez-vous.",
    url: "https://photographe-six.vercel.app/",
    year: "2025",
  },
  {
    num: "08",
    name: "Restaurant Lyon",
    tags: ["Portfolio"],
    placeholder: "RL",
    desc: "Site vitrine pour un restaurant. Présentation de la carte, ambiance du lieu et réservation en ligne.",
    url: "https://restaurant-t.vercel.app/",
    year: "2025",
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (i) => setActive(active === i ? null : i);
  const visible = showAll ? projects : projects.slice(0, 3);
  const INITIAL = 3;

  return (
    <section className="section projects" id="projets">
      <LightBg variant="a" />
      <div className="proj-header">
        <div>
          <div className="section-label">Réalisations</div>
          <h2 className="section-title">
            Mes <em>projets</em>
          </h2>
        </div>
        <a href="#contact" className="btn-ghost">
          <span>Démarrer le vôtre</span>
          <Icon.Arrow />
        </a>
      </div>

      <div className="proj-list">
        {visible.map((p, i) => {
          const isOpen = active === i;
          const isNew = showAll && i >= INITIAL;
          return (
            <div
              key={p.num}
              className={`proj-item${isOpen ? " proj-item--open" : ""}${isNew ? " proj-item--reveal" : ""}`}
              style={isNew ? { '--reveal-delay': `${(i - INITIAL) * 80}ms` } : undefined}
            >
              {/* ── Ligne cliquable ── */}
              <button
                className="proj-row"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <span className="proj-row-num">{p.num}</span>
                <span className="proj-row-name">{p.name}</span>
                <div className="proj-row-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="proj-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="proj-row-year">{p.year}</span>
                <span className="proj-row-arrow">
                  <Icon.Arrow />
                </span>
              </button>

              {/* ── Contenu expandable ── */}
              <div className="proj-panel">
                <div className="proj-panel-inner">
                  {/* Visuel */}
                  <div className="proj-visual">
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="proj-logo"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="proj-placeholder">{p.placeholder}</div>
                    )}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-visual-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Voir le site <Icon.Arrow />
                    </a>
                  </div>
                  {/* Infos */}
                  <div className="proj-details">
                    <div className="proj-details-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="proj-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="proj-details-name">{p.name}</h3>
                    <p className="proj-details-desc">{p.desc}</p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-details-cta"
                    >
                      <span>Voir le site</span>
                      <Icon.Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="proj-show-more"
        onClick={() => {
          setShowAll((s) => !s);
          setActive(null);
        }}
      >
        <span>
          {showAll
            ? "Voir moins"
            : `Voir les ${projects.length - 3} autres projets`}
        </span>
        <span
          className={`proj-show-more-arrow${
            showAll ? " proj-show-more-arrow--up" : ""
          }`}
        >
          <Icon.Arrow />
        </span>
      </button>
    </section>
  );
}
