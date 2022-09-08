import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../stores/authContext";

const Div = styled.div`
  max-width: 960px;
  margin: 40px auto;
  letter-spacing: 1px;
  line-height: 1.6em;
`;
const DivError = styled.div`
  background-color: pink;
  text-align: center;
  padding: 10px;
  color: black;
  border-radius: 6px;
  border: 2px solid red;
`;
const DivCard = styled.div`
  background: white;
  border-radius: 6px;
  padding: 10px 20px;
  margin: 10px 20px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
`;

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
    <Div>
      {!authReady && <div>Loading...</div>}
      {error && <DivError>{error}</DivError>}
      {guides &&
        guides?.map((data: any) => (
          <DivCard key={data.title}>
            <h3>{data.title}</h3>
            <h4>{data.author}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              quibusdam accusantium suscipit reiciendis nam nulla debitis
              architecto autem aliquam corrupti eaque totam at hic illum,
              officia non, nobis quo ducimus.
            </p>
          </DivCard>
        ))}
    </Div>
  );
}
