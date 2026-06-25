/**
 * scorm-controller.js
 * 
 * A robust wrapper for the pipwerks SCORM API wrapper to manage LMS communication.
 * Designed for Malaysia PDPA eLearning Module.
 * 
 * @author Expert SCORM & LMS Developer
 * @version 1.0.0
 */

const SCORM_Controller = (() => {
    let isLMSConnected = false;

    /**
     * Initializes the SCORM connection.
     * Checks if the LMS is available and sets the connection status.
     */
    const initCourse = () => {
        isLMSConnected = pipwerks.SCORM.init();

        if (isLMSConnected) {
            console.log("[SCORM] Connection initialized successfully.");
        } else {
            console.warn("[SCORM] LMS connection failed. Running in standalone mode.");
        }
        return isLMSConnected;
    };

    /**
     * Terminates the SCORM connection.
     * Should be called when the user exits the course.
     */
    const closeCourse = () => {
        if (isLMSConnected) {
            const success = pipwerks.SCORM.quit();
            if (success) {
                isLMSConnected = false;
                console.log("[SCORM] Connection closed successfully.");
            }
        }
    };

    /**
     * Sets the lesson completion status.
     * @param {string} status - 'completed', 'passed', 'failed', 'incomplete'
     */
    const setCompletion = (status) => {
        if (!isLMSConnected) return;

        const success = pipwerks.SCORM.set("cmi.core.lesson_status", status) || 
                        pipwerks.SCORM.set("cmi.completion_status", status);
        
        if (success) {
            console.log(`[SCORM] Completion status set to: ${status}`);
            saveProgress();
        } else {
            console.error(`[SCORM] Failed to set completion status.`);
        }
    };

    /**
     * Sets the assessment score in the LMS.
     * @param {number} score - The raw score achieved.
     * @param {number} min - The minimum possible score (usually 0).
     * @param {number} max - The maximum possible score (usually 100).
     */
    const setScore = (score, min, max) => {
        if (!isLMSConnected) return;

        // SCORM 1.2 & 2004 handling via pipwerks abstraction
        pipwerks.SCORM.set("cmi.core.score.raw", score);
        pipwerks.SCORM.set("cmi.core.score.min", min);
        pipwerks.SCORM.set("cmi.core.score.max", max);
        
        // Also handle 2004 specifically if needed, though pipwerks often maps these
        pipwerks.SCORM.set("cmi.score.raw", score);
        pipwerks.SCORM.set("cmi.score.min", min);
        pipwerks.SCORM.set("cmi.score.max", max);

        console.log(`[SCORM] Score set: ${score} (Min: ${min}, Max: ${max})`);
        saveProgress();
    };

    /**
     * Saves the current location (bookmark) in the course.
     * @param {string|number} location - A string or index identifying the current slide/page.
     */
    const saveBookmark = (location) => {
        if (!isLMSConnected) return;

        const success = pipwerks.SCORM.set("cmi.core.lesson_location", location.toString()) || 
                        pipwerks.SCORM.set("cmi.location", location.toString());
        
        if (success) {
            console.log(`[SCORM] Bookmark saved: ${location}`);
            saveProgress();
        }
    };

    /**
     * Retrieves the saved bookmark from the LMS.
     * @returns {string|null} The saved location string or null if not found/connected.
     */
    const getBookmark = () => {
        if (!isLMSConnected) return null;

        return pipwerks.SCORM.get("cmi.core.lesson_location") || 
               pipwerks.SCORM.get("cmi.location");
    };

    /**
     * Persists the current SCORM data to the LMS server.
     */
    const saveProgress = () => {
        if (isLMSConnected) {
            const success = pipwerks.SCORM.save();
            if (success) {
                console.log("[SCORM] Progress saved to LMS.");
            }
        }
    };

    // Public API
    return {
        initCourse,
        closeCourse,
        setCompletion,
        setScore,
        saveBookmark,
        getBookmark,
        saveProgress,
        get isConnected() { return isLMSConnected; }
    };
})();

// Export for global use if not using modules, or can be used as a module
window.SCORM_Controller = SCORM_Controller;
