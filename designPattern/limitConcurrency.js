const tasks = [];

const concurrency = 2;
let running = 0;

let completed = 0;
let index = 0;

function next(){
    while(running < concurrency && index < tasks.length){
        const task = tasks[index++];

        task(() => {
            if(++completed === tasks.length){
                return finish();
            }
            running--;
            next();
        })

        running++;
    }
}

next();

function finish(){
    // 작업 끝
}