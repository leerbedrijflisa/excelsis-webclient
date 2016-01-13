import {HttpClient} from 'aurelia-http-client';

export class Data{
    static inject() {
        return [HttpClient];
    }

    constructor( http) { 
        this.http = http;
    }

    CreateResourcePatch(action, field, value){
        return [{
            "action": action,
            "field": field,
            "value": value
        }];
    }

    CreateChildPatch(action,fieldResource, field, id, value){
        return [{
            "action": action,
            "field": fieldResource + "/" + id + "/" + field,
            "value": value
        }];
    }

    PatchAssessment(id, data){
        return this.http.patch('assessments/' + id, data);
    }
}