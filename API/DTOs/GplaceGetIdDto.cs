using System;

namespace API.DTOs
{
    public class GplaceGetIdDto
    {
        public int Id { get; set; }
        
        #nullable enable
         public int EntryId { get; set; }
        public string? PlaceId { get; set; }
        public string? Gname { get; set;}
        public string? FullDescription { get; set; }
        public string? Phone { get; set; }
        public string? FullAddress { get; set; }
        public string? StreetNumber { get; set; }
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? PostCode { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? CountryShort { get; set; }
        public string? PlaceUrl { get; set; }
        public bool UseOrg { get; set; }
        public int OrgId { get; set; }
        public bool FormSubmitted { get; set; }

        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? OrgName { get; set; }
        public string? Match { get; set; }

    }
}