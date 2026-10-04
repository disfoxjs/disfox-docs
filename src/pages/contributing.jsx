import { useState, useEffect } from 'react';
import '../css/home.css';
import Footer from '@theme/Footer';

function ContributorEmbed({ avatar, name, role, description, links = [] }) {
  return (
    <div className="contributor-embed">
      <div className="contributor-embed-header">
        <img src={avatar} alt={name} className="contributor-avatar" />
        <div className="contributor-identity">
          <span className="contributor-name">{name}</span>
          {role && <span className="contributor-role">{role}</span>}
        </div>
      </div>

      {description && <p className="contributor-description">{description}</p>}

      {links.length > 0 && (
        <div className="contributor-links">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="contributor-link-btn"
            >
              {link.icon && <i className={link.icon}></i>}
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const contributors = [
  {
    name: 'xFoxyyy0',
    role: 'Founder, Lead developer',
    avatar: 'https://github.com/ipxzfoxy.png',
    description: '',
    links: [
      { label: 'GitHub', url: 'https://github.com/ipxzfoxy', icon: 'fa-brands fa-github' },

    ],
  },
];

export default function Home() {
  const phrases = [
    'Organize your Application.',
    'Build with practicality.',
    'Use automation!',
    'Create with security.',
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && displayedText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIndex]);

  return (
    <div className="home-page">
      <div className="glow-line"></div>

      <a
        href="https://github.com/DisfoxJS"
        target="_blank"
        rel="noreferrer"
        className="github-fixed-left"
        aria-label="GitHub DisfoxJS"
      >
        <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" fill="currentColor">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82A7.494 7.494 0 0 0 8 3c-.73 0-1.44.1-2.12.31-1.53-1.04-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
      </a>

      <main className="container-dark">
        <div className="main-layout">
          <div className="content-left">
            <section className="hero-section">
              <div className="hero-content">
                <img
                  src="/img/dfx-outline.png"
                  alt="Disfox Logo"
                  className="logo-img-dark"
                />

                <h1 className="hero-title">Contributing</h1>

                <p className="hero-subtitle">
                  Help shape Disfox — open an issue, ship a fix, or join the people already
                  building it.
                </p>

                <div className="hero-actions">
                  <a href="/" className="btn-nav-back">
                    <i className="fa-solid fa-arrow-left"></i>
                    Main
                  </a>
                  <a
                    href="https://github.com/DisfoxJS/Disfox/blob/main/CONTRIBUTING.md"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-cta"
                  >
                    Become a Disfox Contributor
                  </a>
                </div>
              </div>
            </section>

            <section className="contributors-section">
              <div className="contributors-header">
                <p className="contributors-eyebrow">People</p>
                <h2 className="contributors-title">Contributors</h2>
              </div>

              <div className="contributors-grid">
                {contributors.map((person) => (
                  <ContributorEmbed key={person.name} {...person} />
                ))}
              </div>
            </section>
          </div>

          <aside className="sidebar-right">
            <a href="/changelog" className="ad-card-dark">
              <img src="/img/v0.1.0.png" alt="v0.1.0" className="ad-image" />
            </a>

            <a href="https://disfox.netlify.app" className="ad-card-dark">
              <img src="/img/legacy-site.png" alt="banner" className="ad-image" />
            </a>

            <a href="https://discord.gg/UuZnAuhhP6" className="ad-card-dark">
              <img src="/img/discord-joinus.png" alt="Discord" className="ad-image" />
            </a>

            <a href="https://github.com/DisfoxJS/Disfox" className="ad-card-dark">
              <img src="/img/githubrepository.png" alt="GitHub" className="ad-image" />
            </a>
          </aside>
        </div>

            <Footer />
      </main>
    </div>
  );
}