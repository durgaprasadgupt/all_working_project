const puppeteer = require("puppeteer");
let cTab;
let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})
browserOpenPromise
    .then(function (browser) {
        let alltabsArrpromise = browser.pages();  // yha mujhhe sare tabs ka promise mil gya in form of an array
        return alltabsArrpromise;       // yha hm promise ko return esliye krte hain taaki just eske baad hm uska       'then' likh ske.
    }).then(function (allTabsArr) {
        cTab = allTabsArr[0];    // yha se hm 1st tab ko access kr rhe hain .
        let visitLoginpagePromise = cTab.goto("https://www.hackerrank.com/auth/login");    // yha hm us first tab me hackerrank site ke http request ka promise le rhe hain.
        return visitLoginpagePromise;
    }).then(function () {
        // console.log(visitPage)
        let emailWillTypedpromise = cTab.type("input[name='username']", "hofim87050@whyflkj.com",{ delay: 200 });//using type hm selected username box me      username type kr rhe hain with some delay taaki aisa lge ki koii human type kr rha ho.
        //"input[name='username']"--> ye html tag hai jiski help se hm us username box ko access kr paaye means us box ka unique identity represent krta h 
        return emailWillTypedpromise;
    }).then(function () {
        let passwordWillTypedpromise = cTab.type("input[name='password']", "hofim87050", { delay: 200 });// same as username
        return passwordWillTypedpromise;
    }).then(function () {
    let loginPromise = cTab.click("button[data-analytics='LoginPassword']");
    return loginPromise;
})
.then(function () {
    let waitForIpKit = cTab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled",
        { visible: true });
    return waitForIpKit;
})
.then(function () {
    let goToIPKit = cTab.click(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    return goToIPKit;
})