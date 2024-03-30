import { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';



const InputItemMenuElement = ({item}) => {
  const [inputItem, setInputItem] = useState(item);
  const [isTouched, setIsTouched] = useState(false)

    const sendModificationToServer = () => {
        enqueueSnackbar("La modification a bien été enregistrée", {variant:'success'})
    }

  useEffect(() => {
    // Envoie au serveur lorsque l'utilisateur quitte l'input
    if(inputItem !== item && !isTouched) {
        sendModificationToServer()
    }
  },[inputItem, item, isTouched])

  const handleBlur = () => {
    setIsTouched(false); // Définir isTouched sur false lorsque l'utilisateur quitte l'input
  };

  const handleChange = (e) => {
    setInputItem(e.target.value);
    setIsTouched(true); // Définir isTouched sur true lorsque l'utilisateur modifie la valeur de l'input
  };

  return (
    <>
        <input 
        key={item} 
        type="text" 
        value={inputItem} 
        onChange={handleChange} // Appeler la fonction handleChange lors de l'événement onChange
        onBlur={handleBlur}
    />

    </>

  )
}

export default InputItemMenuElement