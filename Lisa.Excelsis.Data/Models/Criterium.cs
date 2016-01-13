using System.ComponentModel.DataAnnotations;

namespace Lisa.Excelsis.Data
{
    public class Criterium
    {
        [Key]
        public int Id { get; set; }
        public int Order { get; set; }
        public string Description { get; set; }
        public string Explanation { get; set; }
        public string value { get; set; }
        public int ExamId { get; set; }
    }
}
