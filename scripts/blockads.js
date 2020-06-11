const debug = true;
let youtubeExtensionId = null;

if (isYoutubeValidPage()) {
    if (debug) console.log('Blocker Activated')
    youtubeExtensionId = setInterval(blockAllAds, 1000);
}else{
    if (debug) console.log('Disabeling Blocker')
    clearInterval(youtubeExtensionId);
}

function blockAllAds() {
    if (debug) console.log('Finding ads')
    chrome.storage.sync.get("options", function (item) {
        const options = (item && item.options ? item.options : null)

        if (!options) return

        if (options.adsense) blockAds(options);
        if (options.adsenseChooser) chooseSeeAllAdsBeforeVideo(options);
        if (options.adsenseFull) blockFullAds(options);

    });
}

function isYoutubeValidPage() {
    const url = document.URL;
    if (url.includes('watch')) {
        if (debug) console.log('This is a valid youtube page')
        return true;
    }
    else {
        if (debug) console.log('This is not a valid youtube page')
        return false;
    }

}

function blockAds(options) {
    const adButtons = document.getElementsByClassName(options.adsense);
    if (adButtons.length > 0) {
        if (debug) console.log('Closing ads')
        adButtons[0].click();
    }
}

function blockFullAds(options) {
    const adSkipButtons = document.getElementsByClassName(options.adsenseFull);
    if (adSkipButtons.length > 0) {
        if (debug) console.log('Skiping ads')
        adSkipButtons[0].click();
    }
}

function chooseSeeAllAdsBeforeVideo() {

}
