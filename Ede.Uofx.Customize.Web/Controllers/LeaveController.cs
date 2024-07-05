using Ede.Uofx.Customize.Web.Models;
using Ede.Uofx.Customize.Web.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Ede.Uofx.Customize.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        [HttpPost("CreateLeave")]
        public string CreateLeave(LeaveInfo model)
        {

            SqlTransaction trans = Connection.GetTransaction(Connection.ConnectionStringHR);
            try
            {
                Connection.OpenConnection(trans);
                LeaveService.CreateLeave(trans, model);
            }
            finally
            {
                Connection.CloseConnection(trans);
            }

            return "";
        }


        [HttpGet("GetLeaveType")]
        public List<LeaveType> GetLeaveType()
        {
            SqlTransaction trans = Connection.GetTransaction(Connection.ConnectionStringHR);

            try
            {
                Connection.OpenConnection(trans);
                return LeaveService.GetLeaveType(trans);
            }
            finally
            {
                Connection.CloseConnection(trans);
            }
        }
    }
}
