using System.Collections.Generic;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
        public IEnumerable<Assessor> FetchAssessors()
        {
            return _db.Assessors;
        }

        public Assessor AddAssessor(Assessor assessor)
        {
            var query = _db.Assessors.Add(assessor);
            _db.SaveChanges();

            return query;
        }

        public IEnumerable<Assessor> AddAssessors(IEnumerable<Assessor> asssessors)
        {
            var query = _db.Assessors.AddRange(asssessors);
            _db.SaveChanges();

            return query;
        }
    }
}