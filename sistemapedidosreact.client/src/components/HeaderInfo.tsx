import { FaRegClock } from 'react-icons/fa6'

export default function HeaderInfo() {
    return (
        <h3 className="header__info flex w-full gap-3 justify-center items-center text-sm border-2 border-gray-300 rounded-md m-auto
                        font-semibold mb-3 text-center text-gray-400">
            <FaRegClock />Demora: <span className="font-medium text-sm opacity-75">10-15 min</span>
        </h3>
    )
}