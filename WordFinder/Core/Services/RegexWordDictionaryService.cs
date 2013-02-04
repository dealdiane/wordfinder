using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using WordFinder.Infrastructure.Interfaces;

namespace WordFinder.Core.Services
{
    public class RegexWordDictionaryService : IWordDictionaryService
    {
        public RegexWordDictionaryService()
        {
            Options  = RegexOptions.Compiled | RegexOptions.CultureInvariant | RegexOptions.IgnoreCase;
            WordList = Enumerable.Empty<string>();
        }

        public RegexOptions Options { get; set; }

        protected virtual IEnumerable<string> WordList { get; set; }

        public virtual IEnumerable<string> MatchWords(string pattern)
        {
            return WordList.Where(w => Regex.IsMatch(w, pattern, RegexOptions.Compiled | RegexOptions.CultureInvariant | RegexOptions.IgnoreCase));
        }
    }
}