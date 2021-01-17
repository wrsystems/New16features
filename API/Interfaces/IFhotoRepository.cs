using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IFhotoRepository
    {
        void AddFhoto(Fhoto Fhoto);
        void DeleteFhoto(Fhoto Fhoto);
        void UpdateFhoto(Fhoto Fhoto);

        Task<Fhoto> GetFhotoById(int id);
        
        // below one has been problem to me
        Task<IEnumerable<FhotoGetIdDto>> GetEntryFhotoById(int id);
        Task<IEnumerable<FhotoDto>> GetFhotoByUsername(string currentUsername);
        Task<bool> SaveAllAsync();

    }
}