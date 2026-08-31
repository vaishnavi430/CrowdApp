import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Clock, X } from "lucide-react";
import api from "../../../services/api";

const RecentSupporters = ({ campaignId }) => {
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchSupporters = async () => {
    try {
      const response = await api.get(
        `/projects/${campaignId}/backers`
      );
      const donations = response.data.backers || [];

      // Keep all supporters in state
      setSupporters(donations);
    } catch (error) {
      console.error("Error fetching supporters:", error);
      setSupporters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (campaignId) {
      fetchSupporters();
    }
  }, [campaignId]);

  const formatTime = (date) => {
    if (!date) return "Recently";

    const now = new Date();
    const donationDate = new Date(date);

    const difference = Math.floor(
      (now - donationDate) / (1000 * 60 * 60)
    );

    if (difference < 1) {
      return "Just now";
    }

    if (difference === 1) {
      return "1 hour ago";
    }

    if (difference < 24) {
      return `${difference} hours ago`;
    }

    const days = Math.floor(difference / 24);

    if (days === 1) {
      return "Yesterday";
    }

    return `${days} days ago`;
  };

  // Only show latest 3 in the main section
  const recentSupporters = supporters.slice(0, 3);

  return (
    <>
      {/* Recent Supporters Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-xl backdrop-blur-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <Heart className="fill-white" size={24} />

            <div>
              <h2 className="text-2xl font-bold">
                Recent Supporters
              </h2>

              <p className="text-sm text-green-100">
                People who recently supported this campaign
              </p>
            </div>
          </div>
        </div>

        {/* Supporters List */}
        <div className="p-6">
          {loading ? (
            <div className="py-8 text-center text-slate-500">
              Loading supporters...
            </div>
          ) : recentSupporters.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No supporters yet.
            </div>
          ) : (
            <div className="space-y-5">
              {recentSupporters.map((supporter) => {
                const user =
                  supporter.backer || supporter.user;

                return (
                  <motion.div
                    key={supporter._id}
                    whileHover={{ x: 6 }}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition-all duration-300 hover:bg-indigo-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase() ||
                          "U"}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {user?.name ||
                            "Anonymous Supporter"}
                        </h3>

                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <Clock size={13} />

                          <span>
                            {formatTime(
                              supporter.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        ₹
                        {Number(
                          supporter.amount || 0
                        ).toLocaleString()}
                      </p>

                      <p className="text-xs text-slate-500">
                        Donated
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* View All Button */}
          {supporters.length > 3 && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-8 w-full rounded-2xl border border-slate-200 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
            >
              View All Supporters
            </button>
          )}
        </div>
      </motion.div>

      {/* All Supporters Modal */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            onClick={() => setShowAll(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-2">
                    <Heart
                      className="fill-white"
                      size={22}
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      All Supporters
                    </h2>

                    <p className="text-sm text-green-100">
                      {supporters.length} supporter
                      {supporters.length !== 1
                        ? "s"
                        : ""}{" "}
                      supported this campaign
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAll(false)}
                  className="rounded-full p-2 transition hover:bg-white/20"
                  aria-label="Close supporters"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="max-h-[65vh] overflow-y-auto p-6">
                {supporters.length === 0 ? (
                  <div className="py-10 text-center text-slate-500">
                    No supporters yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {supporters.map((supporter) => {
                      const user =
                        supporter.backer ||
                        supporter.user;

                      return (
                        <motion.div
                          key={supporter._id}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition hover:bg-indigo-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white">
                              {user?.name
                                ?.charAt(0)
                                .toUpperCase() ||
                                "U"}
                            </div>

                            <div>
                              <h3 className="font-semibold text-slate-900">
                                {user?.name ||
                                  "Anonymous Supporter"}
                              </h3>

                              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                <Clock size={13} />

                                <span>
                                  {formatTime(
                                    supporter.createdAt
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              ₹
                              {Number(
                                supporter.amount || 0
                              ).toLocaleString()}
                            </p>

                            <p className="text-xs text-slate-500">
                              Donated
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-100 p-4">
                <button
                  onClick={() => setShowAll(false)}
                  className="w-full rounded-2xl bg-slate-100 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecentSupporters;