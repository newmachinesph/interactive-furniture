'use client';

import { useState } from 'react';
import { SIZE_OPTIONS, ROOMS, type RoomSize } from '@/lib/furnitureData';
import type { ContactInfo, EstimateRow } from '@/components/FurnitureWizard';

interface Props {
  contact: ContactInfo;
  total: number;
  selectedRooms: Record<string, number>;
  roomSizes: Record<string, RoomSize>;
  rows: EstimateRow[];
  onContactChange: (c: ContactInfo) => void;
}

export default function ContactStep({ contact, total, selectedRooms, roomSizes, rows, onContactChange }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const update = (field: keyof ContactInfo, value: string | boolean) =>
    onContactChange({ ...contact, [field]: value });

  const activeRooms = ROOMS.filter(r => (selectedRooms[r.id] ?? 0) > 0);
  const includedRows = rows.filter(r => r.included);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.email) { setEmailError('Email is required.'); return; }
    setEmailError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="w-16 h-16 bg-stone-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-[#aa323e]">✓</span>
        </div>
        <h2 className="font-display text-2xl text-stone-900 mb-2">You&apos;re all set!</h2>
        <p className="text-stone-500 mb-1">
          We&apos;ve received your estimate for{' '}
          <strong>{activeRooms.map(r => r.name).join(', ')}</strong>.
        </p>
        <p className="text-stone-500 mb-8">
          {contact.wantsConsultation || contact.wantsDetailedQuote
            ? 'A member of our design team will reach out shortly.'
            : 'Check your inbox for your estimate summary.'}
        </p>
        <div className="inline-block bg-stone-50 border border-stone-200 px-10 py-6">
          <p className="text-stone-500 text-sm mb-1">Total Estimate</p>
          <p className="text-4xl font-bold text-[#aa323e]">${total.toLocaleString()}</p>
          <p className="text-stone-400 text-xs mt-2">{includedRows.length} items</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl text-stone-900">Get Your Quote</h2>
        <p className="text-stone-500 mt-1 text-sm">Tell us how you&apos;d like to receive your estimate.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 items-start">
        {/* Summary */}
        <div className="bg-white border border-stone-200 p-5">
          <h3 className="font-semibold text-stone-800 mb-4">Your Estimate Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm gap-4">
              <span className="text-stone-500 shrink-0">Rooms</span>
              <span className="text-stone-800 font-medium text-right">
                {activeRooms.map(r => {
                  const c = selectedRooms[r.id] ?? 1;
                  const s = SIZE_OPTIONS.find(o => o.value === roomSizes[r.id])?.label;
                  return [c > 1 ? `${r.name} ×${c}` : r.name, s].filter(Boolean).join(' · ');
                }).join(', ')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Items included</span>
              <span className="text-stone-800 font-medium">{includedRows.length}</span>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-3 space-y-1">
            {includedRows.slice(0, 5).map(row => (
              <div key={row.rowKey} className="flex justify-between text-sm">
                <span className="text-stone-500 truncate pr-4">{row.name} ×{row.quantity}</span>
                <span className="text-stone-700 shrink-0">${(row.unitPrice * row.quantity).toLocaleString()}</span>
              </div>
            ))}
            {includedRows.length > 5 && (
              <p className="text-stone-400 text-xs">+{includedRows.length - 5} more items…</p>
            )}
          </div>

          <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between items-center">
            <span className="font-semibold text-stone-700">Total Estimate</span>
            <span className="text-2xl font-bold text-[#aa323e]">${total.toLocaleString()}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Name <span className="text-stone-400 font-normal text-xs">(optional)</span>
            </label>
            <input type="text" value={contact.name} onChange={e => update('name', e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#aa323e]/30 placeholder:text-stone-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Email <span className="text-[#aa323e] text-xs">*</span>
            </label>
            <input type="email" value={contact.email}
              onChange={e => { update('email', e.target.value); setEmailError(''); }}
              placeholder="you@example.com"
              className={`w-full px-3 py-2 border text-sm focus:outline-none focus:ring-2 focus:ring-[#aa323e]/30 placeholder:text-stone-300 ${emailError ? 'border-red-400' : 'border-stone-200'}`}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Phone <span className="text-stone-400 font-normal text-xs">(optional)</span>
            </label>
            <input type="tel" value={contact.phone} onChange={e => update('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-2 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#aa323e]/30 placeholder:text-stone-300"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">How would you like your estimate?</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={contact.wantsDownload}
                  onChange={e => update('wantsDownload', e.target.checked)} className="w-4 h-4" />
                <span className="text-sm text-stone-700">Download as PDF</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={contact.wantsEmailQuote}
                  onChange={e => update('wantsEmailQuote', e.target.checked)} className="w-4 h-4" />
                <span className="text-sm text-stone-700">Email me the estimate</span>
              </label>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4">
            <p className="text-sm font-semibold text-stone-800 mb-3">Interested in our design services?</p>
            <div className="space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={contact.wantsConsultation}
                  onChange={e => update('wantsConsultation', e.target.checked)}
                  className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-stone-800">Free design consultation</span>
                  <p className="text-xs text-stone-500 mt-0.5">30-min call with one of our interior designers — complimentary.</p>
                </div>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={contact.wantsDetailedQuote}
                  onChange={e => update('wantsDetailedQuote', e.target.checked)}
                  className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-stone-800">Detailed design service quote</span>
                  <p className="text-xs text-stone-500 mt-0.5">Full procurement &amp; styling package with itemized pricing.</p>
                </div>
              </label>
            </div>
          </div>

          <button type="submit"
            className="w-full py-3 bg-[#aa323e] text-white font-semibold text-sm hover:bg-[#8f2a34] active:scale-[0.98] transition-all"
          >
            Submit My Estimate Request
          </button>
        </form>
      </div>
    </div>
  );
}
