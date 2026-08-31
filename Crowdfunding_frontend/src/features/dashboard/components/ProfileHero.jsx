import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  BadgeCheck,
  Shield,
  Pencil,
} from "lucide-react";

const ProfileHero = ({ profile }) => {
  const navigate = useNavigate();
  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-2xl"
    >
      {/* Background Glow */}
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <img
            src={
              profile.avatar ||
              "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(profile.name)
            }
            alt={profile.name}
            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl"
          />

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              {profile.isVerified ? (
                <>
                  <BadgeCheck size={16} />
                  Verified User
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Not Verified
                </>
              )}
            </div>

            <h1 className="text-4xl font-bold">
              {profile.name}
            </h1>

            <p className="mt-2 text-lg capitalize text-indigo-100">
              {profile.role}
            </p>

            {profile.bio && (
              <p className="mt-4 max-w-xl text-indigo-100">
                {profile.bio}
              </p>
            )}

            <div className="mt-5 flex items-center gap-2 text-indigo-100">
              <CalendarDays size={18} />
              Joined {joinedDate}
            </div>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={() => navigate("/dashboard/edit-profile")}
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-indigo-700 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
        >
          <Pencil size={18} />
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileHero;