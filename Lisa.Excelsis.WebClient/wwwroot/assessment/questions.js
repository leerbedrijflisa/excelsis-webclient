import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {Utils} from "utils";

export class questions{
    constructor (){
        this.done = false;
        this.notDone = false;
        this.rated = false;
    }
    activate(params){
        this.assessment = params;
    }

    criteriumAnswerButton(name){
        switch(name) {
            case "done":
                if(done){
                    done = false;
                    rated = false;
                }else{
                    done = true;
                    notDone = false;
                    rated = true;
                }
                break;
            case "notDone":
                if(notDone){
                    notDone = false;
                    rated = false;
                }else{
                    notDone = true;
                    done = false;
                    rated = true;
                }
                break;
        }   
    }
}