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

namespace API.Controllers
{
    [Authorize]
    public class EntrysController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IEntryRepository _entryRepository;
        private readonly IMapper _mapper;
        public EntrysController(IUserRepository userRepository, IEntryRepository entryRepository, 
            IMapper mapper)
        {
            _mapper = mapper;
            _entryRepository = entryRepository;
            _userRepository = userRepository;
        }

        // private static readonly int myuser8 = 8;  // assign variable a value 11/13

    // *******************  First endpoint
        [HttpPost]
        public async Task<ActionResult<EntryDto>> AddEntry(EntryPostDto entryPostDto)
        {
            // var username = User.GetUsername();

            // if (username == createEntryDto.RecipientUsername.ToLower())
            //     return BadRequest("You cannot send EntryS !! to yourself dumbhead ");

            // var sender = await _userRepository.GetUserByUsernameAsync(username);
            // var recipient = await _userRepository.GetUserByUsernameAsync(createEntryDto.RecipientUsername);

            // if (recipient == null) return NotFound();


                Console.WriteLine(" ********************** ");
                Console.WriteLine(" ** From Entrs Controller POST ** ");
                // Console.WriteLine(" Entrys Repository AsyncEntry ", username);
                Console.WriteLine(" ********************** ");

            // look-up username from the token in ClaimsPrincipleExtensions
            var user = await _entryRepository.GetUserByUsernameAsyncEntry(User.GetUsername());
            var currentUsername = user.UserName;

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
                UserId = user.Id,
                UserName = user.UserName,

                UserDeleted = entryPostDto.UserDeleted,
                UseEmail = entryPostDto.UseEmail,
                UseAddress = entryPostDto.UseAddress,
                UsePhone = entryPostDto.UsePhone,
                UseAll = entryPostDto.UseAll

            };

            // _mapper.Map(entryPostDto, entry);  // not yet work: missing type map configuration

            _entryRepository.AddEntry(entry);

            if (await _entryRepository.SaveAllAsync()) return Ok(_mapper.Map<EntryDto>(entry));

            return BadRequest("Failed to save the POSTED Entry !! ");

        }

       // *******************  second endpoint (12-24 merged from old flak controller)
       // 12-20 This is the main method for Entry to get cards *******************************************
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

        // *******************  Forth endpoint
        [HttpGet("id/{id}")]
        public async Task<ActionResult<IEnumerable<EntryDto>>> GetEntryById(int id)
        {
            return Ok(await _entryRepository.GetEntryById(id));
        }

        // *******************  Fourth endpoint
        // [HttpDelete("{id}")]
        // public async Task<ActionResult> DeleteEntry(int id)
        // {
        //     var username = User.GetUsername();

        //     var flak = await _entryRepository.GetEntry(id);

        //     if (flak.Sender.UserName != username && flak.Recipient.UserName != username) 
        //         return Unauthorized();

        //     if (flak.Sender.UserName == username) flak.SenderDeleted = true;

        //     if (flak.Recipient.UserName == username) flak.RecipientDeleted = true;

        //     if (flak.SenderDeleted && flak.RecipientDeleted) 
        //         _flakRepository.DeleteFlak(flak);

        //     if (await _flakRepository.SaveAllAsync()) return Ok();

        //     return BadRequest("Problem deleting the FLAK !! ");
        // }
    }
}