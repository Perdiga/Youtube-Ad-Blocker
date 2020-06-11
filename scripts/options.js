'use strict';

const submitButton = document.getElementById('submit');
const adsenseText = document.getElementById('ads_class');
const adsenseFullext = document.getElementById('ads_full_class');
const adsenseChooserText = document.getElementById('ads_chooser_class');

const DEFAULT_ADSENSE = 'ytp-ad-overlay-close-button';
const DEFAULT_ADSENSE_FULL = 'ytp-ad-skip-button ytp-button';
const DEFAULT_ADSENSE_CHOOSER = '';

function constructOptions() {
  chrome.storage.sync.get("options", function (item) {
    if (item.options) {
      setOptionsToPage(item);
    } else {
      //First time opening the options page
      const options = getOptionsFromPage();

      chrome.storage.sync.set({ options: options }, function () {
        console.log('Options set: ' + JSON.stringify(options));
      })

      setOptionsToPage({ options: options });
    }

  });

  submitButton.addEventListener('click', function () {
    const options = getOptionsFromPage();

    chrome.storage.sync.set({ options: options }, function () {
      console.log('Options set: ' + JSON.stringify(options));
    })
  });
}

function getOptionsFromPage() {
  const options = {
    adsense: adsenseText.value || DEFAULT_ADSENSE,
    adsenseFull: adsenseFullext.value || DEFAULT_ADSENSE_FULL,
    adsenseChooser: adsenseChooserText.value || DEFAULT_ADSENSE_CHOOSER
  }

  return options
}

function setOptionsToPage(item) {
  adsenseText.value = item.options.adsense
  adsenseFullext.value = item.options.adsenseFull
  adsenseChooserText.value = item.options.adsenseChooser
}

constructOptions();
