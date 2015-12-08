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

    criteriumAnswerButton(id, name){
        for(var a = 0; a < this.assessment.categories.length; a++){       
            for(var b = 0; b < this.assessment.categories[a].observations.length; b++){  
                if(this.assessment.categories[a].observations[b].id == id){
                    if((this.assessment.categories[a].observations[b].result == "done" && name == "done") || (this.assessment.categories[a].observations[b].result == "notDone" && name == "notDone")){
                        this.assessment.categories[a].observations[b].result = "notRated";
                    }
                    else if((this.assessment.categories[a].observations[b].result == "done" && name != "done") || (this.assessment.categories[a].observations[b].result == "notRated" && name != "done")){
                        this.assessment.categories[a].observations[b].result = "notDone";
                    }
                    else if((this.assessment.categories[a].observations[b].result == "notDone" && name != "notDone") || (this.assessment.categories[a].observations[b].result == "notRated" && name != "notDone")){
                        this.assessment.categories[a].observations[b].result = "done";
                    }
                }
            }
        }
    }
}