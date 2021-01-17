using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => 
                    src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => 
                    src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
            
            // 11/12 need organization, entry added guess order is <source, destination> revised 11/13
            CreateMap<Organization, OrganizationDto>();
            // CreateMap<Entry, EntryDto>();

            // 11/16 need to post entry added guess order is <source, destination> revised 11/13
            CreateMap<Entry, EntryDto>();

            // 12/7 need to post Gplaces added guess order is <source, destination> 
            CreateMap<Gplace, GplaceDto>();

            // 01-07-21 need to post Gplaces added guess order is <source, destination> 
            CreateMap<Gplace, GplaceGetIdDto>();

            // 12/26 new
            CreateMap<Flak, FlakDto>();    // updated 12-26
            // 01-14-21
            CreateMap<FlakDto, Flak>(); 
            CreateMap<GplaceDto, Gplace>();  

            // 12/26 new
            CreateMap<Fhoto, FhotoDto>();
            CreateMap<Fhoto, FhotoGetIdDto>();


        }
    }
}