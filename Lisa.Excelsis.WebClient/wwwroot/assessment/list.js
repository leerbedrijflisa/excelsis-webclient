import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {Utils} from "misc/utils";

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
        this.heading = "Assessments";
        this.http.get("/assessors").then(response => {
            this.assessors = response.content;
        });
    }
    
    showAssessmentsStudentNumber(){
        var url = "/assessments?student="+this.student;
        this.http.get(url).then(response => {
            this.assessments = response.content;
            this.message = null;
            if(response.content.length < 1)
            {
                this.message = "Geen resultaten gevonden!";
                document.getElementById("message").style.display = "block";

            }
            else
            {
                document.getElementById("assessments").style.display = "inline";
                document.getElementById("message").style.display = "none";
            }
        }, response => {
            if(response.statusCode == 404){
                this.message = "Helaas er zijn geen assessments gevonden.";
                document.getElementById("assessments").style.display = "none";
            }
        });
    }

    selectAssessor(){
        this.assessor = document.getElementById('assessor').value;
        this.http.get("/assessments?assessors="+this.assessor).then(response => {
            this.assessments = response.content;
            this.message = null;
            if(response.content.length < 1)
            {
                this.message = "Geen resultaten gevonden!";
                document.getElementById("message").style.display = "block";
            }          
            else
            {
            document.getElementById("assessments").style.display = "block";
            document.getElementById("selectBarAssessor").style.display = "none";
            document.getElementById("message").style.display = "none";
            }
        }, response => {
            if(response.statusCode == 404){
                this.messageExam = "Helaas er zijn geen examens gevonden.";
            }
        });
    }

    studentSearch()
    {
        document.getElementById("selectBarStudent").style.display = "block";
        document.getElementById("searchSelect").style.display = "none";
    }

    assessorSearch()
    {
        document.getElementById("selectBarAssessor").style.display = "block";
        document.getElementById("searchSelect").style.display = "none";
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