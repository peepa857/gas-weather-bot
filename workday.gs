function workday(date) {
  // check today is working day
  let dateInt = date.getDay();
  if (dateInt == 0 || dateInt == 6) {
    return false;
  }
  // check today is holiday
  let calendarId = "ja.japanese#holiday@group.v.calendar.google.com";
  let calendar = CalendarApp.getCalendarById(calendarId);
  let todayEvents = calendar.getEventsForDay(date);
  if (todayEvents.length > 0) {
    return false;
  }
  return true;
}
