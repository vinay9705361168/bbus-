import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapComponentProps {
  from?: string;
  to?: string;
  route?: Array<{ lat: number; lng: number; name: string }>;
  className?: string;
}

export const MapComponent = ({ from, to, route, className = "" }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GOOGLE_MAPS_API_KEY = "AIzaSyDkF9IjuwqI8HK_FlIsubVyN5ohfPVcp2M";

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places", "geometry"]
        });

        await loader.load();

        if (!mapRef.current) return;

        const mapInstance = new google.maps.Map(mapRef.current, {
          zoom: 10,
          center: { lat: 28.6139, lng: 77.2090 }, // Default to Delhi
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        setMap(mapInstance);

        // If we have from and to locations, geocode and show them
        if (from && to) {
          await geocodeAndShowRoute(mapInstance, from, to);
        }

        // If we have a predefined route, show it
        if (route && route.length > 0) {
          showRoute(mapInstance, route);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map. Please check your internet connection.');
        setIsLoading(false);
      }
    };

    initMap();
  }, [from, to, route]);

  const geocodeAndShowRoute = async (mapInstance: google.maps.Map, fromLocation: string, toLocation: string) => {
    const geocoder = new google.maps.Geocoder();
    
    try {
      // Geocode both locations
      const fromResult = await geocodeLocation(geocoder, fromLocation);
      const toResult = await geocodeLocation(geocoder, toLocation);

      if (fromResult && toResult) {
        // Create markers
        new google.maps.Marker({
          position: fromResult,
          map: mapInstance,
          title: `From: ${fromLocation}`,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(59, 130, 246)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        new google.maps.Marker({
          position: toResult,
          map: mapInstance,
          title: `To: ${toLocation}`,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(34, 197, 94)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        // Draw route line
        const routePath = new google.maps.Polyline({
          path: [fromResult, toResult],
          geodesic: true,
          strokeColor: '#3B82F6',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });

        routePath.setMap(mapInstance);

        // Fit bounds to show both markers
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(fromResult);
        bounds.extend(toResult);
        mapInstance.fitBounds(bounds);
      }
    } catch (error) {
      console.error('Error geocoding locations:', error);
    }
  };

  const geocodeLocation = (geocoder: google.maps.Geocoder, location: string): Promise<google.maps.LatLng | null> => {
    return new Promise((resolve) => {
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          resolve(results[0].geometry.location);
        } else {
          console.warn(`Geocoding failed for ${location}:`, status);
          resolve(null);
        }
      });
    });
  };

  const showRoute = (mapInstance: google.maps.Map, routePoints: Array<{ lat: number; lng: number; name: string }>) => {
    const bounds = new google.maps.LatLngBounds();
    
    routePoints.forEach((point, index) => {
      const position = new google.maps.LatLng(point.lat, point.lng);
      
      // Create marker for each route point
      new google.maps.Marker({
        position: position,
        map: mapInstance,
        title: point.name,
        label: (index + 1).toString(),
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(59, 130, 246)" stroke="white" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${index + 1}</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24)
        }
      });
      
      bounds.extend(position);
    });

    // Draw route line connecting all points
    if (routePoints.length > 1) {
      const routePath = new google.maps.Polyline({
        path: routePoints.map(point => ({ lat: point.lat, lng: point.lng })),
        geodesic: true,
        strokeColor: '#3B82F6',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      
      routePath.setMap(mapInstance);
    }

    mapInstance.fitBounds(bounds);
  };

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center p-8">
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-primary hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full min-h-[400px]" />
    </div>
  );
};