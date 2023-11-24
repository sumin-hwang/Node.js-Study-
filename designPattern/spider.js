import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';

const spidering = new Set();

export function spider(url, nesting, queue){
  if (spidering.has(url)){
    return;
  }

  spidering.add(url);
  queue.pushTask((done) => {
    spiderTask(url, nesting, queue, done)
  })
}



export function spiderTask (url, nesting, cb) {
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

        spiderLinks3(url, requestContent, nesting, queue); //새로운 링크를 추가하는 함수
        return cb();
      })
    }

    spiderLinks3(url, fileContent, nesting, queue)
    return cb();
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

    // spider(links[index], nesting - 1, function (err){
    //   if(err){
    //     return cb(err);
    //   }
    //   iterate(index + 1);
    // }
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

function spiderLinks3(currentUrl, body, nesting, queue){
  if(nesting === 0){
    return
  }

  const links = getPageLinks(currentUrl, body);
  if(links.length === 0){
    return;
  }

  links.forEach(link => spider(link, nesting -1, queue));
}