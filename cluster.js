const cluster = require("cluster");

if(cluster.isMaster){
    const cpus = require("os").cpus().length;
    for(let i=0; i<cpus; i++){
        cluster.fork();
        cluster.on("exit",(worker)=>{
            cluster.fork()
        })
    }
} else {
    require("./src/index");
}