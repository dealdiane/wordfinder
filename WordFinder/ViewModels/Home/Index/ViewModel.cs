using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WordFinder.ViewModels.Home.Index
{
    public class ViewModel
    {
        public string Pattern { get; set; }
        public IEnumerable<string> MatchedWords { get; set; }
    }
}