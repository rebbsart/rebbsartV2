import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ModalCSS from "../css/Modal.module.css";
import { motion } from "framer-motion";
import { getProjectMarkdown, extractTitle } from "../utils/markdownUtils";

function Modal({ project, onClose, onPrevious, onNext }) {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState(`Project ${project.index + 1}`);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjectDetails = async () => {
      try {
        setLoading(true);
        const md = await getProjectMarkdown(project.index);
        setMarkdown(md);
        setTitle(extractTitle(md));
      } catch (error) {
        console.error("Error loading project details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectDetails();
  }, [project.index]);
  
  // Disable body scrolling when modal is open
  useEffect(() => {
    // Save the original overflow style
    const originalOverflow = document.body.style.overflow;
    
    // Disable scrolling on the body
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  
  return (
    <motion.div 
      className={ModalCSS.overlay} 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={ModalCSS.modalContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button className={ModalCSS.closeButton} onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={ModalCSS.modalImageContainer}>
          <img
            src={project.src}
            alt={title}
            className={ModalCSS.modalImage}
          />
        </div>
        
        <div className={ModalCSS.projectInfo}>
          {loading ? (
            <div className={ModalCSS.loading}>Loading project details...</div>
          ) : (
            <div className={ModalCSS.markdownContent}>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          )}
        </div>
        
      </motion.div>
    </motion.div>
  );
}

export default Modal;
