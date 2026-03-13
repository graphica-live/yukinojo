import { motion, type Variants } from 'framer-motion';

const GallerySection = () => {
  // We will assume 5 images as provided by the user (indexed 1 to 5)
  // For now using placeholders, the user will replace these with actual files
  const images = [
    { src: '/images/photo1.jpg', alt: 'Yukinojo Portrait 1', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
    { src: '/images/photo2.jpg', alt: 'Yukinojo Portrait 2', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { src: '/images/photo3.jpg', alt: 'Yukinojo Portrait 3', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { src: '/images/photo4.jpg', alt: 'Yukinojo Portrait 4', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { src: '/images/photo5.jpg', alt: 'Yukinojo Portrait 5', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            Visual <span className="text-gradient">Gallery</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[250px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: {
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 100, damping: 15 }
                }
              }}
              whileHover={{ 
                scale: 1.03,
                rotateZ: Math.random() > 0.5 ? 1 : -1,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(123, 31, 162, 0.3)",
                transition: { type: "spring", stiffness: 400, damping: 25 },
                zIndex: 10
              }}
              className={`relative rounded-2xl overflow-hidden glass group cursor-pointer ${img.colSpan} ${img.rowSpan}`}
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              {/* Replace the Unsplash source with img.src once actual files are in public/images */}
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  // Fallback to unsplash placeholder if local image isn't found
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${1550000000000 + index}?q=80&w=800&auto=format&fit=crop`;
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
