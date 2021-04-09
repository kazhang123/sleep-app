import React, {useEffect, useState} from 'react';

import {Database} from './Database'

export default function useDatabase() {
    // const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);
    const isDBLoadingComplete = false;
    useEffect(() => {
      async function loadDataAsync() {
        try {
          // await Database.dropDatabaseTablesAsync()
          await Database.setupDatabaseAsync()
          // await Database.setupSleepAsync()
  
          isDBLoadingComplete = true;
        } catch (e) {
          console.warn(e);
        }
      }
  
      loadDataAsync();
    }, []);
  
    return isDBLoadingComplete;
}

export function getAllEntries(entries) {
  const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await Database.getAllEntries(entries);

        setIsDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}