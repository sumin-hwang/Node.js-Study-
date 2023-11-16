function iterate(index){
    if(index === tasks.length){
        return finish()
    }

    const task = tasks[indes];
    task(() => iterate(index + 1));
}

function finish(){
    //반복완료
}

iterate(0)

