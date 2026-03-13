import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import dayjs from 'dayjs';

export function initNotifications() {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIF:', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'ekadashi-reminder',
      channelName: 'Ekadashi Reminder',
      importance: 4,
    },
    created => console.log('channel created', created),
  );
}

export function scheduleReminder({ id, title, message, date }) {
  // date = JS Date object
  PushNotification.localNotificationSchedule({
    channelId: 'ekadashi-reminder',
    id: String(id),
    title,
    message,
    date,
    allowWhileIdle: true,
  });
}

export function scheduleDayBeforeEvent(ekEvent) {
  const eventDate = dayjs(ekEvent.date).hour(6).minute(0).second(0);
  const reminderDate = eventDate.subtract(1, 'day').toDate();
  scheduleReminder({
    id: ekEvent.date + '-1',
    title: `Ekadashi tomorrow: ${ekEvent.name}`,
    message: 'Remember to observe fast',
    date: reminderDate,
  });
}
