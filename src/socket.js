var Socket = new WebSocket("ws://192.168.0.19:49152/");

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
                    return resolve(data.response);
                };
            } catch (error) {
                reject(error);
            } finally {
                Socket.close();
            }
        })
    }
}