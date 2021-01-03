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


    // 12-24 copied from old flak repo
    // 12-20 main task
    // 11/4 note parans are now changed - -  *********************************************
        public async Task<PagedList<EntryDto>> GetEntrysForUser(EntryParams entryParams)
        {
            var query = _context.Entrys
                
                .Where(m=>m.UserName == entryParams.Username )  // 11-10 I added this !!!! Worked
                .OrderByDescending(m => m.DateCreated)
                .AsQueryable();

            // changed 12-19 
            // query = query.Where(u => u.Recipient.UserName == flakParams.Username 
            //         && u.RecipientDeleted == false);

            var entrys = query.ProjectTo<EntryDto>(_mapper.ConfigurationProvider);

            return await PagedList<EntryDto>.CreateAsync(entrys, entryParams.PageNumber, entryParams.PageSize);

            // 12-19 out, change above to not use cntainer value
            // query = flakParams.Container switch
            // {
            //     "Inbox" => query.Where(u => u.Recipient.UserName == flakParams.Username 
            //         && u.RecipientDeleted == false),
            //     "Outbox" => query.Where(u => u.Sender.UserName == flakParams.Username
            //         && u.SenderDeleted == false),
            //     _ => query.Where(u => u.Recipient.UserName ==
            //         flakParams.Username && u.RecipientDeleted == false && u.DateRead == null)
            // };

        }

        public async Task<IEnumerable<EntryDto>> GetEntryUsername(string currentUsername)
        {

            var entrys = await _context.Entrys
                // .Include(u => u.Sender).ThenInclude(p => p.Photos)
                // .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .Where(t => t.UserName == currentUsername  && t.UserDeleted == false
                
                        // && m.Sender.UserName == recipientUsername
                        // || m.Recipient.UserName == recipientUsername
                        // && m.Sender.UserName == currentUsername && m.SenderDeleted == false
                )
                .OrderBy(m => m.DateCreated)
                .ToListAsync();

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" Flak Point BBBBBBBBBBB ");
                Console.WriteLine(" ********************** ");

            // var unreadMessages = messages.Where(m => m.DateRead == null 
            //     && m.Recipient.UserName == currentUsername).ToList();

            // if (unreadMessages.Any())
            // {
            //     foreach (var message in unreadMessages)
            //     {
            //         message.DateRead = DateTime.Now;
            //     }

            //     await _context.SaveChangesAsync();
            // }

            return _mapper.Map<IEnumerable<EntryDto>>(entrys);
        }
    }
}