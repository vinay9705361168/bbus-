import React from "react";

interface RouteStop {
  name: string;
  arrivalTime?: string; // e.g., "5:08 AM"
  departureTime?: string; // e.g., "5:10 AM"
}

interface RouteTimelineProps {
  stops: RouteStop[];
  // Optional seed time like "05:00 AM"; if provided, times will be generated
  seedTime?: string;
  minutesBetweenStops?: number; // default 20
  dwellMinutes?: number; // time between arrival and departure at a stop, default 2
}

function parseTime12hToMinutes(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === 'PM' && hour !== 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;
  return hour * 60 + minutes;
}

function minutesToTime12h(totalMinutes: number): string {
  totalMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const hour24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const meridiem = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({
  stops,
  seedTime,
  minutesBetweenStops = 20,
  dwellMinutes = 2,
}) => {
  // Build a list of display stops with times either provided or generated
  const baseMinutes = seedTime ? parseTime12hToMinutes(seedTime) : null;

  const displayStops: { name: string; arrival: string | null; departure: string | null }[] = stops.map((stop, index) => {
    let arrival: string | null = stop.arrivalTime ?? null;
    let departure: string | null = stop.departureTime ?? null;

    if (baseMinutes !== null) {
      const arrMin = baseMinutes + index * minutesBetweenStops;
      const depMin = arrMin + dwellMinutes;
      arrival = arrival ?? minutesToTime12h(arrMin);
      departure = departure ?? minutesToTime12h(depMin);
    }

    return { name: stop.name, arrival, departure };
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
        {displayStops.map((s, idx) => (
          <React.Fragment key={`${s.name}-${idx}`}>
            {/* Left: Arrival */}
            <div className="text-right text-xs sm:text-sm text-muted-foreground flex items-center justify-end">
              {s.arrival ?? '—'}
            </div>

            {/* Middle: Timeline node */}
            <div className="relative pl-4 pr-4">
              {/* vertical line */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 ${idx === 0 ? 'rounded-t' : ''} ${idx === displayStops.length - 1 ? 'rounded-b' : ''} bg-border w-0.5`} />
              {/* dot */}
              <div className="relative z-10 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-primary' : idx === displayStops.length - 1 ? 'bg-secondary' : 'bg-muted-foreground'}`} />
                <div className="text-sm sm:text-base text-foreground">{s.name}</div>
              </div>
            </div>

            {/* Right: Departure */}
            <div className="text-left text-xs sm:text-sm text-muted-foreground flex items-center">
              {s.departure ?? (idx === displayStops.length - 1 ? 'End' : '—')}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RouteTimeline;

