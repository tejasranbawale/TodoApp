// Notification helper for tasks / reminders with configurable alarm time
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

const ALARM_OFFSETS_MINUTES = {
  AT_TIME: 0,
  '10_MIN_BEFORE': -10,
  '20_MIN_BEFORE': -20,
  '30_MIN_BEFORE': -30,
  '1_DAY_BEFORE': -24 * 60,
};

export async function scheduleNotification(task) {
  const channelId = await notifee.createChannel({
    id: 'AlarmTodoApp',
    name: 'AlarmTodoApp',
    importance: AndroidImportance.HIGH,
    sound: 'default', // ensure sound is enabled for this channel
  });

  // Original task datetime
  const eventDate = new Date(`${task.date}T${task.time}:00`);

  const alarmKey = task.alarmTime || '30_MIN_BEFORE';
  const offsetMinutes =
    ALARM_OFFSETS_MINUTES[alarmKey] ?? ALARM_OFFSETS_MINUTES['30_MIN_BEFORE'];

  // ⏰ Apply the selected offset (negative = before)
  const notifyAt = new Date(eventDate.getTime() + offsetMinutes * 60 * 1000);

  // ❗ Prevent scheduling past notifications
  if (notifyAt <= new Date()) {
    console.log('Skipping past notification');
    return;
  }

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: notifyAt.getTime(),
  };

  await notifee.createTriggerNotification(
    {
      id: task.id, // IMPORTANT for edit / cancel
      title: task.title
        ? `Hey, It's Your ${task.title} Time`
        : 'Task Reminder',

      body: task.note
        ? `Be ready! Your task "${task.note}" is coming up`
        : 'Your reminder is coming up soon',

      android: {
        channelId,
        pressAction: { id: 'default' },
        sound: 'default', // play default notification sound
        vibrationPattern: [300, 500],
        lightUpScreen: true,
      },
    },
    trigger,
  );
}

// on time notification
// import notifee, {
//   AndroidImportance,
//   TimestampTrigger,
//   TriggerType,
// } from '@notifee/react-native';

// export async function scheduleNotification(reminder) {
//   // Create channel (Android)
//   const channelId = await notifee.createChannel({
//     id: 'AlarmTodoApp',
//     name: 'AlarmTodoApp Reminders',
//     importance: AndroidImportance.HIGH,
//   });

//   const triggerDate = new Date(`${reminder.date}T${reminder.time}:00`);

//   const trigger = {
//     type: TriggerType.TIMESTAMP,
//     timestamp: triggerDate.getTime(),
//   };

//   await notifee.createTriggerNotification(
//     {
//       // title: reminder.title,
//       // body: reminder.note || 'Reminder',
//       title: `Hey, It's Your ${reminder.title} Time` || 'AlarmTodoApp Reminder',
//       body:
//         ` Be Ready, Only 30 mins left to ${reminder.note}` ||
//         `Reminding you for ${reminder.note} (30 min left)`,
//       android: {
//         channelId,
//         pressAction: {
//           id: 'default',
//         },
//       },
//     },
//     trigger,
//   );
// }
