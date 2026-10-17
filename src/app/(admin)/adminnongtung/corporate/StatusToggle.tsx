'use client';

import { updateInquiryStatus } from '@/app/actions/corporate';
import { useTransition } from 'react';
import { Check, Clock, RefreshCw } from 'lucide-react';

export default function StatusToggle({ id, isDone }: { id: string; isDone: boolean }) {
  const [isPending, startTransition] = useTransition();

  const toggleStatus = () => {
    startTransition(async () => {
      await updateInquiryStatus(id, isDone ? 'pending' : 'done');
    });
  };

  return (
    <button
      onClick={toggleStatus}
      disabled={isPending}
      title={isDone ? 'คลิกเพื่อเปลี่ยนเป็นรอดำเนินการ' : 'คลิกเพื่อเปลี่ยนเป็นเสร็จสิ้น'}
      className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-60 border ${
        isDone
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100'
          : 'bg-red-50 text-red-600 border-red-200/60 hover:bg-red-100'
      }`}
    >
      {isPending ? (
        <RefreshCw className="w-3 h-3 animate-spin" />
      ) : isDone ? (
        <Check className="w-3 h-3 text-emerald-600" />
      ) : (
        <Clock className="w-3 h-3 text-red-500 animate-pulse" />
      )}
      <span>{isPending ? 'กำลังบันทึก' : isDone ? 'ติดต่อแล้ว' : 'รอดำเนินการ'}</span>
    </button>
  );
}
