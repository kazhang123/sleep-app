import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text } from 'react-native';
import { useCallback } from 'react/cjs/react.production.min';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryZoomContainer, VictoryAxis } from "victory-native";
import {Database} from '../Database'
import * as SplashScreen from 'expo-splash-screen';
import { useIsFocused } from '@react-navigation/core';

function TrackerScreen(props) {
  const [data, setData] = useState([]);
  const [dataSet, setDataset] = useState([]);
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
      console.log("data length:" + data.length);
      let ticks = [];
      let dataPoints = [];
      for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].date.replace(" ", "T"));
        let dataPoint = {
          x: date,
          y: data[i].time,
        }

        ticks.push(date);
        dataPoints.push(dataPoint);
      }
      setTicks(ticks);

      setDataset(dataPoints);
    }
  }, [isDBLoadingComplete]);

  useEffect(() => {
    if (dataSet.length > 0) {
      let lastDate = dataSet[dataSet.length - 1].x;
      if (dataSet.length >= 7) {
        setDomain({
          x: [dataSet[dataSet.length - 8].x, lastDate]
        });
      } else {
        setDomain({
          x: [new Date(lastDate - 7 * 24 * 60 * 60 * 1000), lastDate]
        });
      }
    }
  }, [dataSet])

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
        <Text>Average time in bed:</Text>
        <Button title="hello" onPress={() => props.navigation.navigate("WelcomeScreen")}/>
          <VictoryChart 
            // scale="time"
            width={400} 
            // style={axisTime}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryZoomContainer 
                zoomDomain= {domain}
                // onZoomDomainChange={ }
              />
            }
            >

              <VictoryAxis
                tickValues={ticks}
                tickFormat={(x) => {
                  if (isDBLoadingComplete) {
                    // console.log("line 107");
                    return `${x.getMonth() + 1}-${x.getDate()}`;
                    // return '';
                  } 
                  return '';
                }}
                // tickFormat={x => ''} // remove existing labels
                scale="time"
                // standalone={false}
              />

            <VictoryAxis dependentAxis
              standalone={false}
            />

            <VictoryBar 
              // x="day" 
              // y="time"
              alignment="start"
              // barRatio={0.9}
              barWidth={20}
              cornerRadius={{ top: 12, bottom: 12 }}
              data={dataSet}
              domainPadding={{x: [25, 25]}}
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