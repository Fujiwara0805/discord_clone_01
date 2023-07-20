import React, { useEffect, useState } from 'react'
import { collection, query, onSnapshot, getFirestore, DocumentData, Timestamp, orderBy, CollectionReference, addDoc, } from "firebase/firestore";
import { useAppSelector } from '../app/hooks';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string; 
    displayName: string; 
  }
}

const useSubCollection = (collectionName: string, subCollectionName: string) => {
  const channelId = useAppSelector((state) => (state.channel.channelId));
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);
  const db = getFirestore();
    
  useEffect(() => {
    let collectionRef = collection(db, collectionName, String(channelId), subCollectionName);
    const collectionRefOrderBy = query(collectionRef, orderBy("Timestamp", "desc"));

    onSnapshot(collectionRefOrderBy,(snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().Timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results); 
    });
  }, [channelId]);

  return ({subDocuments});
}

export default useSubCollection

