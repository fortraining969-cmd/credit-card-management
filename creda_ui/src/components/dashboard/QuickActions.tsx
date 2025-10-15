import React, { FC } from 'react';
import { FiDownload, FiLock, FiSettings, FiPlusCircle } from 'react-icons/fi';

const ActionButton: FC<{ icon: React.ReactElement; label: string; }> = ({ icon, label }) => (
    <button className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-800 rounded-2xl hover:bg-blue-600 transition-all group">
        {React.cloneElement(icon, { className: 'w-8 h-8 text-blue-400 group-hover:text-white transition-colors' })}
        <span className="text-sm font-medium text-gray-300 group-hover:text-white">{label}</span>
    </button>
);

const QuickActions: FC = () => {
    return (
        <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ActionButton icon={<FiDownload />} label="Get Statement" />
                <ActionButton icon={<FiLock />} label="Block/Unblock" />
                <ActionButton icon={<FiSettings />} label="Manage PIN" />
                <ActionButton icon={<FiPlusCircle />} label="Apply for Card" />
            </div>
        </div>
    );
};

export default QuickActions;
