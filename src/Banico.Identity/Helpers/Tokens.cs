

using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Banico.Identity.Auth;
using Banico.Identity.Models;
using Newtonsoft.Json;

namespace Banico.Identity.Helpers
{
    public class Tokens
    {
      public static async Task<string> GenerateJwt(
        ClaimsIdentity identity, 
        IJwtFactory jwtFactory,
        string userName, 
        bool isAdmin,
        JwtIssuerOptions jwtOptions, 
        JsonSerializerSettings serializerSettings)
      {
        var response = new
        {
          id = identity.Claims.Single(c => c.Type == "id").Value,
          username = userName,
          auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
          expires_in = (int)jwtOptions.ValidFor.TotalSeconds,
          is_admin = isAdmin
        };

        return JsonConvert.SerializeObject(response, serializerSettings);
      }
    }
}
