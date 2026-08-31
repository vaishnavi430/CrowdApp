import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Heart,
    Users,
    Clock,
} from "lucide-react";

import Button from "../../../components/ui/Button";

const FeaturedCampaignCard = ({ campaign }) => {

    const navigate = useNavigate();

    const progress = Math.min(
        ((campaign.pledgedAmount || 0) /
            (campaign.goalAmount || 1)) *
        100,
        100
    );

    const daysLeft = Math.max(
        0,
        Math.ceil(
            (new Date(campaign.deadline) - new Date()) /
            (1000 * 60 * 60 * 24)
        )
    );
    return (
        <motion.div
            whileHover={{
                y: -10,
            }}
            transition={{ duration: 0.3 }}
            className="group overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-indigo-600 backdrop-blur-md">
                    {campaign.category}
                </span>

                {/* Favorite */}
                <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow backdrop-blur-md transition hover:scale-110">
                    <Heart
                        size={18}
                        className="text-rose-500"
                    />
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="line-clamp-2 text-xl font-bold text-slate-900">
                    {campaign.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {campaign.description}
                </p>

                {/* Progress */}
                <div className="mt-6">
                    <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-500">
                            Raised
                        </span>

                        <span className="font-semibold text-slate-800">
                            ₹{(campaign.pledgedAmount || 0).toLocaleString()} / ₹
                            {(campaign.goalAmount || 0).toLocaleString()}
                        </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                                width: `${progress}%`,
                            }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500"
                        />
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{campaign.backers || 0} Backers</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{daysLeft} Days Left</span>
                    </div>
                </div>

                {/* Donate Button */}
                <Button
                    onClick={() => navigate(`/campaigns/${campaign._id}`)}
                    className="group mt-8 w-full"
                >
                    Donate Now

                    <ArrowRight
                        size={18}
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Button>
            </div>
        </motion.div>
    );
};

export default FeaturedCampaignCard;