// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: `

        youtubeExtension = null
        if (youtubeExtension){
          console.log('Desativando Extensão')
          clearInterval(youtubeExtension);
        }else{
          console.log('Ativando Extensão')
          youtubeExtension = setInterval(blockAds, 1000);
        }

        function blockAds(){
          if (document.URL.split('watch').length > 1){
            console.log('Finding Ads')
            adButtons = document.getElementsByClassName('ytp-ad-overlay-close-button');
            if(adButtons.length > 0){
              console.log('Goodbye ads')
              document.getElementsByClassName('ytp-ad-overlay-close-button')[0].click();
            }

            adSkipButtons = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
            if(adSkipButtons.length > 0){
              console.log('skiping ads')
              document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0].click();
            }
          }else{
            console.log('Skiping page');
          }
        }    


        `});
  });
};


