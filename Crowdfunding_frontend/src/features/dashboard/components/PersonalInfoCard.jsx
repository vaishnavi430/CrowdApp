import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  Pencil,
} from "lucide-react";

const PersonalInfoCard = ({ profile }) => {
  const navigate = useNavigate();
  const fields = [
    {
      icon: User,
      label: "Full Name",
      value: profile.name || "Not Available",
      color: "text-indigo-600",
    },
    {
      icon: Mail,
      label: "Email Address",
      value: profile.email || "Not Available",
      color: "text-blue-600",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: profile.phone || "Not Available",
      color: "text-emerald-600",
    },
    {
      icon: MapPin,
      label: "Address",
      value: profile.address || "Not Available",
      color: "text-rose-600",
    },
    {
      icon: CalendarDays,
      label: "Member Since",
      value: profile.createdAt
        ? new Date(profile.createdAt).toLocaleDateString()
        : "Not Available",
      color: "text-amber-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-xl"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Personal Information
          </h2>

          <p className="mt-2 text-slate-500">
            View and manage your personal details.
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/edit-profile")}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <Pencil size={18} />
          Edit Information
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div
              key={field.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-indigo-200 hover:bg-white"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <Icon
                    size={20}
                    className={field.color}
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {field.label}
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {field.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bio */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <FileText
              size={20}
              className="text-violet-600"
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              About Me
            </h3>

            <p className="text-sm text-slate-500">
              Short biography
            </p>
          </div>
        </div>

        <p className="leading-8 text-slate-600">
          {profile.bio || "No bio added yet."}
        </p>
      </div>
    </motion.div>
  );
};

export default PersonalInfoCard;