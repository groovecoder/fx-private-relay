import type { NextPage } from "next";

import { Layout } from "../components/layout/Layout";
import { useRuntimeData } from "../hooks/api/runtimeData";
import { useProfiles } from "../hooks/api/profile";
import styles from "./accounts/settings.module.scss";

const Canary: NextPage = () => {
  const runtimeData = useRuntimeData();
  const profileData = useProfiles();

  return (
    <>
      <Layout runtimeData={runtimeData.data}>
        <h1 className={styles.heading}>Canary tokens</h1>
        <p>
          Relay can place an email in your mailbox. Attackers who get into your
          mailbox will find the email and click on the link. If they do, we will
          alert you via SMS.
        </p>
        <div className={styles["settings-form-wrapper"]}>
          <form className={styles["settings-form"]}></form>
        </div>
      </Layout>
    </>
  );
};

export default Canary;
