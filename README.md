# Pointbreak

<img src="http://pointbreak.construction/assets/i/pointbreak-128.png" alt="" width="64" class="intro-logo">

http://pointbreak.construction/

A Chrome app to create custom breakpoints to test against when building websites. 

## Usage

- Add custom sizes in the left panel
- When scrolling the stage, as opposed to an individual webview, hold the "shift" key. This prevents the webview from capturing the cursor focus.
- Pointbreak uses Chrome Sync to remember your state so that when you reopen the app it will load where you left off.

## Under the hood

Pointbreak uses Chrome [`webviews`](https://developer.chrome.com/apps/tags/webview) to render websites. They are similar to iframes but provide number of methods to add or retrieve data. They also do not suffer the same security restrictions that iframes do, so sites normally blocked to iframes will render inside Pointbreak.
