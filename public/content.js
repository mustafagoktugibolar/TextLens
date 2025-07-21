console.log("TextLens: content.js loaded");

const mount = document.createElement('div');
mount.id = 'textlens-root';
document.body.appendChild(mount);

const runtime = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;

const script = document.createElement('script');
script.src = runtime.getURL('widget.js');
script.onload = () => console.log("TextLens: widget.js loaded");
document.body.appendChild(script);
