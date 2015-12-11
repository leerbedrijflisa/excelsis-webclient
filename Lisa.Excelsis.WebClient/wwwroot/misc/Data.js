import {HttpClient} from 'aurelia-http-client';

export class Data{
    static inject() {
        return [HttpClient];
    }

    constructor( http) { 
        this.http = http;
    }

    CreatePatch(action,fieldResource, field, id, name){
        return [{
            "action": action,
            "field": fieldResource + "/" + id + "/" + field,
            "value": name
        }];
    }

    PatchAssessment(id, data){
        return this.http.patch('assessments/' + id, data);
    }
}