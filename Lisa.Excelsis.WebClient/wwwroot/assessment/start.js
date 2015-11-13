import {HttpClient} from 'aurelia-http-client';
import {Utils} from "utils";

export class Start{

    static inject() {
        return [ Utils, HttpClient ];
    }

    constructor(utils, http) {
        this.utils = utils;
        this.http = http;
    }

    activate(params) {
        this.heading = "Assessment";
       
        if(params.subject != null){
            this.exam = {
                "subject": params.subject,
                "name": params.name,
                "cohort": params.cohort
            }
        }
        if (Number.isInteger(parseInt(params.assessmentid))) {
            this.getAssessment(params.assessmentid);            
        }      
    }

    getAssessment(id){
        this.http.get("assessments/"+id).then(response => {
            this.assessment = response.content; 
            this.name = this.assessment.student.name;
            this.number = this.assessment.student.number;
            this.newDate = this.assessment.assessed.date;
            this.newTime = this.assessment.assessed.time;
        });
    }   
    getAssessment(id){
        this.http.get("assessments/"+id).then(response => {
            this.assessment = response.content; 
            this.name = this.assessment.student.name;
            this.number = this.assessment.student.number;
            this.newDate = this.assessment.assessed.date;
            this.newTime = this.assessment.assessed.time;

            for(var i = 0; i < this.assessment.observations.length; i++){                
                this.assessment.observations[i].result = "notRated";
            }
        });
    }  

    criteriumAnswerButton(id, name){
        for(var i = 0; i < this.assessment.observations.length; i++){ 
            if(this.assessment.observations[i].id == id){
                if((this.assessment.observations[i].result == "done" && name == "done") || (this.assessment.observations[i].result == "notDone" && name == "notDone")){
                    this.assessment.observations[i].result = "notRated";
                }
                else if((this.assessment.observations[i].result == "done" && name != "done") || (this.assessment.observations[i].result == "notRated" && name != "done")){
                    this.assessment.observations[i].result = "notDone";
                }
                else if((this.assessment.observations[i].result == "notDone" && name != "notDone") || (this.assessment.observations[i].result == "notRated" && name != "notDone")){
                    this.assessment.observations[i].result = "done";
                }

            }
        }
    }
  //  explanation(id){
    //    document.getElementById("explanation"+id).style.display = "block";
  //  }
}