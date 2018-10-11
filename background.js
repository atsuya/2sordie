var dead = false;

function resourceBeingRequested(details) {
  return { cancel: dead };
}

function pageBeingRequested() {
  dead = false;
  setTimeout(function () {
    dead = true;
  }, 2000);

  return { cancel: false }
}

browser.webRequest.onBeforeRequest.addListener(
  resourceBeingRequested,
  {
    urls: ['<all_urls>'],
    types: [
      'beacon',
      'csp_report',
      'font',
      'image',
      'imageset',
      'media',
      'object',
      'object_subrequest',
      'ping',
      'script',
      'stylesheet',
      'sub_frame',
      'web_manifest',
      'websocket',
      'xbl',
      'xml_dtd',
      'xmlhttprequest',
      'xslt',
      'other'
    ]
  },
  ['blocking']
);

browser.webRequest.onBeforeRequest.addListener(
  pageBeingRequested,
  {
    urls: ['<all_urls>'],
    types: ['main_frame']
  },
  ['blocking']
);
