import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
const LOGIN_URL = "/api/auth/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const { accessToken, roles, prenom, nom } = response?.data;
      // Stocker le token et les roles dans le localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("roles", roles);
      localStorage.setItem("userInfo", JSON.stringify({ prenom, nom, email }));

      setAuth({ prenom, nom, email, roles, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section style={styles.section}>
          <h1>Vous êtes connecté !</h1>
          <br />
          <p>
            <a href="/" style={styles.link}>
              Aller à l'accueil
            </a>
          </p>
        </section>
      ) : (
        <section style={styles.section}>
          <p
            ref={errRef}
            style={errMsg ? styles.errmsg : styles.offscreen}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Connexion</h1>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" style={{ display: "block" }}>
                Email:
              </label>
              <input
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                style={styles.input}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: "block" }}>
                Mot de Passe:
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                style={styles.input}
              />
            </div>

            <button style={styles.button}>Se connecter</button>
          </form>
          <p>
            Pas de compte?
            <br />
            <span style={styles.line}>
              <a href="/register" style={styles.link}>
                S'inscrire
              </a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "1rem 0.5rem",
    color: "#fff", // from html style
    fontFamily: "Nunito, sans-serif", // from html style
  },
  section: {
    width: "100%",
    maxWidth: "420px",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "1rem",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    flexGrow: 1,
    paddingBottom: "1rem",
  },
  input: {
    fontFamily: "Nunito, sans-serif",
    fontSize: "22px",
    padding: "0.25rem",
    borderRadius: "0.5rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
  },
  instructions: {
    fontSize: "0.75rem",
    borderRadius: "0.5rem",
    background: "#000",
    color: "#fff",
    padding: "0.25rem",
    position: "relative",
    bottom: "-10px",
  },
  valid: {
    color: "limegreen",
    marginLeft: "0.25rem",
  },
  invalid: {
    color: "red",
    marginLeft: "0.25rem",
  },
  errmsg: {
    backgroundColor: "lightpink",
    color: "firebrick",
    fontWeight: "bold",
    padding: "0.5rem",
    marginBottom: "0.5rem",
  },
  line: {
    display: "inline-block",
  },
  link: {
    color: "#fff",
  },
};

export default Login;
