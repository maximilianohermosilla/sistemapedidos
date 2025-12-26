import "./Contact.css";
import { useEffect, useState } from "react";
import { GetParameterByKey } from "../services/parameter-service";
import { ParameterEnum } from "../enums/parameter";
import { FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { GrMail } from "react-icons/gr";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineClock } from "react-icons/hi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Spinner from "../components/Spinner";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

const positionDefault = [-34.92057857658673, -57.95523024039817];

L.Marker.prototype.options.icon = DefaultIcon;

export default function Contact() {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState<string>('');
    const [whatsapp, setWhatsapp] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [instagram, setInstagram] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [schedules, setSchedules] = useState<string>('');
    const [position, setPosition] = useState<any>(positionDefault);

    useEffect(() => {
        getParameters();
        setPosition(positionDefault);
    }, []);

    const getParameters = async () => {
        const addressParameter = await GetParameterByKey(ParameterEnum.ADDRESS);
        if (addressParameter) setAddress(addressParameter?.value);

        const whatsappParameter = await GetParameterByKey(ParameterEnum.WHATSAPP);
        if (whatsappParameter) setWhatsapp(whatsappParameter?.value);

        const emailParameter = await GetParameterByKey(ParameterEnum.EMAIL);
        if (emailParameter) setEmail(emailParameter?.value);

        const instagramParameter = await GetParameterByKey(ParameterEnum.INSTAGRAM);
        if (instagramParameter) setInstagram(instagramParameter?.value);

        const phoneParameter = await GetParameterByKey(ParameterEnum.PHONE);
        if (phoneParameter) setPhone(phoneParameter?.value);

        const schedulesParameter = await GetParameterByKey(ParameterEnum.SCHEDULES);
        if (schedulesParameter) setSchedules(schedulesParameter?.value);
        
        const latitudeParameter = await GetParameterByKey(ParameterEnum.LATITUDE);
        const longitudeParameter = await GetParameterByKey(ParameterEnum.LONGITUDE);
        if (latitudeParameter && longitudeParameter) setPosition([Number(latitudeParameter?.value!), Number(longitudeParameter?.value)]);

        setLoading(false);
    }

    function formatTextWithBrTags(text: string) {
        return text.replace(/\n/g, '<br />');
    }

    return (
        <div className="main__container w-full flex flex-col justify-start p-2 pt-5">
            {loading
                ? <Spinner text={"Cargando..."} />
                : <>
                    <section className="contact mx-auto">
                        <h1 className="text-primary text-2xl font-semibold w-full text-center mb-1">Contacto</h1>

                        {address && address !== '' &&
                            <div className="address mt-5">
                                <h5 className="text-primary font-semibold flex items-center gap-2"><LuMapPin />Dirección</h5>
                                {address}
                            </div>
                        }
                        {schedules && schedules !== '' &&
                            <div className="schedules mt-5">
                                <h5 className="text-primary font-semibold flex items-center gap-2"><HiOutlineClock />Horarios</h5>
                                <div className="whitespace-break-spaces" dangerouslySetInnerHTML={{ __html: formatTextWithBrTags(schedules) }}></div>
                            </div>
                        }
                        <div className="contactos flex gap-4 mt-7 mx-auto justify-center">
                            {phone && phone !== '' && <a href={`tel:${phone}`} target="_blank" rel="noreferrer"><FaPhone className="contact__icon" size={40}></FaPhone ></a>}
                            {whatsapp && whatsapp !== '' && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer"><FaWhatsapp className="contact__icon" size={40}></FaWhatsapp></a>}
                            {email && email !== '' && <a href={`mailto:${email}`} target="_blank" rel="noreferrer"><GrMail className="contact__icon" size={40}></GrMail></a>}
                            {instagram && instagram !== '' && <a href={instagram} target="_blank" rel="noreferrer"><FaInstagram className="contact__icon" size={40}></FaInstagram></a>}
                        </div>
                    </section>
                    <section className="h-full p-2 mt-5">
                        <MapContainer
                            style={{
                                height: "40vh",
                                width: "100%",
                            }}
                            center={position}
                            zoom={15}
                        >
                            <TileLayer
                                attribution="Google Maps"
                                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                            />

                            <Marker position={position} />
                        </MapContainer>
                    </section>
                </>}
        </div>
    )
}
