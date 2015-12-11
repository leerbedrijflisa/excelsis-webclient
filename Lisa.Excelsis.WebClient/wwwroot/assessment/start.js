import {HttpClient} from 'aurelia-http-client';
import {Utils} from "misc/utils";
import {Data} from "misc/data";

export class Start{

    static inject() {
        return [Data, Utils, HttpClient ];
    }

    constructor(data, utils, http) {
        this.data = data;
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
            this.newDate = this.utils.formatDate(this.assessment.assessed);
            this.newTime = this.utils.formatTime(this.assessment.assessed);

            for(var a = 0; a < this.assessment.categories.length; a++){       
                for(var b = 0; b < this.assessment.categories[a].observations.length; b++){ 
                    if(this.assessment.categories[a].observations[b].result == ""){
                        this.assessment.categories[a].observations[b].result = "notrated";
                    }
                    this.assessment.categories[a].observations[b].marks = new Array();
                    for(var x = 0; x < 4; x++){                   
                        this.assessment.categories[a].observations[b].marks[x] = "unchecked";
                    }
                }
            }
        });
    }  

    //The function below is to have the buttons on the observation page to tell if the criteria is done/not done.
    criteriumAnswerButton(id, name){
        for(var a = 0; a < this.assessment.categories.length; a++){       
            for(var b = 0; b < this.assessment.categories[a].observations.length; b++){  
                if(this.assessment.categories[a].observations[b].id == id){
                    if((this.assessment.categories[a].observations[b].result == "seen" && name == "seen") || (this.assessment.categories[a].observations[b].result == "notseen" && name == "notseen")){
                        this.assessment.categories[a].observations[b].result = "notrated";
                        var data = this.data.CreatePatch("replace", "observations", "result", id, "notrated");
                        this.data.PatchAssessment(this.assessment.id, data);
                    }
                    else if((this.assessment.categories[a].observations[b].result == "seen" && name != "seen") || (this.assessment.categories[a].observations[b].result == "notrated" && name != "seen")){
                        this.assessment.categories[a].observations[b].result = "notseen";
                        var data = this.data.CreatePatch("replace", "observations", "result", id, "notseen");
                        this.data.PatchAssessment(this.assessment.id, data);
                    }
                    else if((this.assessment.categories[a].observations[b].result == "notseen" && name != "notseen") || (this.assessment.categories[a].observations[b].result == "notrated" && name != "notseen")){
                        this.assessment.categories[a].observations[b].result = "seen";
                        var data = this.data.CreatePatch("replace", "observations", "result", id, "seen");
                        this.data.PatchAssessment(this.assessment.id, data);
                    }
                }
            }
        }
    }

    //The function below is to display the markings properly on the observation page
    markings(id, x){
        for(var a = 0; a < this.assessment.categories.length; a++){       
            for(var b = 0; b < this.assessment.categories[a].observations.length; b++){  
                if(this.assessment.categories[a].observations[b].id == id){                
                    if((this.assessment.categories[a].observations[b].marks[x] != "checked")){
                        this.assessment.categories[a].observations[b].marks[x] = "checked";
                    }
                    else if((this.assessment.categories[a].observations[b].marks[x] != "unchecked")){
                        this.assessment.categories[a].observations[b].marks[x] = "unchecked";
                    }                
                }
            }
        }
    }    

    //This function below is created to display additional information about a criterium
    explanationshow(id){
        document.getElementById("description"+id).style.display = "block";
        document.getElementById("moreinfo"+id).style.display = "none";
        document.getElementById("lessinfo"+id).style.display = "block";
    }

    //This function below is created to hide additional information about a criterium
    explanationhide(id){
        document.getElementById("description"+id).style.display = "none";
        document.getElementById("moreinfo"+id).style.display = "block";
        document.getElementById("lessinfo"+id).style.display = "none";
    }
}