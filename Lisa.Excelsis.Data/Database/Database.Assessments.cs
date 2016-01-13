using System.Collections.Generic;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
	    public IEnumerable<Assessment> FetchAssessments()
        {
            return _db.Assessments;
        }

        public Assessment AddAssessment(Assessment assessment)
        {
            var query = _db.Assessments.Add(assessment);
            _db.SaveChanges();

            return query;
        }

        public IEnumerable<Assessment> AddAssessments(IEnumerable<Assessment> assessments)
        {
            var query = _db.Assessments.AddRange(assessments);
            _db.SaveChanges();

            return query;
        }
    }
}