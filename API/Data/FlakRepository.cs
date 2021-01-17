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
    public class FlakRepository : IFlakRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FlakRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

    // first method - - need to add Flak to datacontext & appusers for ICollections
        public void AddFlak(Flak flak)
        {
            _context.Flaks.Add(flak);
        }

    // // second method
        public void DeleteFlak(Flak flak)
        {
            _context.Flaks.Remove(flak);
        }

    // third method
        public async Task<Flak> GetFlakById(int id)
        {
                Console.WriteLine(" ********************** ");
                Console.WriteLine(" Flak Repo Flak Repo  ");
                Console.WriteLine(" ********************** ");

            return await _context.Flaks.FirstOrDefaultAsync(e => e.Id == id);

            // var flaks = await _context.Flaks
            //     .Where(f => f.Id == id )
            //     .ToListAsync();

            //     Console.WriteLine(" ********************** ");
            //     Console.WriteLine(" Flak Repo Before Return  ");
            //     Console.WriteLine(" ********************** ");

            // return _mapper.Map<IEnumerable<FlakDto>>(flaks);

        }
        
    // =======================================================================
    // *****  Get flak(s) records that match entry id (may not be any)
    // =======================================================================
        public async Task<IEnumerable<FlakDto>> GetFlaksForEntryRepo(string username, int entryid)
        {

            var flaks = await _context.Flaks
                .Where(f => f.UserName == username && f.EntryId == entryid )
                .ToListAsync();

            return _mapper.Map<IEnumerable<FlakDto>>(flaks);
        }


    // fifth method
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        // 12-27 took out looking for problem 
        // // copied user rep and renamed "Flak" 11/13
        // public async Task<AppUser> GetUserByUsernameAsyncFlak(string username)
        // {

        //     return await _context.Users
        //         .SingleOrDefaultAsync(x => x.UserName == username);
        // }

        // public async Task<AppUser> GetUserByIdAsync(int id)
        // {
        //     return await _context.Users.FindAsync(id);
        // }

        public async Task<IEnumerable<FlakDto>> GetFlakUsername(string currentUsername)
        {
            var flaks = await _context.Flaks
                // .Include(u => u.Sender).ThenInclude(p => p.Photos)
                // .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .Where(t => t.UserName == currentUsername 
                
                        // && m.Sender.UserName == recipientUsername
                        // || m.Recipient.UserName == recipientUsername
                        // && m.Sender.UserName == currentUsername && m.SenderDeleted == false
                )
                .OrderBy(m => m.DateCreated)
                .ToListAsync();

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" Flak Point BBBBBBBBBBB ");
                Console.WriteLine(" ********************** ");

            return _mapper.Map<IEnumerable<FlakDto>>(flaks);
        }




    }
}