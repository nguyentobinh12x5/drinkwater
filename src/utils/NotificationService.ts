import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

/**
 * Request notification permissions
 */
export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
        }
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    return token;
}

/**
 * Schedule a thirsty reminder notification
 */
export async function scheduleThirstyNotification() {
    try {
        // Cancel any existing thirsty notifications
        await cancelThirstyNotification();

        // Schedule new notification
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "🌵 Your Cactus Craves a Sip!",
                body: "Your cactus is getting thirsty! Give it some water and show it a little love 💧💚",
                sound: true,
                // Android-specific properties (iOS ignores these gracefully)
                ...(Platform.OS === 'android' && {
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    vibrate: [0, 250, 250, 250],
                }),
                // iOS-specific properties
                ...(Platform.OS === 'ios' && {
                    badge: 1,
                }),
            },
            trigger: null, // null means show immediately
        });

        console.log('Thirsty notification scheduled:', notificationId);
        return notificationId;
    } catch (error) {
        console.error('Error scheduling thirsty notification:', error);
    }
}

/**
 * Cancel thirsty notification
 */
export async function cancelThirstyNotification() {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
        console.error('Error canceling notifications:', error);
    }
}

/**
 * Schedule a daily reminder notification
 */
export async function scheduleDailyReminder(hour: number = 9, minute: number = 0) {
    try {
        // Cancel existing daily reminders
        const scheduled = await Notifications.getAllScheduledNotificationsAsync();
        for (const notification of scheduled) {
            if (notification.content.data?.type === 'daily_reminder') {
                await Notifications.cancelScheduledNotificationAsync(notification.identifier);
            }
        }

        // Schedule new daily reminder
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "💧 Time to Hydrate!",
                body: "Don't forget to drink water today! Your cactus is waiting 🌵",
                sound: true,
                data: { type: 'daily_reminder' },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
                hour,
                minute,
                repeats: true,
            },
        });

        console.log('Daily reminder scheduled:', notificationId);
        return notificationId;
    } catch (error) {
        console.error('Error scheduling daily reminder:', error);
    }
}

/**
 * Check if water intake is zero and send notification
 */
export async function checkAndNotifyIfThirsty(waterIntake: number) {
    if (waterIntake === 0) {
        await scheduleThirstyNotification();
    }
}

/**
 * Schedule periodic check notification (e.g., every 2 hours if no water)
 */
export async function schedulePeriodicCheckNotification(hours: number = 2) {
    try {
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "🌵 Are you drinking water?",
                body: "Your cactus hasn't seen you drink water yet today. I miss you! 💧",
                sound: true,
                data: { type: 'periodic_check' },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: hours * 60 * 60,
                repeats: true,
            },
        });

        console.log('Periodic check notification scheduled:', notificationId);
        return notificationId;
    } catch (error) {
        console.error('Error scheduling periodic notification:', error);
    }
}

/**
 * Cancel all notifications
 */
export async function cancelAllNotifications() {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        console.log('All notifications canceled');
    } catch (error) {
        console.error('Error canceling all notifications:', error);
    }
}

/**
 * Get badge count
 */
export async function getBadgeCount(): Promise<number> {
    return await Notifications.getBadgeCountAsync();
}

/**
 * Set badge count
 */
export async function setBadgeCount(count: number) {
    await Notifications.setBadgeCountAsync(count);
}

/**
 * Clear badge count
 */
export async function clearBadgeCount() {
    await Notifications.setBadgeCountAsync(0);
}
