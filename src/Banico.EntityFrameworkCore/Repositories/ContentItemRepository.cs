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
        private const char PATH_DELIM = '_';
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

        public async Task<ContentItemsCount> GetCount(
            string id,
            string name,
            string alias,
            string module,
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
                    (c.Alias == alias || string.IsNullOrEmpty(alias)) && 
                    (c.ParentId == parentId || string.IsNullOrEmpty(parentId)) &&
                    (c.Name == name || string.IsNullOrEmpty(name)) && 
                    (c.CreatedBy == createdBy || string.IsNullOrEmpty(createdBy))
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

            int count = await contentItems.CountAsync();          
            ContentItemsCount result = new ContentItemsCount();
            result.Count = count;

            return result;
        }

        public async Task<List<ContentItem>> Get(
            string id,
            string name,
            string alias,
            string module,
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
            int pageSize
        ) {
            var contentItems = from c in _dbContext.ContentItems
                where 
                    (c.Id == id || string.IsNullOrEmpty(id)) &&
                    (c.Module == module || string.IsNullOrEmpty(module)) && 
                    (c.Alias == alias || string.IsNullOrEmpty(alias)) && 
                    (c.ParentId == parentId || string.IsNullOrEmpty(parentId)) &&
                    (c.Name == name || string.IsNullOrEmpty(name)) && 
                    (c.CreatedBy == createdBy || string.IsNullOrEmpty(createdBy))
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

            Expression<Func<ContentItem, object>> sort = null;

            switch(orderBy) 
            {
                case "name":
                    sort = c => c.Name;
                    break;
                case "createdDate":
                    sort = c => c.CreatedDate;
                    break;
            }

            if (sort != null) 
            {
                contentItems = contentItems.OrderBy(sort);
            }

            if ((pageSize == 0) || (pageSize > _maxPageSize))
            {
                pageSize = _maxPageSize;
            }

            int skipRows = 0;
            if (page > 0)
            {
                skipRows = (page - 1) * pageSize;
            }
            contentItems = contentItems.Skip(skipRows).Take(pageSize);

            return await contentItems.ToListAsync();
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
                    IQueryable<SectionItem> sectionQuery = null;
                    var sectionFields = sectionItemsArray[i].Split(TYPE_DELIM);
                    var section = sectionFields[0];
                    var sectionValue = sectionFields[1];
                    var pathFields = sectionValue.Split(PATH_DELIM);
                    string pathUrl = string.Empty;
                    string alias = pathFields[pathFields.Count() - 1];
                    if (pathFields.Count() > 1)
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
                                childrenPathUrl = pathUrl + PATH_DELIM + alias;
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
                                    (si.PathUrl.Contains(childrenPathUrl)))
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
        //         var sectionItems = typeAndSection[1].Split(PATH_DELIM);
        //         string pathUrl = "";
        //         for (int j = 0; j < sectionItems.Length; j++)
        //         {
        //             string alias = sectionItems[j];
        //             Console.WriteLine("INNERLIST = " + j.ToString() + " " + pathUrl + PATH_DELIM + alias);
        //             innerList.Add(pathUrl + PATH_DELIM + alias);

        //             if (pathUrl.Length > 0)
        //             {
        //                 pathUrl = pathUrl + PATH_DELIM;
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

        public async Task<IEnumerable<ContentSectionItem>> GetContentSectionItemsByContentItemId(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var contentSectionItems = from contentSectionItem in _dbContext.ContentSectionItems
                                            where contentSectionItem.ContentItemId == id
                                            select contentSectionItem;

                return await contentSectionItems.ToListAsync();
            }

            return new List<ContentSectionItem>();
        }

        public async Task<ContentItem> AddOrUpdate(ContentItem contentItem, string userID, bool isAdmin)
        {
            if (string.IsNullOrEmpty(contentItem.Id)) 
            {
                return await this.Add(contentItem);
            }
            else
            {
                return await this.Update(contentItem, userID, isAdmin);
            }
        }

        // Returns no. of objects saved, ie., 1
        public async Task<ContentItem> Add(ContentItem item)
        {
            item.Id = Guid.NewGuid().ToString();
            item.ContentSectionItems = await this.ToContentSectionItems(item.SectionItems);
            _dbContext.ContentItems.Add(item);
            var result = await _dbContext.SaveChangesAsync();

            if (result > 0)
            {
                return item;
            }

            return new ContentItem();
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

                    var sectionItem = await (from si in _dbContext.SectionItems
                                        where si.Section == section &&
                                            (si.PathUrl + si.Alias) == sectionItemString
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

        public async Task<ContentItem> Update(ContentItem item, string userID, bool isAdmin)
        {
            var updateItem = (await this.Get(item.Id, "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", false, false,
            "", 0, 1))
                .FirstOrDefault();

            if (updateItem != null)
            {
                if ((updateItem.CreatedBy == userID) || (isAdmin))
                {
                    updateItem.Name = item.Name;
                    updateItem.Content = item.Content;
                    updateItem.Alias = item.Alias;
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
            }

            return new ContentItem();
        }

        public async Task<ContentItem> Delete(string id)
        {
            var item = (await this.Get(id, "", "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", false, false,
            "", 0, 1))
                .FirstOrDefault();
            _dbContext.Remove(item);
            var result = await _dbContext.SaveChangesAsync();

            if (result > 0)
            {
                return item;
            }

            return new ContentItem();
        }

        public async Task<ContentItem> CreateProfileIfNotExists(string userId, string alias, string email)
        {
            var profileItems = await this.Get("", "", alias, "profile", "", userId, "",
                "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", false, false, "", 0, 1);

            if (profileItems.Count == 0)
            {
                ContentItem profileItem = new ContentItem("profile");
                profileItem.Id = Guid.NewGuid().ToString();
                profileItem.Alias = alias;

                profileItem.CreatedBy = userId;
                profileItem.CreatedDate = DateTimeOffset.UtcNow;

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
    }
}