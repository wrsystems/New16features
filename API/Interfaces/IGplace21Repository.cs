using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IGplace21Repository
    {
        void AddGplace21(Gplace Gplace);
        void DeleteGplace21(Gplace Gplace);
        // Task<Gplace> GetGplaceById(int id);
        void UpdateGplace21(Gplace Gplace);
        Task<bool> SaveAllAsync();
    }
}