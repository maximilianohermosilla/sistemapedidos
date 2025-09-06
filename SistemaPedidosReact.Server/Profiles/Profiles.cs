using AutoMapper;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Profiles
{
    public class MappingProfile: Profile
    {
        //public MappingProfile()
        //{
        //    CreateMap<PaymentMethod, PaymentMethodReadDTO>().ReverseMap();
        //    CreateMap<PaymentMethod, PaymentMethodCreateDTO>().ReverseMap();
        //}

        public MappingProfile(IMapperConfigurationExpression config)
        {
            config.CreateMap<PaymentMethod, PaymentMethodReadDTO>().ReverseMap();
            config.CreateMap<PaymentMethod, PaymentMethodCreateDTO>().ReverseMap();
        }
    }
}
