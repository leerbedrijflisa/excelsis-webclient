using System.ComponentModel.DataAnnotations;

namespace Lisa.Excelsis.Data
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
    }
}
