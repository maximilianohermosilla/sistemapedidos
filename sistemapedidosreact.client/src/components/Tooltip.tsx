export default function CustomTooltip({ content, children }: any) {
    return (
        <div className="group relative inline-block">
            {children}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 p-2 px-3 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                {content}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
            </div>
        </div>
    );
};