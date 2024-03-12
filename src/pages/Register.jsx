import { useRef, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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

const REGISTER_URL = "/api/auth/register";

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
    const v3 = PRENOM_REGEX.test(prenom);
    const v4 = NOM_REGEX.test(nom);

    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Entrée incorrecte");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ prenom, nom, email, pwd }),
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
      setPrenom("");
      setNom("");
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
      <NavBar position="block" linkscolor="black"></NavBar>
      {success ? (
        <section className="min-h-screen flex flex-1 flex-col px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1>Success!</h1>
            <p>
              <a href="/login" className="">
                Se connecter
              </a>
            </p>
          </div>
        </section>
      ) : (
        <section className="min-h-screen flex flex-1 flex-col  px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <p
              ref={errRef}
              // style={errMsg ? styles.errmsg : styles.offscreen}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="text-center font-bold text-2xl">Inscription</h1>
            <form
              className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="prenom"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
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
                  aria-describedby="prenomnote"
                  onFocus={() => setPrenomFocus(true)}
                  onBlur={() => setPrenomFocus(false)}
                  className="mb-4 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
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
                  aria-describedby="nomnote"
                  onFocus={() => setNomFocus(true)}
                  onBlur={() => setNomFocus(false)}
                  className="mb-4 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
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
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="mb-4 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mot de Passe:
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
                  className="mb-4 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm_pwd"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirmer Mot de Passe:
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
                  className="mb-4 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-600 sm:text-sm sm:leading-6"
                />
              </div>

              <p className="gap-1 text-xs flex mt-4 text-primary-600 w-full justify-center">
                Déjà inscrit ?
                <br />
                <span className="">
                  {/*put router link here*/}
                  <a href="/login" className="">
                    Se connecter
                  </a>
                </span>
              </p>

              <button
                disabled={
                  !validPrenom ||
                  !validNom ||
                  !validEmail ||
                  !validPwd ||
                  !validMatch
                }
                className="cursor-pointer mt-4 flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                S'inscrire
              </button>
            </form>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Register;
