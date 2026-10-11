import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  FileSpreadsheet, 
  Layers, 
  Calendar, 
  MapPin, 
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { DatasetItem } from '../../types';

interface DatasetCatalogProps {
  datasets: DatasetItem[];
}

export const DatasetCatalog: React.FC<DatasetCatalogProps> = ({ datasets }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalDataset, setActiveModalDataset] = useState<DatasetItem | null>(null);

  const categories = [
    'All',
    'Cadastral & Records',
    'Land Use & Cover',
    'Climate & Agriculture',
    'Disputes & Judiciary',
  ];

  const filteredDatasets = datasets.filter((ds) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query ||
      ds.title.toLowerCase().includes(query) ||
      ds.description.toLowerCase().includes(query) ||
      ds.publisher.toLowerCase().includes(query) ||
      ds.geographicCoverage.toLowerCase().includes(query);

    const matchesCategory = selectedCategory === 'All' || ds.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DDECE2] text-[#173F35] text-xs font-semibold mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>National Spatial & Administrative Data</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#173F35]">
              Geospatial & Administrative Dataset Catalog
            </h2>
            <p className="text-xs text-[#66756A] mt-1 max-w-2xl">
              Discover verified Open Government Data (OGD) and spatial cadastral layers powering evidence-based land governance and policy formulation.
            </p>
          </div>

          <div className="text-xs text-[#66756A] bg-[#F8F6EF] p-3 rounded-xl border border-[#E4E7DD]">
            <span className="font-bold text-[#173F35] block">Transparency Note:</span>
            <span>Only real OGD & DoLR datasets are marked verified. Simulated research indicators are explicitly tagged.</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 pt-4 border-t border-[#E4E7DD] flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#66756A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search datasets by keyword, publisher, or geographic coverage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F35] text-[#253B32]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
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
      </div>

      {/* Dataset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDatasets.map((ds) => (
          <div
            key={ds.id}
            className="bg-white rounded-2xl border border-[#E4E7DD] p-5 shadow-2xs hover:border-[#173F35] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 text-xs mb-2">
                <span className="font-bold text-[#C58B45]">{ds.category}</span>
                {ds.isSimulatedDemoData ? (
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#F4E8D5] text-[#C58B45] border border-[#C58B45]/30">
                    SIMULATED DEMO DATA
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-[#287A54] bg-[#DDECE2] px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED OGD
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#173F35] leading-snug">
                {ds.title}
              </h3>

              <p className="text-xs font-semibold text-[#253B32] mt-1">
                Publisher: <span className="text-[#66756A]">{ds.publisher}</span>
              </p>

              <p className="text-xs text-[#66756A] mt-2 line-clamp-2 leading-relaxed">
                {ds.description}
              </p>

              {/* Spatial & Record Meta */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] bg-[#F8F6EF] p-3 rounded-xl border border-[#E4E7DD]">
                <div>
                  <span className="text-[#66756A] block">Coverage:</span>
                  <span className="font-bold text-[#173F35] truncate block">{ds.geographicCoverage}</span>
                </div>
                <div>
                  <span className="text-[#66756A] block">Time Period:</span>
                  <span className="font-bold text-[#173F35]">{ds.timePeriod}</span>
                </div>
                <div>
                  <span className="text-[#66756A] block">Format:</span>
                  <span className="font-bold text-[#173F35]">{ds.format}</span>
                </div>
                <div>
                  <span className="text-[#66756A] block">Records:</span>
                  <span className="font-bold text-[#173F35]">{ds.recordCount}</span>
                </div>
              </div>

              {/* Sample Schema Fields Preview */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-[#66756A]">Schema Fields: </span>
                <div className="inline-flex flex-wrap gap-1 mt-1">
                  {ds.availableFields.slice(0, 4).map((f) => (
                    <span key={f} className="text-[10px] font-mono bg-[#DDECE2] text-[#173F35] px-1.5 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                  {ds.availableFields.length > 4 && (
                    <span className="text-[10px] font-mono text-[#66756A] px-1 py-0.5">
                      +{ds.availableFields.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-[#E4E7DD] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#66756A]">
                Updated: {ds.lastUpdated}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalDataset(ds)}
                  className="px-3 py-1.5 rounded-lg bg-[#F8F6EF] hover:bg-[#DDECE2] text-[#173F35] font-semibold text-xs transition-colors border border-[#E4E7DD]"
                >
                  Inspect Schema
                </button>
                <a
                  href={ds.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#173F35] text-white hover:bg-[#254F44] transition-colors"
                  title="Source Registry"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schema Inspector Modal */}
      {activeModalDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E4E7DD] shadow-2xl max-w-xl w-full p-6 animate-in fade-in">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold text-[#C58B45] uppercase">Data Schema Dictionary</span>
                <h3 className="text-lg font-bold text-[#173F35] mt-1">{activeModalDataset.title}</h3>
                <p className="text-xs text-[#66756A]">{activeModalDataset.publisher} • {activeModalDataset.format}</p>
              </div>
              <button
                onClick={() => setActiveModalDataset(null)}
                className="p-1 text-[#66756A] hover:text-[#173F35]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#253B32]">
              <div>
                <h4 className="font-bold text-[#173F35] mb-1">Description:</h4>
                <p className="bg-[#F8F6EF] p-3 rounded-lg border border-[#E4E7DD] leading-relaxed">
                  {activeModalDataset.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#173F35] mb-2">Available Data Columns ({activeModalDataset.availableFields.length}):</h4>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                  {activeModalDataset.availableFields.map((field) => (
                    <div key={field} className="p-2 bg-[#F8F6EF] rounded border border-[#E4E7DD] font-mono text-[11px] text-[#173F35] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#287A54]" />
                      <span>{field}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#F4E8D5] rounded-lg border border-[#C58B45]/30">
                <span className="font-bold text-[#173F35]">Access Policy: </span>
                <span>{activeModalDataset.accessRestrictions}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4E7DD] flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveModalDataset(null)}
                className="px-4 py-2 bg-[#F8F6EF] hover:bg-[#E4E7DD] text-[#253B32] font-semibold text-xs rounded-lg"
              >
                Close
              </button>
              <a
                href={activeModalDataset.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#173F35] hover:bg-[#254F44] text-white font-semibold text-xs rounded-lg flex items-center gap-1.5"
              >
                <span>Visit Source Registry</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
