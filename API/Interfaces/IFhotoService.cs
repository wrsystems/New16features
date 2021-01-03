using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IFhotoService
    {
        Task<ImageUploadResult> AddFhotoAsync(IFormFile file);
        Task<DeletionResult> DeleteFhotoAsync(string publicId);
    }
}