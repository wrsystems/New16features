using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IEntryRepository
    {
        void AddEntry(Entry Entry);
        void DeleteEntry(Entry Entry);
        Task<Entry> GetEntryById(int id);
        Task<IEnumerable<EntryDto>> GetEntryBySubject(string currentUsername, string subject);
        Task<bool> SaveAllAsync();
        Task<AppUser> GetUserByUsernameAsyncEntry(string username);
    }
}