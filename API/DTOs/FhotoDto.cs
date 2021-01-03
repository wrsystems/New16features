using System;

namespace API.DTOs
{
    public class FhotoDto
    {
        public int Id { get; set; }
        public string? Url { get; set; }
        public bool? IsMain { get; set; }
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public int? OrgId { get; set; }
        public string? OrgName { get; set; }
        public string? PublicId { get; set; }
        public int? EntryId { get; set; }
        public int? FlakId { get; set; }
        public int? FhotoSrc { get; set; }
        public DateTime? DateCreated { get; set; } = DateTime.Now;
    }
}