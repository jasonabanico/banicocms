using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.EntityFrameworkCore.Repositories
{
    public class ContentItemRepository : IContentItemRepository
    {
        private const char SEGMENT_DELIM = '_';
        private const char TYPE_DELIM = '~';
        private const char SECTION_DELIM = '*';

        public readonly AppDbContext _dbContext;
        private readonly IConfiguration _configuration;

        private int _maxPageSize = 0;

        public ContentItemRepository(
            AppDbContext dbContext,
            IConfiguration configuration
        )
        {
            _dbContext = dbContext;
            _configuration = configuration;

            string maxPageSize = _configuration["Content:MaxPageSize"];
            int.TryParse(maxPageSize, out _maxPageSize);

            if (_maxPageSize == 0) {
                _maxPageSize = 40;
            }
        }

        public MaxPageSize GetMaxPageSize() {
            MaxPageSize result = new MaxPageSize();
            result.Count = _maxPageSize;

            return result;
        }

        public ContentItemsCount GetCount(
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
        ) {
            var contentItems = from c in _dbContext.ContentItems
                where 
                    (c.Id == id || string.IsNullOrEmpty(id)) &&
                    (c.Module == module || string.IsNullOrEmpty(module)) && 
                    (c.Type == type || string.IsNullOrEmpty(type)) &&
                    (c.Alias == alias || string.IsNullOrEmpty(alias)) && 
                    (c.ParentId == parentId || string.IsNullOrEmpty(parentId)) &&
                    (c.Name == name || string.IsNullOrEmpty(name)) && 
                    (c.CreatedBy == createdBy || string.IsNullOrEmpty(createdBy)) &&
                    (c.Tenant == tenant || c.Tenant == "all" || string.IsNullOrEmpty(tenant))
                select c;

            if (!string.IsNullOrEmpty(name))
            {
                contentItems = contentItems.Where(item => item.Name.Contains(name));
            }

            if (!string.IsNullOrEmpty(content))
            {
                contentItems = contentItems.Where(item => item.Content.Contains(content));
            }

            if (!string.IsNullOrEmpty(attribute01))
            {
                contentItems = contentItems.Where(item => item.Attribute01.Contains(attribute01));
            }

            if (!string.IsNullOrEmpty(attribute02))
            {
                contentItems = contentItems.Where(item => item.Attribute02.Contains(attribute02));
            }

            if (!string.IsNullOrEmpty(attribute03))
            {
                contentItems = contentItems.Where(item => item.Attribute03.Contains(attribute03));
            }

            if (!string.IsNullOrEmpty(attribute04))
            {
                contentItems = contentItems.Where(item => item.Attribute04.Contains(attribute04));
            }

            if (!string.IsNullOrEmpty(attribute05))
            {
                contentItems = contentItems.Where(item => item.Attribute05.Contains(attribute05));
            }

            if (!string.IsNullOrEmpty(attribute06))
            {
                contentItems = contentItems.Where(item => item.Attribute06.Contains(attribute06));
            }

            if (!string.IsNullOrEmpty(attribute07))
            {
                contentItems = contentItems.Where(item => item.Attribute07.Contains(attribute07));
            }

            if (!string.IsNullOrEmpty(attribute08))
            {
                contentItems = contentItems.Where(item => item.Attribute08.Contains(attribute08));
            }

            if (!string.IsNullOrEmpty(attribute09))
            {
                contentItems = contentItems.Where(item => item.Attribute09.Contains(attribute09));
            }

            if (!string.IsNullOrEmpty(attribute10))
            {
                contentItems = contentItems.Where(item => item.Attribute10.Contains(attribute10));
            }

            if (!string.IsNullOrEmpty(attribute11))
            {
                contentItems = contentItems.Where(item => item.Attribute11.Contains(attribute11));
            }

            if (!string.IsNullOrEmpty(attribute12))
            {
                contentItems = contentItems.Where(item => item.Attribute12.Contains(attribute12));
            }

            if (!string.IsNullOrEmpty(attribute13))
            {
                contentItems = contentItems.Where(item => item.Attribute13.Contains(attribute13));
            }

            if (!string.IsNullOrEmpty(attribute14))
            {
                contentItems = contentItems.Where(item => item.Attribute14.Contains(attribute14));
            }

            if (!string.IsNullOrEmpty(attribute15))
            {
                contentItems = contentItems.Where(item => item.Attribute15.Contains(attribute15));
            }

            if (!string.IsNullOrEmpty(attribute16))
            {
                contentItems = contentItems.Where(item => item.Attribute16.Contains(attribute16));
            }

            if (!string.IsNullOrEmpty(attribute17))
            {
                contentItems = contentItems.Where(item => item.Attribute17.Contains(attribute17));
            }

            if (!string.IsNullOrEmpty(attribute18))
            {
                contentItems = contentItems.Where(item => item.Attribute18.Contains(attribute18));
            }

            if (!string.IsNullOrEmpty(attribute19))
            {
                contentItems = contentItems.Where(item => item.Attribute19.Contains(attribute19));
            }

            if (!string.IsNullOrEmpty(attribute20))
            {
                contentItems = contentItems.Where(item => item.Attribute20.Contains(attribute20));
            }

            if (!string.IsNullOrEmpty(sectionItems))
            {
                contentItems = this.MatchSectionItems(contentItems, sectionItems, includeChildren);

                // if (includeParents)
                // {
                //     contentItems = this.MatchParentSectionItems(contentItems, sectionItems);
                // }
            }

            int count = contentItems.Count();          
            ContentItemsCount result = new ContentItemsCount();
            result.Count = count;

            return result;
        }

        public List<ContentItem> Get(
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
            string thenBy,
            int page,
            int pageSize,
            int offset
        ) {
            var contentItems = from c in _dbContext.ContentItems
                where 
                    (c.Id == id || string.IsNullOrEmpty(id)) &&
                    (c.Module == module || string.IsNullOrEmpty(module)) && 
                    (c.Type == type || string.IsNullOrEmpty(type)) && 
                    (c.Alias == alias || string.IsNullOrEmpty(alias)) && 
                    (c.ParentId == parentId || string.IsNullOrEmpty(parentId)) &&
                    (c.Name == name || string.IsNullOrEmpty(name)) && 
                    (c.CreatedBy == createdBy || string.IsNullOrEmpty(createdBy)) &&
                    (c.Tenant == tenant || c.Tenant == "all" || string.IsNullOrEmpty(tenant))
                select c;

            if (!string.IsNullOrEmpty(name))
            {
                contentItems = contentItems.Where(item => item.Name.Contains(name));
            }

            if (!string.IsNullOrEmpty(content))
            {
                contentItems = contentItems.Where(item => item.Content.Contains(content));
            }

            if (!string.IsNullOrEmpty(attribute01))
            {
                contentItems = contentItems.Where(item => item.Attribute01.Contains(attribute01));
            }

            if (!string.IsNullOrEmpty(attribute02))
            {
                contentItems = contentItems.Where(item => item.Attribute02.Contains(attribute02));
            }

            if (!string.IsNullOrEmpty(attribute03))
            {
                contentItems = contentItems.Where(item => item.Attribute03.Contains(attribute03));
            }

            if (!string.IsNullOrEmpty(attribute04))
            {
                contentItems = contentItems.Where(item => item.Attribute04.Contains(attribute04));
            }

            if (!string.IsNullOrEmpty(attribute05))
            {
                contentItems = contentItems.Where(item => item.Attribute05.Contains(attribute05));
            }

            if (!string.IsNullOrEmpty(attribute06))
            {
                contentItems = contentItems.Where(item => item.Attribute06.Contains(attribute06));
            }

            if (!string.IsNullOrEmpty(attribute07))
            {
                contentItems = contentItems.Where(item => item.Attribute07.Contains(attribute07));
            }

            if (!string.IsNullOrEmpty(attribute08))
            {
                contentItems = contentItems.Where(item => item.Attribute08.Contains(attribute08));
            }

            if (!string.IsNullOrEmpty(attribute09))
            {
                contentItems = contentItems.Where(item => item.Attribute09.Contains(attribute09));
            }

            if (!string.IsNullOrEmpty(attribute10))
            {
                contentItems = contentItems.Where(item => item.Attribute10.Contains(attribute10));
            }

            if (!string.IsNullOrEmpty(attribute11))
            {
                contentItems = contentItems.Where(item => item.Attribute11.Contains(attribute11));
            }

            if (!string.IsNullOrEmpty(attribute12))
            {
                contentItems = contentItems.Where(item => item.Attribute12.Contains(attribute12));
            }

            if (!string.IsNullOrEmpty(attribute13))
            {
                contentItems = contentItems.Where(item => item.Attribute13.Contains(attribute13));
            }

            if (!string.IsNullOrEmpty(attribute14))
            {
                contentItems = contentItems.Where(item => item.Attribute14.Contains(attribute14));
            }

            if (!string.IsNullOrEmpty(attribute15))
            {
                contentItems = contentItems.Where(item => item.Attribute15.Contains(attribute15));
            }

            if (!string.IsNullOrEmpty(attribute16))
            {
                contentItems = contentItems.Where(item => item.Attribute16.Contains(attribute16));
            }

            if (!string.IsNullOrEmpty(attribute17))
            {
                contentItems = contentItems.Where(item => item.Attribute17.Contains(attribute17));
            }

            if (!string.IsNullOrEmpty(attribute18))
            {
                contentItems = contentItems.Where(item => item.Attribute18.Contains(attribute18));
            }

            if (!string.IsNullOrEmpty(attribute19))
            {
                contentItems = contentItems.Where(item => item.Attribute19.Contains(attribute19));
            }

            if (!string.IsNullOrEmpty(attribute20))
            {
                contentItems = contentItems.Where(item => item.Attribute20.Contains(attribute20));
            }

            if (!string.IsNullOrEmpty(sectionItems))
            {
                contentItems = this.MatchSectionItems(contentItems, sectionItems, includeChildren);

                // if (includeParents)
                // {
                //     contentItems = this.MatchParentSectionItems(contentItems, sectionItems);
                // }
            }

            Expression<Func<ContentItem, object>> orderBySort = c => c.ChildCount;
            bool orderByIsDescending = true;

            switch(orderBy.ToLower()) 
            {
                case "name":
                    orderBySort = c => c.Name;
                    orderByIsDescending = false;
                    break;
                case "name asc":
                    orderBySort = c => c.Name;
                    orderByIsDescending = false;
                    break;
                case "name desc":
                    orderBySort = c => c.Name;
                    orderByIsDescending = true;
                    break;
                case "createddate":
                    orderBySort = c => c.CreatedDate;
                    orderByIsDescending = false;
                    break;
                case "createddate asc":
                    orderBySort = c => c.CreatedDate;
                    orderByIsDescending = false;
                    break;
                case "createddate desc":
                    orderBySort = c => c.CreatedDate;
                    orderByIsDescending = true;
                    break;
                case "attribute01":
                    orderBySort = c => c.Attribute01;
                    orderByIsDescending = false;
                    break;
                case "attribute01 asc":
                    orderBySort = c => c.Attribute01;
                    orderByIsDescending = false;
                    break;
                case "attribute01 desc":
                    orderBySort = c => c.Attribute01;
                    orderByIsDescending = true;
                    break;
                case "childcount":
                    orderBySort = c => c.ChildCount;
                    orderByIsDescending = false;
                    break;
                case "childcount asc":
                    orderBySort = c => c.ChildCount;
                    orderByIsDescending = false;
                    break;
                case "childcount desc":
                    orderBySort = c => c.ChildCount;
                    orderByIsDescending = true;
                    break;
            }

            IOrderedQueryable<ContentItem> orderedContentItems = null;
            if (orderBySort != null) 
            {
                if (!orderByIsDescending)
                    orderedContentItems = contentItems.OrderBy(orderBySort);
                else
                    orderedContentItems = contentItems.OrderByDescending(orderBySort);
            }
            else
            {
                orderedContentItems = contentItems.OrderBy(c => c.Id);
            }

            Expression<Func<ContentItem, object>> thenBySort = null;
            bool thenByIsDescending = true;

            switch(thenBy.ToLower()) 
            {
                case "name":
                    thenBySort = c => c.Name;
                    thenByIsDescending = false;
                    break;
                case "name asc":
                    thenBySort = c => c.Name;
                    thenByIsDescending = false;
                    break;
                case "name desc":
                    thenBySort = c => c.Name;
                    thenByIsDescending = true;
                    break;
                case "createddate":
                    thenBySort = c => c.CreatedDate;
                    thenByIsDescending = false;
                    break;
                case "createddate asc":
                    thenBySort = c => c.CreatedDate;
                    thenByIsDescending = false;
                    break;
                case "createddate desc":
                    thenBySort = c => c.CreatedDate;
                    thenByIsDescending = true;
                    break;
                case "attribute01":
                    thenBySort = c => c.Attribute01;
                    thenByIsDescending = false;
                    break;
                case "attribute01 asc":
                    thenBySort = c => c.Attribute01;
                    thenByIsDescending = false;
                    break;
                case "attribute01 desc":
                    thenBySort = c => c.Attribute01;
                    thenByIsDescending = true;
                    break;
                case "childcount":
                    thenBySort = c => c.ChildCount;
                    thenByIsDescending = false;
                    break;
                case "childcount asc":
                    thenBySort = c => c.ChildCount;
                    thenByIsDescending = false;
                    break;
                case "childcount desc":
                    thenBySort = c => c.ChildCount;
                    thenByIsDescending = true;
                    break;
            }

            if ((orderedContentItems != null) && (thenBySort != null))
            {
                if (!thenByIsDescending) {
                    orderedContentItems = orderedContentItems.ThenBy(thenBySort);
                }
                else {
                    orderedContentItems = orderedContentItems.ThenByDescending(thenBySort);
                }
            }

            if ((pageSize == 0) || (pageSize > _maxPageSize))
            {
                pageSize = _maxPageSize;
            }

            int skipRows = 0;

            IQueryable<ContentItem> pagedContentItems = orderedContentItems;
            if (offset > 0)
            {
                if (page > 0)
                {
                    skipRows = (page - 1) * pageSize + offset;
                    pagedContentItems = pagedContentItems.Skip(skipRows).Take(pageSize);
                }
                else
                {
                    pagedContentItems = pagedContentItems.Take(offset);
                }
            }
            else
            {
                if (page > 0)
                {
                    skipRows = page * pageSize;
                    pagedContentItems = pagedContentItems.Skip(skipRows).Take(pageSize);
                }
                else
                {
                    pagedContentItems = pagedContentItems.Take(pageSize);
                }
            }

            return pagedContentItems.ToList();
        }

        private IQueryable<ContentItem> MatchSectionItems(
            IQueryable<ContentItem> contentItems,
            string allSectionItems, 
            bool includeChildren)
        {
            var sectionItemsArray = allSectionItems.Split(SECTION_DELIM);
            for (int i = 0; i < sectionItemsArray.Length; i++)
            {
                if (!string.IsNullOrEmpty(sectionItemsArray[i]))
                {
                    var sectionFields = sectionItemsArray[i].Split(TYPE_DELIM);
                    var section = sectionFields[0];
                    var sectionValue = sectionFields[1];
                    var segments = sectionValue.Split(SEGMENT_DELIM);
                    string pathUrl = string.Empty;
                    string alias = segments[segments.Count() - 1];
                    if (segments.Count() > 1)
                    {
                        pathUrl = sectionValue.Substring(0, sectionValue.Length - alias.Length - 1);
                    }

                    if (!string.IsNullOrEmpty(alias))
                    {
                        if (!includeChildren)
                        {
                            contentItems = from ci in contentItems
                                join csi in _dbContext.ContentSectionItems
                                    on ci.Id equals csi.ContentItemId
                                join si in _dbContext.SectionItems
                                    on csi.SectionItemId equals si.Id
                                where 
                                    si.Section == section &&
                                    si.PathUrl == pathUrl &&
                                    si.Alias == alias
                                select ci;
                        } 
                        else
                        {
                            var childrenPathUrl = "";
                            if (pathUrl != "")
                            {
                                childrenPathUrl = pathUrl + SEGMENT_DELIM + alias;
                            }
                            else
                            {
                                childrenPathUrl = alias;
                            }
                            contentItems = from ci in contentItems
                                join csi in _dbContext.ContentSectionItems
                                    on ci.Id equals csi.ContentItemId
                                join si in _dbContext.SectionItems
                                    on csi.SectionItemId equals si.Id
                                where 
                                    si.Section == section &&
                                    ((si.PathUrl == pathUrl &&
                                        si.Alias == alias) ||
                                    (si.PathUrl.StartsWith(childrenPathUrl)))
                                select ci;
                        }
                    }
                }
            }

            return contentItems;
        }

        // private IQueryable<ContentItem> MatchParentSectionItems(
        //     IQueryable<ContentItem> contentItems, 
        //     string allSectionItems)
        // {
        //     var allSectionItemsArray = allSectionItems.Split(SECTION_DELIM);

        //     IQueryable<ContentItem> parentContentItems = contentItems;

        //     for (int i = 0; i < allSectionItemsArray.Length; i++)
        //     {
        //         var typeAndSection = allSectionItemsArray[i].Split(TYPE_DELIM);
        //         List<string> innerList = new List<string>();
        //         var section = typeAndSection[0];
        //         var sectionItems = typeAndSection[1].Split(SEGMENT_DELIM);
        //         string pathUrl = "";
        //         for (int j = 0; j < sectionItems.Length; j++)
        //         {
        //             string alias = sectionItems[j];
        //             Console.WriteLine("INNERLIST = " + j.ToString() + " " + pathUrl + SEGMENT_DELIM + alias);
        //             innerList.Add(pathUrl + SEGMENT_DELIM + alias);

        //             if (pathUrl.Length > 0)
        //             {
        //                 pathUrl = pathUrl + SEGMENT_DELIM;
        //             }

        //             pathUrl = pathUrl + alias;
        //         }

        //         parentContentItems = from ci in parentContentItems
        //                 join csi in this.DbContext.ContentSectionItems
        //                     on ci.Id equals csi.ContentItemId
        //                 join si in this.DbContext.SectionItems
        //                     on csi.SectionItemId equals si.Id
        //                 where 
        //                     si.Section == section &&
        //                     innerList.Contains(si.PathUrl + "_" + si.Alias)
        //                 select ci;
        //     }

        //     contentItems = (from ci in contentItems
        //             select ci)
        //         .Union(from ci in parentContentItems
        //             select ci);
        //     return contentItems;
        // }

        public IEnumerable<ContentSectionItem> GetContentSectionItemsByContentItemId(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var contentSectionItems = from contentSectionItem in _dbContext.ContentSectionItems
                                            where contentSectionItem.ContentItemId == id
                                            select contentSectionItem;

                return contentSectionItems.ToList();
            }

            return new List<ContentSectionItem>();
        }

        public async Task<ContentItem> AddOrUpdate(ContentItem contentItem, string userId, bool isAdmin)
        {
            if (string.IsNullOrEmpty(contentItem.Id)) 
            {
                return await this.Add(contentItem);
            }
            else
            {
                return await this.Update(contentItem, userId, isAdmin);
            }
        }

        private async Task<UserId> GetUserId(string id)
        {
            var userIds = from userId in _dbContext.UserId
                            where userId.Id == id
                            select userId;

            return userIds.FirstOrDefault();
        }

        // Returns no. of objects saved, ie., 1
        public async Task<ContentItem> Add(ContentItem item)
        {
            var aliasExists = await this.AliasExists(item);
            if (aliasExists)
            {
                throw new ArgumentException("Alias " + item.Alias + " exists for this module and type.");
            }

            item.Id = Guid.NewGuid().ToString();
            item.ContentSectionItems = await this.ToContentSectionItems(item.SectionItems);

            _dbContext.ContentItems.Add(item);
            this.UpdateChildCount(item.ParentId, 1);

            var userId = await this.GetUserId(item.CreatedBy);
            if (userId == null)
            {
                userId = new UserId();
                userId.Id = item.CreatedBy;
                _dbContext.UserId.Add(userId);
            }
            UserContent userContent = new UserContent();
            userContent.UserId = item.CreatedBy;
            userContent.ContentItemId = item.Id;
            userContent.Write = true;
            _dbContext.UserContents.Add(userContent);

            var result = await _dbContext.SaveChangesAsync();

            if (result > 0)
            {
                return item;
            }

            return new ContentItem();
        }

        public async Task<bool> AliasExists(ContentItem item)
        {
            if (string.IsNullOrEmpty(item.Alias))
            {
                return false;
            }

            var matchingAlias = from content in _dbContext.ContentItems
                where content.Alias == item.Alias &&
                    content.Module == item.Module &&
                    content.Type == item.Type &&
                    (content.SectionItems == item.SectionItems ||
                    (content.SectionItems == null && item.SectionItems == null)) &&
                    (content.Tenant == item.Tenant || content.Tenant == "all" || item.Tenant == "all")
                    select content;
            
            return await matchingAlias.CountAsync() > 0;
        }

        private async Task<List<ContentSectionItem>> ToContentSectionItems(string sectionItems)
        {
            List<ContentSectionItem> output = new List<ContentSectionItem>();
            if (!string.IsNullOrEmpty(sectionItems))
            {
                var sections = sectionItems.Split(SECTION_DELIM);
                for (int i = 0; i < sections.Count(); i ++)
                {
                    var sectionFields = sections[i].Split(TYPE_DELIM);
                    var section = sectionFields[0];
                    var sectionItemString = sectionFields[1];

                    var segments = sectionItemString.Split(SEGMENT_DELIM);
                    
                    var pathUrl = string.Empty;
                    for (int j = 0; j < segments.Count() - 1; j++)
                    {
                        if (!string.IsNullOrEmpty(pathUrl))
                        {
                            pathUrl += SEGMENT_DELIM;
                        }
                        pathUrl += segments[j];
                    }
                    var alias = segments[segments.Count() - 1];

                    var sectionItem = await (from si in _dbContext.SectionItems
                                        where si.Section == section &&
                                            si.PathUrl == pathUrl &&
                                            si.Alias == alias
                                        select si).ToListAsync();

                    ContentSectionItem contentSectionItem = new ContentSectionItem();

                    if (sectionItem.Count() > 0)
                    {
                        contentSectionItem.Id = Guid.NewGuid().ToString();
                        contentSectionItem.SectionItem = sectionItem.First();
                        output.Add(contentSectionItem);
                    }
                }
            }

            return output;
        }

        public async Task<ContentItem> Update(ContentItem item, string userId, bool isAdmin)
        {
            var updateItem = (this.Get("", item.Id, "", "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", false, false,
            "", "", 0, 1, 0))
                .FirstOrDefault();

            if (updateItem != null)
            {
                if (!(item.Users != null && item.Users.Any(uc => uc.Write && uc.UserId == userId)) && 
                    updateItem.CreatedBy != userId && !isAdmin)
                {
                    throw new UnauthorizedAccessException("Not authorized to update " + item.Id + ".");
                }

                updateItem.Name = item.Name;
                updateItem.Content = item.Content;
                updateItem.Alias = item.Alias;
                updateItem.SectionItems = item.SectionItems;
                if (!string.IsNullOrEmpty(item.SectionItems))
                {
                    updateItem.ContentSectionItems = await this.ToContentSectionItems(item.SectionItems);
                }
                updateItem.Attribute01 = item.Attribute01;
                updateItem.Attribute02 = item.Attribute02;
                updateItem.Attribute03 = item.Attribute03;
                updateItem.Attribute04 = item.Attribute04;
                updateItem.Attribute05 = item.Attribute05;
                updateItem.Attribute06 = item.Attribute06;
                updateItem.Attribute07 = item.Attribute07;
                updateItem.Attribute08 = item.Attribute08;
                updateItem.Attribute09 = item.Attribute09;
                updateItem.Attribute10 = item.Attribute10;
                updateItem.Attribute11 = item.Attribute11;
                updateItem.Attribute12 = item.Attribute12;
                updateItem.Attribute13 = item.Attribute13;
                updateItem.Attribute14 = item.Attribute14;
                updateItem.Attribute15 = item.Attribute15;
                updateItem.Attribute16 = item.Attribute16;
                updateItem.Attribute17 = item.Attribute17;
                updateItem.Attribute18 = item.Attribute18;
                updateItem.Attribute19 = item.Attribute19;
                updateItem.Attribute20 = item.Attribute20;
                updateItem.UpdatedBy = item.UpdatedBy;
                updateItem.UpdatedDate = item.UpdatedDate;
                var result = await _dbContext.SaveChangesAsync();

                if (result > 0)
                {
                    return item;
                }
            }

            return new ContentItem();
        }

        public async Task<ContentItem> Delete(string id, string userId, bool isAdmin)
        {
            var item = (this.Get("", id, "", "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", false, false,
            "", "", 0, 1, 0))
                .FirstOrDefault();
            if (item != null)
            {
                if (!item.Users.Any(uc => uc.Write && uc.User.Id == userId) && !isAdmin)
                {
                    throw new UnauthorizedAccessException("Not authorized to delete " + id + ".");
                }
                _dbContext.Remove(item);
                this.UpdateChildCount(item.ParentId, -1);
                var result = await _dbContext.SaveChangesAsync();

                if (result > 0)
                {
                    return item;
                }
            }
            else
            {
                throw new UnauthorizedAccessException("Content " + id + " not found.");
            }

            return null;
        }

        public async Task<ContentItem> CreateProfileIfNotExists(
            string tenant, 
            string userId, 
            string alias, 
            string email)
        {
            var profileItems = this.Get(tenant, "", "", alias, "profile", "in", "", userId, "",
                "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", false, false, "", "", 0, 1, 0);

            if (profileItems.Count == 0)
            {
                ContentItem profileItem = new ContentItem("profile", "in");
                profileItem.Tenant = tenant;
                profileItem.Id = Guid.NewGuid().ToString();
                profileItem.Alias = alias;

                profileItem.CreatedBy = userId;
                profileItem.CreatedDate = DateTimeOffset.UtcNow;
                profileItem.UpdatedDate = DateTimeOffset.UtcNow;

                using (var md5 = MD5.Create())
                {
                    var result = md5.ComputeHash(Encoding.ASCII.GetBytes(email));
                    profileItem.Attribute01 = BitConverter.ToString(result).Replace("-", "").ToLower();
                }

                profileItem = await this.Add(profileItem);

                return profileItem;
            }
            else
            {
                return profileItems[0];
            }
        }

        private void UpdateChildCount(string parentId, int increase)
        {
            if (!string.IsNullOrEmpty(parentId))
            {
                var contentItems = from contentItem in _dbContext.ContentItems
                    where contentItem.Id == parentId
                    select contentItem;

                if (contentItems.Count() > 0)
                {
                    var contentItem = contentItems.First();
                    contentItem.ChildCount += increase;
                    _dbContext.ContentItems.Update(contentItem);
                }
            }
        }
    }
}