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
        Task<Fhoto> GetFhotoById(int id);
        Task<Fhoto> GetEntryFhotoById(int id);
        Task<IEnumerable<FhotoDto>> GetFhotoByUsername(string currentUsername);
        Task<bool> SaveAllAsync();
        
        // Task<IEnumerable<FhotoDto>> GetFhotoUsername(string currentUsername);

        // Task<AppUser> GetUserByUsernameAsyncFhoto(string username);
    }
}