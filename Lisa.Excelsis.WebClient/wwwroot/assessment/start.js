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
            this.name = this.assessment.studentName;
            this.number = this.assessment.studentNumber;
            this.newDate = this.utils.formatDate(this.assessment.assessed);
            this.newTime = this.utils.formatTime(this.assessment.assessed);

            for(var i = 0; i < this.assessment.observations.length; i++){                
                this.assessment.observations[i].result = "notRated";
                this.assessment.observations[i].marks = new Array();
                for(var x = 0; x < 4; x++){                   
                    this.assessment.observations[i].marks[x] = "unchecked";
                }
            }
        });
    }  

    //The function below is to have the buttons on the observation page to tell if the criteria is done/not done.
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

    //The function below is to display the markings properly on the observation page
    markings(id, x){
        for(var i = 0; i < this.assessment.observations.length; i++){ 
            if(this.assessment.observations[i].id == id){                
                if((this.assessment.observations[i].marks[x] != "checked")){
                    this.assessment.observations[i].marks[x] = "checked";
                }
                else if((this.assessment.observations[i].marks[x] != "unchecked")){
                    this.assessment.observations[i].marks[x] = "unchecked";
                }                
            }
        }
    }

    //This function below is created to display additional information about a criterium
    explanationshow(id){
        document.getElementById("explanation"+id).style.display = "block";
        document.getElementById("moreinfo"+id).style.display = "none";
        document.getElementById("lessinfo"+id).style.display = "block";
    }

    //This function below is created to hide additional information about a criterium
    explanationhide(id){
        document.getElementById("explanation"+id).style.display = "none";
        document.getElementById("moreinfo"+id).style.display = "block";
        document.getElementById("lessinfo"+id).style.display = "none";
    }
}