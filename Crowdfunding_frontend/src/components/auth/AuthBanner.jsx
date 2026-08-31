import { motion } from "framer-motion";

const AuthBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex flex-1 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-14 text-white"
    >
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-bold leading-tight">
          Fund Ideas.
          <br />
          Build Dreams.
        </h1>

        <p className="mt-8 max-w-lg text-lg text-indigo-100 leading-8">
          Join thousands of creators raising funds for innovative ideas,
          startups, charities, education and social causes around the world.
        </p>

        <div className="mt-14 flex gap-10">
          <div>
            <h2 className="text-4xl font-bold">12K+</h2>
            <p className="mt-2 text-indigo-200">
              Campaigns
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">₹85M+</h2>
            <p className="mt-2 text-indigo-200">
              Funds Raised
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">45K+</h2>
            <p className="mt-2 text-indigo-200">
              Supporters
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthBanner;