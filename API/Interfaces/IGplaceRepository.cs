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
        // Task<Gplace> GetGplaceById(int id);
        void UpdateGplace(Gplace Gplace);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<GplaceDto>> GetGplaceByFullDescription(string fullDescription);
        Task<GplaceDto> GetGplaceByPlaceId(string placeId);

        Task<AppUser> GetUserByUsernameAsyncGplace(string username);

        // added two below 1-7-21 
        Task<IEnumerable<GplaceGetIdDto>> GetEntryGplaceById(int id);
        Task<GplaceDto> GetGplaceById(int id);

        // 01-24-21
        Task<GplaceDto> GetPlaceForEntryRepo(string username, int entryid);
        
    }
}