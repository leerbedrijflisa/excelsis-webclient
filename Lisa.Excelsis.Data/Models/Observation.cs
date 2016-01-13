using System.ComponentModel.DataAnnotations;

namespace Lisa.Excelsis.Data
{
    public class Observation
    {
        [Key]
        public int Id { get; set; }
        public virtual Criterium Criterium { get; set; }
        public int AssessmentId { get; set; }
        public string Result { get; set; }
        public string Marks { get; set; }
    }
}
