using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface IConfigRepository
    {
        Task<bool> IsInitialized();
        Task<bool> SetInitialSettings();
        Task<List<Config>> Get(string id, string module, string name);
        Task<Config> AddOrUpdate(Config config, bool isSuperAdmin);
        Task<Config> Add(Config config, bool isSuperAdmin);
        Task<Config> Update(Config config, bool isSuperAdmin);
        Task<Config> Delete(string id);
    }
}