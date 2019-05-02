using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banico.Web.Server.Models {
    public class IRequest {
        public object cookies { get; set; }
        public object headers { get; set; }
        public object host { get; set; }
    }
}
