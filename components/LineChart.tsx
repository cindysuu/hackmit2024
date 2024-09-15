// LineChartComponent.tsx
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

type DataPoint = {
  price: number;
  timestamp: Date;
};

type StockChartProps = {
  data: DataPoint[];
};

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  // Transform data for the chart
  const chartData = {
    labels: data.map(dataPoint => {
      const date = dataPoint.timestamp;
      // Format to 'MM-DD'
      return `${date.getMonth() + 1}-${date.getDate()}`;
    }),
    datasets: [
      {
        data: data.map(dataPoint => dataPoint.price),
        color: () => '#00008B', // Dark blue color for the line
      },
    ],
  };

  // Get the latest value
  const latestValue = data.length > 0 ? data[0].price : 0;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.latestValueText}>Latest Value: ${latestValue.toFixed(2)}</Text> */}
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 32} // Adjust for padding
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1} // Optional, defaults to 1
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, // Optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // Dark blue line color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0', // Remove dots by setting radius to 0
          },
          propsForBackgroundLines: {
            strokeDasharray: '', // Set dash array to empty to remove grid lines
            strokeWidth: 0, // Set stroke width to 0
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the chart vertically
    alignItems: 'center', // Center the chart horizontally
    backgroundColor: '#ffffff', // Set background color for the container
  },
  latestValueText: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StockChart;
