import type { NextPage } from "next";

import { Button } from "../components/Button";
import { Layout } from "../components/layout/Layout";
import { useRuntimeData } from "../hooks/api/runtimeData";
import { useProfiles } from "../hooks/api/profile";
import styles from "./accounts/settings.module.scss";

const Chirp: NextPage = () => {
  const runtimeData = useRuntimeData();
  const profileData = useProfiles();

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
          <form className={styles["settings-form"]}>
            <div className={styles.field}>
              <h2 className={styles["field-heading"]}>
                <label htmlFor="subject">Subject</label>
              </h2>
              <div>
                <input id="subject" size={100}></input>
              </div>
            </div>
            <div className={styles.field}>
              <h2 className={styles["field-heading"]}>
                <label htmlFor="Body">Body</label>
              </h2>
              <div>
                <textarea id="body" rows={10} cols={100}></textarea>
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
