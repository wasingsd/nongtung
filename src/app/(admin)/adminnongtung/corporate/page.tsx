import { getCorporateInquiries } from '@/app/actions/corporate';
import StatusToggle from './StatusToggle';

export const dynamic = 'force-dynamic';

export default async function AdminCorporatePage() {
    const { data: inquiries } = await getCorporateInquiries();

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Corporate Inquiries</h1>
                    <p className="text-gray-500">Manage incoming requests from companies</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-400 uppercase font-black text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Company / Contact</th>
                                <th className="px-6 py-4">Details</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {inquiries?.map((inquiry: any) => (
                                <tr key={inquiry.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusToggle id={inquiry.id} isDone={inquiry.status === 'done'} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 text-base">{inquiry.companyName}</div>
                                        <div className="text-gray-500">{inquiry.contactPerson}</div>
                                        <div className="text-xs text-primary font-bold mt-1">{inquiry.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold text-gray-500">Pax: {inquiry.groupSize}</span>
                                                {inquiry.expectedDate && (
                                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold text-gray-500">
                                                        {new Date(inquiry.expectedDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            {inquiry.requirements && (
                                                <p className="text-gray-600 italic line-clamp-2 hover:line-clamp-none transition-all cursor-help mt-2" title={inquiry.requirements}>
                                                    "{inquiry.requirements}"
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-mono text-xs">
                                        {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString('en-GB') : '-'}
                                    </td>
                                </tr>
                            ))}
                            {(!inquiries || inquiries.length === 0) && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-medium">
                                        No inquiries found yet.
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
