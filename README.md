# LevelUp
 * Gain exp by completing real world tasks and challenges.
 * Exp can be spent on customizable items for your avatar/plot
 * Level up, customize your Plot/Avatar, and view friends plots
 * Challenge friends and win exp/item prizes



## Tech Stack
 * Backend:
    - Ruby on Rails: For managing users, tasks, and exp. Rails' built in MVC structure can streamline building RESTful APIs to handle user interaction and manage data
    - PostgreSQL: Database that integrates well with Rails, and can handle complex queries and relations, which can be useful for tracking user progress, items, and friends' data.
    - Redis: For caching and handling real-time updates(e.g, when a friend visits a friends plot)
 
 * Frontend:
    - React: For building dynamic UIs, especially for handling interactions like customizing avatars or plots.
    - Tailwind CSS: For styling

 * Real-time Features:
    - ActionCable: Rails built in WebSocket library. Can manage real time updates, like notifications when a friend visits your plot.
    - Pusher or Firebase: Alternative options for implementing real-time features if we need something more scalable

 * Hosting:
    - Heroku

## Graphic Design Tools
 * For creating avatars and items(try these):
    - Figma: It’s free for basic use and excellent for designing UI elements, character assets, and even prototypes. Its collaborative features are great if you plan to work with others.
    - GIMP: A free, open-source alternative to Photoshop. It’s powerful for creating detailed graphics and pixel art if you want to create avatars and items.
    - Inkscape: For vector graphics (like scalable icons or simple character designs), Inkscape is free and versatile.
    - Blender: If you want to experiment with 3D elements, Blender is a free and powerful tool for creating 3D models that you could potentially render into 2D sprites for your app.
