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

    // second method
        public void DeleteFlak(Flak flak)
        {
            _context.Flaks.Remove(flak);
        }

        public async Task<Flak> GetFlak(int id)
        {
            return await _context.Flaks
                .Include(u => u.Sender)
                .Include(u => u.Recipient)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

    // 11/4 note parans are now changed - -  *********************************************
        public async Task<PagedList<FlakDto>> GetFlaksForUser(FlakParams flakParams)
        {
            var query = _context.Flaks
                .Where(m=>m.Sender.UserName == flakParams.Username )  // 11-10 I added this !!!! Worked
                .OrderByDescending(m => m.FlakSent)
                .AsQueryable();

            query = flakParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == flakParams.Username 
                    && u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.Sender.UserName == flakParams.Username
                    && u.SenderDeleted == false),
                _ => query.Where(u => u.Recipient.UserName ==
                    flakParams.Username && u.RecipientDeleted == false && u.DateRead == null)
            };

            var flaks = query.ProjectTo<FlakDto>(_mapper.ConfigurationProvider);

            return await PagedList<FlakDto>.CreateAsync(flaks, flakParams.PageNumber, flakParams.PageSize);

        }

        public async Task<IEnumerable<FlakDto>> GetFlakThread(string currentUsername, 
            string recipientUsername)
        {
        // Note: think context.Flaks means specific db table
            var flaks = await _context.Flaks
                .Include(u => u.Sender).ThenInclude(p => p.Photos)
                .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .Where(m => m.Recipient.UserName == currentUsername && m.RecipientDeleted == false
                        && m.Sender.UserName == recipientUsername
                        || m.Recipient.UserName == recipientUsername
                        && m.Sender.UserName == currentUsername && m.SenderDeleted == false
                )
                .OrderBy(m => m.FlakSent)
                .ToListAsync();

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

            return _mapper.Map<IEnumerable<FlakDto>>(flaks);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}