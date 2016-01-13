using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lisa.Excelsis.Data
{
    public class Assessor
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public virtual ICollection<Assessment> Assessments { get; set; }
        public virtual ICollection<Subject> Subjects { get; set; }
    }
}
