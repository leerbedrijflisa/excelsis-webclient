using System.Collections.Generic;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
        public IEnumerable<Student> FetchStudents()
        {
            return _db.Students;
        }

        public Student AddStudent(Student student)
        {
            var query = _db.Students.Add(student);
            _db.SaveChanges();

            return query;
        }

        public IEnumerable<Student> AddStudents(IEnumerable<Student> students)
        {
            var query = _db.Students.AddRange(students);
            _db.SaveChanges();

            return query;
        }
    }
}