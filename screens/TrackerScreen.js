import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button } from 'react-native';
import { useCallback } from 'react/cjs/react.production.min';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryZoomContainer, VictoryAxis } from "victory-native";
import {Database} from '../Database'
import * as SplashScreen from 'expo-splash-screen';
import {getAllEntries} from '../useDatabase'
import { useIsFocused } from '@react-navigation/core';

function TrackerScreen(props) {
  const [data, setData] = useState([]);
  const [dataSet, setDataset] = useState([]);
  const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);
  const isFocused = useIsFocused()
  const dayOfWeekMap = {
    0: "M",
    1: "T",
    2: "W",
    3: "Th",
    4: "F",
    5: "Sa",
    6: "Su"
  };

  // console.log(data);

  // const getAllEntriesCallback = (entries) => {
  //   console.log("entries parameter length: " + entries.length);
  //   setData([...entries]);
  //   console.log("line 14" + data.length);
  // }

  // useEffect(() => {
  //   Database.getAllEntries(getAllEntriesCallback);
  // }, []);

  useEffect(() => {
    async function prepare() {
      try {
        console.log("line 46");
        await Database.getAllEntries((entries) => {
          setData([...entries]);
          // console.log(entries);
        });
      } catch (error) {
        console.warn(error);
        console.log("line 70");
      } finally {
          setIsDBLoadingComplete(true);
          console.log("line 72");
      }
    }
    
    prepare();

  }, [isFocused]);

  useEffect(() => {
    if (isDBLoadingComplete) {
      console.log("data length:" + data.length);
      // setDataset([...entries]);
      let dataPoints = [];
      for (let i = 0; i < data.length; i++) {
        let dataPoint = {
          x: new Date(data[i].date.replace(" ", "T")),
          y: data[i].time,
        }
        console.log(dataPoint);

        dataPoints.push(dataPoint);
      }
      setDataset(dataPoints);
      // console.log(dataPoints);
    }
  }, [isDBLoadingComplete]);

  const getTicks = () => {
    let ticks = [];
    for (let i = 0; i < dataSet.length; i++) {
      ticks.push(dataSet[i].day);
    }
    console.log("line 115");
    return ticks;
  };

  const getDomain = () => {
    if (dataSet == undefined || dataSet.length === 0) {
      // return prior week
      return {
        x: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), Date.now()]
      };
    }

    // return last 7 data points
    if (dataSet.length >= 7) {
      return {
        x: [dataSet[dataSet.length - 8].x, dataSet[dataSet.length - 1].x]
      };
    }

    let lastDate = dataSet[dataSet.length - 1]
    return {
      x: [new Date(lastDate - 7 * 24 * 60 * 60 * 1000), lastDate]
    };
    
    
  };

  if (!isDBLoadingComplete) {
    return null;
  }

    return (
        <View style={styles.container}>
        <Button title="hello" onPress={() => props.navigation.navigate("WelcomeScreen")}/>
        {/* <svg viewBox="0 0 450 350">
        <g> */}
          <VictoryChart 
            // scale="time"
            width={400} 
            // style={axisTime}
            // tickValues={getTicks}
            // tickFormat={
            //   (x) => {
            //     let month = (x.getUTCMonth() + 1).toString();
            //     let day = x.getDate().toString();
            //     return month + "-" + day; 
            //   }
            // }
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryZoomContainer 
                zoomDomain= {getDomain}
                // onZoomDomainChange={ }
              />
            }
            >

              <VictoryAxis
                // tickValues={getTicks}
                // tickFormat={
                //   (x) => {
                //     let month = (x.getUTCMonth() + 1).toString();
                //     let day = x.getDate().toString();
                //     return month + "-" + day; 
                //   } 
                // }
                scale="time"
                standalone={false}
              />

            <VictoryAxis dependentAxis
              standalone={false}
            />

            <VictoryBar 
              // x="day" 
              // y="time"
              alignment="start"
              barRatio={0.9}
              cornerRadius={{ top: 12, bottom: 12 }}
              data={dataSet}
            //   data={ [{x: new Date(2000, 1, 1), y: 12},
            //   {x: new Date(2021, 6, 1), y: 10},
            //   {x: new Date(2021, 12, 1), y: 11},
            //   {x: new Date(2021, 1, 1), y: 5},
            //   {x: new Date(2021, 1, 1), y: 4},
            //   {x: new Date(2021, 1, 1), y: 6},
            //   {x: new Date(2021, 1, 1), y: 5},
            //   {x: new Date(2021, 1, 1), y: 7},
            //   {x: new Date(2021, 1, 1), y: 8},
            //   {x: new Date(2021, 1, 1), y: 9},
            //   {x: new Date(2021, 1, 1), y: 5},
            //   {x: new Date(2021, 1, 1), y: 1},
            //   {x: new Date(2021, 1, 1), y: 2},]
            // }
              domainPadding={{x: [10, 10]}}
              // scale={{x: "time"}}
              // standalone={false}
              // horizontal={true} 
              // labels={({ datum }) => Math.round(datum.time)}
              // style={{ labels: { fill: "white" } }}
              // labelComponent={<VictoryLabel dx={-97} dy={-5}/>}
              // y0={(d) => d.time - 7}
              />

              
              {/* </g>
            </svg> */}
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
    },
  });

  const axisTime = {
    // axis: { stroke: "black", strokeWidth: 1},
    // ticks: {
    //   size: ({ tick }) => {
    //     const tickSize =
    //       tick.getFullYear() % 5 === 0 ? 10 : 5;
    //     return tickSize;
    //   },
    //   stroke: "black",
    //   strokeWidth: 1
    // }
  }

export default TrackerScreen;