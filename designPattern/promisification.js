function promisify(callbackBasedApi){
    return function promisified(...args){
        return new Promise((resolve, reject) => {
            const newArgs = [
                ...args,
                function (err, result){
                    if(err){
                        return reject(err);
                    }

                    resolve(result);
                }
            ]
            callbackBasedApi(...newArgs);
        })
    }
}