using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class GplaceRepository : IGplaceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public GplaceRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

    // first method - - need to add Entry to datacontext & appusers for ICollections
        public void AddGplace(Gplace gplace)
        {
            _context.Gplaces.Add(gplace);
        }

    // // second method
        public void DeleteGplace(Gplace gplace)
        {
            _context.Gplaces.Remove(gplace);
        }

    // third method
        public async Task<Gplace> GetGplaceById(int id)
        {
            return await _context.Gplaces
                .SingleOrDefaultAsync(e => e.Id == id);
        }

    // fourth method
        public async Task<IEnumerable<GplaceDto>> GetGplaceByFullDescription(string username, 
            string subject)
        {

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" Gplaces Repository", username);
                Console.WriteLine(" ********************** ");

        // Note: think context.Entrys means specific db table
            var Gplaces = await _context.Gplaces
                .Where(e => e.FullDescription == subject
                        //  .Where(e => e.UserName == username && e.Subject == subject
                )
                .ToListAsync();

            return _mapper.Map<IEnumerable<GplaceDto>>(Gplaces);
        }

    // fifth method
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        // copied user rep and renamed "Entry" 11/13
        public async Task<AppUser> GetUserByUsernameAsyncGplace(string username)
        {

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" Gplaces Repository AsyncEntry ", username);
                Console.WriteLine(" ********************** ");

            return await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}