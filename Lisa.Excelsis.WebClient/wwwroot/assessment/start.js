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
                    this.assessment.categories[a].observations[b].markings = [];
                    this.fillMarks(this.assessment.categories[a].observations[b]);
                }
            }
        });
    } 
    
    //The function below is made to save the student information on an observation page
    SaveStudentMetaData(id)
    {
        if(this.StudentDataIsValid(this.name, this.number))
        {
            var content = [];
            content.push(this.data.CreateResourcePatch("replace", "studentname", this.name)[0]);
            content.push(this.data.CreateResourcePatch("replace", "studentnumber", this.number)[0]);
            this.data.PatchAssessment(id, content);
            location.reload();
        }    
    }

    StudentDataIsValid(name, number){
        var valid = true;
        if(name != null && name.length > 0 && !name.match("^[a-zA-Z\s]*$"))
        {
            valid = false;
            this.studentNameMessage = "Your student name can only contain letters and spaces.";
            document.getElementById("studentNameMessage").style.display = "block";
        }
        else if(name == null || name.match("^[a-zA-Z\s]*$"))
        {
            document.getElementById("studentNameMessage").style.display = "none";
        }
        if(number != null && number.length > 0 && !number.match("^[0-9]{8}$"))
        {
            valid = false;
            this.studentNumberMessage = "Your student number should be at least 8 digits, please try again"; 
            document.getElementById("studentNumberMessage").style.display = "block";
        }
        else
        {
            document.getElementById("studentNumberMessage").style.display = "none";
        }
        return valid;
    }

    //The function below is to have the buttons on the observation page to tell if the criteria is done/not done.
    criteriumAnswerButton(id, name){
        for(var a = 0; a < this.assessment.categories.length; a++){       
            for(var b = 0; b < this.assessment.categories[a].observations.length; b++){  
                if(this.assessment.categories[a].observations[b].id == id){
                    if((this.assessment.categories[a].observations[b].result == "seen" && name == "seen") || (this.assessment.categories[a].observations[b].result == "unseen" && name == "unseen")){
                        this.assessment.categories[a].observations[b].result = "notrated";
                        var data = this.data.CreateChildPatch("replace", "observations", "result", id, "notrated");
                        this.data.PatchAssessment(this.assessment.id, data);
                    }
                    else if((this.assessment.categories[a].observations[b].result == "seen" && name != "seen") || (this.assessment.categories[a].observations[b].result == "notrated" && name != "seen")){
                        this.assessment.categories[a].observations[b].result = "unseen";
                        var data = this.data.CreateChildPatch("replace", "observations", "result", id, "unseen");
                        this.data.PatchAssessment(this.assessment.id, data);
                    }
                    else if((this.assessment.categories[a].observations[b].result == "unseen" && name != "unseen") || (this.assessment.categories[a].observations[b].result == "notrated" && name != "unseen")){
                        this.assessment.categories[a].observations[b].result = "seen";
                        var data = this.data.CreateChildPatch("replace", "observations", "result", id, "seen");
                        this.data.PatchAssessment(this.assessment.id, data);
                    }
                }
            }
        }
    }

    //The function below is to display the markings properly on the observation page
    markings(observation, mark){
        if(observation.markings[mark]){
            observation.markings[mark] = false;
            var data = this.data.CreateChildPatch("remove","observations", "marks", observation.id, mark);
            this.data.PatchAssessment(this.assessment.id, data);
        }else{
            observation.markings[mark] = true;
            var data = this.data.CreateChildPatch("add","observations", "marks", observation.id, mark);
            this.data.PatchAssessment(this.assessment.id, data);
        }
        
    }
      
    //This function below allows you to use the markings on the observation page
    fillMarks(observation){
        observation.markings = [];        
        (observation.marks.indexOf('one') != -1) ? observation.markings['one'] = true : observation.markings['one'] = false;
        (observation.marks.indexOf('two') != -1) ? observation.markings['two'] = true : observation.markings['two'] = false;
        (observation.marks.indexOf('three') != -1) ? observation.markings['three'] = true : observation.markings['three'] = false;
        (observation.marks.indexOf('four') != -1) ? observation.markings['four'] = true : observation.markings['four'] = false;
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