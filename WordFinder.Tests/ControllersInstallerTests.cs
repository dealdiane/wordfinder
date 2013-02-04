using Castle.MicroKernel;
using Castle.Windsor;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

[TestClass]
public class ControllersInstallerTests
{
    private IWindsorContainer containerWithControllers;

    public ControllersInstallerTests()
    {
        containerWithControllers = new WindsorContainer()
                    .Install(new ControllersInstaller());
    }

    [TestMethod]
    public void All_controllers_implement_IController()
    {
        var allHandlers = GetAllHandlers(containerWithControllers);
        var controllerHandlers = GetHandlersFor(typeof(IController), containerWithControllers);

        Assert.IsTrue(allHandlers.Count() > 0);
        CollectionAssert.AreEqual(allHandlers, controllerHandlers);
    }

    private IHandler[] GetAllHandlers(IWindsorContainer container)
    {
        return GetHandlersFor(typeof(object), container);
    }

    private IHandler[] GetHandlersFor(Type type, IWindsorContainer container)
    {
        return container.Kernel.GetAssignableHandlers(type);
    }
}