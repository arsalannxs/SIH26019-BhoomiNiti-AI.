import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Layers, 
  Info, 
  ShieldCheck, 
  AlertCircle, 
  Download, 
  BarChart3, 
  TrendingUp,
  FileText,
  LandPlot,
  CheckCircle2
} from 'lucide-react';
import { StateGISData } from '../../types';
import { STATE_GIS_DATA } from '../../data/mockData';
import L from 'leaflet';

type GISLayerKey = 
  | 'svamitva'
  | 'dilrmp'
  | 'disputes'
  | 'climate'
  | 'conversion';

export const GISInsights: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<GISLayerKey>('svamitva');
  const [selectedState, setSelectedState] = useState<StateGISData>(STATE_GIS_DATA[0]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const layersConfig: Record<GISLayerKey, { name: string; unit: string; description: string; getVal: (s: StateGISData) => number }> = {
    svamitva: {
      name: 'SVAMITVA Drone Survey Coverage',
      unit: '% Villages Mapped',
      description: 'Percentage of rural inhabited (Abadi) revenue villages completed under Survey of India drone flights.',
      getVal: (s) => s.svamitvaDroneCoveragePercent,
    },
    dilrmp: {
      name: 'DILRMP RoR Computerization',
      unit: '% RoRs Digitized',
      description: 'Digitized Record of Rights integrated with sub-registrar offices and spatial cadastral maps.',
      getVal: (s) => s.dilrmpDigitizationPercent,
    },
    disputes: {
      name: 'Land Dispute Density',
      unit: 'Cases per 10k Parcels',
      description: 'Recorded civil land disputes and mutation contestations pending in revenue / district courts.',
      getVal: (s) => s.landDisputeDensityPer10k,
    },
    climate: {
      name: 'Climate Vulnerability Index',
      unit: 'Index (1 - 10)',
      description: 'Composite dryland vulnerability score based on ICAR-CRIDA rainfall anomalies and soil degradation.',
      getVal: (s) => s.climateVulnerabilityIndex,
    },
    conversion: {
      name: 'Agricultural Land Conversion Rate',
      unit: '% Annual Conversion',
      description: 'Estimated annual conversion rate from fertile agricultural land to non-agricultural / peri-urban use.',
      getVal: (s) => s.agriculturalConversionRatePercent,
    },
  };

  const getMarkerColor = (val: number, layer: GISLayerKey) => {
    if (layer === 'svamitva' || layer === 'dilrmp') {
      if (val >= 90) return '#287A54'; // high success
      if (val >= 80) return '#C58B45'; // moderate
      return '#C74747'; // low
    }
    if (layer === 'disputes') {
      if (val > 50) return '#C74747';
      if (val > 40) return '#C58B45';
      return '#287A54';
    }
    if (layer === 'climate') {
      if (val >= 7.5) return '#C74747';
      if (val >= 6.0) return '#C58B45';
      return '#287A54';
    }
    // conversion
    if (val >= 4.0) return '#C58B45';
    return '#287A54';
  };

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on Central India (Nagpur / Bhopal coordinates)
      const map = L.map(mapContainerRef.current, {
        center: [22.5, 78.9],
        zoom: 5,
        minZoom: 4,
        maxZoom: 9,
      });

      // CartoDB Positron clean map tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      markersGroupRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;

    if (markersGroup) {
      markersGroup.clearLayers();

      STATE_GIS_DATA.forEach((state) => {
        const val = layersConfig[activeLayer].getVal(state);
        const color = getMarkerColor(val, activeLayer);

        // Custom HTML circle marker with value badge
        const customIcon = L.divIcon({
          className: 'custom-gis-marker',
          html: `
            <div style="
              background-color: ${color};
              color: white;
              border: 2px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              border-radius: 9999px;
              width: 38px;
              height: 38px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: inherit;
              font-weight: bold;
              cursor: pointer;
            ">
              <span style="font-size: 9px; line-height: 1;">${state.stateCode}</span>
              <span style="font-size: 10px; line-height: 1; font-weight: 800;">${val}</span>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        });

        const marker = L.marker([state.lat, state.lng], { icon: customIcon });

        marker.on('click', () => {
          setSelectedState(state);
          map.setView([state.lat, state.lng], 6, { animate: true });
        });

        marker.bindPopup(`
          <div style="font-family: system-ui; padding: 4px; min-width: 140px;">
            <strong style="color: #173F35; font-size: 13px;">${state.stateName}</strong><br/>
            <span style="font-size: 11px; color: #66756A;">${layersConfig[activeLayer].name}:</span><br/>
            <strong style="color: ${color}; font-size: 14px;">${val} ${layersConfig[activeLayer].unit}</strong>
          </div>
        `);

        marker.addTo(markersGroup);
      });
    }
  }, [activeLayer]);

  const currentConfig = layersConfig[activeLayer];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DDECE2] text-[#173F35] text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Spatial Land Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#173F35]">
              GIS Land Governance Insights
            </h2>
            <p className="text-xs text-[#66756A] mt-1 max-w-2xl">
              Visualize state-wise cadastral digitization rates, SVAMITVA drone coverage, pending litigation density, and climate vulnerability overlays across India.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono bg-[#F8F6EF] border border-[#E4E7DD] text-[#66756A] px-3 py-1.5 rounded-lg">
              Coordinate System: WGS84 / EPSG:4326
            </span>
          </div>
        </div>

        {/* Layer Selector Tabs */}
        <div className="mt-6 pt-4 border-t border-[#E4E7DD] flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#173F35] mr-2">Spatial Layer:</span>
          {(Object.keys(layersConfig) as GISLayerKey[]).map((key) => {
            const isSelected = activeLayer === key;
            return (
              <button
                key={key}
                onClick={() => setActiveLayer(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected 
                    ? 'bg-[#173F35] text-white shadow-xs' 
                    : 'bg-[#F8F6EF] text-[#253B32] hover:bg-[#DDECE2] border border-[#E4E7DD]'
                }`}
              >
                {layersConfig[key].name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map & State Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Leaflet Map Container */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E4E7DD] p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#173F35]">{currentConfig.name}</span>
              <span className="text-[#66756A]">({currentConfig.unit})</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#287A54]" /> Favorable</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#C58B45]" /> Moderate</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#C74747]" /> High Need</span>
            </div>
          </div>

          {/* Leaflet Map DOM Element */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[450px] rounded-xl border border-[#E4E7DD] bg-[#F8F6EF] relative z-10"
          />

          <div className="mt-3 pt-3 border-t border-[#E4E7DD] flex flex-wrap items-center justify-between text-xs text-[#66756A]">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#C58B45]" />
              Click any state marker on the map to inspect its comprehensive Land Governance Dossier.
            </span>
            <span className="text-[11px] font-mono">Source: DoLR & Survey of India (2024)</span>
          </div>
        </div>

        {/* Right 1 Col: Selected State Land Governance Dossier */}
        <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 pb-4 border-b border-[#E4E7DD]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C58B45]">
                  State Governance Dossier
                </span>
                <h3 className="text-xl font-extrabold text-[#173F35] mt-0.5">
                  {selectedState.stateName} ({selectedState.stateCode})
                </h3>
                <p className="text-xs text-[#66756A] mt-0.5">
                  Dominant Land Use: <strong>{selectedState.dominantLandUse}</strong>
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#DDECE2] text-[#173F35] flex items-center justify-center font-bold text-sm">
                {selectedState.stateCode}
              </div>
            </div>

            {/* Key Metric Indicators */}
            <div className="mt-5 space-y-3">
              <div className="p-3 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#66756A]">SVAMITVA Drone Coverage</span>
                  <span className="font-extrabold text-[#173F35]">{selectedState.svamitvaDroneCoveragePercent}%</span>
                </div>
                <div className="w-full bg-[#E4E7DD] h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-[#287A54] h-full rounded-full" 
                    style={{ width: `${selectedState.svamitvaDroneCoveragePercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#66756A] mt-1 block">
                  {selectedState.droneMappedVillages.toLocaleString()} of {selectedState.totalVillages.toLocaleString()} villages surveyed
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#66756A]">DILRMP RoR Digitization</span>
                  <span className="font-extrabold text-[#173F35]">{selectedState.dilrmpDigitizationPercent}%</span>
                </div>
                <div className="w-full bg-[#E4E7DD] h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-[#173F35] h-full rounded-full" 
                    style={{ width: `${selectedState.dilrmpDigitizationPercent}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD]">
                  <span className="text-[11px] text-[#66756A] block">Property Cards Issued:</span>
                  <span className="font-extrabold text-sm text-[#173F35] mt-1 block">
                    {(selectedState.propertyCardsIssued / 100000).toFixed(1)} Lakh
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD]">
                  <span className="text-[11px] text-[#66756A] block">Pending Court Suits:</span>
                  <span className="font-extrabold text-sm text-[#C74747] mt-1 block">
                    {(selectedState.pendingLitigationCases / 1000).toFixed(0)}k Cases
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD]">
                  <span className="text-[11px] text-[#66756A] block">Dispute Density:</span>
                  <span className="font-extrabold text-[#253B32] mt-1 block">
                    {selectedState.landDisputeDensityPer10k} / 10k Parcels
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD]">
                  <span className="text-[11px] text-[#66756A] block">Climate Vulnerability:</span>
                  <span className="font-extrabold text-[#C58B45] mt-1 block">
                    {selectedState.climateVulnerabilityIndex} / 10 Score
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer & Action */}
          <div className="mt-5 pt-4 border-t border-[#E4E7DD]">
            <div className="p-2.5 rounded-lg bg-[#F4E8D5] border border-[#C58B45]/30 text-[11px] text-[#253B32] leading-tight mb-3">
              <span className="font-bold text-[#173F35]">Note: </span>
              Metrics represent state administrative benchmarks compiled for SIH26019.
            </div>

            <button
              onClick={() => {
                alert(`Selected ${selectedState.stateName} for inclusion in synthesized research report.`);
              }}
              className="w-full py-2.5 rounded-xl bg-[#173F35] hover:bg-[#254F44] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C58B45]" />
              <span>Include in Research Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
