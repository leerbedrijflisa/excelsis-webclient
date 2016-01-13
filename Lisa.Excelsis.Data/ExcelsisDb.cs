using System.Data.Entity;

namespace Lisa.Excelsis.Data
{
    public class ExcelsisDb : DbContext
    {   
        public ExcelsisDb() : base(@"Data source=(localdb)\v11.0;Initial Catalog=ExcelsisDb;Integrated Security=true;multipleactiveresultsets=true;")
        {
        }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<Assessment> Assessments { get; set; }
        public DbSet<Assessor> Assessors { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Criterium> Criteria { get; set; }
        public DbSet<Observation> Observations { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Result> Results { get; set; }               
    }
}
