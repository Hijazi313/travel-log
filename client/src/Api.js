

export  async function listLogEntries(){
    const resp = await fetch(`/api/logs`);
    return resp.json()
}

export const createLogEntry = async (entry)=>{
    const resp = await fetch(`/api/logs`, {
        method:'POST',
        headers:{
            'content-type':'application/json',

        },
        body:JSON.stringify(entry)
    });
    return resp.json()
}