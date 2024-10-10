"use client";
import { TfiTrash } from "react-icons/tfi";
import { IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";


const TableThree = ({debts}: {debts: any}) => {
  const [totalPaid, setTotalPaid] = useState<number>(0)

  useEffect(() => {
    setTotalPaid(debts?.data.discounts.reduce((acc: number, item: any) => acc + item.amount, 0))
  }, [debts])

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Producto
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Fecha
              </th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {debts?.data.debt.map((packageItem: any, index: number) => (
              <tr key={index}>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b`}
                >
                  <h5 className="text-dark dark:text-white">
                    {packageItem.description}
                  </h5>
                  <p className="mt-[3px] text-body-sm font-medium">
                    {packageItem.amount} Bs
                  </p>
                </td>

                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 border-b`}
                >
                  <p className="text-dark dark:text-white">
                    {new Date(packageItem.createdAt).toLocaleDateString('es-ES', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </td>

                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 border-b`}
                >
                  <div className="flex items-center justify-end space-x-3.5">
                    <button className="hover:text-primary">
                      <IoEyeOutline size={20} className="fill-current" />
                    </button>
                    <button className="hover:text-primary">
                      <TfiTrash size={20} className="fill-current" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                <h5 className="text-dark dark:text-white">Descuestos</h5>
              </td>
              <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b"></td>
              <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                <div className="flex flex-col items-end space-x-3.5">
                  {
                    debts?.data.discounts.length > 0 ? (
                    debts?.data.discounts.map((item: any, index: number) => (
                      <span key={index} className="text-body font-medium text-red-700">
                        - {item.amount}
                      </span>
                    ))
                  ): (
                    <span className="text-body font-medium">Sin descuentos</span>
                  )
                  }
                </div>
              </td>
            </tr>

            <tr>
              <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                <h5 className="text-dark dark:text-white">Total Abonado</h5>
              </td>
              <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b"></td>
              <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                <div className="flex flex-col items-end space-x-3.5">
                  <span className="text-lg font-semibold text-rose-700">
                    {totalPaid}
                  </span>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                <h5 className="text-dark text-body-2xlg font-semibold dark:text-white">Total</h5>
              </td>

              <td></td>

              <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                <div className="flex items-center justify-end space-x-3.5">
                  <h5 className="text-dark text-body-2xlg font-semibold dark:text-white">{debts?.data.total}Bs</h5>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
