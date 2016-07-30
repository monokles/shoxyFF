var data = require("sdk/self").data;
var Request = require("sdk/request").Request;
var clipboard = require("sdk/clipboard");
var notifications = require("sdk/notifications");
var prefs = require("sdk/simple-prefs").prefs;

var addClip = function(url) {
    clipboard.set(url, "text");
    notifications.notify({ title: "ShoxyFF",
        text: url + " copied to clipboard!",
    });
}

var shoxify = function(url) {
    var body = {"url": url, "length": prefs.codeLength};
    if(prefs.bypassKey.length > 0) {
        body["bypassKey"] = prefs.bypassKey;
    }
    body = JSON.stringify(body);

    Request({
          url: prefs.server,
          content: body,
          contentType: "application/json",
          onComplete: function (response) {
              addClip(response.json["url"])
          }
    }).post();
};

var cm = require("sdk/context-menu");
cm.Item({
      label: "Shoxify",
        context: cm.SelectorContext("a[href], img, video, audio"),
        contentScriptFile: data.url("context-cs.js"),
        onMessage: function(url) { shoxify(url); }
});
