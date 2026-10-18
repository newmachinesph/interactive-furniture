import { ROOMS, ROOM_ICONS } from '@/lib/furnitureData';
import QuantityStepper from '@/components/ui/QuantityStepper';

interface Props {
  selectedRooms: Record<string, number>;
  onRoomCountChange: (roomId: string, count: number) => void;
}

export default function RoomStep({ selectedRooms, onRoomCountChange }: Props) {
  const totalSelected = Object.values(selectedRooms).filter(c => c > 0).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl text-stone-900">Which rooms are you furnishing?</h2>
        <p className="text-stone-500 mt-1 text-sm">
          Set the count for each room. Leave at 0 to skip.
        </p>
      </div>

      <div className="space-y-2">
        {ROOMS.map(room => {
          const count = selectedRooms[room.id] ?? 0;
          const active = count > 0;
          return (
            <div
              key={room.id}
              className={`flex items-center gap-4 bg-white px-4 py-3.5 border-2 transition-all duration-200 ${
                active ? 'border-[#aa323e]' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className={`w-11 h-11 bg-gradient-to-br ${room.gradient} flex items-center justify-center shrink-0 text-xl`}>
                {ROOM_ICONS[room.id]}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${active ? 'text-stone-900' : 'text-stone-700'}`}>
                  {room.name}
                </p>
                <p className="text-stone-400 text-xs mt-0.5 truncate">{room.description}</p>
              </div>

              <QuantityStepper
                value={count}
                min={0}
                max={9}
                onChange={val => onRoomCountChange(room.id, val)}
              />
            </div>
          );
        })}
      </div>

      {totalSelected > 0 && (
        <p className="mt-4 text-xs text-stone-400 text-right">
          {totalSelected} room{totalSelected !== 1 ? ' types' : ''} selected
        </p>
      )}
    </div>
  );
}
