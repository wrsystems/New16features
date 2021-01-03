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
    public class FhotoController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IFhotoRepository _fhotoRepository;
        private readonly IMapper _mapper;
        public FhotoController(IUserRepository userRepository, IFhotoRepository fhotoRepository, 
            IMapper mapper)
        {
            _mapper = mapper;
            _fhotoRepository = fhotoRepository;
            _userRepository = userRepository;
        }

    // *******************  First endpoint
        [HttpPost]
        public async Task<ActionResult<FhotoDto>> AddFhoto(FhotoDto fhotoDto)
        {

                Console.WriteLine(" ********************** ");
                Console.WriteLine(" ** From Fhoto Controller POST ** ");
                Console.WriteLine(" ********************** ");

            // look-up username from the token in ClaimsPrincipleExtensions
            // var user = await _fhotoRepository.GetUserByUsernameAsyncFhoto(User.GetUsername());
            // var currentUsername = user.UserName;

            var fhoto = new Fhoto
            {
                Url = fhotoDto.Url,
                IsMain = fhotoDto.IsMain,
                UserId = fhotoDto.UserId,
                UserName = fhotoDto.UserName,
                OrgId = fhotoDto.OrgId,
                OrgName = fhotoDto.OrgName,
                PublicId = fhotoDto.PublicId,
                EntryId = fhotoDto.EntryId,
                FlakId = fhotoDto.FlakId,
                FhotoSrc = fhotoDto.FhotoSrc,
                DateCreated = fhotoDto.DateCreated,

            };

            // _mapper.Map(fhotoPostDto, fhoto);  // not yet work: missing type map configuration

            _fhotoRepository.AddFhoto(fhoto);

            if (await _fhotoRepository.SaveAllAsync()) return Ok(_mapper.Map<FhotoDto>(fhoto));
                return BadRequest("Failed to save the POSTED Fhoto !! ");

        }

        // *******************  Third endpoint (12-24 merged from old flak controller)
        // [HttpGet("username/{username}")]
        // public async Task<ActionResult<IEnumerable<FhotoDto>>> GetFhotoUsername(string username)
        // {
        //     var currentUsername = User.GetUsername();

        //     return Ok(await _fhotoRepository.GetFhotoUsername(currentUsername));
        // }


        // *******************  Fourth endpoint
        [HttpGet("entry/{id}")]
        public async Task<ActionResult<IEnumerable<FhotoDto>>> GetEntryFhotoById(int id)
        {
            var fhotoFromRepo = await _fhotoRepository.GetEntryFhotoById(id);

            if (fhotoFromRepo == null)
                 return NotFound();

            return Ok (fhotoFromRepo);
        }

        // *******************  Fifth endpoint
          [HttpGet("id/{id}")]
         public async Task<IActionResult> GetFhotoById(int id)
         {
            var fhotoFromRepo = await _fhotoRepository.GetFhotoById(id);

            if (fhotoFromRepo == null)
                 return NotFound();

            return Ok (fhotoFromRepo);
         }



    }
}