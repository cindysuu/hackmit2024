import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Gesture, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

type TimeInterval = '1W' | '1M' | '3M' | '1Y';

const StockChart = () => {
  const [selectedInterval, setSelectedInterval] = useState<TimeInterval>('1W');
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const chartWidth = Dimensions.get('window').width - 20;

  const panX = useSharedValue(0);

  useEffect(() => {
    // Fetch stock data based on the selected interval
    const fetchData = async () => {
      // Sample data in the format
      const fullData = [
        { price: 21.22, timestamp: new Date('2023-09-26T00:00:00') },
        { price: 21.59, timestamp: new Date('2023-09-25T00:00:00') },
        { price: 21.49, timestamp: new Date('2023-09-22T00:00:00') },
        { price: 21.53, timestamp: new Date('2023-09-21T00:00:00') },
        { price: 21.40, timestamp: new Date('2023-09-20T00:00:00') },
        { price: 21.40, timestamp: new Date('2023-09-19T00:00:00') },
        { price: 21.43, timestamp: new Date('2023-09-18T00:00:00') },
        { price: 21.07, timestamp: new Date('2023-09-15T00:00:00') },
        { price: 21.24, timestamp: new Date('2023-09-14T00:00:00') },
        { price: 21.57, timestamp: new Date('2023-09-13T00:00:00') },
        // Add more data here for '3M' and '1Y'
      ];

      // Filter and set data based on the selected interval
      let filteredData = [];
      switch (selectedInterval) {
        case '1W':
          filteredData = fullData.slice(0, 7); // Last 7 data points
          break;
        case '1M':
          filteredData = fullData.slice(0, 30); // Last 30 data points
          break;
        case '3M':
          filteredData = fullData.slice(0, 90); // Last 90 data points
          break;
        case '1Y':
          filteredData = fullData; // All data points for '1Y'
          break;
      }

      // Extracting prices and timestamps
      const extractedPrices = filteredData.map(item => item.price);
      const extractedLabels = filteredData.map(item => item.timestamp.toLocaleDateString());

      setData(extractedPrices);
      setLabels(extractedLabels);

      // Set the selected value to the latest data point for the selected interval
      setSelectedValue(extractedPrices[extractedPrices.length - 1]);
    };

    fetchData();
  }, [selectedInterval]);

  // Format the selected value with commas
  const formattedSelectedValue = selectedValue !== null ? new Intl.NumberFormat().format(selectedValue) : null;

  // Pan gesture handler
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      panX.value = event.translationX;

      // Calculate the nearest data point index based on pan gesture
      const index = Math.round((event.x / chartWidth) * (data.length - 1));

      // Clamp the index to be within the bounds of the data array
      const clampedIndex = Math.max(0, Math.min(data.length - 1, index));

      // Update the selected value to the value at the clamped index
      setSelectedValue(data[clampedIndex]);
    });

  return (
    <View style={styles.container}>
      {formattedSelectedValue !== null && (
        <Text style={styles.selectedValue}>${formattedSelectedValue}</Text>
      )}
      <View style={styles.intervalContainer}>
        {['1W', '1M', '3M', '1Y'].map(interval => (
          <TouchableWithoutFeedback
            key={interval}
            onPress={() => setSelectedInterval(interval as TimeInterval)}
          >
            <Text style={[styles.interval, selectedInterval === interval && styles.selectedInterval]}>
              {interval}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <Animated.View style={useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(panX.value) }],
      }))}>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data,
                color: () => `rgba(0, 0, 139, 1)`, // Dark Blue line
              },
            ],
          }}
          width={chartWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#FFFFFF', // Set to solid white
            backgroundGradientFrom: '#FFFFFF', // Set gradient start to white
            backgroundGradientTo: '#FFFFFF', // Set gradient end to white
            decimalPlaces: 0, // Ensure no decimal places are shown
            color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // Dark blue color for the line
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for labels
            style: {
              borderRadius: 16,
            },
            fillShadowGradient: 'transparent', // Transparent to remove the shaded area
            fillShadowGradientOpacity: 0, // Fully transparent shadow
            propsForBackgroundLines: {
              stroke: 'none', // Remove grid lines
            },
            formatYLabel: (yValue) => new Intl.NumberFormat().format(Number(yValue)), // Format y-axis labels
          }}
          style={styles.chart}
          withDots={false} // Remove dots from the line chart
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#FFFFFF', // White background for the entire container
  },
  selectedValue: {
    fontSize: 40, // Larger font size
    marginBottom: 10,
    color: '#00008B', // Dark blue for selected value text
    fontWeight: 'bold', // Bold text
    alignSelf: 'flex-start', // Align the text to the left
    marginLeft: 10, // Add margin to match the chart's margin
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  intervalContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  interval: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  selectedInterval: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default StockChart;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Dimensions, StyleSheet } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { TouchableWithoutFeedback, GestureDetector, Gesture } from 'react-native-gesture-handler';
// import Animated, { useSharedValue } from 'react-native-reanimated';

// type TimeInterval = '1W' | '1M' | '3M' | '1Y';

// const StockChart = () => {
//   const [selectedInterval, setSelectedInterval] = useState<TimeInterval>('1D');
//   const [data, setData] = useState<number[]>([]);
//   const [labels, setLabels] = useState<string[]>([]);
//   const [selectedValue, setSelectedValue] = useState<number | null>(null);
//   const chartWidth = Dimensions.get('window').width - 20;

