using System.Collections.Generic;
using System.Linq;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
        public IEnumerable<Subject> FetchSubjects()
        {
            return _db.Subjects;
        }

        public Subject AddSubject(Subject subject)
        {
            var query = _db.Subjects.Add(subject);
            _db.SaveChanges();

            return query;
        }

        public IEnumerable<Subject> AddSubjects(IEnumerable<Subject> subjects)
        {
            var query = _db.Subjects.AddRange(subjects);
            _db.SaveChanges();

            return query;
        }

        public bool AnySubject()
        {
            return _db.Subjects.Any();
        }
    }
}