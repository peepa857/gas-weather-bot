function post(text) {
  // Webhook URL
  var url = "https://hooks.slack.com/services/......";
  var params = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ text: text }),
  };
  UrlFetchApp.fetch(url, params);
}
