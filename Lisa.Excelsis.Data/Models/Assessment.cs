using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lisa.Excelsis.Data
{
    public class Assessment
    {
        [Key]
        public int Id { get; set; }
        public int ExamId { get; set; }
        public virtual ICollection<Assessor> Assessors { get; set; }
        public virtual Student Student { get; set; }
        public DateTime Assessed { get; set; }
        public virtual IList<Observation> Observations { get; set; }        
    }
}
