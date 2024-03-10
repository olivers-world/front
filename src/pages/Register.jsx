import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const PRENOM_REGEX = /^[A-Za-zéèêëîïôöûüçÉÈÊËÎÏÔÖÛÜÇ-]{2,24}$/;
const NOM_REGEX = /^[A-Za-zéèêëîïôöûüçÉÈÊËÎÏÔÖÛÜÇ-]{2,24}$/;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";

const Register = () => {
  const prenomRef = useRef();
  const nomRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  // Prenom
  const [prenom, setPrenom] = useState("");
  const [validPrenom, setValidPrenom] = useState(false);
  const [prenomFocus, setPrenomFocus] = useState(false);

  // Nom
  const [nom, setNom] = useState("");
  const [validNom, setValidNom] = useState(false);
  const [nomFocus, setNomFocus] = useState(false);

  // Email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // Mot de passe
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // Re-entrer mot de passe
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // Message d'erreur/success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    prenomRef.current.focus();
  }, []);
  
  // Associé regex prenom au champ prenom
  useEffect(() => {
    setValidPrenom(PRENOM_REGEX.test(prenom));
  }, [prenom]);
  // Associé regex nom au champ nom
  useEffect(() => {
    setValidNom(NOM_REGEX.test(nom));
  }, [nom]);
  // Associé regex email au champ email
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Entrée incorrecte");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Pas de réponse serveur");
      } else if (err.response?.status === 409) {
        setErrMsg("Email déjà utilisé");
      } else {
        setErrMsg("Échec de l'inscription");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section style={styles.section}>
          <h1>Success!</h1>
          <p>
            <a href="#" style={styles.link}>
              Sign In
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
          <h1>Register</h1>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="prenom" style={{ display: "block" }}>
                Prenom:
              </label>
              <input
                type="text"
                id="prenom"
                ref={prenomRef}
                autoComplete="off"
                onChange={(e) => setPrenom(e.target.value)}
                value={prenom}
                required
                aria-invalid={validPrenom ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPrenomFocus(true)}
                onBlur={() => setPrenomFocus(false)}
                style={styles.input}
              />
              <p
                id="uidnote"
                style={
                  prenomFocus && prenom && !validPrenom
                    ? styles.instructions
                    : styles.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div>
              <label htmlFor="nom" style={{ display: "block" }}>
                Nom:
              </label>
              <input
                type="text"
                id="nom"
                ref={nomRef}
                autoComplete="off"
                onChange={(e) => setNom(e.target.value)}
                value={nom}
                required
                aria-invalid={validNom ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setNomFocus(true)}
                onBlur={() => setNomFocus(false)}
                style={styles.input}
              />
              <p
                id="uidnote"
                style={
                  nomFocus && nom && !validNom
                    ? styles.instructions
                    : styles.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div>
              <label htmlFor="email" style={{ display: "block" }}>
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  style={validEmail ? styles.valid : styles.hide}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  style={validEmail || !email ? styles.hide : styles.invalid}
                />
              </label>
              <input
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                style={styles.input}
              />
              <p
                id="uidnote"
                style={
                  emailFocus && email && !validEmail
                    ? styles.instructions
                    : styles.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div>
              <label htmlFor="password" style={{ display: "block" }}>
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  style={validPwd ? styles.valid : styles.hide}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  style={validPwd || !pwd ? styles.hide : styles.invalid}
                />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                style={styles.input}
              />
              <p
                id="pwdnote"
                style={
                  pwdFocus && !validPwd ? styles.instructions : styles.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <br />
                8 à 24 caractères.
                <br />
                Doit comprendre des lettres majuscules et minuscules,
                <br />
                un chiffre et un caractère spécial.
                <br />
                Caractères spéciaux autorisés : ! @ # $ %
              </p>
            </div>

            <div>
              <label htmlFor="confirm_pwd" style={{ display: "block" }}>
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  style={validMatch && matchPwd ? styles.valid : styles.hide}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  style={validMatch || !matchPwd ? styles.hide : styles.invalid}
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                style={styles.input}
              />
              <p
                id="confirmnote"
                style={
                  matchFocus && !validMatch
                    ? styles.instructions
                    : styles.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>

            <button
              disabled={
                !validPrenom ||
                !validNom ||
                !validEmail ||
                !validPwd ||
                !validMatch
              }
              style={styles.button}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span style={styles.line}>
              {/*put router link here*/}
              <a href="/login" style={styles.link}>
                Sign In
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

export default Register;
