import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

export default function NotFound() {
  return (
    
      <main className={styles.page}>
        

        <div className={styles.container}>
          <div className={styles.illustration}>


            <img
              src="/img/fox.png"
              alt="Disfox Fox"
              className={styles.fox}
            />
          </div>

          <div className={styles.errorCode}>404</div>

          <h1 className={styles.title}>
            Looks like this page got{" "}
            <span>lost somewhere.</span>
          </h1>

          <p className={styles.description}>
            We couldn't find the page you're looking for.
            It may have been moved, renamed, or removed.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryButton} to="/">
              ← Back home
            </Link>

            <Link className={styles.secondaryButton} to="/docs/disfox/0.1.5/en/Get-Started/Install">
              Explore docs →
            </Link>
          </div>

          <div className={styles.tip}>
            <span className={styles.tipDot} />

            <span>
              Check the URL or return to the documentation.
            </span>
          </div>
        </div>
      </main>
  );
}
