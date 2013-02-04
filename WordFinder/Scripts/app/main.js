var WordFinder;
(function (WordFinder) {
    "use strict";
    var Program = (function () {
        function Program() { }
        Program.Main = function Main($, ko) {
            new Program().Run($, ko);
        }
        Program.prototype.Run = function ($, ko) {
            console.info("WordFinder.Program.Main running");
            var viewModel = new MainViewModel(ko);
            ko.applyBindings(viewModel);
            viewModel.OnRegexPatternChanged(function (newValue) {
                $.ajax('/Home/GetWords', {
                    data: {
                        pattern: viewModel.RegexPattern
                    },
                    type: 'POST',
                    success: function (data) {
                        viewModel.MatchedWords(data);
                    }
                });
            });
        };
        return Program;
    })();
    WordFinder.Program = Program;    
    var MainViewModel = (function () {
        function MainViewModel(ko) {
            this._ko = ko;
            this._regexPattern = ko.observable('tester');
            this._matchedWords = ko.observableArray([
                '1st word'
            ]);
        }
        Object.defineProperty(MainViewModel.prototype, "RegexPattern", {
            get: function () {
                return this._regexPattern;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainViewModel.prototype, "MatchedWords", {
            get: function () {
                return this._matchedWords;
            },
            enumerable: true,
            configurable: true
        });
        MainViewModel.prototype.OnRegexPatternChanged = function (callback) {
            this._regexPattern.subscribe(callback);
        };
        Object.defineProperty(MainViewModel.prototype, "MatchedWordsCount", {
            get: function () {
                var _this = this;
                return this._ko.computed(function () {
                    return _this._matchedWords().length;
                });
            },
            enumerable: true,
            configurable: true
        });
        return MainViewModel;
    })();
    WordFinder.MainViewModel = MainViewModel;    
})(WordFinder || (WordFinder = {}));

$(function () {
});
