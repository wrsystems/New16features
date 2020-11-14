using System;

namespace API.Entities
{
    public class Organization
    {
        public int Id { get; set; }
        public string SourceId { get; set; }
        public string OrgName { get; set; }
        public string MailAddress { get; set; }
        public string MailCity { get; set; }
        public string MailState { get; set; }
        public string MailZipcode { get; set; }
        public string LegalName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public string Phone { get; set; }
        public string SecondAddress { get; set; }
        public string SICCode { get; set; }
        public string SICName { get; set; }
        public string Title { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactAreaCode { get; set; }
        public string ContactPhoneSeven { get; set; }
        public string BusinessCategory { get; set; }
        public string BusinessSize { get; set; }
        public string SourceName { get; set; }
        public int ParentOrgId { get; set; }
        public string Email { get; set; }
        public int PhotoId { get; set; }  
  
    }
}