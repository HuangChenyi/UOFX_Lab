using Ede.Uofx.Customize.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO.Pipelines;

namespace Ede.Uofx.Customize.Web.Service
{
    public class CustomersService
    {
        internal static string CreateFormApi(SqlTransaction trans,string item, string price, string result)
        {
          
            string sql = @"INSERT INTO [dbo].[FORM_API]
           ([Item]
           ,[Price]
           ,[Result])
     VALUES
           (@Item,@Price,@Result)";

           

            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@Item", item));
            parameters.Add(new SqlParameter("@Price", price));
            parameters.Add(new SqlParameter("@Result", result));

            Connection.ExecuteSql(trans, sql, parameters);
            trans.Commit();
            return "Succ";
        }

        internal static void DeleteCustomer(SqlTransaction trans, string id)
        {
            string sql = $@"
DELETE [Customers]
WHERE CustomerID=@CustomerID
";

            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@CustomerID", id));

            Connection.ExecuteSql(trans, sql, parameters);
        }

        internal static List<Categories> GetCategories(SqlTransaction trans)
        {
            string sql = $@"
SELECT CategoryID,CategoryName
FROM [Categories]
";

            List<SqlParameter> parameters = new List<SqlParameter>();

            //if (!string.IsNullOrEmpty(code))
            //{
            //    sql += "WHERE unit = @code";

            //    parameters.Add(new SqlParameter("@code", code));
            //}

            return Connection.ExecuteGetData<Categories>(trans, sql, parameters);
        }

        internal static List<Customer> GetCustomers(SqlTransaction trans)
        {
            string sql = $@"
SELECT *
FROM [Customers]
";

            List<SqlParameter> parameters = new List<SqlParameter>();

            //if (!string.IsNullOrEmpty(code))
            //{
            //    sql += "WHERE unit = @code";

            //    parameters.Add(new SqlParameter("@code", code));
            //}

            return Connection.ExecuteGetData<Customer>(trans, sql, parameters);
        }

        internal static bool GetItem(SqlTransaction trans, string customerID)
        {
            string sql = $@"
SELECT CustomerID
FROM [Customers]
WHERE CustomerID=@CustomerID
";

            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@CustomerID", customerID));


           var result= Connection.ExecuteGetData<Customers>(trans, sql, parameters);

            return result.Count() > 0;
        }

     

        internal static List<Products> GetProducts(SqlTransaction trans, string categoryID)
        {
            string sql = $@"
SELECT  ProductID,ProductName,UnitPrice FROM Products
WHERE CategoryID=@CategoryID
";

            List<SqlParameter> parameters = new List<SqlParameter>();

            parameters.Add(new SqlParameter("@CategoryID", categoryID));

            return Connection.ExecuteGetData<Products>(trans, sql, parameters);
        }

        internal static List<Products> GetProductPrice(SqlTransaction trans, string productID)
        {
            string sql = $@"
SELECT  ProductID,ProductName,UnitPrice FROM Products
WHERE ProductID=@ProductID
";

            List<SqlParameter> parameters = new List<SqlParameter>();

            parameters.Add(new SqlParameter("@ProductID", productID));

            return Connection.ExecuteGetData<Products>(trans, sql, parameters);
        }



        internal static void InsertItem(SqlTransaction trans, Customers item)
        {
            string sql = $@"
INSERT INTO Customers
(CustomerID,CompanyName)
values
(@CustomerID,@CompanyName)
";

            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@CustomerID", item.CustomerID));
            parameters.Add(new SqlParameter("@CompanyName", item.CompanyName));

            var result = Connection.ExecuteSql(trans, sql, parameters);

            
        }

        internal static void UpdateItem(SqlTransaction trans, Customers item)
        {
            string sql = $@"
UPDATE Customers
SET CustomerID=@CustomerID,
CompanyName=@CompanyName
WHERE
CustomerID=@CustomerID";

            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@CustomerID", item.CustomerID));
            parameters.Add(new SqlParameter("@CompanyName", item.CompanyName));

            var result = Connection.ExecuteSql(trans, sql, parameters);
        }

        internal static string CreateOrder(SqlTransaction trans, string no, string category, string product, string applicant, string unitPrice, string result)
        {
            string sql = @"  INSERT INTO [dbo].[FORM_DATA]  
(	 [ID] , 
	 [FORM_NBR] , 
	 [CATEGORY_ID] , 
	 [PRODUCT_ID] , 
	 [APPLICANT] , 
	 [UNIT_PRICE] , 
	 [FORM_RESULT]  
) 
 VALUES 
 (	 NEWID() , 
	 @FORM_NBR , 
	 @CATEGORY_ID , 
	 @PRODUCT_ID , 
	 @APPLICANT , 
	 @UNIT_PRICE , 
	 @FORM_RESULT
)";



            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@FORM_NBR", no));
            parameters.Add(new SqlParameter("@CATEGORY_ID", category));
            parameters.Add(new SqlParameter("@PRODUCT_ID", product));
            parameters.Add(new SqlParameter("@APPLICANT", applicant));
            parameters.Add(new SqlParameter("@UNIT_PRICE", unitPrice));
            parameters.Add(new SqlParameter("@FORM_RESULT", result));
            Connection.ExecuteSql(trans, sql, parameters);
            trans.Commit();

            return "";

        }

        internal static string UpdateOrder(SqlTransaction trans, string no, string result)
        {
            string sql = @"    UPDATE [dbo].[FORM_DATA]  
 SET 
	 [FORM_RESULT] = @FORM_RESULT  

WHERE 
	[FORM_NBR] = @FORM_NBR";



            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@FORM_NBR", no));
            parameters.Add(new SqlParameter("@FORM_RESULT", result));
            Connection.ExecuteSql(trans, sql, parameters);
            trans.Commit();

            return "";
        }


    }
}
