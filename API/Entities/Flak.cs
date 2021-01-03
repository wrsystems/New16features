using System;

namespace API.Entities
{
    public class Flak
    {  
        public int Id { get; set; }
        public DateTime? DateCreated { get; set; } = DateTime.Now;
        public DateTime? DateFirstRead { get; set; }
        public bool? HasBeenRead { get; set; }
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public int? OrgId { get; set; }
        public string? OrgName { get; set; }
        public string? Subject { get; set; }
        public string? Content { get; set; }
        public bool? UserCreated { get; set; }
        public bool? OrgCreated { get; set; }
        public bool? UserDeleted { get; set; }
        public bool? OrgDeleted { get; set; }
        public bool? FhotoAdded { get; set; }
        public int? EntryId { get; set; }

    }
}