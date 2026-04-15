# Paul Kagame Portfolio Website - Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Website Structure](#website-structure)
3. [Features & Functionality](#features--functionality)
4. [Local Storage Implementation](#local-storage-implementation)
5. [Page Descriptions](#page-descriptions)
6. [Technical Specifications](#technical-specifications)
7. [Usage Guide](#usage-guide)
8. [Browser Compatibility](#browser-compatibility)

---

## Project Overview

The Paul Kagame Portfolio Website is a comprehensive educational web project showcasing the life, leadership, achievements, and ongoing work of President Paul Kagame of Rwanda. The website has been enhanced with modern features including local storage functionality for comments, visitor tracking, and an expanded news section with working "View More" functionality.

### Key Enhancements Made:
- Expanded news section with 9 news items and working "View More" functionality
- Local storage-based comment system for immediate user engagement
- Visitor tracking system using local storage
- Two new pages: Events and Resources
- Updated navigation across all pages
- Enhanced content and styling throughout

---

## Website Structure

```
/
├── index.html              # Homepage with hero section and highlights
├── biography.html          # Biography and life story
├── leadership.html         # Leadership philosophy and vision
├── achievements.html       # Major achievements and impact
├── gallery.html           # Photo and video gallery
├── news.html              # News and speeches with comments
├── events.html            # Upcoming and past events (NEW)
├── resources.html         # Documents, speeches, publications (NEW)
├── contact.html           # Contact form and information
├── assets/
│   ├── css/
│   │   └── style.css      # Global stylesheet
│   ├── js/
│   │   └── main.js        # Global JavaScript functionality
│   └── images/            # Image assets
└── DOCUMENTATION.md       # This documentation file
```

---

## Features & Functionality

### 1. Dark/Light Theme Toggle
- **Location:** All pages (header navigation)
- **Functionality:** Users can toggle between dark and light themes
- **Persistence:** Theme preference is saved in localStorage
- **Implementation:** CSS variables with data-theme attribute

### 2. Mobile Responsive Navigation
- **Hamburger Menu:** Appears on screens smaller than 992px
- **Smooth Animation:** Menu slides in/out with icon change
- **Accessibility:** Proper focus states and keyboard navigation

### 3. Scroll-to-Top Button
- **Trigger:** Appears after scrolling 300px
- **Animation:** Smooth scroll to top of page
- **Styling:** Fixed position with hover effects

### 4. Scroll Reveal Animations
- **Effect:** Elements fade in and slide up when entering viewport
- **Implementation:** Intersection Observer API
- **Applied to:** All major content sections

### 5. Dynamic Greeting
- **Location:** Homepage
- **Functionality:** Displays time-appropriate greeting (Good Morning/Afternoon/Evening)
- **Implementation:** JavaScript Date object

---

## Local Storage Implementation

### 1. Comment System (News Page)

**Features:**
- Users can post comments on news articles
- Comments are stored in localStorage and persist across sessions
- Comments display immediately after posting
- Each comment includes: name, text, timestamp, and unique ID
- Comment count displayed for each article

**Storage Structure:**
```javascript
// Comments stored per article
localStorage.setItem(`comments-${articleId}`, JSON.stringify([
    { id: timestamp, name: "User Name", text: "Comment text", timestamp: "ISO date" }
]));
```

**Functions:**
- `addComment(id)` - Adds a new comment
- `loadComments(id)` - Loads and displays comments
- `toggleComments(id)` - Shows/hides comment section

### 2. Like System (News Page)

**Features:**
- Users can like/unlike news articles
- Like count persists across sessions
- Visual feedback with icon change
- Prevents duplicate likes from same user

**Storage Structure:**
```javascript
localStorage.setItem(`likes-${articleId}`, likeCount);
localStorage.setItem(`user-liked-${articleId}`, "true/false");
```

**Functions:**
- `toggleLike(id)` - Toggles like status

### 3. Visitor Tracking System

**Global Tracking (main.js):**
- Unique visitor ID generation
- Total visits counter
- Pages visited tracking
- Session page views
- Visit history with timestamps

**News Page Specific Tracking:**
- Total visitors display
- Unique visitors count
- Page views counter
- Total comments across all articles

**Storage Structure:**
```javascript
// Global visitor data
localStorage.setItem('pk_visitor_id', uniqueId);
localStorage.setItem('pk_total_visits', count);
localStorage.setItem('pk_pages_visited', JSON.stringify([]));
localStorage.setItem('pk_visit_history', JSON.stringify([]));

// News page specific
localStorage.setItem('totalVisits', count);
localStorage.setItem('uniqueVisitors', JSON.stringify([]));
localStorage.setItem('newsPageViews', count);
```

**Functions:**
- `trackGlobalVisitor()` - Tracks visitor across all pages
- `trackVisitor()` - News page specific tracking
- `getVisitorStats()` - Returns visitor statistics
- `clearVisitorData()` - Clears all visitor data (for testing)

### 4. Newsletter Subscription (Events Page)

**Features:**
- Email subscription form
- Stores subscriber emails in localStorage
- Success message feedback

**Storage Structure:**
```javascript
localStorage.setItem('newsletterSubscribers', JSON.stringify([email1, email2, ...]));
```

### 5. Contact Form Messages

**Features:**
- Stores submitted contact form messages
- Includes name, email, subject, message, and timestamp

**Storage Structure:**
```javascript
localStorage.setItem('contactMessages', JSON.stringify([
    { name, email, subject, message, timestamp }
]));
```

---

## Page Descriptions

### 1. Homepage (index.html)
- Hero section with typing animation
- Introduction to Paul Kagame
- Key highlights cards
- Statistics counter animation
- Latest news preview
- Inspirational quote

### 2. Biography (biography.html)
- Detailed life story
- Quick facts sidebar
- Interactive timeline
- Awards and recognition section
- Personal philosophy

### 3. Leadership (leadership.html)
- Leadership style description
- Vision 2050 showcase
- Key policies with tabbed interface
- Leadership qualities icons
- Inspirational quotes

### 4. Achievements (achievements.html)
- Major achievement cards
- Before/After comparison
- Statistics by numbers
- International recognition testimonials

### 5. Gallery (gallery.html)
- Image slider/carousel
- Filterable photo gallery
- Modal lightbox with navigation
- Featured videos section

### 6. News (news.html) - ENHANCED
- **9 News Articles:** Covering speeches, events, development, and diplomacy
- **Category Filtering:** Filter by All, Speeches, Events, Development, Diplomacy
- **Read More Functionality:** Expand/collapse full article content
- **View More Button:** Shows/hides additional news items
- **Comment System:** Full commenting with localStorage persistence
- **Like System:** Like/unlike with count persistence
- **Visitor Statistics:** Real-time visitor engagement stats

### 7. Events (events.html) - NEW
- Calendar widget
- Tabbed interface: Upcoming, Past, Annual Programs
- Event cards with date boxes
- Newsletter subscription form
- Detailed event information

### 8. Resources (resources.html) - NEW
- Resource category cards
- Search functionality
- Quick access links
- Speeches download section
- Official documents
- Featured videos
- Publications list

### 9. Contact (contact.html)
- Contact form with validation
- Contact information cards
- Social media links
- Map placeholder
- FAQ accordion section

---

## Technical Specifications

### Technologies Used:
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **JavaScript (ES6+)** - Modern JavaScript features
- **Font Awesome 6** - Icons
- **Google Fonts** - Poppins font family

### CSS Variables (Custom Properties):
```css
:root {
    --primary-color: #00A3E0;    /* Rwanda Flag Blue */
    --secondary-color: #FAD201;   /* Rwanda Flag Yellow */
    --accent-color: #20603D;      /* Rwanda Flag Green */
    --text-color: #333;
    --bg-color: #fff;
    --card-bg: #f9f9f9;
    --nav-bg: rgba(255, 255, 255, 0.95);
    --transition: all 0.3s ease;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Responsive Breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### Browser APIs Used:
- localStorage API
- sessionStorage API
- Intersection Observer API
- DOM API
- Event API

---

## Usage Guide

### For Website Visitors:

1. **Browsing Content:**
   - Use the navigation menu to explore different sections
   - Click on news articles to read full content
   - Use filters on News and Gallery pages

2. **Interacting with News:**
   - Click "Read More" to expand article content
   - Click "View More News" to see additional articles
   - Use category filters to find specific content
   - Post comments (visible immediately)
   - Like articles

3. **Theme Preferences:**
   - Click the moon/sun icon to toggle dark/light mode
   - Preference is saved for future visits

4. **Events & Resources:**
   - Subscribe to newsletter on Events page
   - Download documents from Resources page
   - Search resources using the search box

### For Developers:

1. **Adding New News Articles:**
   ```html
   <div class="news-card" data-id="X" data-category="category">
       <!-- Article content -->
   </div>
   ```

2. **Accessing Visitor Stats:**
   ```javascript
   const stats = getVisitorStats();
   console.log(stats.totalVisits);
   console.log(stats.pagesVisited);
   ```

3. **Clearing Local Storage (Testing):**
   ```javascript
   clearVisitorData(); // Clears all visitor tracking
   localStorage.clear(); // Clears all localStorage data
   ```

---

## Browser Compatibility

### Supported Browsers:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Opera 67+

### Features Requiring Modern Browsers:
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API
- ES6+ JavaScript features
- localStorage/sessionStorage

### Fallbacks:
- Graceful degradation for older browsers
- Basic functionality without JavaScript
- Print styles for printing pages

---

## Future Enhancements

Potential improvements for future versions:
1. Backend integration for persistent data storage
2. Real-time comment notifications
3. Multi-language support
4. Advanced search functionality
5. Social media sharing integration
6. Analytics dashboard
7. RSS feed for news updates
8. Email notification system

---

## Credits & Disclaimer

**Educational Purpose:** This website is created for educational and portfolio demonstration purposes.

**Content Sources:** Information compiled from publicly available sources about Rwanda's development and President Paul Kagame's public work.

**Copyright:** &copy; 2026 Paul Kagame Portfolio. All Rights Reserved.

---

*Documentation Version: 1.0*
*Last Updated: April 2026*
