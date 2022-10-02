
'use strict';

const urlFor = require('hexo-util').url_for.bind(hexo)

// {% note style, content %}
// {% note content %}
function postNote(args) {
  args = args.join(' ').split(', ')
  if (args.length > 1) {
    let cls = args[0].trim()
    let text = args[1].trim()
    return `<div class="note ${cls}">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div>`;
  } else if (args.length > 0) {
    let text = args[0].trim()
    return `<div class="note">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div>`;
  }
}

// {% noteblock style, title, URL %}
// content
// {% endnoteblock %}
function postNoteBlock(args, content) {
  args = args.join(' ').split(', ');
  if (args.length < 1) {
    return;
  }
  let cls = args[0].trim();
  let URL = '';
  let ret = '';
  ret += '<div class="note ' + cls + '">';
  if (args.length > 2) {
    URL = urlFor(args[2]);
    // console.log("note URL= " + URL);
  }
  if (args.length > 1) {
    let title = args[1].trim();
    if (URL !== ''){
      title = '<a href="' + URL + '" target="_blank" rel="noreferrer">' + title + '</a>';
    }
    ret += '<p><strong>' + title + '</strong></p>';
  }
  ret += hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('');
  ret += '</div>';
  return ret;
}

hexo.extend.tag.register('note', postNote);
hexo.extend.tag.register('noteblock', postNoteBlock, {ends: true});