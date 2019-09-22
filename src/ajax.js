var ajax = {
    loadFile: function(src){

        return new Promise(function(resolve,reject){

            var request = new XMLHttpRequest();
            request.open("GET", src);
            request.responseType = 'blob';

            request.onload = function(){

                if(request.status === 200){
                    console.log("Succefully loading source with AJAX");
                    resolve(request.response);
                }else if(request.status === 400){
                    reject(Error("Error loading FILE with AJAX"));
                }else{
                    reject(Error("Something unexpected happended loading FILE with AJAX"));
                }

            };

            request.onerror = function(){
                reject(Error("There was a network error"));
            };

            request.send();
            
            /*request.onreadystatechange = function(){

                if(request.readyState == XMLHttpRequest.DONE){
                    if(request.status == 200){
                        console.log(JSON.parse(request.responseText));
                    }else if(request.status == 400){
                        console.log("Error loading FILE with AJAX");
                    }else{
                        console.log("Something unexpected happended loading FILE with AJAX")
                    }
                }
            };

            
            request.send();*/
        });
    }
}