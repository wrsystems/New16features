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
    public class OrganizationsController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrganizationRepository _organizationRepository;
        private readonly IMapper _mapper;
        public OrganizationsController(IUserRepository userRepository, IOrganizationRepository organizationRepository, 
            IMapper mapper)
        {
            _mapper = mapper;
            _organizationRepository = organizationRepository;
            _userRepository = userRepository;
        }

        // ******************** endpoint ADD FOR TESTING ONLY 11/13, returns one row
          [HttpGet()]
         public async Task<IActionResult> GetOrganizations()
         {
              var organizationFromRepo = await _organizationRepository.GetOrganizations();

              if (organizationFromRepo == null)
                 return NotFound();

              return Ok (organizationFromRepo);
         }

        // ******************** endpoint
          [HttpGet("id/{id}")]
         public async Task<IActionResult> GetOrganizationById(int id)
         {
              var organizationFromRepo = await _organizationRepository.GetOrganizationById(id);

              if (organizationFromRepo == null)
                 return NotFound();

              return Ok (organizationFromRepo);
         }

        // *******************  endpoint
        [HttpGet("name/{orgname}")]
        public async Task<ActionResult<IEnumerable<OrganizationDto>>> GetOrganizationByName(string orgname)
        {
            // var currentUsername = User.GetUsername();

            return Ok(await _organizationRepository.GetOrganizationByName(orgname));
        }


        // ADD  CREATE ORGANIZATION SOMETIME LATER 11/12 -- took out flak copied code
        // ADD  DELETE ORGANIZATION SOMETIME LATER 11/12 -- took out flak copied code

    }
}