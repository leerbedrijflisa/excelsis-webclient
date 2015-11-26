import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {Utils} from "utils";

export class List
{
    static inject() {
        return [Utils, Router, HttpClient ];
    }

    constructor(utils,router, http){
        this.utils = utils;
        this.http = http;
        this.router = router;
    }

    activate() {
        this.message = "Studenten worden geladen. Een moment geduld astublieft...";

        this.heading = "Assessments";
       
    }
    
    showAssessments(){
        var url = "/assessments?studentnumber="+this.student;
        this.http.get(url).then(response => {
            this.assessments = response.content;
            this.message = null;
            document.getElementById("assessments").style.display = "inline";
        }, response => {
            if(response.statusCode == 404){
                this.message = "Helaas er zijn geen assessments gevonden.";
                document.getElementById("assessments").style.display = "none";
            }
        });
    }
    formatDate(date){
        return this.utils.formatDate(date);
    }

    formatTime(time){
        return this.utils.formatTime(time);
    }

    openAssessment(name, subject, cohort, id) {
        this.router.navigateToRoute('assessmentId', { subject: subject, name: name,  cohort: cohort, assessmentid: id });
    }
}