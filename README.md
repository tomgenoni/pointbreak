# Pointbreak

<img src="https://camo.githubusercontent.com/05d507bfa3da05ab2ce7feee823b37b50161af28/687474703a2f2f706f696e74627265616b2e636f6e737472756374696f6e2f6173736574732f692f706f696e74627265616b2d3132382e706e67" alt="" width="64" class="intro-logo">

http://pointbreak.construction/

A Chrome app to create custom breakpoints to test against when building websites.

<img src="http://pointbreak.construction/assets/i/pointbreak-promo.jpg">

## Usage

- Add custom sizes and reorder them in the left panel. And though you shouldn't [design to a device](http://thenextweb.com/dd/2015/10/28/9-responsive-design-mistakes-you-dont-want-to-make/) I've added a few popular ones for previews. See Material [Device Metrics](https://material.io/devices/) for full list of device sizes.
- When scrolling the stage, as opposed to an individual webview, hold the "option" or "alt" key. This prevents the webview from capturing the cursor focus.
- Pointbreak uses Chrome Sync to remember your state so that when you reopen the app it will load where you left off.
- Try it with [Browsersync](https://www.browsersync.io/) for synced scrolling and auto-injection of CSS.

## Under the hood

Pointbreak uses Chrome [`webviews`](https://developer.chrome.com/apps/tags/webview) to render websites. They are similar to iframes but provide number of methods to add or retrieve data. They also do not suffer the same security restrictions that iframes do, so sites normally blocked to iframes will render inside Pointbreak.
