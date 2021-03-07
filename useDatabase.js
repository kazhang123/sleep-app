import React, {useEffect} from 'react';

import {Database} from './Database'

export default function useDatabase() {
    const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);
  
    useEffect(() => {
      async function loadDataAsync() {
        try {
        //   await Database.dropDatabaseTablesAsync()
          await Database.setupDatabaseAsync()
        //   await Database.setupSleepAsync()
  
          setDBLoadingComplete(true);
        } catch (e) {
          console.warn(e);
        }
      }
  
      loadDataAsync();
    }, []);
  
    return isDBLoadingComplete;
}