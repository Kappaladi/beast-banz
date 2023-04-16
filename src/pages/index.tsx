import { useState } from "react";
import { RaceBy } from "@uiball/loaders";
import Ban from "@/lib/ban";
import useSWR from "swr";
import Image from "next/image";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const myLoader = ({ src }: { src: string }) => {
  return src;
};

const Home = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSteam, setPageSteam] = useState("");

  const address =
    pageSteam === ""
      ? `/api/bans?page=${pageIndex}`
      : `/api/bans?page=${pageIndex}&steam=${pageSteam}`;
  const { data, error } = useSWR(address, fetcher);
  if (error) return <div>An error occured.</div>;
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <RaceBy size={80} lineWeight={5} speed={1.4} color="white" />
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="container px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        User
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Reason
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Unban date
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Admin
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        SteamID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data.bans.map((ban: Ban) => (
                      <tr key={ban.id}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="px-3">
                            <Image
                              src={ban.user_avatar}
                              alt="An icon of a Steam profile"
                              width={500}
                              height={500}
                              loader={myLoader}
                              className="object-cover w-8 h-8 rounded-full"
                            />
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 w-1/2 break-all">
                          {ban.reason}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {ban.unban_date === 0 ||
                          ban.unban_date * 1000 > Number(new Date()) ? (
                            <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 3L3 9M3 3L9 9"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>

                              <h2 className="text-sm font-normal">
                                Not yet expired
                              </h2>
                            </div>
                          ) : (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 3L4.5 8.5L2 6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>

                              <h2 className="text-sm font-normal">Expired</h2>
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {ban.unban_date === 0
                            ? "Never"
                            : new Date(ban.unban_date * 1000).toLocaleString()}
                        </td>

                        {ban.admin === "Console" ? (
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {ban.admin}
                          </td>
                        ) : (
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="px-3">
                              <Image
                                src={ban.admin_avatar}
                                alt="An icon of a Steam profile"
                                width={500}
                                height={500}
                                loader={myLoader}
                                className="object-cover w-8 h-8 rounded-full"
                              />
                            </div>
                          </td>
                        )}

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {ban.user}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() =>
              setPageIndex((pageIndex) => {
                if (pageIndex === 0) {
                  return pageIndex;
                } else {
                  return pageIndex - 1;
                }
              })
            }
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span>previous</span>
          </button>

          <input
            defaultValue={pageSteam}
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                setPageIndex(0);
                setPageSteam(e.target.value);
              }
            }}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            placeholder="A steamid"
          />

          <button
            onClick={() =>
              setPageIndex((pageIndex) => {
                if ((pageIndex + 1) * 10 >= data.count) {
                  return pageIndex;
                }

                return pageIndex + 1;
              })
            }
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
