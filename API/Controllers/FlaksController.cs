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
    public class FlaksController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IFlakRepository _flakRepository;
        private readonly IMapper _mapper;
        public FlaksController(IUserRepository userRepository, IFlakRepository flakRepository, 
            IMapper mapper)
        {
            _mapper = mapper;
            _flakRepository = flakRepository;
            _userRepository = userRepository;
        }

 
    // *******************  First endpoint
        [HttpPost]
        public async Task<ActionResult<FlakDto>> CreateFlak(CreateFlakDto createFlakDto)
        {
            var username = User.GetUsername();

            if (username == createFlakDto.RecipientUsername.ToLower())
                return BadRequest("You cannot send FLAKS !! to yourself dumbhead ");

            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var recipient = await _userRepository.GetUserByUsernameAsync(createFlakDto.RecipientUsername);

            if (recipient == null) return NotFound();

            var flak = new Flak
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createFlakDto.Content
            };

            _flakRepository.AddFlak(flak);

            if (await _flakRepository.SaveAllAsync()) return Ok(_mapper.Map<FlakDto>(flak));

            return BadRequest("Failed to send FLAK !! ");

        }


        // ********************** second endpoint paging used by service.ts for Flaks testing
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlakDto>>> GetFlaksForUser([FromQuery] 
            FlakParams flakParams)
        {
            flakParams.Username = User.GetUsername();

            var flaks = await _flakRepository.GetFlaksForUser(flakParams);

            Response.AddPaginationHeader(flaks.CurrentPage, flaks.PageSize, 
                flaks.TotalCount, flaks.TotalPages);

            return flaks;
        }

        // ----------------------------------------------------------------------------------------
        // ********************** TRIAL endpoint paging used by service.ts for FlakCards
         // ----------------------------------------------------------------------------------------

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<FlakDto>>> GetFlaksForSingleUser([FromQuery] 
        //     FlakParams flakParams)
        // {
        //     flakParams.Username = User.GetUsername();

        //     var flaks = await _flakRepository.GetFlaksForUser(flakParams);

        //     Response.AddPaginationHeader(flaks.CurrentPage, flaks.PageSize, 
        //         flaks.TotalCount, flaks.TotalPages);

        //     return flaks;
        // }

        // *******************  Third endpoint
        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<FlakDto>>> GetFlakThread(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await _flakRepository.GetFlakThread(currentUsername, username));
        }


        // *******************  Fourth endpoint
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFlak(int id)
        {
            var username = User.GetUsername();

            var flak = await _flakRepository.GetFlak(id);

            if (flak.Sender.UserName != username && flak.Recipient.UserName != username) 
                return Unauthorized();

            if (flak.Sender.UserName == username) flak.SenderDeleted = true;

            if (flak.Recipient.UserName == username) flak.RecipientDeleted = true;

            if (flak.SenderDeleted && flak.RecipientDeleted) 
                _flakRepository.DeleteFlak(flak);

            if (await _flakRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem deleting the FLAK !! ");
        }
    }
}