import React, { useEffect, useState } from 'react'
import { collection, query, onSnapshot, getFirestore, DocumentData } from "firebase/firestore";

interface Channels {
  id: string;
  channel: DocumentData;
}

const useCollection = (collectionName: string) => {

  const [channels, setChannels] = useState<Channels[]>([]);
  const db = getFirestore();
  const q = query(collection(db, collectionName));
    
  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const channelsResults: Channels[] = [];
      querySnapshot.docs.forEach((doc) => {
        channelsResults.push({
          id: doc.id,
          channel: doc.data(),
        });
      })

      setChannels(channelsResults)
    })
  }, [collectionName]);

  return channels;
}

export default useCollection