export function getNextEvent(events) {
  const today = new Date();

  return events.find(e => new Date(e.date) > today);
}
