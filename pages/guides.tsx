import { useContext, useEffect, useState } from "react";
import { useAuth } from "../stores/authContext";
import styles from "../styles/Guides.module.css";

export default function Guides() {
  const { user, authReady } = useAuth();
  const [guides, setGuides] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        `/.netlify/functions/guides`,
        user && {
          headers: { Authorization: "Bearer " + user?.token?.access_token },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You Must Loggedin First");
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {guides &&
        guides?.map((data: any) => (
          <div className={styles.card} key={data.title}>
            <h3>{data.title}</h3>
            <h4>{data.author}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              quibusdam accusantium suscipit reiciendis nam nulla debitis
              architecto autem aliquam corrupti eaque totam at hic illum,
              officia non, nobis quo ducimus.
            </p>
          </div>
        ))}
    </div>
  );
}
