#!/usr/bin/env node

// dependencies
var fs = require('fs');
var newYaml;

function addAds() {

  // Read in amp-ad file, and the ad vendors
  var ampAd = fs.readFileSync('../content/docs/reference/components/ads-analytics/amp-ad.md', { encoding: 'utf8' });
  var supportPortion = (ampAd.split('## Supported ad networks')[1]).split('##')[0].trim();
  var vendorNames = supportPortion.split('\n');

  vendorNames = vendorNames.map(a => {
    var match = a.match(/\[([^\]]+)\]\(([^\)]+)\)/);
    var title = match[1];
    var link = match[2];
    return 'title: ' + title + '\n          link: ' + link;
  });

  newYaml += `
    - title@: Ads
      section_items:
        - `;

  newYaml += vendorNames.join('\n        - ');

}

function addAnalytics() {

  // Read in amp-ad file, and the ad vendors
  var ampAnalytics = fs.readFileSync('../content/docs/reference/components/ads-analytics/amp-analytics.md', { encoding: 'utf8' });
  var supportPortion = (ampAnalytics.split('## Analytics vendors')[1]).split('\n## ')[0];
  var individualVendors = supportPortion.split('\n###');
  individualVendors.shift();

  individualVendors = individualVendors.map(function (a) {
    var title = a.match(/^.*/)[0].trim();
    var link = a.match(/\[[^\]]+\]\((http[^\)]+)\)/);

    return 'title: ' + title + '\n          link: ' + (link ? link[1] : '');
  });

  newYaml += `
    - title@: Analytics
      section_items:
        - `;

  newYaml += individualVendors.join('\n        - ');

}

function addContentPlatforms() {
  newYaml += `
    - title@: Content Platforms
      section_items:
        - title: Google
          link: https://google.com
        - title: Hatena
          link: https://www.hatena.com/
        - title: LinkedIn
          link: https://www.linkedin.com/
        - title: Medium
          link: https://medium.com/
        - title: Nuzzel
          link: http://nuzzel.com/
        - title: Pinterest
          link: https://pinterest.com/
        - title: Reddit
          link: https://www.reddit.com/
        - title: Twitter
          link: https://twitter.com/
        - title: Ghost
          link: https://ghost.org`;
}

function addCMS() {
  newYaml += `
    - title@: CMS
      section_items:
        - title: Canvas
          link: https://www.roya.com/blog/roya-announces-addition-of-amp-to-canvas-cms-amp.html
        - title: Drupal
          link: https://www.drupal.org/project/amp
        - title: Hatena
          link: http://help.hatenablog.com/entry/amp
        - title: Marfeel
          link: https://atenea.marfeel.com/atn/product/marfeel-press/360-platform/google-amp/marfeel-s-accelerated-mobile-pages-google-amp-solution
        - title: Squarespace
          link: https://support.squarespace.com/hc/en-us/articles/223766868-Using-AMP-with-Squarespace
        - title: WordPress
          link: https://wordpress.org/plugins/amp/`;
}

function addVideo() {
  newYaml += `
    - title@: Audio/Video
      section_items:
        - title: AOL O2
          link: http://on.aol.com/
        - title: Beachfront Reach
          link: http://beachfrontreach.com/
        - title: Brid.tv
          link: https://www.brid.tv/
        - title: Brightcove
          link: https://www.brightcove.com/
        - title: Dailymotion
          link: http://www.dailymotion.com/
        - title: Gfycat
          link: https://gfycat.com/
        - title: JW Player
          link: https://www.jwplayer.com/
        - title: Kaltura
          link: https://corp.kaltura.com/
        - title: Soundcloud
          link: https://soundcloud.com/
        - title: Springboard
          link: http://springboardplatform.com/
        - title: Vimeo
          link: https://vimeo.com/
        - title: Vine
          link: https://vine.co/
        - title: YouTube
          link: https://www.youtube.com/ `;
}

// Put them into the right location in the YAML
newYaml = `page_title: "Participants"

tech_companies:
  section_title@: Technology Companies using AMP
  sections:`;

addAds();
addAnalytics();
addContentPlatforms();
addCMS();
addVideo();

// Save back to disk
fs.writeFileSync('../content/includes/who.yaml', newYaml);


