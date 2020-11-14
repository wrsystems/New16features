using System;

namespace API.Entities
{
    public class Entry
    {
        public int Id { get; set; }
        public DateTime? Created { get; set; } = DateTime.Now;
        public bool SentToFlak { get; set; }
        public DateTime DateSentToFlak { get; set; }

        public int OrgId { get; set; }
        public string OrgName { get; set; }
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
  
    }
}