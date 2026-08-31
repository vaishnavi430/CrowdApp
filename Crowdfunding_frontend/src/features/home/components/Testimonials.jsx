import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Campaign Creator",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "This platform helped me raise funds for my Smart Farming project. The process was simple, transparent, and the support from donors was incredible.",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Supporter",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "I love how easy it is to discover meaningful campaigns. The interface is modern and donating takes just a few clicks.",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "NGO Founder",
    image: "https://randomuser.me/api/portraits/men/61.jpg",
    review:
      "CrowdFund has transformed the way we reach supporters. We exceeded our fundraising goal much faster than expected.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50 py-24">
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full border border-indigo-200 bg-white/70 px-5 py-2 text-sm font-semibold text-indigo-600 backdrop-blur-md">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Loved by Thousands
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Hear what campaign creators and supporters say about their
            experience with our crowdfunding platform.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
            >
              <div className="mb-5 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-8 text-slate-600">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;