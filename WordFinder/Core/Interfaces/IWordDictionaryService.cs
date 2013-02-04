using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordFinder.Infrastructure.Interfaces
{
    public interface IWordDictionaryService
    {
        IEnumerable<string> MatchWords(string pattern);
    }
}
