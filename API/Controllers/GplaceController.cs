using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Data;
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

namespace API.Controllers
{
    [Authorize]
    public class GplaceController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IGplaceRepository _gplaceRepository;
        private readonly IMapper _mapper;
        public GplaceController(IUserRepository userRepository, IGplaceRepository gplaceRepository, 
            IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _gplaceRepository = gplaceRepository;
            _userRepository = userRepository;
            _context = context;
        }

        // private static readonly int myuser8 = 8;  // assign variable a value 11/13

    // **********************************************
    // *******************  First endpoint Writes google details when selected to db, lots of sups expected
    // ***********************************************
        [HttpPost]
        public async Task<ActionResult<Gplace>> AddGplace(Gplace gplacePostDto)
        {
            // var username = User.GetUsername();

            // if (username == createEntryDto.RecipientUsername.ToLower())
            //     return BadRequest("You cannot send EntryS !! to yourself dumbhead ");

            // var sender = await _userRepository.GetUserByUsernameAsync(username);
            // var recipient = await _userRepository.GetUserByUsernameAsync(createEntryDto.RecipientUsername);

            // if (recipient == null) return NotFound();

            var gplace = new Gplace
            {
                Gname = gplacePostDto.Gname,
                EntryId = gplacePostDto.EntryId,
                FullDescription = gplacePostDto.FullDescription,
                FullAddress = gplacePostDto.FullAddress,
                PostCode = gplacePostDto.PostCode,
                PlaceId = gplacePostDto.PlaceId,
                Phone = gplacePostDto.Phone,
                StreetNumber = gplacePostDto.StreetNumber,
                Street = gplacePostDto.Street,
                City = gplacePostDto.City,
                State = gplacePostDto.State,
                Country = gplacePostDto.Country,
                CountryShort = gplacePostDto.CountryShort,
                PlaceUrl = gplacePostDto.PlaceUrl,
                FormSubmitted = gplacePostDto.FormSubmitted,
                UseOrg = gplacePostDto.UseOrg,
                OrgId = gplacePostDto.OrgId,

                UserId = gplacePostDto.UserId,
                UserName = gplacePostDto.UserName,
                OrgName = gplacePostDto.OrgName,
                Match = gplacePostDto.Match,

            };

                _gplaceRepository.AddGplace(gplace);

            //    _context.Gplaces.Add(gplace);
            //     await _context.SaveChangesAsync();
         
                int id = gplace.Id;
                Console.WriteLine(" <<<<<<<<<<<<<<<<==============================");
                Console.WriteLine("Gplace Id: " + id.ToString() + " gplace.id: " + id.ToString());

            if (await _gplaceRepository.SaveAllAsync()) return Ok(_mapper.Map<GplaceDto>(gplace));

            return BadRequest("Failed to send Gplace !! ");
            // return Ok(id);

        }


    // ========================================================
    // **************  Get Gplace For Specific EntryId
    // ========================================================

        [HttpGet("entry/{entryid}")]
        public async Task<ActionResult<GplaceDto>> GetPlaceForEntity(int entryid)
        {
            var username = User.GetUsername();  // get username from token
                Console.WriteLine(" <<<<<<<<<<<<<<< Gplace <==============================");
                Console.WriteLine("username: " + username + "   entryid : " + entryid.ToString());

            var place = await _gplaceRepository.GetPlaceForEntryRepo(username, entryid);

            // if (await _gplaceRepository.SaveAllAsync()) return Ok(_mapper.Map<GplaceDto>(place));
            //     return BadRequest("Failed to retrieve the Gplace rows !! ");
        
            return Ok(place);

        }

    // ========================================================
    // **************  Get Gplace For Specific EntryId  TEST  TEST  TEST
    // ========================================================

        [HttpGet("eid/{id}")]
         public async Task<Gplace> GetPlaceById(int id)
         {
            var place = await _context.Gplaces.FirstOrDefaultAsync(e => e.EntryId == id);
              return place;
         }



        // ************************************
        // *******************  Second endpoint  not sure if this is EVER USED ??
        // *************************************

        [HttpGet("subject/{subject}")]
        public async Task<ActionResult<IEnumerable<GplaceDto>>> GetGplaceByFullDescription(string fullDescription)
        {
            // var currentUsername = User.GetUsername();
            // look-up username from the token in ClaimsPrincipleExtensions
            // var user = await _gplaceRepository.GetUserByUsernameAsyncGplace(User.GetUsername());
            // var currentUsername = user.UserName;

            return Ok(await _gplaceRepository.GetGplaceByFullDescription(fullDescription));
        }

        // ************************************
        // *******************  Third endpoint  Bring back google to match entry placeId (string)
        // *************************************

        [HttpGet("placeid/{placeId}")]
        public async Task<ActionResult<GplaceDto>> GetGplaceByPlaceId(string placeId)
        {
            return Ok(await _gplaceRepository.GetGplaceByPlaceId(placeId));
        }

    // ****************************************************************************
    // *******************  Called By entry-home.ts  -- UPDATE --
    // ****************************************************************************

        [HttpPut]
        public async Task<ActionResult> UpdateGplace(GplaceGetIdDto placeDto)
        {
            // var currentUsername = User.GetUsername();

            var Id = placeDto.Id;
            var x = await _gplaceRepository.GetGplaceById(Id);   // read the row

            var gplace = new Gplace
            {
                Id = placeDto.Id,
                EntryId = placeDto.EntryId,
                Gname = placeDto.Gname,
                FullDescription = placeDto.FullDescription,
                FullAddress = placeDto.FullAddress,
                PostCode = placeDto.PostCode,
                PlaceId = placeDto.PlaceId,
                Phone = placeDto.Phone,
                StreetNumber = placeDto.StreetNumber,
                Street = placeDto.Street,
                City = placeDto.City,
                State = placeDto.State,
                Country = placeDto.Country,
                CountryShort = placeDto.CountryShort,
                PlaceUrl = placeDto.PlaceUrl,
                FormSubmitted = placeDto.FormSubmitted,
                UseOrg = placeDto.UseOrg,
                OrgId = placeDto.OrgId,

                UserId = placeDto.UserId,
                UserName = placeDto.UserName,
                OrgName = placeDto.OrgName,
                Match = placeDto.Match,
            };

            _gplaceRepository.UpdateGplace(gplace);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update gplace BADLY!! ");
        }


    }
}