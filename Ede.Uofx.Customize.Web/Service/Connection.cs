using Microsoft.Data.SqlClient;
using System.Reflection;



namespace Ede.Uofx.Customize.Web.Service
{
    public class Connection
    {
        /// <summary>
        /// 連線字串
        /// </summary>
        public static string ConnectionString
        {
            get
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .Build();
                return configuration.GetConnectionString("NORTHWND");
            }
        }

        /// <summary>
        /// 取得連線交易區段
        /// </summary>
        /// <returns></returns>
        public static SqlTransaction GetTransaction()
        {
            SqlConnection conn = new SqlConnection(ConnectionString);
            conn.Open();
            return conn.BeginTransaction();
        }

        /// <summary>
        /// 開啟資料庫連線
        /// </summary>
        /// <param name="trans"></param>
        public static void OpenConnection(SqlTransaction trans)
        {
            SqlConnection conn = trans.Connection;
            if (conn.State != System.Data.ConnectionState.Open)
                conn.Open();
        }

        /// <summary>
        /// 關閉資料庫連線
        /// </summary>
        /// <param name="trans"></param>
        public static void CloseConnection(SqlTransaction trans)
        {
            SqlConnection conn = trans.Connection;
            if (conn != null && conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        /// <summary>
        /// 連線，檢查是否有資料
        /// </summary>
        /// <param name="trans"></param>
        /// <returns></returns>
        public static bool ExecuteHasData(SqlTransaction trans, string sql, List<SqlParameter> parameters)
        {
            bool result = false;
            using (
                SqlCommand cmd = new SqlCommand()
                {
                    CommandText = sql,
                    Connection = trans.Connection,
                    Transaction = trans,
                    CommandType = System.Data.CommandType.Text,
                }
            )
            {
                cmd.Parameters.AddRange(parameters.ToArray());

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        result = true;
                    }

                    reader.Close();
                }

            }
            return result;
        }

        /// <summary>
        /// 執行insert/delete/update用
        /// </summary>
        /// <param name="trans"></param>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public static bool ExecuteSql(SqlTransaction trans, string sql, List<SqlParameter> parameters)
        {
            bool result = false;

            using (
                SqlCommand cmd = new SqlCommand()
                {
                    CommandText = sql,
                    Connection = trans.Connection,
                    Transaction = trans,
                    CommandType = System.Data.CommandType.Text,
                }
            )
            {
                cmd.Parameters.AddRange(parameters.ToArray());

                if (cmd.ExecuteNonQuery() > 0)
                {
                    result = true;
                }
            }

            return result;
        }

        
        /// <summary>
        /// 取得指定資料
        /// </summary>
        /// <param name="trans"></param>
        /// <returns></returns>
        public static List<T> ExecuteGetData<T>(SqlTransaction trans, string sql, List<SqlParameter> parameters) where T : new()
        {
            using (
                SqlCommand cmd = new SqlCommand()
                {
                    CommandText = sql,
                    Connection = trans.Connection,
                    Transaction = trans,
                    CommandType = System.Data.CommandType.Text,
                }
            )
            {
                cmd.Parameters.AddRange(parameters.ToArray());

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    var result = new List<T>();
                    while (reader.Read())
                    {
                        T item = mapFunction<T>(reader);
                        result.Add(item);
                    }

                    reader.Close();

                    return result;
                }

            }
        }

        private static T mapFunction<T>(SqlDataReader reader) where T : new()
        {
            T val = new T();
            PropertyInfo[] properties = typeof(T).GetProperties();

            foreach (PropertyInfo property in properties)
            {
                var columnSchema = reader.GetColumnSchema();
                var columnName = property.Name;
                var column = columnSchema.FirstOrDefault(c => c.ColumnName == columnName);

                if (column != null)
                {
                    object columnValue = reader[column.ColumnName];
                    if (columnValue != DBNull.Value)
                    {
                        var convertedValue = Convert.ChangeType(columnValue, property.PropertyType);
                        property.SetValue(val, convertedValue);
                    }
                }
            }
            return val;
        }
    }
}
