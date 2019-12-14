using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface IContentItemRepository
    {
        MaxPageSize GetMaxPageSize();

        Task<ContentItemsCount> GetCount(
            string tenant,
            string id,
            string name,
            string alias,
            string module,
            string type,
            string parentId,
            string createdBy,
            string sectionItems,
            string content,
            string attribute01,
            string attribute02,
            string attribute03,
            string attribute04,
            string attribute05,
            string attribute06,
            string attribute07,
            string attribute08,
            string attribute09,
            string attribute10,
            string attribute11,
            string attribute12,
            string attribute13,
            string attribute14,
            string attribute15,
            string attribute16,
            string attribute17,
            string attribute18,
            string attribute19,
            string attribute20,
            bool includeChildren,
            bool includeParents
        );

        Task<List<ContentItem>> Get(
            string tenant,
            string id,
            string name,
            string alias,
            string module,
            string type,
            string parentId,
            string createdBy,
            string sectionItems,
            string content,
            string attribute01,
            string attribute02,
            string attribute03,
            string attribute04,
            string attribute05,
            string attribute06,
            string attribute07,
            string attribute08,
            string attribute09,
            string attribute10,
            string attribute11,
            string attribute12,
            string attribute13,
            string attribute14,
            string attribute15,
            string attribute16,
            string attribute17,
            string attribute18,
            string attribute19,
            string attribute20,
            bool includeChildren,
            bool includeParents,
            string orderBy,
            int page,
            int pageSize,
            int offset
        );

        Task<IEnumerable<ContentSectionItem>> GetContentSectionItemsByContentItemId(string id);
        Task<ContentItem> AddOrUpdate(ContentItem item, string userId, bool isAdmin);
        Task<ContentItem> Add(ContentItem item);
        Task<bool> AliasExists(ContentItem item);
        Task<ContentItem> Update(ContentItem item, string userId, bool isAdmin);
        Task<ContentItem> Delete(string id, string userId, bool isAdmin);
        Task<ContentItem> CreateProfileIfNotExists(string tenant, string userId, string alias, string email);
    }
}