/**
 * @file User geolocation reporting.
 * @author Moez Bouhlel <bmoez.j@gmail.com>
 * @license MPL-2.0
 * @copyright 2014-2017 Moez Bouhlel
 */
"use strict";

/**
 * Report user geolocation to Google Analytics.
 * @public
 *
 * @param {Options} options - Options instance for the current module.
 */
export function reportGeolocation(options) {

  // If Do Not Tract is activated (or an ad block is installed), skip report
  if (navigator.doNotTrack === "1") {
    return;
  }

  let data = "";
  let manifest = browser.runtime.getManifest();
  data = data.concat("v", "=", encodeURIComponent(1));
  // Google Analytics id.
  data = data.concat("&", "tid", "=", encodeURIComponent("UA-28759938-4"));
  // data = data.concat("&", "cid", "=", encodeURIComponent(OPTIONS.uuid));
  data = data.concat("&", "t", "=", encodeURIComponent("event"));
  data = data.concat("&", "ec", "=", encodeURIComponent("content-page"));
  data = data.concat("&", "ea", "=", encodeURIComponent("inject"));
  data = data.concat("&", "dh", "=", encodeURIComponent("localhost"));
  // Report current module as a visited URL "/<module_name>"
  data = data.concat("&", "dp", "=", encodeURIComponent("/" + options.modulesName));
  // Report the extension (name, id, version) as an app
  data = data.concat("&", "ds", "=", encodeURIComponent("app"));
  data = data.concat("&", "an", "=", encodeURIComponent(manifest.name));
  data = data.concat("&", "aid", "=", encodeURIComponent(options.getId()));
  data = data.concat("&", "av", "=", encodeURIComponent(manifest.version));
  // Report browser current language
  data = data.concat("&", "ul", "=", encodeURIComponent(navigator.language));

  fetch("https://www.google-analytics.com/collect", {
    method: "POST",
    body: data,
  });
}
