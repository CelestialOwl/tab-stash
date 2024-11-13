function updateCount() {
  browser.tabs.query({}).then((tabs) => {
    let length = tabs.length;

    browser.browserAction.setBadgeText({ text: length.toString() });
    browser.browserAction.setBadgeBackgroundColor({ color: "green" });
  });
}

updateCount();
browser.tabs.onCreated.addListener((tabId) => {
  updateCount();
});

browser.tabs.onRemoved.addListener(() => {
  updateCount();
});
