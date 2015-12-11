import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {Utils} from "misc/utils";

export class Index{

    static inject() {
        return [ Router, Utils, HttpClient ];
    }

    constructor(router, utils, http) {
        this.router = router;
        this.currentDate = new Date();
        this.utils = utils;
        this.http = http;

        this.newDate = this.utils.doubleDigit(this.currentDate.getDate()) + 
                 "/" + this.utils.doubleDigit(this.currentDate.getMonth() + 1) + 
                 "/" + this.currentDate.getFullYear();

        this.newTime = this.utils.doubleDigit(this.currentDate.getHours()) + 
                 ":" + this.utils.doubleDigit(this.currentDate.getMinutes());       
    }

    activate(params) {
        this.heading = "Assessment";
       
        this.exam = {
            "subject": params.subject,
            "name": this.utils.dashToSpace(params.name),
            "cohort": params.cohort
        }

        this.assessor = params.assessor;
    }

    startAssessment() {  
        var Content = {            
            "assessors": [this.assessor],
            "assessed" : this.utils.formatDateTime(this.newDate, this.newTime),     
            "student" : new Object()
        };
        if(this.number != null || this.name != null){
            Content.student["name"] = this.name;
            Content.student["number"] = this.number;
        }
             
        var url = this.utils.spaceToDash("assessments/"+this.exam.subject+"/"+this.exam.cohort+"/"+this.exam.name);
        this.http.post(url, Content).then(response => {
            this.assessment = response.content;
            this.router.navigateToRoute('assessmentId', {subject: this.exam.subject, cohort: this.exam.cohort, name: this.exam.name, assessmentid: this.assessment.id });
        });

       //, response => {
            //    if(response.httpstatuscode == 400){
            //        if(response.content.code == 1111){
            //            var message = "het veld " + response.content.value.field + " is verplicht.";
            //        }
            //    }
            //    this.assessment = response.content;           
            //});       
    }
}