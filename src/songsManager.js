import { signUp, logout, login, onAuthStateChangged } from "./auth";
import {db} from "./config";
import { doc, setDoc, collection, deleteDoc,onSnapshot } from "firebase/firestore";

const saveSong = async function () {
    const songTitle = document.getElementById("titleInput").value.trim()
    const artist = document.getElementById("artistInput").value.trim()
    const rating = document.getElementById("ratingInput").value.trim()
    const year = document.getElementById("yearInput").value.trim()

    try {
        const songRef = doc(db, "Songs", songTitle)
        
        await setDoc(songRef,{
            title:songTitle,
            artist:artist,
            rating: rating,
            year: year,
            time:new Date()
        })
        console.log("song succesfully created")
        document.getElementById("titleInput").value = ""
        document.getElementById("artistInput").value = ""
        document.getElementById("yearInput").value = ""
        document.getElementById("ratingInput").value = ""
    } catch (error) {
        console.error("Error saving song", error)
    }
}

const deleteSong= async function(collection, docID){
    try {
        await deleteDoc(doc(db,collection,docID))
        console.log(`Document with ID ${docID} deleted succesfully`)
    } catch (error) {
        console.error("Error deleting song", error)
    }
}

const songsCollection = collection(db, "Songs");
onSnapshot(songsCollection, (snapshot) => {
        const tableBody= document.getElementById("table-body")
        tableBody.innerHTML=""
        snapshot.forEach((doc)=>{
            const data = doc.data()
            const row = document.createElement("tr")

            row.innerHTML = `
            <td> ${doc.id} </td>
            <td> ${data.title} </td>
            <td> ${data.artist} </td>
            <td> ${data.year} </td>
            <td> ${data.rating} </td>
            `
            tableBody.appendChild(row)
        })
})


const addSongForm = document.querySelector("#addSong")
addSongForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    saveSong()
})

const deleteSongForm = document.querySelector("#deleteSong")
deleteSongForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    const song = document.getElementById("deleteInput").value
    deleteSong("Songs",song)
})


