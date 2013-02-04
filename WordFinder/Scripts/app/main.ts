/// <reference path="libs/knockout.d.ts" />
/// <reference path="libs/jquery.d.ts" />


//// Interface
//interface IPoint {
//    getDist(): number;
//}

//// Module
//module Shapes {

//    // Class
//    export class Point implements IPoint {
//        // Constructor
//        constructor (public x: number, public y: number) { }
//        f
//        // Instance member
//        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }

//        // Static member
//        static origin = new Point(0, 0);
//    }

//}

//// Local variables
//var p: IPoint = new Shapes.Point(3, 4);
//var dist = p.getDist();

//class Y {
//    public myMethod() {

//    }
//}

//class QQ {
//    public test(name, fun: () => any) { // updated signature
//        fun(); // call the function
//    }
//}


module WordFinder {
    "use strict";

    export class Program {
        static Main($: JQueryStatic, ko: KnockoutStatic) {
            new Program().Run($, ko);
        }

        Run($: JQueryStatic, ko: KnockoutStatic) {
            console.info("WordFinder.Program.Main running");

            var viewModel = new MainViewModel(ko);
            ko.applyBindings(viewModel);
            
            viewModel.OnRegexPatternChanged((newValue) => {
                $.ajax('/Home/GetWords',
                {
                    data: { pattern: viewModel.RegexPattern },
                    type: 'POST',
                    success: (data) => {
                        viewModel.MatchedWords(data);
                    }
                });
            });
        }
    }

    export class MainViewModel {
        private _ko: KnockoutStatic;
        private _regexPattern: KnockoutObservableString;
        private _matchedWords: KnockoutObservableArray;

        constructor (ko: KnockoutStatic) {
            this._ko = ko;
            this._regexPattern = ko.observable('tester');
            this._matchedWords = ko.observableArray(['1st word']);
        }

        get RegexPattern(): KnockoutObservableAny {
            return this._regexPattern;
        }
        //set RegexPattern(value) {
        //    this._regexPattern(value);
        //}

        get MatchedWords(): KnockoutObservableArray {
            return this._matchedWords;
        }
        //set MatchedWords(value: string) {
        //    this._matchedWords(value);
        //}

        OnRegexPatternChanged(callback: (newValue: string) => void ): void {
            this._regexPattern.subscribe(callback);
        }

        get MatchedWordsCount(): KnockoutComputed {
            return this._ko.computed(() => {
                return this._matchedWords().length;
            });
        }
    }
}

$(function () {
    //WordFinder.Program.Main($, ko);
});