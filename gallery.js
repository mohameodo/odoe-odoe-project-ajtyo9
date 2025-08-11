document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const images = [
        { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1874&auto=format&fit=crop', alt: 'Misty forest path' },
        { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1740&auto=format&fit=crop', alt: 'Sunlight through forest trees' },
        { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1840&auto=format&fit=crop', alt: 'Winding river through green hills' },
        { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1740&auto=format&fit=crop', alt: 'Green meadow with a single tree' },
        { src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1887&auto=format&fit=crop', alt: 'Majestic waterfall' },
        { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1742&auto=format&fit=crop', alt: 'Mountain landscape with a lake' }
    ];

    images.forEach(image => {
        const div = document.createElement('div');
        div.className = 'group relative overflow-hidden rounded-lg shadow-lg cursor-pointer';
        div.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p class="text-white text-lg font-semibold">View Image</p>
            </div>
        `;
        div.addEventListener('click', () => openLightbox(image.src, image.alt));
        galleryGrid.appendChild(div);
    });

    const openLightbox = (src, alt) => {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.remove('hidden');
    };

    const closeLightbox = () => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
        lightboxImg.alt = '';
    };

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden');
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
});