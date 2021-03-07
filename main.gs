function main() {
  // get from > https://home.openweathermap.org/api_keys
  // current weather api
  var URL =
    "http://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&lang=ja&units=metric";
  var res = UrlFetchApp.fetch(URL);
  var data = JSON.parse(res.getContentText());

  // every 3 hours for the last 5 days weather api
  var futureURL =
    "http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={key}&lang=ja&units=metric";
  var futureResponse = UrlFetchApp.fetch(futureURL);
  var futureData = JSON.parse(futureResponse.getContentText());

  // send message text
  var strBody = "";

  if (data.cod == 200 && futureData.cod == 200) {
    var city = data.name;

    // current data
    var summary = data.weather[0].description;
    var temp = Math.floor(data.main.temp);
    var date = new Date(data.dt * 1000);

    // tomorrow data
    const tomorrowHour = 9;
    var tomorrowData = futureData.list.find(
      (s) => new Date(s.dt * 1000).getHours() == tomorrowHour
    );
    var tomorrowSummary = tomorrowData.weather[0].description;
    var tomorrowTemp = Math.floor(tomorrowData.main.temp);
    var tomorrowDate = new Date(tomorrowData.dt * 1000);
    var ary = ["日", "月", "火", "水", "木", "金", "土"];
    var week_num = tomorrowDate.getDay();
    var week = "(" + ary[week_num] + ")";
    var time = Utilities.formatDate(tomorrowDate, "Asia/Tokyo", "M/d");
    var tomorrowDateText = time + week;

    var todayWeather =
      "*【今日 " +
      date.getHours() +
      "時発表の天気予報" +
      getEmoji(data) +
      "】*\n> " +
      city +
      "：" +
      summary +
      " " +
      temp +
      "℃";
    var tomorrowWeather =
      "*【明日 " +
      tomorrowDateText +
      " 午前" +
      String(tomorrowHour) +
      "時の天気" +
      getEmoji(tomorrowData) +
      "】*\n> " +
      city +
      "：" +
      tomorrowSummary +
      " " +
      tomorrowTemp +
      "℃";

    strBody = todayWeather + "\n" + tomorrowWeather;
  } else {
    strBody = "データを取得できません。ご確認ください。";
  }

  post(strBody);
}
