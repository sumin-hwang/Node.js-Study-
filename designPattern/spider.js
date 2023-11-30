// import fs from 'fs';
import { promises as fsPromises } from 'fs';
import {dirname} from 'path';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.js';
import { promisify} from 'util';

const mkdirpPromises = promisify(mkdirp);

const spidering = new Set();

export function spider(url, nesting){
  // if (spidering.has(url)){
  //   return;
  // }

  // spidering.add(url);
  // queue.pushTask((done) => {
  //   spiderTask(url, nesting, queue, done)
  // })
  return fsPromises.readFile(filename, 'utf8')
    .catch((err) => {
      if(err.code !== 'ENOENT'){
        throw err;
      }

      return download(url, filename);
    })
    .then(content => spiderLinks4(url, content, nesting));
}

function download(url, filename){
  console.log(`Downloding ${url}`);
  let content;
  return superagent.get(url)
    .then((res) => {
      content = res.text;
      return mkdirpPromises(dirname(filename));
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
        console.log(`Downloaded and saved : ${url}`)
        return content;
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

function spiderLinks4(currentUrl, content, nesting){
  let promise = Promise.resolve();
  if(nesting === 0){
    return promise;
  }
  const links = getPageLinks(currentUrl, content);
  for(const link of links){
    promise = promise.then(() => spider(link, nesgting -1)); // 프라미스를 사용하는 비동기 반복 패턴
  }

  return promise;
}