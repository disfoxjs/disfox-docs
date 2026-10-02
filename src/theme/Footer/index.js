export default function Footer() {
  return (
    <footer className="dfx-footer">
      <div className="dfx-footer-container">

        <div className="dfx-footer-left">
          <p>© 2026 Disfox. Licensed under the MIT License.</p>

          <div className="dfx-footer-socials">
            <a
              href="https://github.com/DisfoxJS"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 .7C5.7.7.7 5.8.7 12.2c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C16.9 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6a11.6 11.6 0 0 0 7.8-10.9C23.3 5.8 18.3.7 12 .7Z"
                />
              </svg>
            </a>

            <a
              href="https://npmjs.com/package/disfox"
              target="_blank"
              rel="noreferrer"
              aria-label="NPM"
              title="NPM"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M0 7.3h24v8H12v1.4H6.7v-1.4H0v-8Zm1.3 6.7H4v-4h1.3v4h1.4V8.7H1.3V14Zm6.7 0h2.7V10h1.3v4h1.3V10h1.4v4H16V8.7H8V14Zm9.3 0H20v-4h1.3v4h1.4V8.7h-5.4V14Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="dfx-footer-center">
          <span>Powered by</span>

          <a
            href="https://discord.js.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord.js"
          >
            <img
              src="https://icon.icepanel.io/Technology/svg/Discord.js.svg"
              alt="Discord.js"
            />
          </a>
        </div>

        <div className="dfx-footer-right">
          <a href="/docs/disfox/0.1.0/en/Get-Started/Why%20Disfox">
            Why Disfox?
          </a>

          <a href="/docs/disfox/0.1.5/en/Get-Started/Install/">
            Get Started
          </a>

          <a
            href="https://github.com/disfoxjs/disfox/wiki"
            target="_blank"
            rel="noreferrer"
          >
            GH Wiki
          </a>

          <a
            href="https://github.com/disfoxjs/disfox/wiki"
            target="_blank"
            rel="noreferrer"
          >
            Disfox Automation
          </a>
        </div>

      </div>
    </footer>
  );
}