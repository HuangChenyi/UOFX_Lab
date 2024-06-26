using Ede.Uofx.Customize.Web.Models;
using Ede.Uofx.Customize.Web.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;


namespace Ede.Uofx.Customize.Web.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class CustomersController : ControllerBase
    {
        [HttpGet("CheckedPrice")]
        public string CheckedPrice(string? price)
        {

            if (price == null)
                return "";

            if (Convert.ToDecimal(price) > 10)
            {
                return "金額不可超過10";
            }

            return "";
        }

        [HttpPost("CheckedOrderPrice")]
        public string CheckedOrderPrice(CheckedOrderPriceModel model)
        {

            if (model.price == null)
                return "";

            if (Convert.ToDouble(model.price) > Convert.ToDouble(model.ProductPrice) * 0.8)
            {
                return "實際金額不可大於產品金額8成";
            }

            return "";
        }

        [HttpPost("CreateFormData")]
        public string CreateFormData(FormData model)
        {

            SqlTransaction trans = Connection.GetTransaction();
            try
            {
                Connection.OpenConnection(trans);
                return CustomersService.CreateOrder(trans, model.FORM_NBR, model.CATEGORY_ID, model.PRODUCT_ID,
                    model.APPLICANT,model.UNIT_PRICE.ToString(), model.FORM_RESULT);
            }
            finally
            {
                Connection.CloseConnection(trans);
            }

            return "";
        }

        [HttpPost("UpdateFormData")]
        public string UpdateFormData(FormStatus model)
        {

            SqlTransaction trans = Connection.GetTransaction();
            try
            {
                Connection.OpenConnection(trans);
                return CustomersService.UpdateOrder(trans, model.FORM_NBR, model.FORM_RESULT);
            }
            finally
            {
                Connection.CloseConnection(trans);
            }

            return "";
        }



        [HttpGet("GetCategories")]
        public List<Categories> GetCategories()
        {
            SqlTransaction trans = Connection.GetTransaction();
            try
            {
                Connection.OpenConnection(trans);
                return CustomersService.GetCategories(trans);
            }
            finally
            {
                Connection.CloseConnection(trans);
            }
        }

        [HttpGet("GetProducts")]
        public List<Products> Products(string? categoryID)
        {
            if (string.IsNullOrEmpty(categoryID))
            {
                return new List<Products>();
            }
            SqlTransaction trans = Connection.GetTransaction();
            try
            {
                Connection.OpenConnection(trans);
                return CustomersService.GetProducts(trans, categoryID);
            }
            finally
            {
                Connection.CloseConnection(trans);
            }
        }

        [HttpGet("GetProductPrice")]
        public List<Products> GetProductPrice(string? productID)
        {
            if (string.IsNullOrEmpty(productID))
            {
                return new List<Products>();
            }
            SqlTransaction trans = Connection.GetTransaction();
            try
            {
                Connection.OpenConnection(trans);
                return CustomersService.GetProductPrice(trans, productID);
            }
            finally
            {
                Connection.CloseConnection(trans);
            }
        }

        [HttpGet("GetCustomers")]
        public List<Customer> GetCustomers()
        {
            SqlTransaction trans = Connection.GetTransaction();
            try
            {
                Connection.OpenConnection(trans);
                return CustomersService.GetCustomers(trans);
            }
            finally
            {
                Connection.CloseConnection(trans);
            }
        }


    }
}
