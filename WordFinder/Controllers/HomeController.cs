using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WordFinder.ViewModels.Home.Index;

namespace WordFinder.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult GetWords(string pattern)
        {
            return Json(new[] {
                "Lorem",
                "Ipsum"
            });
        }

        public ActionResult Index()
        {
            return View(new ViewModel());
        }

        [HttpPost]
        public ActionResult Index(string pattern)
        {
            return View();
        }
    }
}
