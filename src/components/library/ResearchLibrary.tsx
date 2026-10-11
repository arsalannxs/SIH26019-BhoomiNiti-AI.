import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  ArrowUpDown, 
  Sparkles,
  Share2,
  FileText,
  SlidersHorizontal
} from 'lucide-react';
import { ResearchResource, ResourceCategory } from '../../types';

interface ResearchLibraryProps {
  resources: ResearchResource[];
  onOpenResource: (resource: ResearchResource) => void;
  savedIds: string[];
  onToggleBookmark: (id: string) => void;
  initialQuery?: string;
  initialTopic?: string | null;
  onClearInitialTopic?: () => void;
}

export const ResearchLibrary: React.FC<ResearchLibraryProps> = ({
  resources,
  onOpenResource,
  savedIds,
  onToggleBookmark,
  initialQuery = '',
  initialTopic = null,
  onClearInitialTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(initialTopic);
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'citations' | 'title'>('year-desc');
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);

  const categories = [
    'All',
    'Research Papers',
    'Government Reports',
    'Policy Documents',
    'Legal and Regulatory References',
    'Case Studies',
    'Geospatial Resources'
  ];

  // Extract all unique topic tags
  const allTopicTags = useMemo(() => {
    const tags = new Set<string>();
    resources.forEach((r) => r.topicTags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [resources]);

  // Filtered and sorted resources
  const filteredResources = useMemo(() => {
    return resources
      .filter((res) => {
        // Search query filter
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          !query || 
          res.title.toLowerCase().includes(query) ||
          res.abstract.toLowerCase().includes(query) ||
          res.author.toLowerCase().includes(query) ||
          res.organization.toLowerCase().includes(query) ||
          res.keywords.some((k) => k.toLowerCase().includes(query)) ||
          res.topicTags.some((t) => t.toLowerCase().includes(query));

        // Category filter
        const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;

        // Topic filter
        const activeTopic = selectedTopic || initialTopic;
        const matchesTopic = !activeTopic || res.topicTags.includes(activeTopic);

        // Saved filter
        const matchesSaved = !filterSavedOnly || savedIds.includes(res.id);

        return matchesQuery && matchesCategory && matchesTopic && matchesSaved;
      })
      .sort((a, b) => {
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'year-asc') return a.year - b.year;
        if (sortBy === 'citations') return (b.citationCount || 0) - (a.citationCount || 0);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [resources, searchQuery, selectedCategory, selectedTopic, initialTopic, filterSavedOnly, savedIds, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header & Search Bar */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#173F35]">Research Library & Repository</h2>
            <p className="text-xs text-[#66756A] mt-0.5">
              Discover verified publications, policy evaluations, and cadastral spatial papers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterSavedOnly(!filterSavedOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors border ${
                filterSavedOnly 
                  ? 'bg-[#C58B45] text-white border-[#C58B45]' 
                  : 'bg-[#F8F6EF] text-[#253B32] border-[#E4E7DD] hover:bg-[#DDECE2]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Items ({savedIds.length})</span>
            </button>

            <div className="flex items-center gap-1 bg-[#F8F6EF] px-2.5 py-1.5 rounded-lg border border-[#E4E7DD] text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#66756A]" />
              <label htmlFor="sort-by" className="sr-only">Sort by</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-[#173F35] focus:outline-none cursor-pointer"
              >
                <option value="year-desc">Newest Year</option>
                <option value="year-asc">Oldest Year</option>
                <option value="citations">Most Cited</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Input and Categories */}
        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#66756A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, author, keyword (e.g. DILRMP, credit, drone, tenancy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F35] text-[#253B32]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-[#173F35] text-white shadow-2xs' 
                    : 'bg-[#F8F6EF] text-[#253B32] hover:bg-[#DDECE2] border border-[#E4E7DD]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Topic filter tags */}
        <div className="mt-4 pt-4 border-t border-[#E4E7DD] flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-[#66756A] mr-1">Filter by Topic:</span>
          {selectedTopic && (
            <button
              onClick={() => {
                setSelectedTopic(null);
                if (onClearInitialTopic) onClearInitialTopic();
              }}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C74747] text-white flex items-center gap-1"
            >
              Clear Topic Filter ✕
            </button>
          )}
          {allTopicTags.map((tag) => {
            const isSelected = selectedTopic === tag || (!selectedTopic && initialTopic === tag);
            return (
              <button
                key={tag}
                onClick={() => setSelectedTopic(isSelected ? null : tag)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                  isSelected 
                    ? 'bg-[#173F35] text-white font-semibold' 
                    : 'bg-[#F8F6EF] text-[#253B32] hover:bg-[#DDECE2] border border-[#E4E7DD]'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Disclaimer */}
      <div className="flex items-center justify-between text-xs text-[#66756A] px-1">
        <span>Showing <strong>{filteredResources.length}</strong> resources</span>
        <span className="text-[11px] italic">All citations reflect peer-reviewed benchmarks & DoLR documentation</span>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E7DD]">
          <BookOpen className="w-12 h-12 text-[#66756A] mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-[#173F35]">No resources found</h3>
          <p className="text-xs text-[#66756A] mt-1 max-w-sm mx-auto">
            Try changing your search keywords or clearing active topic/category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedTopic(null);
              setFilterSavedOnly(false);
              if (onClearInitialTopic) onClearInitialTopic();
            }}
            className="mt-4 px-4 py-2 bg-[#173F35] text-white text-xs font-semibold rounded-lg hover:bg-[#254F44]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredResources.map((resource) => {
            const isSaved = savedIds.includes(resource.id);
            return (
              <div
                key={resource.id}
                className="bg-white rounded-2xl border border-[#E4E7DD] p-5 shadow-2xs hover:border-[#173F35] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-2">
                    <span className="font-bold text-[#C58B45]">{resource.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#66756A] font-medium">{resource.date}</span>
                      <button
                        onClick={() => onToggleBookmark(resource.id)}
                        className={`p-1 rounded-md transition-colors ${
                          isSaved ? 'text-[#C58B45]' : 'text-[#66756A] hover:text-[#173F35]'
                        }`}
                        title={isSaved ? 'Remove bookmark' : 'Bookmark resource'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  <h3 
                    onClick={() => onOpenResource(resource)}
                    className="text-base font-bold text-[#173F35] leading-snug cursor-pointer hover:text-[#C58B45] transition-colors"
                  >
                    {resource.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#253B32] mt-1.5">
                    {resource.author} • <span className="text-[#66756A]">{resource.organization}</span>
                  </p>

                  <p className="text-xs text-[#66756A] mt-2 line-clamp-3 leading-relaxed">
                    {resource.abstract}
                  </p>

                  {/* Key Finding highlight */}
                  {resource.keyFindings?.[0] && (
                    <div className="mt-3 p-2.5 rounded-lg bg-[#DDECE2]/50 border border-[#DDECE2] text-xs text-[#173F35]">
                      <span className="font-bold">Key Evidence: </span>
                      <span className="text-[#253B32]">{resource.keyFindings[0]}</span>
                    </div>
                  )}

                  {/* Topic Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {resource.topicTags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] bg-[#F8F6EF] text-[#253B32] border border-[#E4E7DD] px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                    {resource.topicTags.length > 3 && (
                      <span className="text-[10px] text-[#66756A] px-1 py-0.5">
                        +{resource.topicTags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-4 pt-3 border-t border-[#E4E7DD] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#66756A] text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#287A54]" />
                    <span>{resource.accessLevel}</span>
                    {resource.citationCount && (
                      <>
                        <span>•</span>
                        <span>{resource.citationCount} Citations</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenResource(resource)}
                      className="px-3 py-1.5 rounded-lg bg-[#173F35] hover:bg-[#254F44] text-white font-semibold text-xs transition-colors"
                    >
                      View Details & AI Summary
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
