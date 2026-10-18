import { Fragment } from 'react';
import { PRICING_TIERS, TIER_INFO, SIZE_OPTIONS, ROOMS, ROOM_ICONS, type PricingTier, type RoomSize } from '@/lib/furnitureData';
import type { EstimateRow } from '@/components/FurnitureWizard';
import QuantityStepper from '@/components/ui/QuantityStepper';

interface Props {
  rows: EstimateRow[];
  globalTier: PricingTier;
  total: number;
  selectedRooms: Record<string, number>;
  roomSizes: Record<string, RoomSize>;
  onGlobalTierChange: (tier: PricingTier) => void;
  onRowTierChange: (rowKey: string, tier: PricingTier) => void;
  onRowPriceChange: (rowKey: string, price: number) => void;
  onRowQtyChange: (rowKey: string, qty: number) => void;
  onRowToggle: (rowKey: string, included: boolean) => void;
}

export default function EstimateStep({
  rows, globalTier, total, selectedRooms, roomSizes,
  onGlobalTierChange, onRowTierChange, onRowPriceChange, onRowQtyChange, onRowToggle,
}: Props) {
  const activeRooms = ROOMS.filter(r => (selectedRooms[r.id] ?? 0) > 0);
  const grouped: Record<string, EstimateRow[]> = {};
  for (const row of rows) {
    if (!grouped[row.roomId]) grouped[row.roomId] = [];
    grouped[row.roomId].push(row);
  }

  const TableRow = ({ row }: { row: EstimateRow }) => {
    const subtotal = row.included ? row.unitPrice * row.quantity : 0;
    return (
      <tr className={`transition-colors ${row.included ? 'bg-white hover:bg-stone-50' : 'bg-stone-50 opacity-50'}`}>
        <td className="px-4 py-3 text-center">
          <input type="checkbox" checked={row.included}
            onChange={e => onRowToggle(row.rowKey, e.target.checked)}
            className="w-4 h-4 cursor-pointer" />
        </td>
        <td className="px-4 py-3">
          <span className="font-medium text-stone-800 text-sm">{row.name}</span>
        </td>
        <td className="px-4 py-3">
          <select value={row.tier} disabled={!row.included}
            onChange={e => onRowTierChange(row.rowKey, e.target.value as PricingTier)}
            className="w-full text-sm border border-stone-200 px-2.5 py-1.5 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#aa323e]/40 disabled:cursor-not-allowed disabled:bg-stone-100"
          >
            {PRICING_TIERS.map(t => (
              <option key={t} value={t}>{t} — {TIER_INFO[t].label}</option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none">$</span>
            <input type="number" value={row.unitPrice} min={0} disabled={!row.included}
              onChange={e => onRowPriceChange(row.rowKey, Math.max(0, Number(e.target.value)))}
              className="w-full pl-6 pr-2 py-1.5 border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#aa323e]/40 disabled:bg-stone-100 disabled:cursor-not-allowed"
            />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex justify-center">
            <QuantityStepper value={row.quantity} min={0} max={99}
              disabled={!row.included} onChange={qty => onRowQtyChange(row.rowKey, qty)} />
          </div>
        </td>
        <td className="px-4 py-3 text-right">
          <span className={`font-semibold text-sm ${row.included ? 'text-stone-800' : 'text-stone-400 line-through'}`}>
            ${subtotal.toLocaleString()}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-2xl text-stone-900">Build Your Estimate</h2>
        <p className="text-stone-500 mt-1 text-sm">
          {activeRooms.map(r => {
            const size = SIZE_OPTIONS.find(s => s.value === roomSizes[r.id])?.label;
            return size ? `${r.name} (${size})` : r.name;
          }).join(', ')} — adjust quantities and pricing as needed.
        </p>
      </div>

      {/* Global pricing tier */}
      <div className="bg-white border border-stone-200 p-4 mb-4">
        <p className="text-sm font-medium text-stone-600 mb-3">Set pricing category for all items</p>
        <div className="grid grid-cols-4 sm:flex sm:flex-nowrap gap-1.5 sm:gap-2">
          {PRICING_TIERS.map(tier => {
            const active = globalTier === tier;
            return (
              <button key={tier} onClick={() => onGlobalTierChange(tier)}
                className={`border-2 font-semibold transition-all text-center px-1 py-1.5 sm:px-4 sm:py-2 ${
                  active
                    ? 'bg-[#aa323e] text-white border-[#aa323e]'
                    : 'border-stone-200 text-stone-600 hover:border-[#aa323e] hover:text-[#aa323e] bg-white'
                }`}
              >
                <span className="block sm:inline text-xs sm:text-sm">{tier}</span>
                <span className={`block sm:inline text-xs font-normal ${active ? 'opacity-75' : 'opacity-60'}`}> {TIER_INFO[tier].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white border border-stone-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wide">
              <th className="w-10 px-4 py-3" />
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3 w-44">Pricing Tier</th>
              <th className="text-left px-4 py-3 w-36">Unit Price</th>
              <th className="text-center px-4 py-3 w-36">Qty</th>
              <th className="text-right px-4 py-3 w-32">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {activeRooms.map((room, ri) => {
              const roomRows = grouped[room.id] ?? [];
              const roomSubtotal = roomRows.filter(r => r.included).reduce((s, r) => s + r.unitPrice * r.quantity, 0);
              const sizeLabel = SIZE_OPTIONS.find(s => s.value === roomSizes[room.id])?.label;
              return (
                <Fragment key={room.id}>
                  <tr className={`bg-stone-50 ${ri > 0 ? 'border-t-2 border-stone-200' : ''}`}>
                    <td colSpan={6} className="px-4 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{ROOM_ICONS[room.id]}</span>
                          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                            {room.name}
                            {(selectedRooms[room.id] ?? 0) > 1 && (
                              <span className="ml-1.5 text-[#aa323e] normal-case">×{selectedRooms[room.id]}</span>
                            )}
                          </span>
                          {sizeLabel && (
                            <span className="text-xs text-[#bbb6b3] border border-[#bbb6b3]/40 px-1.5 py-0.5">
                              {sizeLabel}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-stone-400">${roomSubtotal.toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                  {roomRows.map(row => <TableRow key={row.rowKey} row={row} />)}
                </Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-stone-200 bg-stone-50">
              <td colSpan={5} className="px-4 py-4 text-right font-semibold text-stone-700">Total Estimate</td>
              <td className="px-4 py-4 text-right">
                <span className="text-xl font-bold text-[#aa323e]">${total.toLocaleString()}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden bg-white border border-stone-200 overflow-hidden">
        {activeRooms.map((room, ri) => {
          const roomRows = grouped[room.id] ?? [];
          const sizeLabel = SIZE_OPTIONS.find(s => s.value === roomSizes[room.id])?.label;
          return (
            <div key={room.id} className={ri > 0 ? 'border-t-2 border-stone-200' : ''}>
              <div className="px-4 py-2.5 bg-stone-50 flex items-center gap-2">
                <span>{ROOM_ICONS[room.id]}</span>
                <span className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                  {room.name}
                  {(selectedRooms[room.id] ?? 0) > 1 && (
                    <span className="ml-1.5 text-[#aa323e] normal-case">×{selectedRooms[room.id]}</span>
                  )}
                </span>
                {sizeLabel && (
                  <span className="text-xs text-[#bbb6b3] border border-[#bbb6b3]/40 px-1.5 py-0.5">{sizeLabel}</span>
                )}
              </div>
              <div className="divide-y divide-stone-100">
                {roomRows.map(row => {
                  const subtotal = row.included ? row.unitPrice * row.quantity : 0;
                  return (
                    <div key={row.rowKey} className={`p-4 ${!row.included ? 'opacity-50 bg-stone-50' : ''}`}>
                      {/* Row 1: checkbox + name + stepper */}
                      <div className="flex items-center gap-2 mb-3">
                        <input type="checkbox" checked={row.included}
                          onChange={e => onRowToggle(row.rowKey, e.target.checked)}
                          className="w-4 h-4 shrink-0 cursor-pointer" />
                        <span className="font-medium text-stone-800 text-sm flex-1 min-w-0 truncate">{row.name}</span>
                        <QuantityStepper value={row.quantity} min={0} max={99}
                          disabled={!row.included} onChange={qty => onRowQtyChange(row.rowKey, qty)} />
                      </div>
                      {/* Row 2: tier + price + subtotal */}
                      <div className="flex items-center gap-2">
                        <select value={row.tier} disabled={!row.included}
                          onChange={e => onRowTierChange(row.rowKey, e.target.value as PricingTier)}
                          className="text-xs border border-stone-200 px-2 py-1.5 bg-white w-20 shrink-0"
                        >
                          {PRICING_TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none">$</span>
                          <input type="number" value={row.unitPrice} min={0} disabled={!row.included}
                            onChange={e => onRowPriceChange(row.rowKey, Math.max(0, Number(e.target.value)))}
                            className="w-24 pl-5 pr-1 py-1.5 border border-stone-200 text-xs"
                          />
                        </div>
                        <span className={`text-sm font-semibold ml-auto ${row.included ? 'text-[#aa323e]' : 'text-stone-400 line-through'}`}>
                          ${subtotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="p-4 bg-stone-50 border-t-2 border-stone-200 flex justify-between items-center">
          <span className="font-semibold text-stone-700">Total Estimate</span>
          <span className="text-xl font-bold text-[#aa323e]">${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
