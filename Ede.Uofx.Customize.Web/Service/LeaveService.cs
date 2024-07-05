using Ede.Uofx.Customize.Web.Models;
using Microsoft.Data.SqlClient;

namespace Ede.Uofx.Customize.Web.Service
{
    public class LeaveService
    {

        internal static void CreateLeave(SqlTransaction trans, LeaveInfo leaveInfo)
        {
            string sql = @"INSERT INTO [dbo].[HR_LEAVR_FORM]
               ([FORM_NUMBER]
               ,[APPLICANT]
               ,[START_TIME]
               ,[END_TIME]
               ,[LEA_HOURS]
               ,[LEA_ID]
               ,[LEA_NAME]
               ,[AGENT])
         VALUES
               (@FORM_NUMBER
               ,@APPLICANT
               ,@START_TIME
               ,@END_TIME
               ,@LEA_HOURS
               ,@LEA_ID
               ,@LEA_NAME
               ,@AGENT)";

            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@FORM_NUMBER", leaveInfo.formNumber));
            parameters.Add(new SqlParameter("@APPLICANT", leaveInfo.applicant));
            parameters.Add(new SqlParameter("@START_TIME", leaveInfo.startTime));
            parameters.Add(new SqlParameter("@END_TIME", leaveInfo.endTime));
            parameters.Add(new SqlParameter("@LEA_HOURS", leaveInfo.leaveHours));
            parameters.Add(new SqlParameter("@LEA_ID", leaveInfo.leaveType));
            parameters.Add(new SqlParameter("@LEA_NAME", leaveInfo.leaveName));
            parameters.Add(new SqlParameter("@AGENT", leaveInfo.agent));

            Connection.ExecuteSql(trans, sql, parameters);
            trans.Commit();
        }


        internal static List<LeaveType> GetLeaveType(SqlTransaction trans)
        {
            string sql = $@"
    SELECT [LeaId]
          ,[LeaName]
      FROM [dbo].[HR_LEA_TYPE]
    ";

            List<SqlParameter> parameters = new List<SqlParameter>();

            return Connection.ExecuteGetData<LeaveType>(trans, sql, parameters);
        }

    }
}
