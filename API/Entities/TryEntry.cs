using System;
using System.Collections.Generic;

namespace FlakAPI.Models
{
    public class TryEntry
    {
        public int        Id { get; set; }
        public int        AccId { get; set; }
        public int        AccVwwId { get; set; }
        public DateTime   Created { get; set; }
        public bool       IsSent { get; set; }
        public DateTime   DateSent { get; set; }

        public bool       UseAnony { get; set; }
        public bool       UseEmail { get; set; }
        public bool       UseAddress { get; set; }
        public bool       UsePhone { get; set; }
        public bool       UseAll  { get; set; }

        public string     Subject { get; set; }
        public string     MessageContent { get; set; }
        public string     CategoryL1 { get; set; }
        public string     CategoryL2 { get; set; }
        public string     CategoryL3 { get; set; }
        public string     StarRating { get; set; }

        public bool       IsToEmployee { get; set; }
        public int        Sendee { get; set; }

        public int        OrgId { get; set; }
        public bool       IsEmail { get; set; }
        public string     Email { get; set; }

        public string     Name { get; set; }
        public string     ShortName { get; set; }
        public string     AbbrevName { get; set; }
        public bool       IsPhone { get; set; }
        public int        OrgContact { get; set; }
        public int        PhoneExtension { get; set; }
        
        public bool       IsAddress { get; set; }
        public string     AddressL1 { get; set; }
        public string     AddressL2 { get; set; }
        public string     City { get; set; }
        public string     State { get; set; }
        public int        Postal { get; set; }
        public int        PostalDigits { get; set; }
        public string     EmailDomain { get; set; }

      }
}