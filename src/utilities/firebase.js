import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBD6vAbQyQEzCG1NHd4Tgvq1V1BynIaX2s",
    authDomain: "scheduler-3d145.firebaseapp.com",
    databaseURL: "https://scheduler-3d145-default-rtdb.firebaseio.com",
    projectId: "scheduler-3d145",
    storageBucket: "scheduler-3d145.appspot.com",
    messagingSenderId: "248287847493",
    appId: "1:248287847493:web:95e81c1219e5bc9d496f2c",
    measurementId: "G-TYSFZTHWRW"
  };
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

  export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };