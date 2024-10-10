"use client";
import React, { useEffect, useState } from "react";
import { dataStats } from "@/types/dataStats";
import { RiListCheck } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { useGetClients } from "@/hooks/useClient";
import Link from "next/link";

const Icon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 23.8332C18.983 23.8332 23.8333 18.9829 23.8333 12.9998C23.8333 7.01675 18.983 2.1665 13 2.1665C7.01687 2.1665 2.16663 7.01675 2.16663 12.9998C2.16663 18.9829 7.01687 23.8332 13 23.8332ZM13.8125 6.49984C13.8125 6.05111 13.4487 5.68734 13 5.68734C12.5512 5.68734 12.1875 6.05111 12.1875 6.49984V6.84297C10.4212 7.15923 8.93746 8.48625 8.93746 10.2915C8.93746 12.3684 10.9013 13.8123 13 13.8123C14.4912 13.8123 15.4375 14.7935 15.4375 15.7082C15.4375 16.6228 14.4912 17.604 13 17.604C11.5088 17.604 10.5625 16.6228 10.5625 15.7082C10.5625 15.2594 10.1987 14.8957 9.74996 14.8957C9.30123 14.8957 8.93746 15.2594 8.93746 15.7082C8.93746 17.5134 10.4212 18.8404 12.1875 19.1567V19.4998C12.1875 19.9486 12.5512 20.3123 13 20.3123C13.4487 20.3123 13.8125 19.9486 13.8125 19.4998V19.1567C15.5788 18.8404 17.0625 17.5134 17.0625 15.7082C17.0625 13.6313 15.0986 12.1873 13 12.1873C11.5088 12.1873 10.5625 11.2061 10.5625 10.2915C10.5625 9.37688 11.5088 8.39567 13 8.39567C14.4912 8.39567 15.4375 9.37688 15.4375 10.2915C15.4375 10.7402 15.8012 11.104 16.25 11.104C16.6987 11.104 17.0625 10.7402 17.0625 10.2915C17.0625 8.48625 15.5788 7.15923 13.8125 6.84297V6.49984Z"
      fill="white"
    />
    </svg>
)

const DataStatsOne = () => {
  const [allClients, setAllClients] = useState<dataStats[]>([])
  const {data: clients} = useGetClients()
  

  useEffect(() => {
    const data = clients?.data.map((item: any) => {
      return {
        id: item.id,
        icon: Icon(), 
        color: '#FF9C55',
        title: item.name,
        coinBs: item.total.toString() + 'Bs',
        coinDolar: item.totalDolar,
        route: item.id
      }
    })
    setAllClients(data)
  },[clients])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {allClients?.length > 0 ? allClients?.map((item, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-6 flex items-end justify-between">

              <div>
                <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                  {item.coinBs} - {item.coinDolar}
                </h4>
                <span className="text-body-2xlg font-medium">{item.title}</span>
              </div>

              <div className="flex flex-col items-start justify-center gap-1">

                <Link 
                  href={`/panel/historial/${item.route}`}
                  className="group inline-flex items-center justify-center p-3 rounded-full hover:bg-primary transition-all duration-200 cursor-pointer relative hover:text-slate-300"
                  >
                    <RiListCheck size={24} className="text-primary dark:text-primary group-hover:text-white
                    visible-hidden" />
                    <span className="ml-2">
                      Historial
                    </span>
                </Link>

                <Link
                  href={`/panel/agregar/${item.route}`}
                  className="group inline-flex items-center justify-center p-3 rounded-full hover:bg-primary transition-all duration-200 cursor-pointer relative hover:text-slate-300"
                  >
                  <FaRegPlusSquare size={25} className="text-primary group-hover:text-white visible-hidden"/>
                  <span className="ml-2">
                    Gestionar
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )) : (
          <h1 className="text-2xl">No hay clientes registrados</h1>
        )
      }
      </div>
    </>
  );
};

export default DataStatsOne;
