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
         Task<bool> SaveAllAsync();
        Task<IEnumerable<FlakDto>> GetFlakUsername(string currentUsername);
        Task<IEnumerable<FlakDto>> GetFlaksForEntryRepo(string username, int entryid);
    }
}