//   const panX = useSharedValue(0);

//   useEffect(() => {
//     // Fetch stock data based on the selected interval
//     const fetchData = async () => {
//       // Sample data in the format
//       const fullData = [
//         { price: 21.22, timestamp: new Date('2023-09-26T00:00:00') },
//         { price: 21.59, timestamp: new Date('2023-09-25T00:00:00') },
//         { price: 21.49, timestamp: new Date('2023-09-22T00:00:00') },
//         { price: 21.53, timestamp: new Date('2023-09-21T00:00:00') },
//         { price: 21.40, timestamp: new Date('2023-09-20T00:00:00') },
//         { price: 21.40, timestamp: new Date('2023-09-19T00:00:00') },
//         { price: 21.43, timestamp: new Date('2023-09-18T00:00:00') },
//         { price: 21.07, timestamp: new Date('2023-09-15T00:00:00') },
//         { price: 21.24, timestamp: new Date('2023-09-14T00:00:00') },
//         { price: 21.57, timestamp: new Date('2023-09-13T00:00:00') },
//         // Add more data here for '3M' and '1Y'
//       ];

//       // Filter and set data based on the selected interval
//       let filteredData = [];
//       switch (selectedInterval) {
//         case '1W':
//           filteredData = fullData.slice(0, 7); // Last 7 data points
//           break;
//         case '1M':
//           filteredData = fullData.slice(0, 30); // Last 30 data points
//           break;
//         case '3M':
//           filteredData = fullData.slice(0, 90); // Last 90 data points
//           break;
//         case '1Y':
//           filteredData = fullData; // All data points for '1Y'
//           break;
//       }

//       // Extracting prices and timestamps
//       const extractedPrices = filteredData.map(item => item.price);
//       const extractedLabels = filteredData.map(item => item.timestamp.toLocaleDateString());

//       setData(extractedPrices);
//       setLabels(extractedLabels);

//       // Set the selected value to the latest data point for the selected interval
//       setSelectedValue(extractedPrices[extractedPrices.length - 1]);
//     };

//     fetchData();
//   }, [selectedInterval]);

//   // Format the selected value with commas
//   const formattedSelectedValue = selectedValue !== null ? new Intl.NumberFormat().format(selectedValue) : null;

//   // Pan gesture handler
//   const panGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       panX.value = event.translationX;

//       // Calculate the nearest data point index based on pan gesture
//       const index = Math.round((event.x / chartWidth) * (data.length - 1));

//       // Clamp the index to be within the bounds of the data array
//       const clampedIndex = Math.max(0, Math.min(data.length - 1, index));

//       // Update the selected value to the value at the clamped index
//       setSelectedValue(data[clampedIndex]);
//     });

//   return (
//     <View style={styles.container}>
//       {formattedSelectedValue !== null && (
//         <Text style={styles.selectedValue}>${formattedSelectedValue}</Text>
//       )}
//       <View style={styles.intervalContainer}>
//         {['1W', '1M', '3M', '1Y'].map(interval => (
//           <TouchableWithoutFeedback
//             key={interval}
//             onPress={() => setSelectedInterval(interval as TimeInterval)}
//           >
//             <Text style={[styles.interval, selectedInterval === interval && styles.selectedInterval]}>
//               {interval}
//             </Text>
//           </TouchableWithoutFeedback>
//         ))}
//       </View>
//       <GestureDetector gesture={panGesture}>
//         <Animated.View>
//           <LineChart
//             data={{
//               labels,
//               datasets: [
//                 {
//                   data,
//                   color: () => `rgba(0, 0, 139, 1)`, // Dark Blue line
//                 },
//               ],
//             }}
//             width={chartWidth}
//             height={220}
//             chartConfig={{
//               backgroundColor: '#FFFFFF', // Set to solid white
//               backgroundGradientFrom: '#FFFFFF', // Set gradient start to white
//               backgroundGradientTo: '#FFFFFF', // Set gradient end to white
//               decimalPlaces: 0, // Ensure no decimal places are shown
//               color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // Dark blue color for the line
//               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for labels
//               style: {
//                 borderRadius: 16,
//               },
//               fillShadowGradient: 'transparent', // Transparent to remove the shaded area
//               fillShadowGradientOpacity: 0, // Fully transparent shadow
//               propsForBackgroundLines: {
//                 stroke: 'none', // Remove grid lines
//               },
//               formatYLabel: (yValue) => new Intl.NumberFormat().format(Number(yValue)), // Format y-axis labels
//             }}
//             style={styles.chart}
//             withDots={false} // Remove dots from the line chart
//           />
//         </Animated.View>
//       </GestureDetector>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//     backgroundColor: '#FFFFFF', // White background for the entire container
//   },
//   selectedValue: {
//     fontSize: 40, // Larger font size
//     marginBottom: 10,
//     color: '#00008B', // Dark blue for selected value text
//     fontWeight: 'bold', // Bold text
//     alignSelf: 'flex-start', // Align the text to the left
//     marginLeft: 10, // Add margin to match the chart's margin
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
//   intervalContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   interval: {
//     marginHorizontal: 10,
//     fontSize: 16,
//     color: '#000',
//   },
//   selectedInterval: {
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//   },
// });

// export default StockChart;