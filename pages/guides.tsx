import { useContext, useEffect } from "react";
import { useAuth } from "../stores/authContext";
import styles from "../styles/Guides.module.css";

export default function Guides() {
  const { user, authReady } = useAuth();

  useEffect(() => {
    if (authReady) {
      fetch(
        `/.netlify/functions/guides`,
        user && {
          headers: { Authorization: "Bearer " + user?.token?.access_token },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log("data", data));
    }
  }, [user]);

  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
    </div>
  );
}
