import { motion } from "framer-motion";

import PageContainer from "../components/layout/PageContainer";
import HeroScene from "../components/three/HeroScene";
import useMotivation from "../hooks/useMotivation";
import StudyScene3D from "../components/3d/StudyScene3D";

function Home() {
  const {
    message,
    currentDate,
    weekName,
    isFriday,
    greeting,
  } = useMotivation();

  const formattedDate = new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  ).format(currentDate);

  const weekNumber = Number(
    weekName.replace("week", ""),
  );

  return (
    <PageContainer className="home-page">
      <section className="home-hero">
        <div className="hero-content">
          <motion.div
            className="hero-date"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-date-dot" />
            {formattedDate}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
          >
            {greeting},{" "}
            <span>Student.</span>
          </motion.h1>

          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            {isFriday
              ? "You made it through the week. Finish what matters, then enjoy your weekend."
              : "Let's make today count without making it complicated."}
          </motion.p>
        </div>

                <motion.div
          className="hero-3d-wrapper"
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
        >
          <HeroScene />

          <div className="hero-3d-label">
            <span>01</span>
            <small>KEEP GOING</small>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="motivation-card"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.25,
        }}
      >
        <div className="motivation-top">
          <span className="motivation-label">
            TODAY'S NOTE
          </span>

          <span className="week-badge">
            WEEK {weekNumber}
          </span>
        </div>

        <div className="motivation-body">
          <div className="motivation-symbol">
            +
          </div>

          <div>
            <h2>{message.title}</h2>

            <p>{message.message}</p>

            <span className="motivation-quote">
              “{message.quote}”
            </span>
          </div>
        </div>
      </motion.section>

      <section className="home-grid">
        <motion.article
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="card-icon">✓</div>

          <div className="dashboard-card-content">
            <span>Tasks</span>
            <strong>0</strong>
            <p>Things waiting for you</p>
          </div>
        </motion.article>

        <motion.article
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="card-icon">▤</div>

          <div className="dashboard-card-content">
            <span>Homework</span>
            <strong>0</strong>
            <p>Assignments to complete</p>
          </div>
        </motion.article>

        <motion.article
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="card-icon">○</div>

          <div className="dashboard-card-content">
            <span>Completed</span>
            <strong>0</strong>
            <p>Things you've finished</p>
          </div>
        </motion.article>

        <motion.article
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <div className="card-icon">!</div>

          <div className="dashboard-card-content">
            <span>Upcoming</span>
            <strong>0</strong>
            <p>Important reminders</p>
          </div>
        </motion.article>
      </section>

      <motion.section
        className="week-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div>
          <span className="section-label">
            YOUR WEEK
          </span>

          <h3>
            Keep moving forward.
          </h3>
        </div>

        <div className="week-days">
          {[
            "M",
            "T",
            "W",
            "T",
            "F",
            "S",
            "S",
          ].map((day, index) => (
            <div
              className={`week-day ${
                index === currentDate.getDay() - 1 ||
                (currentDate.getDay() === 0 &&
                  index === 6)
                  ? "today"
                  : ""
              }`}
              key={`${day}-${index}`}
            >
              <span>{day}</span>

              <div className="day-circle">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </PageContainer>
  );
}

export default Home;