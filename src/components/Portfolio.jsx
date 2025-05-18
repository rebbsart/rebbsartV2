import React, { useState } from "react";
import PortfolioCSS from "../css/Portfolio.module.css";
import { motion, useAnimation} from "framer-motion";
import { useInView } from "react-intersection-observer";
import Modal from "./Modal"; // Import the Modal component

// Dynamically import all images from the assets/images folder
const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../assets/images", false, /\.(webp|png|jpg|jpeg|gif)$/)
);

function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null); // State to track the selected project

  const openModal = (project) => {
    // Create a project object with all necessary data
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={PortfolioCSS.gridContainer}>
      {images.map((src, index) => (
        <ImageWrapper
          key={index}
          src={src}
          index={index}
          onClick={() => openModal({ src, index })} // Pass project details to modal
        />
      ))}
        {selectedProject && (
          <Modal project={selectedProject} onClose={closeModal} />
        )}
    </div>
  );
}

function ImageWrapper({ src, index, onClick }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeIn" }}
      className={PortfolioCSS.imageWrapper}
      onClick={onClick} // Add click handler
    >
      <img
        src={src}
        alt={`Portfolio ${index + 1}`}
        className={PortfolioCSS.image}
        draggable="false"
      />
    </motion.div>
  );
}

export default Portfolio;
