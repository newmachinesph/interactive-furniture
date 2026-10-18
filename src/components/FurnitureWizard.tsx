'use client';

import { useState, useCallback } from 'react';
import { ROOMS, type PricingTier, type RoomSize } from '@/lib/furnitureData';
import WizardProgress from './WizardProgress';
import RoomStep from './steps/RoomStep';
import SizeStep from './steps/SizeStep';
import EstimateStep from './steps/EstimateStep';
import ContactStep from './steps/ContactStep';

export interface EstimateRow {
  rowKey: string;
  roomId: string;
  itemId: string;
  name: string;
  tier: PricingTier;
  unitPrice: number;
  quantity: number;
  included: boolean;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  wantsDownload: boolean;
  wantsEmailQuote: boolean;
  wantsConsultation: boolean;
  wantsDetailedQuote: boolean;
}

const STEPS = [
  { number: 1, label: 'Select Rooms' },
  { number: 2, label: 'Room Size' },
  { number: 3, label: 'Build Estimate' },
  { number: 4, label: 'Get Your Quote' },
];

function buildRows(selectedRooms: Record<string, number>, tier: PricingTier): EstimateRow[] {
  const rows: EstimateRow[] = [];
  for (const room of ROOMS) {
    const count = selectedRooms[room.id] ?? 0;
    if (count <= 0) continue;
    for (const item of room.items) {
      rows.push({
        rowKey: `${room.id}-${item.id}`,
        roomId: room.id,
        itemId: item.id,
        name: item.name,
        tier,
        unitPrice: item.prices[tier],
        quantity: item.defaultQty * count,
        included: false,
      });
    }
  }
  return rows;
}

export default function FurnitureWizard() {
  const [step, setStep] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>({});
  const [roomSizes, setRoomSizes] = useState<Record<string, RoomSize>>({});
  const [globalTier, setGlobalTier] = useState<PricingTier>('$$');
  const [rows, setRows] = useState<EstimateRow[]>([]);
  const [contact, setContact] = useState<ContactInfo>({
    name: '', email: '', phone: '',
    wantsDownload: false, wantsEmailQuote: false,
    wantsConsultation: false, wantsDetailedQuote: false,
  });

  const total = rows.filter(r => r.included).reduce((sum, r) => sum + r.unitPrice * r.quantity, 0);

  const handleRoomCountChange = useCallback((roomId: string, count: number) => {
    const next = { ...selectedRooms, [roomId]: count };
    setSelectedRooms(next);
    setRows(buildRows(next, globalTier));
  }, [selectedRooms, globalTier]);

  const handleSizeChange = useCallback((roomId: string, size: RoomSize) => {
    setRoomSizes(prev => ({ ...prev, [roomId]: size }));
  }, []);

  const handleGlobalTierChange = useCallback((tier: PricingTier) => {
    setGlobalTier(tier);
    setRows(buildRows(selectedRooms, tier));
  }, [selectedRooms]);

  const handleRowTierChange = useCallback((rowKey: string, tier: PricingTier) => {
    setRows(prev => prev.map(row => {
      if (row.rowKey !== rowKey) return row;
      const room = ROOMS.find(r => r.id === row.roomId);
      const item = room?.items.find(i => i.id === row.itemId);
      return { ...row, tier, unitPrice: item?.prices[tier] ?? row.unitPrice };
    }));
  }, []);

  const handleRowPriceChange = useCallback((rowKey: string, price: number) =>
    setRows(prev => prev.map(r => r.rowKey === rowKey ? { ...r, unitPrice: price } : r)), []);

  const handleRowQtyChange = useCallback((rowKey: string, qty: number) =>
    setRows(prev => prev.map(r => r.rowKey === rowKey ? { ...r, quantity: qty } : r)), []);

  const handleRowToggle = useCallback((rowKey: string, included: boolean) =>
    setRows(prev => prev.map(r => r.rowKey === rowKey ? { ...r, included } : r)), []);

  const canProceed = () => {
    if (step === 1) return Object.values(selectedRooms).some(c => c > 0);
    if (step === 2) {
      const activeIds = Object.entries(selectedRooms).filter(([, c]) => c > 0).map(([id]) => id);
      return activeIds.every(id => roomSizes[id] !== undefined);
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg text-stone-900">Furniture Estimator</h1>
            <p className="text-xs text-stone-400 mt-0.5">Get an instant quote for your space</p>
          </div>
          {total > 0 && (
            <div className="text-right">
              <p className="text-xs text-stone-400 uppercase tracking-wider">Estimate</p>
              <p className="text-lg font-bold text-[#aa323e]">${total.toLocaleString()}</p>
            </div>
          )}
        </div>
      </header>

      <WizardProgress steps={STEPS} currentStep={step} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {step === 1 && (
          <RoomStep selectedRooms={selectedRooms} onRoomCountChange={handleRoomCountChange} />
        )}
        {step === 2 && (
          <SizeStep selectedRooms={selectedRooms} roomSizes={roomSizes} onSizeChange={handleSizeChange} />
        )}
        {step === 3 && (
          <EstimateStep
            rows={rows} globalTier={globalTier} total={total}
            selectedRooms={selectedRooms} roomSizes={roomSizes}
            onGlobalTierChange={handleGlobalTierChange}
            onRowTierChange={handleRowTierChange}
            onRowPriceChange={handleRowPriceChange}
            onRowQtyChange={handleRowQtyChange}
            onRowToggle={handleRowToggle}
          />
        )}
        {step === 4 && (
          <ContactStep
            contact={contact} total={total}
            selectedRooms={selectedRooms} roomSizes={roomSizes}
            rows={rows} onContactChange={setContact}
          />
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-stone-200">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 1}
            className="px-6 py-2.5 bg-[#bbb6b3] text-white text-sm font-medium hover:bg-[#a8a4a1] disabled:opacity-0 disabled:pointer-events-none transition-colors"
          >
            ← Back
          </button>
          {step < 4 && (
            <button
              onClick={() => canProceed() && setStep(s => s + 1)}
              disabled={!canProceed()}
              className="px-7 py-2.5 bg-[#aa323e] text-white text-sm font-semibold hover:bg-[#8f2a34] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-colors"
            >
              Continue →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
