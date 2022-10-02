'use strict';

// {% link text, url %}
// {% link `text`, url, img %}
// {% link ``, url, img %}
hexo.extend.tag.register('link', function (args) {
  let text = '';
  let url = '';
  let img = '';
  let result = '';
  //args are defaulted to space ` ` delimited...
  args = args.join(' ');
  // console.info("{% link {{args}} %}: ", args);
  //check for encapsulating back-tick (`) marks, if exist pull out title
  if (args.indexOf("`", 1) > 1) {
    //extract title from args
    text = args.split('`')[1];
    // console.log("   {% link {{text}} %}: ", text);
    // grab URL (& img)
    args = args.split('`')[2].split(",");
  } else {
    // console.info("   text not back-ticked encapsulated...");
    args = args.split(',');
    text = args[0].trim();
  }
  //check for URL
  if (args.length >= 2) {
    url = args[1].trim();
    // console.log("   {% link {{url}} %}: ", url);
  }
  //check for img
  if (args.length == 3) {
    img = args[2].trim();
    // console.log("   {% link {{img}} %}: ", img);
  }

  if (url !== '') {
    if ((text == '' || text ==='``') && img !== '') {
      // no text, but has image and URL, then simply make a clickable image
      // console.log("   {% link %}: clickable image only");
      result += '<a href="' + url + '" target="_blank">';
      result += '<img src="' + img + '" class="noFancybox" />';
      result += '</a>';
    } else {
      result += '<div class="tagLink"><a class="link-card" title="' + text + '" href="' + url + '">';
      // left
      result += '<div class="left">';
      result += '<img src="' + (img || hexo.theme.config.tag_plugins.linkImg) + '"/>';
      result += '</div>';
      // right
      //TODO: https://github.com/lorezyra/Richie2.com/issues/127
      result += '<div class="right"><p class="text">' + text + '</p><p class="url">' + url + '</p></div>';
      result += '</a></div>';
    }
  }
  return result;
});

hexo.extend.tag.register('linkgroup', function (args, content) {
  //BUG: this seems to take a crap on long posts.
  //TODO: https://github.com/lorezyra/Richie2.com/issues/123
  // console.info("{% linkgroup {{content}} %}: ", content);
  let ret = '<div class="link-group">';
  ret += content;
  ret += '</div>';
  return ret;
}, {
  ends: true
});