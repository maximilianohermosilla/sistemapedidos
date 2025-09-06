using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Charges
    {
        [Key]
        public int Id { get; set; }

        public decimal Shipping { get; set; }
        public decimal ServiceFee { get; set; }
    }
}
