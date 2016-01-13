using System.Collections.Generic;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
        public IEnumerable<Tag> FetchTags()
        {
            return _db.Tags;
        }
    }
}
