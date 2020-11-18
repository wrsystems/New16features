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

            var entry = new Entry
            {
                Subject = entryPostDto.Subject,
                Content = entryPostDto.Content,
                OrgName = entryPostDto.OrgName,
                // OrgId = entryPostDto.OrgId,
                // UseAnony = entryPostDto.UseAnony
            };

            _entryRepository.AddEntry(entry);

            if (await _entryRepository.SaveAllAsync()) return Ok(_mapper.Map<EntryDto>(entry));

            return BadRequest("Failed to send Entry !! ");

        }


        // *******************  Third endpoint
        [HttpGet("subject/{subject}")]
        public async Task<ActionResult<IEnumerable<EntryDto>>> GetEntryBySubject(string subject)
        {
            // var currentUsername = User.GetUsername();
            // look-up username from the token in ClaimsPrincipleExtensions
            var user = await _entryRepository.GetUserByUsernameAsyncEntry(User.GetUsername());
            var currentUsername = user.UserName;

            return Ok(await _entryRepository.GetEntryBySubject(currentUsername, subject));
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