using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using WordFinder.Infrastructure.Interfaces;

namespace WordFinder.Core.Services
{
    public class FileSystemWordDictionaryService : RegexWordDictionaryService
    {
        private string _separator;

        public FileSystemWordDictionaryService(string dictionaryFilePath, string separator)
        {
            if (!File.Exists(dictionaryFilePath))
            {
                throw new FileNotFoundException();
            }

            Path = dictionaryFilePath;
            Separator = separator;
        }

        public string Path { get; private set; }

        public string Separator
        {
            get
            {
                return _separator;
            }

            set
            {
                _separator = value;
                LoadDictionary();
            }
        }

        private void LoadDictionary()
        {
            WordList = File.ReadAllText(Path).Split(new[] {
                Separator
            }, StringSplitOptions.RemoveEmptyEntries);
        }
    }
}