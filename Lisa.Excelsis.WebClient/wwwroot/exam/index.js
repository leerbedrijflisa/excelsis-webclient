import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {Utils} from "misc/utils";

export class Exam{
    
    static inject() {
        return [ Router, HttpClient, Utils ];
    }

    constructor(router, http, utils){
        this.router = router;
        this.http = http;
        this.utils = utils;
    }

    activate() {
        this.isWaiting = true;
        this.heading = "Exam";
        
        this.http.get("/assessors").then(response => {
            this.assessors = response.content;
            if(this.assessors.length < 1)
            {
                this.message = "Geen examinator(en) gevonden!";
                document.getElementById("message").style.display = "block";
            }
            this.isWaiting = false;
        });        
        
        this.cohorts = [ "2015", "2014", "2013", "2012" ];
    }

    selectAssessor(){
        this.assessor = document.getElementById('assessor').value;
        this.isWaiting = true;
        this.http.get("/subjects?assessor="+this.assessor).then(response => {
            document.getElementById("selectAssessor").style.display = "none";
            this.subjects = response.content;
            if(this.subjects.length < 1)
            {
                this.message = "Geen vak(ken) gevonden!";
                document.getElementById("message").style.display = "block";
            }
            this.isWaiting = false;
        });
    }

    showExams() {       
        this.isWaiting = true;
        var subject = document.getElementById('subject').value;
        var cohort = document.getElementById('cohort').value;
        this.http.get("/exams/"+subject+"/"+cohort).then(response => {
            this.exams = response.content;
            if(this.exams.length < 1)
            {
                this.message = "Geen examen(s) gevonden!";
                document.getElementById("message").style.display = "block";
                this.isWaiting = false;
            }
            this.isWaiting = false;
            document.getElementById("exams").style.display = "inline";
        }, response => {
            if(response.statusCode == 404){
                this.messageExam = "Helaas er zijn geen examens gevonden.";
                document.getElementById("exams").style.display = "none";
            }
        });
    }

    startAssessment(name, subject, cohort) {
        this.router.navigateToRoute('assessment', { subject: subject, name: this.utils.spaceToDash(name),  cohort: cohort, assessor: this.assessor });
    }
}