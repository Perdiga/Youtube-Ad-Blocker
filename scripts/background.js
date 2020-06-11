'use strict';

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    chrome.tabs.get(tabs[0].id, function (tab) {
      const url = window.location.href
      console.log(url);

      chrome.tabs.executeScript(tabs[0].id, { file: "scripts/blockads.js" });
    });

  })
});
