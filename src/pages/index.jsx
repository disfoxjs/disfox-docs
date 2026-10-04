import { useState, useEffect } from 'react';

import '../css/home.css';

import Footer from '@theme/Footer';

import DocumentationSearch from '../components/DocumentationSearch';

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

  // Versão atual do Disfox no NPM
  const [npmVersion, setNpmVersion] = useState('');

  useEffect(() => {
    let timer;

    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && displayedText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);

      setCurrentPhraseIndex(
        (prev) => (prev + 1) % phrases.length
      );
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

  /*
   * Busca automaticamente a versão mais recente
   * publicada do Disfox no NPM.
   *
   * Ex:
   * 0.1.5 -> v0.1.5
   * 0.2.0 -> v0.2.0
   */
  useEffect(() => {
    const controller = new AbortController();

    async function getLatestDisfoxVersion() {
      try {
        const response = await fetch(
          'https://registry.npmjs.org/disfox/latest',
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Disfox version: ${response.status}`
          );
        }

        const data = await response.json();

        setNpmVersion(data.version ?? '');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(
            'Could not get the latest Disfox version from NPM:',
            error
          );
        }
      }
    }

    getLatestDisfoxVersion();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="glow-line"></div>

        <a
          href="https://github.com/DisfoxJS"
          target="_blank"
          rel="noreferrer"
          className="github-fixed-left"
          aria-label="GitHub DisfoxJS"
        >
          <svg
            height="32"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            fill="currentColor"
          >
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
                    Build applications with real organization and total
                    flexibility.
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
                      href="/docs/disfox/0.1.5/en/Get-Started/Install"
                      className="btn btn-primary"
                    >
                      Documentation
                    </a>

                    <a
                      href="/changelog"
                      className="btn btn-secondary"
                    >
                      Changelog
                    </a>

                    <a
                      href="/contributing"
                      className="btn btn-secondary"
                    >
                      Contributing
                    </a>

                    <a
                      href="https://npmjs.com/package/disfox"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary"
                    >
                      NPM Package
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

                      <span className="command">
                        npm install disfox
                      </span>
                    </div>
                  </div>
                </div>

                <div className="description">
                  <p>
                    <strong>Disfox</strong> is a TypeScript-powered
                    framework for Discord.js designed to make application
                    development faster, cleaner, and smarter.
                  </p>

                  <p>
                    With built-in automation tools, integrated services,
                    and a modern architecture, Disfox eliminates repetitive
                    tasks and helps you focus on creating exceptional
                    Discord applications.
                  </p>

                  <p>
                    Less boilerplate. More productivity. Unlimited
                    possibilities.
                  </p>
                </div>

                <DocumentationSearch homepage>
                  {(inputProps) => (
                    <label
                      className="documentation-search"
                      htmlFor="documentation-search-input"
                    >
                      <svg
                        className="documentation-search-border"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id="documentationSearchBorderGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="35%" stopColor="#6366f1" />
                            <stop offset="68%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>

                          <filter
                            id="documentationSearchBorderGlow"
                            x="-30%"
                            y="-80%"
                            width="160%"
                            height="260%"
                          >
                            <feGaussianBlur
                              stdDeviation="3"
                              result="blur"
                            />

                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        <rect
                          pathLength="100"
                          rx="13"
                          fill="none"
                          stroke="url(#documentationSearchBorderGradient)"
                          filter="url(#documentationSearchBorderGlow)"
                        />
                      </svg>

                      <svg
                        className="documentation-search-icon"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id="documentationSearchIconGradient"
                            x1="2"
                            y1="2"
                            x2="22"
                            y2="22"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#38bdf8" />
                            <stop offset="0.52" stopColor="#8b5cf6" />
                            <stop offset="1" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>

                        <path
                          d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="visually-hidden">
                        Find Documentation
                      </span>

                      <input
                        {...inputProps}
                        id="documentation-search-input"
                        className="documentation-search-input"
                        type="search"
                        placeholder="Find Documentation"
                        autoComplete="off"
                      />
                    </label>
                  )}
                </DocumentationSearch>
              </section>

              <section
                id="why-disfox"
                className="why-disfox-container"
              >
                <div className="why-disfox-header">
                  <h2>Why Disfox?</h2>

                  <p>
                    Disfox is a framework built to enhance the{' '}
                    <strong>Discord.js</strong> experience by providing
                    automation, structure, and practical tools for Discord
                    application development.
                  </p>
                </div>

                <div className="why-disfox-grid">
                  <div className="why-card">
                    <span className="why-card-number">01</span>

                    <h3>Better Organization</h3>

                    <p>
                      As Discord applications grow, keeping commands,
                      events, services, and business logic organized becomes
                      increasingly important.
                    </p>

                    <p>
                      Disfox encourages a structured architecture where each
                      part of the application has a clear responsibility,
                      helping projects stay maintainable and scalable.
                    </p>
                  </div>

                  <div className="why-card">
                    <span className="why-card-number">02</span>

                    <h3>Less Boilerplate</h3>

                    <p>
                      Reduces setup overhead through tools like{' '}
                      <strong>SlashService</strong> and{' '}
                      <strong>EventService</strong>, which handle repetitive
                      tasks automatically.
                    </p>

                    <ul className="why-feature-list">
                      <li>
                        Automatic command discovery from directories
                      </li>

                      <li>
                        Conversion into Discord.js-compatible data
                      </li>

                      <li>
                        Structure validation before registration
                      </li>

                      <li>
                        Flexible extraction and registration options
                      </li>
                    </ul>
                  </div>

                  <div className="why-card">
                    <span className="why-card-number">03</span>

                    <h3>BehaviorTables</h3>

                    <p>
                      Simplifies permissions, restrictions, and execution
                      rules in a centralized and declarative way without
                      cluttering your command files.
                    </p>
                  </div>

                  <div className="why-card">
                    <span className="why-card-number">04</span>

                    <h3>JS & TS Support</h3>

                    <p>
                      Offers full support for both JavaScript and TypeScript,
                      providing strong typing, autocompletion, and improved
                      tooling out of the box.
                    </p>
                  </div>

                  <div className="why-card">
                    <span className="why-card-number">05</span>

                    <h3>Designed for Real Projects</h3>

                    <p>
                      Built explicitly to solve common file management,
                      command registration, and permission challenges in
                      medium and large applications.
                    </p>
                  </div>

                  <div className="why-card">
                    <span className="why-card-number">06</span>

                    <h3>Performance Matters</h3>

                    <p>
                      Minimizes unnecessary overhead while offering
                      higher-level abstractions, ensuring your application
                      runs fast and efficiently.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="sidebar-right">
              {/* Latest Disfox release */}
              <a
                href="/changelog"
                target="_blank"
                rel="noreferrer"
                className="ad-card-dark release-banner"
                aria-label={
                  npmVersion
                    ? `Disfox v${npmVersion} on NPM`
                    : 'Disfox on NPM'
                }
              >
                <img
                  src="/img/disfox-bnp1.png"
                  alt="Disfox latest release"
                  className="ad-image"
                />

                {npmVersion && (
                  <span className="release-version">
                    v{npmVersion}
                  </span>
                )}
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
                href="https://github.com/disfoxjs/disfox"
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
        </main>
      </div>

      <Footer />
    </>
  );
}