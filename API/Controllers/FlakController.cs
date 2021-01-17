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

// 12-27
using System.Linq;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using API.Data;


namespace API.Controllers
{
    [Authorize]
    public class FlakController : BaseApiController
    {

        private readonly DataContext _context;
         private readonly IUserRepository _userRepository;
        private readonly IFlakRepository _flakRepository;
        private readonly IMapper _mapper;
        public FlakController(IFlakRepository flakRepository, IUserRepository userRepository,
            IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _flakRepository = flakRepository;
            _userRepository = userRepository;
            _context = context;
        }

        // private static readonly int myuser8 = 8;  // assign variable a value 11/13
    // ========================================================
    // *******************  First endpoint POST
    // ========================================================

        [HttpPost]
        public async Task<ActionResult<FlakDto>> AddFlak(FlakPostDto flakPostDto)
        {
            // var username = User.GetUsername();

            // if (username == createFlakDto.RecipientUsername.ToLower())
            //     return BadRequest("You cannot send FlakS !! to yourself dumbhead ");

            // var sender = await _userRepository.GetUserByUsernameAsync(username);
            // var recipient = await _userRepository.GetUserByUsernameAsync(createFlakDto.RecipientUsername);

            // if (recipient == null) return NotFound();


                Console.WriteLine(" ********************** ");
                Console.WriteLine(" ** From Flak Controller POST ** ");
                Console.WriteLine(" ********************** ");

            // look-up username from the token in ClaimsPrincipleExtensions
            // var user = await _flakRepository.GetUserByUsernameAsyncFlak(User.GetUsername());
            // var currentUsername = user.UserName;

            var flak = new Flak
            {

                DateCreated = flakPostDto.DateCreated,
                DateFirstRead = flakPostDto.DateFirstRead,
                HasBeenRead = flakPostDto.HasBeenRead,
                UserId = flakPostDto.UserId,
                UserName = flakPostDto.UserName,
                OrgName = flakPostDto.OrgName,
                OrgId = flakPostDto.OrgId,
                Subject = flakPostDto.Subject,
                Content = flakPostDto.Content,
                UserCreated = flakPostDto.UserCreated,
                OrgCreated = flakPostDto.OrgCreated,
                UserDeleted = flakPostDto.UserDeleted,
                OrgDeleted = flakPostDto.OrgDeleted,
                FhotoAdded = flakPostDto.FhotoAdded,
                EntryId = flakPostDto.EntryId,
            
                // UserId = user.Id,
                // UserName = user.UserName,

            };

            // _mapper.Map(flakPostDto, flak);  // not yet work: missing type map configuration

            _flakRepository.AddFlak(flak);

            if (await _flakRepository.SaveAllAsync()) return Ok(_mapper.Map<FlakDto>(flak));

            return BadRequest("Failed to save the POSTED Flak !! ");

        }

    // ========================================================
    // *******************  Get Flaks For Specific Entry
    // ========================================================

        [HttpGet("entry/{entryid}")]
        public async Task<ActionResult<IEnumerable<FlakDto>>> GetFlaksForEntry(int entryid)
        {
            var username = User.GetUsername();  // get username from token
                Console.WriteLine(" <<<<<<<<<<<<<<<<==============================");
                Console.WriteLine("username: " + username + "   entryid : " + entryid.ToString());
                //  Console.WriteLine("Gplace Id: " + id.ToString() + " gplace.id: " + id.ToString());


            var flaks = await _flakRepository.GetFlaksForEntryRepo(username, entryid);

            // if (await _flakRepository.SaveAllAsync()) return Ok(_mapper.Map<FlakDto>(flaks));
            //     return BadRequest("Failed to retrieve the Flak rows !! ");
        
            return Ok(flaks);

        }

        // ****************************************************************************
        // *******************  Read all the flaks for a specified user  (Wrong !!)
        // Should read all the flaks for specified username (or id) PLUS entry.id 
        // ****************************************************************************

        [HttpGet("username/{username}")]
        public async Task<ActionResult<IEnumerable<FlakDto>>> GetFlakUsername(string username)
        {
            var currentUsername = username;
            return Ok(await _flakRepository.GetFlakUsername(currentUsername));
        }


        // *******************  Forth endpoint
        // [HttpGet("subject/{subject}")]
        // public async Task<ActionResult<IEnumerable<FlakDto>>> GetFlakBySubject(string subject)
        // {
        //     // var currentUsername = User.GetUsername();
        //     // look-up username from the token in ClaimsPrincipleExtensions
        //     var user = await _flakRepository.GetUserByUsernameAsyncFlak(User.GetUsername());
        //     var currentUsername = user.UserName;

        //     return Ok(await _flakRepository.GetFlakBySubject(currentUsername, subject));
        // }

        // *******************  Forth endpoint
        // [HttpGet("id/{id}")]
        // public async Task<ActionResult<IEnumerable<FlakDto>>> GetFlakById(int id)
        // {
        //     return Ok(await _flakRepository.GetFlakById(id));
        // }

        [HttpGet("id/{id}")]
         public async Task<Flak> GetFlakById(int id)
         {
                Console.WriteLine(" ********************** ");
                Console.WriteLine(" ** Flak ID    Flak ID ** ");
                Console.WriteLine(" ********************** ");

                // return await _context.Flaks.FirstOrDefaultAsync(e => e.Id == id);
                // var flakFromRepo = await _flakRepository.GetFlakById(id);

            //   var flakFromRepo = await _context.Flaks.FirstOrDefaultAsync(e => e.Id == id);

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" ** Flak ID Return From Repo ** ");
                Console.WriteLine(" ********************** ");

            //   if (flakFromRepo == null)
            //      return NotFound();

            // var flak = new Flak
            // {
            //     DateCreated = null,
            //     DateFirstRead = null,
            //     HasBeenRead = null,
            //     UserId = 987,
            //     UserName = "typed in name",
            //     OrgName = "typed on org name",
            //     OrgId = 345,
            //     Subject = "here is subject",
            //     Content = " this is content",
            //     UserCreated = null,
            //     OrgCreated = null,
            //     UserDeleted = null,
            //     OrgDeleted = null,
            //     FhotoAdded = null,
            //     EntryId = 777;
            //     // UserId = user.Id,
            //     // UserName = user.UserName,

            // };

                var flak = await _context.Flaks.FirstOrDefaultAsync(e => e.Id == id);

              return flak;
         }


        // *******************  Fourth endpoint
        // [HttpDelete("{id}")]
        // public async Task<ActionResult> DeleteFlak(int id)
        // {
        //     var username = User.GetUsername();

        //     var flak = await _flakRepository.GetFlak(id);

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