namespace Ede.Uofx.Customize.Web.Models
{
    public class LeaveType
    {
        public string LeaId { get; set; }
        public string LeaName { get; set; }
    }

    public class LeaveInfo
    {
        public string formNumber { get; set; }
        public string leaveType { get; set; }
        public string leaveName { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public double leaveHours { get; set; } = 0;
        public object agent { get; set; }
        public string applicant { get; set; }
    }
}
