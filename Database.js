import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('db.db')

const getLastSleep = (setFunc) => {
	db.transaction(
			tx => {
				tx.executeSql(
				'SELECT * FROM sleep_duration WHERE id=(SELECT MAX(id) FROM sleep_duration)',
				[],
				(_, _array) => {
						console.log(_array.rows.length)
						console.log(_array.rows.item(0))
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
          'CREATE TABLE IF NOT EXISTS sleep_duration (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, hour INT, minute INT);'
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
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
  getLastSleep,
  insertSleepDuration,
  setupDatabaseAsync,
  setupSleepAsync,
  dropDatabaseTablesAsync,
}