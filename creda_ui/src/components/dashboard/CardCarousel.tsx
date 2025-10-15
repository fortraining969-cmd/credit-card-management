import React, { useState, FC } from 'react';
import { CreditCard } from '../../types';
import { FiChevronLeft, FiChevronRight, FiCopy } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const Card: FC<{ card: CreditCard }> = ({ card }) => (
    <motion.div
        key={card.id}
        className={`w-full h-56 rounded-2xl p-6 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden ${card.bgColor}`}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
        <div className="flex justify-between items-start">
            <span className="font-bold text-xl">{card.bankName}</span>
            <span className="font-mono text-xl">{card.cardType.toUpperCase()}</span>
        </div>
        <div>
            <div className="flex items-center space-x-2">
                <p className="font-mono text-2xl tracking-widest">**** **** **** {card.last4}</p>
                <FiCopy className="cursor-pointer hover:text-blue-300" onClick={() => navigator.clipboard.writeText(card.last4)} />
            </div>
            <div className="flex justify-between text-sm mt-2">
                <span>{card.cardHolder.toUpperCase()}</span>
                <span>EXP {card.expiry}</span>
            </div>
        </div>
    </motion.div>
);

const CardCarousel: FC<{ cards: CreditCard[] }> = ({ cards }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const paginate = (newDirection: number) => {
        setActiveIndex((prevIndex) => (prevIndex + newDirection + cards.length) % cards.length);
    };

    if (!cards || cards.length === 0) {
        return <div className="text-center p-8 bg-gray-800 rounded-lg">No cards found.</div>;
    }

    const activeCard = cards[activeIndex];

    return (
        <div className="space-y-6">
            <div className="relative h-56 flex items-center justify-center">
                <AnimatePresence initial={false}>
                    <Card card={activeCard} />
                </AnimatePresence>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                    <button onClick={() => paginate(-1)} className="bg-gray-700/50 p-2 rounded-full hover:bg-gray-600 transition-all text-white">
                        <FiChevronLeft size={24} />
                    </button>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                    <button onClick={() => paginate(1)} className="bg-gray-700/50 p-2 rounded-full hover:bg-gray-600 transition-all text-white">
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                <div>
                    <p className="text-sm text-gray-400">Outstanding Amt.</p>
                    <p className="text-xl font-bold text-white">₹{activeCard.outstanding.toLocaleString('en-IN')}</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-400">Due Date</p>
                    <p className="text-xl font-bold text-white">{activeCard.dueDate}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Credit Limit</p>
                    <p className="text-xl font-bold text-white">₹{activeCard.limit.toLocaleString('en-IN')}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105">
                        Pay Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardCarousel;
