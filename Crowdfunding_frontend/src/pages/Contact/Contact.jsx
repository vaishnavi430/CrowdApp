import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@crowdapp.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Pune, Maharashtra, India",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Fri | 9:00 AM - 6:00 PM",
  },
];

function Contact() {
  return (
    <section
  className="
    contact-page
    relative
    overflow-hidden
    bg-gradient-to-b
    from-slate-50
    via-indigo-50/40
    to-white
    dark:from-slate-950
    dark:via-slate-900
    dark:to-slate-950
  "
>
      {/* =========================================
          BACKGROUND GLOW
      ========================================= */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-[150px]" />

      <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-violet-300/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        {/* =========================================
            HERO
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-20 text-center"
        >
          <span
            className="
              rounded-full
              border
              border-indigo-200
              bg-white/70
              px-5
              py-2
              text-sm
              font-semibold
              text-indigo-600
              backdrop-blur-md
              dark:border-slate-700
              dark:bg-slate-800/70
              dark:text-indigo-300
            "
          >
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-slate-900 dark:text-white md:text-6xl">
            We'd Love To

            <span
              className="
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Hear From You
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Have a question, suggestion, or need assistance? Our team is
            always ready to help you with anything related to CrowdApp.
          </p>
        </motion.div>

        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="grid gap-10 lg:grid-cols-2">

          {/* =========================================
              CONTACT INFORMATION
          ========================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="grid gap-6">

              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      contact-card
                      flex
                      items-center
                      gap-5
                      rounded-3xl
                      border
                      border-white/40
                      bg-white/80
                      p-6
                      shadow-xl
                      backdrop-blur-xl
                      transition
                      hover:-translate-y-1
                      dark:border-slate-700
                      dark:bg-slate-800/90
                    "
                  >
                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-r
                        from-indigo-600
                        to-violet-600
                        text-white
                      "
                    >
                      <Icon size={28} />
                    </div>

                    {/* Text */}

                    <div>
                      <h3
                        className="
                          text-xl
                          font-bold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* =========================================
                OFFICE IMAGE
            ========================================= */}

            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
              alt="Office"
              className="mt-8 rounded-3xl shadow-2xl"
            />
          </motion.div>

          {/* =========================================
              CONTACT FORM
          ========================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              contact-form-card
              rounded-3xl
              border
              border-white/40
              bg-white/80
              p-8
              shadow-2xl
              backdrop-blur-xl
              dark:border-slate-700
              dark:bg-slate-800/90
            "
          >
            {/* Form Heading */}

            <div className="mb-8 flex items-center gap-3">

              <MessageCircle
                className="text-indigo-600 dark:text-indigo-400"
                size={30}
              />

              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                Send us a Message
              </h2>
            </div>

            {/* Form */}

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-4
                  text-slate-900
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-slate-400
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-4
                  text-slate-900
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Subject"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-4
                  text-slate-900
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-slate-400
                "
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-4
                  text-slate-900
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-slate-400
                "
              />

              {/* Submit */}

              <button
                type="submit"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <Send size={20} />

                Send Message
              </button>
            </form>

            {/* =========================================
                SUPPORT CARD
            ========================================= */}

            <div
              className="
                mt-10
                rounded-3xl
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                p-6
                text-white
              "
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
                alt="Customer Support"
                className="
                  h-48
                  w-full
                  rounded-2xl
                  object-cover
                "
              />

              <h3 className="mt-6 text-2xl font-bold">
                We're Here to Help
              </h3>

              <p
                className="
                  mt-3
                  leading-7
                  text-indigo-100
                "
              >
                Whether you have questions about campaigns, donations,
                partnerships, or technical issues, our support team is
                committed to providing quick and helpful responses.
              </p>

              <div
                className="
                  mt-6
                  grid
                  grid-cols-3
                  gap-4
                  text-center
                "
              >
                <div>
                  <h4 className="text-2xl font-bold">
                    24/7
                  </h4>

                  <p className="text-sm text-indigo-100">
                    Support
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold">
                    &lt;12h
                  </h4>

                  <p className="text-sm text-indigo-100">
                    Avg. Reply
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold">
                    98%
                  </h4>

                  <p className="text-sm text-indigo-100">
                    Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================
            FAQ / ASSISTANCE
        ========================================= */}

        <div
          className="
            mt-24
            rounded-3xl
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            p-12
            text-center
            text-white
            shadow-2xl
          "
        >
          <h2 className="text-4xl font-bold">
            Need Immediate Assistance?
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              text-indigo-100
            "
          >
            Our support team is available during business hours to help you
            with campaigns, donations, account issues, and general questions.
          </p>

          <button
            className="
              mt-8
              rounded-2xl
              bg-white
              px-8
              py-4
              font-semibold
              text-indigo-700
              transition
              hover:scale-105
            "
          >
            Visit Help Center
          </button>
        </div>

      </div>
    </section>
  );
}

export default Contact;