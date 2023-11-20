import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';

export function spider (url, nesting, cb) {
  const filename = urlToFilename(url)
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if(err){
      if(err.code !== 'ENOENT'){
        return cb(err);
      }

      //파일이 존재하지 않기 때문에 다운로드
      return download(url, filename, (err, requestContent) => {
        if(err){
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, cb)
      })
    }

    spiderLinks(url, fileContent, nesting, cb)
  })
}

function spiderLinks1(currentUrl, body, nesting, cb){
  if(nesting === 0 ){
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body)
  if(links.length === 0){
    return process.nextTick(cb);
  }
  
  function iterate(index){
    if(index === links.length){
      return cb()
    }

    spider(links[index], nesting - 1, function (err)){
      if(err){
        return cb(err);
      }
      iterate(index + 1);
    }
  }

  iterate(0);
}

function spiderLinks(currentUrl, body, nesting, cb){
  if(nesting === 0){
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body);
  if(links.length === 0){
    return process.nextTick(cb);
  }

  let completed = 0
  let hasErrors = false
  function done(err){
    if(err){
      hasErrors = true;
      return cb(err);
    }

    if(++completed === links.length && !hasErrors){
      return cb()
    }

    links.forEach(link => spider(link, nesting -1, done));
  }
}