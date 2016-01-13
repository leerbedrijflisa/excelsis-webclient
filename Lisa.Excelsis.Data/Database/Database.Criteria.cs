using System.Collections.Generic;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
        public IEnumerable<Criterium> FetchCriteria()
        {
            return _db.Criteria;
        }
        
        public Criterium AddCriterium(Criterium criterium)
        {
            var query = _db.Criteria.Add(criterium);
            _db.SaveChanges();

            return query;
        }

        public IEnumerable<Criterium> AddCriteria(IEnumerable<Criterium> criteria)
        {
            var query = _db.Criteria.AddRange(criteria);
            _db.SaveChanges();

            return query;
        }
    }
}