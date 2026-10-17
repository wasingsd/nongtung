import { getCorporateInquiries } from '@/app/actions/corporate';
import StatusToggle from './StatusToggle';
import { Building2, Phone, Calendar, Users, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Corporate Inquiries CRM | Nongtung Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminCorporatePage() {
  let inquiries: any[] = [];
  try {
    const res = await getCorporateInquiries().catch(() => ({ data: [] }));
    inquiries = res?.data || [];
  } catch (e) {
    console.error('getCorporateInquiries error:', e);
  }

  const allInquiries = Array.isArray(inquiries) ? inquiries : [];
  const pendingCount = allInquiries.filter((i: any) => i && i.status === 'pending').length;
  const doneCount = allInquiries.filter((i: any) => i && i.status === 'done').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full mb-3 border border-primary/20">
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              B2B CRM Pipeline
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">
            Corporate <span className="text-primary italic">Inquiries</span>
          </h1>
          <p className="text-gray-400 font-medium text-xs sm:text-sm mt-2 max-w-xl">
            ติดตามและจัดการคำขอใบเสนอราคาจากองค์กร ทริปศึกษาดูงาน สัมมนา และกิจกรรม Team Building
          </p>
        </div>

        {/* Stats Summary Strip */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[95px]">
            <div className="text-2xl font-black text-forest font-heading">{allInquiries.length}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              ทั้งหมด
            </div>
          </div>

          <div className="bg-white px-4 py-3 rounded-2xl border border-red-100 shadow-sm text-center min-w-[95px]">
            <div className="text-2xl font-black text-red-600 font-heading">{pendingCount}</div>
            <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-0.5">
              รอดำเนินการ
            </div>
          </div>

          <div className="bg-white px-4 py-3 rounded-2xl border border-green-100 shadow-sm text-center min-w-[95px]">
            <div className="text-2xl font-black text-green-600 font-heading">{doneCount}</div>
            <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-0.5">
              เสร็จสิ้นแล้ว
            </div>
          </div>
        </div>
      </div>

      {/* Main Table / CRM Card View */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            รายการคำขอใบเสนอราคา ({allInquiries.length} รายการ)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/70 text-gray-400 uppercase font-black text-[10px] tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">สถานะ (Status)</th>
                <th className="px-6 py-4">บริษัท / ผู้ติดต่อ</th>
                <th className="px-6 py-4">ขนาดกรุ๊ป & วันเดินทาง</th>
                <th className="px-6 py-4">ความต้องการพิเศษ</th>
                <th className="px-6 py-4 text-right">วันที่ส่งคำขอ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allInquiries.map((inquiry: any) => (
                <tr key={inquiry.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <StatusToggle id={inquiry.id} isDone={inquiry.status === 'done'} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-forest text-base leading-snug">
                      {inquiry.companyName}
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">
                      ผู้ประสานงาน: {inquiry.contactPerson}
                    </div>
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline mt-1 bg-primary/10 px-2.5 py-1 rounded-lg"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{inquiry.phone}</span>
                    </a>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-forest">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span>จำนวน: {inquiry.groupSize} ท่าน</span>
                      </div>
                      {inquiry.expectedDate && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>
                            {new Date(inquiry.expectedDate).toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 max-w-xs">
                    {inquiry.requirements ? (
                      <div className="p-3 rounded-2xl bg-surface/80 border border-forest/5 text-xs text-forest/80 italic leading-relaxed">
                        "{inquiry.requirements}"
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">- ไม่ได้ระบุ -</span>
                    )}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right font-mono text-xs text-gray-400">
                    {inquiry.createdAt
                      ? new Date(inquiry.createdAt).toLocaleDateString('th-TH')
                      : '-'}
                  </td>
                </tr>
              ))}
              {allInquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                    <Building2 className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p className="font-bold text-sm text-forest">ยังไม่มีคำขอใบเสนอราคา</p>
                    <p className="text-xs text-gray-400 mt-1">
                      เมื่อมีบริษัทส่งข้อมูลผ่านฟอร์มหน้าองค์กร รายการจะแสดงที่นี่อัตโนมัติ
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
