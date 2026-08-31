import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import FeaturedCampaignCard from "./FeaturedCampaignCard";
import Button from "../../../components/ui/Button";
import api from "../../../services/api";

const FeaturedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get("/projects");

        setCampaigns(response.data.projects);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-xl font-semibold">
          Loading campaigns...
        </h2>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-slate-50 py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full border border-indigo-200 bg-white/70 px-5 py-2 text-sm font-semibold text-indigo-600 backdrop-blur-md">
            Featured Projects
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Featured Campaigns
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Discover inspiring campaigns that are changing lives through
            innovation, creativity, and community support.
          </p>
        </motion.div>

        {/* Campaign Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign._id || index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <FeaturedCampaignCard campaign={campaign} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Button className="group px-8 py-3 shadow-lg transition-all duration-300 hover:shadow-indigo-300">
            View All Campaigns

            <ArrowRight
              size={18}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;