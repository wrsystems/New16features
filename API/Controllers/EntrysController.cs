using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using API.Data;

namespace API.Controllers
{
    [Authorize]
    public class EntrysController : BaseApiController
    {

        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IEntryRepository _entryRepository;
        private readonly IMapper _mapper;
        public EntrysController(IUserRepository userRepository, IEntryRepository entryRepository, 
            IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _entryRepository = entryRepository;
            _userRepository = userRepository;
            _context = context;
        }

    // ************************************************
    // *******************  First endpoint POST
    // *************************************************
          // public async Task<ActionResult<EntryDto>> AddEntry(EntryPostDto entryPostDto)
        // {
        //     // look-up username from the token in ClaimsPrincipleExtensions & return user entity
        //     var user = await _entryRepository.GetUserByUsernameAsyncEntry(User.GetUsername());

        //     var entry = new Entry
        [HttpPost]
        public async Task<ActionResult<Entry>> AddEntry(Entry entryPostDto)
        {
            // look-up username from the token in ClaimsPrincipleExtensions & return user entity
            // var user =  _entryRepository.GetUserByUsernameAsyncEntry(User.GetUsername());
            // var user =  _entryRepository.GetUserByUsernameAsyncEntry(User.GetUsername());
            // await _entryRepository.SaveAllAsync();

            var entry = new Entry
            {
                Subject = entryPostDto.Subject,
                Content = entryPostDto.Content,
                OrgName = entryPostDto.OrgName,
                OrgId = entryPostDto.OrgId,
                UseAnony = entryPostDto.UseAnony,
                SentToFlak = entryPostDto.SentToFlak,
                PlaceId = entryPostDto.PlaceId,
                FormSubmitted = entryPostDto.FormSubmitted,
                StarRating = entryPostDto.StarRating,
                // UserId = entryPostDto.UserId,
                // UserName = entryPostDto.UserName,
                UserId = entryPostDto.UserId,
                UserName = entryPostDto.UserName,
                // UserName = user.UserName,

                UserDeleted = entryPostDto.UserDeleted,
                UseEmail = entryPostDto.UseEmail,
                UseAddress = entryPostDto.UseAddress,
                UsePhone = entryPostDto.UsePhone,
                UseAll = entryPostDto.UseAll

            };

                _context.Entrys.Add(entry);
                await _context.SaveChangesAsync();

            // var entry2 = await _entryRepository.AddEntryReturnId(entry);

                int id = entry.Id;
                Console.WriteLine(" <<<<<<<<<<<<<<<<==============================");
                Console.WriteLine("Entry Id: " + id.ToString() + " entry.id: " + id.ToString());

        //    if (await _entryRepository.SaveAllAsync()) return Ok(_mapper.Map<EntryDto>(entry2));
        //         return BadRequest("Failed to send Entry !! ");

            return Ok(id); 
            // return Ok(_mapper.Map<EntryDto>(entry)); 

            // if (await _entryRepository.SaveAllAsync()) return Ok(_mapper.Map<EntryDto>(entry2));

            // return BadRequest("Failed to save the POSTED Entry !! ");
            // note: only part in quotes returned to network response 
        }


        // ******************************************************************************
        // *******************  second endpoint (12-24 merged from old flak controller)
        // 12-20 This is the main method for Entry to get cards *************************
        // ******************************************************************************
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntryDto>>> GetEntryForUser([FromQuery] 
            EntryParams entryParams)
        {
            // flakParams.Username = "ruthie";  // only for testing 
            entryParams.Username = User.GetUsername(); // 12-19 this should work, function is in ...look at definition

            var entrys = await _entryRepository.GetEntrysForUser(entryParams);

            Response.AddPaginationHeader(entrys.CurrentPage, entrys.PageSize, 
                entrys.TotalCount, entrys.TotalPages);

            return entrys;
        }

        // *******************  Third endpoint (12-24 merged from old flak controller)
        [HttpGet("username/{username}")]
        public async Task<ActionResult<IEnumerable<EntryDto>>> GetEntryUsername(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await _entryRepository.GetEntryUsername(currentUsername));
        }


        // *******************  Forth endpoint
        [HttpGet("subject/{subject}")]
        public async Task<ActionResult<IEnumerable<EntryDto>>> GetEntryBySubject(string subject)
        {
            // var currentUsername = User.GetUsername();
            // look-up username from the token in ClaimsPrincipleExtensions
            var user = await _entryRepository.GetUserByUsernameAsyncEntry(User.GetUsername());
            var currentUsername = user.UserName;

            return Ok(await _entryRepository.GetEntryBySubject(currentUsername, subject));
        }

        // *******************  Fifth endpoint
        [HttpGet("id/{id}")]
        public async Task<ActionResult<IEnumerable<EntryDto>>> GetEntryById(int id)
        {
            return Ok(await _entryRepository.GetEntryById(id));
        }

        // *******************  Sixth endpoint  01-08-21 JUST TO GET TEST -- S/B Deleted
        
        [HttpGet("threeq/{username, orgname, placeid}")]
        public async Task<ActionResult<IEnumerable<EntryDto>>> GetEntryJustWritten
                    (string  username, string orgname, string placeid)
        {
            return Ok(await _entryRepository.GetEntryJustWritten(username, orgname, placeid));
        }


    // ************************************************
    // *******************  First endpoint POST
    // *************************************************
        // [HttpPost]
        // public async Task<ActionResult<EntryDto>> AddEntry(EntryPostDto entryPostDto)
        // {
        //     // look-up username from the token in ClaimsPrincipleExtensions & return user entity
        //     var user = await _entryRepository.GetUserByUsernameAsyncEntry(User.GetUsername());

        //     var entry = new Entry
        //     {
        //         Subject = entryPostDto.Subject,
        //         Content = entryPostDto.Content,
        //         OrgName = entryPostDto.OrgName,
        //         OrgId = entryPostDto.OrgId,
        //         UseAnony = entryPostDto.UseAnony,
        //         SentToFlak = entryPostDto.SentToFlak,
        //         PlaceId = entryPostDto.PlaceId,
        //         FormSubmitted = entryPostDto.FormSubmitted,
        //         StarRating = entryPostDto.StarRating,
        //         // UserId = entryPostDto.UserId,
        //         // UserName = entryPostDto.UserName,
        //         UserId = user.Id,
        //         UserName = user.UserName,

        //         UserDeleted = entryPostDto.UserDeleted,
        //         UseEmail = entryPostDto.UseEmail,
        //         UseAddress = entryPostDto.UseAddress,
        //         UsePhone = entryPostDto.UsePhone,
        //         UseAll = entryPostDto.UseAll

        //     };

        //     var entry2 = await _entryRepository.AddEntryReturnId(entry);

        //         int id = entry2.Id;
        //         Console.WriteLine(" <<<<<<<<<<<<<<<<==============================");
        //         Console.WriteLine("Entry2 Id: " + id.ToString() + " entry2.id: " + id.ToString());

        // //    if (await _entryRepository.SaveAllAsync()) return Ok(_mapper.Map<EntryDto>(entry2));
        // //         return BadRequest("Failed to send Entry !! ");

        //     return Ok(_mapper.Map<EntryDto>(entry2)); 

        //     // if (await _entryRepository.SaveAllAsync()) return Ok(_mapper.Map<EntryDto>(entry2));

        //     // return BadRequest("Failed to save the POSTED Entry !! ");
        //     // note: only part in quotes returned to network response 
        // }


    }
}