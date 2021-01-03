using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IFlakRepository
    {
        void AddFlak(Flak Flak);
        void DeleteFlak(Flak Flak);
        Task<Flak> GetFlakById(int id);
        Task<IEnumerable<FlakDto>> GetFlakBySubject(string currentUsername);
        Task<bool> SaveAllAsync();
        
        // Task<AppUser> GetUserByUsernameAsyncFlak(string username);
        Task<IEnumerable<FlakDto>> GetFlakUsername(string currentUsername);
    }
}