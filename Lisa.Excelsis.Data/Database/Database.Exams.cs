using System.Collections.Generic;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
        public IEnumerable<Exam> FetchExams()
        {
            return _db.Exams;
        }

        public Exam AddExam(Exam exam)
        {
            var query = _db.Exams.Add(exam);
            _db.SaveChanges();

            return query;
        }

        public IEnumerable<Exam> AddExams(IEnumerable<Exam> exams)
        {
            var query = _db.Exams.AddRange(exams);
            _db.SaveChanges();

            return query;
        }
    }
}