function task1(cb){
    awyncOperation(() => {
        task2(cb);
    })
}

function task2(cb){
    asyncOperation(() => {
        task3(cb);
    })
}

function task3(cb){
    asyncOperation(() => {
        cb();
    })
}

task1(() => {
    //task1, task2, task3가 완료되었을 때 실행된다.
    console.log('tasks 1, 2, and 3 executed');
})

