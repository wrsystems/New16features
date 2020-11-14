using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrganizationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

    // first method - - need to add Organization to datacontext 
        public void AddOrganization(Organization organization)
        {
            _context.Organizations.Add(organization);
        }

    // second method
        public void DeleteOrganization(Organization organization)
        {
            _context.Organizations.Remove(organization);
        }


    // 2 1/2 for test method -- copied logic from Flack2/Flack WORKS, now brings back only one row 11/13
        public async Task<Organization> GetOrganizations()
        {

                Console.WriteLine(" ********************** ");
                Console.WriteLine("Org Repository, GetOrganizations");
                Console.WriteLine(" ********************** ");

            return await _context.Organizations.FirstOrDefaultAsync();

            // return await _context.Organizations
            //     .Where(Organizations.Orgid == id )  // 11-10 I added this !!!! Worked in Flak Repo
            //     .SingleOrDefaultAsync(x => x.Id == id);
        }

    // third method -- copied logic from Flack2/Flack
        public async Task<Organization> GetOrganizationById(int id)
        {

                Console.WriteLine(" ********************** ");
                Console.WriteLine("Input id is ", id);   // id not print ??
                Console.WriteLine(" ********************** ");

            return await _context.Organizations.FirstOrDefaultAsync(o => o.Id == id);

            // return await _context.Organizations
            //     .Where(Organizations.Orgid == id )  // 11-10 I added this !!!! Worked in Flak Repo
            //     .SingleOrDefaultAsync(x => x.Id == id);
        }

    // fourth method
        public async Task<IEnumerable<OrganizationDto>> GetOrganizationByName(string currentOrgname)
        {

                Console.WriteLine(" ********************** ");
                Console.WriteLine("Org Repository, GetOrganizationByName");
                Console.WriteLine(" ********************** ");

        // Note: think context.Organizations means specific db table
            var organizations = await _context.Organizations
                .Where(o => o.OrgName == currentOrgname 
                )
                .ToListAsync();

                // right now dto contains all columns 11/12
            return _mapper.Map<IEnumerable<OrganizationDto>>(organizations);
        }

    // fifth method
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}