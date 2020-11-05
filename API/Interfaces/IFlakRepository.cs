using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IFlakRepository
    {
        void AddFlak(Flak flak);
        void DeleteFlak(Flak flak);
        Task<Flak> GetFlak(int id);
        Task<PagedList<FlakDto>> GetFlaksForUser(FlakParams flakParams);
        Task<IEnumerable<FlakDto>> GetFlakThread(string currentUsername, string recipientUsername);
        Task<bool> SaveAllAsync();
    }
}