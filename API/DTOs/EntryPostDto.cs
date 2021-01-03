using System;

namespace API.DTOs
{
    public class EntryPostDto
    {
        public int Id { get; set; }
        public DateTime? DateCreated { get; set; } = DateTime.Now;
        public bool SentToFlak { get; set; }
        public DateTime DateSentToFlak { get; set; }

        public int OrgId { get; set; }
        public string OrgName { get; set; }
        public string PlaceId { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string StarRating { get; set; }

        public int UserId { get; set; }
        public string UserName { get; set; }
        
        public bool UserDeleted { get; set; }
        public bool UseAnony { get; set; }
        public bool UseEmail { get; set; }
        public bool UseAddress { get; set; }
        public bool UseAll { get; set; }
         public bool UsePhone { get; set; }
        public bool FormSubmitted { get; set; }
    }
}