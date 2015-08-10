/**
 * Adds demo banner to Sequence.js themes -- Not required for Sequence.js
 * themes to work
 */


function appendStyles(styles) {

  var css = document.createElement('style');
  css.type = 'text/css';

  if (css.styleSheet) {
    css.styleSheet.cssText = styles;
  } else {
    css.appendChild(document.createTextNode(styles));
  }

  document.getElementsByTagName("head")[0].appendChild(css);
}


function consoleCredit(slug) {
  if ('console' in window) {

    console.log('  ▄▓▓▓▄\n  ▓▌      ▄▄▄  ▄▄▄▄▄  ▄   ▄   ▄▄▄  ▄▄▄▄▄   ▄▄▄▄  ▄▄▄\n  ▀▓▓▓▓  ▓▓ ▓▌ ▓▌ ▓▓▌ ▓▌  ▓▌ ▓▓ ▓▌ ▓▌ ▐▓▌ ▓▓▀   ▓▓ ▓▌\n      ▓▌ ▓▓▀▀▀ ▓▌  ▓▌ ▓▓  ▓▌ ▓▓▀▀▀ ▓▌  ▓▌ ▓▓    ▓▓▀▀▀\n  ▀▓▓▓▀   ▀▓▓▀ ▀▓▓▓▓▌ ▀▓▓▓▓   ▀▓▓▀ ▓▌  ▓▌  ▀▓▓▀  ▀▓▓▀\n                   ▓▌\n\n This is a demo for the Sequence.js theme: ' + slug + '\n\n Please see http://sequencejs.com/themes/' + slug + '/ before using this theme as you may be required\n to purchase a license.\n\n This demo is minified to protect its source. An unminified version along with instructions\n can be found at: http://sequencejs.com/themes/' + slug + '/\n');
  }
}


function appendHtml(slug) {

  var $banner = document.createElement("div"),
      $close,
      styles,
      slug;

  $banner.id = 'banner';
  document.body.appendChild($banner);

  $banner.innerHTML = '<div class="details"><a href="http://sequencejs.com/themes/' + slug + '/" title="Learn more about this Sequence.js theme"><img src="../demo/images/logo-sequence-small.png" srcset="../demo/images/logo-sequence-small.png 1x, ../demo/images/logo-sequence-small@2x.png 2x" alt="Sequence.js" width="40" height="40" /></a><a href="http://sequencejs.com/themes/' + slug + '/" title="Learn more about this Sequence.js theme" class="back">Back to Sequence.js Theme Details</a></div><button id="close" type="button" class="close">Close </button>';

  $close = document.getElementById('close');

  $close.addEventListener('click', function() {
    $banner.parentNode.removeChild($banner);

    styles = 'body {padding-bottom: 0;}';
    appendStyles(styles);
  });
}

var styles = 'body {padding-bottom: 40px;}';
    styles += '#banner {position: fixed; z-index: 9999; left: 0; right: 0; bottom: 0; height: 40px; padding: 0 .5em; font-family: sans-serif; font-size: 14px; color: white; background: #F96D38; border: none;}';
    styles += '#banner .back {position: absolute;top: 2px;left: 3.5em;right:5em;height: 100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color: white;text-decoration: none;white-space: nowrap;line-height: 2.85714em;font-weight: bold;}';
    styles += '#banner .back:before {content: "";display: inline-block;width: 7px;height: 12px;margin-right: 4px;background: url(../demo/images/back.svg) no-repeat;}';
    styles += '#banner object {position: absolute;top: 0;bottom: 0;height: 100%;padding: 0 .5em;display: inline-block;vertical-align: middle;}';
    styles += '#banner .close {cursor: pointer;position: absolute;right: 0;top: 0;bottom: 0;padding: 0 .5em;margin: 0;background: transparent;border: none;color: white;font-size: .875em;text-transform: uppercase;}';
    styles += '#banner .close:after {content: "×";}';

window.onload = function() {

  consoleCredit(slug);

  if (window.addEventListener === undefined) {
    return;
  }

  appendStyles(styles);
  appendHtml(slug);
};
