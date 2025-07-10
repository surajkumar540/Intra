const ProgressDots = ({ total = 3, activeIndex = 0 }) => {
    return (
        <div className="flex gap-2">
            {Array.from({ length: total }).map((_, index) => (
                <span
                    key={index}
                    className={`h-[6px] w-[18px] rounded-full transition-all duration-300 ${index === activeIndex ? "bg-primary" : "bg-[#FE697D33]"
                        }`}
                />
            ))}
        </div>
    );
};

export default ProgressDots;
