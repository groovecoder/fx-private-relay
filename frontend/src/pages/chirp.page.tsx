import type { NextPage } from "next";

import { Button } from "../components/Button";
import { Layout } from "../components/layout/Layout";
import { useRuntimeData } from "../hooks/api/runtimeData";
import styles from "./accounts/settings.module.scss";
import { apiFetch } from "../hooks/api/api";


const Chirp: NextPage = () => {
  const runtimeData = useRuntimeData();
  const chirpOptions = [
    {"value": "Bank account", "level": "🚨 Critical", "description": "Insert a fake bank account recovery email. This will alert if someone is already in your email, trying to get into your bank account."},
    {"value": "Home address", "level": "🟠 Severe", "description": "Insert a fake home address verification email. This will alert if someone is already in your email, trying to get your home address."},
    {"value": "Social media profile", "level": "🟡 Moderate", "description": "Insert a fake social media account recovery email. This will alert if someone is already in your email, trying to get into your social media account."},
  ];
  const changeChirpType = (e: any) => {
    for (const chirpOption of chirpOptions) {
      if (chirpOption.value === e.target.value) {
        const chirpLevelEl = document.getElementById("chirp-level")
        if (chirpLevelEl) {
          chirpLevelEl.innerText = chirpOption.level;
        }
        const chirpDescEl = document.getElementById("chirp-description")
        if (chirpDescEl) {
          chirpDescEl.innerText = chirpOption.description;
        }
      }
    }
  };
  const submitChirp = (e: any) => {
    apiFetch("/chirp", {
      method: "POST",
      body: JSON.stringify({
        user: 4,
        token: "e3hmesbphv67sx4ar6jxqnsbi",
        level: "red",
      }),
    });
  };

  return (
    <>
      <Layout runtimeData={runtimeData.data}>
        <h1 className={styles.heading}>Chirps</h1>
        <p>
          Relay can place a &quot;chirp&quot; email in your mailbox. Attackers
          who get into your mailbox will find the email and click on the link.
          If they do, we will alert you via SMS.
        </p>
        <div className={styles["settings-form-wrapper"]}>
          <form className={styles["settings-form"]} action="http://127.0.0.1:8000/api/v1/chirp/" method="POST" onSubmit={submitChirp}>
            <div className={styles.field}>
              <h2 className={styles["field-heading"]}>
                <label htmlFor="subject">Type</label>
              </h2>
              <div>
                <div>
                    <select onChange={changeChirpType}>
                      <option>Bank account</option>
                      <option>Home address</option>
                      <option>Social media profile</option>
                    </select>
                </div>
                <div>
                    Level: <span id="chirp-level">🚨 Critical</span><br/>
                    Description: <span id="chirp-description">Insert a fake bank account recovery email. This will alert if someone is already in your email, trying to get into your bank account.</span>
                </div>
              </div>
            </div>
            <div className={styles.field}>
              <h2 className={styles["field-heading"]}>
                <label htmlFor="Label">Label</label>
              </h2>
              <div>
                <input id="label" type="text" size={100}></input>
              </div>
            </div>
            <div className={styles.controls}>
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Chirp;
