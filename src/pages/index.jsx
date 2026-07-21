import { useState, useEffect } from 'react';
import '../css/home.css';

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

                <h1 className="hero-title">
                  Build applications with real organization and total flexibility.
                </h1>

                <div className="typewriter-dark">
                  <span className="tw-prefix">|</span>
                  <span className="tw-text">
                    {displayedText}
                    <span className="tw-cursor"></span>
                  </span>
                </div>

                <nav className="action-buttons">
                  <a
                    href="/docs/disfox/0.1.0/en/Get-Started/install"
                    className="btn btn-primary"
                  >
                    Documentation
                  </a>

                  <a href="#why-disfox" className="btn btn-secondary">
                    Why Disfox?
                  </a>

                  <a href="/changelog" className="btn btn-secondary">
                    Updates
                  </a>

                  <a href="https://disfox.netlify.app/contribuitors" className="btn btn-secondary">
                    Contribuitors
                  </a>

                  <a
                    href="https://npmjs.com/package/disfox"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                  >
                    NPM Package
                  </a>

                  <a
                    href="https://github.com/DisfoxJS/Disfox"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                  >
                    GitHub
                  </a>
                </nav>
              </div>

              <div className="hero-visual">
                <div className="terminal-dark">
                  <div className="terminal-header">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>

                  <div className="terminal-body">
                    <span className="prompt">❯</span>
                    <span className="command">npm install disfox</span>
                  </div>
                </div>
              </div>

              <div className="description">
                <p> <strong>Disfox</strong> is a TypeScript-powered framework for Discord.js designed to make application development faster, cleaner, and smarter. </p>
                <p> With built-in automation tools, integrated services, and a modern architecture, Disfox eliminates repetitive tasks and helps you focus on creating exceptional Discord applications. </p>
                <p> Less boilerplate. More productivity. Unlimited possibilities. </p>
              </div>
            </section>

            <section id="why-disfox" className="why-disfox-container">
              <div className="why-disfox-header">
                <h2>Why Disfox?</h2>
                <p>
                  Disfox is a framework built to enhance the <strong>Discord.js</strong> experience by providing automation, structure, and practical tools for Discord application development.
                </p>
              </div>

              <div className="why-disfox-grid">
                <div className="why-card">
                  <span className="why-card-number">01</span>
                  <h3>Better Organization</h3>
                  <p>As Discord applications grow, keeping commands, events, services, and business logic organized becomes increasingly important.</p>
                  <p>Disfox encourages a structured architecture where each part of the application has a clear responsibility, helping projects stay maintainable and scalable.</p>
                </div>

                <div className="why-card">
                  <span className="why-card-number">02</span>
                  <h3>Less Boilerplate</h3>
                  <p>Reduces setup overhead through tools like <strong>SlashService</strong> and <strong>EventService</strong>, which handle repetitive tasks automatically.</p>
                  <ul className="why-feature-list">
                    <li>Automatic command discovery from directories</li>
                    <li>Conversion into Discord.js-compatible data</li>
                    <li>Structure validation before registration</li>
                    <li>Flexible extraction and registration options</li>
                  </ul>
                </div>

                <div className="why-card">
                  <span className="why-card-number">03</span>
                  <h3>BehaviorTables</h3>
                  <p>Simplifies permissions, restrictions, and execution rules in a centralized and declarative way without cluttering your command files.</p>
                </div>

                <div className="why-card">
                  <span className="why-card-number">04</span>
                  <h3>JS & TS Support</h3>
                  <p>Offers full support for both JavaScript and TypeScript, providing strong typing, autocompletion, and improved tooling out of the box.</p>
                </div>

                <div className="why-card">
                  <span className="why-card-number">05</span>
                  <h3>Designed for Real Projects</h3>
                  <p>Built explicitly to solve common file management, command registration, and permission challenges in medium and large applications.</p>
                </div>

                <div className="why-card">
                  <span className="why-card-number">06</span>
                  <h3>Performance Matters</h3>
                  <p>Minimizes unnecessary overhead while offering higher-level abstractions, ensuring your application runs fast and efficiently.</p>
                </div>

                <div className="why-card why-card-full">
                  <span className="why-card-number">07</span>
                  <h3>Open Source Community</h3>
                  <p>Completely open source and driven by community feedback. The source code is publicly available on GitHub, with active discussions on Discord.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="sidebar-right">
            <a href="/changelog" className="ad-card-dark">
              <img
                src="/img/v0.1.0.png"
                alt="v0.1.0"
                className="ad-image"
              />
            </a>

            <a href="https://disfox.netlify.app" className="ad-card-dark">
              <img
                src="/img/legacy-site.png"
                alt="banner"
                className="ad-image"
              />
            </a>

            <a
              href="https://discord.gg/UuZnAuhhP6"
              className="ad-card-dark"
            >
              <img
                src="/img/discord-joinus.png"
                alt="Discord"
                className="ad-image"
              />
            </a>

            <a
              href="https://github.com/DisfoxJS/Disfox"
              className="ad-card-dark"
            >
              <img
                src="/img/githubrepository.png"
                alt="GitHub"
                className="ad-image"
              />
            </a>
          </aside>
        </div>

        <section className="built-with">
          <div className="tech-logos">
            <p className="built-title">Powered by</p>
            
            <a
              href="https://discord.js.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://icon.icepanel.io/Technology/svg/Discord.js.svg"
                alt="Discord.js"
                title="Discord.js"
              />
            </a>
          </div>
        </section>

        <footer className="footer-dark">
          <div className="footer-left">
            <a href="https://discord.gg/UuZnAuhhP6" target="_blank" rel="noreferrer" aria-label="Discord">
              <i className="fa-brands fa-discord"></i>
            </a>
            <a href="https://github.com/DisfoxJS" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://npmjs.com/package/disfox" target="_blank" rel="noreferrer" aria-label="NPM">
              <i className="fa-brands fa-npm"></i>
            </a>
          </div>

          <div className="footer-center">
            <p>© 2026 Disfox. Licensed under the MIT License.</p>
          </div>

          <div className="footer-right">
            <a href="https://disfox.js.org/docs/disfox/0.1.0/en/Get-Started/Why%20Disfox" target="_blank" rel="noreferrer">
              Why Disfox <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <a href="https://disfox.js.org/docs/disfox/0.1.0/en/Get-Started/install/" target="_blank" rel="noreferrer">
              Get Started <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}