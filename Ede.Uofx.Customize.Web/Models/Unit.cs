namespace Ede.Uofx.Customize.Web.Models
{
    public class Customers
    {
        public string CustomerID { get; set; }
        public string CompanyName { get; set; }


    }


    public class FormStatus
    {
        public string FORM_NBR { get; set; }
        public string FORM_RESULT { get; set; }
    }

    public class FormData
    {
        public string FORM_NBR { get; set; }
        public string CATEGORY_ID { get; set; }
        public string PRODUCT_ID { get; set; }
        public string APPLICANT { get; set; }
        public decimal UNIT_PRICE { get; set; }
        public string FORM_RESULT { get; set; }
    }


    public class CheckedOrderPriceModel
    { 
        public decimal? price { get; set; }
        public decimal? ProductPrice { get; set; }
    }


    public class Categories
    {
        public string CategoryID { get; set; }
        public string CategoryName { get; set; }

    }

    public class Products
    {
        public string ProductID { get; set; }
        public string ProductName { get; set; }
        public string UnitPrice { get; set; }

    }

    public class Customer
    {
        public string Address { get; set; }
        public string Phone { get; set; }
        public string CompanyName { get; set; }

    }

}
