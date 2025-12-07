import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ChartDataPoint, TimeFilter } from '../types';

interface ConsumptionChartProps {
    data: ChartDataPoint[];
    timeFilter: TimeFilter;
}

export default function ConsumptionChart({ data, timeFilter }: ConsumptionChartProps) {
    const screenWidth = Dimensions.get('window').width - 60;

    // Get title based on time filter
    const getTitle = () => {
        switch (timeFilter) {
            case 'day':
                return 'Last 7 days';
            case 'week':
                return 'Daily average\nLast 4 weeks';
            case 'month':
                return 'Daily average\nLast 12 months';
            default:
                return 'Consumption';
        }
    };

    // Prepare data for the chart
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                data: data.map(d => d.consumption || 0.1), // Avoid zero values
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{getTitle()}</Text>

            {data.length > 0 ? (
                <BarChart
                    data={chartData}
                    width={screenWidth}
                    height={240}
                    yAxisLabel=""
                    yAxisSuffix=""
                    fromZero={true}
                    showValuesOnTopOfBars={true}
                    withInnerLines={false}
                    chartConfig={{
                        backgroundColor: '#FFFFFF',
                        backgroundGradientFrom: '#FFFFFF',
                        backgroundGradientTo: '#FFFFFF',
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(30, 203, 225, ${opacity})`,

                        fillShadowGradient: '#1ecbe1',
                        fillShadowGradientOpacity: 1,
                        labelColor: () => '#999999',
                        barPercentage: 0.7,
                        propsForBackgroundLines: {
                            strokeWidth: 0,
                        },
                        propsForLabels: {
                            fontSize: 11,
                            fontWeight: '400',
                        },
                        propsForVerticalLabels: {
                            fontSize: 11,
                            fill: '#999',
                        },
                        propsForHorizontalLabels: {
                            fontSize: 0, // Hide Y-axis labels
                        },
                    }}
                    style={styles.chart}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No data available</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 22,
    },
    chart: {
        borderRadius: 16,
        marginLeft: -15,
    },
    emptyState: {
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
});
