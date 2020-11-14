using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IOrganizationRepository
    {
        void AddOrganization(Organization Organization);
        void DeleteOrganization(Organization Organization);
        Task<Organization> GetOrganizations();

        // should this be orgid of just id?
        Task<Organization> GetOrganizationById(int id); // probablly ok do not think flak has used, good for postman testing

        // Below intended for paged retrieval and using cards
        // Task<PagedList<OrganizationDto>> GetOrganizationsForUser(OrganizationParams OrganizationParams);

        Task<IEnumerable<OrganizationDto>> GetOrganizationByName(string currentOrgname);
        Task<bool> SaveAllAsync();
    }
}