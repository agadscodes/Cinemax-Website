# CINEMAX | Search Movie & TV

CINEMAX is a dynamic, sleek, and responsive web application designed for movie and television enthusiasts. The platform allows users to browse currently playing films, explore popular titles, and search for their favorite movies or TV shows in real time using data fetched from a media API (like TMDB).

## 🚀 Features

* **Now Playing Slider:** An interactive, touch-responsive carousel showcasing movies currently in theaters, powered by Swiper.js.
* **Dynamic Search:** A unified search engine that lets users quickly toggle between filtering for Movies or TV Shows.
* **Popular Section:** A clean grid layout displaying trending and popular movies.
* **Loading State:** Built-in animated spinner to ensure a smooth user experience while fetching asynchronous data.
* **Fully Responsive:** Optimized for a seamless experience across mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom styling with a grid/flexbox layout)
* **JavaScript:** Vanilla JS (ES6+) utilizing asynchronous API fetching (`async/await`)
* **Libraries & Plugins:**
    * [Swiper.js](https://swiperjs.com/) (For the movie slider)
    * [FontAwesome](https://fontawesome.com/) (For clean, modern iconography)
    * Google Fonts (Poppins typography)

## 📁 Project Structure

```text
├── css/
│   ├── style.css       # Main application styles
│   └── spinner.css     # Loading spinner styles
├── js/
│   └── script.js       # Core application logic and API integration
├── lib/
│   └── fontawesome.css # Icon pack styling
├── index.html          # Main landing page (Movies & Search)
└── shows.html          # TV Shows landing page
