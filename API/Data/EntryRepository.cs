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
    public class EntryRepository : IEntryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EntryRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

    // first method - - need to add Entry to datacontext & appusers for ICollections
        public void AddEntry(Entry entry)
        {
            _context.Entrys.Add(entry);
        }

    // // second method
        public void DeleteEntry(Entry entry)
        {
            _context.Entrys.Remove(entry);
        }

    // third method
        public async Task<Entry> GetEntryById(int id)
        {
            return await _context.Entrys
                .SingleOrDefaultAsync(e => e.Id == id);
        }

    // fourth method
        public async Task<IEnumerable<EntryDto>> GetEntryBySubject(string username, 
            string subject)
        {

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" Entrys Repository", username);
                Console.WriteLine(" ********************** ");

        // Note: think context.Entrys means specific db table
            var Entrys = await _context.Entrys
                .Where(e => e.Subject == subject
                        //  .Where(e => e.UserName == username && e.Subject == subject
                )
                .ToListAsync();

            return _mapper.Map<IEnumerable<EntryDto>>(Entrys);
        }

    // fifth method
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        // copied user rep and renamed "Entry" 11/13
        public async Task<AppUser> GetUserByUsernameAsyncEntry(string username)
        {

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" Entrys Repository AsyncEntry ", username);
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