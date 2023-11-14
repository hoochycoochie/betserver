
const { createClient } = require("redis")


const { workerData, parentPort } = require('worker_threads');
const BETTING_KEY = 'betting-key';
async function saveInDb(dto) {
  let redisService = undefined;
  try {
    
    
    const items = [];

    const { count, mid, cid } = dto;
     
    for (var idx = 1; idx <= parseInt(count); idx++) {
      
      items.push(`${cid}:${mid}:${idx}`);
    }


   
    


    redisService = await createClient({
      host: 'localhost',
      port: 6379
    }).connect();
    items.forEach(
      async (item) => {
        await redisService.rPush(BETTING_KEY, item);

      }
    );
    return true;
  } catch (error) {
   
    throw error
  }

}
 
parentPort.postMessage(saveInDb(workerData.value));
