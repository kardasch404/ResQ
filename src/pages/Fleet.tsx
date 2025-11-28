import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useAmbulances } from '../features/ambulances/hooks/useAmbulances';
import { useUpdateAmbulance } from '../features/ambulances/hooks/useUpdateAmbulance';
import AmbulanceModal from '../features/ambulances/components/AmbulanceModal';
import type { Ambulance } from '../shared/types';
import { AmbulanceStatus } from '../shared/types';

const columnHelper = createColumnHelper<Ambulance>();

export default function Fleet() {
  const { data: ambulances = [], isLoading } = useAmbulances();
  const updateAmbulance = useUpdateAmbulance();
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo(
    () => [
      columnHelper.accessor('callSign', {
        header: 'Call Sign',
        cell: info => <span className="font-semibold">{info.getValue()}</span>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          const ambulance = info.row.original;
          return (
            <select
              value={status}
              onChange={(e) => updateAmbulance.mutate({
                id: ambulance.id,
                data: { status: e.target.value as AmbulanceStatus }
              })}
              className={`px-2 py-1 text-xs rounded border ${
                status === AmbulanceStatus.AVAILABLE ? 'bg-green-50 text-green-800' :
                status === AmbulanceStatus.EN_ROUTE ? 'bg-blue-50 text-blue-800' :
                status === AmbulanceStatus.ON_SCENE ? 'bg-yellow-50 text-yellow-800' :
                status === AmbulanceStatus.OUT_OF_SERVICE ? 'bg-gray-50 text-gray-800' :
                'bg-purple-50 text-purple-800'
              }`}
            >
              {Object.values(AmbulanceStatus).map(s => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
          );
        },
      }),
      columnHelper.accessor('location', {
        header: 'Location',
        cell: info => info.getValue()?.address || '-',
      }),
      columnHelper.accessor('crew', {
        header: 'Crew',
        cell: info => info.getValue()?.join(', ') || '-',
      }),
      columnHelper.accessor('equipment', {
        header: 'Equipment',
        cell: info => `${info.getValue()?.length || 0} items`,
      }),
    ],
    [updateAmbulance]
  );

  const filteredData = useMemo(() => {
    if (statusFilter === 'ALL') return ambulances;
    return ambulances.filter(a => a.status === statusFilter);
  }, [ambulances, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fleet Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Ambulance
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1 rounded ${statusFilter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All ({ambulances.length})
        </button>
        {Object.values(AmbulanceStatus).map(status => {
          const count = ambulances.filter(a => a.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded ${statusFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {status.replace('_', ' ')} ({count})
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AmbulanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
