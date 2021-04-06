import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('db.db')

const getAllEntries = async (setFunc) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
        'SELECT hour, minute, timestamp FROM sleep_duration',
        [],
        (_, _array) => {
            console.log("length:" + _array.rows.length);
            // setFunc(_array.rows.item);
            let entries = [];
            for (let i = 0; i < _array.rows.length; i++) {
              let item = _array.rows.item(i);
              let entry = {
                time: item.hour + item.minute / 60,
                date: item.timestamp
              };
              entries.push(entry);
            }
            console.log("entries: " + entries.length);
            console.log(entries[entries.length - 1]);
            setFunc(entries);
        }
        );
      },
      (t, error) => { console.log("db error load times"); console.log(error); resolve() },
      (_t, _success) => { console.log("loaded times"); resolve(_success);}
      );
    })
}

const getLastSleep = (setFunc) => {
	db.transaction(
			tx => {
				tx.executeSql(
				'SELECT * FROM sleep_duration WHERE id=(SELECT MAX(id) FROM sleep_duration)',
				[],
				(_, _array) => {
						// console.log(_array.rows.length)
						// console.log(_array.rows.item(0))
            setFunc(_array.rows.item(0).hour, _array.rows.item(0).minute)
				}
				);
			},
			(t, error) => { console.log("db error load times"); console.log(error) },
			(_t, _success) => { console.log("loaded times")}
			);
}

const insertSleepDuration = (hours, minutes) => {
  db.transaction( tx => {
      tx.executeSql( 'INSERT INTO sleep_duration (hour, minute) VALUES (?,?)', [hours, minutes] );
    },
    (t, error) => { console.log("db error insertSleepDuration"); console.log(error);},
    (t, success) => { console.log("successfully inserted hours: " + hours + " minutes: " + minutes) }
  )
}



const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE sleep_duration',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping users table"); reject(error)
        }
      )
    })
  })
}

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS sleep_duration (id INT NOT NULL AUTO_INCREMENT, hour INT, minute INT, timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`));'
        );
      },
      (_, error) => { console.log("db error creating tables:"); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

const setupSleepAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'INSERT INTO sleep_duration (hour, minute) values (?,?)', [0, 0] );
      },
      (t, error) => { console.log("db error insertSleepDuration"); console.log(error); resolve() },
      (t, success) => { resolve(success)}
    )
  })
}

export const Database = {
  getAllEntries,
  getLastSleep,
  insertSleepDuration,
  setupDatabaseAsync,
  setupSleepAsync,
  dropDatabaseTablesAsync,
}