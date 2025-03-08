import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import {db} from "./config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

onAuthStateChanged(auth, async(user)=>{
    if(user){
        console.log("Logged in users:",user.email)
        await fetchUserData(user.uid)
    }else{
        console.log("No user is logged in")
    }
})

async function fetchUserData(usertID) {
    try {
        const userDoc = await getDocs(collection(db,"users"))
        const userData = userDoc.docs.find(doc=> doc.id===usertID)?.data()
        console.log("User data:", userData)
        document.getElementById("greeting").innerHTML= "<h1> Hi, "+userData.firstname+"<h1>"

    } catch (error) {
        console.error("Error getting user data: ", error)
    }
}

export async function signUp(firstName, lastName, email, password) {
    try {
        const userCredentual = await createUserWithEmailAndPassword(auth,email,password)
        console.log("User signed up:",userCredentual.user.email)
        console.log("User Id:",userCredentual.user.uid)
        const userRef = doc(db,"users",userCredentual.user.uid)
        window.location.href = "usermanager.html"
        await setDoc(userRef,{
            firstname: firstName,
            lastname:lastName,
            timestamp: new Date()
        })
    } catch (error) {
        console.error("Error fetching user data:",error)
    }
}

export async function login(email,password) {
    try{
        const userCredential = await signInWithEmailAndPassword(auth,email,password)
        window.location.href = "userViewer.html"

    }
    catch(error){
        console.error("Login error:" + error.message)
    }
}

export async function logout(){
    try {
        await signOut(auth)
        console.log("User Logged Out")
    } catch (error) {
        console.error("Logout error:",error.message)
    }
}