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
        public void UpdateGplace(Gplace gplace)
        {
            _context.Entry(gplace).State = EntityState.Modified;
        }


    // =======================================================================
    // *****  Get place that matches entry id and username  01-14-21
    // =======================================================================
        public async Task<GplaceDto> GetPlaceForEntryRepo(string username, int entryid)
        {
            // var place = await _context.Gplaces
            //     .Where(f => f.UserName == username && f.EntryId == entryid )
            //     .ToListAsync();

            var place = await _context.Gplaces.SingleOrDefaultAsync
            (f => f.UserName == username && f.EntryId == entryid );

            return _mapper.Map<GplaceDto>(place);

            // return place;   
            // return _mapper.Map<GplaceDto>(place);     
            // return _mapper.Map<IEnumerable<GplaceDto>>(place);
        }




    //  ************************************
    //  method return gplacess using entryId  note used in controller 01-11
    //  ************************************
        public async Task<IEnumerable<GplaceGetIdDto>> GetEntryGplaceById(int id)
        {
            var places = await _context.Gplaces
                .Where(f => f.EntryId == id)
                .ToListAsync();

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" Fhoto Repo BBBBBBBBBB ");
                Console.WriteLine(" ********************** ");

            return _mapper.Map<IEnumerable<GplaceGetIdDto>>(places);       
        }

    // ***************************************
    // **********   third method
    // ***************************************
        public async Task<GplaceDto> GetGplaceByPlaceId(string placeId)
        {
            var Gplaces = await _context.Gplaces
                .SingleOrDefaultAsync(e => e.PlaceId == placeId);

            return _mapper.Map<GplaceDto>(Gplaces);

        }

    // ******************************************************************
    // **********   method to get place so we can update it with entry-id
    // ******************************************************************
        public async Task<GplaceDto> GetGplaceById(int Id)
        {
            var Gplaces = await _context.Gplaces
                .SingleOrDefaultAsync(e => e.Id == Id);

            return _mapper.Map<GplaceDto>(Gplaces);

        }

    // fourth method
        public async Task<IEnumerable<GplaceDto>> GetGplaceByFullDescription(string fullDescription)
        {

        // Note: think context.Entrys means specific db table
            var Gplaces = await _context.Gplaces
                .Where(e => e.FullDescription == fullDescription
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