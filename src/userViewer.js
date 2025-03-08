import { logout, signUp, login } from "./auth"

const logOutForm = document.querySelector("#logoutForm")
logOutForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    logout()
})