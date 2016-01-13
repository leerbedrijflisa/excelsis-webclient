using System.Collections.Generic;

namespace Lisa.Excelsis.Data
{
    public partial class Database
    {
        public IEnumerable<Observation> FetchObservations()
        {
           return _db.Observations;
        }

        public Observation AddObservation(Observation observation)
        {
            var query = _db.Observations.Add(observation);
            _db.SaveChanges();

            return query;
        }

        public IEnumerable<Observation> AddObservations(IEnumerable<Observation> observations)
        {
            var query = _db.Observations.AddRange(observations);
            _db.SaveChanges();

            return query;
        }
    }
}