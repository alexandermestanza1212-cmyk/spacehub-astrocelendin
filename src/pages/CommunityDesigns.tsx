import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, Eye, Download, Image } from 'lucide-react';
import './CommunityDesigns.css';

interface Design {
  id: number;
  name: string;
  author: string;
  avatar: string;
  views: number;
  downloads: number;
  rating: number;
  tags: string[];
  gradient: string;
}

interface NASAImage {
  url: string;
  title: string;
  media_type: string;
}

const CommunityDesigns: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('Reciente');
  const [category, setCategory] = useState('Todos');
  const [nasaImages, setNasaImages] = useState<NASAImage[]>([]);
  const [showGallery, setShowGallery] = useState(false);

  // Datos de diseños de la comunidad
  const designs: Design[] = [
    {
      id: 1,
      name: 'Mars Lunar Station',
      author: 'Elon Musk',
      avatar: '👨‍🚀',
      views: 2345,
      downloads: 567,
      rating: 4.8,
      tags: ['Cilindro', 'Marte'],
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Orbital Paradise',
      author: 'Space Lover',
      avatar: '👩‍🚀',
      views: 1890,
      downloads: 423,
      rating: 4.9,
      tags: ['Toroide', 'Lujo'],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      name: 'Asteroidea Station',
      author: 'Astrobuild',
      avatar: '🛸',
      views: 3421,
      downloads: 891,
      rating: 4.7,
      tags: ['Esférico', 'Minería'],
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 4,
      name: 'Europa Ice Base',
      author: 'FrostBuilder',
      avatar: '❄️',
      views: 1567,
      downloads: 334,
      rating: 4.6,
      tags: ['Modular', 'Europa'],
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 5,
      name: 'Titan Cloudstation',
      author: 'SkyArchitect',
      avatar: '☁️',
      views: 2890,
      downloads: 678,
      rating: 4.9,
      tags: ['Flotante', 'Titán'],
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 6,
      name: 'Venus Habitat',
      author: 'HotZoneDesign',
      avatar: '🔥',
      views: 1234,
      downloads: 289,
      rating: 4.5,
      tags: ['Cilindro', 'Venus'],
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 7,
      name: 'Lunar Gateway',
      author: 'MoonBase Inc',
      avatar: '🌙',
      views: 4567,
      downloads: 1023,
      rating: 4.8,
      tags: ['Toroide', 'Luna'],
      gradient: 'from-gray-400 to-slate-600'
    },
    {
      id: 8,
      name: 'Nebula Station',
      author: 'Starfield Dev',
      avatar: '✨',
      views: 3890,
      downloads: 756,
      rating: 4.7,
      tags: ['Esférico', 'Espacio'],
      gradient: 'from-indigo-500 to-purple-600'
    }
    
  ];

  // Fetch NASA Images
  useEffect(() => {
    fetchNASAImages();
  }, []);

  const fetchNASAImages = async () => {
    try {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=6'
      );
      const data = await response.json();
      setNasaImages(data.filter((img: NASAImage) => img.media_type === 'image'));
    } catch (error) {
      console.error('Error fetching NASA images:', error);
      setNasaImages([
        { url: 'https://apod.nasa.gov/apod/image/2310/ISS_Moon_20231023.jpg', title: 'ISS y Luna', media_type: 'image' },
        { url: 'https://apod.nasa.gov/apod/image/2310/M33_Master.jpg', title: 'Galaxia M33', media_type: 'image' },
        { url: 'https://apod.nasa.gov/apod/image/2310/Mars_Perseverance.jpg', title: 'Marte - Perseverance', media_type: 'image' }
      ]);
    }
  };

  return (
    <div className="community-designs min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="community-designs__header border-b border-cyan-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="community-designs__header-content max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="community-designs__title text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              SpaceHab Designer
            </h1>
          </div>
          <div className="community-designs__auth-buttons flex gap-4 text-sm">
            <button className="community-designs__login-btn text-cyan-400 hover:text-cyan-300 transition">
              Iniciar Sesión
            </button>
            <button className="community-designs__account-btn px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Accede tu cuenta
            </button>
          </div>
        </div>
      </header>

      <div className="community-designs__container max-w-7xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="community-designs__title-section mb-8">
          <h2 className="community-designs__main-title text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Explora Diseños de la Comunidad
          </h2>
          <p className="community-designs__subtitle text-gray-400 text-lg">Descubre increíbles hábitats espaciales creados por diseñadores de todo el mundo</p>
        </div>

        {/* NASA Gallery Button */}
        <div className="community-designs__gallery-btn mb-6">
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="community-designs__nasa-btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg hover:shadow-xl hover:shadow-orange-500/50 transition-all transform hover:scale-105"
          >
            <Image size={20} />
            <span className="community-designs__nasa-btn-text font-semibold">
              {showGallery ? 'Ocultar' : 'Ver'} Galería NASA
            </span>
          </button>
        </div>

        {/* NASA Image Gallery */}
        {showGallery && (
          <div className="community-designs__nasa-gallery mb-8 p-6 bg-black/40 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
            <h3 className="community-designs__nasa-title text-2xl font-bold mb-4 text-cyan-400">
              🚀 Imágenes Reales de NASA
            </h3>
            <div className="community-designs__nasa-grid grid grid-cols-1 md:grid-cols-3 gap-4">
              {nasaImages.slice(0, 6).map((img, idx) => (
                <div
                  key={idx}
                  className="community-designs__nasa-item group relative overflow-hidden rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all"
                >
                  <img
                    src={img.url}
                    alt={img.title || 'NASA Image'}
                    className="community-designs__nasa-img w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="community-designs__nasa-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="community-designs__nasa-caption absolute bottom-4 left-4 right-4">
                      <p className="community-designs__nasa-text text-sm font-semibold text-cyan-300">
                        {img.title || 'NASA Astronomy Picture'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="community-designs__filter-bar flex flex-wrap gap-4 mb-8 items-center justify-between bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/20">
          <div className="community-designs__filter-options flex gap-2">
            <button className="community-designs__sort-btn px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 rounded-lg text-sm transition">
              Ordenar por: <span className="community-designs__sort-text text-cyan-400 ml-1">{filter}</span>
            </button>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="community-designs__category-select px-4 py-2 bg-slate-800/60 rounded-lg text-sm border border-cyan-500/30 focus:border-cyan-400 focus:outline-none"
            >
              <option>Todos</option>
              <option>Cilindro</option>
              <option>Toroide</option>
              <option>Esférico</option>
              <option>Modular</option>
            </select>
            <button className="community-designs__filter-btn px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 rounded-lg flex items-center gap-2 transition">
              <Filter size={16} />
              Filtros
            </button>
          </div>

          {/* Search */}
          <div className="community-designs__search-bar flex gap-2 items-center">
            <div className="community-designs__search-container relative">
              <Search className="community-designs__search-icon absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar diseños..."
                className="community-designs__search-input pl-10 pr-4 py-2 bg-slate-800/60 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-sm w-64"
              />
            </div>
            <button
              onClick={() => setView('grid')}
              className={`community-designs__grid-btn p-2 rounded-lg transition ${view === 'grid' ? 'bg-cyan-600' : 'bg-slate-800/60 hover:bg-slate-700/60'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`community-designs__list-btn p-2 rounded-lg transition ${view === 'list' ? 'bg-cyan-600' : 'bg-slate-800/60 hover:bg-slate-700/60'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="community-designs__tags flex gap-2 mb-6 flex-wrap">
          {['Destacados', 'Orbital tech', 'Toroidal', 'Modular', 'Cilindro', 'Duracion'].map((tag) => (
            <button
              key={tag}
              className="community-designs__tag-btn px-4 py-2 bg-slate-800/60 hover:bg-cyan-600/50 rounded-full text-sm border border-cyan-500/30 transition"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Design Cards Grid */}
        <div className={view === 'grid' ? 'community-designs__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'community-designs__list space-y-4'}>
          {designs.map((design) => (
            <div
              key={design.id}
              className="community-designs__card group relative bg-slate-800/40 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-cyan-400 overflow-hidden transition-all hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-2"
            >
              {/* 3D Wireframe Preview */}
              <div className={`community-designs__card-preview h-48 bg-gradient-to-br ${design.gradient} relative overflow-hidden`}>
                <div className="community-designs__card-inner absolute inset-0 flex items-center justify-center">
                  <div className="community-designs__card-circle w-32 h-32 border-4 border-cyan-400/30 rounded-full animate-spin-slow relative">
                    <div className="community-designs__card-inner-circle absolute inset-4 border-4 border-cyan-300/50 rounded-full"></div>
                    <div className="community-designs__card-inner-circle absolute inset-8 border-4 border-cyan-200/70 rounded-full"></div>
                  </div>
                </div>
                <div className="community-designs__card-rating absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {design.rating}
                </div>
              </div>

              {/* Card Content */}
              <div className="community-designs__card-content p-4">
                <h3 className="community-designs__card-title font-bold text-lg mb-2 text-cyan-100 group-hover:text-cyan-300 transition">
                  {design.name}
                </h3>
                
                <div className="community-designs__card-author flex items-center gap-2 mb-3">
                  <span className="community-designs__card-avatar text-2xl">{design.avatar}</span>
                  <span className="community-designs__card-author-text text-sm text-gray-400">{design.author}</span>
                </div>

                <div className="community-designs__card-tags flex gap-2 mb-3 flex-wrap">
                  {design.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="community-designs__card-tag px-2 py-1 bg-cyan-600/30 text-cyan-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="community-designs__card-stats flex justify-between items-center text-xs text-gray-400">
                  <div className="community-designs__card-views flex items-center gap-1">
                    <Eye size={14} />
                    {design.views}
                  </div>
                  <div className="community-designs__card-downloads flex items-center gap-1">
                    <Download size={14} />
                    {design.downloads}
                  </div>
                </div>
              </div>

              {/* Hover Buttons */}
              <div className="community-designs__card-buttons absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="community-designs__card-details-btn px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transform scale-90 group-hover:scale-100 transition">
                  Ver Detalles
                </button>
                <button className="community-designs__card-template-btn px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transform scale-90 group-hover:scale-100 transition">
                  Usar Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="community-designs__load-more flex justify-center mt-12">
          <button className="community-designs__load-more-btn px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-xl transition-all transform hover:scale-105">
            Cargar Más Diseños
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDesigns;