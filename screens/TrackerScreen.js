import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text } from 'react-native';
import { useCallback } from 'react/cjs/react.production.min';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryZoomContainer, VictoryAxis } from "victory-native";
import {Database} from '../Database'
import * as SplashScreen from 'expo-splash-screen';
import { useIsFocused } from '@react-navigation/core';
import {calculateSleepTime} from '../utils/sleepUtils'
import { TouchableHighlight } from 'react-native-gesture-handler';

function TrackerScreen(props) {
  const [data, setData] = useState([]);
  const [dataSet, setDataset] = useState([]);
  const [avg, setAvg] = useState(0);
  const [ticks, setTicks] = useState([new Date()]);
  const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);
  const [domain, setDomain] = useState({
    x: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), Date.now()]
  });

  const isFocused = useIsFocused()

  useEffect(() => {
    async function prepare() {
      try {
        await Database.getAllEntries((entries) => {
          setData([...entries]);
        });

        setIsDBLoadingComplete(true);

      } catch (error) {
          console.warn(error);
      } 
    }
    
    prepare();

  }, [isFocused]);

  useEffect(() => {
    if (isDBLoadingComplete) {
      let ticks = [];
      let dataPoints = [];
      for (let i = 0; i < data.length; i++) {
        console.log("iteration: " + i);
        let startTime = new Date(data[i].startTime.replace(" ", "T"));
        let endTime = new Date(data[i].endTime.replace(" ", "T"))

        let year = startTime.getFullYear();
        let month = startTime.getMonth();
        let day = startTime.getUTCDate();

        let newDate = new Date(year, month, day);

        let lastEntryDate = i > 0 ? dataPoints[dataPoints.length - 1].x : null;
        let sleepTime = parseFloat(calculateSleepTime(startTime, endTime));

        if (lastEntryDate !== null && year === lastEntryDate.getFullYear() 
        && month === lastEntryDate.getMonth() && day === lastEntryDate.getUTCDate()) {
          dataPoints[dataPoints.length - 1].y += sleepTime;
          continue;
        }

        let dataPoint = {
          x: newDate,
          y: sleepTime,
          // y0: startTime.getTime(),
        }

        console.log(dataPoint);

        ticks.push(newDate);
        dataPoints.push(dataPoint);
      }
      setTicks(ticks);

      setDataset(dataPoints);
    }
  }, [isDBLoadingComplete]);

  useEffect(() => {
    if (dataSet.length > 0) {
      let lastDate = dataSet[dataSet.length - 1].x;
    //   if (dataSet.length >= 7) {
    //     setDomain({
    //       x: [dataSet[dataSet.length - 7].x, lastDate]
    //     });
    //   } else {
        setDomain({
          x: [new Date(lastDate - 7 * 24 * 60 * 60 * 1000), lastDate]
        });
    //   }
    }
    console.log(domain);
  }, [dataSet])

  useEffect(() => {
    let start = new Date();
    let end = new Date(start - 7 * 24 * 60 * 60 * 1000);
    let length = Math.min(7, dataSet.length);
    let avgSleep = 0;
    let numData = 0;

    for (let i = 0; i < length; i++) {
      if (dataSet[dataSet.length - 1 - i].x < end) {
        break;
      }
      numData++;
      avgSleep += dataSet[i].y;
    }
    avgSleep = numData > 0 ? (avgSleep / numData).toFixed(2) : 0;
    setAvg(avgSleep);
  }, [dataSet]);

  // const getDomain = () => {
  //   if (dataSet == undefined || dataSet.length === 0) {
  //     // return prior week
  //     return {
  //       // one week
  //       x: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), Date.now()]
  //     };
  //   }

  //   // return last 7 data points
  //   if (dataSet.length >= 7) {
  //     return {
  //       x: [dataSet[dataSet.length - 8].x, dataSet[dataSet.length - 1].x]
  //     };
  //   }

  //   let lastDate = dataSet[dataSet.length - 1]
  //   return {
  //     x: [new Date(lastDate - 7 * 24 * 60 * 60 * 1000), lastDate]
  //   };
    
    
  // };

  if (!isDBLoadingComplete) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.homeButton} onPress={() => props.navigation.navigate("WelcomeScreen")}>
        <Button title="Home" />
      </TouchableHighlight>
      <Text style={styles.text}>Your week in sleep</Text>
      <Text style={styles.text}>Average time in bed this week: {avg} hours</Text>
        <VictoryChart 
          width={400} 
          // padding={{ right: 10 }}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryZoomContainer 
              zoomDomain={domain}
            />
          }
          styles={styles.graph}
          style={{ grid: { stroke: "none" } }}
          >

            <VictoryAxis
            // tickLabelComponent={<VictoryLabel x={10} textAnchor="start" />}
              width={500}
              tickCount={7}
              tickValues={ticks}
              tickFormat={(x) => {
                if (isDBLoadingComplete && ticks.length > 0) {
                  return `${x.getMonth() + 1}-${x.getDate()}`;
                } 
                return '';
              }}
              style={{ 
                grid: { stroke: "none" },
                tickLabels: { fill: "white" },
                axis: { stroke: "white" },
              }}
              // scale="time"
              // style={{axis: {stroke: "#000000"}}}
            />

          <VictoryAxis dependentAxis
            standalone={false}
            style={{ 
              grid: { stroke: "none" },
              tickLabels: { fill: "white" },
              axis: { stroke: "white" },
            }}

            // scale="time"
          />

          <VictoryBar 
            alignment="end"
            barRatio={0.6}
            // barWidth={20}
            cornerRadius={10}
            data={dataSet}
            domainPadding={{x: [0, 20]}}
            style={{ data: { fill: "#B5D2FF" } }}
            // y0={(d) => d.y0}
            // labels={( datum ) => {  return `${datum.x.toLocaleString('default', { month: 'short' })}`}} // get labels as month name
            // https://stackoverflow.com/questions/57890002/how-to-control-victory-x-axis-ticks-labels
            // labels={(datum) => {`${datum.x.getMonth() + 1}-${datum.x.getDate()}`}}
            // labelComponent={<VictoryLabel y={250} verticalAnchor={"start"}/>}

            // scale={{x: "time"}}
            // standalone={false}
            // horizontal={true} 
            // labels={({ datum }) => Math.round(datum.time)}
            // style={{ labels: { fill: "white" } }}
            // labelComponent={<VictoryLabel dx={-97} dy={-5}/>}
            // y0={(d) => d.time - 7}
            />
          </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      // flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#09084D",
    },
    text: {
      alignSelf: "flex-start",
      marginLeft: 50,
      fontSize: 16,
      color: "#ffffff",
    },
    homeButton: {
      display: "flex",
      alignSelf: "flex-start",
      marginBottom: 40,
      marginRight: "auto",
    },
    graph: {
      display: "flex",
      alignItems: "center",
    },
  });

export default TrackerScreen;