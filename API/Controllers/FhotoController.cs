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

using System.Linq;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using API.Data;

using System.Security.Claims;
using Microsoft.AspNetCore.Http;    // 01-05-2021 think what needed for IformFile

namespace API.Controllers
{
    [Authorize]
    public class FhotoController : BaseApiController
    {

         private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IFhotoRepository _fhotoRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public FhotoController(IUserRepository userRepository, IFhotoRepository fhotoRepository, 
            IMapper mapper, IPhotoService photoService, DataContext context)
        {
            _photoService = photoService;
            _context = context;
            _mapper = mapper;
            _fhotoRepository = fhotoRepository;
            _userRepository = userRepository;
        }

    // ********************************************************
    // *******************  First endpoint POST USED IN TESTING  For Postman
    // ********************************************************
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

    // ****************************************************************************
    // *******************  Called By fhoto-loading.ts Using uploader.onSuccessItem 
    // ****************************************************************************

        [HttpPost("add-photo")]
        public async Task<ActionResult<FhotoDto>> AddFhoto(IFormFile file)  // return FhotoDto method name AddPhoto
                    // get IformFile, call it file NICE AND SIMPLE, JUST TAKE IN FILE
        {
            var result = await _photoService.AddPhotoAsync(file);     // ADD To Cloudinary's web site
            // keep using the name "photo" on above -- name is hardcoding in photo.service file
            // above: variable for the result (json)
            // above: accepts as input a file, uploads to Cloudinary & returns result (json) 

            if (result.Error != null) return BadRequest(result.Error.Message);  // check if error & include error message
                    // above: not actually returning anything, but rather sending message BadRequest ?? lookup.
                    // above: return aborts rest of processing.

            var fhoto = new Fhoto   // means we are going to add to database
            {
                Url = result.SecureUrl.AbsoluteUri,   // get values from json
                PublicId = result.PublicId,            // get values from json
                FhotoSrc = 1,    // hardcode source 1 is what ??
            };

            _fhotoRepository.AddFhoto(fhoto);

           if (await _fhotoRepository.SaveAllAsync()) return Ok(_mapper.Map<FhotoDto>(fhoto));
                return BadRequest("Problem: Failed to save the POSTED Fhoto !! ");

        }

    // ****************************************************************************
    // *******************  Called By fhoto-loading.ts  -- DELETE --
    // ****************************************************************************

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var fhoto = await _fhotoRepository.GetFhotoById(photoId);

                if (fhoto == null) return NotFound();

                if (fhoto.IsMain) return BadRequest("You cannot delete your main photo");

                if (fhoto.PublicId != null)  // delete from Cloudinary but must have PublicID to do so
                {
                    var result = await _photoService.DeletePhotoAsync(fhoto.PublicId);
                        if (result.Error != null) return BadRequest(result.Error.Message);
                }

            _fhotoRepository.DeleteFhoto(fhoto);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete the photo");
        }

    // ****************************************************************************
    // *******************  Called By fhoto-loading.ts  -- UPDATE --
    // ****************************************************************************

        [HttpPut]
        public async Task<ActionResult> UpdateFhoto(FhotoGetIdDto fhotoDto)
        {
            var FhotoId = fhotoDto.Id;
            var x = await _fhotoRepository.GetEntryFhotoById(FhotoId);   // read the row

            var fhoto = new Fhoto
            {
                Id = fhotoDto.Id,
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

            // _mapper.Map(memberUpdateDto, user);  // can not figure out so moving along

            _fhotoRepository.UpdateFhoto(fhoto);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update fhoto BADLY!! ");
        }

        // *******************  Third endpoint (12-24 merged from old flak controller)
        // [HttpGet("username/{username}")]
        // public async Task<ActionResult<IEnumerable<FhotoDto>>> GetFhotoUsername(string username)
        // {
        //     var currentUsername = User.GetUsername();

        //     return Ok(await _fhotoRepository.GetFhotoUsername(currentUsername));
        // }

        // +++++++++++++++++++++++++++++++++++++++++
        // *******************  Fourth endpoint  -- PROBLEM
        // +++++++++++++++++++++++++++++++++++++++++
        [HttpGet("entry/{id}")]
        public async Task<ActionResult<IEnumerable<FhotoGetIdDto>>> GetEntryFhotoById(int id)
        {

            // return await _context.Fhotos.Where (f => f.EntryId == id );
            //     // .Include(e => e.Id == id);

            // var hardId = 16;
            return Ok(await _fhotoRepository.GetEntryFhotoById(id));


            // if (fhotoFromRepo == null)
            //      return NotFound();

            // return Ok (fhotoFromRepo);
        }

    // ========================================================
    // **************  Get Fhotos For Specific EntryId  TEST  TEST  USED USED USED 
    // ========================================================

        [HttpGet("eid/{id}")]
         public async Task<Fhoto> GetFhotoByEid(int id)
         {
            var fhotos = await _context.Fhotos.FirstOrDefaultAsync(e => e.EntryId == id);

            return fhotos;
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