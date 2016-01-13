using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lisa.Excelsis.Data
{
    public class Subject
    {
        public Subject()
        {
            Assessors = new List<Assessor>();
        }
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Assessor> Assessors { get; set; }


    }
}
