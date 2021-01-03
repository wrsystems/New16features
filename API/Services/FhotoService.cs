using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class FhotoService : IFhotoService
    {
        private readonly Cloudinary _cloudinary;   // this is a constructor
        public FhotoService(IOptions<CloudinarySettings> config)   // use IOptions interface to get configuration when setup class
                // above: is also a constructor
        {
            var acc = new Account   // be careful of the ordering to match appsettings & class 
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);  // say our private variable equals new account 
        }

        public async Task<ImageUploadResult> AddFhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();   // so we have something to store our result in

            if (file.Length > 0)    // see if in file parameter 
            {
                using var stream = file.OpenReadStream();   // using stream because want to dispose of when finished
                          // above: getting our file as a stream of data (not async method)

                var uploadParams = new ImageUploadParams    // create upload parameters
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                        // make square aspect 500 for both crop fill gravity face -- bad for me !! change probably
                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams);  // where we actually upload!!
            }

            return uploadResult;  // this is a json file (see site documentation for complete list)
        }

        public async Task<DeletionResult> DeleteFhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);  // publicid required for deletion

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }
    }
}