using System.ComponentModel.DataAnnotations;

namespace Lisa.Excelsis.Data
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
