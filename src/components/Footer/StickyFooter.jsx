import React, { useState } from 'react';
import { Home, Search, Edit, BarChart3 } from 'lucide-react';

const StickyFooter = ({ onTabChange, activeTab = 'home' }) => {
    const [active, setActive] = useState(activeTab);

    const handleTabClick = (tab) => {
        setActive(tab);
        if (onTabChange) {
            onTabChange(tab);
        }
    };

    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'search', icon: Search, label: 'Search' },
        { id: 'edit', icon: Edit, label: 'Edit' },
        { id: 'report', icon: BarChart3, label: 'Report' }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0  shadow-lg bg-white ">
            <div className="flex justify-around items-center  px-4 w-full max-w-sm mx-auto border-t border-gray-200 shadow-lg py-4 rounded-t-3xl">
                {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-200 ${active === tab.id
                                ? 'bg-red-100 text-red-500'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            aria-label={tab.label}
                        >
                            <IconComponent
                                size={24}
                                className={`transition-all duration-200 ${active === tab.id ? 'scale-110' : ''
                                    }`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default StickyFooter;