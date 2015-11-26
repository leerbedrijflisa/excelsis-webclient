import {HttpClient} from 'aurelia-http-client';

export class App {

    static inject(){
        return [ HttpClient ]
    }

    constructor(http){
        http.configure(x => {
            x.withBaseUrl('http://localhost:5000/');      
            x.withHeader('Content-Type', 'application/json');
        });
    }

    configureRouter(config, router) {
        this.router = router;

        config.title = "Excelsis";
        config.map([
            { route: ['', 'exam'], name: 'exam', moduleId: 'exam/index', nav: true, title:'Home' },
            { route: 'assessment/:subject/:name/:cohort', name: 'assessment', moduleId: 'assessment/index' },
            { route: 'assessment/:subject/:name/:cohort/:assessmentid', name: 'assessmentId', moduleId: 'assessment/start' },           
            { route: 'assessments', name: 'assessments', moduleId: 'assessment/list', nav: true, title:'Assessments' }, 
            { route: 'version', name: 'version', moduleId: 'version', nav: true, title:'Version' }
        ]);
    }
}