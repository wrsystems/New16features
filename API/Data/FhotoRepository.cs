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
    public class FhotoRepository : IFhotoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FhotoRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

    // first method - - need to add Fhoto to datacontext & appusers for ICollections
        public void AddFhoto(Fhoto photo)
        {
            _context.Fhotos.Add(photo);
        }

    // // second method
        public void DeleteFhoto(Fhoto photo)
        {
            _context.Fhotos.Remove(photo);
        }


    // method return entry fhotos 
        public async Task<Fhoto> GetEntryFhotoById(int id)
        {
            return await _context.Fhotos
                .FirstOrDefaultAsync(e => e.EntryId == id);
        }

    // third method
        public async Task<Fhoto> GetFhotoById(int id)
        {
            return await _context.Fhotos
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        // public async Task<Organization> GetOrganizationById(int id)
        // {
        //     return await _context.Organizations.FirstOrDefaultAsync(o => o.Id == id);


    // fifth method
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        // copied user rep and renamed "Fhoto" 11/13
        // // 12-26 has ERRORS !!, so commented for now
        // public async Task<AppUser> GetUserByUsernameAsyncFhoto(string username)   

        //     return await _context.Users
        //         .SingleOrDefaultAsync(x => x.UserName == username);

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<IEnumerable<FhotoDto>> GetFhotoByUsername(string currentUsername)
        {

            var photos = await _context.Fhotos
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
                Console.WriteLine(" Fhoto Point BBBBBBBBBB ");
                Console.WriteLine(" ********************** ");

            return _mapper.Map<IEnumerable<FhotoDto>>(photos);
        }
    }
}