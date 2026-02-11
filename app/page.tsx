"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
);

export default function DashboardPage() {
  const [failures, setFailures] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/failures/")
      .then((res) => res.json())
      .then((data) => setFailures(data));
  }, []);

  const rainbowColors = [
    "#6366F1", // Indigo
    "#22C55E", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#06B6D4", // Cyan
    "#A855F7", // Purple
    "#EC4899", // Pink
    "#84CC16", // Lime
  ];

  // Failures by reason
  const reasonCounts: Record<string, number> = {};
  failures.forEach((f) => {
    reasonCounts[f.reason] = (reasonCounts[f.reason] || 0) + 1;
  });

  const barChartData = {
    labels: Object.keys(reasonCounts),
    datasets: [
      {
        label: "Failures by Reason",
        data: Object.values(reasonCounts),
        backgroundColor: rainbowColors.slice(
          0,
          Object.keys(reasonCounts).length,
        ),
        borderRadius: 6,
      },
    ],
  };

  // Failures by area
  const areaCounts: Record<string, number> = {};
  failures.forEach((f) => {
    areaCounts[f.location] = (areaCounts[f.location] || 0) + 1;
  });

  const areaChartData = {
    labels: Object.keys(areaCounts),
    datasets: [
      {
        label: "Failures by Area",
        data: Object.values(areaCounts),
        backgroundColor: rainbowColors.slice(0, Object.keys(areaCounts).length),
        borderWidth: 1,
      },
    ],
  };

  // Time slot analysis
  const timeSlots: Record<string, number> = {
    Morning: 0,
    Afternoon: 0,
    Evening: 0,
    Night: 0,
  };

  failures.forEach((f) => {
    const hour = new Date(f.failure_time).getHours();

    if (hour < 12) timeSlots.Morning++;
    else if (hour < 16) timeSlots.Afternoon++;
    else if (hour < 20) timeSlots.Evening++;
    else timeSlots.Night++;
  });

  const timeChartData = {
    labels: Object.keys(timeSlots),
    datasets: [
      {
        label: "Failures by Time",
        data: Object.values(timeSlots),
        backgroundColor: rainbowColors.slice(0, Object.keys(timeSlots).length),
        borderWidth: 1,
      },
    ],
  };

  const reasonPieData = {
    labels: Object.keys(reasonCounts),
    datasets: [
      {
        label: "Failures by Reason",
        data: Object.values(reasonCounts),
        backgroundColor: rainbowColors.slice(
          0,
          Object.keys(reasonCounts).length,
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm hidden md:flex flex-col p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-800 pb-5">RouteVision</h2>

        <nav className="space-y-2 cursor-pointer">
          <div className="p-2 rounded-lg bg-gray-100 font-medium text-gray-800">
            Dashboard
          </div>

          <div className="p-2 rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed">
            Analytics (Coming Soon)
          </div>

          <div className="p-2 rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed">
            Alerts (Coming Soon)
          </div>

          <div className="p-2 rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed">
            Settings (Coming Soon)
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 text-center m-auto pt-8 pb-5">
            Delivery Failure Dashboard
          </h1>

          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-white p-6 rounded-2xl shadow-sm 
                  hover:scale-105 transition-transform duration-300"
          >
            <p className="text-gray-500 text-sm">Total Failures</p>
            <h2 className="text-3xl font-bold mt-2">{failures.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300">
            <p className="text-gray-500 text-sm">Unique Locations</p>
            <h2 className="text-3xl font-bold mt-2">
              {new Set(failures.map((f) => f.location)).size}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300">
            <p className="text-gray-500 text-sm">Failure Reasons</p>
            <h2 className="text-3xl font-bold mt-2">
              {Object.keys(reasonCounts).length}
            </h2>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Failure Reasons Distribution
          </h2>
          <Bar className="cursor-pointer" data={barChartData} />
        </div>

        {/* Pie Charts */}
        <div className="grid md:grid-cols-3 gap-6 cursor-pointer">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Failures by Area</h2>
            <Pie data={areaChartData} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm cursor-pointer">
            <h2 className="text-lg font-semibold mb-4">
              Failures by Reason
            </h2>
            <Pie data={reasonPieData} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Failures by Time Slot
            </h2>
            <Pie data={timeChartData} />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Failed Deliveries Log</h2>

          <div className="overflow-x-hidden">
            <table className="w-full text-sm text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-500">
                  <th className="p-2">Order</th>
                  <th className="p-2">Reason</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Time</th>
                </tr>
              </thead>

              <tbody>
                {failures.map((item) => (
                  <tr key={item.id} className="bg-gray-50 hover:bg-gray-100 cursor-pointer  ">
                    <td colSpan="4" className="p-0">
                      <div
                        className="
          grid grid-cols-4 items-center
          hover:scale-[1.02] hover:shadow-md
          transition-all duration-300
          bg-gray-50 rounded-lg
        "
                      >
                        <div className="p-3 font-medium">{item.order_id}</div>

                        <div className="p-3">
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                            {item.reason}
                          </span>
                        </div>

                        <div className="p-3">{item.location}</div>

                        <div className="p-3 text-gray-500">
                          {new Date(item.failure_time).toLocaleString()}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold text-blue-800 text-xl mb-2">
            Operational Insight
          </h2>

          <p className="text-blue-900 text-xl">
            <span className="text-red-700 font-bold ">
              High failure concentration detected
            </span>{" "}
            in Kothrud and Baner, primarily during evening hours due to customer
            unavailability. Recommend optimizing delivery time windows.
          </p>
        </div>
      </main>
    </div>
  );
}
