using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FacebookIdListener.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListenController : ControllerBase
    {
        private readonly ILogger<ListenController> _logger;
        private readonly IDataSaver saver;

        public ListenController(ILogger<ListenController> logger, IDataSaver saver)
        {
            this.saver = saver;
            _logger = logger;
        }

        [EnableCors]
        [HttpPost]
        public void Post([FromBody] UserData data)
        {
            saver.Store(data);
        }
    }
}
