import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button } from 'react-native';
import { useCallback } from 'react/cjs/react.production.min';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryZoomContainer } from "victory-native";
import {Database} from '../Database'
import * as SplashScreen from 'expo-splash-screen';
import {getAllEntries} from '../useDatabase'
import { useIsFocused } from '@react-navigation/core';

function TrackerScreen(props) {
  const [data, setData] = useState([]);
  const [dataSet, setDataset] = useState([]);
  const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);
  const isFocused = useIsFocused()

  // console.log(data);

  const getAllEntriesCallback = (entries) => {
    console.log("entries parameter length: " + entries.length);
    setData([...entries]);
    console.log("line 14" + data.length);
  }

  // useEffect(() => {
  //   Database.getAllEntries(getAllEntriesCallback);
  // }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // await SplashScreen.preventAutoHideAsync();
        // await Database.getAllEntries(getAllEntriesCallback);
        // let entries = [];
        // const isDBLoadingComplete = getAllEntries(entries);
        console.log("line 33");
        await Database.getAllEntries((entries) => {
          setData([...entries]);
          // console.log(entries);
        });

        // setIsDBLoadingComplete(true);
        // if (isDBLoadingComplete) {
          // console.log("data length:" + data.length);
          // setDataset([...entries]);
          // let dataPoints = [];
          // for (let i = 1; i <= 7; i++) {
          //   let dataPoint = {
          //     time: data[data.length - i].time,
          //     day: i,
          //   }
          //   dataPoints.push(dataPoint);
          // }
          // setDataset(dataPoints);

          // await SplashScreen.hideAsync();
        // }
      } catch (error) {
        console.warn(error);
      } finally {
          setIsDBLoadingComplete(true);

        // if (isDBLoadingComplete) {
        //   console.log("data length:" + data.length);
        //   // setDataset([...entries]);
        //   let dataPoints = [];
        //   for (let i = 1; i <= 7; i++) {
        //     let dataPoint = {
        //       time: data[data.length - i].time,
        //       day: i,
        //     }
        //     dataPoints.push(dataPoint);
        //   }
        //   setDataset(dataPoints);
        // }
      }
    }
    
    prepare();

  }, [isFocused]);

  useEffect(() => {
    if (isDBLoadingComplete) {
      console.log("data length:" + data.length);
      // setDataset([...entries]);
      let dataPoints = [];
      for (let i = 1; i <= 7; i++) {
        let dataPoint = {
          time: data[data.length - i].time,
          day: i,
        }
        dataPoints.push(dataPoint);
      }
      setDataset(dataPoints);
    }
  }, [isDBLoadingComplete]);

  // const onLayoutRootView = useCallback(async () => {
  //   if (isDBLoadingComplete) {
  //     let dataPoints = [];
  //     for (let i = 1; i <= 7; i++) {
  //       let dataPoint = {
  //         time: data[data.length - i].time,
  //         day: i,
  //       }
  //       dataPoints.push(dataPoint);
  //     }
  //     setDataset(dataPoints);

  //     await SplashScreen.hideAsync();
  //   }
  // }, [isDBLoadingComplete]);

  // if (!isDBLoadingComplete) {
  //   return null;
  // }
  

  // const dataSet = [
  //       { day: 1, time: 7 },
  //       { day: 2, time: 8 },
  //       { day: 3, time: 7 },
  //       { day: 4, time: 8 },
  //       { day: 5, time: 9 },
  //       { day: 6, time: 7  },
  //       { day: 7, time: 10 }


  //     ];


    return (
        <View style={styles.container}>
        <Button title="hello" onPress={() => props.navigation.navigate("WelcomeScreen")}/>
        <VictoryChart 
          width={350} 
          theme={VictoryTheme.material}
          // containerComponent={
          //   <VictoryZoomContainer 
          //     onZoomDomainChange={ }
          //   />
          // }
          >
          <VictoryBar 
            x="day" 
            y="time"
            alignment="start"
            barRatio={0.8}
            cornerRadius={{ top: 12, bottom: 12 }}
            data={dataSet}
            domainPadding={{x: [30, 30]}}
            // horizontal={true} 
            labels={({ datum }) => Math.round(datum.time)}
            style={{ labels: { fill: "white" } }}
            labelComponent={<VictoryLabel dx={-97} dy={-5}/>}
            // y0={(d) => d.time - 7}
            />
        </VictoryChart>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });

export default TrackerScreen;