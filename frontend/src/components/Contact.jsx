import { Icon } from "../icons";
import { CALENDLY_URL } from "../config";
import ContactForm from "./ContactForm";
import MeshBg from "./MeshBg";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <MeshBg />
      <div className="contact-inner">
        <div className="contact-info">
          <div className="section-label">Contact</div>
          <h2 className="section-title">
            Démarrons <em>ensemble</em>
          </h2>
          <p className="contact-desc">
            Vous êtes dans le Pays de Gex, à Genève ou ailleurs ? Parlez-moi de
            votre projet et recevez une réponse sous 24h. Ou réservez
            directement un appel découverte gratuit de 30 min.
          </p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon">
                <Icon.Mail />
              </div>
              <div>
                <div className="contact-item-label">Email</div>
                <div className="contact-item-value">
                  contact@supaco-digital.com
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <Icon.Map />
              </div>
              <div>
                <div className="contact-item-label">Localisation</div>
                <div className="contact-item-value">
                  Saint-Genis-Pouilly, France
                </div>
              </div>
            </div>
            <a
              href="https://www.instagram.com/supacodigital/"
              target="_blank"
              rel="noreferrer"
              className="contact-item contact-item--link"
            >
              <div className="contact-item-icon">
                <Icon.Instagram />
              </div>
              <div>
                <div className="contact-item-label">Instagram</div>
                <div className="contact-item-value">@supacodigital</div>
              </div>
            </a>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="contact-calendly"
          >
            <div className="contact-cal-icon">
              <Icon.Cal />
            </div>
            <div className="contact-cal-text">
              <div className="contact-cal-title">Réserver un appel gratuit</div>
              <div className="contact-cal-sub">
                30 min · Sans engagement · Disponible cette semaine
              </div>
            </div>
            <Icon.Arrow />
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
