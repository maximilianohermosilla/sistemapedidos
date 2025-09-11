using AutoMapper;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Profiles
{
    public class MappingProfile: Profile
    {
        public MappingProfile(IMapperConfigurationExpression config)
        {
            config.CreateMap<BillingInformation, BillingInformationReadDTO>().ReverseMap();
            config.CreateMap<BillingInformation, BillingInformationCreateDTO>().ReverseMap();

            config.CreateMap<Category, CategoryReadDTO>().ReverseMap();
            config.CreateMap<Category, CategoryCreateDTO>().ReverseMap();

            config.CreateMap<Charges, ChargesReadDTO>().ReverseMap();
            config.CreateMap<Charges, ChargesCreateDTO>().ReverseMap();

            config.CreateMap<Customer, CustomerReadDTO>().ReverseMap();
            config.CreateMap<Customer, CustomerCreateDTO>().ReverseMap();

            config.CreateMap<DeliveryDiscount, DeliveryDiscountReadDTO>().ReverseMap();
            config.CreateMap<DeliveryDiscount, DeliveryDiscountCreateDTO>().ReverseMap();

            config.CreateMap<DeliveryInformation, DeliveryInformationReadDTO>().ReverseMap();
            config.CreateMap<DeliveryInformation, DeliveryInformationCreateDTO>().ReverseMap();

            config.CreateMap<Discount, DiscountReadDTO>().ReverseMap();
            config.CreateMap<Discount, DiscountCreateDTO>().ReverseMap();

            config.CreateMap<Item, ItemReadDTO>().ReverseMap();
            config.CreateMap<Item, ItemCreateDTO>().ReverseMap();

            config.CreateMap<Menu, MenuReadDTO>().ReverseMap();
            config.CreateMap<Menu, MenuCreateDTO>().ReverseMap();

            config.CreateMap<Mesa, MesaReadDTO>().ReverseMap();
            config.CreateMap<Mesa, MesaCreateDTO>().ReverseMap();

            config.CreateMap<Order, OrderReadDTO>().ReverseMap();
            config.CreateMap<Order, OrderCreateDTO>().ReverseMap();

            config.CreateMap<OrderDetail, OrderDetailReadDTO>().ReverseMap();
            config.CreateMap<OrderDetail, OrderDetailCreateDTO>().ReverseMap();

            config.CreateMap<OrderItem, OrderItemReadDTO>().ReverseMap();
            config.CreateMap<OrderItem, OrderItemCreateDTO>().ReverseMap();

            config.CreateMap<OrderState, OrderStateReadDTO>().ReverseMap();
            config.CreateMap<OrderState, OrderStateCreateDTO>().ReverseMap();

            config.CreateMap<OrderSubItem, OrderSubItemReadDTO>().ReverseMap();
            config.CreateMap<OrderSubItem, OrderSubItemCreateDTO>().ReverseMap();

            config.CreateMap<OtherTotals, OtherTotalsReadDTO>().ReverseMap();
            config.CreateMap<OtherTotals, OtherTotalsCreateDTO>().ReverseMap();

            config.CreateMap<Parameter, ParameterReadDTO>().ReverseMap();
            config.CreateMap<Parameter, ParameterCreateDTO>().ReverseMap();

            config.CreateMap<PaymentMethod, PaymentMethodReadDTO>().ReverseMap();
            config.CreateMap<PaymentMethod, PaymentMethodCreateDTO>().ReverseMap();

            config.CreateMap<Store, StoreReadDTO>().ReverseMap();
            config.CreateMap<Store, StoreCreateDTO>().ReverseMap();

            config.CreateMap<Totals, TotalsReadDTO>().ReverseMap();
            config.CreateMap<Totals, TotalsCreateDTO>().ReverseMap();

            config.CreateMap<User, UserReadDTO>().ReverseMap();
            config.CreateMap<User, UserCreateDTO>().ReverseMap();

            //POS
            config.CreateMap<MenuCreatePOS, Menu>().ReverseMap();

            config.CreateMap<CategoryCreatePOS, Category>()
                .ForMember(dest => dest.ExternalId, opt => opt.MapFrom(src => src.Id));

            config.CreateMap<ItemCreatePOS, Item>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Convert.ToInt32(src.Id)));

            config.CreateMap<OrderReadPOS, Order>().ReverseMap();
            config.CreateMap<OrderDetailReadPOS, OrderDetail>().ReverseMap();
            config.CreateMap<OrderItemReadPOS, OrderItem>().ReverseMap();
            config.CreateMap<OrderSubItemReadPOS, OrderSubItem>().ReverseMap();
            config.CreateMap<BillingInformationReadPOS, BillingInformation>().ReverseMap();
            config.CreateMap<ChargesReadPOS, Charges>().ReverseMap();
            config.CreateMap<CustomerReadPOS, Customer>().ReverseMap();
            config.CreateMap<DeliveryDiscountReadPOS, DeliveryDiscount>().ReverseMap();
            config.CreateMap<DeliveryInformationReadPOS, DeliveryInformation>().ReverseMap();
            config.CreateMap<DiscountReadPOS, Discount>().ReverseMap();
            config.CreateMap<TotalsReadPOS, Totals>().ReverseMap();
            config.CreateMap<OtherTotalsReadPOS, OtherTotals>().ReverseMap();
            config.CreateMap<StoreReadPOS, Store>().ReverseMap();
        }
    }
}
