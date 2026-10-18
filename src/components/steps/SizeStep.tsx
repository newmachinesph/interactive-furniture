import { ROOMS, ROOM_ICONS, SIZE_OPTIONS, type RoomSize } from '@/lib/furnitureData';

interface Props {
  selectedRooms: Record<string, number>;
  roomSizes: Record<string, RoomSize>;
  onSizeChange: (roomId: string, size: RoomSize) => void;
}

export default function SizeStep({ selectedRooms, roomSizes, onSizeChange }: Props) {
  const activeRooms = ROOMS.filter(r => (selectedRooms[r.id] ?? 0) > 0);
  const sized = activeRooms.filter(r => roomSizes[r.id]).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl text-stone-900">How large is each room?</h2>
        <p className="text-stone-500 mt-1 text-sm">
          Select a size for each room — this helps us calibrate quantities.
        </p>
      </div>

      <div className="space-y-3">
        {activeRooms.map(room => {
          const count = selectedRooms[room.id] ?? 1;
          const currentSize = roomSizes[room.id];
          return (
            <div key={room.id} className="bg-white border border-stone-200">
              {/* Room header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-100">
                <div className={`w-8 h-8 bg-gradient-to-br ${room.gradient} flex items-center justify-center text-base shrink-0`}>
                  {ROOM_ICONS[room.id]}
                </div>
                <span className="font-medium text-stone-900 text-sm">{room.name}</span>
                {count > 1 && (
                  <span className="text-xs text-[#aa323e] font-medium">×{count}</span>
                )}
                {currentSize && (
                  <span className="ml-auto text-xs text-[#aa323e] font-medium uppercase tracking-wide">
                    {SIZE_OPTIONS.find(s => s.value === currentSize)?.label}
                  </span>
                )}
              </div>

              {/* Size options */}
              <div className="grid grid-cols-4">
                {SIZE_OPTIONS.map((size, i) => {
                  const active = currentSize === size.value;
                  return (
                    <button
                      key={size.value}
                      onClick={() => onSizeChange(room.id, size.value)}
                      className={`py-4 px-2 text-center border-r last:border-r-0 border-stone-100 transition-all ${
                        active
                          ? 'bg-[#aa323e] text-white'
                          : 'hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      {/* Relative box visual */}
                      <div className="flex items-end justify-center mb-2.5 h-8">
                        <div
                          style={{
                            width:  [14, 20, 26, 32][i],
                            height: [14, 20, 26, 32][i],
                          }}
                          className={`border-2 transition-colors ${
                            active ? 'border-white/70 bg-white/20' : 'border-[#bbb6b3] bg-[#bbb6b3]/20'
                          }`}
                        />
                      </div>
                      <p className={`text-xs font-semibold ${active ? 'text-white' : 'text-stone-800'}`}>
                        {size.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${active ? 'text-white/70' : 'text-stone-400'}`}>
                        {size.sqft}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {activeRooms.length > 0 && (
        <p className="mt-4 text-xs text-stone-400 text-right">
          {sized} of {activeRooms.length} sized
        </p>
      )}
    </div>
  );
}
