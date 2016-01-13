using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lisa.Excelsis.Data
{
    public class Exam
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Subject Subject { get; set; }
        public string Organization { get; set; }
        public string Cohort { get; set; }
        public string Crebo { get; set; }
        public int DocumentationId { get; set; }
        public virtual IList<Criterium> Questions { get; set; }
    }   
}
