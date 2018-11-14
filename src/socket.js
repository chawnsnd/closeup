var Socket = new WebSocket("ws://172.31.43.31:49152/");

export default{
    send(param){
        return new Promise((resolve, reject)=>{
            try {
                Socket.send(
                    JSON.stringify(param)
                );
                Socket.onmessage = function(event) {
                    var data = JSON.parse(event.data);
                    if (data == null) return reject("통신실패");
                    if (data.type == "query_poi") {
                        if(data.response.length == 0) reject("no search poi");
                        return resolve(data.response[0]);
                    }
                    if (data.type == "query_pois" || data.type == "recommend_api"){
                        if(data.response.length == 0) reject("no search poi");
                        return resolve(data.response);
                    }
                    return resolve(data.response);
                };
            } catch (error) {
                reject(error);
            }
        })
    }
}