using System.Collections.Generic;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
        public IEnumerable<Result> FetchResults()
        {
            return _db.Results;
        }
    }
}
