import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, query, where, deleteDoc, updateDoc, onSnapshot   } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as st from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBdL1CMCXFu7RT_7gl6c8kl3ij_LM9t3B8",
    authDomain: "lifestyle-a879b.firebaseapp.com",
    projectId: "lifestyle-a879b",
    storageBucket: "lifestyle-a879b.appspot.com",
    messagingSenderId: "208686773983",
    appId: "1:208686773983:web:cd30cd39f567f6b0c05b6a"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const createData = async (tableName,docId,data) => {
    try {
        await setDoc(doc(db, tableName, docId), data);
        return true;
    } catch (e) {
        alert(e)
        return false;
    }
}
export const loginApi = async (phoneNumber,password,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "clients"), where("phoneNumber", "==", phoneNumber), where("password", "==", password)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getRequestData = async (mainCategory,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "clients"), where("mainCategory", "==", mainCategory)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getUserDetails = async (accountId,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "clients"), where("id", "==", accountId)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const updateData = async (tableName,docId,obj) => {
    try {
        const docRef = doc(db, tableName, docId);
        await updateDoc(docRef, {[obj.field]:obj.value});
        return true;
    } catch (e) {
        return false;
    }
}
export const uploadFile = async (file,path,cb) =>{
    const storage = st.getStorage(app);
    const fileRef = st.ref(storage, path);
    const response = await fetch(file);
    const blob = await response.blob();
    const uploadTask = await st.uploadBytesResumable(fileRef, blob);
    const url = await st.getDownloadURL(uploadTask.ref);
    cb(url)
}