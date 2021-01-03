using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions   // static class
    {
        public static string GetUsername(this ClaimsPrincipal user)  // static , return string 
            // above: this ClaimsPrincipal is what we are extending,  then specify user
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
            // above: return the username from the claims principal
            // old code in usercontroller was:
            // var username = User.FindFirst(ClaimTypes.NameIdentifier)?.value;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}