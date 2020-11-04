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
                return BadRequest("You cannot send FLAKS !! messages to yourself dumbhead ");

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

            return BadRequest("Failed to send FLAK !! message");

        }


        // ********************** second endpoint DO NOT USE  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlakDto>>> GetFlaksForUser([FromQuery] 
            MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var flaks = await _flakRepository.GetFlaksForUser(messageParams);

            // Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, 
            //     messages.TotalCount, messages.TotalPages);

            return flaks;
        }


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

            return BadRequest("Problem deleting the FLAK !! message");
        }
    }
}