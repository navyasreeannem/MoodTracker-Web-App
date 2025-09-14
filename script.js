// Mood Tracker Web App - JavaScript Functionality
// This script handles mood tracking, localStorage, and UI interactions

// Mood data configuration - 20 different moods
const moodConfig = {
    calm: { emoji: '😌', color: '#8E9AAF' },
    relaxed: { emoji: '😊', color: '#CBC0D3' },
    happy: { emoji: '😍', color: '#EFD3D7' },
    dreamy: { emoji: '🌙', color: '#FEEAFA' },
    focused: { emoji: '🎯', color: '#DEE2FF' },
    excited: { emoji: '🤩', color: '#FFB3BA' },
    grateful: { emoji: '🙏', color: '#FFDFBA' },
    peaceful: { emoji: '🕊️', color: '#BAFFC9' },
    energetic: { emoji: '⚡', color: '#BAE1FF' },
    creative: { emoji: '🎨', color: '#E6B3FF' },
    confident: { emoji: '💪', color: '#FFB3E6' },
    nostalgic: { emoji: '📸', color: '#D4A5A5' },
    motivated: { emoji: '🚀', color: '#A5D4A5' },
    content: { emoji: '😌', color: '#A5A5D4' },
    inspired: { emoji: '✨', color: '#D4D4A5' },
    playful: { emoji: '🎪', color: '#FFA5A5' },
    reflective: { emoji: '🤔', color: '#A5FFA5' },
    adventurous: { emoji: '🗺️', color: '#A5A5FF' },
    loving: { emoji: '💕', color: '#FFA5FF' },
    hopeful: { emoji: '🌈', color: '#A5FFFF' }
};

// DOM Elements
const moodButtons = document.querySelectorAll('.mood-btn');
const todayCard = document.getElementById('todayCard');
const moodTimeline = document.getElementById('moodTimeline');

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the mood tracker application
 */
function initializeApp() {
    // Add event listeners to mood buttons
    moodButtons.forEach(button => {
        button.addEventListener('click', handleMoodSelection);
    });
    
    // Load and display existing data
    loadTodayMood();
    loadMoodHistory();
    
    console.log('Mood Tracker initialized successfully!');
}

/**
 * Handle mood button click
 * @param {Event} event - Click event
 */
function handleMoodSelection(event) {
    const selectedMood = event.currentTarget.dataset.mood;
    const currentDate = getCurrentDate();
    
    // Add visual feedback
    event.currentTarget.classList.add('selected');
    setTimeout(() => {
        event.currentTarget.classList.remove('selected');
    }, 600);
    
    // Save mood to localStorage
    saveMoodEntry(selectedMood, currentDate);
    
    // Update UI
    updateTodayDisplay(selectedMood, currentDate);
    loadMoodHistory();
    
    // Show success feedback
    showSuccessFeedback(selectedMood);
}

/**
 * Save mood entry to localStorage
 * @param {string} mood - Selected mood
 * @param {string} date - Current date
 */
function saveMoodEntry(mood, date) {
    try {
        // Get existing entries or create new array
        const existingEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        
        // Check if entry for today already exists
        const todayIndex = existingEntries.findIndex(entry => entry.date === date);
        
        if (todayIndex !== -1) {
            // Update existing entry
            existingEntries[todayIndex] = { mood, date, timestamp: Date.now() };
        } else {
            // Add new entry
            existingEntries.push({ mood, date, timestamp: Date.now() });
        }
        
        // Sort entries by timestamp (newest first)
        existingEntries.sort((a, b) => b.timestamp - a.timestamp);
        
        // Save to localStorage
        localStorage.setItem('moodEntries', JSON.stringify(existingEntries));
        
        console.log(`Mood "${mood}" saved for ${date}`);
    } catch (error) {
        console.error('Error saving mood entry:', error);
        alert('Sorry, there was an error saving your mood. Please try again.');
    }
}

/**
 * Load and display today's mood
 */
function loadTodayMood() {
    try {
        const currentDate = getCurrentDate();
        const existingEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        
        // Find today's entry
        const todayEntry = existingEntries.find(entry => entry.date === currentDate);
        
        if (todayEntry) {
            updateTodayDisplay(todayEntry.mood, todayEntry.date);
        } else {
            // Show default message
            todayCard.innerHTML = '<p class="no-entry">No mood recorded for today yet</p>';
            todayCard.classList.remove('has-entry');
        }
    } catch (error) {
        console.error('Error loading today\'s mood:', error);
    }
}

/**
 * Update today's mood display
 * @param {string} mood - Selected mood
 * @param {string} date - Current date
 */
function updateTodayDisplay(mood, date) {
    const moodData = moodConfig[mood];
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    todayCard.innerHTML = `
        <div class="today-entry">
            <span class="today-emoji">${moodData.emoji}</span>
            <div>
                <div class="today-mood">${mood}</div>
                <div class="today-time">Recorded at ${timeString}</div>
            </div>
        </div>
    `;
    
    todayCard.classList.add('has-entry');
}

/**
 * Load and display mood history
 */
function loadMoodHistory() {
    try {
        const existingEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        
        if (existingEntries.length === 0) {
            moodTimeline.innerHTML = '<p class="no-history">No mood history yet. Start tracking your feelings!</p>';
            return;
        }
        
        // Generate timeline HTML
        const timelineHTML = existingEntries.map(entry => {
            const moodData = moodConfig[entry.mood];
            const formattedDate = formatDate(entry.date);
            const timeString = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return `
                <div class="mood-entry" data-timestamp="${entry.timestamp}">
                    <div class="mood-entry-info">
                        <span class="mood-entry-emoji">${moodData.emoji}</span>
                        <div class="mood-entry-details">
                            <div class="mood-entry-mood">${entry.mood}</div>
                            <div class="mood-entry-date">${formattedDate} at ${timeString}</div>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="deleteMoodEntry('${entry.timestamp}')">
                        Delete
                    </button>
                </div>
            `;
        }).join('');
        
        moodTimeline.innerHTML = timelineHTML;
        
    } catch (error) {
        console.error('Error loading mood history:', error);
        moodTimeline.innerHTML = '<p class="no-history">Error loading mood history. Please refresh the page.</p>';
    }
}

/**
 * Delete a mood entry
 * @param {string} timestamp - Entry timestamp
 */
function deleteMoodEntry(timestamp) {
    if (!confirm('Are you sure you want to delete this mood entry?')) {
        return;
    }
    
    try {
        const existingEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        const updatedEntries = existingEntries.filter(entry => entry.timestamp.toString() !== timestamp);
        
        localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
        
        // Reload displays
        loadTodayMood();
        loadMoodHistory();
        
        console.log('Mood entry deleted successfully');
    } catch (error) {
        console.error('Error deleting mood entry:', error);
        alert('Sorry, there was an error deleting the entry. Please try again.');
    }
}

/**
 * Show success feedback when mood is recorded
 * @param {string} mood - Selected mood
 */
function showSuccessFeedback(mood) {
    // Create temporary success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8E9AAF, #CBC0D3);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(142, 154, 175, 0.3);
        z-index: 1000;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        animation: slideInRight 0.5s ease;
    `;
    
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${moodConfig[mood].emoji}</span>
            <span>Mood "${mood}" recorded!</span>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 3000);
}

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string} Current date
 */
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

/**
 * Format date for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }
    
    // Check if it's yesterday
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }
    
    // Format as "Month Day, Year"
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Add CSS animations for success feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for global access (needed for onclick handlers)
window.deleteMoodEntry = deleteMoodEntry;
