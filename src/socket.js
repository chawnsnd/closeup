// var Socket = new WebSocket("ws://172.31.43.31:49152/");
var Socket = new WebSocket("ws://localhost:49152/");
// var Socket = new WebSocket("ws://ec2-13-59-71-223.us-east-2.compute.amazonaws.com:49152/");

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
                        if(data.response.length == 0) return reject("no search poi");
                        return resolve(data.response[0]);
                    }
                    if (data.type == "query_pois"){
                        if(data.response.totalCount == 0) return reject("no search poi");
                        return resolve(data.response);
                    }
                    if ( data.type == "recommend_api"){
                        if(data.response.length == 0) return reject("no search poi");
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