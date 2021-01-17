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

namespace API.Controllers
{
    [Authorize]
    public class Gplace21Controller : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IGplace21Repository _gplace21Repository;
        private readonly IMapper _mapper;
        public Gplace21Controller(IUserRepository userRepository, IGplace21Repository gplace21Repository, 
            IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _gplace21Repository = gplace21Repository;
            _userRepository = userRepository;
            _context = context;
        }

        // private static readonly int myuser8 = 8;  // assign variable a value 11/13

    // **********************************************
    // *******************  First endpoint Writes google details when selected to db, lots of sups expected
    // ***********************************************
        [HttpPost]
        public async Task<ActionResult<Gplace>> AddGplace21(Gplace gplacePostDto)
        {

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

                _gplace21Repository.AddGplace21(gplace);

            //    _context.Gplaces.Add(gplace);
            //     await _context.SaveChangesAsync();
         
                int id = gplace.Id;
                Console.WriteLine(" <<<<<<<<<<<<<<<<==============================");
                Console.WriteLine("Gplace Id: " + id.ToString() + " gplace.id: " + id.ToString());

            if (await _gplace21Repository.SaveAllAsync()) return Ok(_mapper.Map<GplaceDto>(gplace));

            return BadRequest("Failed to send Gplace21 !! ");
            // return Ok(id);

        }


    // ****************************************************************************
    // *******************  Called By entry-home.ts  -- UPDATE --
    // ****************************************************************************

        [HttpPut]
        public async Task<ActionResult> UpdateGplace21(GplaceGetIdDto placeDto)
        {
            // var currentUsername = User.GetUsername();

            // var Id = placeDto.Id;
            // var x = await _gplace21Repository.GetGplaceById(Id);   // read the row

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

            _gplace21Repository.UpdateGplace21(gplace);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update gplace21 BADLY!! ");
        }

    }
}