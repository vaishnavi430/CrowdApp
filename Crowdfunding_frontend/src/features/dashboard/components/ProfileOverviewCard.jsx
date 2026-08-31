import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Lock,
} from "lucide-react";

const ProfileOverviewCard = ({ profile }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl"
    >
      {/* Cover */}
      <div className="relative h-28 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <img
            src={
              profile.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}`
            }
            alt={profile.name}
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {profile.name}
        </h2>

        <p className="mt-1 text-slate-500">
          {profile.role}
        </p>

        <p className="mt-5 text-sm leading-7 text-slate-600">
          {profile.bio || "No bio added yet."}
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <Mail
              size={20}
              className="text-indigo-600"
            />

            <div className="text-left">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="font-medium text-slate-700">
                {profile.email || "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <Phone
              size={20}
              className="text-emerald-600"
            />

            <div className="text-left">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Phone
              </p>

              <p className="font-medium text-slate-700">
                {profile.phone || "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <MapPin
              size={20}
              className="text-rose-600"
            />

            <div className="text-left">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Location
              </p>

              <p className="font-medium text-slate-700">
                {profile.address || "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <User
              size={20}
              className="text-violet-600"
            />

            <div className="text-left">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Role
              </p>

              <p className="font-medium text-slate-700">
                {profile.role || "User"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard/change-password")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              <Lock size={18} />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </motion.div >
  );
};

export default ProfileOverviewCard;