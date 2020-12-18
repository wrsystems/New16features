using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IGplaceRepository
    {
        void AddGplace(Gplace Gplace);
        void DeleteGplace(Gplace Gplace);
        Task<Gplace> GetGplaceById(int id);
        Task<IEnumerable<GplaceDto>> GetGplaceByFullDescription(string currentUsername, string subject);
        Task<bool> SaveAllAsync();
        Task<AppUser> GetUserByUsernameAsyncGplace(string username);
    }
}