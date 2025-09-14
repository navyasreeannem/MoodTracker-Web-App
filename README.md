# Mood Tracker Web App 🌸

A beautiful, responsive web application for tracking daily moods with a calming pastel design.

## Features ✨

- **Modern Design**: Clean, minimal interface with a soothing pastel color palette
- **Mood Tracking**: Record your daily moods with 5 different options (Calm, Relaxed, Happy, Dreamy, Focused)
- **Local Storage**: All data is saved locally in your browser - no external servers needed
- **Timeline View**: See your mood history in a beautiful timeline format
- **Delete Entries**: Remove past mood entries you no longer want
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Animated Background**: Subtle gradient animation for a calming effect
- **Success Feedback**: Visual confirmation when moods are recorded

## Color Palette 🎨

The app uses a carefully selected pastel color scheme:
- **Dark Lavender**: #8E9AAF (headings, buttons)
- **Muted Lavender**: #CBC0D3
- **Dusty Pink**: #EFD3D7
- **Soft Pink**: #FEEAFA
- **Light Lavender/Blue**: #DEE2FF

## How to Use 📱

1. **Open the App**: Simply open `index.html` in your web browser
2. **Record Your Mood**: Click on any of the 5 mood buttons to record how you're feeling
3. **View Today's Entry**: See your current mood displayed in the "Today's Entry" section
4. **Browse History**: Scroll through your mood timeline to see past entries
5. **Delete Entries**: Click the "Delete" button on any past entry to remove it

## File Structure 📁

```
MoodTracker Web App/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Technical Details 🔧

### HTML Structure
- Semantic HTML5 elements for accessibility
- Responsive meta viewport tag
- Google Fonts integration (Poppins)

### CSS Features
- CSS Grid and Flexbox for responsive layouts
- CSS animations and transitions
- Custom scrollbar styling
- Mobile-first responsive design
- Backdrop blur effects for modern glass-morphism look

### JavaScript Functionality
- Local Storage API for data persistence
- Event handling for user interactions
- Date formatting and manipulation
- Dynamic DOM manipulation
- Error handling and user feedback

## Browser Compatibility 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization 🛠️

### Adding New Moods
To add new mood options, update the `moodConfig` object in `script.js`:

```javascript
const moodConfig = {
    calm: { emoji: '😌', color: '#8E9AAF' },
    // Add your new mood here
    excited: { emoji: '🤩', color: '#YOUR_COLOR' }
};
```

### Changing Colors
Update the CSS custom properties in `styles.css` to change the color scheme:

```css
:root {
    --primary-color: #8E9AAF;
    --secondary-color: #CBC0D3;
    /* Add your custom colors */
}
```

### Modifying Animations
Adjust animation durations and effects in the CSS `@keyframes` rules.

## Privacy & Data 🔒

- All data is stored locally in your browser's localStorage
- No data is sent to external servers
- You can clear all data by clearing your browser's local storage
- Data persists between browser sessions

## Future Enhancements 🚀

Potential features for future versions:
- Mood statistics and charts
- Export data functionality
- Mood notes/journal entries
- Mood reminders
- Dark mode toggle
- Data backup/restore

## Getting Started 🏃‍♀️

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start tracking your moods!

No installation or setup required - it's a simple, self-contained web application.

---
🌐 Project Deployment

Project Name: Navya’s MoodTracker
Status: ✅ Live
Deployment Link: https://navyas-moodtracker-qolc6yows-navyasreeannem33-1470s-projects.vercel.app

**Enjoy tracking your emotional journey!** 💜

