﻿using Lisa.Excelsis.WebApi.Models;
using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Lisa.Excelsis.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AssessmentController : Controller
    {
        // GET: api/assessment
        [HttpGet]
        public object Get()
        {
            var query = (from assessments in DummieData.Assessments
                         select assessments);

            return Json(query);
        }

        // GET api/assessment/5
        [HttpGet("{id}")]
        public object Get(int? id = null)
        {
            string method = "GET";
            string request = "/api/assessment/" + id;

            List<string> errors = new List<string>();

            var query = (from assessments in DummieData.Assessments
                         where assessments.Id == id
                         select assessments).FirstOrDefault();

            if (query == null)
            {
                errors.Add("Assessment ID is not found");
                return HttpError(request, method, 404, errors);
            }

            return Json(query);
        }

        // GET api/assessment/5/criterium/3
        [HttpGet("{assesmentId}/criterium/{criteriumId}")]
        public object Get(int? assesmentId = null, int? criteriumId = null)
        {
            string method = "GET";
            string request = "/api/assessment/" + assesmentId + "/criterium/" + criteriumId;

            List<string> errors = new List<string>();

            var query = (from assessments in DummieData.Assessments
                         where assessments.Id == assesmentId                   
                         select assessments.Criteria).SingleOrDefault();
            
            if (query == null)
            {
                errors.Add("Assessment ID is not found");
                return HttpError(request, method, 404, errors);
            }

            var criterium = query.SingleOrDefault( c => c.Id == criteriumId);

            if (criterium == null)
            {
                errors.Add("Criterium ID is not found");
                return HttpError(request, method, 404, errors);
            }

            return Json(criterium);
        }

        // POST api/assessment
        [HttpPost]
        public object Post([FromBody]Assessment value)
        {
            string method = "POST";
            string request = "/api/assessment";

            List<string> error = new List<string>();

            if(value == null)
            {
                error.Add("Malformed Json");            
                return HttpError(request, method, 400, error);
            }

            if (value.TeacherId == null)
            {
                error.Add("Teacher ID is required, but is not set.");
            }

            if (value.ExamId == null)
            {
                error.Add("Exam ID is required, but is not set.");
            }

            if (value.Examinee == null)
            {
                error.Add("Examinee is required, but is not set.");
            }
            
            if( error.Count() == 0)
            {               
                Assessment assessment = new Assessment();

                var query = (from exam in DummieData.Exams
                             where exam.Id == value.ExamId
                             select exam).FirstOrDefault();

                if(query == null)
                {
                    error.Add("Exam is not found");
                    return HttpError(request, method, 404, error);
                }

                int id = DummieData.Assessments.Count() + 1;
                 
                assessment.Id = id;
                assessment.ExamId = value.ExamId;
                assessment.TeacherId = value.TeacherId;
                assessment.Examinee = value.Examinee;
                assessment.Criteria = new List<Criterium>();

                int i = 0;
                foreach(var question in query.questions)
                {
                    assessment.Criteria.Add(new Criterium
                    {
                        Id = i,
                        Question = question.Description,
                        Rating = question.Rating,
                        Answer = null,
                        CriteriumBoxes = new bool[]
                        {
                            false,false,false,false
                        }                            
                    });
                    i++;
                }
                DummieData.Assessments.Add(assessment);

                return Json(assessment);
            }
            else
            {
                return HttpError(request, method, 400, error);
            }
        }

        // PATCH api/assessment/5
        [HttpPatch("{assesmentId}")]
        public void Patch(int assesmentId, [FromBody]string value)
        {

        }

        // PATCH api/assessment/5/criterium/3
        [HttpPatch("{assesmentId}/criterium/{criteriumId}")]
        public object Patch([FromBody]Criterium value, int? assesmentId = null, int? criteriumId = null)
        {
            string method = "GET";
            string request = "/api/assessment/" + assesmentId + "/criterium/" + criteriumId;

            List<string> errors = new List<string>();

            var query = (from assessments in DummieData.Assessments
                         where assessments.Id == assesmentId
                         select assessments.Criteria).SingleOrDefault();

            if (query == null)
            {
                errors.Add("Assessment ID is not found");
                return HttpError(request, method, 404, errors);
            }

            var criterium = query.SingleOrDefault(c => c.Id == criteriumId);

            if (criterium == null)
            {
                errors.Add("Criterium ID is not found");
                return HttpError(request, method, 404, errors);
            }

            if(value.Answer == null && value.CriteriumBoxes == null)
            {
                errors.Add("You didn't supply any answer");
                return HttpError(request, method, 404, errors);
            }

            if(value.Answer != null)
            {
                criterium.Answer = value.Answer;
            }
            
            if(value.CriteriumBoxes != null)
            {
                criterium.CriteriumBoxes = value.CriteriumBoxes;
            }

            return Json(criterium);
        }

        // This creates a HTTP error code with json data
        public object HttpError(string request, string method, int HttpStatusCode, List<string> message)
        {
            Response.StatusCode = HttpStatusCode;
            var error = new Error();
            error.HttpResponseCode = HttpStatusCode;
            error.Request = request;
            error.Method = method;
            error.message = message;

            return Json(error);
        }
    }
}