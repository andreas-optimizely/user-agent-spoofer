let isActive = false;

const requestFilter = {
  urls: [
    "*://*/*/?optimizely_p13n=true&optimizely_editor=true&optimizely_include_innie=true"
  ]
};

const userAgents = [
  {
    'apple_iphone_6': {
      name: 'Apple iPhone 6',
      ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25'
    }
  }
];

function callback(details){
  if(!isActive){
    return;
  }
  let headers = details.requestHeaders;
  let j;
  for(let i = 0, l = headers.length; i < l; ++i) {
    if( headers[i].name == 'User-Agent' ) {
      j = i;
      break;
    }
  }
  if(j < headers.length) {
    headers[j].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25';
  }
  return {requestHeaders: headers};
}

chrome.webRequest.onBeforeSendHeaders.addListener(callback,requestFilter, ['requestHeaders','blocking']);
chrome.browserAction.onClicked.addListener((tab) => {
  let state = isActive ? 'off' : 'on';
  let details = {
        path: "images/phone-128-" + state + ".png"
    };
  chrome.browserAction.setIcon(details);
  isActive = !isActive;
  initListener(isActive);
});