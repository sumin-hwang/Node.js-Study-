const EventMitter = require('events');

const myEvent = new EventMitter();
myEvent.addListener('event1', ()=> {
    console.log('이벤트1');
});
myEvent.on('event2', ()=> {
    console.log('이벤트2');
});
myEvent.on('event2', ()=> {
    console.log('add event2');
});
myEvent.once('event3', ()=> {
    console.log('이벤트3');
})

myEvent.emit('event1');
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event4');

myEvent.on('event4', ()=> {
    console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listner = () => {
    console.log('이벤트5');
}

myEvent.on('event5', listner);
myEvent.emit('event5');

console.log(myEvent.listenerCount('event2'));