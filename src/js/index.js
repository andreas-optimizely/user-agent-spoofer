let isActive = false;
// Set counter to track number of clicks on the icon (for choosing which user agent to spoof)
let clicks = 0;

const requestFilter = {
  urls: [
    "*://*/*?optimizely_p13n=true&optimizely_editor=true&optimizely_include_innie=true",
    "*://*/?optimizely_p13n=true&optimizely_editor=true&optimizely_include_innie=true"
  ]
};

const userAgents = [
  {
    'apple_iphone_6': {
      name: 'Apple iPhone 6',
      ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25',
      img: 'images/phone-128.on.png'
    }
  },
  {
    'macos_safari': {
      name: 'MacOS Safari',
      ua: 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML, like Gecko) Safari/125',
      img: 'images/safari.png'
    }
  },
  {
    'windows_edge': {
      name: 'Windows Edge',
      ua: 'Mozilla/5.0 (Windows NT 10.0; <64-bit tags>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev> Edge/<EdgeHTML Rev>.<Windows Build>',
      img: 'IE3.jpg'
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
  // increment clicks by 1
  clicks +== 1;
  if(j < headers.length) {

    // Removing statement below in favor of looping through user-agent options
    // headers[j].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25';
    headers[j].value = userAgents[clicks - 1][0]['ua'];

  }
  return {requestHeaders: headers};
}


chrome.webRequest.onBeforeSendHeaders.addListener(callback,requestFilter, ['requestHeaders','blocking']);
chrome.browserAction.onClicked.addListener((tab) => {
  // increments the number of clicks by one each time a user clicks on the logo
  let state = isActive ? 'off' : 'on';
  let details = {
        path: "images/phone-128-" + state + ".png"
    };
  chrome.browserAction.setIcon(details);
  return isActive = !isActive;
});
